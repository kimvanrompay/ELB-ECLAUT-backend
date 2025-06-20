interface IPlayerZoneService {
	initialiseSessionOnPlayfield(
		playfieldId: string,
		playerId: string,
		gameSessionId: string,
		progress: Record<string, unknown>
	): Promise<void>;
}

export type {IPlayerZoneService};
