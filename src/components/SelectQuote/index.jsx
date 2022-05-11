import React, { useState, useEffect } from 'react';
import Picker from 'react-native-picker-select';

import { Feather as Icon } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles, pickerSelectStyles } from './styles';

/**
 * props:
 * - onChange
 */
function SelectQuote({ ...props }) {
	const [quote, setQuote] = useState('USDT');

	function errorHandling(error) {
		console.error(error);
	}

	useEffect(() => {
		AsyncStorage.getItem('quote')
			.then((result) => {
				setQuote(result || 'USDT');

				props.onChange(result || 'USDT');
			})
			.catch((error) => errorHandling(error));
	}, []);

	return (
		<Picker
			value={quote}
			onValueChange={async (event) => {
				await AsyncStorage.setItem('quote', event);

				setQuote(event);

				props.onChange(event);
			}}
			style={{ ...styles.iconContainer, ...pickerSelectStyles }}
			useNativeAndroidPickerStyle={false}
			Icon={() => <Icon name="chevron-down" size={24} color="black" />}
			items={[
				{ label: 'BRL', value: 'BRL' },
				{ label: 'BTC', value: 'BTC' },
				{ label: 'ETH', value: 'ETH' },
				{ label: 'EUR', value: 'EUR' },
				{ label: 'GBP', value: 'GBP' },
				{ label: 'USD', value: 'USD' },
				{ label: 'USDT', value: 'USDT' },
			]}
		/>
	);
}

export { SelectQuote };
