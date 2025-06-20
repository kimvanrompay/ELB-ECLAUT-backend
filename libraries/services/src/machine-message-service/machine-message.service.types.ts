import {MachineMessage} from '@lib/models/machine-message';

interface IMachineMessageService {
	handleMessage(message: MachineMessage): Promise<boolean>;

	handleFailedMessage(message: MachineMessage): Promise<void>;
}

export type {IMachineMessageService};
