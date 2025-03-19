import {z} from '@hono/zod-openapi';

import {Playfield} from '@lib/models/playfield';
import {AppSecurityScopes} from '@lib/services/authorization';

import {createPrivateAppRoute} from '../utils/create-private-app-route';

const getPlayfieldRoute = createPrivateAppRoute(
	[AppSecurityScopes.READ_MACHINES],
	{
		canThrowBadRequest: true,
	}
)({
	method: 'get',
	summary: 'Get a specific playfield by its id',
	tags: ['Machines'],
	path: '/{id}',
	request: {
		params: z.object({
			id: z.string(),
		}),
	},
	responses: {
		200: {
			description: 'Successful response',
			content: {
				'application/json': {
					schema: Playfield.schemas.DTOSchema,
				},
			},
		},
	},
});

const findPlayfieldsRoute = createPrivateAppRoute(
	[AppSecurityScopes.READ_MACHINES],
	{
		canThrowBadRequest: true,
	}
)({
	method: 'get',
	summary: 'Get all playfields',
	tags: ['Machines'],
	path: '/',
	request: {
		query: z.object({
			'name[like]': z.string().optional(),
			'serial_number[like]': z.string().optional(),
			limit: z.string().optional(),
			offset: z.string().optional(),
			order_by: z.string().optional(),
		}),
	},
	responses: {
		200: {
			description: 'Successful response',
			content: {
				'application/json': {
					schema: z.array(
						z.object({
							id: z.string(),
							name: z.string(),
							status: z.string(),
						})
					),
				},
			},
		},
	},
});

export {getPlayfieldRoute, findPlayfieldsRoute};
