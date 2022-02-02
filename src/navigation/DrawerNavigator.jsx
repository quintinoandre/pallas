import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import Automations from '../private/Automations/Automations';
import Dashboard from '../private/Dashboard/Dashboard';
import Logout from '../private/Logout/Logout';
import Monitors from '../private/Monitors/Monitors';
import Orders from '../private/Orders/Orders';
import Reports from '../private/Reports/Reports';
import Settings from '../private/Settings/Settings';
import Wallet from '../private/Wallet/Wallet';
import DrawerIcon from './DrawerIcon';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
	return (
		<Drawer.Navigator
			initialRouteName="Dashboard"
			screenOptions={{
				headerStyle: { backgroundColor: '#1F2937' },
				headerTintColor: '#fff',
				drawerStyle: { backgroundColor: '#1F2937' },
				drawerLabelStyle: { color: '#fff' },
			}}
		>
			<Drawer.Screen
				name="Dashboard"
				component={Dashboard}
				options={{ drawerIcon: (_config) => <DrawerIcon name="pie-chart" /> }}
			/>
			<Drawer.Screen
				name="Reports"
				component={Reports}
				options={{ drawerIcon: (_config) => <DrawerIcon name="activity" /> }}
			/>
			<Drawer.Screen
				name="Wallet"
				component={Wallet}
				options={{ drawerIcon: (_config) => <DrawerIcon name="dollar-sign" /> }}
			/>
			<Drawer.Screen
				name="Orders"
				component={Orders}
				options={{ drawerIcon: (_config) => <DrawerIcon name="book-open" /> }}
			/>
			<Drawer.Screen
				name="Automations"
				component={Automations}
				options={{ drawerIcon: (_config) => <DrawerIcon name="command" /> }}
			/>
			<Drawer.Screen
				name="Monitors"
				component={Monitors}
				options={{ drawerIcon: (_config) => <DrawerIcon name="monitor" /> }}
			/>
			<Drawer.Screen
				name="Settings"
				component={Settings}
				options={{ drawerIcon: (_config) => <DrawerIcon name="settings" /> }}
			/>
			<Drawer.Screen
				name="Logout"
				component={Logout}
				options={{
					drawerIcon: (_config) => <DrawerIcon name="log-out" />,
					drawerItemStyle: {
						borderTopColor: '#374151',
						borderStyle: 'solid',
						borderTopWidth: 1,
					},
				}}
			/>
		</Drawer.Navigator>
	);
}

export default DrawerNavigator;
