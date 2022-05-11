import React, { useState, useEffect } from 'react';
import Picker from 'react-native-picker-select';

import { Feather as Icon } from '@expo/vector-icons';

import { ORDER_TYPE } from '../../enums';
import { styles, pickerSelectStyles } from './styles';

/**
 * props:
 * - type
 * - onChange
 */
function SelectType({ ...props }) {
	const [type, setType] = useState(ORDER_TYPE.MARKET);

	useEffect(() => {
		setType(props.type);
	}, [props.type]);

	return (
		<Picker
			value={type}
			onValueChange={(event) => {
				setType(event);

				props.onChange(event);
			}}
			style={{ ...styles.iconContainer, ...pickerSelectStyles }}
			useNativeAndroidPickerStyle={false}
			Icon={() => <Icon name="chevron-down" size={24} color="black" />}
			items={[
				{ label: 'Limit', value: ORDER_TYPE.LIMIT },
				{ label: 'Market', value: ORDER_TYPE.MARKET },
				{ label: 'Stop Loss Limit', value: ORDER_TYPE.STOP_LOSS_LIMIT },
				{ label: 'Take Profit Limit', value: ORDER_TYPE.TAKE_PROFIT_LIMIT },
				{ label: 'Trailing Stop', value: ORDER_TYPE.TRAILING_STOP },
			]}
		/>
	);
}

export { SelectType };
