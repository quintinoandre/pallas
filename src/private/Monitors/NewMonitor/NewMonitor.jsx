import React from 'react';
import { Text } from 'react-native';

/**
 * props:
 * - navigation
 * - route
 */
function NewMonitor({ ...props }) {
	return <Text>{props.route.params.monitor.id}</Text>;
}

export default NewMonitor;
