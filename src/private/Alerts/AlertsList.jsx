import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { FAB, useTheme } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import { deleteAllAlerts, getAlerts } from '../../services';
import AlertItem from './AlertItem';
import { AlertsListStyles as styles } from './styles';

/**
 * props:
 * - navigation
 * - route
 */
function AlertsList({ ...props }) {
	const { theme } = useTheme();

	const [alerts, setAlerts] = useState([]);
	const [pageState, setPageState] = useState(1);
	const [refresh, setRefresh] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [canLoadMore, setCanLoadMore] = useState(false);

	const PAGE_SIZE = 10;

	function errorHandling(error) {
		console.error(error);
	}

	function loadAlerts(page) {
		setIsLoading(true);

		getAlerts()
			.then((result) => {
				setIsLoading(false);

				result = result || [];

				if (page === 1) setAlerts(result.slice(0, PAGE_SIZE));
				else {
					result = result.slice(0, page * PAGE_SIZE);

					setAlerts(result);
				}
			})
			.catch((error) => {
				setIsLoading(false);

				errorHandling(error);
			});
	}

	useEffect(() => {
		setPageState(1);

		loadAlerts(1);
	}, [props.route.params, refresh]);

	useEffect(() => {
		if (pageState <= 1) return;

		loadAlerts(pageState || 1);
	}, [pageState]);

	function deleteAll() {
		deleteAllAlerts()
			.then(() => setAlerts([]))
			.catch((error) => errorHandling(error));
	}

	function onEndReached() {
		if (!alerts || alerts.length % PAGE_SIZE !== 0) return;

		setPageState(pageState + 1);

		setCanLoadMore(false);
	}

	const emptyList = (
		<View style={styles.emptyList}>
			<Text>There are no alerts.</Text>
		</View>
	);

	return (
		<>
			<View style={styles.header}>
				<Icon.Button
					name="chevron-left"
					size={24}
					color="black"
					underlayColor="#ccc"
					backgroundColor="transparent"
					onPress={() => props.navigation.goBack()}
				/>
				<Text style={styles.headerTitle}>Notifications</Text>
			</View>
			<FlatList
				data={alerts.reverse()}
				initialNumToRender={PAGE_SIZE}
				onEndReachedThreshold={0.3}
				onEndReached={() => setCanLoadMore(true)}
				refreshing={isLoading}
				onRefresh={() => setRefresh(Date.now())}
				onMomentumScrollEnd={canLoadMore && onEndReached}
				ListEmptyComponent={emptyList}
				renderItem={(obj) => <AlertItem alert={obj.item} />}
				keyExtractor={(obj) => obj.date}
			/>
			<FAB
				title={<Icon name="trash-2" size={20} color="white" />}
				placement="right"
				buttonStyle={{ backgroundColor: theme.colors.danger }}
				onPress={deleteAll}
			/>
		</>
	);
}

export { AlertsList };
