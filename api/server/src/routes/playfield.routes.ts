import {OpenAPIHono} from '@hono/zod-openapi';

import {NotFoundError} from '@lib/errors';
import {PlayfieldRepository} from '@lib/repositories/playfield';
import {PlayfieldService} from '@lib/services/playfield';
import type {AuthenticatedAppContext} from '@lib/services/types';
import {defaultValidationHook} from '@lib/utils';
import {renameProperties} from '@lib/utils/object';
import {parseQueryParamsToDatabaseFilters} from '@lib/utils/query-params';

import {db} from '../database';
import type {AuthenticatedEnvironment} from '../types';
import {findPlayfieldsRoute, getPlayfieldRoute} from './playfield.openapi';

const createPlayfieldApi = () => {
	const app = new OpenAPIHono<AuthenticatedEnvironment>({
		strict: true,
		defaultHook: defaultValidationHook,
	});

	const createServices = (context: AuthenticatedAppContext) => {
		const playfieldRepository = new PlayfieldRepository(db, context);
		const playfieldService = new PlayfieldService(playfieldRepository, context);

		return {
			playfieldService,
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

	return app;
};

export {createPlayfieldApi};
