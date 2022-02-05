import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme, ListItem, Avatar } from 'react-native-elements';

import { orderStatus } from '../../services/OrdersService';

import 'intl';
import 'intl/locale-data/jsonp/pt-PT';

const styles = StyleSheet.create({
	subtitleView: { marginTop: 5, flexDirection: 'row' },
	subtitle: { color: 'gray', fontSize: 10 },
});

/**
 * props:
 * - order
 * - onPress
 */
function OrderItem({ ...props }) {
	const { theme } = useTheme();

	function getStatus(status) {
		switch (status) {
			case orderStatus.REJECTED:
			case orderStatus.CANCELED:
			case orderStatus.EXPIRED:
				return theme.colors.danger;
			case orderStatus.FILLED:
				return theme.colors.success;
			case orderStatus.PARTIALLY_FILLED:
				return theme.colors.info;
			default:
				return theme.colors.warning;
		}
	}

	function getTitle(order) {
		return `${order.symbol} ${order.quantity.substring(0, 10)}`;
	}

	function getDate(order) {
		const date = new Date(order.transactTime);

		const frm = Intl.DateTimeFormat('en-GB', {
			dateStyle: 'short',
			timeStyle: 'medium',
		}).format(date);

		return (
			<Text style={styles.subtitle}>
				{order.automationId ? 'Auto at ' : 'Manual at '}
				{frm}
			</Text>
		);
	}

	function getPrice(order) {
		if (order.avgPrice <= 0)
			return <Text style={styles.subtitle}> | Status: {order.status}</Text>;

		return (
			<Text style={styles.subtitle}>
				{' '}
				| Price: {order.avgPrice.substring(0, 10)}
			</Text>
		);
	}

	return (
		<ListItem onPress={(event) => props.onPress(event)} bottomDivider>
			<Avatar
				size="small"
				title={props.order.side}
				titleStyle={{ fontSize: 12 }}
				overlayContainerStyle={{
					backgroundColor: getStatus(props.order.status),
				}}
				rounded
			/>
			<ListItem.Content>
				<ListItem.Title>{getTitle(props.order)}</ListItem.Title>
				<View style={styles.subtitleView}>
					{getDate(props.order)}
					{getPrice(props.order)}
				</View>
			</ListItem.Content>
			<ListItem.Chevron />
		</ListItem>
	);
}

export default OrderItem;
