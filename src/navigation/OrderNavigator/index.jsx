import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { NewOrder } from '../../private/Orders/NewOrder';
import { OrdersList } from '../../private/Orders/OrdersList';
import { OrderView } from '../../private/Orders/OrderView';

const Stack = createStackNavigator();

function OrderNavigator() {
	return (
		<Stack.Navigator
			initialRouteName="OrdersList"
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen name="OrdersList" component={OrdersList} />
			<Stack.Screen name="OrderView" component={OrderView} />
			<Stack.Screen name="NewOrder" component={NewOrder} />
		</Stack.Navigator>
	);
}

export { OrderNavigator };
