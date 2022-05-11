import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { Tab, Button, useTheme } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import { HeaderRow, CurrentPrice, WalletSummary } from '../../../components';
import { AUTOMATION_TYPE, INDEX_TYPE } from '../../../enums';
import { saveGrid } from '../../../services';
import { GeneralArea } from './GeneralArea';
import { GridArea } from './GridArea';
import { NewGridStyles as styles } from './styles';

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
	const [errorState, setErrorState] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [tabIndex, setTabIndex] = useState(0);

	function errorHandling(error) {
		setErrorState(error.response ? error.response.data : error.message);
	}

	useEffect(() => {
		setErrorState('');

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

	function onPress() {
		setErrorState('');

		automation.name = `${AUTOMATION_TYPE.GRID.toUpperCase()} ${
			automation.symbol
		} #${gridState.levels}`;

		automation.actions = [{ type: `${AUTOMATION_TYPE.GRID.toUpperCase()}` }];

		automation.indexes = `${automation.symbol}:${INDEX_TYPE.BOOK}`;

		automation.conditions = `MEMORY['${automation.symbol}:${INDEX_TYPE.BOOK}'].current.bestAsk>${gridState.lowerLimit} && MEMORY['${automation.symbol}:${INDEX_TYPE.BOOK}'].current.bestBid<${gridState.upperLimit}`;

		setIsLoading(true);

		saveGrid(automation.id, automation, gridState.levels, gridState.quantity)
			.then((result) => {
				setIsLoading(false);

				props.navigation.navigate('Automations', {
					screen: 'AutomationsList',
					params: { result },
				});
			})
			.catch((error) => {
				errorHandling(error);

				setIsLoading(false);
			});
	}

	return (
		<View style={theme.page}>
			<View style={styles.header}>
				<HeaderRow
					symbol={automation.symbol}
					onBackPress={() =>
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
					style={styles.walletSummary}
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
					icon={
						<Icon
							name="align-justify"
							size={20}
							color={!automation.id ? '#ccc' : 'black'}
						/>
					}
					style={styles.tab}
					buttonStyle={styles.tabButton}
					disabled={!automation.id}
					disabledStyle={styles.tabButton}
				/>
			</Tab>
			{tabIndex === 0 ? (
				<GeneralArea
					automation={automation}
					grid={gridState}
					onAutomationChange={({ name, value }) =>
						setAutomation({ ...automation, [name]: value })
					}
					onGridChange={({ name, value }) =>
						setGridState({ ...gridState, [name]: value })
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
					onPress={onPress}
					disabled={isLoading}
				/>
				{errorState ? (
					<Text style={{ ...theme.alert, marginHorizontal: 0 }}>
						{errorState}
					</Text>
				) : (
					<></>
				)}
			</View>
		</View>
	);
}

export { NewGrid };
