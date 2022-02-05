import React from 'react';
import { Text } from 'react-native';

/**
 * props:
 * - order
 * - onPress
 */
function OrderItem({ ...props }) {
	return (
		<Text>
			{props.order.side} {props.order.symbol}
		</Text>
	);
}

export default OrderItem;
