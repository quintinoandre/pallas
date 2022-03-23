import React, { useState, useEffect } from 'react';
import Picker from 'react-native-picker-select';

import { Feather as Icon } from '@expo/vector-icons';

import { orderType } from '../../services';
import { pickerSelectStyles } from './styles';

/**
 * props:
 * - type
 * - onChange
 */
function SelectType({ ...props }) {
	const [type, setType] = useState(orderType.MARKET);

	useEffect(() => {
		setType(props.type);
	}, [props.type]);

	return (
		<Picker
			value={type}
			onValueChange={(event) => {
				setType(event);

				if (props.onChange) props.onChange(event);
			}}
			style={{ ...pickerSelectStyles, iconContainer: { top: 10, right: 12 } }}
			useNativeAndroidPickerStyle={false}
			Icon={() => <Icon name="chevron-down" size={24} color="black" />}
			items={[
				{ label: 'Limit', value: orderType.LIMIT },
				{ label: 'Market', value: orderType.MARKET },
				{ label: 'Stop Loss Limit', value: orderType.STOP_LOSS_LIMIT },
				{ label: 'Take Profit Limit', value: orderType.TAKE_PROFIT_LIMIT },
				{ label: 'Trailing Stop', value: orderType.TRAILING_STOP },
			]}
		/>
	);
}

export { SelectType };
