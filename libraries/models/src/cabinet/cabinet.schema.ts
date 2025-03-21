import {z} from 'zod';

const CabinetDBSchema = z.object({
	serial_number: z.string(),
	tenant_id: z.string(),
	tenant_location_id: z.string(),
	name: z.string(),
	created_at: z.date(),
	updated_at: z.date(),
});

const CabinetWithPlayfieldsDBSchema = CabinetDBSchema.extend({
	playfields: z.string(),
});

const CabinetDTOSchema = z
	.object({
		serialNumber: z.string(),
		tenantId: z.string(),
		locationId: z.string(),
		name: z.string(),
		playfields: z
			.array(
				z.object({
					id: z.string(),
					name: z.string(),
					status: z.string(),
					gametypeId: z.string(),
				})
			)
			.min(1),
	})
	.openapi('Cabinet');

const CabinetInsertDBSchema = z.object({
	serial_number: z.string(),
	tenant_id: z.string(),
	tenant_location_id: z.string(),
	name: z.string(),
});

const CabinetUpdateDBSchema = z.object({
	name: z.string().optional(),
	tenant_id: z.string().optional(),
	tenant_location_id: z.string().optional(),
	last_machine_message: z.date().optional(),
});

type CabinetDBType = z.infer<typeof CabinetDBSchema>;
type CabinetWithPlayfieldsDBType = z.infer<
	typeof CabinetWithPlayfieldsDBSchema
>;
type CabinetDTOType = z.infer<typeof CabinetDTOSchema>;

type CabinetInsertDBType = z.infer<typeof CabinetInsertDBSchema>;

type CabinetUpdateDBType = z.infer<typeof CabinetUpdateDBSchema>;

export {
	CabinetDBSchema,
	CabinetDTOSchema,
	CabinetWithPlayfieldsDBSchema,
	CabinetInsertDBSchema,
	CabinetUpdateDBSchema,
};

export type {
	CabinetDBType,
	CabinetDTOType,
	CabinetWithPlayfieldsDBType,
	CabinetInsertDBType,
	CabinetUpdateDBType,
};
