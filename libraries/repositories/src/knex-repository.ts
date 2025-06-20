import type {Knex} from 'knex';

import {PinoLogger} from '@lib/utils';

import type {IKnexRepository} from './internal-types';

class KnexRepository implements IKnexRepository {
	protected db: Knex;
	protected readonly logger: PinoLogger;

	constructor(name: string, db: Knex, context: {logger: PinoLogger}) {
		this.db = db;
		this.logger = context.logger.getChildLogger(
			{
				name,
			},
			{}
		);
	}

	/**
	 * This method should be overridden in the child class to return a new instance of the child class.
	 * We could implement this method using this.constructor, but it would obfuscate the code
	 * and not always work as expected, so it's better to just override it in the child class
	 *
	 * This method is used to create a cloned instance of the repository with the provided transaction object as the connection
	 *
	 * @param trx The transaction object
	 */
	withTransaction(trx: Knex.Transaction): IKnexRepository {
		throw new Error('Method not implemented.');
	}

	/**
	 * Expose the ability to run a transaction from a service. It is however recommended to keep transactions
	 * within the repository layer. If for some reason you need to run a transaction from outside the repository,
	 * consider creating a layer of abstraction between service and repositories that will handle the transaction logic.
	 *
	 * @param transactionScope The function that will be executed within the transaction
	 * @param config The transaction configuration
	 */
	async transaction<ReturnType>(
		transactionScope: (trx: Knex.Transaction) => Promise<ReturnType> | void,
		config?: Knex.TransactionConfig
	): Promise<ReturnType> {
		return this.db.transaction(transactionScope, config);
	}
}

export {KnexRepository};
