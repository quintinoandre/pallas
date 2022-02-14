import React from 'react';
import { Text } from 'react-native';

/**
 * props:
 * - monitor
 */
function MonitorItem({ ...props }) {
	return <Text>{props.monitor.symbol}</Text>;
}

export default MonitorItem;
