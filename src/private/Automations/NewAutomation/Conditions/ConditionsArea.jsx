import React from 'react';
import { Text, ScrollView, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-elements';

import ConditionBuilder from './ConditionBuilder';

const styles = StyleSheet.create({
	list: { flex: 1, width: '100%', paddingHorizontal: 20 },
});

/**
 * props:
 * - conditions
 * - symbol
 * - type
 * - onChange
 */
function ConditionsArea({ ...props }) {
	const { theme } = useTheme();

	return (
		<View style={theme.container}>
			<ConditionBuilder />
			<View style={styles.list}>
				<ScrollView
					contentContainerStyle={{ flexGrow: 1 }}
					alwaysBounceVertical
				>
					<Text>Conditions List</Text>
				</ScrollView>
			</View>
		</View>
	);
}

export default ConditionsArea;
