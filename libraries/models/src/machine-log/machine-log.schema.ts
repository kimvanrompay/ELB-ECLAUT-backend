import {z} from '@hono/zod-openapi';

const MachineLogDTOSchema = z.object({
	level: z.string(),
	timestamp: z.string(),
	serialNumber: z.string(),
	playfieldId: z.string().optional(),
	type: z.string(),
	data: z.object({}).passthrough().optional(),
	userId: z.string().optional(),
});

const MachineLogDBSchema = z.object({
	id: z.string(),
	level: z.string(),
	serial_number: z.string(),
	playfield_id: z.string().optional(),
	type: z.string(),
	timestamp: z.date(),
	data: z.object({}).passthrough().optional(),
	app_user_id: z.string().optional(),
});

const MachineLogInsertDBSchema = z.object({
	id: z.string(),
	level: z.string(),
	serial_number: z.string(),
	playfield_id: z.string().optional(),
	type: z.string(),
	timestamp: z.date(),
	data: z.object({}).passthrough().optional(),
	app_user_id: z.string().optional(),
});

type MachineLogDTOType = z.infer<typeof MachineLogDTOSchema>;
type MachineLogDBType = z.infer<typeof MachineLogDBSchema>;
type MachineLogInsertDBType = z.infer<typeof MachineLogInsertDBSchema>;

export {MachineLogDTOSchema, MachineLogDBSchema, MachineLogInsertDBSchema};

export type {MachineLogDTOType, MachineLogDBType, MachineLogInsertDBType};
