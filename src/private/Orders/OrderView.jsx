import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { useTheme, Button } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import { Block } from '../../components';
import { ENUM_ORDER_STATUS } from '../../enums';
import { getOrder, syncOrder, cancelOrder } from '../../services';
import { getColorByOrderStatus, getColorByOrderSide } from '../../Utils';
import 'intl';
import 'intl/locale-data/jsonp/pt-PT';
import { OrderViewStyles as styles } from './styles';

/**
 * props:
 * - navigation
 * - route
 */
function OrderView({ ...props }) {
	const { theme } = useTheme();

	const [orderState, setOrderState] = useState({});

	function errorHandling(error) {
		console.error(error.response ? error.response.data : error.message);
	}

	useEffect(() => {
		setOrderState({ ...props.route.params.order, isSyncing: true });

		getOrder(
			props.route.params.order.orderId,
			props.route.params.order.clientOrderId
		)
			.then((result) => {
				setOrderState({ ...result, isSyncing: false });
			})
			.catch((error) => {
				errorHandling(error);
			});
	}, [props.route.params]);

	function getDate(order) {
		if (!order.transactTime && !order.updatedAt) return '';

		const date = new Date(order.transactTime || order.updatedAt);

		const frm = Intl.DateTimeFormat('en-GB', {
			dateStyle: 'short',
			timeStyle: 'medium',
		}).format(date);

		return frm;
	}

	function doSyncPress() {
		setOrderState({ ...orderState, isSyncing: true });

		syncOrder(orderState.id)
			.then((result) => {
				setOrderState({ ...result, isSyncing: false });
			})
			.catch((error) => {
				setOrderState({ ...orderState, isSyncing: false });

				errorHandling(error);
			});
	}

	function doCancelPress() {
		setOrderState({ ...orderState, isCanceling: true });

		cancelOrder(orderState.symbol, orderState.orderId)
			.then(() => {
				setOrderState({ ...orderState, isCanceling: false });

				props.navigation.navigate('OrdersList', { symbol: orderState.symbol });
			})
			.catch((error) => {
				setOrderState({ ...orderState, isCanceling: false });

				errorHandling(error);
			});
	}

	return (
		<View style={theme.page}>
			<View style={styles.header}>
				<Icon.Button
					name="chevron-left"
					style={styles.iconChevronLeft}
					size={24}
					color="black"
					underlayColor="#ccc"
					backgroundColor="transparent"
					onPress={() =>
						props.navigation.navigate('OrdersList', {
							symbol: orderState.symbol,
						})
					}
				/>
				<View style={styles.p}>
					<Text style={{ ...styles.text, ...theme.h2 }}>
						{orderState.symbol} #{orderState.id}
					</Text>
					<Block
						color={getColorByOrderStatus(orderState.status, theme)}
						style={styles.block}
					>
						<View style={styles.row}>
							{orderState.automationId ? (
								<Icon name="command" size={16} color="white" />
							) : (
								<Icon name="user" size={16} color="white" />
							)}
							<Text style={styles.status}>{orderState.status}</Text>
						</View>
					</Block>
				</View>
			</View>
			<View style={theme.container}>
				<View style={theme.inputContainer}>
					<ScrollView>
						<View style={styles.p}>
							<Text style={styles.bold}>Binance Order Id: </Text>
							<Text>{orderState.orderId}</Text>
						</View>
						{orderState.automationId ? (
							<View style={styles.p}>
								<Text style={styles.bold}>Automation: </Text>
								<Text>{orderState.automation.name}</Text>
							</View>
						) : (
							<></>
						)}
						<View style={styles.p}>
							<Text style={styles.bold}>Side: </Text>
							<Text
								style={{ color: getColorByOrderSide(orderState.side, theme) }}
							>
								{orderState.side}
							</Text>
							<Text style={styles.bold}>Type: </Text>
							<Text>{orderState.type}</Text>
						</View>
						<View style={styles.p}>
							<Text style={styles.bold}>Quantity: </Text>
							<Text>{orderState.quantity}</Text>
						</View>
						{orderState.limitPrice ? (
							<View style={styles.p}>
								<Text style={styles.bold}>Limit Price: </Text>
								<Text>{orderState.limitPrice}</Text>
							</View>
						) : (
							<></>
						)}
						{orderState.icebergQty ? (
							<View style={styles.p}>
								<Text style={styles.bold}>Iceberg Qty.: </Text>
								<Text>{orderState.icebergQty}</Text>
							</View>
						) : (
							<></>
						)}
						{orderState.stopPrice ? (
							<View style={styles.p}>
								<Text style={styles.bold}>Stop Price: </Text>
								<Text>{orderState.stopPrice}</Text>
							</View>
						) : (
							<></>
						)}
						{orderState.avgPrice ? (
							<View style={styles.p}>
								<Text style={styles.bold}>Avg. Price: </Text>
								<Text>{orderState.avgPrice}</Text>
							</View>
						) : (
							<></>
						)}
						<View style={styles.p}>
							<Text style={styles.bold}>Date: </Text>
							<Text>{getDate(orderState)}</Text>
						</View>
						{orderState.status === ENUM_ORDER_STATUS.FILLED ? (
							<>
								<View style={styles.p}>
									<Text style={styles.bold}>Commission: </Text>
									<Text>{orderState.commission}</Text>
								</View>
								<View style={styles.p}>
									<Text style={styles.bold}>Net: </Text>
									<Text>{orderState.net}</Text>
								</View>
							</>
						) : (
							<></>
						)}
					</ScrollView>
				</View>
			</View>
			<View style={styles.button}>
				<Button
					title={orderState.isSyncing ? <ActivityIndicator /> : ' Sync Order'}
					icon={() =>
						orderState.isSyncing ? null : (
							<Icon name="refresh-cw" size={20} color="white" />
						)
					}
					buttonStyle={{ backgroundColor: theme.colors.primary }}
					onPress={doSyncPress}
					disabled={
						orderState.avgPrice ||
						orderState.isSyncing ||
						[
							ENUM_ORDER_STATUS.CANCELED,
							ENUM_ORDER_STATUS.REJECTED,
							ENUM_ORDER_STATUS.EXPIRED,
						].includes(orderState.status)
					}
				/>
			</View>
			<View style={{ ...styles.button, marginTop: 0 }}>
				<Button
					title={
						orderState.isCanceling ? <ActivityIndicator /> : ' Cancel Order'
					}
					icon={() =>
						orderState.isCanceling ? null : (
							<Icon name="trash-2" size={20} color="white" />
						)
					}
					buttonStyle={{ backgroundColor: theme.colors.danger }}
					onPress={doCancelPress}
					disabled={
						orderState.status !== ENUM_ORDER_STATUS.NEW ||
						orderState.isCanceling
					}
				/>
			</View>
		</View>
	);
}

export { OrderView };
