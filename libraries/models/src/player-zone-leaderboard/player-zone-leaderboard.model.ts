import type {Cabinet} from '../cabinet/cabinet.model';
import {
	type PlayerZoneLeaderboardDTOType,
	PlayerZoneLeaderboardSchemaDTO,
} from './player-zone-leaderboard.schema';

class PlayerZoneLeaderboard {
	public cabinet?: {
		serialNumber: string;
		name: string;
		tenant: {
			id: string;
			name: string;
		};
		location: {
			id: string;
			name: string;
		};
		playfields: {
			id: string;
			name: string;
			status: string;
			externalId?: string;
			gametypeId: string;
		}[];
	};

	static schemas = {
		DTOSchema: PlayerZoneLeaderboardSchemaDTO,
	};

	constructor(
		public name: string,
		public rankings: {
			username: string;
			playerId: string;
			avatar: string;
			score: number;
			percentage?: number;
			position: number;
		}[]
	) {}

	toJSON(): PlayerZoneLeaderboardDTOType {
		return {
			name: this.name,
			rankings: this.rankings,
			cabinet: this.cabinet
				? {
						serialNumber: this.cabinet.serialNumber,
						name: this.cabinet.name,
						tenant: this.cabinet.tenant,
						location: this.cabinet.location,
						playfields: this.cabinet.playfields,
					}
				: undefined,
		};
	}

	setCabinet(cabinet: Cabinet) {
		this.cabinet = {
			serialNumber: cabinet.serialNumber,
			name: cabinet.name,
			tenant: {
				id: cabinet.tenant.id,
				name: cabinet.tenant.name,
			},
			location: {
				id: cabinet.location.id,
				name: cabinet.location.name,
			},
			playfields: cabinet.playfields.map((playfield) => ({
				id: playfield.id,
				name: playfield.name,
				status: playfield.status,
				externalId: playfield.externalId,
				gametypeId: playfield.gametypeId,
			})),
		};
	}
}

export {PlayerZoneLeaderboard};
export type {PlayerZoneLeaderboardDTOType};
