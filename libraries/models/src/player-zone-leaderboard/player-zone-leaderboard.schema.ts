import {z} from '@hono/zod-openapi';

const PlayerZoneLeaderboardSchemaDTO = z
	.object({
		cabinet: z
			.object({
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
							externalId: z.string().optional(),
						})
					)
					.min(1),
			})
			.optional(),
		name: z.string(),
		rankings: z.array(
			z.object({
				playerId: z.string(),
				avatar: z.string().optional(),
				score: z.number(),
				percentage: z.number().optional(),
				position: z.number(),
			})
		),
	})
	.openapi('PlayerZoneLeaderboard');

type PlayerZoneLeaderboardDTOType = z.infer<
	typeof PlayerZoneLeaderboardSchemaDTO
>;

export {PlayerZoneLeaderboardSchemaDTO};

export type {PlayerZoneLeaderboardDTOType};
