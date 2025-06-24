import {
	StatisticsDataDBSchema,
	type StatisticsDataDBType,
	type StatisticsDataType,
} from './playfield-stats.schema';

class StatisticsData {
	countGameSessions: number;

	sumPlayTime: number;
	sumMoneyIn: number;
	sumMoneyOut: number;
	sumCredits: number;

	sumProfit: number;

	returnToPlayer: number;

	avgPlayTime: number;
	avgMoneyIn: number;
	avgMoneyOut: number;
	avgCredits: number;

	minPlayTime: number;
	minMoneyIn: number;
	minMoneyOut: number;
	minCredits: number;

	maxPlayTime: number;
	maxMoneyIn: number;
	maxMoneyOut: number;
	maxCredits: number;

	gameSessionsPerHour?: Record<number, number>;
	paymentMethods?: Record<
		string,
		{
			moneyIn: number;
			countGameSessions: number;
		}
	>;

	constructor(args: {
		countGameSessions: number | string;
		sumPlayTime: number | string;
		sumCredits: number | string;
		sumMoneyIn: number | string;
		sumMoneyOut: number | string;

		sumProfit: number | string;

		avgPlayTime: number | string;
		avgMoneyIn: number | string;
		avgMoneyOut: number | string;
		avgCredits: number | string;

		minPlayTime: number | string;
		minMoneyIn: number | string;
		minMoneyOut: number | string;
		minCredits: number | string;

		maxPlayTime: number | string;
		maxMoneyIn: number | string;
		maxMoneyOut: number | string;
		maxCredits: number | string;

		gameSessionsPerHour?: Record<number, number>;
		paymentMethods?: Record<string, {m: number; c: number}>;
	}) {
		this.countGameSessions = Number(args.countGameSessions);

		this.sumPlayTime = Number(args.sumPlayTime);
		this.sumMoneyIn = Number(args.sumMoneyIn);
		this.sumMoneyOut = Number(args.sumMoneyOut);
		this.sumCredits = Number(args.sumCredits);

		this.sumProfit = this.sumMoneyIn - this.sumMoneyOut;

		this.avgPlayTime = Number(args.avgPlayTime);
		this.avgMoneyIn = Number(args.avgMoneyIn);
		this.avgMoneyOut = Number(args.avgMoneyOut);
		this.avgCredits = Number(args.avgCredits);

		this.minPlayTime = Number(args.minPlayTime);
		this.minMoneyIn = Number(args.minMoneyIn);
		this.minMoneyOut = Number(args.minMoneyOut);
		this.minCredits = Number(args.minCredits);

		this.maxPlayTime = Number(args.maxPlayTime);
		this.maxMoneyIn = Number(args.maxMoneyIn);
		this.maxMoneyOut = Number(args.maxMoneyOut);
		this.maxCredits = Number(args.maxCredits);

		this.gameSessionsPerHour = args.gameSessionsPerHour ?? undefined;

		this.paymentMethods = args.paymentMethods
			? Object.entries(args.paymentMethods).reduce(
					(acc, [key, value]) => {
						acc[key] = {
							moneyIn: value.m,
							countGameSessions: value.c,
						};

						return acc;
					},
					{} as Record<string, {moneyIn: number; countGameSessions: number}>
				)
			: undefined;

		this.returnToPlayer = this.calculateReturnToPlayer();
	}

	private static weightedAverage(
		currentCount: number,
		currentAvg: number,
		toAddCount: number,
		toAddValue: number
	): number {
		if (currentCount === 0) {
			return toAddValue;
		}

		return (
			(currentAvg * currentCount + toAddValue * toAddCount) /
			(currentCount + toAddCount)
		);
	}

	calculateReturnToPlayer(): number {
		if (this.sumMoneyIn === 0) {
			return 0;
		}

		if (this.sumMoneyOut === 0) {
			return 0;
		}

		return Number(((this.sumMoneyOut / this.sumMoneyIn) * 100).toFixed(2));
	}

