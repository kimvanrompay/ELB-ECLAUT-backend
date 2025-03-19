import type {Playfield} from '@lib/models/playfield';
import type {DatabaseQueryFilters} from '@lib/utils/db/filters';

interface IPlayfieldService {
	findPlayfields(filters?: DatabaseQueryFilters): Promise<Playfield[]>;

	getPlayfieldById(id: string): Promise<Playfield | undefined>;

	findPlayfieldsBySerial(serial: string): Promise<Playfield[]>;
}

export type {IPlayfieldService};
