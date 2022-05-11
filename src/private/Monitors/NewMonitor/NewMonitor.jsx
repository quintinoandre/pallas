import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { useTheme, Tab, Button } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import { HeaderRow } from '../../../components';
import { ENUM_MONITOR_TYPE, ENUM_MONITOR_INTERVAL } from '../../../enums';
import { saveMonitor } from '../../../services';
import { GeneralArea } from './General/GeneralArea';
import { IndexesArea } from './Indexes/IndexesArea';
import { styles } from './styles';

/**
 * props:
 * - navigation
 * - route
 */
function NewMonitor({ ...props }) {
	const { theme } = useTheme();

	const DEFAULT_MONITOR = {
		type: ENUM_MONITOR_TYPE.CANDLES,
		symbol: 'BTCUSDT',
		interval: ENUM_MONITOR_INTERVAL.oneMinute,
		isActive: false,
		logs: false,
	};

	const [monitor, setMonitor] = useState(DEFAULT_MONITOR);
	const [errorState, setErrorState] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [tabIndex, setTabIndex] = useState(0);

	function errorHandling(error) {
		setErrorState(error.response ? error.response.data : error.message);
	}

	useEffect(() => {
		setErrorState('');

		if (props.route.params.monitor)
			setMonitor({ ...props.route.params.monitor });
		else setMonitor({ ...DEFAULT_MONITOR });
	}, [props.route.params]);

	function onPress() {
		setErrorState('');

		setIsLoading(true);

		saveMonitor(monitor.id, monitor)
			.then((result) => {
				setIsLoading(false);

				props.navigation.navigate('Monitors', {
					screen: 'MonitorsList',
					params: { monitor: result },
				});
			})
			.catch((error) => {
				setIsLoading(false);

				errorHandling(error);
			});
	}

	function onIndexChange(indexes) {
		if (indexes && indexes.length > 0) {
			const str = indexes
				.map(
					(index) =>
						`${index.key}${
							index.params ? `_${index.params.replace(/,/gi, '_')}` : ''
						}`
				)
				.join(',');

			if (monitor.indexes !== str) setMonitor({ ...monitor, indexes: str });
		} else setMonitor({ ...monitor, indexes: '' });
	}

	return (
		<View style={theme.page}>
			<View style={styles.header}>
				<HeaderRow
					symbol={monitor.symbol}
					onBackPress={() =>
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
					icon={
						<Icon
							name="bar-chart-2"
							size={20}
							color={
								monitor.type === ENUM_MONITOR_TYPE.TICKER ? '#ccc' : 'black'
							}
						/>
					}
					style={styles.tab}
					buttonStyle={styles.tabButton}
					disabled={monitor.type === ENUM_MONITOR_TYPE.TICKER}
					disabledStyle={styles.tabButton}
				/>
			</Tab>

			{tabIndex === 0 ? (
				<GeneralArea
					monitor={monitor}
					onChange={({ name, value }) =>
						setMonitor({ ...monitor, [name]: value })
					}
				/>
			) : (
				<IndexesArea
					indexes={monitor.indexes}
					onChange={(event) => onIndexChange(event)}
				/>
			)}

			<View style={styles.button}>
				<Button
					icon={() => <Icon name="save" size={20} color="white" />}
					title={isLoading ? <ActivityIndicator /> : ' Save Monitor'}
					onPress={onPress}
					disabled={isLoading}
				/>
				{errorState ? (
					<Text style={{ ...styles.error, ...theme.alert }}>{errorState}</Text>
				) : (
					<></>
				)}
			</View>
		</View>
	);
}

export { NewMonitor };
