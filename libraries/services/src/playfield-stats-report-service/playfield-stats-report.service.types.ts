import {PlayfieldStatsReportModel} from '@lib/models/playfield-stats-report';

interface IPlayfieldStatsReportService {
	getStatisticsReportByPlayfield(
		playfieldId: string,
		date: Date,
		range: 'WEEK' | 'MONTH' | 'YEAR' | 'DAY',
		unit: 'HOUR' | 'DAY'
	): Promise<PlayfieldStatsReportModel>;
}

export type {IPlayfieldStatsReportService};
