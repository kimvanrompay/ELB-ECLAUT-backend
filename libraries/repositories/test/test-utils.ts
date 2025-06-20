import {readFileSync} from 'fs';
import {Knex} from 'knex';

const runSQLFile = async (db: Knex, filePath: string) => {
	await db.raw(readFileSync(filePath, 'utf8'));
};

const runSQLFiles = async (db: Knex, filePaths: string[]) => {
	for await (const filePath of filePaths) {
		await runSQLFile(db, filePath);
	}
};

const truncateTables = async (db: Knex, tables: string[]) => {
	const statements = tables.map((table) => `TRUNCATE TABLE ${table} CASCADE;`);
	await db.raw(statements.join('\n'));
};

export {runSQLFile, runSQLFiles, truncateTables};
