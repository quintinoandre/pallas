import React, { useState, useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import useWebSocket from 'react-use-websocket';

import { REACT_APP_BWS_URL } from '@env';
import { useIsFocused } from '@react-navigation/native';

import { NewOrderButton, SelectSymbol, WalletSummary } from '../../components';
import Book from './Book';
import SymbolChart from './SymbolChart';
import Ticker from './Ticker';

const styles = StyleSheet.create({
	row: {
		flex: 1,
		flexDirection: 'row',
		paddingHorizontal: 3,
		paddingBottom: 10,
		marginTop: 10,
	},
});

/**
 * props:
 * - navigation
 * - route
 */
function Dashboard({ ...props }) {
	const isFocused = useIsFocused();

	const [symbol, setSymbol] = useState('BTCUSDT');
	const [data, setData] = useState(null);

	function onSymbolChange(event) {
		setSymbol(event);
	}

	const cachedComponents = useMemo(() => {
		return (
			<>
				<SelectSymbol
					symbol={symbol}
					onSymbolChange={(event) => onSymbolChange(event)}
				/>
				<SymbolChart symbol={symbol} />
				<WalletSummary symbol={symbol} header />
			</>
		);
	}, [symbol]);

	const { lastJsonMessage } = useWebSocket(
		`${REACT_APP_BWS_URL}/${symbol.toLowerCase()}@ticker`,
		{
			onOpen: () => {},
			onMessage: () => {
				if (lastJsonMessage && isFocused) {
					setData({
						priceChange: lastJsonMessage.p,
						priceChangePercent: lastJsonMessage.P,
						open: lastJsonMessage.o,
						high: lastJsonMessage.h,
						low: lastJsonMessage.l,
						close: lastJsonMessage.c,
						bestBid: lastJsonMessage.b,
						bestAsk: lastJsonMessage.a,
						numberOfTrades: lastJsonMessage.n,
						quoteVolume: lastJsonMessage.q,
						baseVolume: lastJsonMessage.v,
					});
				}
			},
			onError: (event) => console.error(event),
			shouldReconnect: () => true,
			reconnectInterval: 3000,
		}
	);

	return (
		<>
			<ScrollView>
				{cachedComponents}
				<View style={styles.row}>
					<Ticker data={data} />
					<Book data={data} />
				</View>
			</ScrollView>
			<NewOrderButton navigation={props.navigation} symbol={symbol} />
		</>
	);
}

export default Dashboard;
