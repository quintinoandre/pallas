import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import {
	SelectSymbol,
	CurrentPrice,
	WalletSummary,
	SelectSide,
} from '../../components';
import { orderSide, orderType } from '../../services/OrdersService';

const styles = StyleSheet.create({
	header: { flex: 0, height: 130, backgroundColor: '#ccc' },
	row: { flex: 1, flexDirection: 'row', alignItems: 'center' },
});

/**
 * props:
 * - navigation
 * - route
 */
function NewOrder({ ...props }) {
	const DEFAULT_ORDER = {
		symbol: '',
		side: orderSide.BUY,
		type: orderType.MARKET,
		quantity: '0',
		limitPrice: '0',
		stopPrice: '0',
		stopPriceMultiplier: '0',
	};

	const { theme } = useTheme();

	const [order, setOrder] = useState(DEFAULT_ORDER);
	const [error, setError] = useState('');
	const [price, setPrice] = useState(0);

	useEffect(() => {
		setOrder({
			...DEFAULT_ORDER,
			symbol: props.route.params.symbol || 'BTCUSDT',
		});

		setError('');

		setPrice(0);
	}, [props.route.params]);

	return (
		<View style={theme.page}>
			<View style={styles.header}>
				<View style={styles.row}>
					<Icon.Button
						name="chevron-left"
						size={24}
						color="black"
						backgroundColor="transparent"
						onPress={(_event) =>
							props.navigation.navigate('OrdersList', {
								symbol: order.symbol,
							})
						}
					/>
					<View style={{ flex: 1, alignItems: 'center' }}>
						<SelectSymbol
							symbol={order.symbol}
							onSymbolChange={(event) =>
								setOrder({ ...DEFAULT_ORDER, symbol: event })
							}
						/>
					</View>
				</View>
				<CurrentPrice
					symbol={order.symbol}
					onChange={(event) => setPrice(event)}
				/>
				<WalletSummary
					symbol={order.symbol}
					style={{ paddingHorizontal: 20, marginBottom: 13 }}
				/>
			</View>
			<View style={theme.container}>
				<View
					style={{
						...theme.inputContainer,
						marginVertical: 10,
						paddingVertical: 10,
					}}
				>
					<ScrollView>
						<SelectSide
							side={order.side}
							onChange={(event) => setOrder({ ...order, side: event })}
						/>
					</ScrollView>
				</View>
			</View>
		</View>
	);
}

export default NewOrder;
