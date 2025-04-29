import {PlayfieldStats} from '../playfield-stats/playfield-stats.model';
import {StatisticsData} from '../playfield-stats/statistics-data';
import {
	PlayfieldStatsReportDBSchema,
	type PlayfieldStatsReportDBType,
	PlayfieldStatsReportDTOSchema,
	type PlayfieldStatsReportDTOType,
} from './playfield-stats-report.schema';

class PlayfieldStatsReportModel {
	startDate: Date;
	endDate: Date;
	range: 'WEEK' | 'MONTH' | 'YEAR' | 'DAY';
	unit: 'HOUR' | 'DAY';
	serialNumber: string;
	playfieldId: string;
	gametypeId: string;
	tenantId: string;
	tenantLocationId: string;

	aggregatedData?: StatisticsData;
	data?: PlayfieldStats[];

	static schemas = {
		DBSchema: PlayfieldStatsReportDBSchema,
		DTOSchema: PlayfieldStatsReportDTOSchema,
	};

	constructor(
		meta: {
			startDate: Date;
			endDate: Date;
			range: 'WEEK' | 'MONTH' | 'YEAR' | 'DAY';
			unit: 'HOUR' | 'DAY';
			serialNumber: string;
			playfieldId: string;
			gametypeId: string;
			tenantId: string;
			tenantLocationId: string;
		},
		data: PlayfieldStats[]
	) {
		this.startDate = meta.startDate;
		this.endDate = meta.endDate;
		this.range = meta.range;
		this.unit = meta.unit;
		this.serialNumber = meta.serialNumber;
		this.playfieldId = meta.playfieldId;
		this.gametypeId = meta.gametypeId;
		this.tenantId = meta.tenantId;
		this.tenantLocationId = meta.tenantLocationId;

		if (data && data.length > 0) {
			this.data = data;
			this.aggregatedData = this.calculateAggregatedData(
				data.map((item) => item.stats)
			);
		}
	}

	private calculateAggregatedData(data: StatisticsData[]): StatisticsData {
		return StatisticsData.aggregate(data);
	}

	toJSON(): PlayfieldStatsReportDTOType {
		return {
			startDate: this.startDate,
			endDate: this.endDate,
			range: this.range,
			unit: this.unit,
			serialNumber: this.serialNumber,
			playfieldId: this.playfieldId,
			gametypeId: this.gametypeId,
			tenantId: this.tenantId,
			tenantLocationId: this.tenantLocationId,

			aggregatedData: this.aggregatedData,
			data: this.data?.map((item) => {
				const stats = item.stats.toJSON();
				if (this.unit === 'HOUR') {
					delete stats.gameSessionsPerHour;
				}

				return {
					date: item.startDate,
					...stats,
				};
			}),
		};
	}
}

export {PlayfieldStatsReportModel};
export type {PlayfieldStatsReportDBType, PlayfieldStatsReportDTOType};
