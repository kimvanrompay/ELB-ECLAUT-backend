// import {createRoute, z} from '@hono/zod-openapi';
//
// import {ApiErrorSchema} from '@lib/errors';
// import {Playfield} from '@lib/models/playfield';
//
// const getMachinesRoute = createRoute({
// 	summary: 'Get all machines',
// 	method: 'get',
// 	path: '/',
// 	responses: {
// 		200: {
// 			summary: 'Successful response',
// 			description: 'Returns a json body with a list of all machines',
// 			content: {
// 				'application/json': {
// 					schema: z.array(Playfield.schemas.DTOSchema),
// 				},
// 			},
// 		},
// 		503: {
// 			description: 'Request validation Error',
// 			content: {
// 				'application/json': {
// 					schema: ApiErrorSchema,
// 				},
// 			},
// 		},
// 		500: {
// 			description: 'Internal Server Error',
// 			content: {
// 				'application/json': {
// 					schema: ApiErrorSchema,
// 				},
// 			},
// 		},
// 	},
// });
//
// const getMachineByIdRoute = createRoute({
// 	summary: 'Get a machine by id',
// 	method: 'get',
// 	path: '/{id}',
// 	request: {
// 		params: z.object({
// 			id: z.string({
// 				description:
// 					'The id of the machine which often is the machine serial number',
// 			}),
// 		}),
// 	},
// 	responses: {
// 		200: {
// 			summary: 'Successful response',
// 			description: 'Returns a json body with a machine',
// 			content: {
// 				'application/json': {
// 					schema: Machine.schemas.DTOSchema,
// 				},
// 			},
// 		},
// 		404: {
// 			description: 'Machine not found',
// 			content: {
// 				'application/json': {
// 					schema: ApiErrorSchema,
// 				},
// 			},
// 		},
// 		503: {
// 			description: 'Request validation Error',
// 			content: {
// 				'application/json': {
// 					schema: ApiErrorSchema,
// 				},
// 			},
// 		},
// 		500: {
// 			description: 'Internal Server Error',
// 			content: {
// 				'application/json': {
// 					schema: ApiErrorSchema,
// 				},
// 			},
// 		},
// 	},
// });
//
// const updateMachineRoute = createRoute({
// 	summary: 'Update a machine',
// 	method: 'put',
// 	path: '/{id}',
// 	request: {
// 		params: z.object({
// 			id: z.string(),
// 		}),
// 		body: {
// 			content: {
// 				'application/json': {
// 					schema: Machine.schemas.UpdateDTOSchema,
// 				},
// 			},
// 		},
// 	},
// 	responses: {
// 		200: {
// 			summary: 'Successful response',
// 			description: 'Returns a json body with the updated machine',
// 			content: {
// 				'application/json': {
// 					schema: Machine.schemas.DTOSchema,
// 				},
// 			},
// 		},
// 		404: {
// 			description: 'Machine not found',
// 			content: {
// 				'application/json': {
// 					schema: ApiErrorSchema,
// 				},
// 			},
// 		},
// 		503: {
// 			description: 'Request validation Error',
// 			content: {
// 				'application/json': {
// 					schema: ApiErrorSchema,
// 				},
// 			},
// 		},
// 		500: {
// 			description: 'Internal Server Error',
// 			content: {
// 				'application/json': {
// 					schema: ApiErrorSchema,
// 				},
// 			},
// 		},
// 	},
// });
//
// export {getMachinesRoute, getMachineByIdRoute, updateMachineRoute};
