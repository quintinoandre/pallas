import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import Block from '../Block/Block';

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

	useEffect(() => {
		// TODO: carregar o symbol do backend
		// TODO: carregar saldo do base
		// TODO: carregar saldo do quote
		// TODO: guardar nos states
	}, [props.symbol]);

	return (
		<View style={{ alignItems: 'center' }}>
			<Text style={theme.h2}>
				<Icon name="dollar-sign" size={20} color="black" />
				You have
				<Icon name="dollar-sign" size={20} color="black" />
			</Text>
			<View style={styles.row}>
				<Block color={theme.colors.info}>
					<Text style={styles.asset}>BTC: 1</Text>
				</Block>
				<Block color={theme.colors.info}>
					<Text style={styles.asset}>USDT: 1000</Text>
				</Block>
			</View>
		</View>
	);
}

export default WalletSummary;
