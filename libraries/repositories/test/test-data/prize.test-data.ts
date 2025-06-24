import {Prize} from '@lib/models/prize';

const TEST_PRIZE_1 = new Prize(
	'd38cf9d5-fde1-45e5-bfb7-13c18c3dcc2e',
	{
		id: '191e84db-b52f-46f9-bd53-b0b68241b0d2',
		name: 'Elaut Group',
	},
	'Test Prize 1',
	'Test Prize Description 1',
	[],
	new Date('2025-01-01T00:00:00Z'),
	new Date('2025-01-01:59:59Z')
);

const TEST_PRIZE_2 = new Prize(
	'5afd3f85-fb1a-4b80-8d82-1ceb4667c80d',
	{
		id: '191e84db-b52f-46f9-bd53-b0b68241b0d2',
		name: 'Elaut Group',
	},
	'Test Prize 2',
	'Test Prize Description 2',
	[],
	new Date('2025-01-02T00:00:00Z'),
	new Date('2025-01-02T23:59:59Z')
);

export {TEST_PRIZE_1, TEST_PRIZE_2};
