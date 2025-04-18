import {
	Playfield,
	type PlayfieldDBType,
	type PlayfieldDTOType,
} from '../../src/playfield/playfield.model';

describe('Playfield Model', () => {
	it('should return a Playfield object', () => {
		const playfield = new Playfield(
			'1',
			{
				serialNumber: '1234',
				name: 'Playfield 1',
				tenant: {
					id: '1',
					name: 'Tenant 1',
				},
				location: {
					id: '1',
					name: 'Tenant 1 Location 1',
				},
				playfields: [
					{
						id: '1',
						name: 'Playfield 1',
						status: 'status',
					},
				],
			},
			'Playfield 1',
			{
				id: '1',
				name: 'Gametype 1',
			},
			'status'
		);

		const expectedPlayfield: PlayfieldDTOType = {
			id: '1',
			cabinet: {
				serialNumber: '1234',
				name: 'Playfield 1',
				tenant: {
					id: '1',
					name: 'Tenant 1',
				},
				location: {
					id: '1',
					name: 'Tenant 1 Location 1',
				},
				playfields: [
					{
						id: '1',
						name: 'Playfield 1',
						status: 'status',
					},
				],
			},
			name: 'Playfield 1',
			gametype: {
				id: '1',
				name: 'Gametype 1',
			},
			status: 'status',
		};

		expect(playfield).toEqual(expectedPlayfield);
	});

	it('should return a Playfield object from JSON', () => {
		const playfield = Playfield.fromJSON({
			id: '1',
			cabinet: {
				serialNumber: '1234',
				name: 'Playfield 1',
				tenant: {
					id: '1',
					name: 'Tenant 1',
				},
				location: {
					id: '1',
					name: 'Tenant 1 Location 1',
				},
				playfields: [
					{
						id: '1',
						name: 'Playfield 1',
						status: 'status',
					},
				],
			},
			name: 'Playfield 1',
			gametype: {
				id: '1',
				name: 'Gametype 1',
			},
			status: 'status',
		});

		const expectedPlayfield: PlayfieldDTOType = {
			id: '1',
			cabinet: {
				serialNumber: '1234',
				name: 'Playfield 1',
				tenant: {
					id: '1',
					name: 'Tenant 1',
				},
				location: {
					id: '1',
					name: 'Tenant 1 Location 1',
				},
				playfields: [
					{
						id: '1',
						name: 'Playfield 1',
						status: 'status',
					},
				],
			},
			name: 'Playfield 1',
			gametype: {
				id: '1',
				name: 'Gametype 1',
			},
			status: 'status',
		};

		expect(playfield).toEqual(expectedPlayfield);
	});

	it('should return an array of Playfield objects from JSON', () => {
		const playfields = Playfield.fromJSON([
			{
				id: '1',
				cabinet: {
					serialNumber: '1234',
					name: 'Playfield 1',
					tenant: {
						id: '1',
						name: 'Tenant 1',
					},
					location: {
						id: '1',
						name: 'Tenant 1 Location 1',
					},
					playfields: [
						{
							id: '1',
							name: 'Playfield 1',
							status: 'status',
						},
					],
				},
				name: 'Playfield 1',
				gametype: {
					id: '1',
					name: 'Gametype 1',
				},
				status: 'status',
			},
			{
				id: '2',
				cabinet: {
					serialNumber: '5678',
					name: 'Playfield 2',
					tenant: {
						id: '1',
						name: 'Tenant 1',
					},
					location: {
						id: '1',
						name: 'Tenant 1 Location 1',
					},
					playfields: [
						{
							id: '2',
							name: 'Playfield 2',
							status: 'status',
						},
					],
				},
				name: 'Playfield 2',
				gametype: {
					id: '2',
					name: 'Gametype 2',
				},
				status: 'status',
			},
		]);

		const expectedPlayfields: PlayfieldDTOType[] = [
			{
				id: '1',
				cabinet: {
					serialNumber: '1234',
					name: 'Playfield 1',
					tenant: {
						id: '1',
						name: 'Tenant 1',
					},
					location: {
						id: '1',
						name: 'Tenant 1 Location 1',
					},
					playfields: [
						{
							id: '1',
							name: 'Playfield 1',
							status: 'status',
						},
					],
				},
				name: 'Playfield 1',
				gametype: {
					id: '1',
					name: 'Gametype 1',
				},
				status: 'status',
			},
			{
				id: '2',
				cabinet: {
					serialNumber: '5678',
					name: 'Playfield 2',
					tenant: {
						id: '1',
						name: 'Tenant 1',
					},
					location: {
						id: '1',
						name: 'Tenant 1 Location 1',
					},
					playfields: [
						{
							id: '2',
							name: 'Playfield 2',
							status: 'status',
						},
					],
				},
				name: 'Playfield 2',
				gametype: {
					id: '2',
					name: 'Gametype 2',
				},
				status: 'status',
			},
		];

		expect(playfields).toEqual(expectedPlayfields);
	});

	it('should return a Playfield object from DBType', () => {
		const playfield = Playfield.fromDBType({
			id: '1',
			serial_number: '1234',
			name: 'Playfield 1',
			game_type_id: '1',
			tenant_id: '1',
			tenant_location_id: '1',
			last_machine_message: undefined,
			gametype_name: 'Gametype 1',
			tenant_name: 'Tenant 1',
			tenant_location_name: 'Tenant 1 Location 1',
			status: undefined,
			error_code: undefined,
			error_event_data: undefined,
			error_is_active: undefined,
		});

		const expectedPlayfield: PlayfieldDTOType = {
			id: '1',
			cabinet: {
				serialNumber: '1234',
				name: 'Playfield 1',
				tenant: {
					id: '1',
					name: 'Tenant 1',
				},
				location: {
					id: '1',
					name: 'Tenant 1 Location 1',
				},
				playfields: [
					{
						id: '1',
						name: 'Playfield 1',
						status: 'UNKNOWN',
					},
				],
			},
			name: 'Playfield 1',
			gametype: {
				id: '1',
				name: 'Gametype 1',
			},
			status: 'UNKNOWN',
		};

		expect(playfield).toEqual(expectedPlayfield);
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
				last_machine_message: undefined,
				gametype_name: 'Gametype 1',
				tenant_name: 'Tenant 1',
				tenant_location_name: 'Tenant 1 Location 1',
				status: undefined,
				error_code: undefined,
				error_event_data: undefined,
				error_is_active: undefined,
			},
			{
				id: '2',
				serial_number: '5678',
				name: 'Playfield 2',
				game_type_id: '2',
				tenant_id: '1',
				tenant_location_id: '1',
				last_machine_message: undefined,
				gametype_name: 'Gametype 2',
				tenant_name: 'Tenant 1',
				tenant_location_name: 'Tenant 1 Location 1',
				status: undefined,
				error_code: undefined,
				error_event_data: undefined,
				error_is_active: undefined,
			},
		]);

		const expectedPlayfields: PlayfieldDTOType[] = [
			{
				id: '1',
				cabinet: {
					serialNumber: '1234',
					name: 'Playfield 1',
					tenant: {
						id: '1',
						name: 'Tenant 1',
					},
					location: {
						id: '1',
						name: 'Tenant 1 Location 1',
					},
					playfields: [
						{
							id: '1',
							name: 'Playfield 1',
							status: 'UNKNOWN',
						},
					],
				},
				name: 'Playfield 1',
				gametype: {
					id: '1',
					name: 'Gametype 1',
				},
				status: 'UNKNOWN',
			},
			{
				id: '2',
				cabinet: {
					serialNumber: '5678',
					name: 'Playfield 2',
					tenant: {
						id: '1',
						name: 'Tenant 1',
					},
					location: {
						id: '1',
						name: 'Tenant 1 Location 1',
					},
					playfields: [
						{
							id: '2',
							name: 'Playfield 2',
							status: 'UNKNOWN',
						},
					],
				},
				name: 'Playfield 2',
				gametype: {
					id: '2',
					name: 'Gametype 2',
				},
				status: 'UNKNOWN',
			},
		];

		expect(playfields).toEqual(expectedPlayfields);
	});

	it('should return a Playfield object from DBType with cabinet', () => {
		const playfield = Playfield.fromDBTypeWithCabinet({
			id: '1',
			serial_number: '1234',
			name: 'Playfield 1',
			gametype_id: '1',
			tenant_id: '1',
			tenant_location_id: '1',
			last_machine_message: undefined,
			gametype_name: 'Gametype 1',
			tenant_name: 'Tenant 1',
			tenant_location_name: 'Tenant 1 Location 1',
			status: undefined,
			error_code: undefined,
			error_event_data: undefined,
			error_is_active: undefined,
			cabinet: JSON.stringify({
				serial_number: '1234',
				name: 'Playfield 1',
				tenant_id: '1',
				tenant_location_id: '1',
				tenant_name: 'Tenant 1',
				tenant_location_name: 'Tenant 1 Location 1',
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

		const expectedPlayfield = {
			id: '1',
			name: 'Playfield 1',
			gametype: {
				id: '1',
				name: 'Gametype 1',
			},
			status: 'UNKNOWN',
			cabinet: {
				serialNumber: '1234',
				name: 'Playfield 1',
				tenant: {
					id: '1',
					name: 'Tenant 1',
				},
				location: {
					id: '1',
					name: 'Tenant 1 Location 1',
				},
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
		};

		expect(playfield).toEqual(expectedPlayfield);
	});

	it('should return an array of Playfield objects from DBType with cabinet', () => {
		const playfields = Playfield.fromDBTypeWithCabinet([
			{
				id: '1',
				serial_number: '1234',
				name: 'Playfield 1',
				gametype_id: '1',
				tenant_id: '1',
				tenant_location_id: '1',
				last_machine_message: undefined,
				gametype_name: 'Gametype 1',
				tenant_name: 'Tenant 1',
				tenant_location_name: 'Tenant 1 Location 1',
				status: undefined,
				error_code: undefined,
				error_event_data: undefined,
				error_is_active: undefined,
				cabinet: JSON.stringify({
					serial_number: '1234',
					name: 'Playfield 1',
					tenant_id: '1',
					tenant_location_id: '1',
					tenant_name: 'Tenant 1',
					tenant_location_name: 'Tenant 1 Location 1',
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
				gametype_id: '2',
				tenant_id: '1',
				tenant_location_id: '1',
				last_machine_message: undefined,
				gametype_name: 'Gametype 2',
				tenant_name: 'Tenant 1',
				tenant_location_name: 'Tenant 1 Location 1',
				status: undefined,
				error_code: undefined,
				error_event_data: undefined,
				error_is_active: undefined,
				cabinet: JSON.stringify({
					serial_number: '5678',
					name: 'Playfield 2',
					tenant_id: '1',
					tenant_location_id: '1',
					tenant_name: 'Tenant 1',
					tenant_location_name: 'Tenant 1 Location 1',
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

		const expectedPlayfields = [
			{
				id: '1',
				cabinet: {
					serialNumber: '1234',
					name: 'Playfield 1',
					tenant: {
						id: '1',
						name: 'Tenant 1',
					},
					location: {
						id: '1',
						name: 'Tenant 1 Location 1',
					},
					playfields: [
						{
							gametypeId: '1',
							id: '1',
							name: 'Playfield 1',
							status: 'status',
						},
						{
							gametypeId: '1',
							id: '2',
							name: 'Playfield 2',
							status: 'status',
						},
					],
				},
				name: 'Playfield 1',
				gametype: {
					id: '1',
					name: 'Gametype 1',
				},
				status: 'UNKNOWN',
			},
			{
				id: '2',
				cabinet: {
					serialNumber: '5678',
					name: 'Playfield 2',
					tenant: {
						id: '1',
						name: 'Tenant 1',
					},
					location: {
						id: '1',
						name: 'Tenant 1 Location 1',
					},
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
				gametype: {
					id: '2',
					name: 'Gametype 2',
				},
				status: 'UNKNOWN',
			},
		];

		expect(playfields).toEqual(expectedPlayfields);
	});
});
