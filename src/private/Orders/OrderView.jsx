import React, { useEffect, useState } from 'react';
import {
	Text,
	View,
	StyleSheet,
	ScrollView,
	ActivityIndicator,
} from 'react-native';
import { useTheme, Button } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import { Block } from '../../components';
import {
	getOrder,
	orderStatus,
	syncOrder,
	cancelOrder,
} from '../../services/OrdersService';
import { getColorByOrderStatus, getColorByOrderSide } from '../../Utils';

import 'intl';
import 'intl/locale-data/jsonp/pt-PT';

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		flex: 0,
		height: 60,
		backgroundColor: '#ccc',
		alignItems: 'center',
	},
	p: {
		marginTop: 10,
		paddingRight: 10,
		flexDirection: 'row',
		flex: 0,
		height: 30,
	},
	status: { color: 'white', marginLeft: 10, fontSize: 10 },
	row: { flexDirection: 'row', alignItems: 'center' },
	bold: { fontWeight: 'bold', marginLeft: 10 },
	button: { marginTop: 10 },
});

/**
 * props:
 * - navigation
 * - route
 */
function OrderView({ ...props }) {
	const { theme } = useTheme();

	const [orderState, setOrderState] = useState({});

	function errorHandling(err) {
		console.error(err.response ? err.response.data : err.message);
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
			.catch((err) => {
				errorHandling(err);
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

	function doSyncPress(_event) {
		setOrderState({ ...orderState, isSyncing: true });

		syncOrder(orderState.id)
			.then((result) => {
				setOrderState({ ...result, isSyncing: false });
			})
			.catch((err) => {
				setOrderState({ ...orderState, isSyncing: false });

				errorHandling(err);
			});
	}

	function doCancelPress(_event) {
		setOrderState({ ...orderState, isCanceling: true });

		cancelOrder(orderState.symbol, orderState.orderId)
			.then((_result) => {
				setOrderState({ ...orderState, isCanceling: false });

				props.navigation.navigate('OrdersList', { symbol: orderState.symbol });
			})
			.catch((err) => {
				setOrderState({ ...orderState, isCanceling: false });

				errorHandling(err);
			});
	}

	return (
		<View style={theme.page}>
			<View style={styles.header}>
				<Icon.Button
					name="chevron-left"
					style={{ marginTop: 3 }}
					size={24}
					color="black"
					backgroundColor="transparent"
					onPress={(_event) =>
						props.navigation.navigate('OrdersList', {
							symbol: orderState.symbol,
						})
					}
				/>
				<View style={styles.p}>
					<Text style={{ ...theme.h2, marginRight: 20, marginTop: 3 }}>
						{orderState.symbol} #{orderState.id}
					</Text>
					<Block
						color={getColorByOrderStatus(orderState.status, theme)}
						style={{ flex: 0, marginTop: 0 }}
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
			<ScrollView>
				<View style={theme.container}>
					<View style={theme.inputContainer}>
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
						{orderState.status === orderStatus.FILLED ? (
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
						<View style={styles.button}>
							<Button
								title={
									orderState.isSyncing ? <ActivityIndicator /> : ' Sync Order'
								}
								icon={() =>
									orderState.isSyncing ? null : (
										<Icon name="refresh-cw" size={20} color="white" />
									)
								}
								buttonStyle={{ backgroundColor: theme.colors.primary }}
								onPress={(event) => doSyncPress(event)}
								disabled={
									orderState.avgPrice ||
									orderState.isSyncing ||
									[
										orderStatus.CANCELED,
										orderStatus.REJECTED,
										orderStatus.EXPIRED,
									].includes(orderState.status)
								}
							/>
						</View>
						<View style={styles.button}>
							<Button
								title={
									orderState.isCanceling ? (
										<ActivityIndicator />
									) : (
										' Cancel Order'
									)
								}
								icon={() =>
									orderState.isCanceling ? null : (
										<Icon name="trash-2" size={20} color="white" />
									)
								}
								buttonStyle={{ backgroundColor: theme.colors.danger }}
								onPress={(event) => doCancelPress(event)}
								disabled={
									orderState.status !== orderStatus.NEW ||
									orderState.isCanceling
								}
							/>
						</View>
					</View>
				</View>
			</ScrollView>
		</View>
	);
}

export default OrderView;