	toJSON(): StatisticsDataType {
		return {
			countGameSessions: this.countGameSessions,

			sumPlayTime: this.sumPlayTime,
			sumMoneyIn: this.sumMoneyIn,
			sumMoneyOut: this.sumMoneyOut,
			sumCredits: this.sumCredits,

			sumProfit: this.sumProfit,
			returnToPlayer: this.returnToPlayer,

			avgPlayTime: this.avgPlayTime,
			avgMoneyIn: this.avgMoneyIn,
			avgMoneyOut: this.avgMoneyOut,
			avgCredits: this.avgCredits,

			minPlayTime: this.minPlayTime,
			minMoneyIn: this.minMoneyIn,
			minMoneyOut: this.minMoneyOut,
			minCredits: this.minCredits,

			maxPlayTime: this.maxPlayTime,
			maxMoneyIn: this.maxMoneyIn,
			maxMoneyOut: this.maxMoneyOut,
			maxCredits: this.maxCredits,

			gameSessionsPerHour: this.gameSessionsPerHour,
			paymentMethods: this.paymentMethods,
		};
	}

	static fromDBType(data: StatisticsDataDBType): StatisticsData {
		const validated = StatisticsDataDBSchema.parse(data);

		console.log('validated', validated);

		return new StatisticsData({
			countGameSessions: data.count_game_sessions,

			sumPlayTime: data.sum_play_time,
			sumMoneyIn: data.sum_money_in,
			sumMoneyOut: data.sum_money_out,
			sumCredits: data.sum_credits,

			sumProfit: data.sum_profit,

			avgPlayTime: data.avg_play_time,
			avgMoneyIn: data.avg_money_in,
			avgMoneyOut: data.avg_money_out,
			avgCredits: data.avg_credits,

			minPlayTime: data.min_play_time,
			minMoneyIn: data.min_money_in,
			minMoneyOut: data.min_money_out,
			minCredits: data.min_credits,

			maxPlayTime: data.max_play_time,
			maxMoneyIn: data.max_money_in,
			maxMoneyOut: data.max_money_out,
			maxCredits: data.max_credits,

			gameSessionsPerHour: data.game_sessions_per_hour ?? undefined,
			paymentMethods: data.payment_methods ?? undefined,
		});
	}

	static createAllZero(): StatisticsData {
		return new StatisticsData({
			countGameSessions: 0,
			sumPlayTime: 0,
			sumMoneyIn: 0,
			sumMoneyOut: 0,
			sumCredits: 0,

			sumProfit: 0,

			avgPlayTime: 0,
			avgMoneyIn: 0,
			avgMoneyOut: 0,
			avgCredits: 0,

			minPlayTime: 0,
			minMoneyIn: 0,
			minMoneyOut: 0,
			minCredits: 0,

			maxPlayTime: 0,
			maxMoneyIn: 0,
			maxMoneyOut: 0,
			maxCredits: 0,

			gameSessionsPerHour: undefined,
			paymentMethods: undefined,
		});
	}

	static createEmpty(): StatisticsData {
		return new StatisticsData({
			countGameSessions: 0,
			sumPlayTime: 0,
			sumMoneyIn: 0,
			sumMoneyOut: 0,
			sumCredits: 0,

			sumProfit: 0,

			avgPlayTime: 0,
			avgMoneyIn: 0,
			avgMoneyOut: 0,
			avgCredits: 0,

			minPlayTime: Number.MAX_VALUE,
			minMoneyIn: Number.MAX_VALUE,
			minMoneyOut: Number.MAX_VALUE,
			minCredits: Number.MAX_VALUE,

			maxPlayTime: Number.MIN_VALUE,
			maxMoneyIn: Number.MIN_VALUE,
			maxMoneyOut: Number.MIN_VALUE,
			maxCredits: Number.MIN_VALUE,

			gameSessionsPerHour: undefined,
			paymentMethods: undefined,
		});
	}

