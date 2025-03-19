import type {Cabinet} from '@lib/models/cabinet';
import type {DatabaseQueryFilters} from '@lib/utils/db/filters';

interface ICabinetService {
	findCabinets(filters?: DatabaseQueryFilters): Promise<Cabinet[]>;

	getCabinetBySerial(serial: string): Promise<Cabinet | undefined>;
}

export type {ICabinetService};
