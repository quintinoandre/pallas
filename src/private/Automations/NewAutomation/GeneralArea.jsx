import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Input, useTheme } from 'react-native-elements';

import { SwitchInput } from '../../../components/SwitchInput';

const styles = StyleSheet.create({
	row: { flexDirection: 'row', alignItems: 'center', paddingLeft: 5 },
});

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
					<View style={styles.row}>
						<SwitchInput
							text="Is Active?"
							onChange={(event) => onChange({ name: 'isActive', value: event })}
							isChecked={automation.isActive}
						/>
						<SwitchInput
							text="Enable logs?"
							onChange={(event) => onChange({ name: 'logs', value: event })}
							isChecked={automation.logs}
						/>
					</View>
					<Text>{JSON.stringify(automation)}</Text>
				</ScrollView>
			</View>
		</View>
	);
}

export default GeneralArea;
