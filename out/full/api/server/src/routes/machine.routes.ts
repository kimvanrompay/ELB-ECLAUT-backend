import {OpenAPIHono} from '@hono/zod-openapi';

import {IMachineService} from '@lib/services/types';
import {
	defaultValidationHook,
	getLoggerFromContext,
	validatedJSONResponse,
} from '@lib/utils';

import {Environment} from '../types';
import {
	getMachineByIdRoute,
	getMachinesRoute,
	updateMachineRoute,
} from './machine.openapi';

const createMachineApi = (machineService: IMachineService) => {
	const machinesApp = new OpenAPIHono<Environment>({
		strict: true,
		defaultHook: defaultValidationHook,
	});

	machinesApp.openapi(getMachinesRoute, async (ctx) => {
		const machines = await machineService.getAllMachines();
		const machineDTOs = machines.map((machine) => machine.toJSON());

		const validatedResponse = validatedJSONResponse(
			getMachinesRoute,
			ctx,
			machineDTOs
		);

		return ctx.json(validatedResponse, 200);
	});

	machinesApp.openapi(getMachineByIdRoute, async (ctx) => {
		const machineId = ctx.req.param('id');

		const machine = await machineService.getMachineById(machineId);

		const machineDTO = machine.toJSON();

		const httpLogger = getLoggerFromContext(ctx);

		httpLogger.debug({machineId}, 'Machine retrieved');

		const validatedResponse = validatedJSONResponse(
			getMachineByIdRoute,
			ctx,
			machineDTO
		);

		return ctx.json(validatedResponse, 200);
	});

	machinesApp.openapi(updateMachineRoute, async (ctx) => {
		const machineId = ctx.req.param('id');
		const machine = ctx.req.valid('json');

		const updatedMachine = await machineService.updateMachine(
			machineId,
			machine
		);

		const machineDTO = updatedMachine.toJSON();
		const validatedResponse = validatedJSONResponse(
			updateMachineRoute,
			ctx,
			machineDTO
		);

		return ctx.json(validatedResponse, 200);
	});

	return machinesApp;
};

export {createMachineApi};
