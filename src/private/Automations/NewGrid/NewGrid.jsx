import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useTheme, Tab, Button } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import { HeaderRow, CurrentPrice, WalletSummary } from '../../../components';
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
	const [grid, setGrid] = useState(DEFAULT_GRID);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [tabIndex, setTabIndex] = useState(0);

	useEffect(() => {
		setError('');

		if (props.route.params.automation) {
			setAutomation(props.route.params.automation);

			// TODO: montar a grid
		} else {
			setAutomation({ ...DEFAULT_AUTOMATION });

			setGrid({ ...DEFAULT_GRID });
		}
	}, [props.route.params]);

	function onPress(event) {}

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
					grid={grid}
					onAutomationChange={(event) =>
						setAutomation({ ...automation, [event.name]: event.value })
					}
					onGridChange={(event) =>
						setGrid({ ...grid, [event.name]: event.value })
					}
				/>
			) : (
				<></>
			)}
			{tabIndex === 1 ? <GridArea /> : <></>}

			<Text>{JSON.stringify(grid)}</Text>

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
