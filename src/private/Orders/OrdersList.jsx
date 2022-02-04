import React, { useState } from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';

import { NewOrderButton, SelectSymbol } from '../../components';

const styles = StyleSheet.create({
	emptyList: { flex: 1, alignItems: 'center', marginTop: 10 },
});

/**
 * props:
 * - navigation?
 * - route?
 */
function OrdersList({ ...props }) {
	const [symbol, setSymbol] = useState('BTCUSDT');
	const [orders, setOrders] = useState([
		{ id: 1, value: 'test' },
		{ id: 2, value: 'test2' },
	]);
	const [isLoading, setIsLoading] = useState(false);

	const PAGE_SIZE = 10;

	const emptyList = (
		<View style={styles.emptyList}>
			<Text>There are no orders for this symbol.</Text>
		</View>
	);

	return (
		<>
			<SelectSymbol
				symbol={symbol}
				onSymbolChange={(event) => setSymbol(event)}
			/>
			<FlatList
				data={orders}
				initialNumToRender={PAGE_SIZE}
				refreshing={isLoading}
				ListEmptyComponent={emptyList}
				renderItem={(obj) => <Text>{obj.item.value}</Text>}
				keyExtractor={(order) => order.id}
			/>
			<NewOrderButton navigation={props.navigation} symbol="" />
		</>
	);
}

export default OrdersList;
