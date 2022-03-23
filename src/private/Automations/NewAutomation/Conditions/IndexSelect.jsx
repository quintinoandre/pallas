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
	const [index, setIndex] = useState('');

	useEffect(() => {
		setIndexes(props.indexes || []);
	}, [props.indexes]);

	function onChange(event) {
		if (!event) return;

		setIndex(event);

		if (props.onChange)
			props.onChange(props.indexes.find((ix) => ix.eval === event));
	}

	function getOptionText(symbol, variable) {
		return variable.startsWith('WALLET') ? `${symbol}:${variable}` : variable;
	}

	return (
		<Picker
			style={{ ...pickerSelectStyles, iconContainer: { top: 0, right: 12 } }}
			value={index}
			onValueChange={(event) => onChange(event)}
			useNativeAndroidPickerStyle={false}
			items={indexes.map((item) => {
				return {
					label: getOptionText(item.symbol, item.variable),
					value: item.eval,
				};
			})}
			Icon={() => <Icon name="chevron-down" size={24} color="black" />}
		/>
	);
}

export default IndexSelect;
