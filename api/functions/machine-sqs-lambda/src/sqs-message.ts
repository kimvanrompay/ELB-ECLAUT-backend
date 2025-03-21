import type {Message} from '@aws-sdk/client-sqs';
import type {SQSRecord} from 'aws-lambda';

import {MachineMessage} from '@lib/models/machine-message';
import {isValidArrayIndex} from '@lib/utils/array';

import {LOGGER} from './logger';

const getPropertyFromMqttTopic = (topicDirs: string[], property: string) => {
	const index = topicDirs.indexOf(property) + 1;
	return isValidArrayIndex(index, topicDirs.length) ? topicDirs[index]! : null;
};

const getPropertiesFromMqttTopic = (topic: string) => {
	const topicDirectories = topic.split('/');
	const playfieldId = topicDirectories[1];
	// const tenantId = getPropertyFromMqttTopic(topicDirectories, 'tenants');
	// const locationId = getPropertyFromMqttTopic(topicDirectories, 'locations');
	const cabinetId = topicDirectories[0];

	return {
		playfieldId,
		cabinetId,
	};
};

const getMachineMessagesFromSQSMessage = (message: Message | SQSRecord) => {
	if (!(message as Message).Body && !(message as SQSRecord).body) {
		return [];
	}

	try {
		const parsedBody = JSON.parse(
			(message as Message).Body || (message as SQSRecord).body
		);
		const props = getPropertiesFromMqttTopic(parsedBody.topic);

		const isArrayOfMessages = Array.isArray(parsedBody.message);
		const messages = isArrayOfMessages
			? parsedBody.message
			: [parsedBody.message];
		const messagesWithProps = messages.map((m: any) => ({
			...m,
			c: props.cabinetId,
			p: props.playfieldId,
		}));

		return MachineMessage.fromMachineInput(messagesWithProps);
	} catch (e) {
		LOGGER.error(`Error parsing message body: ${e}`);
		return [];
	}
};

export {getMachineMessagesFromSQSMessage};
