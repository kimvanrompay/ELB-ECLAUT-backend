import dayjs from 'dayjs';

import {
	ForbiddenError,
	NotFoundError,
	StatsUnitUnsupportedError,
} from '@lib/errors';
import {GameTypeStatsReport} from '@lib/models/gametype-stats-report';
import {PlayfieldCategoryStatsReport} from '@lib/models/playfield-category-stats-report';
import {PlayfieldStatsReportModel} from '@lib/models/playfield-stats-report';
import {PrizeStatsReport} from '@lib/models/prize-stats-report';
import {TenantLocationStatsReport} from '@lib/models/tenant-location-stats-report';
import {TenantStatsReport} from '@lib/models/tenant-stats-report';
import type {
	IPlayfieldStatsRepository,
	IPrizeRepository,
} from '@lib/repositories/types';
import {PinoLogger} from '@lib/utils';

import {
	AppSecurityScopes,
	AuthorizationService,
} from '../authorization-service/authorization.service';
import type {AuthenticatedAppContext} from '../types';

class StatisticsReportService {
	private logger: PinoLogger;

	constructor(
		private statisticsReportRepository: IPlayfieldStatsRepository,
		private prizeRepository: IPrizeRepository,
		private context: AuthenticatedAppContext
	) {
		this.context = context;
		this.logger = context.logger.getChildLogger(
			{
				service: 'statistics-report-service',
			},
			{}
		);
	}

	private getBeginOfStartDate(startDate: Date) {
		return dayjs(startDate).startOf('day').toDate();
	}

	private getEndOfEndDate(
		endDate: Date | undefined,
		range: 'WEEK' | 'MONTH' | 'YEAR' | 'DAY' | undefined,
		startDate: Date
	) {
		if (range) {
			return dayjs(startDate)
				.add(1, range.toLowerCase() as 'day' | 'month' | 'year' | 'week')
				.subtract(1, 'day')
				.endOf('day')
				.toDate();
		}

		return endDate;
	}

	private checkIfUnitIsSupported(
		startDate: Date,
		endDate: Date,
		unit: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH'
	) {
		const daysBetweenStartAndEndDate = dayjs(endDate).diff(
			dayjs(startDate),
			'day'
		);
		const weeksBetweenStartAndEndDate = dayjs(endDate).diff(
			dayjs(startDate),
			'week'
		);

		const daysBetweenStartAndNow = dayjs().diff(dayjs(startDate), 'day');

		if (unit === 'HOUR' && daysBetweenStartAndEndDate > 7) {
			throw new StatsUnitUnsupportedError(
				'HOUR unit is not supported for ranges more than 7 days'
			);
		}

		if (unit === 'HOUR' && daysBetweenStartAndNow > 14) {
			throw new StatsUnitUnsupportedError(
				'HOUR unit is not supported for dates older than 14 days'
			);
		}

		if (unit === 'DAY' && daysBetweenStartAndEndDate > 31) {
			throw new StatsUnitUnsupportedError(
				'DAY unit is not supported for ranges more than 31 days'
			);
		}

		if (unit === 'WEEK' && weeksBetweenStartAndEndDate > 52) {
			throw new StatsUnitUnsupportedError(
				'WEEK unit is not supported for ranges more than 52 weeks'
			);
		}
	}

	getStatisticsReport(
		entityId: string,
		entityType:
			| 'playfield'
			| 'tenant'
			| 'tenant_location'
			| 'gametype'
			| 'prize'
			| 'playfield_category',
		startDate: Date,
		endDate: Date | undefined,
		range: 'WEEK' | 'MONTH' | 'YEAR' | 'DAY' | undefined,
		unit: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH'
	) {
		if (!range && !endDate) {
			throw new Error(
				'Range or endDate must be provided for statistics report'
			);
		}

		const beginOfStartDate = startDate; // this.getBeginOfStartDate(startDate);
		const endOfEndDate = this.getEndOfEndDate(endDate, range, startDate)!;

		// TODO: turn on when going live. its a nice to not have while testing features
		// this.checkIfUnitIsSupported(beginOfStartDate, endOfEndDate, unit);

		if (entityType === 'playfield') {
			return this.getStatisticsReportByPlayfield(
				entityId,
				unit,
				beginOfStartDate,
				endOfEndDate
			);
		}

		if (entityType === 'tenant_location') {
			return this.getStatisticsReportByTenantLocation(
				entityId,
				unit,
				beginOfStartDate,
				endOfEndDate
			);
		}

		if (entityType === 'gametype') {
			return this.getStatisticsReportByGametype(
				entityId,
				unit,
				beginOfStartDate,
				endOfEndDate
			);
		}

		if (entityType === 'tenant') {
			return this.getStatisticsReportByTenant(
				entityId,
				unit,
				beginOfStartDate,
				endOfEndDate
			);
		}

		if (entityType === 'prize') {
			return this.getStatisticsReportByPrize(
				entityId,
				unit,
				beginOfStartDate,
				endOfEndDate
			);
		}

		if (entityType === 'playfield_category') {
			return this.getStatisticsReportByPlayfieldCategory(
				entityId,
				unit,
				beginOfStartDate,
				endOfEndDate
			);
		}

		throw new NotFoundError(
			`Statistics report for ${entityType} is not supported`
		);
	}

