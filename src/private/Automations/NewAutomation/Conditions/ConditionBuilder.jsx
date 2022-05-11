import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Button, useTheme } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import { IndexSelect } from './IndexSelect';
import { OperatorSelect } from './OperatorSelect';
import { ConditionBuilderStyles as styles } from './styles';
import { VariableInput } from './VariableInput';

/**
 * props:
 * - indexes
 * - onAddCondition
 */
function ConditionBuilder({ ...props }) {
	const { theme } = useTheme();

	const [showBuilder, setShowBuilder] = useState(false);
	const [indexes, setIndexes] = useState([]);
	const [indexState, setIndexState] = useState({ example: '', eval: '' });
	const [operator, setOperator] = useState('==');
	const [value, setValue] = useState('');

	useEffect(() => {
		setIndexes(props.indexes || []);
	}, [props.indexes]);

	function onIndexChange(index) {
		setIndexState(index);

		setValue(index.example);
	}

	function onPress() {
		if (!indexState.eval || !operator || value === undefined) return;

		props.onAddCondition(`${indexState.eval}${operator}${value}`);

		setShowBuilder(false);
	}

	return (
		<>
			{showBuilder ? (
				<View style={{ ...styles.build, ...theme.inputContainer }}>
					<IndexSelect
						indexes={indexes}
						onChange={(event) => onIndexChange(event)}
					/>
					<OperatorSelect onChange={(event) => setOperator(event)} />
					<VariableInput
						value={indexState.example}
						indexes={indexes}
						onChange={(event) => setValue(event)}
					/>
					<Button
						icon={() => <Icon name="plus" color="black" size={20} />}
						buttonStyle={{
							...styles.button,
							backgroundColor: theme.colors.secondary,
						}}
						title=" Add Condition"
						onPress={onPress}
					/>
				</View>
			) : (
				<View style={{ ...styles.collapsed, ...theme.inputContainer }}>
					<Button
						icon={() => <Icon name="plus" color="black" size={20} />}
						buttonStyle={styles.button}
						title=" Add Condition"
						onPress={() => setShowBuilder(true)}
					/>
				</View>
			)}
		</>
	);
}

export { ConditionBuilder };
