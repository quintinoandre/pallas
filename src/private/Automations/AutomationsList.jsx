import React from 'react';
import { Text } from 'react-native';

import NewAutomationButton from './NewAutomationButton';

/**
 * props:
 * - navigation
 * - route
 */
function AutomationsList({ ...props }) {
	return (
		<>
			<Text>Automations List</Text>
			<NewAutomationButton navigation={props.navigation} />
		</>
	);
}

export default AutomationsList;
