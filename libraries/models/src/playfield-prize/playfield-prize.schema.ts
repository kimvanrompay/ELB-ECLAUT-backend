import {z} from '@hono/zod-openapi';

const PlayfieldPrizeDBSchema = z.object({
	id: z.string(),
	playfield_id: z.string(),
	prize_id: z.string(),
	tenant_id: z.string(),
	added_at: z.coerce.date(),
	removed_at: z.coerce.date().optional(),
	name: z.string(),
	description: z.string().optional(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
});

const PlayfieldPrizeDTOSchema = z.object({
	id: z.string(),
	playfieldId: z.string(),
	prizeId: z.string(),
	tenantId: z.string(),
	addedAt: z.coerce.date(),
	removedAt: z.coerce.date().optional(),
	name: z.string(),
	description: z.string().optional(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
});

type PlayfieldPrizeDBType = z.infer<typeof PlayfieldPrizeDBSchema>;
type PlayfieldPrizeDTOType = z.infer<typeof PlayfieldPrizeDTOSchema>;

export {PlayfieldPrizeDBSchema, PlayfieldPrizeDTOSchema};
export type {PlayfieldPrizeDBType, PlayfieldPrizeDTOType};
