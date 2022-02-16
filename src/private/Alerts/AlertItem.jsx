import React from 'react';
import { Text } from 'react-native';

/**
 * props:
 * - alert
 */
function AlertItem({ ...props }) {
	return <Text>{JSON.stringify(props.alert)}</Text>;
}

export default AlertItem;
