import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import { useTheme, Input, Button } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import {
	SelectSymbol,
	CurrentPrice,
	WalletSummary,
	SelectSide,
	SelectType,
} from '../../components';
import { orderSide, orderType, placeOrder } from '../../services';
import { NewOrderStyles as styles } from './styles';

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
	const [symbol, setSymbol] = useState({});
	const [isLoading, setIsLoading] = useState(false);

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

	function doPlaceOrder(_event) {
		const total = parseFloat(getTotal());

		if (total < symbol.minNotional)
			return setError(`Min. Notional: ${symbol.minNotional}`);

		const quantity = parseFloat(order.quantity);

		if (order.side === orderSide.SELL && symbol.baseQty < quantity)
			return setError(`You haven´t enough ${symbol.base} to sell!`);

		if (order.side === orderSide.BUY && symbol.quoteQty < total)
			return setError(`You haven´t enough ${symbol.quote} to buy!`);

		setIsLoading(true);

		placeOrder(order)
			.then((_result) => {
				setIsLoading(false);

				props.navigation.navigate('OrdersList', { symbol: order.symbol });
			})
			.catch((err) => {
				setIsLoading(false);

				setError(err.response ? err.response.data : err.message);
			});
	}

	return (
		<View style={theme.page}>
			<View style={styles.header}>
				<View style={styles.row}>
					<Icon.Button
						name="chevron-left"
						size={24}
						color="black"
						underlayColor="#ccc"
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
					onLoad={(event) => setSymbol(event)}
				/>
			</View>
			<View style={theme.container}>
				<View style={theme.inputContainer}>
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
									rightIcon={<Icon name="percent" size={16} color="grey" />}
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
			<View style={styles.button}>
				<Button
					title={isLoading ? <ActivityIndicator /> : ' Place Order'}
					icon={() => <Icon name="dollar-sign" size={20} color="white" />}
					onPress={(event) => doPlaceOrder(event)}
				/>
				{error ? (
					<Text style={{ ...theme.alert, marginHorizontal: 0 }}>{error}</Text>
				) : (
					<></>
				)}
			</View>
		</View>
	);
}

export default NewOrder;
