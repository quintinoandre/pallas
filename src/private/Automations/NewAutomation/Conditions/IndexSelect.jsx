import React, { useState, useEffect } from 'react';
import Picker from 'react-native-picker-select';

import { Feather as Icon } from '@expo/vector-icons';

import { IndexSelectStyles as pickerSelectStyles } from './styles';

/**
 * props:
 * - indexes
 * - onChange
 */
function IndexSelect({ ...props }) {
	const [indexes, setIndexes] = useState([]);
	const [indexState, setIndexState] = useState('');

	useEffect(() => {
		setIndexes(props.indexes || []);
	}, [props.indexes]);

	function onChange(index) {
		if (!index) return;

		setIndexState(index);

		props.onChange(props.indexes.find((item) => item.eval === index));
	}

	function getOptionText(symbol, variable) {
		return variable.startsWith('WALLET') ? `${symbol}:${variable}` : variable;
	}

	return (
		<Picker
			style={pickerSelectStyles}
			value={indexState}
			onValueChange={(event) => onChange(event)}
			useNativeAndroidPickerStyle={false}
			items={indexes.map((index) => {
				return {
					label: getOptionText(index.symbol, index.variable),
					value: index.eval,
				};
			})}
			Icon={() => <Icon name="chevron-down" size={24} color="black" />}
		/>
	);
}

export { IndexSelect };
