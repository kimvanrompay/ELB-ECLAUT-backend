import {z} from '@hono/zod-openapi';

const PlayfieldDTOSchema = z
	.object({
		id: z.string(),
		cabinet: z.object({
			serialNumber: z.string(),
			name: z.string(),
			tenant: z.object({
				id: z.string(),
				name: z.string(),
			}),
			location: z.object({
				id: z.string(),
				name: z.string(),
			}),
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
		gametype: z.object({
			id: z.string(),
			name: z.string(),
		}),
		status: z.string(),
		lastMessageAt: z.date().optional(),
		error: z
			.object({
				isActive: z.boolean(),
				code: z.string(),
				eventData: z.string().optional(),
			})
			.optional(),
		prize: z
			.object({
				id: z.string(),
				name: z.string(),
			})
			.optional(),
	})
	.openapi('Playfield');

const PlayfieldDBSchema = z.object({
	id: z.string(),
	serial_number: z.string(), // cabinet serial number
	name: z.string(),
	game_type_id: z.string(),
	gametype_name: z.string(),
	tenant_id: z.string(),
	tenant_name: z.string(),
	tenant_location_id: z.string(),
	tenant_location_name: z.string(),
	status: z.string().optional(),
	last_machine_message: z.date().optional(),
	error_code: z.string().optional(),
	error_event_data: z.string().optional(),
	error_is_active: z.string().optional(),
	prize_id: z.string().optional(),
	prize_name: z.string().optional(),
});

const PlayfieldWithCabinetDBSchema = z.object({
	id: z.string(),
	serial_number: z.string(), // cabinet serial number
	name: z.string(),
	gametype_id: z.string(),
	gametype_name: z.string(),
	tenant_id: z.string(),
	tenant_name: z.string(),
	tenant_location_id: z.string(),
	tenant_location_name: z.string(),
	status: z.string().optional(),
	cabinet: z.string(),
	last_machine_message: z.date().optional(),
	error_code: z.string().optional(),
	error_event_data: z.string().optional(),
	error_is_active: z.string().optional(),
	prize_id: z.string().optional(),
	prize_name: z.string().optional(),
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
	name: z.string().optional(),
	tenant_id: z.string().optional(),
	tenant_location_id: z.string().optional(),
	last_machine_message: z.date().optional(),
	status: z.string().optional(),
	prize_id: z.string().optional(),
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
