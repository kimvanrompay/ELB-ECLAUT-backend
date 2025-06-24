import type {GameSession} from '@lib/models/game-session';

interface IPlayerZoneService {
	initialiseSessionOnPlayfield(
		playfieldId: string,
		playerId: string,
		gameSessionId: string,
		progress: Record<string, unknown>
	): Promise<void>;

	getPlayerProfile(playerId: string): Promise<any>;

	getMachineLeaderboard(serialNumber: string): Promise<any>;

	createMachineLeaderboard(
		serialNumber: string,
		leaderboardData: Record<string, any>
	): Promise<any>;

	// In case we want to update the leaderboard later, ex. tenant or location data
	// updateMachineLeaderboard(
	// 	serialNumber: string,
	// 	leaderboardData: Record<string, any>
	// ): Promise<any>;

	processGameResult(gameSessionOrId: string | GameSession): Promise<void>;
}

export type {IPlayerZoneService};
