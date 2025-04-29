import dayjs from 'dayjs';

import {NotFoundError, StatsUnitUnsupportedError} from '@lib/errors';
import {PlayfieldStatsReportModel} from '@lib/models/playfield-stats-report';
import type {IPlayfieldStatsRepository} from '@lib/repositories/types';
import {PinoLogger} from '@lib/utils';

import type {AuthenticatedAppContext, IPlayfieldService} from '../types';
import type {IPlayfieldStatsReportService} from './playfield-stats-report.service.types';

class PlayfieldStatsReportService implements IPlayfieldStatsReportService {
	private logger: PinoLogger;
	private context: AuthenticatedAppContext;

	constructor(
		private playfieldStatsRepository: IPlayfieldStatsRepository,
		private playfieldService: IPlayfieldService,
		appContext: AuthenticatedAppContext
	) {
		this.context = appContext;
		this.logger = appContext.logger.getChildLogger(
			{
				service: 'playfield-stats-report-service',
			},
			{}
		);
	}

	async getStatisticsReportByPlayfield(
		playfieldId: string,
		date: Date,
		range: 'WEEK' | 'MONTH' | 'YEAR' | 'DAY',
		unit: 'HOUR' | 'DAY'
	): Promise<PlayfieldStatsReportModel> {
		if (range !== 'DAY' && range !== 'WEEK' && unit === 'HOUR') {
			throw new StatsUnitUnsupportedError(
				'HOUR unit is not supported for ranges other than DAY or WEEK'
			);
		}

		const startDate = dayjs(date).startOf('day').toDate();
		const endDate = dayjs(startDate)
			.add(1, range.toLowerCase() as 'day' | 'month' | 'year' | 'week')
			.subtract(1, 'day')
			.endOf('day')
			.toDate();

		const playfieldStats = await (unit === 'HOUR'
			? this.playfieldStatsRepository.getPlayfieldStatsByPlayfieldIdBetweenDatePerHour(
					playfieldId,
					startDate,
					endDate
				)
			: this.playfieldStatsRepository.getPlayfieldStatsByPlayfieldIdBetweenDatePerDay(
					playfieldId,
					startDate,
					endDate
				));

		if (!playfieldStats || playfieldStats.length === 0) {
			throw new NotFoundError(
				'No statistics found for the given playfield and date range'
			);
		}

		return new PlayfieldStatsReportModel(
			{
				startDate,
				endDate,
				range,
				unit,
				serialNumber: playfieldId,
				playfieldId,
				gametypeId: playfieldStats[0]!.gametypeId,
				tenantId: playfieldStats[0]!.tenantId,
				tenantLocationId: playfieldStats[0]!.tenantLocationId,
			},
			playfieldStats
		);
	}
}

export {PlayfieldStatsReportService};
