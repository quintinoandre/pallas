import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../private/Dashboard/Dashboard';
import Login from '../public/Login/Login';

const Stack = createStackNavigator();

function StackNavigator() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="Dashboard" component={Dashboard} />
		</Stack.Navigator>
	);
}

export default StackNavigator;
