import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-elements';

import AutomationItem from './AutomationItem';

const styles = StyleSheet.create({
	automations: { width: '95%' },
});

/**
 * props:
 * - data
 */
function AutomationReport({ ...props }) {
	const { theme } = useTheme();

	const [automationState, setAutomationState] = useState([]);

	useEffect(() => {
		if (!props.data) return;

		setAutomationState(props.data);
	}, [props.data]);

	return (
		<View style={{ ...theme.inputContainer, ...styles.automations }}>
			<Text style={theme.h2}>Automations</Text>
			<ScrollView>
				{automationState.map((automation) => (
					<AutomationItem key={automation.name} automation={automation} />
				))}
			</ScrollView>
		</View>
	);
}

export default AutomationReport;
