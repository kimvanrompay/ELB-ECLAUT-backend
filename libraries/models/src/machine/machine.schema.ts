import {z} from '@hono/zod-openapi';

const MachineDTOSchema = z
	.object({
		id: z.string(),
		serialNumber: z.string(),
		name: z.string(),
		gameTypeId: z.string().optional(),
		tenantId: z.string().optional(),
		locationId: z.string().optional(),
	})
	.openapi('Machine');

const MachineDBSchema = z.object({
	id: z.string(),
	serial_number: z.string(),
	name: z.string(),
	game_type_id: z.string().optional(),
	tenant_id: z.string().optional(),
	location_id: z.string().optional(),
});

const MachineCreateDTOSchema = z.object({
	serialNumber: z.string(),
	name: z.string(),
	gameTypeId: z.string(),
	tenantId: z.string().optional(),
	locationId: z.string().optional(),
});

const MachineInsertDBSchema = z.object({
	id: z.string(),
	serial_number: z.string(),
	name: z.string(),
	game_type_id: z.string().optional(),
	tenant_id: z.string().optional(),
	location_id: z.string().optional(),
});

const MachineUpdateDTOSchema = z.object({
	// serial_number: z.string().optional(),
	name: z.string(),
	// game_type_id: z.string().optional(),
	tenantId: z.string().optional(),
	locationId: z.string().optional(),
});

const MachineUpdateDBSchema = z.object({
	// serial_number: z.string().optional(),
	name: z.string().optional(),
	// game_type_id: z.string().optional(),
	tenant_id: z.string().optional(),
	location_id: z.string().optional(),
});

type MachineDTOType = z.infer<typeof MachineDTOSchema>;
type MachineCreateDTOType = z.infer<typeof MachineCreateDTOSchema>;
type MachineUpdateDTOType = z.infer<typeof MachineUpdateDTOSchema>;

type MachineDBType = z.infer<typeof MachineDBSchema>;
type MachineInsertDBType = z.infer<typeof MachineInsertDBSchema>;
type MachineUpdateDBType = z.infer<typeof MachineUpdateDBSchema>;

export {
	MachineDTOSchema,
	MachineDBSchema,
	MachineCreateDTOSchema,
	MachineInsertDBSchema,
	MachineUpdateDTOSchema,
	MachineUpdateDBSchema,
};

export type {
	MachineDTOType,
	MachineCreateDTOType,
	MachineUpdateDTOType,
	MachineDBType,
	MachineInsertDBType,
	MachineUpdateDBType,
};
