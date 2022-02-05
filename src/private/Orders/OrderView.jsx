import React from 'react';
import { Text } from 'react-native';

/**
 * props:
 * - navigation?
 * - route?
 */
function OrderView({ ...props }) {
	return (
		<>
			<Text>Order View</Text>
			<Text>{props.route.params.order.id}</Text>
		</>
	);
}

export default OrderView;