	async getStatisticsReportByPlayfield(
		playfieldId: string,
		unit: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH',
		startDate: Date,
		endDate: Date
	) {
		// TODO: allow filtering on multiple locationids
		const [tenantId, locationIds] =
			AuthorizationService.getTenantAndLocationFromContext(this.context);

		const where = {
			playfieldId,
		} as {
			playfieldId?: string;
			tenantLocationId?: string;
			tenantId?: string;
		};

		if (tenantId) {
			where.tenantId = tenantId;
		}

		const playfieldStats =
			await this.statisticsReportRepository.findPlayfieldStatsByRange(
				unit,
				where,
				['playfield_id'],
				startDate,
				endDate
			);

		if (!playfieldStats || playfieldStats.length === 0) {
			return new PlayfieldStatsReportModel(
				{
					startDate,
					endDate,
					unit,
					playfieldId,
				},
				[]
			);
		}

		const popularPrizeStats =
			await this.statisticsReportRepository.getPopularPrizeStatsForRange(
				{playfieldId},
				startDate,
				endDate,
				tenantId,
				locationIds,
				10,
				'count_game_sessions desc'
			);

		const prizeHistory =
			await this.prizeRepository.getPrizesHistoryForPlayfield(
				playfieldId,
				startDate,
				endDate,
				tenantId
			);

		return new PlayfieldStatsReportModel(
			{
				startDate,
				endDate,
				unit,
				playfieldId,
			},
			playfieldStats,
			prizeHistory,
			popularPrizeStats
		);
	}

	async getStatisticsReportByTenantLocation(
		tenantLocationId: string,
		unit: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH',
		startDate: Date,
		endDate: Date
	) {
		// TODO: Authorization

		const [loggedInTenantId, loggedInLocationIds] =
			AuthorizationService.getTenantAndLocationFromContext(this.context);
		const where = {
			tenantLocationId,
		} as {
			playfieldId?: string;
			tenantLocationId?: string;
			tenantId?: string;
		};

		const playfieldStats =
			await this.statisticsReportRepository.findPlayfieldStatsByRange(
				unit,
				where,
				['tenant_location_id'],
				startDate,
				endDate,
				loggedInTenantId,
				loggedInLocationIds
			);

		if (!playfieldStats || playfieldStats.length === 0) {
			return new TenantLocationStatsReport(
				'',
				tenantLocationId,
				unit,
				startDate,
				endDate,
				[]
			);
		}

		const popularPlayfieldStats =
			await this.statisticsReportRepository.getPopularPlayfieldStatsForRange(
				where,
				startDate,
				endDate,
				loggedInTenantId,
				loggedInLocationIds,
				20,
				'count_game_sessions desc'
			);

		const popularPrizeStats =
			await this.statisticsReportRepository.getPopularPrizeStatsForRange(
				where,
				startDate,
				endDate,
				loggedInTenantId,
				loggedInLocationIds,
				20,
				'count_game_sessions desc'
			);

		const popularGametypeStats =
			await this.statisticsReportRepository.getPopularGametypeStatsForRange(
				where,
				startDate,
				endDate,
				loggedInTenantId,
				loggedInLocationIds,
				20,
				'count_game_sessions desc'
			);

		const popularPlayfieldCategories =
			await this.statisticsReportRepository.getPopularPlayfieldCategoryStatsForRange(
				where,
				startDate,
				endDate,
				loggedInTenantId,
				loggedInLocationIds,
				20,
				'count_game_sessions desc'
			);

		const report = TenantLocationStatsReport.fromPlayfieldStats(
			'',
			tenantLocationId,
			unit,
			startDate,
			endDate,
			playfieldStats
		);

		report.popularPlayfields = popularPlayfieldStats;
		report.popularPrizes = popularPrizeStats;
		report.popularGametypes = popularGametypeStats;
		report.popularPlayfieldCategories = popularPlayfieldCategories;

		return report;
	}

