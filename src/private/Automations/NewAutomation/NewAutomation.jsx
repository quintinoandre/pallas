import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useTheme, Tab, Button } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import { HeaderRow } from '../../../components';
import { saveAutomation } from '../../../services/AutomationsService';
import ActionsArea from './Actions/ActionsArea';
import ConditionsArea from './Conditions/ConditionsArea';
import GeneralArea from './GeneralArea';

const styles = StyleSheet.create({
	header: { flex: 0, height: 40, backgroundColor: '#ccc' },
	tabButton: { backgroundColor: '#ccc' },
	tab: { backgroundColor: '#ccc', paddingBottom: 6 },
	button: { margin: 10, marginTop: 0, paddingHorizontal: 10 },
});

/**
 * props:
 * - navigation
 * - route
 */
function NewAutomation({ ...props }) {
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

	const [automation, setAutomation] = useState(DEFAULT_AUTOMATION);
	const [tabIndex, setTabIndex] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	function errorHandling(err) {
		setError(err.response ? err.response.data : err.message);
	}

	useEffect(() => {
		if (props.route.params.automation)
			setAutomation(props.route.params.automation);
		else setAutomation({ ...DEFAULT_AUTOMATION });

		setError('');
	}, [props.route.params]);

	function onPress(_event) {
		setError('');

		if (!automation.actions || automation.actions.length < 1)
			return setError('You need to have at least one action!');

		if (!automation.conditions && !automation.schedule)
			return setError('You need to have at least one condition!');

		const indexes = automation.conditions
			.split(' && ')
			.map((condition) => condition.split("'"))
			.flat()
			.filter((condition) => condition.indexOf(':') !== -1);

		automation.indexes = [...new Set(indexes)].join(',');

		setIsLoading(true);

		saveAutomation(automation.id, automation)
			.then((result) => {
				setIsLoading(false);

				props.navigation.navigate('Automations', {
					screen: 'AutomationsList',
					params: { result },
				});
			})
			.catch((err) => {
				setIsLoading(false);

				errorHandling(err);
			});
	}

	return (
		<View style={theme.page}>
			<View style={styles.header}>
				<HeaderRow
					symbol={automation.symbol}
					onSymbolChange={(event) =>
						setAutomation({ ...DEFAULT_AUTOMATION, symbol: event })
					}
					onBackPress={(_event) => props.navigation.navigate('AutomationsList')}
				/>
			</View>
			<Tab
				indicatorStyle={{ backgroundColor: 'black' }}
				value={tabIndex}
				onChange={(event) => setTabIndex(event)}
			>
				<Tab.Item
					buttonStyle={styles.tabButton}
					style={styles.tab}
					icon={<Icon name="settings" color="black" size={20} />}
				/>
				<Tab.Item
					buttonStyle={styles.tabButton}
					style={styles.tab}
					icon={<Icon name="help-circle" color="black" size={20} />}
				/>
				<Tab.Item
					buttonStyle={styles.tabButton}
					style={styles.tab}
					icon={<Icon name="play-circle" color="black" size={20} />}
				/>
			</Tab>
			{tabIndex === 0 ? (
				<GeneralArea
					automation={automation}
					type={props.route.params.type}
					onChange={(event) =>
						setAutomation({ ...automation, [event.name]: event.value })
					}
				/>
			) : (
				<></>
			)}
			{tabIndex === 1 ? (
				<ConditionsArea
					conditions={automation.conditions}
					symbol={automation.symbol}
					type={props.route.params.type}
					onChange={(event) =>
						setAutomation({ ...automation, conditions: event })
					}
				/>
			) : (
				<></>
			)}
			{tabIndex === 2 ? (
				<ActionsArea
					actions={automation.actions}
					symbol={automation.symbol}
					type={props.route.params.type}
					onChange={(event) => setAutomation({ ...automation, actions: event })}
				/>
			) : (
				<></>
			)}
			<View style={styles.button}>
				<Button
					icon={() => <Icon name="save" size={20} color="white" />}
					title={isLoading ? <ActivityIndicator /> : ' Save Automation'}
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

export default NewAutomation;
