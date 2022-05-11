import React, { useState } from 'react';
import { View } from 'react-native';
import { useTheme, Button, Input } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import { MonitorIndex } from './MonitorIndex';
import { IndexBuilderStyles } from './styles';

/**
 * props:
 * - onAddIndex
 */
function IndexBuilder({ ...props }) {
	const { theme } = useTheme();

	const [showBuilder, setShowBuilder] = useState(false);
	const [index, setIndex] = useState({});
	const [analysisState, setAnalysisState] = useState({});

	function onChange(analysis) {
		setAnalysisState(analysis);

		setIndex({ ...index, key: analysis.key });
	}

	const styles = IndexBuilderStyles(analysisState);

	function onPress() {
		setShowBuilder(false);

		props.onAddIndex(index);

		setIndex({});

		setAnalysisState({});
	}

	return (
		<>
			{showBuilder ? (
				<View style={{ ...styles.build, ...theme.inputContainer }}>
					<MonitorIndex onChange={(event) => onChange(event)} />
					{analysisState.params ? (
						<Input
							leftIcon={<Icon name="sliders" size={20} color="black" />}
							label="Params"
							placeholder={analysisState.params}
							keyboardType="decimal-pad"
							autoCapitalize="none"
							value={index.params}
							onChangeText={(event) => setIndex({ ...index, params: event })}
						/>
					) : (
						<></>
					)}
					<Button
						icon={() => <Icon name="plus" size={20} color="black" />}
						title=" Add Index"
						buttonStyle={{
							...styles.button,
							backgroundColor: theme.colors.secondary,
						}}
						onPress={onPress}
					/>
				</View>
			) : (
				<View style={{ ...styles.collapsed, ...theme.inputContainer }}>
					<Button
						icon={() => <Icon name="plus" size={20} color="black" />}
						title=" Add Index"
						buttonStyle={{
							...styles.button,
							backgroundColor: theme.colors.secondary,
						}}
						onPress={() => setShowBuilder(!showBuilder)}
					/>
				</View>
			)}
		</>
	);
}

export { IndexBuilder };
