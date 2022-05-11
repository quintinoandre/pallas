import React, { useState, useEffect } from 'react';
import Picker from 'react-native-picker-select';

import { Feather as Icon } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { pickerSelectStyles } from './styles';

/**
 * props:
 * - onChange
 */
function SelectFiat({ ...props }) {
	const [fiat, setFiat] = useState('USD');

	function errorHandling(error) {
		console.error(error);
	}

	useEffect(() => {
		AsyncStorage.getItem('fiat')
			.then((result) => {
				setFiat(result || 'USD');

				props.onChange(result || 'USD');
			})
			.catch((error) => errorHandling(error));
	}, []);

	return (
		<Picker
			value={fiat}
			onValueChange={(event) => {
				AsyncStorage.setItem('fiat', event);

				setFiat(event);

				props.onChange(event);
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