	static aggregate(data: StatisticsData[]): StatisticsData {
		if (data.length <= 0) {
			return this.createAllZero();
		}

		if (data.length === 1) {
			return data[0]!;
		}

		const freshStats = StatisticsData.createEmpty();

		const accData = data.reduce((accumulator, item) => {
			const currentCount = accumulator.countGameSessions;
			const currentAvgPlayTime = accumulator.avgPlayTime;
			const currentAvgMoneyIn = accumulator.avgMoneyIn;
			const currentAvgMoneyOut = accumulator.avgMoneyOut;
			const currentAvgCredits = accumulator.avgCredits;

			accumulator.countGameSessions += item.countGameSessions;

			accumulator.sumPlayTime += item.sumPlayTime;
			accumulator.sumMoneyIn += item.sumMoneyIn;
			accumulator.sumMoneyOut += item.sumMoneyOut;
			accumulator.sumCredits += item.sumCredits;

			accumulator.sumProfit = accumulator.sumMoneyIn - accumulator.sumMoneyOut;

			accumulator.avgPlayTime = StatisticsData.weightedAverage(
				currentCount,
				currentAvgPlayTime,
				item.countGameSessions,
				item.avgPlayTime
			);
			accumulator.avgMoneyIn = StatisticsData.weightedAverage(
				currentCount,
				currentAvgMoneyIn,
				item.countGameSessions,
				item.avgMoneyIn
			);
			accumulator.avgMoneyOut = StatisticsData.weightedAverage(
				currentCount,
				currentAvgMoneyOut,
				item.countGameSessions,
				item.avgMoneyOut
			);
			accumulator.avgCredits = StatisticsData.weightedAverage(
				currentCount,
				currentAvgCredits,
				item.countGameSessions,
				item.avgCredits
			);

			accumulator.minPlayTime = Math.min(
				accumulator.minPlayTime,
				item.minPlayTime
			);

			accumulator.minMoneyIn = Math.min(
				accumulator.minMoneyIn,
				item.minMoneyIn
			);

			accumulator.minMoneyOut = Math.min(
				accumulator.minMoneyOut,
				item.minMoneyOut
			);

			accumulator.minCredits = Math.min(
				accumulator.minCredits,
				item.minCredits
			);

			accumulator.maxPlayTime = Math.max(
				accumulator.maxPlayTime,
				item.maxPlayTime
			);

			accumulator.maxMoneyIn = Math.max(
				accumulator.maxMoneyIn,
				item.maxMoneyIn
			);

			accumulator.maxMoneyOut = Math.max(
				accumulator.maxMoneyOut,
				item.maxMoneyOut
			);

			accumulator.maxCredits = Math.max(
				accumulator.maxCredits,
				item.maxCredits
			);

			accumulator.gameSessionsPerHour = item.gameSessionsPerHour
				? Object.entries(item.gameSessionsPerHour ?? {}).reduce(
						(acc, [key, value]) => {
							const parsedKey = Number(key);
							acc[parsedKey] ??= 0;
							acc[parsedKey] += value;

							return acc;
						},
						accumulator.gameSessionsPerHour ?? {}
					)
				: undefined;

			accumulator.paymentMethods = item.paymentMethods
				? Object.entries(item.paymentMethods).reduce((acc, [key, value]) => {
						acc[key] ??= {
							moneyIn: 0,
							countGameSessions: 0,
						};
						acc[key].moneyIn += value.moneyIn;
						acc[key].countGameSessions += value.countGameSessions;

						return acc;
					}, accumulator.paymentMethods ?? {})
				: accumulator.paymentMethods;

			return accumulator;
		}, freshStats);

		accData.returnToPlayer = accData.calculateReturnToPlayer();

		return accData;
	}
}

export {StatisticsData};
