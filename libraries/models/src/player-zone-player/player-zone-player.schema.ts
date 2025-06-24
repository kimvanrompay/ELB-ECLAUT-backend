import {z} from '@hono/zod-openapi';

const PlayerZonePlayerDTOSchema = z.object({
	id: z.string(),
	avatar: z.string(),
	username: z.string(),
	birthDate: z.string().optional(),
	language: z.string().optional(),
});

type PlayerZonePlayerDTOType = z.infer<typeof PlayerZonePlayerDTOSchema>;

export {PlayerZonePlayerDTOSchema};
export type {PlayerZonePlayerDTOType};
