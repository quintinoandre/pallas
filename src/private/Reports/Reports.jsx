import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useTheme } from 'react-native-elements';

import {
	getDayTradeReport,
	getOrdersReport,
} from '../../services/OrdersService';
import ChartReport from './ChartReport';
import FilterReport from './FilterReport';

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
				</View>
			)}
			<FilterReport onFilter={(event) => setFilter({ ...event })} />
		</>
	);
}

export default Reports;
