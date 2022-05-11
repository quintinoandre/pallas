import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { FAB } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import { getOrderTemplates } from '../../services';
import { OrderTemplateItem } from './OrderTemplateItem';
import { OrderTemplatesListStyles as styles } from './styles';

/**
 * props:
 * - navigation
 * - route
 */
function OrderTemplatesList({ ...props }) {
	const PAGE_SIZE = 10;

	const [orderTemplates, setOrderTemplates] = useState([]);
	const [pageState, setPageState] = useState(1);
	const [refresh, setRefresh] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [canLoadMore, setCanLoadMore] = useState(false);

	function errorHandling(error) {
		console.error(error.response ? error.response.data : error.message);
	}

	function loadOrderTemplates(page) {
		getOrderTemplates('', page)
			.then((result) => {
				setIsLoading(false);

				if (page === 1) setOrderTemplates(result.rows || []);
				else {
					orderTemplates.push(...result.rows);

					setOrderTemplates(orderTemplates);
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

		loadOrderTemplates(1);
	}, [props.route.params, refresh]);

	useEffect(() => {
		if (pageState <= 1) return;

		loadOrderTemplates(pageState || 1);
	}, [pageState]);

	function onEndReached() {
		if (!orderTemplates || orderTemplates.length % PAGE_SIZE !== 0) return;

		setPageState(pageState + 1);

		setCanLoadMore(false);
	}

	const emptyList = (
		<View styles={styles.emptyList}>
			<Text>
				There no order templates. Create one clicking on the button below.
			</Text>
		</View>
	);

	function viewForm(orderTemplate) {
		props.navigation.navigate('Order Templates', {
			screen: 'NewOrderTemplate',
			params: { data: orderTemplate },
		});
	}

	function newForm(navigation) {
		return navigation.navigate('Order Templates', {
			screen: 'NewOrderTemplate',
			params: {},
		});
	}

	function getOrderTemplateItem({ item }) {
		return (
			<OrderTemplateItem
				data={item}
				onPress={() => viewForm(item)}
				onRefresh={() => setRefresh(Date.now())}
			/>
		);
	}

	return (
		<>
			<FlatList
				data={orderTemplates}
				initialNumToRender={PAGE_SIZE}
				onEndReached={() => setCanLoadMore(true)}
				onEndReachedThreshold={0.3}
				refreshing={isLoading}
				onRefresh={() => setRefresh(Date.now())}
				onMomentumScrollEnd={canLoadMore && onEndReached}
				ListEmptyComponent={emptyList}
				renderItem={(obj) => getOrderTemplateItem(obj)}
				keyExtractor={(obj) => obj.id}
			/>
			<FAB
				title={<Icon name="plus" size={20} color="white" />}
				placement="right"
				onPress={() => newForm(props.navigation)}
			/>
		</>
	);
}

export { OrderTemplatesList };
