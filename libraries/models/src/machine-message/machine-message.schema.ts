import {z} from '@hono/zod-openapi';

// TODO: create different types of messages (errors, games , ...)

enum MachineMessageEventType {
	LOG = 'l',
	MONEY_IN = 'm',
	SESSION_END = 'e',
	PCB_CHANGE = 'u',
	POWER = 'p',
	INTERNET = 'i',
	HEARTBEAT = 'h',
	STATUS = 's',

	UNKNOWN = 'UNKNOWN',
}

const MachineMessageInputBaseSchema = z.object({
	u: z.string(), // messageId
	e: z.string(), // event type
	p: z.string().optional(), // playfieldId
	c: z.string(), // cabinetId
	t: z.coerce.number(), // timestamp
	d: z.unknown(), // data
});

const HeartbeatInputDataSchema = z.object({
	c: z.number(), // a counter
});

const LogInputDataSchema = z.object({
	l: z.string(), // log level
	c: z.number(), // event code
	e: z.string().optional(), // event data
	a: z.boolean().optional(), // active
});

const MoneyInInputDataSchema = z.object({
	m: z.number(), // money in
	c: z.number(), // credits
	t: z.string(), // payment type
	i: z.string(), // game session id
});

const SessionEndInputDataSchema = z.object({
	i: z.string(), // game session id
	m: z.number(), // money out
});

const StatusInputDataSchema = z.object({
	s: z.string(), // status
});

const HeartbeatMachineMessageInputSchema = MachineMessageInputBaseSchema.merge(
	z.object({
		e: z.literal(MachineMessageEventType.HEARTBEAT),
		d: HeartbeatInputDataSchema,
	})
);

const LogMachineMessageInputSchema = MachineMessageInputBaseSchema.merge(
	z.object({
		e: z.literal(MachineMessageEventType.LOG),
		d: LogInputDataSchema,
	})
);

const MoneyInMachineMessageInputSchema = MachineMessageInputBaseSchema.merge(
	z.object({
		e: z.literal(MachineMessageEventType.MONEY_IN),
		d: MoneyInInputDataSchema,
	})
);

const SessionEndMachineMessageInputSchema = MachineMessageInputBaseSchema.merge(
	z.object({
		e: z.literal(MachineMessageEventType.SESSION_END),
		d: SessionEndInputDataSchema,
	})
);

const StatusMachineMessageInputSchema = MachineMessageInputBaseSchema.merge(
	z.object({
		e: z.literal(MachineMessageEventType.STATUS),
		d: StatusInputDataSchema,
	})
);

const MachineMessageDBSchema = z.object({
	id: z.string(),
	serial_number: z.string(),
	playfield_id: z.string().optional(),
	timestamp: z.date(),
	type: z.string(),
	data: z.object({}).passthrough().optional(),
	status: z.number(),
});

const MachineMessageInputSchema = z.union([
	MachineMessageInputBaseSchema,
	LogMachineMessageInputSchema,
	MoneyInMachineMessageInputSchema,
	SessionEndMachineMessageInputSchema,
	HeartbeatMachineMessageInputSchema,
	StatusMachineMessageInputSchema,
]);

type MachineMessageInputType = z.infer<typeof MachineMessageInputSchema>;
type MachineMessageDBType = z.infer<typeof MachineMessageDBSchema>;

type HeartbeatInputDataType = z.infer<typeof HeartbeatInputDataSchema>;
type LogInputDataType = z.infer<typeof LogInputDataSchema>;
type MoneyInInputDataType = z.infer<typeof MoneyInInputDataSchema>;
type SessionEndInputDataType = z.infer<typeof SessionEndInputDataSchema>;
type StatusInputDataType = z.infer<typeof StatusInputDataSchema>;

type LogMachineMessageInputType = z.infer<typeof LogMachineMessageInputSchema>;
type MoneyInMachineMessageInputType = z.infer<
	typeof MoneyInMachineMessageInputSchema
>;
type SessionEndMachineMessageInputType = z.infer<
	typeof SessionEndMachineMessageInputSchema
>;

type HeartbeatMachineMessageInputType = z.infer<
	typeof HeartbeatMachineMessageInputSchema
>;

type StatusMessageInputType = z.infer<typeof StatusMachineMessageInputSchema>;

export {
	MachineMessageInputSchema,
	MachineMessageDBSchema,
	MachineMessageEventType,
	HeartbeatInputDataSchema,
	LogInputDataSchema,
	MoneyInInputDataSchema,
	SessionEndInputDataSchema,
	LogMachineMessageInputSchema,
	MoneyInMachineMessageInputSchema,
	SessionEndMachineMessageInputSchema,
	HeartbeatMachineMessageInputSchema,
	StatusInputDataSchema,
	StatusMachineMessageInputSchema,
};
export type {
	MachineMessageInputType,
	MachineMessageDBType,
	HeartbeatInputDataType,
	LogInputDataType,
	MoneyInInputDataType,
	SessionEndInputDataType,
	LogMachineMessageInputType,
	MoneyInMachineMessageInputType,
	SessionEndMachineMessageInputType,
	HeartbeatMachineMessageInputType,
	StatusInputDataType,
	StatusMessageInputType,
};
