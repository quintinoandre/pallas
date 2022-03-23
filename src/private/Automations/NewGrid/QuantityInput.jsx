import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input } from 'react-native-elements';
import Picker from 'react-native-picker-select';

import { Feather as Icon } from '@expo/vector-icons';

import { quantityType } from '../../../services';

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		marginVertical: 15,
		height: 30,
		paddingHorizontal: 10,
		fontSize: 16,
		fontWeight: 'bold',
		color: 'black',
		alignItems: 'stretch',
	},
	inputAndroid: {
		marginVertical: 15,
		height: 30,
		paddingHorizontal: 10,
		fontSize: 16,
		fontWeight: 'bold',
		color: 'black',
		alignItems: 'stretch',
	},
});

const styles = StyleSheet.create({
	row: { width: '100%', flexDirection: 'row' },
	label: { fontWeight: 'bold', color: 'grey', paddingLeft: 10, fontSize: 16 },
});

/**
 * props:
 * - value
 * - onChange
 */
function QuantityInput({ ...props }) {
	const [value, setValue] = useState('');
	const [showInput, setShowInput] = useState(true);

	useEffect(() => {
		if (!props.value) return;

		setValue(props.value);

		setShowInput(
			![quantityType.MAX_WALLET, quantityType.MIN_NOTIONAL].includes(
				props.value
			)
		);
	}, [props.value]);

	function onRefresh(_event) {
		setValue('');

		setShowInput(!showInput);

		if (props.onChange) props.onChange('');
	}

	function onChange(event) {
		if (!event) return;

		const text = event.replace(',', '.');

		setValue(text);

		if (props.onChange) props.onChange(text);
	}

	const icon = (
		<Icon.Button
			style={{ paddingTop: showInput ? 10 : 20 }}
			name="repeat"
			size={20}
			color="black"
			underlayColor="white"
			backgroundColor="transparent"
			onPress={(event) => onRefresh(event)}
		/>
	);

	function renderInput() {
		return (
			<Input
				leftIcon={icon}
				placeholder={`${value}`}
				keyboardType="decimal-pad"
				value={`${value}`}
				onChangeText={(event) => onChange(event)}
			/>
		);
	}

	function renderPicker() {
		return (
			<View style={styles.row}>
				{icon}
				<View style={{ flex: 1 }}>
					<Picker
						Icon={() => <Icon name="chevron-down" size={24} color="black" />}
						style={{
							...pickerSelectStyles,
							iconContainer: { top: 20, right: 12 },
						}}
						useNativeAndroidPickerStyle={false}
						value={`${value}`}
						items={[
							{ label: 'Max. Wallet', value: quantityType.MAX_WALLET },
							{ label: 'Min. Notional', value: quantityType.MIN_NOTIONAL },
						]}
						onValueChange={(event) => onChange(event)}
					/>
				</View>
			</View>
		);
	}

	// eslint-disable-next-line react/jsx-no-useless-fragment
	return (
		<>
			<Text style={styles.label}>Quantity</Text>
			{showInput ? renderInput() : renderPicker()}
		</>
	);
}

export default QuantityInput;
