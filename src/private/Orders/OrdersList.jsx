import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';

import { NewOrderButton, SelectSymbol } from '../../components';
import { getOrders } from '../../services/OrdersService';
import OrderItem from './OrderItem';

const PAGE_SIZE = 10;

const styles = StyleSheet.create({
	emptyList: { flex: 1, alignItems: 'center', marginTop: 10 },
});

/**
 * props:
 * - navigation?
 * - route?
 */
function OrdersList({ ...props }) {
	const [symbolState, setSymbolState] = useState('BTCUSDT');
	const [orders, setOrders] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [pageState, setPageState] = useState(1);

	function loadOrders(symbol, page) {
		getOrders(symbol, page)
			.then((result) => {
				setIsLoading(false);

				setOrders(result || []);
			})
			.catch((err) => {
				setIsLoading(false);

				console.error(err);
			});
	}

	useEffect(() => {
		setIsLoading(true);

		setPageState(1);

		loadOrders(symbolState, 1);
	}, [symbolState]);

	useEffect(() => {
		setSymbolState(props.route.params ? props.route.params.symbol : 'BTCUSDT');
	}, [props.route.params]);

	const emptyList = (
		<View style={styles.emptyList}>
			<Text>There are no orders for this symbol.</Text>
		</View>
	);

	return (
		<>
			<SelectSymbol
				symbol={symbolState}
				onSymbolChange={(event) => setSymbolState(event)}
			/>
			<FlatList
				data={orders}
				initialNumToRender={PAGE_SIZE}
				refreshing={isLoading}
				ListEmptyComponent={emptyList}
				renderItem={(obj) => <OrderItem order={obj.item} />}
				keyExtractor={(order) => order.id}
			/>
			<NewOrderButton navigation={props.navigation} symbol="" />
		</>
	);
}

export default OrdersList;
