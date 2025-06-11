import {Gametype} from '@lib/models/gametype';

const TEST_GAMETYPE_1 = new Gametype(
	'547ddbab-b9d1-4c3d-8bc2-e0db3668f1ba',
	'Test Gametype 1',
	'This is a test game type for testing purposes.',
	new Date('2025-01-01T12:00:00Z')
);

const TEST_GAMETYPE_2 = new Gametype(
	'8b210d88-3e2c-4e71-883c-5d5706e674ec',
	'Test Gametype 2',
	'This is a test game type for testing purposes.',
	new Date('2025-01-02T12:00:00Z')
);

export {TEST_GAMETYPE_1, TEST_GAMETYPE_2};
