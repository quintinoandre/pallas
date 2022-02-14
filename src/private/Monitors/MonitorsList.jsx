import React from 'react';
import { Text } from 'react-native';
import { FAB } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

/**
 * props:
 * - navigation
 * - route
 */
function MonitorsList({ ...props }) {
	return (
		<>
			<Text>Monitors List</Text>
			<FAB
				title={<Icon name="plus" size={20} color="white" />}
				placement="right"
				onPress={(_event) =>
					props.navigation.navigate('Monitors', {
						screen: 'NewMonitor',
						params: {},
					})
				}
			/>
		</>
	);
}

export default MonitorsList;
