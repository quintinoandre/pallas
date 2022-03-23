import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useTheme } from 'react-native-elements';

import { ChartReportStyles as styles } from './styles';

/**
 * props:
 * - data
 */
function CharReport({ ...props }) {
	const { theme } = useTheme();

	const [data, setData] = useState({});

	useEffect(() => {
		setData(props.data);
	}, [props.data]);

	function getProfitColor(profit) {
		if (profit > 0) return theme.colors.success;

		if (profit < 0) return theme.colors.danger;

		return '#1F2937';
	}

	function getProfitPercColor(profitPerc) {
		if (profitPerc > 0) return theme.colors.success;

		if (profitPerc < 0) return theme.colors.danger;

		return '#1F2937';
	}

	function getTitle() {
		if (!data.profit) data.profit = '0';
		else data.profit = `${data.profit}`.substring(0, 8);

		if (!data.profitPerc) data.profitPerc = 0;

		const profit = data.profit >= 0 ? `+${data.profit}` : `-${data.profit}`;

		const profitPerc =
			data.profitPerc >= 0
				? `+${data.profitPerc.toFixed(2)}%`
				: `-${data.profitPerc.toFixed(2)}%`;

		return (
			<Text style={theme.h1}>
				{data.quote}{' '}
				<Text
					style={{
						color: getProfitColor(parseFloat(data.profit)),
					}}
				>
					{profit}
				</Text>{' '}
				(
				<Text
					style={{
						color: getProfitPercColor(parseFloat(data.profitPerc)),
					}}
				>
					{profitPerc}
				</Text>
				)
			</Text>
		);
	}

	return (
		<View style={styles.view}>
			{getTitle()}
			{data.series &&
			data.series.length > 0 &&
			data.subs &&
			data.subs.length > 0 ? (
				<ScrollView horizontal>
					<LineChart
						data={{ labels: data.subs, datasets: [{ data: data.series }] }}
						width={1000}
						height={250}
						yAxisLabel="$"
						verticalLabelRotation={30}
						chartConfig={{
							backgroundColor: theme.colors.primary,
							decimalPlaces: 2,
							color: () => 'white',
							labelColor: () => 'white',
							style: styles.chartStyle,
						}}
						style={styles.containerStyle}
						bezier
					/>
				</ScrollView>
			) : (
				<ActivityIndicator />
			)}
		</View>
	);
}

export default CharReport;