	async getStatisticsReportByGametype(
		gametypeId: string,
		unit: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH',
		startDate: Date,
		endDate: Date
	) {
		const hasAccess = AuthorizationService.hasAccessToScope(
			this.context.auth.securityGroup,
			AppSecurityScopes.READ_GAME_TYPES
		);

		if (!hasAccess) {
			this.logger.error(
				`User (${this.context.auth.userId}) does not have access to gametype statistics`
			);
			throw new ForbiddenError(
				'User does not have access to gametype statistics'
			);
		}

		const [loggedInTenantId, loggedInLocationIds] =
			AuthorizationService.getTenantAndLocationFromContext(this.context);

		const where = {
			gametypeId,
		} as {
			playfieldId?: string;
			tenantLocationId?: string;
			tenantId?: string;
		};

		const playfieldStats =
			await this.statisticsReportRepository.findPlayfieldStatsByRange(
				unit,
				where,
				['gametype_id'],
				startDate,
				endDate,
				loggedInTenantId,
				loggedInLocationIds
			);

		if (!playfieldStats || playfieldStats.length === 0) {
			return new GameTypeStatsReport(
				{
					gametypeId,
					startDate,
					endDate,
					unit,
				},
				[]
			);
		}

		const popularPrizeStats =
			await this.statisticsReportRepository.getPopularPrizeStatsForRange(
				where,
				startDate,
				endDate,
				loggedInTenantId,
				loggedInLocationIds,
				10,
				'count_game_sessions desc'
			);

		const popularPlayfieldStats =
			await this.statisticsReportRepository.getPopularPlayfieldStatsForRange(
				where,
				startDate,
				endDate,
				loggedInTenantId,
				loggedInLocationIds,
				20,
				'count_game_sessions desc'
			);

		const report = GameTypeStatsReport.fromPlayfieldStats(
			{
				gametypeId,
				startDate,
				endDate,
				unit,
			},
			playfieldStats
		);

		report.popularPrizes = popularPrizeStats;
		report.popularPlayfields = popularPlayfieldStats;

		return report;
	}

	async getStatisticsReportByTenant(
		tenantId: string,
		unit: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH',
		startDate: Date,
		endDate: Date
	) {
		const hasAccess = AuthorizationService.hasAccessToScope(
			this.context.auth.securityGroup,
			AppSecurityScopes.READ_TENANTS
		);

		if (!hasAccess) {
			this.logger.error(
				`User (${this.context.auth.userId}) does not have access to tenant statistics`
			);
			throw new ForbiddenError(
				'User does not have access to tenant statistics'
			);
		}

		const [loggedInTenantId, loggedInLocationIds] =
			AuthorizationService.getTenantAndLocationFromContext(this.context);

		const where = {
			tenantId,
		} as {
			playfieldId?: string;
			tenantLocationId?: string;
			tenantId?: string;
			gametypeId?: string;
			prizeId?: string;
			serialNumber?: string;
		};

		const playfieldStats =
			await this.statisticsReportRepository.findPlayfieldStatsByRange(
				unit,
				where,
				['tenant_id'],
				startDate,
				endDate,
				loggedInTenantId,
				loggedInLocationIds
			);

		if (!playfieldStats || playfieldStats.length === 0) {
			return new TenantStatsReport(tenantId, unit, startDate, endDate, []);
		}

		const popularPrizeStats =
			await this.statisticsReportRepository.getPopularPrizeStatsForRange(
				where,
				startDate,
				endDate,
				loggedInTenantId,
				loggedInLocationIds,
				10,
				'count_game_sessions desc'
			);

		const popularPlayfieldStats =
			await this.statisticsReportRepository.getPopularPlayfieldStatsForRange(
				where,
				startDate,
				endDate,
				loggedInTenantId,
				loggedInLocationIds,
				20,
				'count_game_sessions desc'
			);

		const popularGametypeStats =
			await this.statisticsReportRepository.getPopularGametypeStatsForRange(
				where,
				startDate,
				endDate,
				loggedInTenantId,
				loggedInLocationIds,
				20,
				'count_game_sessions desc'
			);

		const popularLocationStats =
			await this.statisticsReportRepository.getPopularLocationStatsForRange(
				where,
				startDate,
				endDate,
				loggedInTenantId,
				loggedInLocationIds,
				20,
				'count_game_sessions desc'
			);

		const report = TenantStatsReport.fromPlayfieldStats(
			tenantId,
			unit,
			startDate,
			endDate,
			playfieldStats
		);

		report.popularPrizes = popularPrizeStats;
		report.popularPlayfields = popularPlayfieldStats;
		report.popularGametypes = popularGametypeStats;
		report.popularLocations = popularLocationStats;
		return report;
	}

