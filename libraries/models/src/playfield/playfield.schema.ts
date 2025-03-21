import {z} from '@hono/zod-openapi';

const PlayfieldDTOSchema = z
	.object({
		id: z.string(),
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
	.openapi('Playfield');

const PlayfieldDBSchema = z.object({
	id: z.string(),
	serial_number: z.string(), // cabinet serial number
	name: z.string(),
	game_type_id: z.string(),
	tenant_id: z.string(),
	tenant_location_id: z.string(),
	status: z.string().optional(),
});

const PlayfieldWithCabinetDBSchema = z.object({
	id: z.string(),
	serial_number: z.string(), // cabinet serial number
	name: z.string(),
	game_type_id: z.string(),
	tenant_id: z.string(),
	tenant_location_id: z.string(),
	status: z.string().optional(),
	cabinet: z.string(),
});

const PlayfieldInsertDBSchema = z.object({
	id: z.string(),
	serial_number: z.string(),
	name: z.string(),
	game_type_id: z.string().optional(),
	tenant_id: z.string().optional(),
	tenant_location_id: z.string().optional(),
});

const PlayfieldUpdateDBSchema = z.object({
	serial_number: z.string().optional(),
	name: z.string().optional(),
	tenant_id: z.string().optional(),
	tenant_location_id: z.string().optional(),
	last_machine_message: z.date().optional(),
	status: z.string().optional(),
});

type PlayfieldDTOType = z.infer<typeof PlayfieldDTOSchema>;

type PlayfieldDBType = z.infer<typeof PlayfieldDBSchema>;
type PlayfieldWithCabinetDBType = z.infer<typeof PlayfieldWithCabinetDBSchema>;
type PlayfieldInsertDBType = z.infer<typeof PlayfieldInsertDBSchema>;
type PlayfieldUpdateDBType = z.infer<typeof PlayfieldUpdateDBSchema>;

export {
	PlayfieldDTOSchema,
	PlayfieldDBSchema,
	PlayfieldInsertDBSchema,
	PlayfieldUpdateDBSchema,
	PlayfieldWithCabinetDBSchema,
};
export type {
	PlayfieldDTOType,
	PlayfieldDBType,
	PlayfieldInsertDBType,
	PlayfieldUpdateDBType,
	PlayfieldWithCabinetDBType,
};
