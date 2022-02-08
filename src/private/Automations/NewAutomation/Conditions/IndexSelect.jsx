import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Picker from 'react-native-picker-select';

import { Feather as Icon } from '@expo/vector-icons';

const styles = StyleSheet.create({
	inputIOS: {
		height: 30,
		marginBottom: 15,
		paddingHorizontal: 10,
		fontSize: 16,
		alignItems: 'stretch',
		fontWeight: 'bold',
		color: 'black',
	},
	inputAndroid: {
		height: 30,
		marginBottom: 15,
		paddingHorizontal: 10,
		fontSize: 16,
		alignItems: 'stretch',
		fontWeight: 'bold',
		color: 'black',
	},
});

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

	return (
		<Picker
			style={{ ...styles, iconContainer: { top: 0, right: 12 } }}
			value={index}
			onValueChange={(event) => onChange(event)}
			useNativeAndroidPickerStyle={false}
			items={[{ label: 'test', value: '1' }]}
			Icon={() => <Icon name="chevron-down" size={24} color="black" />}
		/>
	);
}

export default IndexSelect;
