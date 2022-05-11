import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Input } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import IndexSelect from './IndexSelect';
import { VariableInputStyles as styles } from './styles';

/**
 * props:
 * - value
 * - indexes
 * - onChange
 */
function VariableInput({ ...props }) {
	const [indexes, setIndexes] = useState([]);
	const [valueState, setValueState] = useState('');
	const [showInput, setShowInput] = useState(true);

	useEffect(() => {
		setValueState(props.value);
	}, [props.value]);

	useEffect(() => {
		setIndexes(props.indexes || []);
	}, [props.indexes]);

	function onChange(value) {
		setValueState(value);

		props.onChange(value);
	}

	function onRefresh() {
		setValueState('');

		setShowInput(!showInput);
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
			<View style={styles.row}>
				<Input
					leftIcon={icon}
					placeholder={`${valueState}`}
					keyboardType="default"
					autoCapitalize="none"
					value={`${valueState}`}
					onChangeText={(event) => onChange(event)}
				/>
			</View>
		);
	}

	function renderPicker() {
		return (
			<View style={styles.row}>
				{icon}
				<View style={styles.flex}>
					<IndexSelect
						indexes={indexes}
						onChange={(event) => onChange(event.eval)}
					/>
				</View>
			</View>
		);
	}

	return <>{showInput ? renderInput() : renderPicker()}</>;
}

export { VariableInput };
