import type {Playfield} from '@lib/models/playfield';
import type {
	DatabaseQueryFilters,
	PaginatedDatabaseQueryFilters,
} from '@lib/utils/db/filters';

interface IPlayfieldService {
	findPlayfields(filters?: DatabaseQueryFilters): Promise<Playfield[]>;

	getPlayfieldById(id: string): Promise<Playfield | undefined>;

	findPlayfieldsBySerial(serial: string): Promise<Playfield[]>;

	findPaginatedPlayfields(
		filters?: PaginatedDatabaseQueryFilters
	): Promise<{entries: Playfield[]; totalEntries: number}>;
}

export type {IPlayfieldService};
