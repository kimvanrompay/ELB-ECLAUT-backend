import {Machine} from '../src/machine/machine.model';

describe('Machine Model', () => {
	it('should return a Machine object', () => {
		const machine = new Machine('1', '1234', 'Machine 1', '1', '1');

		expect(machine).toEqual({
			id: '1',
			serialNumber: '1234',
			name: 'Machine 1',
			gameTypeId: '1',
			tenantId: '1',
		});
	});

	it('should return a Machine object from JSON', () => {
		const machine = Machine.fromJSON({
			id: '1',
			serialNumber: '1234',
			name: 'Machine 1',
			gameTypeId: '1',
			tenantId: '1',
		});

		expect(machine).toEqual({
			id: '1',
			serialNumber: '1234',
			name: 'Machine 1',
			gameTypeId: '1',
			tenantId: '1',
		});
	});

	it('should return an array of Machine objects from JSON', () => {
		const machines = Machine.fromJSON([
			{
				id: '1',
				serialNumber: '1234',
				name: 'Machine 1',
				gameTypeId: '1',
				tenantId: '1',
			},
			{
				id: '2',
				serialNumber: '5678',
				name: 'Machine 2',
				gameTypeId: '2',
				tenantId: '1',
			},
		]);

		expect(machines).toEqual([
			{
				id: '1',
				serialNumber: '1234',
				name: 'Machine 1',
				gameTypeId: '1',
				tenantId: '1',
			},
			{
				id: '2',
				serialNumber: '5678',
				name: 'Machine 2',
				gameTypeId: '2',
				tenantId: '1',
			},
		]);
	});

	it('should return a Machine object from DBType', () => {
		const machine = Machine.fromDBType({
			id: '1',
			serial_number: '1234',
			name: 'Machine 1',
			game_type_id: '1',
			tenant_id: '1',
		});

		expect(machine).toEqual({
			id: '1',
			serialNumber: '1234',
			name: 'Machine 1',
			gameTypeId: '1',
			tenantId: '1',
		});
	});

	it('should return an array of Machine objects from DBType', () => {
		const machines = Machine.fromDBType([
			{
				id: '1',
				serial_number: '1234',
				name: 'Machine 1',
				game_type_id: '1',
				tenant_id: '1',
			},
			{
				id: '2',
				serial_number: '5678',
				name: 'Machine 2',
				game_type_id: '2',
				tenant_id: '1',
			},
		]);

		expect(machines).toEqual([
			{
				id: '1',
				serialNumber: '1234',
				name: 'Machine 1',
				gameTypeId: '1',
				tenantId: '1',
			},
			{
				id: '2',
				serialNumber: '5678',
				name: 'Machine 2',
				gameTypeId: '2',
				tenantId: '1',
			},
		]);
	});

	it('should return a DBType from a Machine object', () => {
		const machine = new Machine('1', '1234', 'Machine 1', '1', '1');
		const dbType = machine.toDBType();

		expect(dbType).toEqual({
			id: '1',
			serial_number: '1234',
			name: 'Machine 1',
			game_type_id: '1',
			tenant_id: '1',
		});
	});
});
