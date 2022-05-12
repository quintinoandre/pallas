import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Button, Input, Overlay, useTheme } from 'react-native-elements';
import Picker from 'react-native-picker-select';

import { Feather as Icon } from '@expo/vector-icons';

import { styles, pickerSelectStyles } from './styles';

/**
 * props:
 * - label
 * - value
 * - valueMultiplier
 * - options
 * - onChange
 */
function MultiplierInput({ ...props }) {
	const { theme } = useTheme();

	const [value, setValue] = useState('0.00');
	const [valueMultiplier, setValueMultiplier] = useState('1.00');
	const [showInput, setShowInput] = useState(true);
	const [showOverlay, setShowOverlay] = useState(false);

	useEffect(() => {
		setValue(props.value);

		setValueMultiplier(props.valueMultiplier);

		setShowInput(!/[A-Z ]/i.test(props.value));
	}, [props.value, props.valueMultiplier]);

	function onRefresh() {
		setValue('');

		setValueMultiplier('1.00');

		setShowInput(!showInput);
	}

	const icon = (
		<Icon.Button
			name="repeat"
			size={20}
			color="black"
			style={{ paddingTop: showInput ? 10 : 20 }}
			onPress={onRefresh}
			backgroundColor="transparent"
		/>
	);

	function renderInput() {
		return (
			<Input
				placeholder={`${value || '0.00'}`}
				keyboardType="decimal-pad"
				leftIcon={icon}
				onChangeText={setValue}
				value={`${value}`}
			/>
		);
	}

	function renderPicker() {
		return (
			<View style={styles.row}>
				{icon}
				<View style={styles.pickerContainer}>
					<Picker
						value={`${value}`}
						onValueChange={(event) => setValue(event)}
						useNativeAndroidPickerStyle={false}
						Icon={() => <Icon name="chevron-down" size={24} color="black" />}
						items={props.options}
						style={pickerSelectStyles}
					/>
				</View>
			</View>
		);
	}

	function onSavePress() {
		props.onChange({ value, valueMultiplier });

		setShowOverlay(false);
	}

	return (
		<>
			<Text style={styles.label}>{props.label}</Text>
			<Button
				title={`${value || '0.00'} x ${valueMultiplier || '1.00'}`}
				titleStyle={styles.buttonText}
				type="clear"
				buttonStyle={styles.button}
				onPress={() => setShowOverlay(true)}
				iconRight
				icon={<Icon name="edit" size={20} color="black" />}
			/>
			<Overlay
				overlayStyle={styles.overlay}
				isVisible={showOverlay}
				onBackdropPress={() => setShowOverlay(false)}
			>
				<Text style={{ ...styles.text, ...theme.h1 }}>{props.label}</Text>
				{showInput ? renderInput() : renderPicker()}
				<Text style={styles.label}>Multiplier</Text>
				<Input
					placeholder="1.00"
					keyboardType="decimal-pad"
					leftIcon={<Icon name="x" size={20} color="black" />}
					onChangeText={(event) => setValueMultiplier(event.replace(',', '.'))}
					value={`${valueMultiplier}`}
				/>
				<Button
					title=" Save Configuration"
					onPress={onSavePress}
					style={styles.overlayButton}
					icon={<Icon name="save" size={20} color="white" />}
				/>
			</Overlay>
		</>
	);
}

export { MultiplierInput };
