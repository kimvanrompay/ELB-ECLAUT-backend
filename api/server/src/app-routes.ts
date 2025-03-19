import {app} from './app';
import {createAccountApi} from './routes/account.routes';
import {createAppUserApi} from './routes/app-user.routes';
import {createAuthApi} from './routes/auth.routes';
import {createCabinetApi} from './routes/cabinet.routes';
import {createGametypeApi} from './routes/gametype.routes';
import {healthCheckRoute} from './routes/health.openapi';
import {createMachineApi} from './routes/machine.routes';
import {addOpenAPI} from './routes/openapi.routes';
import {createPlayfieldApi} from './routes/playfield.routes';
import {createTenantLocationApi} from './routes/tenant-location.routes';

/**
 * Routes
 */

app.openapi(healthCheckRoute, (ctx) => {
	return ctx.text('OK', 200);
});

// TODO: prefix most routes with /{tenantId}? in case of multi tenant users?

app.route('/auth', createAuthApi());

app.route('/users', createAppUserApi());

app.route('/account', createAccountApi());

app.route('/gametype', createGametypeApi());

app.route('/location', createTenantLocationApi());

app.route('/machine', createMachineApi());

app.route('/machine/playfield', createPlayfieldApi());

app.route('/machine/cabinet', createCabinetApi());

/**
 * OpenAPI  swagger routes (needs to be last)
 */
addOpenAPI(app);
