import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-elements';

import { HeaderRow } from '../../../components';

const styles = StyleSheet.create({
	header: { flex: 0, height: 40, backgroundColor: '#ccc' },
});

/**
 * props:
 * - navigation
 * - route
 */
function NewAutomation({ ...props }) {
	const { theme } = useTheme();

	const DEFAULT_AUTOMATION = {
		symbol: 'BTCUSDT',
		name: '',
		actions: [],
		conditions: '',
		schedule: '',
		logs: false,
		isActive: false,
	};

	const [automation, setAutomation] = useState(DEFAULT_AUTOMATION);

	return (
		<View style={theme.page}>
			<View style={styles.header}>
				<HeaderRow
					symbol={automation.symbol}
					onSymbolChange={(event) =>
						setAutomation({ ...DEFAULT_AUTOMATION, symbol: event })
					}
					onBackPress={(_event) => props.navigation.navigate('AutomationsList')}
				/>
			</View>
			<Text>New Automation</Text>
		</View>
	);
}

export default NewAutomation;
