import type {
	Gametype,
	GametypeCreateDTOType,
	GametypeUpdateDTOType,
} from '@lib/models/gametype';
import type {DatabaseQueryFilters} from '@lib/utils/db/filters';

interface IGametypeService {
	findGametypes(filters: DatabaseQueryFilters): Promise<Gametype[]>;

	getGametypeById(id: string): Promise<Gametype | undefined>;

	createGametype(gametype: GametypeCreateDTOType): Promise<Gametype>;

	updateGametype(
		id: string,
		gametype: GametypeUpdateDTOType
	): Promise<Gametype>;
}

export type {IGametypeService};
