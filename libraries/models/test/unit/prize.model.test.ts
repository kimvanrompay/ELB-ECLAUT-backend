import {Prize} from '../../src/prize/prize.model';
import type {PrizeDBType} from '../../src/prize/prize.schema';

describe('Prize', () => {
	describe('fromDTO', () => {
		it('should return a Prize instance from a DTO', () => {
			const dto = {
				id: '1',
				tenant: {id: 'tenant1', name: 'Tenant Name'},
				name: 'Prize Name',
				description: 'Prize Description',
				playfields: [
					{id: 'playfield1', name: 'Playfield 1', serialNumber: 'SN123'},
				],
				createdAt: new Date('2023-01-01'),
				updatedAt: new Date('2023-01-02'),
			};

			const prize = Prize.fromDTO(dto);

			expect(prize).toBeInstanceOf(Prize);
			expect(prize.id).toBe(dto.id);
			expect(prize.tenant.id).toBe(dto.tenant.id);
			expect(prize.tenant.name).toBe(dto.tenant.name);
			expect(prize.name).toBe(dto.name);
			expect(prize.description).toBe(dto.description);
			expect(prize.createdAt).toEqual(dto.createdAt);
			expect(prize.updatedAt).toEqual(dto.updatedAt);
			expect(prize.playfields).toHaveLength(1);
			expect(prize.playfields[0]!.id).toBe('playfield1');
			expect(prize.playfields[0]!.name).toBe('Playfield 1');
			expect(prize.playfields[0]!.serialNumber).toBe('SN123');
		});

		it('should return multiple Prize instances from an array of DTOs', () => {
			const dtos = [
				{
					id: '1',
					tenant: {id: 'tenant1', name: 'Tenant Name'},
					name: 'Prize Name',
					description: 'Prize Description',
					playfields: [],
					createdAt: new Date('2023-01-01'),
					updatedAt: new Date('2023-01-02'),
				},
				{
					id: '2',
					tenant: {id: 'tenant2', name: 'Another Tenant'},
					name: 'Another Prize',
					description: 'Another Description',
					playfields: [
						{id: 'playfield2', name: 'Playfield 2', serialNumber: 'SN456'},
					],
					createdAt: new Date('2023-01-03'),
					updatedAt: new Date('2023-01-04'),
				},
			];

			const prizes = Prize.fromDTO(dtos);

			expect(Array.isArray(prizes)).toBe(true);
			expect(prizes).toHaveLength(2);
			expect(prizes[0]).toBeInstanceOf(Prize);
			expect(prizes[0]!.id).toBe('1');
			expect(prizes[0]!.tenant.id).toBe('tenant1');
			expect(prizes[0]!.name).toBe('Prize Name');
			expect(prizes[0]!.playfields).toHaveLength(0);
			expect(prizes[1]).toBeInstanceOf(Prize);
			expect(prizes[1]!.id).toBe('2');
			expect(prizes[1]!.tenant.id).toBe('tenant2');
			expect(prizes[1]!.name).toBe('Another Prize');
			expect(prizes[1]!.playfields).toHaveLength(1);
			expect(prizes[1]!.playfields[0]!.id).toBe('playfield2');
			expect(prizes[1]!.playfields[0]!.name).toBe('Playfield 2');
			expect(prizes[1]!.playfields[0]!.serialNumber).toBe('SN456');
		});
	});

	describe('fromDB', () => {
		it('should return a Prize instance from a single DBType', () => {
			const dbData: PrizeDBType = {
				id: '1',
				tenant_id: 'tenant1',
				tenant_name: 'Tenant Name',
				name: 'Prize Name',
				description: 'Prize Description',
				created_at: new Date('2023-01-01'),
				updated_at: new Date('2023-01-02'),
				playfields: [
					{id: 'playfield1', name: 'Playfield 1', serialNumber: 'SN123'},
					{id: 'playfield2', name: 'Playfield 2', serialNumber: 'SN456'},
				],
			};

			const prize = Prize.fromDB(dbData);

			expect(prize).toBeInstanceOf(Prize);
			expect(prize.id).toBe(dbData.id);
			expect(prize.tenant.id).toBe(dbData.tenant_id);
			expect(prize.tenant.name).toBe(dbData.tenant_name);
			expect(prize.name).toBe(dbData.name);
			expect(prize.description).toBe(dbData.description);
			expect(prize.createdAt).toEqual(dbData.created_at);
			expect(prize.updatedAt).toEqual(dbData.updated_at);
			expect(prize.playfields).toHaveLength(2);
			expect(prize.playfields[0]!.id).toBe('playfield1');
			expect(prize.playfields[0]!.name).toBe('Playfield 1');
			expect(prize.playfields[0]!.serialNumber).toBe('SN123');
			expect(prize.playfields[1]!.id).toBe('playfield2');
			expect(prize.playfields[1]!.name).toBe('Playfield 2');
			expect(prize.playfields[1]!.serialNumber).toBe('SN456');
		});

		it('should return multiple Prize instances from an array of DBTypes', () => {
			const dbData: PrizeDBType[] = [
				{
					id: '1',
					tenant_id: 'tenant1',
					tenant_name: 'Tenant Name',
					name: 'Prize Name',
					description: 'Prize Description',
					created_at: new Date('2023-01-01'),
					updated_at: new Date('2023-01-02'),
					playfields: [],
				},
				{
					id: '2',
					tenant_id: 'tenant2',
					tenant_name: 'Another Tenant',
					name: 'Another Prize',
					description: 'Another Description',
					created_at: new Date('2023-01-03'),
					updated_at: new Date('2023-01-04'),
					playfields: [
						{id: 'playfield3', name: 'Playfield 3', serialNumber: 'SN789'},
					],
				},
			];

			const prizes = Prize.fromDB(dbData);

			expect(Array.isArray(prizes)).toBe(true);
			expect(prizes).toHaveLength(2);
			expect(prizes[0]).toBeInstanceOf(Prize);
			expect(prizes[0]!.id).toBe('1');
			expect(prizes[0]!.tenant.id).toBe('tenant1');
			expect(prizes[0]!.name).toBe('Prize Name');
			expect(prizes[0]!.playfields).toHaveLength(0);
			expect(prizes[1]).toBeInstanceOf(Prize);
			expect(prizes[1]!.id).toBe('2');
			expect(prizes[1]!.tenant.id).toBe('tenant2');
			expect(prizes[1]!.name).toBe('Another Prize');
			expect(prizes[1]!.playfields).toHaveLength(1);
			expect(prizes[1]!.playfields[0]!.id).toBe('playfield3');
			expect(prizes[1]!.playfields[0]!.name).toBe('Playfield 3');
			expect(prizes[1]!.playfields[0]!.serialNumber).toBe('SN789');
		});
	});

	describe('toDB', () => {
		it('should return a DBType from a Prize instance', () => {
			const prize = new Prize(
				'1',
				{id: 'tenant1', name: 'Tenant Name'},
				'Prize Name',
				'Prize Description',
				[{id: 'playfield1', name: 'Playfield 1', serialNumber: 'SN123'}],
				new Date('2023-01-01'),
				new Date('2023-01-02')
			);

			const dbType = prize.toDB();

			expect(dbType.id).toBe(prize.id);
			expect(dbType.tenant_id).toBe(prize.tenant.id);
			expect(dbType.tenant_name).toBe(prize.tenant.name);
			expect(dbType.name).toBe(prize.name);
			expect(dbType.description).toBe(prize.description);
			expect(dbType.created_at).toEqual(prize.createdAt);
			expect(dbType.updated_at).toEqual(prize.updatedAt);
			expect(dbType.playfields).toHaveLength(1);
			expect(dbType.playfields[0]!.id).toBe('playfield1');
			expect(dbType.playfields[0]!.name).toBe('Playfield 1');
			expect(dbType.playfields[0]!.serialNumber).toBe('SN123');
		});

		it('should handle empty playfields array when creating a DBType', () => {
			const prize = new Prize(
				'1',
				{id: 'tenant1', name: 'Tenant Name'},
				'Prize Name',
				'Prize Description',
				[],
				new Date('2023-01-01'),
				new Date('2023-01-02')
			);

			const dbType = prize.toDB();

			expect(dbType.playfields).toHaveLength(0);
		});
	});

	describe('getInsertDBFromCreateDTO', () => {
		it('generates a valid insert DB object from a create DTO', () => {
			const createDTO = {
				tenantId: 'tenant1',
				name: 'Prize Name',
				description: 'Prize Description',
			};

			const insertDB = Prize.getInsertDBFromCreateDTO(createDTO);

			expect(insertDB.id).toBeDefined();
			expect(insertDB.id).toHaveLength(36); // UUID length
			expect(insertDB.tenant_id).toBe(createDTO.tenantId);
			expect(insertDB.name).toBe(createDTO.name);
			expect(insertDB.description).toBe(createDTO.description);
		});
	});

	describe('getUpdateDBFromUpdateDTO', () => {
		it('generates a valid update DB object from an update DTO', () => {
			const updateDTO = {
				name: 'Updated Prize Name',
				description: 'Updated Prize Description',
			};

			const updateDB = Prize.getUpdateDBFromUpdateDTO(updateDTO);

			expect(updateDB.name).toBe(updateDTO.name);
			expect(updateDB.description).toBe(updateDTO.description);
		});
	});
});
