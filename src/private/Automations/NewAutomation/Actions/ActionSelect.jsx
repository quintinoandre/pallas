import React, { useState } from 'react';
import Picker from 'react-native-picker-select';

import { Feather as Icon } from '@expo/vector-icons';

import { ACTION_TYPE } from '../../../../enums';
import { ActionSelectStyles as pickerSelectStyles } from './styles';

/**
 * props:
 * - onChange
 */
function ActionSelect({ ...props }) {
	const [typeState, setTypeState] = useState('');

	function onChange(type) {
		setTypeState(type);

		props.onChange(type);
	}

	return (
		<Picker
			Icon={() => <Icon name="chevron-down" size={24} color="black" />}
			style={pickerSelectStyles}
			value={typeState}
			useNativeAndroidPickerStyle={false}
			items={[
				{ label: 'alert via E-mail', value: ACTION_TYPE.ALERT_EMAIL },
				{ label: 'alert via SMS', value: ACTION_TYPE.ALERT_SMS },
				{ label: 'alert via Telegram', value: ACTION_TYPE.ALERT_TELEGRAM },
				{ label: 'Place Order', value: ACTION_TYPE.ORDER },
				{ label: 'Place Trailing', value: ACTION_TYPE.TRAILING },
				{ label: 'Withdraw Crypto', value: ACTION_TYPE.WITHDRAW },
			]}
			onValueChange={(event) => onChange(event)}
		/>
	);
}

export { ActionSelect };
