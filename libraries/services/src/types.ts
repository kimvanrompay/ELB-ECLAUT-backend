import {AppUserRole} from '@lib/models/app-user';
import {PinoLogger} from '@lib/utils';

export type {IMachineService} from './machine-service/machine.service.types';
export type {IAppUserService} from './app-user-service/app-user.service.types';
export type {IAuthService} from './auth-service/auth.service.types';
export type {IEmailService} from './email-service/email.service.types';
export type {ILoginVerificationCodeService} from './login-verification-code-service/login-verification-code.service.types';
export type {IPlayfieldService} from './playfield-service/playfield.service.types';
export type {ICabinetService} from './cabinet-service/cabinet.service.types';
export type {IMachineMessageService} from './machine-message-service/machine-message.service.types';
export type {IMachineLogService} from './machine-log-service/machine-log.service.types';
export type {ITenantLocationService} from './tenant-location-service/tenant-location.service.types';
export type {ITenantService} from './tenant-service/tenant.service.types';
export type {IPlayerZoneService} from './player-zone-service/player-zone.service.types';

export type AppContext = {
	auth?: {
		userId: string;
		role: AppUserRole;
		email: string;
		tenantId: string;
		locationIds: string[];
		isElaut: boolean;
	};
	isAuthenticated?: boolean;
	requestId?: string;
	logger: PinoLogger;
};

export type AuthenticatedAppContext = {
	auth: NonNullable<AppContext['auth']>;
	isAuthenticated: true;
	requestId?: string;
	logger: PinoLogger;
};

export const isAuthenticatedContext = (
	context: AppContext
): context is AuthenticatedAppContext => {
	return context.isAuthenticated === true && context.auth !== undefined;
};
