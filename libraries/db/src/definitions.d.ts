declare module 'knex/lib/dialects/postgres/index.js' {
	import {Knex} from 'knex';
	const client: typeof Knex.Client;
	export default client;
}
