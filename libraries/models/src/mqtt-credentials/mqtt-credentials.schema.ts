import {z} from '@hono/zod-openapi';

const MqttCredentialsSchema = z
	.object({
		id: z.string(),
		secretAccessKey: z.string(),
		sessionToken: z.string().optional(),
	})
	.openapi('MqttCredentials');

type MqttCredentialsType = z.infer<typeof MqttCredentialsSchema>;

export {MqttCredentialsSchema};
export type {MqttCredentialsType};
