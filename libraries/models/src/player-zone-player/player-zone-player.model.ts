import {
	PlayerZonePlayerDTOSchema,
	type PlayerZonePlayerDTOType,
} from './player-zone-player.schema';

class PlayerZonePlayer {
	static schemas = {
		DTOSchema: PlayerZonePlayerDTOSchema,
	};

	constructor(
		public id: string,
		public username: string,
		public avatar: string,
		public language?: string,
		public birthDate?: Date
	) {
		if (birthDate) {
			this.birthDate = new Date(birthDate);
		}
	}

	toJSON(): PlayerZonePlayerDTOType {
		return {
			id: this.id,
			username: this.username,
			avatar: this.avatar,
			language: this.language,
			birthDate: this.birthDate ? this.birthDate.toISOString() : undefined,
		};
	}
}

export {PlayerZonePlayer};
export type {PlayerZonePlayerDTOType};
