import React, { useState, useEffect } from 'react';
import { Text, ActivityIndicator } from 'react-native';
import { useTheme } from 'react-native-elements';
import useWebSocket from 'react-use-websocket';

import { REACT_APP_BWS_URL as APP_BWS_URL } from '@env';
import { Feather as Icon } from '@expo/vector-icons';

import { Block } from '../Block';
import { styles } from './styles';

/**
 * props:
 * - symbol
 * - onChange?
 */
function CurrentPrice({ ...props }) {
	const { theme } = useTheme();

	const [symbol, setSymbol] = useState('btcusdt');
	const [data, setData] = useState({});

	useEffect(() => {
		if (!props.symbol) return;

		setSymbol(props.symbol.toLowerCase());
	}, [props.symbol]);

	const { lastJsonMessage } = useWebSocket(`${APP_BWS_URL}/${symbol}@ticker`, {
		onOpen: () => {},
		onError: (error) => console.error(error),
		shouldReconnect: () => true,
		reconnectInterval: 3000,
		onMessage: () => {
			if (lastJsonMessage) {
				setData({
					price: lastJsonMessage.c,
					priceChangePercent: Number(lastJsonMessage.P),
				});

				if (props.onChange) props.onChange(Number(lastJsonMessage.c));
			}
		},
	});

	function getColorByPriceChange(priceChange) {
		if (priceChange > 0) return theme.colors.success;

		if (priceChange < 0) return theme.colors.danger;

		return theme.colors.warning;
	}

	function getArrow(priceChange) {
		return priceChange > 0 ? (
			<Icon style={styles.icon} name="arrow-up" color="black" size={14} />
		) : (
			<Icon style={styles.icon} name="arrow-down" color="black" size={14} />
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
