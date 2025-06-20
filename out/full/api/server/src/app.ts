import {OpenAPIHono} from '@hono/zod-openapi';
import {cors} from 'hono/cors';
import {csrf} from 'hono/csrf';
import {requestId} from 'hono/request-id';

import {db} from '@lib/db';
import {MachineRepository} from '@lib/repositories/machine';
import {MachineService} from '@lib/services/machine';
import {defaultValidationHook} from '@lib/utils';

import {apiErrorHandler} from './api-error-handler';
import {httpLogger} from './middlewares/http-logger';
import {createMachineApi} from './routes/machine.routes';
import {addOpenAPI} from './routes/openapi.routes';
import {Environment} from './types';

const app = new OpenAPIHono<Environment>({
	strict: true,
	defaultHook: defaultValidationHook,
});

app.use(cors());
app.use(csrf());
app.onError(apiErrorHandler);
app.use(requestId());
app.use(httpLogger);

/**
 * Services
 */

const machineRepository = new MachineRepository(db);
const machineService = new MachineService(machineRepository);

/**
 * Routes
 */

app.route('/machines', createMachineApi(machineService));

/**
 * OpenAPI  swagger routes (needs to be last)
 */
addOpenAPI(app);

export default app;
