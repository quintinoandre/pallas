import React from 'react';
import { Text } from 'react-native';

/**
 * props:
 * - indexes
 * - onChange
 */
function IndexesArea({ ...props }) {
	return <Text>{props.indexes}</Text>;
}

export default IndexesArea;
