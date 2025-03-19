import {Playfield} from '../../src/playfield/playfield.model';

describe('Playfield Model', () => {
	it('should return a Playfield object', () => {
		const playfield = new Playfield(
			'1',
			{
				serialNumber: '1234',
				name: 'Playfield 1',
				tenantId: '1',
				tenantLocationId: '1',
				playfields: [
					{
						id: '1',
						name: 'Playfield 1',
						status: 'status',
					},
				],
			},
			'Playfield 1',
			'1',
			'status'
		);

		expect(playfield).toEqual({
			id: '1',
			cabinet: {
				serialNumber: '1234',
				name: 'Playfield 1',
				tenantId: '1',
				tenantLocationId: '1',
				playfields: [
					{
						id: '1',
						name: 'Playfield 1',
						status: 'status',
					},
				],
			},
			name: 'Playfield 1',
			gametypeId: '1',
			status: 'status',
		});
	});

	it('should return a Playfield object from JSON', () => {
		const playfield = Playfield.fromJSON({
			id: '1',
			cabinet: {
				serialNumber: '1234',
				name: 'Playfield 1',
				tenantId: '1',
				tenantLocationId: '1',
				playfields: [
					{
						id: '1',
						name: 'Playfield 1',
						status: 'status',
					},
				],
			},
			name: 'Playfield 1',
			gametypeId: '1',
			status: 'status',
		});

		expect(playfield).toEqual({
			id: '1',
			cabinet: {
				serialNumber: '1234',
				name: 'Playfield 1',
				tenantId: '1',
				tenantLocationId: '1',
				playfields: [
					{
						id: '1',
						name: 'Playfield 1',
						status: 'status',
					},
				],
			},
			name: 'Playfield 1',
			gametypeId: '1',
			status: 'status',
		});
	});

	it('should return an array of Playfield objects from JSON', () => {
		const playfields = Playfield.fromJSON([
			{
				id: '1',
				cabinet: {
					serialNumber: '1234',
					name: 'Playfield 1',
					tenantId: '1',
					tenantLocationId: '1',
					playfields: [
						{
							id: '1',
							name: 'Playfield 1',
							status: 'status',
						},
					],
				},
				name: 'Playfield 1',
				gametypeId: '1',
				status: 'status',
			},
			{
				id: '2',
				cabinet: {
					serialNumber: '5678',
					name: 'Playfield 2',
					tenantId: '1',
					tenantLocationId: '1',
					playfields: [
						{
							id: '2',
							name: 'Playfield 2',
							status: 'status',
						},
					],
				},
				name: 'Playfield 2',
				gametypeId: '2',
				status: 'status',
			},
		]);

		expect(playfields).toEqual([
			{
				id: '1',
				cabinet: {
					serialNumber: '1234',
					name: 'Playfield 1',
					tenantId: '1',
					tenantLocationId: '1',
					playfields: [
						{
							id: '1',
							name: 'Playfield 1',
							status: 'status',
						},
					],
				},
				name: 'Playfield 1',
				gametypeId: '1',
				status: 'status',
			},
			{
				id: '2',
				cabinet: {
					serialNumber: '5678',
					name: 'Playfield 2',
					tenantId: '1',
					tenantLocationId: '1',
					playfields: [
						{
							id: '2',
							name: 'Playfield 2',
							status: 'status',
						},
					],
				},
				name: 'Playfield 2',
				gametypeId: '2',
				status: 'status',
			},
		]);
	});

	it('should return a Playfield object from DBType', () => {
		const playfield = Playfield.fromDBType({
			id: '1',
			serial_number: '1234',
			name: 'Playfield 1',
			game_type_id: '1',
			tenant_id: '1',
			tenant_location_id: '1',
		});

		expect(playfield).toEqual({
			id: '1',
			cabinet: {
				serialNumber: '1234',
				name: 'Playfield 1',
				tenantId: '1',
				tenantLocationId: '1',
				playfields: [
					{
						id: '1',
						name: 'Playfield 1',
						status: 'UNKNOWN',
					},
				],
			},
			name: 'Playfield 1',
			gametypeId: '1',
			status: 'UNKNOWN',
		});
	});

	it('should return an array of Playfield objects from DBType', () => {
		const playfields = Playfield.fromDBType([
			{
				id: '1',
				serial_number: '1234',
				name: 'Playfield 1',
				game_type_id: '1',
				tenant_id: '1',
				tenant_location_id: '1',
			},
			{
				id: '2',
				serial_number: '5678',
				name: 'Playfield 2',
				game_type_id: '2',
				tenant_id: '1',
				tenant_location_id: '1',
			},
		]);

		expect(playfields).toEqual([
			{
				id: '1',
				cabinet: {
					serialNumber: '1234',
					name: 'Playfield 1',
					tenantId: '1',
					tenantLocationId: '1',
					playfields: [
						{
							id: '1',
							name: 'Playfield 1',
							status: 'UNKNOWN',
						},
					],
				},
				name: 'Playfield 1',
				gametypeId: '1',
				status: 'UNKNOWN',
			},
			{
				id: '2',
				cabinet: {
					serialNumber: '5678',
					name: 'Playfield 2',
					tenantId: '1',
					tenantLocationId: '1',
					playfields: [
						{
							id: '2',
							name: 'Playfield 2',
							status: 'UNKNOWN',
						},
					],
				},
				name: 'Playfield 2',
				gametypeId: '2',
				status: 'UNKNOWN',
			},
		]);
	});

	it('should return a Playfield object from DBType with cabinet', () => {
		const playfield = Playfield.fromDBTypeWithCabinet({
			id: '1',
			serial_number: '1234',
			name: 'Playfield 1',
			game_type_id: '1',
			tenant_id: '1',
			tenant_location_id: '1',
			cabinet: JSON.stringify({
				serial_number: '1234',
				name: 'Playfield 1',
				tenant_id: '1',
				tenant_location_id: '1',
				playfields: [
					{
						id: '1',
						name: 'Playfield 1',
						status: 'status',
						gametype_id: '1',
					},
					{
						id: '2',
						name: 'Playfield 2',
						status: 'status',
						gametype_id: '1',
					},
				],
			}),
		});

		expect(playfield).toEqual({
			id: '1',
			cabinet: {
				serialNumber: '1234',
				name: 'Playfield 1',
				tenantId: '1',
				tenantLocationId: '1',
				playfields: [
					{
						id: '1',
						name: 'Playfield 1',
						status: 'status',
						gametypeId: '1',
					},
					{
						id: '2',
						name: 'Playfield 2',
						status: 'status',
						gametypeId: '1',
					},
				],
			},
			name: 'Playfield 1',
			gametypeId: '1',
			status: 'UNKNOWN',
		});
	});

	it('should return an array of Playfield objects from DBType with cabinet', () => {
		const playfields = Playfield.fromDBTypeWithCabinet([
			{
				id: '1',
				serial_number: '1234',
				name: 'Playfield 1',
				game_type_id: '1',
				tenant_id: '1',
				tenant_location_id: '1',
				cabinet: JSON.stringify({
					serial_number: '1234',
					name: 'Playfield 1',
					tenant_id: '1',
					tenant_location_id: '1',
					playfields: [
						{
							id: '1',
							name: 'Playfield 1',
							status: 'status',
							gametype_id: '1',
						},
						{
							id: '2',
							name: 'Playfield 2',
							status: 'status',
							gametype_id: '1',
						},
					],
				}),
			},
			{
				id: '2',
				serial_number: '5678',
				name: 'Playfield 2',
				game_type_id: '2',
				tenant_id: '1',
				tenant_location_id: '1',
				cabinet: JSON.stringify({
					serial_number: '5678',
					name: 'Playfield 2',
					tenant_id: '1',
					tenant_location_id: '1',
					playfields: [
						{
							id: '3',
							name: 'Playfield 3',
							status: 'status',
							gametype_id: '2',
						},
						{
							id: '4',
							name: 'Playfield 4',
							status: 'status',
							gametype_id: '2',
						},
					],
				}),
			},
		]);

		expect(playfields).toEqual([
			{
				id: '1',
				cabinet: {
					serialNumber: '1234',
					name: 'Playfield 1',
					tenantId: '1',
					tenantLocationId: '1',
					playfields: [
						{
							id: '1',
							name: 'Playfield 1',
							status: 'status',
							gametypeId: '1',
						},
						{
							id: '2',
							name: 'Playfield 2',
							status: 'status',
							gametypeId: '1',
						},
					],
				},
				name: 'Playfield 1',
				gametypeId: '1',
				status: 'UNKNOWN',
			},
			{
				id: '2',
				cabinet: {
					serialNumber: '5678',
					name: 'Playfield 2',
					tenantId: '1',
					tenantLocationId: '1',
					playfields: [
						{
							id: '3',
							name: 'Playfield 3',
							status: 'status',
							gametypeId: '2',
						},
						{
							id: '4',
							name: 'Playfield 4',
							status: 'status',
							gametypeId: '2',
						},
					],
				},
				name: 'Playfield 2',
				gametypeId: '2',
				status: 'UNKNOWN',
			},
		]);
	});
});
