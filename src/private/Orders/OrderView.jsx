import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { useTheme } from 'react-native-elements';

import { getOrder } from '../../services/OrdersService';

/**
 * props:
 * - navigation?
 * - route?
 */
function OrderView({ ...props }) {
	const { theme } = useTheme();

	const [order, setOrder] = useState({});

	useEffect(() => {
		setOrder({ ...props.route.params.order, isSyncing: true });

		getOrder(
			props.route.params.order.orderId,
			props.route.params.order.clientOrderId
		)
			.then((result) => {
				setOrder({ ...result, isSyncing: false });
			})
			.catch((err) => {
				console.error(err);
			});
	}, [props.route.params]);

	return (
		<>
			<Text>Order View</Text>
			<Text>{`Syncing: ${order.isSyncing}`}</Text>
			<Text>{order.id}</Text>
		</>
	);
}

export default OrderView;
