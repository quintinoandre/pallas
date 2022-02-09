import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import IndexSelect from './IndexSelect';

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		width: '100%',
		flex: 0,
		height: 60,
		marginBottom: 10,
	},
	flex: { flex: 1, paddingTop: 15 },
});

/**
 * props:
 * - value
 * - indexes
 * - onChange
 */
function VariableInput({ ...props }) {
	const [indexes, setIndexes] = useState([]);
	const [value, setValue] = useState('');
	const [showInput, setShowInput] = useState(true);

	useEffect(() => {
		setValue(props.value);
	}, [props.value]);

	useEffect(() => {
		setIndexes(props.indexes || []);
	}, [props.indexes]);

	function onChange(event) {
		setValue(event);

		if (props.onChange) props.onChange(event);
	}

	const icon = (
		<Icon.Button
			style={{ paddingTop: showInput ? 10 : 20 }}
			name="repeat"
			size={20}
			color="black"
			backgroundColor="transparent"
			onPress={(_event) => setShowInput(!showInput)}
		/>
	);

	function renderInput() {
		return (
			<View style={styles.row}>
				<Input
					leftIcon={icon}
					placeholder={`${value}`}
					keyboardType="default"
					autoCapitalize="none"
					value={`${value}`}
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

export default VariableInput;
