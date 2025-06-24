import {describe, vi} from 'vitest';

import {NotFoundError} from '@lib/errors';
import {AppSecurityGroup} from '@lib/models/app-user';
import {
	Prize,
	type PrizeCreateDTOType,
	type PrizeInsertDBType,
	type PrizeUpdateDBType,
} from '@lib/models/prize';
import type {IPrizeRepository} from '@lib/repositories/types';
import {PinoLogger} from '@lib/utils';
import type {
	DatabaseQueryFilters,
	PaginatedDatabaseQueryFilters,
} from '@lib/utils/db/filters';

import {AuthorizationService} from '../../src/authorization-service/authorization.service';
import {PrizeService} from '../../src/prize-service/prize.service';
import type {AppContext, AuthenticatedAppContext} from '../../src/types';

const authContext: AppContext['auth'] = {
	userId: '00000000-0000-0000-0000-000000000001',
	securityGroup: AppSecurityGroup.ELAUT_ADMIN,
	email: 'admin@example.com',
	locationIds: [],
	tenantId: '00000000-0000-0000-0000-000000000001',
	isElaut: true,
	type: 'USER',
	clientId: undefined,
};

const context: AuthenticatedAppContext = {
	auth: authContext,
	isAuthenticated: true,
	requestId: 'test-request-id',
	logger: new PinoLogger(
		{
			requestId: 'test-request-id',
		},
		{}
	),
};

const mockPrizeRepositoryBase = {
	findPrizes: vi.fn(),
	countPrizes: vi.fn(),
	getPrizeById: vi.fn(),
	createPrize: vi.fn(),
	updatePrize: vi.fn(),
	addPrizeToPlayfield: vi.fn(),
	transaction: vi.fn(),
	getPrizesHistoryForPlayfield: vi.fn(),
} satisfies Omit<IPrizeRepository, 'withTransaction'>;

const mockPrizeRepository = {
	...mockPrizeRepositoryBase,
	withTransaction: vi.fn(() => ({
		...mockPrizeRepositoryBase,
		withTransaction: vi.fn(),
	})),
} satisfies IPrizeRepository;

vi.mock('uuid', () => ({
	v4: vi.fn(() => 'mock-uuid'),
}));

afterEach(() => {
	vi.resetAllMocks();
});

