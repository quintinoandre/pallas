import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Input } from 'react-native-elements';
import Picker from 'react-native-picker-select';

import { Feather as Icon } from '@expo/vector-icons';

import { QUANTITY_TYPE } from '../../../enums';
import { QuantityInputStyles as styles } from './styles';

/**
 * props:
 * - value
 * - onChange
 */
function QuantityInput({ ...props }) {
	const [valueState, setValueState] = useState('');
	const [showInput, setShowInput] = useState(true);

	useEffect(() => {
		if (!props.value) return;

		setValueState(props.value);

		setShowInput(
			![QUANTITY_TYPE.MAX_WALLET, QUANTITY_TYPE.MIN_NOTIONAL].includes(
				props.value
			)
		);
	}, [props.value]);

	function onRefresh() {
		setValueState('');

		setShowInput(!showInput);

		props.onChange('');
	}

	function onChange(value) {
		if (!value) return;

		const text = value.replace(',', '.');

		setValueState(text);

		props.onChange(text);
	}

	const icon = (
		<Icon.Button
			style={{ paddingTop: showInput ? 10 : 20 }}
			name="repeat"
			size={20}
			color="black"
			underlayColor="white"
			backgroundColor="transparent"
			onPress={onRefresh}
		/>
	);

	function renderInput() {
		return (
			<Input
				leftIcon={icon}
				placeholder={`${valueState}`}
				keyboardType="decimal-pad"
				value={`${valueState}`}
				onChangeText={(event) => onChange(event)}
			/>
		);
	}

	function renderPicker() {
		return (
			<View style={styles.row}>
				{icon}
				<View style={styles.pickerContainer}>
					<Picker
						Icon={() => <Icon name="chevron-down" size={24} color="black" />}
						style={styles.pickerSelectStyles}
						useNativeAndroidPickerStyle={false}
						value={`${valueState}`}
						items={[
							{ label: 'Max. Wallet', value: QUANTITY_TYPE.MAX_WALLET },
							{ label: 'Min. Notional', value: QUANTITY_TYPE.MIN_NOTIONAL },
						]}
						onValueChange={(event) => onChange(event)}
					/>
				</View>
			</View>
		);
	}

	return (
		<>
			<Text style={styles.label}>Quantity</Text>
			{showInput ? renderInput() : renderPicker()}
		</>
	);
}

export { QuantityInput };
