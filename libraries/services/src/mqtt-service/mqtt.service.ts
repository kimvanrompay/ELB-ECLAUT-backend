import {MqttPublisher} from '@lib/utils/mqtt-publisher';

const MQTT_BROKER_URL = process.env.MQTT_ENDPOINT;

class MqttService {
	private mqttPublisher: MqttPublisher;

	constructor() {
		if (!MQTT_BROKER_URL) {
			throw new Error('MQTT_ENDPOINT is not defined in environment variables');
		}

		this.mqttPublisher = new MqttPublisher(MQTT_BROKER_URL);
	}

	sendMessageToTopic(topic: string, message: unknown): Promise<void> {
		const payload = JSON.stringify(message);
		return this.mqttPublisher.publish(payload, topic);
	}
}

export {MqttService};
