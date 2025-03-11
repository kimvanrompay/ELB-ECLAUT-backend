import {z} from '@hono/zod-openapi';

const locationDTOSchema = z.object({
	id: z.string(),
	tenant: z.object({
		id: z.string(),
		name: z.string(),
	}),
	name: z.string(),
	address: z.string().optional(),
	city: z.string().optional(),
	state: z.string().optional(),
	zip: z.string().optional(),
	country: z.string().optional(),
	phone: z.string().optional(),
	email: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

const locationDBSchema = z.object({
	id: z.string(),
	tenant_id: z.string(),
	tenant_name: z.string(),
	name: z.string(),
	address: z.string().optional(),
	city: z.string().optional(),
	state: z.string().optional(),
	zip: z.string().optional(),
	country: z.string().optional(),
	phone: z.string().optional(),
	email: z.string(),
	created_at: z.string(),
	updated_at: z.string(),
});

const locationCreateDTOSchema = z.object({
	tenantId: z.string(),
	name: z.string(),
	address: z.string().optional(),
	city: z.string().optional(),
	state: z.string().optional(),
	zip: z.string().optional(),
	country: z.string().optional(),
	phone: z.string().optional(),
	email: z.string(),
});

const locationInsertDBSchema = z.object({
	id: z.string(),
	tenant_id: z.string(),
	name: z.string(),
	address: z.string().optional(),
	city: z.string().optional(),
	state: z.string().optional(),
	zip: z.string().optional(),
	country: z.string().optional(),
	phone: z.string().optional(),
	email: z.string(),
});

const locationUpdateDTOSchema = z.object({
	name: z.string().optional(),
	address: z.string().optional(),
	city: z.string().optional(),
	state: z.string().optional(),
	zip: z.string().optional(),
	country: z.string().optional(),
	phone: z.string().optional(),
	email: z.string().optional(),
});

const locationUpdateDBSchema = z.object({
	name: z.string().optional(),
	address: z.string().optional(),
	city: z.string().optional(),
	state: z.string().optional(),
	zip: z.string().optional(),
	country: z.string().optional(),
	phone: z.string().optional(),
	email: z.string().optional(),
});

type LocationDTOType = z.infer<typeof locationDTOSchema>;
type LocationCreateDTOType = z.infer<typeof locationCreateDTOSchema>;
type LocationUpdateDTOType = z.infer<typeof locationUpdateDTOSchema>;
type LocationDBType = z.infer<typeof locationDBSchema>;
type LocationInsertDBType = z.infer<typeof locationInsertDBSchema>;
type LocationUpdateDBType = z.infer<typeof locationUpdateDTOSchema>;

export {
	locationDTOSchema,
	locationDBSchema,
	locationCreateDTOSchema,
	locationInsertDBSchema,
	locationUpdateDTOSchema,
	locationUpdateDBSchema,
};

export type {
	LocationDTOType,
	LocationCreateDTOType,
	LocationUpdateDTOType,
	LocationDBType,
	LocationInsertDBType,
	LocationUpdateDBType,
};