	async getStatisticsReportByPrize(
		prizeId: string,
		unit: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH',
		startDate: Date,
		endDate: Date
	) {
		const hasAccess = AuthorizationService.hasAccessToScope(
			this.context.auth.securityGroup,
			AppSecurityScopes.READ_PRIZES
		);

		if (!hasAccess) {
			this.logger.error(
				`User (${this.context.auth.userId}) does not have access to prize statistics`
			);
			throw new ForbiddenError('User does not have access to prize statistics');
		}

		const [loggedInTenantId, loggedInLocationIds] =
			AuthorizationService.getTenantAndLocationFromContext(this.context);

		const where = {
			prizeId,
		} as {
			playfieldId?: string;
			tenantLocationId?: string;
			tenantId?: string;
			gametypeId?: string;
			prizeId?: string;
			serialNumber?: string;
		};

		const playfieldStats =
			await this.statisticsReportRepository.findPlayfieldStatsByRange(
				unit,
				where,
				['prize_id'],
				startDate,
				endDate,
				loggedInTenantId,
				loggedInLocationIds
			);

		if (!playfieldStats || playfieldStats.length === 0) {
			return new PrizeStatsReport(prizeId, unit, startDate, endDate, []);
		}

		const popularPlayfieldStats =
			await this.statisticsReportRepository.getPopularPlayfieldStatsForRange(
				where,
				startDate,
				endDate,
				loggedInTenantId,
				loggedInLocationIds,
				20,
				'count_game_sessions desc'
			);

		const popularLocationStats =
			await this.statisticsReportRepository.getPopularLocationStatsForRange(
				where,
				startDate,
				endDate,
				loggedInTenantId,
				loggedInLocationIds,
				20,
				'count_game_sessions desc'
			);

		const report = PrizeStatsReport.fromPlayfieldStats(
			prizeId,
			unit,
			startDate,
			endDate,
			playfieldStats
		);

		report.popularPlayfields = popularPlayfieldStats;
		report.popularLocations = popularLocationStats;

		return report;
	}

	async getStatisticsReportByPlayfieldCategory(
		playfieldCategoryId: string,
		unit: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH',
		startDate: Date,
		endDate: Date
	) {
		const hasAccess = AuthorizationService.hasAccessToScope(
			this.context.auth.securityGroup,
			AppSecurityScopes.READ_MACHINES
		);

		if (!hasAccess) {
			this.logger.error(
				`User (${this.context.auth.userId}) does not have access to playfield category statistics`
			);
			throw new ForbiddenError(
				'User does not have access to playfield category statistics'
			);
		}

		const [loggedInTenantId, loggedInLocationIds] =
			AuthorizationService.getTenantAndLocationFromContext(this.context);

		const where = {
			playfieldCategoryId,
		} as {
			playfieldCategoryId?: string;
			playfieldId?: string;
			tenantLocationId?: string;
			tenantId?: string;
			gametypeId?: string;
			prizeId?: string;
			serialNumber?: string;
		};

		const playfieldStats =
			await this.statisticsReportRepository.findPlayfieldStatsByRange(
				unit,
				where,
				['playfield_category_id'],
				startDate,
				endDate,
				loggedInTenantId,
				loggedInLocationIds
			);

		if (!playfieldStats || playfieldStats.length === 0) {
			return new PlayfieldCategoryStatsReport(
				playfieldCategoryId,
				unit,
				startDate,
				endDate,
				[]
			);
		}

		const popularPrizeStats =
			await this.statisticsReportRepository.getPopularPrizeStatsForRange(
				where,
				startDate,
				endDate,
				loggedInTenantId,
				loggedInLocationIds,
				10,
				'count_game_sessions desc'
			);

		const popularLocationStats =
			await this.statisticsReportRepository.getPopularLocationStatsForRange(
				where,
				startDate,
				endDate,
				loggedInTenantId,
				loggedInLocationIds,
				10,
				'count_game_sessions desc'
			);

		const popularPlayfieldStats =
			await this.statisticsReportRepository.getPopularPlayfieldStatsForRange(
				where,
				startDate,
				endDate,
				loggedInTenantId,
				loggedInLocationIds,
				10,
				'count_game_sessions desc'
			);

		const report = PlayfieldCategoryStatsReport.fromPlayfieldStats(
			playfieldCategoryId,
			playfieldStats,
			unit,
			startDate,
			endDate
		);

		report.popularPrizes = popularPrizeStats;
		report.popularPlayfields = popularPlayfieldStats;
		report.popularLocations = popularLocationStats;
		return report;
	}
}

export {StatisticsReportService};
