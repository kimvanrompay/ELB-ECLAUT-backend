import {type Knex} from 'knex';

interface Transaction {
	commit: () => void;
	rollback: () => void;
}

interface TransactionConfig {
	isolationLevel?: string;
}

interface IRepository<
	TransactionType extends Transaction,
	Config extends TransactionConfig,
> {
	withTransaction(trx: TransactionType): unknown;

	transaction<ReturnType>(
		transactionScope: (trx: TransactionType) => Promise<ReturnType> | void,
		config?: Config
	): Promise<ReturnType>;
}

interface IKnexRepository
	extends IRepository<Knex.Transaction, Knex.TransactionConfig> {
	transaction<ReturnType>(
		transactionScope: (trx: Knex.Transaction) => Promise<ReturnType> | void,
		config?: Knex.TransactionConfig
	): Promise<ReturnType>;

	withTransaction(trx: Knex.Transaction): IKnexRepository;
}

export type {Transaction, TransactionConfig, IRepository, IKnexRepository};
