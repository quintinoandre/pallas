import React, { useEffect, useState } from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { Input, useTheme } from 'react-native-elements';

const styles = StyleSheet.create({});

/**
 * props:
 * - automation
 * - type
 * - onChange
 */
function GeneralArea({ ...props }) {
	const { theme } = useTheme();

	const [automation, setAutomation] = useState({});

	useEffect(() => {
		setAutomation(props.automation);
	}, [props.automation]);

	function onChange(newProp) {
		const newData = { ...automation, [newProp.name]: newProp.value };

		setAutomation(newData);

		if (props.onChange) props.onChange(newProp);
	}

	return (
		<View style={theme.container}>
			<View style={theme.inputContainer}>
				<ScrollView>
					<Input
						label="Name"
						placeholder="Automation name"
						keyboardType="default"
						autoCapitalize="words"
						value={automation.name}
						onChangeText={(event) => onChange({ name: 'name', value: event })}
					/>
				</ScrollView>
			</View>
		</View>
	);
}

export default GeneralArea;
