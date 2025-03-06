import {pino} from 'pino';

import {AppUserRole} from '@lib/models/app-user';

type Variables = {
	requestId: string;
	logger: pino.Logger;
	tokenUser?: {
		email: string;
		userId: string;
		role: AppUserRole;
	};
};

type Environment = {
	Variables: Variables;
};

export type {Environment, Variables};
