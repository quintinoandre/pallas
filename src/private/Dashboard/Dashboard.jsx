import React, { useState } from 'react';
import { ScrollView, Text } from 'react-native';
import useWebSocket from 'react-use-websocket';

import { REACT_APP_BWS_URL } from '@env';

import SelectSymbol from '../../components/SelectSymbol/SelectSymbol';
import WalletSummary from '../../components/WalletSummary/WalletSummary';
import SymbolChart from './SymbolChart';

function Dashboard() {
	const [symbol, setSymbol] = useState('BTCUSDT');
	const [data, setData] = useState({});

	function onSymbolChange(event) {
		setSymbol(event);
	}

	const { lastJsonMessage } = useWebSocket(
		`${REACT_APP_BWS_URL}/${symbol.toLowerCase()}@ticker`,
		{
			onOpen: () => {},
			onMessage: () => {
				if (lastJsonMessage) {
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
		<ScrollView>
			<SelectSymbol
				symbol={symbol}
				onSymbolChange={(event) => onSymbolChange(event)}
			/>
			<SymbolChart symbol={symbol} />
			<WalletSummary symbol={symbol} />
			<Text>{JSON.stringify(data)}</Text>
		</ScrollView>
	);
}

export default Dashboard;
