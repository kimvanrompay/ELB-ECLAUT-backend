import {
	DeleteMessageBatchCommand,
	type Message,
	ReceiveMessageCommand,
	SQSClient,
} from '@aws-sdk/client-sqs';

import {getEnvVariable} from '../env.utils';
import {PinoLogger} from '../logger/logger';

const MESSAGES_POLL_SIZE = getEnvVariable('SQS_POLL_SIZE', 10);
const MESSAGES_BATCH_SIZE = getEnvVariable('SQS_BATCH_SIZE', 10);
const MESSAGES_WAIT_TIME = getEnvVariable('SQS_POLLING_TIME', 20);
const VISIBILITY_TIMEOUT = Math.max(
	getEnvVariable('SQS_VISIBILITY_TIMEOUT', 15),
	MESSAGES_BATCH_SIZE + 5
);

const MAX_MESSAGES_IN_FLIGHT = getEnvVariable('SQS_MAX_IN_FLIGHT', 20); // Max number of messages that can be processed at the same time

const PARAMS = {
	QueueUrl:
		'https://sqs.eu-west-1.amazonaws.com/084828585414/claire-test-queue', // URL of the queue
	MaxNumberOfMessages: MESSAGES_POLL_SIZE, // Max number of messages to receive in a single poll (10 is the max)
	WaitTimeSeconds: MESSAGES_WAIT_TIME, // Wait time for long polling
	VisibilityTimeout: VISIBILITY_TIMEOUT, // Time in seconds that the message is hidden from other consumers
};

class SqsMessagePoller {
	private messagesInFlight = 0;
	private client: SQSClient;
	private logger: PinoLogger;

	private lastAcknowledgeTime: number = Date.now();
	private acknowledgeTimeout: null | NodeJS.Timeout = null;

	private processedMessages: Message[] = [];
	private readonly messageHandler: (message: Message) => Promise<boolean>;
	private readonly failedMessageHandler: (message: Message) => Promise<void>;

	isActive = false;
	isPolling = false;

	private readonly params;

	constructor(
		messageHandler: (messages: Message) => Promise<boolean>,
		failedMessageHandler: (messages: Message) => Promise<void>,
		params = PARAMS
	) {
		this.params = {
			...PARAMS,
			...params,
		};
		this.messageHandler = messageHandler;
		this.failedMessageHandler = failedMessageHandler;

		this.client = new SQSClient({
			region: 'eu-west-1',
			// endpoint: 'https://sqs.eu-west-1.amazonaws.com/084828585414/claire-test-queue',
		});

		this.logger = new PinoLogger(
			{
				name: 'sqs-message-poller',
			},
			{}
		);
	}

	async poll(): Promise<Message[]> {
		try {
			const command = new ReceiveMessageCommand(this.params);
			const data = await this.client.send(command);

			return data.Messages ?? [];
		} catch (error) {
			this.logger.error(error);
			return [];
		}
	}

	/**
	 * Messages in flight are messages that are currently being processed by the consumer
	 * Check if there are slots available for more messages to be processed
	 * @private
	 */
	private _areThereSlotsAvailable() {
		return this.messagesInFlight < MAX_MESSAGES_IN_FLIGHT;
	}

	/**
	 * Recursively query messages until there are no more slots available
	 */
	private async loopPoll() {
		this.logger.info('Checking if there are slots available');
		if (!this.isActive) {
			this.logger.info('Poller is inactive');
			return;
		}

		if (!this._areThereSlotsAvailable()) {
			this.logger.info('No slots available');
			this.isPolling = false;

			setTimeout(() => {
				this.loopPoll();
			}, 200);
			return;
		}

		this.logger.info('Polling messages', {
			messagesInFlight: this.messagesInFlight,
		});
		this.isPolling = true;
		const messages = await this.poll();
		this.logger.info('Received messages');
		this.messagesInFlight += messages.length;

		for (const message of messages) {
			this.handleMessage(message);
		}

		this.loopPoll();
	}

	private async deleteBatchOfMessages(messages: Message[]) {
		try {
			const params = {
				QueueUrl: this.params.QueueUrl,
				Entries: messages.map((message) => ({
					Id: message.MessageId,
					ReceiptHandle: message.ReceiptHandle,
				})),
			};

			const command = new DeleteMessageBatchCommand(params);
			const data = await this.client.send(command);

			// this.logger.info({
			// 	data,
			// });

			// Free up slots for more messages
			if (data.Successful) {
				this.messagesInFlight -= data.Successful.length;
			}
		} catch (error) {
			console.error(error);
		}
	}

	async handleMessage(message: Message) {
		try {
			const result = await this.messageHandler(message);

			if (result) {
				this.acknowledgeMessage(message);
			} else {
				this.logger.error('Failed to process message', message);
				this._handleFailedMessage(message);
			}
		} catch (error) {
			this.logger.error(error);
			this._handleFailedMessage(message);
		}
	}

	private _getFirstTenProcessedMessagesAndRemove() {
		return this.processedMessages.splice(0, 10);
	}

	private _resetAcknowledgeTimeout() {
		if (this.acknowledgeTimeout !== null) {
			clearTimeout(this.acknowledgeTimeout);
			this.acknowledgeTimeout = null;
		}
	}

	private deleteMessages() {
		const messages = this._getFirstTenProcessedMessagesAndRemove();

		try {
			this.deleteBatchOfMessages(messages);
		} catch (error) {
			this.logger.error(error);
		}

		this.lastAcknowledgeTime = Date.now();
	}

	private acknowledgeMessage(message: Message) {
		this.processedMessages.push(message);
		this._resetAcknowledgeTimeout();

		const hasEnoughMessagesToBatch =
			this.processedMessages.length >= MESSAGES_BATCH_SIZE;

		if (hasEnoughMessagesToBatch) {
			this.deleteMessages();
			return;
		}

		// Check if there are messages to acknowledge after 1 second
		if (this.processedMessages.length > 0) {
			this.acknowledgeTimeout = setTimeout(() => {
				this.deleteMessages();
			}, 1000);
		}
	}

	private _handleFailedMessage(message: Message) {
		this.failedMessageHandler(message);
		this.messagesInFlight -= 1;
	}

	start() {
		this.isActive = true;
		this.loopPoll();
	}

	stop() {
		this.isActive = false;
	}
}

export {SqsMessagePoller};
