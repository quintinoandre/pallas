import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-elements';

import { InfoBlock } from '../../components';
import {
	getDayTradeReport,
	getOrdersReport,
} from '../../services/OrdersService';
import AutomationReport from './Automation/AutomationReport';
import ChartReport from './ChartReport';
import FilterReport from './FilterReport';

const styles = StyleSheet.create({
	row: { flexDirection: 'row', marginHorizontal: 6 },
});

function Reports() {
	const { theme } = useTheme();

	const [report, setReport] = useState({});
	const [filter, setFilter] = useState({ quote: 'USDT' });
	const [isLoading, setIsLoading] = useState(false);

	function errorHandling(err) {
		console.error(err.response ? err.response.data : err.message);
	}

	useEffect(() => {
		if (!filter.quote) return;

		setIsLoading(true);

		let promise;

		if (filter.startDate && filter.startDate === filter.endDate)
			promise = getDayTradeReport(filter.quote, filter.startDate);
		else
			promise = getOrdersReport(filter.quote, filter.startDate, filter.endDate);

		promise
			.then((result) => {
				setReport(result);

				setIsLoading(false);
			})
			.catch((err) => {
				errorHandling(err);

				setIsLoading(false);
			});
	}, [filter]);

	return (
		<>
			{isLoading ? (
				<ActivityIndicator />
			) : (
				<View style={theme.container}>
					<ChartReport data={report} />
					<View style={styles.row}>
						<InfoBlock
							title="Buy Volume"
							text={`${report.buyVolume}`.substring(0, 10)}
							color="success"
						/>
						<InfoBlock
							title="Sell Volume"
							text={`${report.sellVolume}`.substring(0, 10)}
							color="danger"
						/>
						<InfoBlock title="Orders" text={report.orders} color="info" />
					</View>
					<AutomationReport data={report.automations} />
				</View>
			)}
			<FilterReport onFilter={(event) => setFilter({ ...event })} />
		</>
	);
}

export default Reports;
