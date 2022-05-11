import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import { getAutomations } from '../../services';
import { AutomationItem } from './AutomationItem';
import { NewAutomationButton } from './NewAutomationButton';
import { AutomationsListStyles as styles } from './styles';

const PAGE_SIZE = 10;

/**
 * props:
 * - navigation
 * - route
 */
function AutomationsList({ ...props }) {
	const [automations, setAutomations] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [pageState, setPageState] = useState(1);
	const [canLoadMore, setCanLoadMore] = useState(false);
	const [refresh, setRefresh] = useState(0);

	function errorHandling(error) {
		console.error(error.response ? error.response.data : error.message);
	}

	function loadAutomations(page) {
		getAutomations(page)
			.then((result) => {
				setIsLoading(false);

				if (page === 1) setAutomations(result || []);
				else {
					automations.push(...result);

					setAutomations(automations);
				}
			})
			.catch((error) => {
				setIsLoading(false);

				errorHandling(error);
			});
	}

	useEffect(() => {
		if (pageState <= 1) return;

		loadAutomations(pageState);
	}, [pageState]);

	useEffect(() => {
		setIsLoading(true);

		setPageState(1);

		loadAutomations(1);
	}, [props.route.params, refresh]);

	const emptyList = (
		<View style={styles.emptyList}>
			<Text>There are no automations. Create one first.</Text>
		</View>
	);

	function onEndReached() {
		if (!automations || automations.length % PAGE_SIZE !== 0) return;

		setPageState(pageState + 1);

		setCanLoadMore(false);
	}

	function viewDetails(automation) {
		if (automation.grids && automation.grids.length > 0)
			props.navigation.navigate('Automations', {
				screen: 'NewGrid',
				params: { automation },
			});
		else
			props.navigation.navigate('Automations', {
				screen: 'NewAutomation',
				params: { automation },
			});
	}

	return (
		<>
			<FlatList
				data={automations}
				initialNumToRender={PAGE_SIZE}
				refreshing={isLoading}
				ListEmptyComponent={emptyList}
				onRefresh={() => setRefresh(Date.now())}
				onEndReached={() => setCanLoadMore(true)}
				onEndReachedThreshold={0.3}
				onMomentumScrollEnd={canLoadMore && onEndReached}
				renderItem={(obj) => (
					<AutomationItem
						automation={obj.item}
						onPress={() => viewDetails(obj.item)}
						onRefresh={() => setRefresh(Date.now())}
					/>
				)}
				keyExtractor={(automation) => automation.id}
			/>
			<NewAutomationButton navigation={props.navigation} />
		</>
	);
}

export { AutomationsList };
