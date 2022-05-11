import React, { useState, useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';

import { NewOrderButton, SelectSymbol } from '../../components';
import { getOrders } from '../../services';
import { OrderItem } from './OrderItem';
import { OrdersListStyles as styles } from './styles';

const PAGE_SIZE = 10;

/**
 * props:
 * - navigation
 * - route
 */
function OrdersList({ ...props }) {
	const [symbolState, setSymbolState] = useState('BTCUSDT');
	const [orders, setOrders] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [pageState, setPageState] = useState(1);
	const [canLoadMore, setCanLoadMore] = useState(false);
	const [refresh, setRefresh] = useState(0);

	function errorHandling(error) {
		console.error(error.response ? error.response.data : error.message);
	}

	function loadOrders(symbol, page) {
		getOrders(symbol, page)
			.then((result) => {
				setIsLoading(false);

				if (page === 1) setOrders(result || []);
				else {
					orders.push(...result);

					setOrders(orders);
				}
			})
			.catch((error) => {
				setIsLoading(false);

				errorHandling(error);
			});
	}

	useEffect(() => {
		setIsLoading(true);

		setPageState(1);

		loadOrders(symbolState, 1);
	}, [symbolState]);

	useEffect(() => {
		if (pageState <= 1) return;

		loadOrders(symbolState, pageState);
	}, [pageState]);

	useEffect(() => {
		if (props.route.params && props.route.params.symbol === symbolState) {
			setIsLoading(true);

			loadOrders(symbolState, 1);
		} else
			setSymbolState(
				props.route.params ? props.route.params.symbol : 'BTCUSDT'
			);
	}, [props.route.params, refresh]);

	const emptyList = (
		<View style={styles.emptyList}>
			<Text>There are no orders for this symbol.</Text>
		</View>
	);

	function onEndReached() {
		if (!orders || orders.length % PAGE_SIZE !== 0) return;

		setPageState(pageState + 1);

		setCanLoadMore(false);
	}

	function viewDetails(order) {
		props.navigation.navigate('OrderView', { order });
	}

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
				onRefresh={() => setRefresh(Date.now())}
				onEndReached={() => setCanLoadMore(true)}
				onEndReachedThreshold={0.3}
				onMomentumScrollEnd={canLoadMore && onEndReached}
				renderItem={(obj) => (
					<OrderItem order={obj.item} onPress={() => viewDetails(obj.item)} />
				)}
				keyExtractor={(order) => order.id}
			/>
			<NewOrderButton navigation={props.navigation} symbol="" />
		</>
	);
}

export { OrdersList };
