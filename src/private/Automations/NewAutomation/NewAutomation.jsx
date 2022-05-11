import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { Tab, Button, useTheme } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import { HeaderRow } from '../../../components';
import { saveAutomation } from '../../../services';
import { ActionsArea } from './Actions/ActionsArea';
import { ConditionsArea } from './Conditions/ConditionsArea';
import { GeneralArea } from './GeneralArea';
import { NewAutomationStyles as styles } from './styles';

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
	const [errorState, setErrorState] = useState('');

	function errorHandling(error) {
		setErrorState(error.response ? error.response.data : error.message);
	}

	useEffect(() => {
		if (props.route.params.automation)
			setAutomation(props.route.params.automation);
		else setAutomation({ ...DEFAULT_AUTOMATION });

		setErrorState('');
	}, [props.route.params]);

	function onPress() {
		setErrorState('');

		if (!automation.actions || automation.actions.length < 1)
			return setErrorState('You need to have at least one action!');

		if (!automation.conditions && !automation.schedule)
			return setErrorState('You need to have at least one condition!');

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
			.catch((error) => {
				setIsLoading(false);

				errorHandling(error);
			});
	}

	return (
		<View style={{ ...theme.page }}>
			<View style={styles.header}>
				<HeaderRow
					symbol={automation.symbol}
					onSymbolChange={(event) =>
						setAutomation({ ...DEFAULT_AUTOMATION, symbol: event })
					}
					onBackPress={() => props.navigation.navigate('AutomationsList')}
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
					onChange={({ name, value }) =>
						setAutomation({ ...automation, [name]: value })
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

export { NewAutomation };
