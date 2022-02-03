import React, { useState } from 'react';
import { ScrollView } from 'react-native';

import SelectSymbol from '../../components/SelectSymbol/SelectSymbol';
import WalletSummary from '../../components/WalletSummary/WalletSummary';
import SymbolChart from './SymbolChart';

function Dashboard() {
	const [symbol, setSymbol] = useState('BTCUSDT');

	function onSymbolChange(event) {
		setSymbol(event);
	}

	return (
		<ScrollView>
			<SelectSymbol
				symbol={symbol}
				onSymbolChange={(event) => onSymbolChange(event)}
			/>
			<SymbolChart symbol={symbol} />
			<WalletSummary symbol={symbol} />
		</ScrollView>
	);
}

export default Dashboard;
