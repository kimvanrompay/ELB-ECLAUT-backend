import knex from 'knex';
import PGClient from 'knex/lib/dialects/postgres';

import {runSQLFiles} from './test-utils';

declare global {
	// eslint-disable-next-line no-var
	var knex: ReturnType<typeof import('knex')>;
}

process.env.TZ = 'UTC';

const connection = knex({
	dialect: 'postgres',
	client: PGClient,
	connection: {
		host: 'localhost',
		user: 'app',
		password: 'example',
		database: 'elaut',
		port: 5433,
	},
	pool: {
		min: 1,
		max: 7,
	},
});

const awaitDbConnection = async (startTime = Date.now()) => {
	try {
		await connection.raw('SELECT 1');
		return true;
	} catch {
		if (Date.now() - startTime > 5000) {
			throw new Error('Could not connect to the database');
		}
		return await awaitDbConnection(startTime);
	}
};

beforeAll(async () => {
	await awaitDbConnection();
	await runSQLFiles(connection, ['./test/test-data/reset.sql']);
});

afterAll(async () => {
	await runSQLFiles(connection, ['./test/test-data/reset.sql']);
	await connection.destroy();
});

global.knex = connection;
