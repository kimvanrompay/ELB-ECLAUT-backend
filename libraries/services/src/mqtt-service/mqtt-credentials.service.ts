import type {STSClient} from '@aws-sdk/client-sts';
import {v4 as uuid} from 'uuid';

import {MqttCredentialsModel} from '@lib/models/mqtt-credentials';
import type {Playfield} from '@lib/models/playfield';
import {PinoLogger} from '@lib/utils';
import {createMqttPolicy, getTemporaryCredentials} from '@lib/utils/aws-sts';

import {AuthorizationService} from '../authorization-service/authorization.service';
import type {IPlayfieldService} from '../playfield-service/playfield.service.types';
import type {AuthenticatedAppContext} from '../types';

class MqttCredentialsService {
	private logger: PinoLogger;

	constructor(
		private stsClient: STSClient,
		private playfieldService: IPlayfieldService,
		private context: AuthenticatedAppContext
	) {
		this.logger = context.logger.getChildLogger(
			{
				service: 'mqtt-credentials-service',
			},
			{}
		);
	}

	private async getPlayfield(
		playfieldId: string
	): Promise<Playfield | undefined> {
		return this.playfieldService.getPlayfieldById(playfieldId);
	}

	// TODO: cabinet only topics, make more specific, role based topics
	async getMqttCredentials(options: {
		playfieldId?: string;
		serialNumber?: string;
	}): Promise<MqttCredentialsModel | undefined> {
		const {playfieldId, serialNumber} = options;

		const {userId, tenantId, locationIds, securityGroup} = this.context.auth;

		const isTenantBound = AuthorizationService.isTenantBound(securityGroup);
		const isLocationBound = AuthorizationService.isLocationBound(securityGroup);

		const subscribeTopics = [`user/${userId}/*`];

		this.logger.debug(
			`getMqttCredentials: userId: ${userId}, tenantId: ${tenantId}, locationIds: ${locationIds}, role: ${securityGroup}`
		);

		if (isTenantBound && isLocationBound) {
			this.logger.debug('getMqttCredentials: tenant and location bound');
			subscribeTopics.push(`tenant/${tenantId}`);
			locationIds.forEach((locationId) => {
				subscribeTopics.push(`tenant/${tenantId}/loc/${locationId}/*`);
			});
		}

		if (isTenantBound && !isLocationBound) {
			subscribeTopics.push(`tenant/${tenantId}`);
			subscribeTopics.push(`tenant/${tenantId}/*`);
		}

		if (!isTenantBound && !isLocationBound) {
			subscribeTopics.push(`tenant/*`);
		}

		const publishTopics: string[] = [];

		if (playfieldId) {
			const playfield = await this.getPlayfield(playfieldId);

			// Either the playfield doesn't exist or the playfield is not accessible to the user
			if (!playfield) {
				throw new Error(`Playfield with ID ${playfieldId} not found`);
			}

			const serialForPlayfield = playfield.cabinet.serialNumber;

			subscribeTopics.push(
				`cabinetId/${playfieldId}/*`, // TODO: remove when implemented in the machine
				`${serialForPlayfield}/${playfieldId}/*`
			);

			publishTopics.push(
				`cabinetId/${playfieldId}/mgmt/*`,
				`${serialForPlayfield}/${playfieldId}/mgmt/*`
			);
		}

		const policy = createMqttPolicy(subscribeTopics, publishTopics);

		const credentials = await getTemporaryCredentials(
			this.stsClient,
			policy,
			`mqtt-${uuid().split('-')[0]}`,
			3600
		);

		return credentials
			? MqttCredentialsModel.fromAWSCredentials(credentials)
			: undefined;
	}
}

export {MqttCredentialsService};
