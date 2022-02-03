import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import Block from '../../components/Block/Block';

const styles = StyleSheet.create({
	column: {
		flex: 1,
		flexDirection: 'column',
		paddingLeft: 10,
		paddingBottom: 10,
	},
	p: { paddingTop: 10 },
	bold: { fontWeight: 'bold' },
});

/**
 * props:
 * - data
 */
function Ticker({ ...props }) {
	const { theme } = useTheme();

	const [ticker, setTicker] = useState(null);

	useEffect(() => {
		setTicker(props.data || null);
	}, [props.data]);

	function getPercentPrice(price) {
		if (parseFloat(price) > 0)
			return (
				<Text style={{ color: theme.colors.success }}>{`+${price}%`}</Text>
			);
		return <Text style={{ color: theme.colors.danger }}>{`${price}%`}</Text>;
	}

	return (
		<Block color="white">
			<Text style={theme.h2}>
				<View style={{ paddingRight: 5 }}>
					<Icon name="bar-chart-2" size={20} color="black" />
				</View>
				Market 24h
			</Text>
			{ticker ? (
				<View style={styles.column}>
					<View style={styles.p}>
						<Text style={styles.bold}>Open: </Text>
						<Text>{ticker.open}</Text>
					</View>
					<View style={styles.p}>
						<Text style={styles.bold}>Low: </Text>
						<Text>{ticker.low}</Text>
					</View>
					<View style={styles.p}>
						<Text style={styles.bold}>High: </Text>
						<Text>{ticker.high}</Text>
					</View>
					<View style={styles.p}>
						<Text style={styles.bold}>% Price: </Text>
						<Text>{getPercentPrice(ticker.priceChangePercent)}</Text>
					</View>
					<View style={styles.p}>
						<Text style={styles.bold}>Quote Volume: </Text>
						<Text>{parseFloat(ticker.quoteVolume).toFixed(2)}</Text>
					</View>
				</View>
			) : (
				<ActivityIndicator />
			)}
		</Block>
	);
}

export default Ticker;
