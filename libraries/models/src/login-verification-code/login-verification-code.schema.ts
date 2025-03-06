import {z} from '@hono/zod-openapi';

const LoginVerificationCodeDTOSchema = z.object({
	email: z.string().email(),
	createdAt: z.string(),
	expiresAt: z.string(),
});

type LoginVerificationCodeDTOType = z.infer<
	typeof LoginVerificationCodeDTOSchema
>;

const LoginVerificationCodeDBSchema = z.object({
	code: z.string().length(6),
	email: z.string().email(),
	created_at: z.string(),
	expires_at: z.string(),
});

type LoginVerificationCodeDBType = z.infer<
	typeof LoginVerificationCodeDBSchema
>;

export {LoginVerificationCodeDTOSchema, LoginVerificationCodeDBSchema};

export type {LoginVerificationCodeDTOType, LoginVerificationCodeDBType};
