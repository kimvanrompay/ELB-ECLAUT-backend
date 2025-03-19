import {z} from '@hono/zod-openapi';

const MachineDTOSchema = z
	.object({
		id: z.string(),
		type: z.enum(['CABINET', 'PLAYFIELD']),
		cabinet: z.object({
			serialNumber: z.string(),
			name: z.string(),
			tenantId: z.string(),
			tenantLocationId: z.string(),
			playfields: z
				.array(
					z.object({
						id: z.string(),
						name: z.string(),
						status: z.string(),
					})
				)
				.min(1),
		}),
		name: z.string(),
		gametypeId: z.string(),
		status: z.string(),
	})
	.openapi('Machine', {
		description:
			'A model representing either a cabinet or a playfield depending on the type of game',
	});

const MachineCreateDTOSchema = z.object({
	serialNumber: z.string(),
	gametypeId: z.string(),
	playfieldIds: z.array(z.string()).min(1),
});

type MachineDTOType = z.infer<typeof MachineDTOSchema>;

type MachineCreateDTOType = z.infer<typeof MachineCreateDTOSchema>;

export {MachineDTOSchema, MachineCreateDTOSchema};

export type {MachineDTOType, MachineCreateDTOType};
