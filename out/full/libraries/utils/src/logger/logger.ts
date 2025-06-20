import {pino} from 'pino';
import pretty from 'pino-pretty';

const stream = pretty({
	colorize: true,
});

const _rootLogger = pino(
	{
		enabled: true,
		level: 'trace',
	},
	stream
);

class PinoLogger {
	/**
	 * The root pino logger, don't use this directly, use a child logger instead
	 */
	_rootLogger: pino.Logger = _rootLogger;

	_childLogger: pino.Logger;

	constructor(bindings: pino.Bindings, options: pino.ChildLoggerOptions) {
		this._childLogger = _rootLogger.child(bindings, options);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	trace<T extends object>(bindings: T, msg?: string, ...args: any[]): void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	trace(msg: string, ...args: any[]): void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	trace(mustOneArg: any, ...args: any[]): void {
		this._childLogger.trace(mustOneArg, ...args);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	debug<T extends object>(bindings: T, msg?: string, ...args: any[]): void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	debug(msg: string, ...args: any[]): void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	debug(mustOneArg: any, ...args: any[]): void {
		this._childLogger.debug(mustOneArg, ...args);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	info<T extends object>(bindings: T, msg?: string, ...args: any[]): void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	info(msg: string, ...args: any[]): void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	info(mustOneArg: any, ...args: any[]): void {
		this._childLogger.info(mustOneArg, ...args);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	warn<T extends object>(bindings: T, msg?: string, ...args: any[]): void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	warn(msg: string, ...args: any[]): void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	warn(mustOneArg: any, ...args: any[]): void {
		this._childLogger.warn(mustOneArg, ...args);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	error<T extends object>(bindings: T, msg?: string, ...args: any[]): void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	error(msg: string, ...args: any[]): void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	error(mustOneArg: any, ...args: any[]): void {
		this._childLogger.error(mustOneArg, ...args);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	fatal<T extends object>(bindings: T, msg?: string, ...args: any[]): void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	fatal(msg: string, ...args: any[]): void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	fatal(mustOneArg: any, ...args: any[]): void {
		this._childLogger.fatal(mustOneArg, ...args);
	}
}

export {PinoLogger};
