import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, useTheme } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import IndexSelect from './IndexSelect';

const styles = StyleSheet.create({
	build: { marginVertical: 15, height: 240, flex: 0 },
	collapsed: { marginVertical: 15, height: 80, flex: 0 },
});

function ConditionBuilder() {
	const { theme } = useTheme();

	const [showBuilder, setShowBuilder] = useState(false);
	const [indexes, setIndexes] = useState([]);
	const [index, setIndex] = useState({ example: '', eval: '' });
	const [operator, setOperator] = useState('==');
	const [value, setValue] = useState('');

	function onIndexChange(event) {}

	return (
		<>
			{showBuilder ? (
				<View style={{ ...theme.inputContainer, ...styles.build }}>
					<IndexSelect
						indexes={indexes}
						onChange={(event) => onIndexChange(event)}
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
