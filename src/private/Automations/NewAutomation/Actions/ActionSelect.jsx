import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import Picker from 'react-native-picker-select';

import { Feather as Icon } from '@expo/vector-icons';

import { actionType } from '../../../../services';

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		marginVertical: 15,
		height: 30,
		paddingHorizontal: 10,
		fontSize: 16,
		alignItems: 'stretch',
		fontWeight: 'bold',
		color: 'black',
	},
	inputAndroid: {
		marginVertical: 15,
		height: 30,
		paddingHorizontal: 10,
		fontSize: 16,
		alignItems: 'stretch',
		fontWeight: 'bold',
		color: 'black',
	},
});

/**
 * props:
 * - onChange
 */
function ActionSelect({ ...props }) {
	const [type, setType] = useState('');

	function onChange(event) {
		setType(event);

		if (props.onChange) props.onChange(event);
	}

	return (
		<Picker
			Icon={() => <Icon name="chevron-down" size={24} color="black" />}
			style={{ ...pickerSelectStyles, iconContainer: { top: 10, right: 12 } }}
			value={type}
			useNativeAndroidPickerStyle={false}
			items={[
				{ label: 'alert via E-mail', value: actionType.ALERT_EMAIL },
				{ label: 'alert via SMS', value: actionType.ALERT_SMS },
				{ label: 'alert via Telegram', value: actionType.ALERT_TELEGRAM },
				{ label: 'Place Order', value: actionType.ORDER },
				{ label: 'Place Trailing', value: actionType.TRAILING },
				{ label: 'Withdraw Crypto', value: actionType.WITHDRAW },
			]}
			onValueChange={(event) => onChange(event)}
		/>
	);
}

export default ActionSelect;
