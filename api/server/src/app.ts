import {OpenAPIHono, z} from '@hono/zod-openapi';
import {cors} from 'hono/cors';
import {csrf} from 'hono/csrf';
import {requestId} from 'hono/request-id';

// import {getKnexInstance} from '@lib/db';
// import {MachineRepository} from '@lib/repositories/machine';
// import {MachineService} from '@lib/services/machine';
import {defaultValidationHook} from '@lib/utils';

import {apiErrorHandler} from './api-error-handler';
import {httpLogger} from './middlewares/http-logger';
// import {createMachineApi} from './routes/machine.routes';
import type {Environment} from './types';

const app = new OpenAPIHono<Environment>({
	strict: true,
	defaultHook: defaultValidationHook,
});

const cookieAuthRegistry = app.openAPIRegistry.registerComponent(
	'securitySchemes',
	'cookieAuth',
	{
		type: 'apiKey',
		in: 'cookie',
		name: 'eclaut-access-token',
		description: 'Cookie-based authentication',
	}
);

app.use(cors());
app.use(csrf());
app.onError(apiErrorHandler);
app.use(requestId());
app.use(httpLogger);

/**
 * Services
 */

// const machineRepository = new MachineRepository(db);
// const machineService = new MachineService(machineRepository);

export {app, cookieAuthRegistry};
