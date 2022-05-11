import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import Picker from 'react-native-picker-select';

import { Feather as Icon } from '@expo/vector-icons';

import { ENUM_MONITOR_INTERVAL } from '../../../../enums';
import {
	MonitorIntervalPickerSelectStyles as pickerSelectStyles,
	MonitorIntervalStyles as styles,
} from './styles';

/**
 * props:
 * - interval
 * - onChange
 */
function MonitorInterval({ ...props }) {
	const [intervalState, setIntervalState] = useState(
		ENUM_MONITOR_INTERVAL.oneMinute
	);

	useEffect(() => {
		setIntervalState(props.interval || ENUM_MONITOR_INTERVAL.oneMinute);
	}, [props.interval]);

	function onChange(interval) {
		setIntervalState(interval);

		props.onChange(interval);
	}

	return (
		<>
			<Text style={styles.label}>Interval</Text>
			<Picker
				Icon={() => <Icon name="chevron-down" size={24} color="black" />}
				style={pickerSelectStyles}
				value={intervalState}
				useNativeAndroidPickerStyle={false}
				items={[
					{ label: '1 minute', value: ENUM_MONITOR_INTERVAL.oneMinute },
					{ label: '3 minutes', value: ENUM_MONITOR_INTERVAL.threeMinutes },
					{ label: '5 minutes', value: ENUM_MONITOR_INTERVAL.fiveMinutes },
					{ label: '15 minutes', value: ENUM_MONITOR_INTERVAL.fifteenMinutes },
					{ label: '30 minutes', value: ENUM_MONITOR_INTERVAL.thirtyMinutes },
					{ label: '1 hour', value: ENUM_MONITOR_INTERVAL.oneHour },
					{ label: '2 hours', value: ENUM_MONITOR_INTERVAL.twoHours },
					{ label: '4 hours', value: ENUM_MONITOR_INTERVAL.fourHours },
					{ label: '8 hours', value: ENUM_MONITOR_INTERVAL.eightHours },
					{ label: '12 hours', value: ENUM_MONITOR_INTERVAL.twelveHours },
					{ label: '1 day', value: ENUM_MONITOR_INTERVAL.oneDay },
					{ label: '3 days', value: ENUM_MONITOR_INTERVAL.threeDays },
					{ label: '1 week', value: ENUM_MONITOR_INTERVAL.oneWeek },
					{ label: '1 month', value: ENUM_MONITOR_INTERVAL.oneMonth },
				]}
				onValueChange={(event) => onChange(event)}
			/>
		</>
	);
}

export { MonitorInterval };
