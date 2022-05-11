import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import Picker from 'react-native-picker-select';

import { Feather as Icon } from '@expo/vector-icons';

import { ENUM_MONITOR_TYPE } from '../../../../enums';
import {
	MonitorTypePickerSelectStyles as pickerSelectStyles,
	MonitorTypeStyles as styles,
} from './styles';

/**
 * props:
 * - type
 * - onChange
 */
function MonitorType({ ...props }) {
	const [typeState, setTypeState] = useState(ENUM_MONITOR_TYPE.CANDLES);

	useEffect(() => {
		setTypeState(props.type || ENUM_MONITOR_TYPE.CANDLES);
	}, [props.type]);

	function onChange(type) {
		setTypeState(type);

		props.onChange(type);
	}

	return (
		<>
			<Text style={styles.label}>Type</Text>
			<Picker
				Icon={() => <Icon name="chevron-down" size={24} color="black" />}
				style={pickerSelectStyles}
				value={typeState}
				useNativeAndroidPickerStyle={false}
				items={[
					{ label: 'Candles', value: ENUM_MONITOR_TYPE.CANDLES },
					{ label: 'Ticker', value: ENUM_MONITOR_TYPE.TICKER },
				]}
				onValueChange={(event) => onChange(event)}
			/>
		</>
	);
}

export { MonitorType };
