import knex, {type Knex} from 'knex';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import PGClient from 'knex/lib/dialects/postgres/index.js';

import {getAwsSecret} from '@lib/utils/aws-secret-manager';

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace global {
	let postgresDatabase: Knex | undefined;
}

type DatabaseConfig = {
	host: string;
	port: number;
	user: string;
	password: string;
	database: string;
};

const getAwsDatabaseCredentials = async () => {
	const secretName = process.env.AWS_DB_SECRET;

	if (!secretName) {
		throw new Error('No AWS_DB_SECRET environment variable set');
	}

	const creds = await getAwsSecret<{
		host: string;
		port: number;
		username: string;
		password: string;
		dbname: string;
	}>(secretName);

	return {
		host: creds.host,
		port: creds.port,
		user: creds.username,
		password: creds.password,
		database: creds.dbname,
	};
};

const getPossiblyLocalDatabaseConfig = async (): Promise<DatabaseConfig> => {
	const POSTGRES_HOST = process.env.POSTGRES_HOST;
	const POSTGRES_PORT = process.env.POSTGRES_PORT;
	const POSTGRES_USER = process.env.POSTGRES_USER;
	const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
	const POSTGRES_DB = process.env.POSTGRES_DB;

	const areAllEnvVarsSet =
		!!POSTGRES_HOST &&
		!!POSTGRES_PORT &&
		!!POSTGRES_USER &&
		!!POSTGRES_PASSWORD &&
		!!POSTGRES_DB;

	if (areAllEnvVarsSet) {
		return {
			host: POSTGRES_HOST!,
			port: parseInt(POSTGRES_PORT!),
			user: POSTGRES_USER!,
			password: POSTGRES_PASSWORD!,
			database: POSTGRES_DB!,
		};
	}

	return getAwsDatabaseCredentials();
};

const getNewKnexInstance = (config: DatabaseConfig) => {
	return knex({
		dialect: 'postgres',
		client: PGClient,
		pool: {
			min: 5,
			max: 50,
		},
		connection: config,
	});
};

export const getKnexInstance = async () => {
	// Prevent Hot Module Replacement from creating new connections

	if (global.postgresDatabase) {
		return global.postgresDatabase;
	}

	if (process.env.NODE_ENV !== 'production') {
		global.postgresDatabase = getNewKnexInstance(
			await getPossiblyLocalDatabaseConfig()
		);
	} else {
		global.postgresDatabase = getNewKnexInstance(
			await getAwsDatabaseCredentials()
		);
	}
	return global.postgresDatabase;
};
