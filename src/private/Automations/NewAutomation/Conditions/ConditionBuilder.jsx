import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, useTheme } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import IndexSelect from './IndexSelect';
import OperatorSelect from './OperatorSelect';
import VariableInput from './VariableInput';

const styles = StyleSheet.create({
	build: { marginVertical: 15, height: 240, flex: 0 },
	collapsed: { marginVertical: 15, height: 80, flex: 0 },
});

/**
 * props:
 * - indexes
 * - onAddCondition
 */
function ConditionBuilder({ ...props }) {
	const { theme } = useTheme();

	const [showBuilder, setShowBuilder] = useState(false);
	const [indexes, setIndexes] = useState([]);
	const [index, setIndex] = useState({ example: '', eval: '' });
	const [operator, setOperator] = useState('==');
	const [value, setValue] = useState('');

	useEffect(() => {
		setIndexes(props.indexes || []);
	}, [props.indexes]);

	function onIndexChange(event) {
		setIndex(event);

		setValue(event.example);
	}

	function onPress(_event) {
		if (!index.eval || !operator || value === undefined) return;

		if (props.onAddCondition)
			props.onAddCondition(`${index.eval}${operator}${value}`);

		setShowBuilder(false);
	}

	return (
		// eslint-disable-next-line react/jsx-no-useless-fragment
		<>
			{showBuilder ? (
				<View style={{ ...theme.inputContainer, ...styles.build }}>
					<IndexSelect
						indexes={indexes}
						onChange={(event) => onIndexChange(event)}
					/>
					<OperatorSelect onChange={(event) => setOperator(event)} />
					<VariableInput
						value={index.example}
						indexes={indexes}
						onChange={(event) => setValue(event)}
					/>
					<Button
						icon={() => <Icon name="plus" color="black" size={20} />}
						buttonStyle={{
							backgroundColor: theme.colors.secondary,
							marginHorizontal: 10,
						}}
						title=" Add Condition"
						onPress={(event) => onPress(event)}
					/>
				</View>
			) : (
				<View style={{ ...theme.inputContainer, ...styles.collapsed }}>
					<Button
						icon={() => <Icon name="plus" color="black" size={20} />}
						buttonStyle={{
							backgroundColor: theme.colors.secondary,
							marginHorizontal: 10,
						}}
						title=" Add Condition"
						onPress={(_event) => setShowBuilder(true)}
					/>
				</View>
			)}
		</>
	);
}

export default ConditionBuilder;
