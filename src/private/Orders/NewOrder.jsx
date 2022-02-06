import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import { SelectSymbol } from '../../components';
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

	useEffect(() => {
		setOrder({
			...DEFAULT_ORDER,
			symbol: props.route.params.symbol || 'BTCUSDT',
		});

		setError('');
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
					<SelectSymbol
						symbol={order.symbol}
						onSymbolChange={(event) =>
							setOrder({ ...DEFAULT_ORDER, symbol: event })
						}
					/>
				</View>
			</View>
		</View>
	);
}

export default NewOrder;
