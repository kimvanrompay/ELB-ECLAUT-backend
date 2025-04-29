import knex, {Knex} from 'knex';
import PGClient from 'knex/lib/dialects/postgres';

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace global {
	let postgresDatabase: Knex | undefined;
}

const connectionConfig = {
	host: process.env.POSTGRES_HOST ?? 'host.docker.internal',
	port: parseInt(process.env.POSTGRES_PORT ?? '5432') ?? 5432,
	user: process.env.POSTGRES_USER ?? 'app',
	password: process.env.POSTGRES_PASSWORD ?? 'example',
	database: process.env.POSTGRES_DB ?? 'elaut',
};

let postgresDatabase: Knex | undefined;
const getNewKnexInstance = () => {
	return knex({
		dialect: 'postgres',
		client: PGClient,
		pool: {
			min: 5,
			max: 50,
		},
		// TODO: env variables or secrets manager
		connection: connectionConfig,
	});
};

// Prevent Hot Module Replacement from creating new connections
if (process.env.NODE_ENV !== 'production') {
	if (!global.postgresDatabase) {
		global.postgresDatabase = getNewKnexInstance();
	}
	postgresDatabase = global.postgresDatabase;
} else {
	postgresDatabase = getNewKnexInstance();
}

export const db = postgresDatabase;
