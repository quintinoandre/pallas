import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useTheme, Tab, Button } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import { HeaderRow, CurrentPrice, WalletSummary } from '../../../components';
import {
	automationType,
	indexType,
	saveGrid,
} from '../../../services/AutomationsService';
import GeneralArea from './GeneralArea';
import GridArea from './GridArea';

const styles = StyleSheet.create({
	header: { flex: 0, height: 120, backgroundColor: '#ccc' },
	tabButton: { backgroundColor: '#ccc' },
	tab: { backgroundColor: '#ccc', paddingBottom: 6 },
	button: { margin: 10, marginTop: 0, paddingHorizontal: 10 },
});

/**
 * props:
 * - navigation
 * - route
 */
function NewGrid({ ...props }) {
	const { theme } = useTheme();

	const DEFAULT_AUTOMATION = {
		symbol: 'BTCUSDT',
		name: '',
		actions: [],
		conditions: '',
		schedule: '',
		logs: false,
		isActive: false,
	};

	const DEFAULT_GRID = {
		lowerLimit: '',
		upperLimit: '',
		levels: '',
		quantity: '',
	};

	const [automation, setAutomation] = useState(DEFAULT_AUTOMATION);
	const [gridState, setGridState] = useState(DEFAULT_GRID);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [tabIndex, setTabIndex] = useState(0);

	function errorHandling(err) {
		setError(err.response ? err.response.data : err.message);
	}

	useEffect(() => {
		setError('');

		if (props.route.params.automation) {
			setAutomation(props.route.params.automation);

			const conditionSplit =
				props.route.params.automation.conditions.split(' &&');

			if (!conditionSplit || conditionSplit.length < 2) return;

			const { quantity } = props.route.params.automation.grids[0].orderTemplate;

			const grid = {
				lowerLimit: conditionSplit[0].split('>')[1],
				upperLimit: conditionSplit[1].split('<')[1],
				quantity,
				levels: props.route.params.automation.grids.length + 1,
			};

			setGridState(grid);
		} else {
			setAutomation({ ...DEFAULT_AUTOMATION });

			setGridState({ ...DEFAULT_GRID });
		}
	}, [props.route.params]);

	function onPress(_event) {
		setError('');

		automation.name = `${automationType.GRID.toUpperCase()} ${
			automation.symbol
		} #${gridState.levels}`;

		automation.actions = [{ type: `${automationType.GRID.toUpperCase()}` }];

		automation.indexes = `${automation.symbol}:${indexType.BOOK}`;

		automation.conditions = `MEMORY['${automation.symbol}:${indexType.BOOK}'].current.bestAsk>${gridState.lowerLimit} && MEMORY['${automation.symbol}:${indexType.BOOK}'].current.bestBid<${gridState.upperLimit}`;

		setIsLoading(true);

		saveGrid(automation.id, automation, gridState.levels, gridState.quantity)
			.then((result) => {
				setIsLoading(false);

				props.navigation.navigate('Automations', {
					screen: 'AutomationsList',
					params: { result },
				});
			})
			.catch((err) => {
				errorHandling(err);

				setIsLoading(false);
			});
	}

	return (
		<View style={theme.page}>
			<View style={styles.header}>
				<HeaderRow
					symbol={automation.symbol}
					onBackPress={(_event) =>
						props.navigation.navigate('Automations', {
							screen: 'AutomationsList',
						})
					}
					onSymbolChange={(event) =>
						setAutomation({ ...DEFAULT_AUTOMATION, symbol: event })
					}
				/>
				<CurrentPrice symbol={automation.symbol} />
				<WalletSummary
					symbol={automation.symbol}
					header={false}
					style={{ paddingHorizontal: 20 }}
				/>
			</View>
			<Tab
				value={tabIndex}
				indicatorStyle={{ backgroundColor: 'black' }}
				onChange={(event) => setTabIndex(event)}
			>
				<Tab.Item
					icon={<Icon name="settings" size={20} color="black" />}
					buttonStyle={styles.tabButton}
					style={styles.tab}
				/>
				<Tab.Item
					icon={<Icon name="align-justify" size={20} color="black" />}
					buttonStyle={styles.tabButton}
					style={styles.tab}
				/>
			</Tab>
			{tabIndex === 0 ? (
				<GeneralArea
					automation={automation}
					grid={gridState}
					onAutomationChange={(event) =>
						setAutomation({ ...automation, [event.name]: event.value })
					}
					onGridChange={(event) =>
						setGridState({ ...gridState, [event.name]: event.value })
					}
				/>
			) : (
				<></>
			)}
			{tabIndex === 1 ? <GridArea grids={automation.grids} /> : <></>}
			<View style={styles.button}>
				<Button
					icon={() => <Icon name="save" size={20} color="white" />}
					title={isLoading ? <ActivityIndicator /> : ' Save Grid'}
					onPress={(event) => onPress(event)}
					disabled={isLoading}
				/>
				{error ? (
					<Text style={{ ...theme.alert, marginHorizontal: 0 }}>{error}</Text>
				) : (
					<></>
				)}
			</View>
		</View>
	);
}

export default NewGrid;
