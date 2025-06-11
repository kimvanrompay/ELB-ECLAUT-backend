import {v4 as uuid} from 'uuid';

import {GameSession} from '@lib/models/game-session';

const uuids = Array.from({length: 60}, () => uuid());

const date1 = new Date('2025-02-01T00:00:00Z');
const date2 = new Date('2025-02-02T00:00:00Z');
const date3 = new Date('2025-02-03T00:00:00Z');

const TEST_GAME_SESSIONS_PLAYFIELD_1_1 = {
	[date1.toISOString()]: Array.from(
		{length: 20},
		(_, i) =>
			new GameSession(
				uuids[i]!,
				'effcdd6f-d15a-473f-9eb2-b5cd8eee12d6',
				'191e84db-b52f-46f9-bd53-b0b68241b0d2',
				'e5a0ec4e-e27f-4e41-9955-8d6e169c58f6',
				'd38cf9d5-fde1-45e5-bfb7-13c18c3dcc2e',
				new Date(date1.getTime() + i * 30 * 60 * 1000),
				new Date(date1.getTime() + i * 30 * 60 * 1000 + 30 * 1000),
				{m: (i % 2) * 100},
				((i % 3) + 1) * 100,
				(i % 3) + 1,
				(i % 2) * 100,
				i % 2 === 0 ? 'COIN' : 'BILL',
				new Date(date1.getTime() + i * 1000),
				new Date(date1.getTime() + (i + 1) * 1000)
			)
	),
	[date2.toISOString()]: Array.from(
		{length: 23},
		(_, i) =>
			new GameSession(
				uuids[i + 20]!,
				'effcdd6f-d15a-473f-9eb2-b5cd8eee12d6',
				'191e84db-b52f-46f9-bd53-b0b68241b0d2',
				'e5a0ec4e-e27f-4e41-9955-8d6e169c58f6',
				'd38cf9d5-fde1-45e5-bfb7-13c18c3dcc2e',
				new Date(date1.getTime() + i * 30 * 60 * 1000),
				new Date(date1.getTime() + i * 30 * 60 * 1000 + 30 * 1000),
				{m: (i % 2) * 100},
				((i % 3) + 1) * 100,
				(i % 3) + 1,
				(i % 2) * 100,
				i % 2 === 0 ? 'COIN' : 'BILL',
				new Date(date2.getTime() + i * 1000),
				new Date(date2.getTime() + (i + 1) * 1000)
			)
	),
	[date3.toISOString()]: Array.from(
		{length: 17},
		(_, i) =>
			new GameSession(
				uuids[i + 43]!,
				'effcdd6f-d15a-473f-9eb2-b5cd8eee12d6',
				'191e84db-b52f-46f9-bd53-b0b68241b0d2',
				'e5a0ec4e-e27f-4e41-9955-8d6e169c58f6',
				'd38cf9d5-fde1-45e5-bfb7-13c18c3dcc2e',
				new Date(date1.getTime() + i * 30 * 60 * 1000),
				new Date(date1.getTime() + i * 30 * 60 * 1000 + 30 * 1000),
				{m: (i % 2) * 100},
				((i % 3) + 1) * 100,
				(i % 3) + 1,
				(i % 2) * 100,
				i % 2 === 0 ? 'COIN' : 'BILL',
				new Date(date3.getTime() + i * 1000),
				new Date(date3.getTime() + (i + 1) * 1000)
			)
	),
};

const sql =
	'insert into game_session (id, playfield_id, tenant_id, tenant_location_id, started_at, ended_at, payment_method, amount_money_in, amount_credits, result, created_at, updated_at, amount_money_out) VALUES\n';

const values: string[] = [];
Object.entries(TEST_GAME_SESSIONS_PLAYFIELD_1_1).forEach(([date, sessions]) => {
	sessions.forEach((session, index) => {
		values.push(
			`('${session.id}', '${session.playfieldId}', '${session.tenantId}', '${session.tenantLocationId}', '${session.startedAt.toISOString()}', '${session.endedAt.toISOString()}', '${session.paymentMethod}', ${session.amountMoneyIn}, ${session.amountCredits}, '${JSON.stringify(session.result)}', '${session.createdAt.toISOString()}', '${session.updatedAt.toISOString()}', ${session.amountMoneyOut})`
		);
	});
});

console.log(`${sql}${values.join(',\n')};`);
