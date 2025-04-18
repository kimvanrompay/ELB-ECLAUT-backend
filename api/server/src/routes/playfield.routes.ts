import {OpenAPIHono} from '@hono/zod-openapi';

import {NotFoundError} from '@lib/errors';
import {GameSessionRepository} from '@lib/repositories/game-session';
import {MachineLogRepository} from '@lib/repositories/machine-log';
import {PlayfieldRepository} from '@lib/repositories/playfield';
import {GameSessionService} from '@lib/services/game-session';
import {MachineLogService} from '@lib/services/machine-log';
import {PlayfieldService} from '@lib/services/playfield';
import type {AuthenticatedAppContext} from '@lib/services/types';
import {defaultValidationHook} from '@lib/utils';
import type {PaginatedDatabaseQueryFilters} from '@lib/utils/db/filters';
import {renameProperties} from '@lib/utils/object';
import {parseQueryParamsToDatabaseFilters} from '@lib/utils/query-params';

import {db} from '../database';
import type {AuthenticatedEnvironment} from '../types';
import {
	findPlayfieldGameSessionsRoute,
	findPlayfieldLogsRoute,
	findPlayfieldsRoute,
	getPlayfieldRoute,
} from './playfield.openapi';

const createPlayfieldApi = () => {
	const app = new OpenAPIHono<AuthenticatedEnvironment>({
		strict: true,
		defaultHook: defaultValidationHook,
	});

	const createServices = (context: AuthenticatedAppContext) => {
		const playfieldRepository = new PlayfieldRepository(db, context);
		const playfieldService = new PlayfieldService(playfieldRepository, context);
		const gameSessionRepository = new GameSessionRepository(db, context);
		const gameSessionService = new GameSessionService(
			gameSessionRepository,
			context
		);

		const machineLogRepository = new MachineLogRepository(db, context);
		const machineLogService = new MachineLogService(
			machineLogRepository,
			context
		);

		return {
			playfieldService,
			gameSessionService,
			machineLogService,
		};
	};

	app.openapi(findPlayfieldsRoute, async (ctx) => {
		const queryParams = ctx.req.valid('query');
		const appContext = ctx.get('appContext');

		const {playfieldService} = createServices(appContext);

		const renamedQueryParams = renameProperties(queryParams, {
			'serial_number[like]': 'playfield.serial_number[like]',
			'serial_number[eq]': 'playfield.serial_number[eq]',
			'name[like]': 'playfield.name[like]',
		}) as typeof queryParams;

		const filters = parseQueryParamsToDatabaseFilters(renamedQueryParams);

		const playfields = await playfieldService.findPlayfields(filters);

		const playfieldDTOs = playfields.map((playfield) => playfield.toJSON());

		return ctx.json(playfieldDTOs, 200);
	});

	app.openapi(getPlayfieldRoute, async (ctx) => {
		const appContext = ctx.get('appContext');
		const {id} = ctx.req.valid('param');

		const {playfieldService} = createServices(appContext);
		const playfield = await playfieldService.getPlayfieldById(id);

		if (!playfield) {
			throw new NotFoundError('Cannot find playfield');
		}

		return ctx.json(playfield.toJSON(), 200);
	});

	app.openapi(findPlayfieldGameSessionsRoute, async (ctx) => {
		const appContext = ctx.get('appContext');
		const {id} = ctx.req.valid('param');

		const queryParams = ctx.req.valid('query');

		const {gameSessionService} = createServices(appContext);

		const filters = parseQueryParamsToDatabaseFilters(
			queryParams
		) as PaginatedDatabaseQueryFilters;

		filters.orderBy = filters.orderBy?.map((rule) => {
			// to snake_case
			rule.columnName = rule.columnName
				.replace(/([a-z])([A-Z])/g, '$1_$2')
				.toLowerCase();

			return rule;
		});

		const data =
			await gameSessionService.findPaginatedGameSessionsByPlayfieldId(
				id,
				filters
			);

		const gameSessionDTOs = data.entries.map((session) => session.toJSON());

		return ctx.json(
			{
				entries: gameSessionDTOs,
				totalEntries: data.totalEntries,
			},
			200
		);
	});

	app.openapi(findPlayfieldLogsRoute, async (ctx) => {
		const appContext = ctx.get('appContext');
		const {id} = ctx.req.valid('param');

		const queryParams = ctx.req.valid('query');

		const {machineLogService} = createServices(appContext);

		const filters = parseQueryParamsToDatabaseFilters(
			queryParams
		) as PaginatedDatabaseQueryFilters;

		filters.orderBy = filters.orderBy?.map((rule) => {
			// to snake_case
			rule.columnName = rule.columnName
				.replace(/([a-z])([A-Z])/g, '$1_$2')
				.toLowerCase();

			return rule;
		});

		const data = await machineLogService.findPaginatedMachineLogsByPlayfieldId(
			id,
			filters
		);

		return ctx.json(data, 200);
	});

	return app;
};

export {createPlayfieldApi};
