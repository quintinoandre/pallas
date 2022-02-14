import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import { useTheme, Tab, Button } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import { HeaderRow } from '../../../components';
import {
	monitorType,
	monitorInterval,
} from '../../../services/MonitorsService';
import GeneralArea from './General/GeneralArea';
import IndexesArea from './Indexes/IndexesArea';

const styles = StyleSheet.create({
	header: { flex: 0, height: 40, backgroundColor: '#ccc' },
	tabButton: { backgroundColor: '#ccc' },
	tab: { paddingBottom: 6, backgroundColor: '#ccc' },
	button: { margin: 10, marginTop: 0, paddingHorizontal: 10 },
});

/**
 * props:
 * - navigation
 * - route
 */
function NewMonitor({ ...props }) {
	const { theme } = useTheme();

	const DEFAULT_MONITOR = {
		type: monitorType.CANDLES,
		symbol: 'BTCUSDT',
		interval: monitorInterval.oneMinute,
		isActive: false,
		logs: false,
	};

	const [monitor, setMonitor] = useState(DEFAULT_MONITOR);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [tabIndex, setTabIndex] = useState(0);

	useEffect(() => {
		setError('');

		if (props.route.params.monitor)
			setMonitor({ ...props.route.params.monitor });
		else setMonitor({ ...DEFAULT_MONITOR });
	}, [props.route.params]);

	function onPress(event) {
		alert('save monitor');
	}

	return (
		<View style={theme.page}>
			<View style={styles.header}>
				<HeaderRow
					symbol={monitor.symbol}
					onBackPress={(_event) =>
						props.navigation.navigate('Monitors', { screen: 'MonitorsList' })
					}
					onSymbolChange={(event) => setMonitor({ ...monitor, symbol: event })}
				/>
			</View>
			<Tab
				value={tabIndex}
				indicatorStyle={{ backgroundColor: 'black' }}
				onChange={(event) => setTabIndex(event)}
			>
				<Tab.Item
					icon={<Icon name="settings" size={20} color="black" />}
					style={styles.tab}
					buttonStyle={styles.tabButton}
				/>
				<Tab.Item
					icon={<Icon name="bar-chart-2" size={20} color="black" />}
					style={styles.tab}
					buttonStyle={styles.tabButton}
				/>
			</Tab>

			{tabIndex === 0 ? (
				<GeneralArea
					monitor={monitor}
					onChange={(event) =>
						setMonitor({ ...monitor, [event.name]: event.value })
					}
				/>
			) : (
				<IndexesArea monitor={monitor.indexes} />
			)}

			<View style={styles.button}>
				<Button
					icon={() => <Icon name="save" size={20} color="white" />}
					title={isLoading ? <ActivityIndicator /> : ' Save Monitor'}
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

export default NewMonitor;
