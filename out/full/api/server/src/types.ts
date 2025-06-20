import {pino} from 'pino';

type Variables = {
	requestId: string;
	logger: pino.Logger;
};

type Environment = {
	Variables: Variables;
};

export {Environment, Variables};
