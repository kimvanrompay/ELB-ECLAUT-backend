import {z} from 'zod';

import {AppSecurityScopes} from '@lib/services/authorization';

import {createPrivateAppRoute} from '../utils/create-private-app-route';

const initializeGameOnPlayfieldRoute = createPrivateAppRoute(
	[AppSecurityScopes.INITIALIZE_GAMESESSIONS],
	{
		canThrowBadRequest: true,
	}
)({
	method: 'post',
	summary: 'Initialize game on playfield',
	path: '/sessions/init',
	tags: ['Player Zone'],
	request: {
		body: {
			content: {
				'application/json': {
					schema: z.object({
						tenantId: z.string(),
						playfieldId: z.string(),
						gameSessionId: z.string(),
						playerId: z.string(),
						progress: z.object({}).passthrough(),
					}),
				},
			},
		},
	},
	responses: {
		204: {
			description: 'No content',
		},
	},
});

export {initializeGameOnPlayfieldRoute};
