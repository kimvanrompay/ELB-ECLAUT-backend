import {OpenAPIHono} from '@hono/zod-openapi';

import {NotFoundError} from '@lib/errors';
import {TenantLocationRepository} from '@lib/repositories/tenant-location';
import {TenantLocationService} from '@lib/services/tenant-location';
import {defaultValidationHook} from '@lib/utils';
import {renameProperties, renameProperty} from '@lib/utils/object';
import {parseQueryParamsToDatabaseFilters} from '@lib/utils/query-params';

import {db} from '../database';
import type {AuthenticatedEnvironment} from '../types';
import {
	findTenantLocationsRoute,
	getTenantLocationRoute,
	inactivateTenantLocationRoute,
	updateTenantLocationRoute,
} from './tenant-location.openapi';

const createTenantLocationApi = () => {
	const app = new OpenAPIHono<AuthenticatedEnvironment>({
		strict: true,
		defaultHook: defaultValidationHook,
	});

	app.openapi(findTenantLocationsRoute, async (ctx) => {
		const queryParams = ctx.req.valid('query');
		const appContext = ctx.get('appContext');

		const tenantLocationRepository = new TenantLocationRepository(
			db,
			appContext
		);

		const tenantLocationService = new TenantLocationService(
			tenantLocationRepository,
			appContext
		);

		const renamedQueryParams = renameProperties(queryParams, {
			'location_name[like]': 'tenant_location.name[like]',
			'is_active[eq]': 'tenant_location.is_active[eq]',
		}) as typeof queryParams;

		const filters = parseQueryParamsToDatabaseFilters(renamedQueryParams);

		const locations = await tenantLocationService.findTenantLocations(filters);

		const locationDTOs = locations.map((location) => location.toJSON());

		return ctx.json(locationDTOs, 200);
	});

	app.openapi(getTenantLocationRoute, async (ctx) => {
		const appContext = ctx.get('appContext');
		const {id} = ctx.req.valid('param');

		const tenantLocationRepository = new TenantLocationRepository(
			db,
			appContext
		);

		const tenantLocationService = new TenantLocationService(
			tenantLocationRepository,
			appContext
		);

		const location = await tenantLocationService.getTenantLocationById(id);

		if (!location) {
			throw new NotFoundError('Location not found');
		}

		return ctx.json(location.toJSON(), 200);
	});

	app.openapi(updateTenantLocationRoute, async (ctx) => {
		const appContext = ctx.get('appContext');
		const {id} = ctx.req.valid('param');
		const location = ctx.req.valid('json');

		const tenantLocationRepository = new TenantLocationRepository(
			db,
			appContext
		);

		const tenantLocationService = new TenantLocationService(
			tenantLocationRepository,
			appContext
		);

		const updatedLocation = await tenantLocationService.updateTenantLocation(
			id,
			location
		);

		return ctx.json(updatedLocation.toJSON(), 200);
	});

	app.openapi(inactivateTenantLocationRoute, async (ctx) => {
		const appContext = ctx.get('appContext');
		const {id} = ctx.req.valid('param');

		const tenantLocationRepository = new TenantLocationRepository(
			db,
			appContext
		);

		const tenantLocationService = new TenantLocationService(
			tenantLocationRepository,
			appContext
		);

		await tenantLocationService.inactivateTenantLocation(id);

		return new Response(null, {status: 204});
	});

	return app;
};

export {createTenantLocationApi};
