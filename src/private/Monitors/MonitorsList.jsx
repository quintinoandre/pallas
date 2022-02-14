import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { FAB } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import { getMonitors } from '../../services/MonitorsService';
import MonitorItem from './MonitorItem';

const styles = StyleSheet.create({
	emptyList: { flex: 1, alignItems: 'center', marginTop: 10 },
});

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

	function errorHandling(err) {
		console.error(err.response ? err.response.data : err.message);
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
			.catch((err) => {
				setIsLoading(false);

				errorHandling(err);
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
				onEndReached={(_event) => setCanLoadMore(true)}
				onEndReachedThreshold={0.3}
				refreshing={isLoading}
				onRefresh={(_event) => setRefresh(Date.now())}
				onMomentumScrollEnd={(_event) => canLoadMore && onEndReached()}
				ListEmptyComponent={() => emptyList}
				renderItem={(obj) => (
					<MonitorItem
						monitor={obj.item}
						onPress={(_event) => viewForm(obj.item)}
						onRefresh={(_event) => setRefresh(Date.now())}
					/>
				)}
				keyExtractor={(obj) => obj.id}
			/>
			<FAB
				title={<Icon name="plus" size={20} color="white" />}
				placement="right"
				onPress={(_event) =>
					props.navigation.navigate('Monitors', {
						screen: 'NewMonitor',
						params: {},
					})
				}
			/>
		</>
	);
}

export default MonitorsList;
