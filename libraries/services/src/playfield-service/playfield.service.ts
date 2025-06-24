import {v4 as uuid} from 'uuid';

import {NotFoundError} from '@lib/errors';
import {Playfield, type PlayfieldUpdateDTOType} from '@lib/models/playfield';
import type {
	IMachineLogRepository,
	IPlayfieldCategoryRepository,
	IPlayfieldRepository,
	IPrizeRepository,
} from '@lib/repositories/types';
import {PinoLogger} from '@lib/utils';
import type {
	DatabaseQueryFilters,
	PaginatedDatabaseQueryFilters,
} from '@lib/utils/db/filters';

import {AuthorizationService} from '../authorization-service/authorization.service';
import type {AuthenticatedAppContext} from '../types';
import type {IPlayfieldService} from './playfield.service.types';

class PlayfieldService implements IPlayfieldService {
	private logger: PinoLogger;

	constructor(
		private playfieldRepository: IPlayfieldRepository,
		private prizeRepository: IPrizeRepository,
		private playfieldCategoryRepository: IPlayfieldCategoryRepository,
		private machineLogRepository: IMachineLogRepository,
		private context: AuthenticatedAppContext
	) {
		this.playfieldRepository = playfieldRepository;
		this.context = context;
		this.logger = context.logger.getChildLogger(
			{
				name: 'playfield-service',
			},
			{}
		);
	}

	async findPlayfields(filters?: DatabaseQueryFilters): Promise<Playfield[]> {
		return this.playfieldRepository.findPlayfields(
			filters,
			...AuthorizationService.getTenantAndLocationFromContext(this.context)
		);
	}

	async findPaginatedPlayfields(
		filters?: PaginatedDatabaseQueryFilters
	): Promise<{entries: Playfield[]; totalEntries: number}> {
		const [tenantId, locationIds] =
			AuthorizationService.getTenantAndLocationFromContext(this.context);

		const playfields = await this.playfieldRepository.findPlayfields(
			filters,
			tenantId,
			locationIds
		);

		const total = await this.playfieldRepository.countPlayfields(
			filters,
			tenantId,
			locationIds
		);

		return {
			entries: playfields,
			totalEntries: total,
		};
	}

	async getPlayfieldById(id: string): Promise<Playfield | undefined> {
		return this.playfieldRepository.getPlayfieldById(
			id,
			...AuthorizationService.getTenantAndLocationFromContext(this.context)
		);
	}

	async findPlayfieldsBySerial(serial: string): Promise<Playfield[]> {
		return this.playfieldRepository.findPlayfieldsByCabinetId(
			serial,
			...AuthorizationService.getTenantAndLocationFromContext(this.context)
		);
	}

	async updatePlayfield(
		id: string,
		playfield: PlayfieldUpdateDTOType
	): Promise<Playfield> {
		try {
			return this.playfieldRepository.updatePlayfield(
				id,
				Playfield.getUpdateDBFromUpdateDTO(playfield),
				...AuthorizationService.getTenantAndLocationFromContext(this.context)
			);
		} catch (error) {
			this.logger.error(error);
			throw new Error('Could not update playfield'); // TODO: Create a custom error
		}
	}

	async updatePlayfieldPrize(
		id: string,
		prizeId: string | null
	): Promise<Playfield> {
		const playfield = await this.playfieldRepository.getPlayfieldById(
			id,
			...AuthorizationService.getTenantAndLocationFromContext(this.context)
		);

		if (!playfield) {
			throw new NotFoundError('Playfield not found');
		}

		const prize = prizeId
			? await this.prizeRepository.getPrizeById(
					prizeId,
					AuthorizationService.getTenantAndLocationFromContext(this.context)[0]
				)
			: undefined;

		if (!prize && prizeId) {
			throw new NotFoundError('Prize not found');
		}

		await this.prizeRepository.transaction(async (trx) => {
			const scopedPrizeRepository = this.prizeRepository.withTransaction(trx);
			const scopedMachineLogRepository =
				this.machineLogRepository.withTransaction(trx);

			await Promise.all([
				scopedPrizeRepository.addPrizeToPlayfield(
					prizeId,
					id,
					AuthorizationService.getTenantAndLocationFromContext(this.context)[0]
				),
				scopedMachineLogRepository.createMachineLog({
					id: uuid(),
					playfield_id: id,
					serial_number: playfield.cabinet.serialNumber,
					level: 'INFO',
					timestamp: new Date(),
					app_user_id: this.context.auth.userId,
					type: 'PRIZE_UPDATE',
					data: {
						prizeId: prizeId,
						prizeName: prize?.name,
					},
				}),
			]);
		});

		return this.getPlayfieldById(id) as Promise<Playfield>;
	}

	async updatePlayfieldCategory(
		id: string,
		categoryId: string | null
	): Promise<Playfield> {
		const playfield = await this.playfieldRepository.getPlayfieldById(
			id,
			...AuthorizationService.getTenantAndLocationFromContext(this.context)
		);

		if (!playfield) {
			throw new NotFoundError('Playfield not found');
		}

		await this.playfieldRepository.transaction(async (trx) => {
			const scopedPlayfieldCategoryRepository =
				this.playfieldCategoryRepository.withTransaction(trx);
			const scopedMachineLogRepository =
				this.machineLogRepository.withTransaction(trx);

			const category = categoryId
				? await scopedPlayfieldCategoryRepository.getPlayfieldCategoryById(
						categoryId,
						AuthorizationService.getTenantAndLocationFromContext(
							this.context
						)[0]
					)
				: null;

			await Promise.all([
				scopedPlayfieldCategoryRepository.addPlayfieldToCategory(
					id,
					categoryId,
					AuthorizationService.getTenantAndLocationFromContext(this.context)[0]
				),
				scopedMachineLogRepository.createMachineLog({
					id: uuid(),
					playfield_id: id,
					serial_number: playfield.cabinet.serialNumber,
					level: 'INFO',
					timestamp: new Date(),
					app_user_id: this.context.auth.userId,
					type: 'CATEGORY_UPDATE',
					data: {
						categoryId: categoryId,
						categoryName: category?.name || null,
					},
				}),
			]);
		});

		return this.getPlayfieldById(id) as Promise<Playfield>;
	}
}

export {PlayfieldService};
