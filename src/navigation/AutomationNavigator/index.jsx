import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import AutomationsList from '../../private/Automations/AutomationsList';
import NewAutomation from '../../private/Automations/NewAutomation/NewAutomation';
import NewGrid from '../../private/Automations/NewGrid/NewGrid';

const Stack = createStackNavigator();

function AutomationNavigator() {
	return (
		<Stack.Navigator
			initialRouteName="AutomationsList"
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen name="AutomationsList" component={AutomationsList} />
			<Stack.Screen name="NewAutomation" component={NewAutomation} />
			<Stack.Screen name="NewGrid" component={NewGrid} />
		</Stack.Navigator>
	);
}

export { AutomationNavigator };
