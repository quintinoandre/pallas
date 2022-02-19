import React from 'react';
import { Text } from 'react-native';

/**
 * props:
 * - data
 */
function AutomationReport({ ...props }) {
	return <Text>{JSON.stringify(props.data)}</Text>;
}

export default AutomationReport;
