import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import Dashboard from '../private/Dashboard/Dashboard';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
	return (
		<Drawer.Navigator>
			<Drawer.Screen name="Dashboard" component={Dashboard} />
		</Drawer.Navigator>
	);
}

export default DrawerNavigator;
