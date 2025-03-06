import {getKnexInstance} from '@lib/db';
import {AppUserRepository} from '@lib/repositories/app-user';
import {AppUserService} from '@lib/services/app-user';

import {app} from './app';
import {authenticationMiddleware} from './middlewares/authentication';
import {createAccountApi} from './routes/account.routes';
import {createAppUserApi} from './routes/app-user.routes';
import {createAuthApi} from './routes/auth.routes';
import {healthCheckRoute} from './routes/health.openapi';
import {addOpenAPI} from './routes/openapi.routes';

const db = await getKnexInstance();
const appUserRepository = new AppUserRepository(db);
const appUserService = new AppUserService(appUserRepository);

/**
 * Routes
 */

app.openapi(healthCheckRoute, (ctx) => {
	return ctx.text('OK', 200);
});

app.route('/auth', createAuthApi());

app.route('/users', createAppUserApi(appUserService));

app.use('/account/*', authenticationMiddleware());
app.route('/account', createAccountApi(appUserService));

/**
 * OpenAPI  swagger routes (needs to be last)
 */
addOpenAPI(app);
