import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Login from '../public/Login/Login';
import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator();

function StackNavigator() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
		</Stack.Navigator>
	);
}

export default StackNavigator;
