import React from 'react';
import { View, Text } from 'react-native';
import { useTheme, ListItem, Avatar } from 'react-native-elements';

import 'intl';
import 'intl/locale-data/jsonp/pt-PT';

import { getColorByOrderStatus } from '../../Utils';
import { OrderItemStyles as styles } from './styles';

/**
 * props:
 * - order
 * - onPress
 */
function OrderItem({ ...props }) {
	const { theme } = useTheme();

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
		<ListItem onPress={props.onPress} bottomDivider>
			<Avatar
				size="small"
				title={props.order.side}
				titleStyle={styles.avatar}
				overlayContainerStyle={{
					backgroundColor: getColorByOrderStatus(props.order.status, theme),
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

export { OrderItem };
