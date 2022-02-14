import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import Picker from 'react-native-picker-select';

import { Feather as Icon } from '@expo/vector-icons';

import { monitorType } from '../../../../services/MonitorsService';

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
 * - type
 * - onChange
 */
function MonitorType({ ...props }) {
	const [type, setType] = useState(monitorType.CANDLES);

	useEffect(() => {
		setType(props.type || monitorType.CANDLES);
	}, [props.type]);

	function onChange(event) {
		setType(event);

		if (props.onChange) props.onChange(event);
	}

	return (
		<>
			<Text style={styles.label}>Type</Text>
			<Picker
				Icon={() => <Icon name="chevron-down" size={24} color="black" />}
				style={{ ...pickerSelectStyles, iconContainer: { top: 10, right: 5 } }}
				value={type}
				useNativeAndroidPickerStyle={false}
				items={[
					{ label: 'Candles', value: monitorType.CANDLES },
					{ label: 'Ticker', value: monitorType.TICKER },
				]}
				onValueChange={(event) => onChange(event)}
			/>
		</>
	);
}

export default MonitorType;
