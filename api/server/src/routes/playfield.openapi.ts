import {z} from '@hono/zod-openapi';

import {GameSession} from '@lib/models/game-session';
import {MachineLog} from '@lib/models/machine-log';
import {Playfield} from '@lib/models/playfield';
import {PlayfieldStatsReportModel} from '@lib/models/playfield-stats-report';
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
			limit: z.coerce.number().min(1).optional(),
			offset: z.coerce.number().min(0).optional(),
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

const findPlayfieldGameSessionsRoute = createPrivateAppRoute(
	[AppSecurityScopes.READ_MACHINES, AppSecurityScopes.READ_GAMESESSIONS],
	{
		canThrowBadRequest: true,
	}
)({
	method: 'get',
	summary: 'Get recent games for a playfield',
	path: '/{id}/sessions',
	tags: ['Machines'],
	request: {
		params: z.object({
			id: z.string(),
		}),
		query: z.object({
			limit: z.coerce.number().min(1).max(100),
			offset: z.coerce.number().min(0),
			order_by: z.string().optional(),
		}),
	},
	responses: {
		200: {
			description: 'Successful response',
			content: {
				'application/json': {
					schema: z.object({
						entries: z.array(GameSession.schemas.DTOSchema),
						totalEntries: z.number(),
					}),
				},
			},
		},
	},
});

const findPlayfieldLogsRoute = createPrivateAppRoute(
	[AppSecurityScopes.READ_MACHINES],
	{
		canThrowBadRequest: true,
	}
)({
	method: 'get',
	summary: 'Get playfield logs',
	tags: ['Machines'],
	path: '/{id}/logs',
	request: {
		params: z.object({
			id: z.string(),
		}),
		query: z.object({
			'level[eq]': z.string().optional(),
			'type[eq]': z.string().optional(),
			limit: z.coerce.number().min(1).max(100),
			offset: z.coerce.number().min(0),
			order_by: z.string().optional(),
		}),
	},
	responses: {
		200: {
			description: 'Successful response',
			content: {
				'application/json': {
					schema: z.object({
						entries: z.array(MachineLog.schemas.DTOSchema),
						totalEntries: z.number(),
					}),
				},
			},
		},
	},
});

const getPlayfieldStatsReportRoute = createPrivateAppRoute(
	[AppSecurityScopes.READ_MACHINES],
	{
		canThrowBadRequest: true,
	}
)({
	method: 'get',
	summary: 'Get playfield stats report',
	tags: ['Machines'],
	path: '/{id}/stats',
	request: {
		params: z.object({
			id: z.string(),
		}),
		query: z.object({
			start_date: z.coerce.date().optional(),
			range: z.enum(['WEEK', 'MONTH', 'YEAR', 'DAY']),
			unit: z.enum(['HOUR', 'DAY']).optional(),
		}),
	},
	responses: {
		200: {
			description: 'Successful response',
			content: {
				'application/json': {
					schema: PlayfieldStatsReportModel.schemas.DTOSchema,
				},
			},
		},
	},
});

export {
	getPlayfieldRoute,
	findPlayfieldsRoute,
	findPlayfieldGameSessionsRoute,
	findPlayfieldLogsRoute,
	getPlayfieldStatsReportRoute,
};
