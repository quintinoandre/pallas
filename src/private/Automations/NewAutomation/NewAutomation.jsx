import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme, Tab } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import { HeaderRow } from '../../../components';
import ActionsArea from './Actions/ActionsArea';
import ConditionsArea from './Conditions/ConditionsArea';
import GeneralArea from './GeneralArea';

const styles = StyleSheet.create({
	header: { flex: 0, height: 40, backgroundColor: '#ccc' },
	tabButton: { backgroundColor: '#ccc' },
	tab: { backgroundColor: '#ccc', paddingBottom: 6 },
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
			{tabIndex === 1 ? <ConditionsArea /> : <></>}
			{tabIndex === 2 ? <ActionsArea /> : <></>}
		</View>
	);
}

export default NewAutomation;
