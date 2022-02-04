import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import { getMemoryIndex } from '../../services/BeholderService';
import { getSymbol } from '../../services/SymbolsService';
import { Block } from '../Block';

const styles = StyleSheet.create({
	row: { flexDirection: 'row', marginTop: 10 },
	asset: { fontWeight: 'bold', color: '#fff', marginStart: 3 },
});

/**
 * props:
 * - symbol
 */
function WalletSummary({ ...props }) {
	const { theme } = useTheme();

	const [baseSate, setBaseState] = useState({});
	const [quoteState, setQuoteState] = useState({});

	async function loadWallet(symbol) {
		const symbolObj = await getSymbol(symbol);

		const base = await getMemoryIndex(symbolObj.base, 'WALLET');

		setBaseState({ asset: symbolObj.base, qty: base });

		const quote = await getMemoryIndex(symbolObj.quote, 'WALLET');

		setQuoteState({ asset: symbolObj.quote, qty: quote });
	}

	useEffect(() => {
		loadWallet(props.symbol);
	}, [props.symbol]);

	function getAsset(coinObj) {
		if (coinObj.qty) return `${coinObj.asset}: ${coinObj.qty}`.substring(0, 15);

		return <ActivityIndicator />;
	}

	return (
		<View style={{ alignItems: 'center' }}>
			<Text style={theme.h2}>
				<Icon name="dollar-sign" size={20} color="black" />
				You have
				<Icon name="dollar-sign" size={20} color="black" />
			</Text>
			<View style={styles.row}>
				<Block color={theme.colors.info}>
					<Text style={styles.asset}>{getAsset(baseSate)}</Text>
				</Block>
				<Block color={theme.colors.info}>
					<Text style={styles.asset}>{getAsset(quoteState)}</Text>
				</Block>
			</View>
		</View>
	);
}

export { WalletSummary };
