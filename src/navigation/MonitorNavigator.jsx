import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import MonitorsList from '../private/Monitors/MonitorsList';
import NewMonitor from '../private/Monitors/NewMonitor/NewMonitor';

const Stack = createStackNavigator();

function MonitorNavigator() {
	return (
		<Stack.Navigator
			initialRouteName="MonitorsList"
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen name="MonitorsList" component={MonitorsList} />
			<Stack.Screen name="NewMonitor" component={NewMonitor} />
		</Stack.Navigator>
	);
}

export default MonitorNavigator;
