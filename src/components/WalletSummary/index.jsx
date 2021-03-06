import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useTheme } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import { getMemoryIndex, getSymbol } from '../../services';
import { Block } from '../Block';
import { styles } from './styles';

/**
 * props:
 * - symbol
 * - header?
 * - style?
 * - onLoad?
 */
function WalletSummary({ ...props }) {
	const { theme } = useTheme();

	const [baseSate, setBaseState] = useState({});
	const [quoteState, setQuoteState] = useState({});

	async function loadWallet(symbol) {
		const symbolObj = await getSymbol(symbol);

		const base = await getMemoryIndex(symbolObj.base, 'WALLET');

		setBaseState({ coin: symbolObj.base, qty: base });

		const quote = await getMemoryIndex(symbolObj.quote, 'WALLET');

		setQuoteState({ coin: symbolObj.quote, qty: quote });

		if (props.onLoad)
			props.onLoad({ ...symbolObj, baseQty: base, quoteQty: quote });
	}

	useEffect(() => {
		if (!props.symbol) return;

		loadWallet(props.symbol);
	}, [props.symbol]);

	function getCoin(coinObj) {
		if (coinObj.qty) return `${coinObj.coin}: ${coinObj.qty}`.substring(0, 15);

		return <ActivityIndicator />;
	}

	return (
		<View style={{ ...styles.container, ...props.style }}>
			{props.header ? (
				<Text style={theme.h2}>
					<Icon name="dollar-sign" size={20} color="black" />
					You have
					<Icon name="dollar-sign" size={20} color="black" />
				</Text>
			) : (
				<></>
			)}
			<View style={styles.row}>
				<Block color={theme.colors.info}>
					<Text style={styles.coin}>{getCoin(baseSate)}</Text>
				</Block>
				<Block color={theme.colors.info}>
					<Text style={styles.coin}>{getCoin(quoteState)}</Text>
				</Block>
			</View>
		</View>
	);
}

export { WalletSummary };
