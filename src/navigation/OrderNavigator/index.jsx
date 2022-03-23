import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import NewOrder from '../../private/Orders/NewOrder';
import OrdersList from '../../private/Orders/OrdersList';
import OrdersView from '../../private/Orders/OrderView';

const Stack = createStackNavigator();

function OrderNavigator() {
	return (
		<Stack.Navigator
			initialRouteName="OrdersList"
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen name="OrdersList" component={OrdersList} />
			<Stack.Screen name="OrderView" component={OrdersView} />
			<Stack.Screen name="NewOrder" component={NewOrder} />
		</Stack.Navigator>
	);
}

export { OrderNavigator };
