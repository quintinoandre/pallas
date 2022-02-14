import React from 'react';

import { Feather as Icon } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Dashboard from '../private/Dashboard/Dashboard';
import Logout from '../private/Logout/Logout';
import Reports from '../private/Reports/Reports';
import Settings from '../private/Settings/Settings';
import Wallet from '../private/Wallet/Wallet';
import AutomationNavigator from './AutomationNavigator';
import DrawerIcon from './DrawerIcon';
import MonitorNavigator from './MonitorNavigator';
import OrderNavigator from './OrderNavigator';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
	return (
		<Drawer.Navigator
			initialRouteName="Dashboard"
			screenOptions={{
				headerStyle: { backgroundColor: '#1F2937' },
				headerRight: () => (
					<Icon
						size={20}
						color="white"
						name="bell"
						style={{ marginRight: 10 }}
					/>
				),
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
				component={OrderNavigator}
				options={{ drawerIcon: (_config) => <DrawerIcon name="book-open" /> }}
			/>
			<Drawer.Screen
				name="Automations"
				component={AutomationNavigator}
				options={{ drawerIcon: (_config) => <DrawerIcon name="command" /> }}
			/>
			<Drawer.Screen
				name="Monitors"
				component={MonitorNavigator}
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
