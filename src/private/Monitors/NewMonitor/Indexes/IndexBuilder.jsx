import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme, Button, Input } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import MonitorIndex from './MonitorIndex';

/**
 * props:
 * - onAddIndex
 */
function IndexBuilder({ ...props }) {
	const { theme } = useTheme();

	const [showBuilder, setShowBuilder] = useState(false);
	const [index, setIndex] = useState({});
	const [analysis, setAnalysis] = useState({});

	function onChange(event) {
		setAnalysis(event);

		setIndex({ ...index, key: event.key });
	}

	const styles = StyleSheet.create({
		collapsed: { marginVertical: 15, height: 80, flex: 0 },
		build: { marginVertical: 15, height: analysis.params ? 220 : 125, flex: 0 },
		button: { backgroundColor: theme.colors.secondary, marginHorizontal: 10 },
	});

	function onPress(_event) {
		setShowBuilder(false);

		if (props.onAddIndex) props.onAddIndex(index);

		setIndex({});

		setAnalysis({});
	}

	return (
		// eslint-disable-next-line react/jsx-no-useless-fragment
		<>
			{showBuilder ? (
				<View style={{ ...theme.inputContainer, ...styles.build }}>
					<MonitorIndex onChange={(event) => onChange(event)} />
					{analysis.params ? (
						<Input
							leftIcon={<Icon name="sliders" size={20} color="black" />}
							label="Params"
							placeholder={analysis.params}
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
						buttonStyle={styles.button}
						onPress={(event) => onPress(event)}
					/>
				</View>
			) : (
				<View style={{ ...theme.inputContainer, ...styles.collapsed }}>
					<Button
						icon={() => <Icon name="plus" size={20} color="black" />}
						title=" Add Index"
						buttonStyle={styles.button}
						onPress={(_event) => setShowBuilder(!showBuilder)}
					/>
				</View>
			)}
		</>
	);
}

export default IndexBuilder;
