import {z} from '@hono/zod-openapi';

const PasswordResetTokenDTOSchema = z.object({
	email: z.string().email(),
	token: z.string().length(32),
	createdAt: z.string(),
	expiresAt: z.string(),
});

type PasswordResetTokenDTOType = z.infer<typeof PasswordResetTokenDTOSchema>;

const PasswordResetTokenDBSchema = z.object({
	token: z.string(),
	email: z.string().email(),
	created_at: z.string(),
	expires_at: z.string(),
});

type PasswordResetTokenDBType = z.infer<typeof PasswordResetTokenDBSchema>;

export {PasswordResetTokenDTOSchema, PasswordResetTokenDBSchema};

export type {PasswordResetTokenDTOType, PasswordResetTokenDBType};
