import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useTheme } from 'react-native-elements';

import { SwitchInput } from '../../../../components';
import { MONITOR_TYPE, MONITOR_INTERVAL } from '../../../../enums';
import { MonitorInterval } from './MonitorInterval';
import { MonitorType } from './MonitorType';
import { GeneralAreaStyles as styles } from './styles';

/**
 * props:
 * - monitor
 * - onChange
 */
function GeneralArea({ ...props }) {
	const { theme } = useTheme();

	const DEFAULT_MONITOR = {
		type: MONITOR_TYPE.CANDLES,
		symbol: 'BTCUSDT',
		interval: MONITOR_INTERVAL.oneMinute,
		isActive: false,
		logs: false,
	};

	const [monitor, setMonitor] = useState(DEFAULT_MONITOR);

	useEffect(() => {
		setMonitor(props.monitor);
	}, [props.monitor]);

	function onChange(newProp) {
		setMonitor((prevData) => ({ ...prevData, [newProp.name]: newProp.value }));

		props.onChange(newProp);
	}

	return (
		<View style={theme.container}>
			<View style={theme.inputContainer}>
				<ScrollView>
					<MonitorType
						type={monitor.type}
						onChange={(event) => onChange({ name: 'type', value: event })}
					/>
					{monitor.type === MONITOR_TYPE.CANDLES ? (
						<MonitorInterval
							interval={monitor.interval}
							onChange={(event) => onChange({ name: 'interval', value: event })}
						/>
					) : (
						<></>
					)}
					<View style={styles.row}>
						<SwitchInput
							text="Is Active?"
							isChecked={monitor.isActive}
							onChange={(event) => onChange({ name: 'isActive', value: event })}
						/>
						<SwitchInput
							text="Enable Logs?"
							isChecked={monitor.logs}
							onChange={(event) => onChange({ name: 'logs', value: event })}
						/>
					</View>
				</ScrollView>
			</View>
		</View>
	);
}

export { GeneralArea };
