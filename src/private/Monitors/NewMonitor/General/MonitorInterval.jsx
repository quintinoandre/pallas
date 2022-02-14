import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import Picker from 'react-native-picker-select';

import { Feather as Icon } from '@expo/vector-icons';

import { monitorInterval } from '../../../../services/MonitorsService';

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		marginVertical: 15,
		height: 30,
		paddingRight: 5,
		fontSize: 16,
		alignItems: 'stretch',
		fontWeight: 'bold',
		color: 'black',
	},
	inputAndroid: {
		marginVertical: 15,
		height: 30,
		paddingRight: 5,
		fontSize: 16,
		alignItems: 'stretch',
		fontWeight: 'bold',
		color: 'black',
	},
});

const styles = StyleSheet.create({
	label: { color: 'grey', fontWeight: 'bold', fontSize: 16 },
});

/**
 * props:
 * - interval
 * - onChange
 */
function MonitorInterval({ ...props }) {
	const [interval, setInterval] = useState(monitorInterval.oneMinute);

	useEffect(() => {
		setInterval(props.interval || monitorInterval.oneMinute);
	}, [props.interval]);

	function onChange(event) {
		setInterval(event);

		if (props.onChange) props.onChange(event);
	}

	return (
		<>
			<Text style={styles.label}>Type</Text>
			<Picker
				Icon={() => <Icon name="chevron-down" size={24} color="black" />}
				style={{ ...pickerSelectStyles, iconContainer: { top: 10, right: 5 } }}
				value={interval}
				useNativeAndroidPickerStyle={false}
				items={[
					{ label: '1 minute', value: monitorInterval.oneMinute },
					{ label: '3 minutes', value: monitorInterval.threeMinutes },
					{ label: '5 minutes', value: monitorInterval.fiveMinutes },
					{ label: '15 minutes', value: monitorInterval.fifteenMinutes },
					{ label: '30 minutes', value: monitorInterval.thirtyMinutes },
					{ label: '1 hour', value: monitorInterval.oneHour },
					{ label: '2 hours', value: monitorInterval.twoHours },
					{ label: '4 hours', value: monitorInterval.fourHours },
					{ label: '8 hours', value: monitorInterval.eightHours },
					{ label: '12 hours', value: monitorInterval.twelveHours },
					{ label: '1 day', value: monitorInterval.oneDay },
					{ label: '3 days', value: monitorInterval.threeDays },
					{ label: '1 week', value: monitorInterval.oneWeek },
					{ label: '1 month', value: monitorInterval.oneMonth },
				]}
				onValueChange={(event) => onChange(event)}
			/>
		</>
	);
}

export default MonitorInterval;
