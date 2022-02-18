import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Picker from 'react-native-picker-select';

import { Feather as Icon } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const pickerSelectStyles = StyleSheet.create({
	inputAndroid: {
		marginVertical: 10,
		height: 30,
		paddingHorizontal: 10,
		fontSize: 16,
		alignItems: 'stretch',
	},
	inputIOS: {
		marginTop: 10,
		height: 30,
		paddingHorizontal: 10,
		fontSize: 16,
		alignItems: 'stretch',
	},
});

/**
 * props:
 * - onChange
 */
function SelectQuote({ ...props }) {
	const [quote, setQuote] = useState('USDT');

	function errorHandling(err) {
		console.error(err);
	}

	useEffect(() => {
		AsyncStorage.getItem('quote')
			.then((result) => {
				setQuote(result || 'USDT');

				if (props.onChange) props.onChange(result || 'USDT');
			})
			.catch((err) => {
				errorHandling(err);
			});
	}, []);

	return (
		<Picker
			value={quote}
			onValueChange={async (event) => {
				await AsyncStorage.setItem('quote', event);

				setQuote(event);

				if (props.onChange) props.onChange(event);
			}}
			style={{ ...pickerSelectStyles, iconContainer: { top: 10, right: 12 } }}
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