describe('Prize Service', () => {
	let prizeService: PrizeService;

	beforeEach(() => {
		prizeService = new PrizeService(mockPrizeRepository, context);
	});

	describe('findPaginatedPrizes', () => {
		it('should return paginated prizes', async () => {
			const filters: PaginatedDatabaseQueryFilters = {
				limit: 10,
				offset: 0,
			};

			const mockPrizes: Prize[] = [
				new Prize(
					'1',
					{id: 'tenant1', name: 'Tenant 1'},
					'Prize 1',
					'Description 1',
					[],
					new Date('2025-01-01'),
					new Date('2025-01-02')
				),
			];

			vi.spyOn(
				AuthorizationService,
				'getTenantAndLocationFromContext'
			).mockReturnValueOnce([undefined, undefined]);

			mockPrizeRepository.findPrizes.mockResolvedValue(mockPrizes);
			mockPrizeRepository.countPrizes.mockResolvedValue(1);

			const result = await prizeService.findPaginatedPrizes(filters);

			expect(result.entries).toEqual(mockPrizes);
			expect(result.totalEntries).toBe(1);
			expect(mockPrizeRepository.findPrizes).toHaveBeenCalledWith(
				filters,
				undefined
			);
			expect(mockPrizeRepository.countPrizes).toHaveBeenCalledWith(
				filters,
				undefined
			);
		});

		it('should handle empty results', async () => {
			const filters: PaginatedDatabaseQueryFilters = {
				limit: 10,
				offset: 0,
			};

			mockPrizeRepository.findPrizes.mockResolvedValue([]);
			mockPrizeRepository.countPrizes.mockResolvedValue(0);

			const result = await prizeService.findPaginatedPrizes(filters);

			expect(result.entries).toEqual([]);
			expect(result.totalEntries).toBe(0);
		});

		it('should filter prizes by tenant if user is tenantBound', async () => {
			const filters: PaginatedDatabaseQueryFilters = {
				limit: 10,
				offset: 0,
			};

			const mockPrizes: Prize[] = [
				new Prize(
					'1',
					{id: 'tenant1', name: 'Tenant 1'},
					'Prize 1',
					'Description 1',
					[],
					new Date('2025-01-01'),
					new Date('2025-01-02')
				),
			];

			vi.spyOn(
				AuthorizationService,
				'getTenantAndLocationFromContext'
			).mockReturnValueOnce([authContext.tenantId, undefined]);

			mockPrizeRepository.findPrizes.mockResolvedValue(mockPrizes);
			mockPrizeRepository.countPrizes.mockResolvedValue(1);

			const result = await prizeService.findPaginatedPrizes(filters);

			expect(result.entries).toEqual(mockPrizes);
			expect(result.totalEntries).toBe(1);
			expect(mockPrizeRepository.findPrizes).toHaveBeenCalledWith(
				filters,
				authContext.tenantId
			);
			expect(mockPrizeRepository.countPrizes).toHaveBeenCalledWith(
				filters,
				authContext.tenantId
			);
		});
	});

	describe('getPrizeById', () => {
		it('should return a prize by ID', async () => {
			const prizeId = '1';
			const mockPrize = new Prize(
				prizeId,
				{id: 'tenant1', name: 'Tenant 1'},
				'Prize 1',
				'Description 1',
				[],
				new Date('2025-01-01'),
				new Date('2025-01-02')
			);

			vi.spyOn(
				AuthorizationService,
				'getTenantAndLocationFromContext'
			).mockReturnValueOnce([undefined, undefined]);

			mockPrizeRepository.getPrizeById.mockResolvedValue(mockPrize);

			const result = await prizeService.getPrizeById(prizeId);

			expect(result).toEqual(mockPrize);
			expect(mockPrizeRepository.getPrizeById).toHaveBeenCalledWith(
				prizeId,
				undefined
			);
		});

		it('should throw a NotFoundError if prize not found', async () => {
			const prizeId = 'non-existent-id';

			mockPrizeRepository.getPrizeById.mockResolvedValue(undefined);

			await expect(prizeService.getPrizeById(prizeId)).rejects.toThrowError(
				NotFoundError
			);
		});

		it('should filter by tenant if user is tenantBound', async () => {
			const prizeId = '1';
			const mockPrize = new Prize(
				prizeId,
				{id: 'tenant1', name: 'Tenant 1'},
				'Prize 1',
				'Description 1',
				[],
				new Date('2025-01-01'),
				new Date('2025-01-02')
			);

			vi.spyOn(
				AuthorizationService,
				'getTenantAndLocationFromContext'
			).mockReturnValueOnce([authContext.tenantId, undefined]);

			mockPrizeRepository.getPrizeById.mockResolvedValue(mockPrize);

			const result = await prizeService.getPrizeById(prizeId);

			expect(result).toEqual(mockPrize);
			expect(mockPrizeRepository.getPrizeById).toHaveBeenCalledWith(
				prizeId,
				authContext.tenantId
			);
		});
	});

	describe('updatePrize', () => {
		it('should update a prize', async () => {
			const prizeId = '1';
			const updateData: PrizeUpdateDBType = {
				name: 'Updated Prize Name',
				description: 'Updated Description',
			};

			const mockPrize = new Prize(
				prizeId,
				{id: 'tenant1', name: 'Tenant 1'},
				'Updated Prize Name',
				'Updated Description',
				[],
				new Date('2025-01-01'),
				new Date('2025-01-02')
			);

			vi.spyOn(
				AuthorizationService,
				'getTenantAndLocationFromContext'
			).mockReturnValueOnce([undefined, undefined]);

			mockPrizeRepository.updatePrize.mockResolvedValue(mockPrize);

			const result = await prizeService.updatePrize(prizeId, updateData);

			expect(result).toEqual(mockPrize);
			expect(mockPrizeRepository.updatePrize).toHaveBeenCalledWith(
				prizeId,
				updateData,
				undefined
			);
		});

		it('should throw NotFoundError if prize not found', async () => {
			const prizeId = 'non-existent-id';
			const updateData: PrizeUpdateDBType = {
				name: 'Updated Prize Name',
				description: 'Updated Description',
			};

			mockPrizeRepository.updatePrize.mockResolvedValue(undefined);

			await expect(
				prizeService.updatePrize(prizeId, updateData)
			).rejects.toThrowError(NotFoundError);
		});

		it('should filter by tenant if user is tenantBound', async () => {
			const prizeId = '1';
			const updateData: PrizeUpdateDBType = {
				name: 'Updated Prize Name',
				description: 'Updated Description',
			};

			const mockPrize = new Prize(
				prizeId,
				{id: 'tenant1', name: 'Tenant 1'},
				'Updated Prize Name',
				'Updated Description',
				[],
				new Date('2025-01-01'),
				new Date('2025-01-02')
			);

			vi.spyOn(
				AuthorizationService,
				'getTenantAndLocationFromContext'
			).mockReturnValueOnce([authContext.tenantId, undefined]);

			mockPrizeRepository.updatePrize.mockResolvedValue(mockPrize);

			const result = await prizeService.updatePrize(prizeId, updateData);
			expect(result).toEqual(mockPrize);
			expect(mockPrizeRepository.updatePrize).toHaveBeenCalledWith(
				prizeId,
				updateData,
				authContext.tenantId
			);
		});
	});

	describe('createPrize', () => {
		it('should create a new prize', async () => {
			const createData: PrizeCreateDTOType = {
				tenantId: 'tenant1',
				name: 'New Prize',
				description: 'New Prize Description',
			};

			const insertData: PrizeInsertDBType = {
				id: 'mock-uuid',
				tenant_id: createData.tenantId,
				name: createData.name,
				description: createData.description,
			};

			const mockPrize = new Prize(
				'mock-uuid',
				{id: 'tenant1', name: 'Tenant 1'},
				createData.name,
				createData.description,
				[],
				new Date('2025-01-01'),
				new Date('2025-01-02')
			);

			mockPrizeRepository.createPrize.mockResolvedValue(mockPrize);

			const result = await prizeService.createPrize(createData);

			expect(result).toEqual(mockPrize);
			expect(mockPrizeRepository.createPrize).toHaveBeenCalledWith(insertData);
		});

		it('should force tenantId from context if not provided', async () => {
			const createData: PrizeCreateDTOType = {
				name: 'New Prize',
				description: 'New Prize Description',
				tenantId: 'some-tenant-id', // This will be ignored
			};

			const insertData: PrizeInsertDBType = {
				id: 'mock-uuid',
				tenant_id: authContext.tenantId,
				name: createData.name,
				description: createData.description,
			};

			const mockPrize = new Prize(
				'mock-uuid',
				{id: 'tenant1', name: 'Tenant 1'},
				createData.name,
				createData.description,
				[],
				new Date('2025-01-01'),
				new Date('2025-01-02')
			);

			vi.spyOn(
				AuthorizationService,
				'getTenantAndLocationFromContext'
			).mockReturnValueOnce([authContext.tenantId, undefined]);

			mockPrizeRepository.createPrize.mockResolvedValue(mockPrize);

			const result = await prizeService.createPrize(createData);

			expect(result).toEqual(mockPrize);
			expect(mockPrizeRepository.createPrize).toHaveBeenCalledWith(insertData);
		});
	});
});
