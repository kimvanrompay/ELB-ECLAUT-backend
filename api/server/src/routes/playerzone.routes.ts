import {OpenAPIHono} from '@hono/zod-openapi';

import {GameSessionRepository} from '@lib/repositories/game-session';
import {PlayfieldRepository} from '@lib/repositories/playfield';
import {MqttService} from '@lib/services/mqtt';
import {PlayerZoneService} from '@lib/services/player-zone';
import {PlayfieldService} from '@lib/services/playfield';
import type {AuthenticatedAppContext} from '@lib/services/types';
import {defaultValidationHook} from '@lib/utils';

import {db} from '../database';
import type {AuthenticatedEnvironment} from '../types';
import {initializeGameOnPlayfieldRoute} from './playerzone.openapi';

const createPlayerZoneApi = () => {
	const app = new OpenAPIHono<AuthenticatedEnvironment>({
		strict: true,
		defaultHook: defaultValidationHook,
	});

	const getServices = (appContext: AuthenticatedAppContext) => {
		const gameSessionRepository = new GameSessionRepository(db, appContext);
		const playfieldRepository = new PlayfieldRepository(db, appContext);
		const playfieldService = new PlayfieldService(
			playfieldRepository,
			appContext
		);

		const mqttService = new MqttService();

		const playerZoneService = new PlayerZoneService(
			playfieldService,
			gameSessionRepository,
			mqttService,
			appContext
		);

		return {
			playerZoneService,
		};
	};

	app.openapi(initializeGameOnPlayfieldRoute, async (ctx) => {
		const {playerZoneService} = getServices(ctx.get('appContext'));

		const {playfieldId, gameSessionId, playerId, progress} =
			ctx.req.valid('json');

		await playerZoneService.initialiseSessionOnPlayfield(
			playfieldId,
			playerId,
			gameSessionId,
			progress
		);

		return ctx.newResponse(null, 204);
	});

	return app;
};

export {createPlayerZoneApi};
