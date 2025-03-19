import {app} from './app';
import {createAccountApi} from './routes/account.routes';
import {createAppUserApi} from './routes/app-user.routes';
import {createAuthApi} from './routes/auth.routes';
import {healthCheckRoute} from './routes/health.openapi';
import {addOpenAPI} from './routes/openapi.routes';
import {createTenantLocationApi} from './routes/tenant-location.routes';

/**
 * Routes
 */

app.openapi(healthCheckRoute, (ctx) => {
	return ctx.text('OK', 200);
});

app.route('/auth', createAuthApi());

app.route('/users', createAppUserApi());

app.route('/account', createAccountApi());
app.route('/location', createTenantLocationApi());

/**
 * OpenAPI  swagger routes (needs to be last)
 */
addOpenAPI(app);
