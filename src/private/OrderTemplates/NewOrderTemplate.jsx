import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { Button, Input, useTheme } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import {
	HeaderRow,
	SelectSide,
	SelectType,
	MultiplierInput,
} from '../../components';
import { ENUM_MONITOR_TYPE, ENUM_QUANTITY_TYPE } from '../../enums';
import { ENUM_ORDER_SIDE, ENUM_ORDER_TYPE } from '../../enums/ordersEnums';
import { getMonitorsBySymbol, saveOrderTemplate } from '../../services';
import { NewOrderTemplateStyles as styles } from './styles';

/**
 * props:
 * - navigation
 * - route
 */
function NewOrderTemplate({ ...props }) {
	const { theme } = useTheme();

	const DEFAULT_ORDER_TEMPLATE = {
		symbol: 'BTCUSDT',
		type: ENUM_ORDER_TYPE.MARKET,
		side: ENUM_ORDER_SIDE.BUY,
		name: '',
		quantity: '',
		quantityMultiplier: 1,
		limitPrice: '',
		limitPriceMultiplier: 1,
		stopPrice: '',
		stopPriceMultiplier: 1,
	};

	const DEFAULT_PRICE_OPTIONS = [
		{ label: 'Book Ask Price', value: 'BOOK_ASK' },
		{ label: 'Book Bid Price', value: 'BOOK_BID' },
		{ label: 'Last Order Avg', value: 'LAST_ORDER_AVG' },
		{ label: 'Last Order Limit', value: 'LAST_ORDER_LIMIT' },
		{ label: 'Last Order Stop', value: 'LAST_ORDER_STOP' },
	];

	const [orderTemplate, setOrderTemplate] = useState(DEFAULT_ORDER_TEMPLATE);
	const [errorState, setErrorState] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [priceOptions, setPriceOptions] = useState(DEFAULT_PRICE_OPTIONS);

	function errorHandling(error) {
		setErrorState(error.response ? error.response.data : error.message);
	}

	useEffect(() => {
		setErrorState('');

		if (props.route.params.data) setOrderTemplate(props.route.params.data);
		else setOrderTemplate(DEFAULT_ORDER_TEMPLATE);
	}, [props.route.params]);

	useEffect(() => {
		if (!orderTemplate.symbol) return;

		getMonitorsBySymbol(orderTemplate.symbol)
			.then((monitors) => {
				const intervalOptions =
					monitors
						.filter(
							(monitor) =>
								!monitor.isSystemMon &&
								monitor.isActive &&
								monitor.type === ENUM_MONITOR_TYPE.CANDLES &&
								monitor.interval
						)
						.map((monitor) => {
							return [
								{
									label: `Last Candle ${monitor.interval} Open`,
									value: `LAST_CANDLE_${monitor.interval}_OPEN`,
								},
								{
									label: `Last Candle ${monitor.interval} High`,
									value: `LAST_CANDLE_${monitor.interval}_HIGH`,
								},
								{
									label: `Last Candle ${monitor.interval} Low`,
									value: `LAST_CANDLE_${monitor.interval}_LOW`,
								},
								{
									label: `Last Candle ${monitor.interval} Close`,
									value: `LAST_CANDLE_${monitor.interval}_CLOSE`,
								},
							];
						}) || [];

				setPriceOptions([...DEFAULT_PRICE_OPTIONS, ...intervalOptions.flat()]);
			})
			.catch((error) => errorHandling(error));
	}, [orderTemplate.symbol]);

	function onPress() {
		setErrorState('');

		setIsLoading(true);

		saveOrderTemplate(orderTemplate.id, orderTemplate)
			.then((result) => {
				setIsLoading(false);

				props.navigation.navigate('Order Templates', {
					screen: 'OrderTemplatesList',
					params: { orderTemplate: result },
				});
			})
			.catch((error) => {
				setIsLoading(false);

				errorHandling(error);
			});
	}

	return (
		<View style={theme.page}>
			<View style={styles.header}>
				<HeaderRow
					symbol={orderTemplate.symbol}
					onBackPress={() => props.navigation.navigate('OrderTemplatesList')}
					onSymbolChange={(event) =>
						setOrderTemplate({ ...orderTemplate, symbol: event })
					}
				/>
			</View>
			<View style={theme.container}>
				<View
					style={{ ...styles.scrollViewContainer, ...theme.inputContainer }}
				>
					<ScrollView>
						<Input
							label="Name"
							keyboardType="name-phone-pad"
							value={orderTemplate.name}
							onChangeText={(event) =>
								setOrderTemplate({ ...orderTemplate, name: event })
							}
						/>
						<Text style={styles.label}>Side</Text>
						<SelectSide
							side={orderTemplate.side}
							onChange={(event) =>
								setOrderTemplate({ ...orderTemplate, side: event })
							}
						/>
						<SelectType
							type={orderTemplate.type}
							onChange={(event) =>
								setOrderTemplate({ ...orderTemplate, type: event })
							}
						/>
						{orderTemplate.type.indexOf(ENUM_ORDER_TYPE.LIMIT) !== -1 ? (
							<MultiplierInput
								label="Limit Price"
								value={orderTemplate.limitPrice}
								valueMultiplier={orderTemplate.limitPriceMultiplier}
								options={priceOptions}
								onChange={({ value, valueMultiplier }) =>
									setOrderTemplate({
										...orderTemplate,
										limitPrice: value,
										limitPriceMultiplier: valueMultiplier,
									})
								}
							/>
						) : (
							<></>
						)}
						{[
							ENUM_ORDER_TYPE.STOP_LOSS_LIMIT,
							ENUM_ORDER_TYPE.TAKE_PROFIT_LIMIT,
						].includes(orderTemplate.type) ? (
							<MultiplierInput
								label="Stop Price"
								value={orderTemplate.stopPrice}
								valueMultiplier={orderTemplate.stopPriceMultiplier}
								options={priceOptions}
								onChange={({ value, valueMultiplier }) =>
									setOrderTemplate({
										...orderTemplate,
										stopPrice: value,
										stopPriceMultiplier: valueMultiplier,
									})
								}
							/>
						) : (
							<></>
						)}
						{orderTemplate.type === ENUM_ORDER_TYPE.TRAILING_STOP ? (
							<>
								<MultiplierInput
									label="Activation Price"
									value={orderTemplate.limitPrice}
									valueMultiplier={orderTemplate.limitPriceMultiplier}
									options={priceOptions}
									onChange={({ value, valueMultiplier }) =>
										setOrderTemplate({
											...orderTemplate,
											limitPrice: value,
											limitPriceMultiplier: valueMultiplier,
										})
									}
								/>
								<Input
									label="Callback Rate (%)"
									keyboardType="decimal-pad"
									rightIcon={<Icon name="percent" size={16} color="gray" />}
									value={`${orderTemplate.stopPriceMultiplier}`}
									onChangeText={(event) =>
										setOrderTemplate({
											...orderTemplate,
											stopPriceMultiplier: event.replace(',', '.'),
										})
									}
								/>
							</>
						) : (
							<></>
						)}
						<MultiplierInput
							label="Quantity"
							value={orderTemplate.quantity}
							valueMultiplier={orderTemplate.quantityMultiplier}
							options={[
								{ label: 'Max. Wallet', value: ENUM_QUANTITY_TYPE.MAX_WALLET },
								{
									label: 'Min. Notional',
									value: ENUM_QUANTITY_TYPE.MIN_NOTIONAL,
								},
								{
									label: 'Last Order Qty',
									value: ENUM_QUANTITY_TYPE.LAST_ORDER_QTY,
								},
							]}
							onChange={({ value, valueMultiplier }) =>
								setOrderTemplate({
									...orderTemplate,
									quantity: value,
									quantityMultiplier: valueMultiplier,
								})
							}
						/>
					</ScrollView>
				</View>
			</View>
			<View>
				<Button
					icon={() => <Icon name="save" size={20} color="white" />}
					title={isLoading ? <ActivityIndicator /> : ' Save Order Template'}
					style={styles.button}
					onPress={onPress}
				/>
				{errorState ? (
					<Text style={{ ...styles.error, ...theme.alert }}>{errorState}</Text>
				) : (
					<></>
				)}
			</View>
		</View>
	);
}

export { NewOrderTemplate };
