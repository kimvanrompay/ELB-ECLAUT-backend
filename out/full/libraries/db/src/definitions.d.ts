declare module 'knex/lib/dialects/postgres' {
	import {Knex} from 'knex';
	const client: typeof Knex.Client;
	export default client;
}
