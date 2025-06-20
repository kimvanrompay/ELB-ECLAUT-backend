import {
	IoTDataPlaneClient,
	PublishCommand,
} from '@aws-sdk/client-iot-data-plane';

class MqttPublisher {
	private client: IoTDataPlaneClient;

	constructor(endpoint: string) {
		this.client = new IoTDataPlaneClient({
			region: process.env.AWS_REGION,
			endpoint,
		});
	}

	public async publish(payload: string, topic: string): Promise<void> {
		await this.client.send(new PublishCommand({topic, payload, qos: 1}));
	}
}

export {MqttPublisher};
