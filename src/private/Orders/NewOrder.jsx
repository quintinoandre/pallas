import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { useTheme, Input } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import {
	SelectSymbol,
	CurrentPrice,
	WalletSummary,
	SelectSide,
	SelectType,
} from '../../components';
import { orderSide, orderType } from '../../services/OrdersService';

const styles = StyleSheet.create({
	header: { flex: 0, height: 130, backgroundColor: '#ccc' },
	row: { flex: 1, flexDirection: 'row', alignItems: 'center' },
	totalView: { marginLeft: 12, paddingBottom: 10 },
	totalTitle: { fontWeight: 'bold', fontSize: 16, color: 'grey' },
	total: { marginTop: 10, fontSize: 18 },
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

	function getTotal() {
		const quantity = parseFloat(order.quantity.replace(',', '.'));

		if (order.type === orderType.MARKET && quantity && price)
			return `${quantity * price}`.substring(0, 10);

		const limitPrice = parseFloat(order.limitPrice.replace(',', '.'));

		if (order.type.indexOf('LIMIT') !== -1 && quantity && limitPrice)
			return `${quantity * limitPrice}`.substring(0, 10);

		const callbackRate = parseFloat(
			order.stopPriceMultiplier.replace(',', '.')
		);

		if (
			order.type === orderType.TRAILING_STOP &&
			callbackRate &&
			quantity &&
			limitPrice
		) {
			const percentage = callbackRate / 100;

			const multipler =
				order.side === orderSide.BUY ? 1 + percentage : 1 - percentage;

			return `${quantity * limitPrice * multipler}`.substring(0, 10);
		}

		return '0';
	}

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
						<SelectType
							type={order.type}
							onChange={(event) => setOrder({ ...order, type: event })}
						/>
						{order.type.indexOf('LIMIT') !== -1 ? (
							<Input
								label="Limit Price"
								keyboardType="decimal-pad"
								onChangeText={(event) =>
									setOrder({ ...order, limitPrice: event.replace(',', '.') })
								}
								value={order.limitPrice}
							/>
						) : (
							<></>
						)}
						{[orderType.STOP_LOSS_LIMIT, orderType.TAKE_PROFIT_LIMIT].includes(
							order.type
						) ? (
							<Input
								label="Stop Price"
								keyboardType="decimal-pad"
								onChangeText={(event) =>
									setOrder({ ...order, stopPrice: event.replace(',', '.') })
								}
								value={order.stopPrice}
							/>
						) : (
							<></>
						)}
						{order.type === orderType.TRAILING_STOP ? (
							<>
								<Input
									label="Activation Price"
									keyboardType="decimal-pad"
									onChangeText={(event) =>
										setOrder({ ...order, limitPrice: event.replace(',', '.') })
									}
									value={order.limitPrice}
								/>
								<Input
									label="Callback Rate"
									keyboardType="decimal-pad"
									onChangeText={(event) =>
										setOrder({
											...order,
											stopPriceMultiplier: event.replace(',', '.'),
										})
									}
									value={order.stopPriceMultiplier}
								/>
							</>
						) : (
							<></>
						)}
						<Input
							label="Quantity"
							keyboardType="decimal-pad"
							onChangeText={(event) =>
								setOrder({ ...order, quantity: event.replace(',', '.') })
							}
							value={order.quantity}
						/>
						<View style={styles.totalView}>
							<Text style={styles.totalTitle}>Total Price</Text>
							<Text style={styles.total}>{getTotal()}</Text>
						</View>
					</ScrollView>
				</View>
			</View>
		</View>
	);
}

export default NewOrder;
