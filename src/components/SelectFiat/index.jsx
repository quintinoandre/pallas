import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Picker from 'react-native-picker-select';

import { Feather as Icon } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const pickerSelectStyles = StyleSheet.create({
	inputAndroid: {
		marginTop: 10,
		height: 30,
		paddingHorizontal: 24,
		fontSize: 16,
		alignItems: 'stretch',
	},
	inputIOS: {
		marginTop: 10,
		height: 30,
		paddingHorizontal: 24,
		fontSize: 16,
		alignItems: 'stretch',
	},
});

/**
 * props:
 * - onChange
 */
function SelectFiat({ ...props }) {
	const [fiat, setFiat] = useState('USD');

	useEffect(() => {
		AsyncStorage.getItem('fiat')
			.then((result) => {
				setFiat(result || 'USD');

				if (props.onChange) props.onChange(result || 'USD');
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	return (
		<Picker
			value={fiat}
			onValueChange={(event) => {
				AsyncStorage.setItem('fiat', event);

				setFiat(event);

				if (props.onChange) props.onChange(event);
			}}
			style={{ ...pickerSelectStyles, iconContainer: { top: 10, right: 12 } }}
			useNativeAndroidPickerStyle={false}
			Icon={() => <Icon name="chevron-down" size={24} color="black" />}
			items={[
				{ label: 'AUD', value: 'AUD' },
				{ label: 'BRL', value: 'BRL' },
				{ label: 'EUR', value: 'EUR' },
				{ label: 'GBP', value: 'GBP' },
				{ label: 'NGN', value: 'NGN' },
				{ label: 'TRY', value: 'TRY' },
				{ label: 'UAH', value: 'UAH' },
				{ label: 'USD', value: 'USD' },
			]}
		/>
	);
}

export { SelectFiat };
