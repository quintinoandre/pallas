import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ActivityIndicator } from 'react-native';
import { useTheme } from 'react-native-elements';
import useWebSocket from 'react-use-websocket';

import { REACT_APP_BWS_URL } from '@env';
import { Feather as Icon } from '@expo/vector-icons';

import { Block } from '../Block';

const styles = StyleSheet.create({
	block: { marginHorizontal: 24, alignItems: 'center', flex: 0 },
	text: { fontWeight: 'bold', color: 'white' },
	icon: { marginLeft: 10 },
});

/**
 * props:
 * - symbol
 * - onChange
 */
function CurrentPrice({ ...props }) {
	const { theme } = useTheme();

	const [symbol, setSymbol] = useState('btcusdt');
	const [data, setData] = useState({});

	useEffect(() => {
		if (!props.symbol) return;

		setSymbol(props.symbol.toLowerCase());
	}, [props.symbol]);

	const { lastJsonMessage } = useWebSocket(
		`${REACT_APP_BWS_URL}/${symbol}@ticker`,
		{
			onOpen: () => {},
			onError: (err) => console.error(err),
			shouldReconnect: () => true,
			reconnectInterval: 3000,
			onMessage: () => {
				if (lastJsonMessage) {
					setData({
						price: lastJsonMessage.c,
						priceChangePercent: parseFloat(lastJsonMessage.P),
					});

					if (props.onChange) props.onChange(parseFloat(lastJsonMessage.c));
				}
			},
		}
	);

	function getColorByPriceChange(priceChange) {
		return priceChange > 0 ? theme.colors.success : theme.colors.danger;
	}

	function getArrow(priceChange) {
		return priceChange > 0 ? (
			<Icon
				style={styles.icon}
				name="arrow-up"
				color={theme.colors.warning}
				size={14}
			/>
		) : (
			<Icon
				style={styles.icon}
				name="arrow-down"
				color={theme.colors.warning}
				size={14}
			/>
		);
	}

	function getPrice(price, priceChange) {
		return price ? (
			<>
				{price.substring(0, 10)} {getArrow(priceChange)}
			</>
		) : (
			<ActivityIndicator />
		);
	}

	return (
		<Block
			color={getColorByPriceChange(data.priceChangePercent)}
			style={styles.block}
		>
			<Text style={styles.text}>
				Current Price: {getPrice(data.price, data.priceChangePercent)}
			</Text>
		</Block>
	);
}

export { CurrentPrice };
