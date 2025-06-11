import {Cabinet} from '@lib/models/cabinet';
import {Playfield} from '@lib/models/playfield';

const TEST_CABINET_1 = new Cabinet(
	'2ba8565a-aa9c-4f74-b6ea-df1d4784ab69',
	{
		id: '191e84db-b52f-46f9-bd53-b0b68241b0d2',
		name: 'Elaut Group',
	},
	{
		id: 'e5a0ec4e-e27f-4e41-9955-8d6e169c58f6',
		name: 'Elaut Belgium',
	},
	'Test Cabinet 1',
	[
		{
			id: 'effcdd6f-d15a-473f-9eb2-b5cd8eee12d6',
			name: 'Test Playfield 1.1',
			gametypeId: '547ddbab-b9d1-4c3d-8bc2-e0db3668f1ba',
			status: 'ACTIVE',
		},
		{
			id: '3d676b06-eba8-46a9-bc5b-7e95b21fb3a5',
			name: 'Test Playfield 1.2',
			gametypeId: '547ddbab-b9d1-4c3d-8bc2-e0db3668f1ba',
			status: 'ACTIVE',
		},
	],
	new Date('2025-01-01T12:00:00Z')
);

const TEST_CABINET_2 = new Cabinet(
	'3c9f8b2d-4e5f-6a7b-8c9d-e0f1a2b3c4d5',
	{
		id: '191e84db-b52f-46f9-bd53-b0b68241b0d2',
		name: 'Elaut Group',
	},
	{
		id: 'e5a0ec4e-e27f-4e41-9955-8d6e169c58f6',
		name: 'Elaut Belgium',
	},
	'Test Cabinet 2',
	[
		{
			id: 'b1c2d3e4-f5a6-7b8c-9d0e-f1a2b3c4d5e6',
			name: 'Test Playfield 2.1',
			gametypeId: '8b210d88-3e2c-4e71-883c-5d5706e674ec',
			status: 'ACTIVE',
		},
	],
	new Date('2025-01-01T12:00:00Z')
);

const TEST_PLAYFIELD_1_1 = new Playfield(
	'effcdd6f-d15a-473f-9eb2-b5cd8eee12d6',
	{
		serialNumber: '2ba8565a-aa9c-4f74-b6ea-df1d4784ab69',
		name: 'Test Cabinet 1',
		tenant: {
			id: '191e84db-b52f-46f9-bd53-b0b68241b0d2',
			name: 'Elaut Group',
		},
		location: {
			id: 'e5a0ec4e-e27f-4e41-9955-8d6e169c58f6',
			name: 'Elaut Belgium',
		},
		playfields: [
			{
				id: 'effcdd6f-d15a-473f-9eb2-b5cd8eee12d6',
				name: 'Test Playfield 1.1',
				status: 'ACTIVE',
			},
			{
				id: '3d676b06-eba8-46a9-bc5b-7e95b21fb3a5',
				name: 'Test Playfield 1.2',
				status: 'ACTIVE',
			},
		],
	},
	'Test Playfield 1.1',
	{
		id: '547ddbab-b9d1-4c3d-8bc2-e0db3668f1ba',
		name: 'Test Game Type 1',
	},
	'ACTIVE',
	new Date('2025-01-01T12:00:00Z')
);

const TEST_PLAYFIELD_1_2 = new Playfield(
	'3d676b06-eba8-46a9-bc5b-7e95b21fb3a5',
	{
		serialNumber: '2ba8565a-aa9c-4f74-b6ea-df1d4784ab69',
		name: 'Test Cabinet 1',
		tenant: {
			id: '191e84db-b52f-46f9-bd53-b0b68241b0d2',
			name: 'Elaut Group',
		},
		location: {
			id: 'e5a0ec4e-e27f-4e41-9955-8d6e169c58f6',
			name: 'Elaut Belgium',
		},
		playfields: [
			{
				id: 'effcdd6f-d15a-473f-9eb2-b5cd8eee12d6',
				name: 'Test Playfield 1.1',
				status: 'ACTIVE',
			},
			{
				id: '3d676b06-eba8-46a9-bc5b-7e95b21fb3a5',
				name: 'Test Playfield 1.2',
				status: 'ACTIVE',
			},
		],
	},
	'Test Playfield 1.2',
	{
		id: '547ddbab-b9d1-4c3d-8bc2-e0db3668f1ba',
		name: 'Test Game Type 1',
	},
	'ACTIVE',
	new Date('2025-01-01T12:00:00Z')
);

const TEST_PLAYFIELD_2_1 = new Playfield(
	'f1119742-d17d-4f8a-9673-c0489bc83f18',
	{
		serialNumber: '3c9f8b2d-4e5f-6a7b-8c9d-e0f1a2b3c4d5',
		name: 'Test Cabinet 2',
		tenant: {
			id: '191e84db-b52f-46f9-bd53-b0b68241b0d2',
			name: 'Elaut Group',
		},
		location: {
			id: 'e5a0ec4e-e27f-4e41-9955-8d6e169c58f6',
			name: 'Elaut Belgium',
		},
		playfields: [
			{
				id: 'b1c2d3e4-f5a6-7b8c-9d0e-f1a2b3c4d5e6',
				name: 'Test Playfield 2.1',
				status: 'ACTIVE',
			},
		],
	},
	'Test Playfield 2.1',
	{
		id: '8b210d88-3e2c-4e71-883c-5d5706e674ec',
		name: 'Test Game Type 2',
	},
	'ACTIVE',
	new Date('2025-01-01T12:00:00Z')
);

export {
	TEST_CABINET_1,
	TEST_CABINET_2,
	TEST_PLAYFIELD_1_1,
	TEST_PLAYFIELD_1_2,
	TEST_PLAYFIELD_2_1,
};
