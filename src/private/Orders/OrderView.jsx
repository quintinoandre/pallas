import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import { Block } from '../../components';
import { getOrder } from '../../services/OrdersService';
import { getColorByStatus } from '../../Utils';

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		flex: 0,
		height: 60,
		backgroundColor: '#ccc',
	},
	p: {
		marginTop: 10,
		paddingRight: 10,
		flexDirection: 'row',
		flex: 0,
		height: 30,
	},
	status: { color: 'white', marginLeft: 10, fontSize: 10 },
	row: { flexDirection: 'row' },
});

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
		<View style={theme.page}>
			<View style={styles.header}>
				<Icon.Button
					name="chevron-left"
					size={24}
					color="black"
					backgroundColor="transparent"
					style={{ marginTop: 10 }}
					onPress={(_event) =>
						props.navigation.navigate('OrdersList', { symbol: order.symbol })
					}
				/>
				<View style={styles.p}>
					<Text style={{ ...theme.h2, marginRight: 20 }}>
						{order.symbol} #{order.id}
					</Text>
					<Block
						color={getColorByStatus(order.status, theme)}
						style={{ flex: 0 }}
					>
						<View style={styles.row}>
							{order.automationId ? (
								<Icon name="command" size={16} color="white" />
							) : (
								<Icon name="user" size={16} color="white" />
							)}
							<Text style={styles.status}>{order.status}</Text>
						</View>
					</Block>
				</View>
			</View>
			<View style={theme.container}>
				<View style={theme.inputContainer}>
					<ScrollView />
				</View>
			</View>
		</View>
	);
}

export default OrderView;
