import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { FAB } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import { getMonitors } from '../../services';
import { MonitorItem } from './MonitorItem';
import { MonitorsListStyles as styles } from './styles';

/**
 * props:
 * - navigation
 * - route
 */
function MonitorsList({ ...props }) {
	const PAGE_SIZE = 10;

	const [monitors, setMonitors] = useState([]);
	const [canLoadMore, setCanLoadMore] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [refresh, setRefresh] = useState(0);
	const [pageState, setPageState] = useState(1);

	function errorHandling(error) {
		console.error(error.response ? error.response.data : error.message);
	}

	function LoadMonitors(page) {
		getMonitors(page)
			.then((result) => {
				setIsLoading(false);

				if (page === 1) setMonitors(result || []);
				else {
					monitors.push(...result);

					setMonitors(monitors);
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

		LoadMonitors(1);
	}, [props.route.params, refresh]);

	useEffect(() => {
		if (pageState <= 1) return;

		LoadMonitors(pageState || 1);
	}, [pageState]);

	function onEndReached() {
		if (!monitors || monitors.length % PAGE_SIZE !== 0) return;

		setPageState(pageState + 1);

		setCanLoadMore(false);
	}

	const emptyList = (
		<View style={styles.emptyList}>
			<Text>There are no monitors. Create one first.</Text>
		</View>
	);

	function viewForm(monitor) {
		props.navigation.navigate('Monitors', {
			screen: 'NewMonitor',
			params: { monitor },
		});
	}

	return (
		<>
			<FlatList
				data={monitors}
				initialNumToRender={PAGE_SIZE}
				onEndReached={() => setCanLoadMore(true)}
				onEndReachedThreshold={0.3}
				refreshing={isLoading}
				onRefresh={() => setRefresh(Date.now())}
				onMomentumScrollEnd={canLoadMore && onEndReached}
				ListEmptyComponent={emptyList}
				renderItem={(obj) => (
					<MonitorItem
						monitor={obj.item}
						onPress={() => viewForm(obj.item)}
						onRefresh={() => setRefresh(Date.now())}
					/>
				)}
				keyExtractor={(obj) => obj.id}
			/>
			<FAB
				title={<Icon name="plus" size={20} color="white" />}
				placement="right"
				onPress={() =>
					props.navigation.navigate('Monitors', {
						screen: 'NewMonitor',
						params: {},
					})
				}
			/>
		</>
	);
}

export { MonitorsList };
