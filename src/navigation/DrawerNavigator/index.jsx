import React, { useMemo } from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { AlertsButton } from '../../components';
import { Dashboard } from '../../private/Dashboard/Dashboard';
import { Logout } from '../../private/Logout/Logout';
import { Reports } from '../../private/Reports/Reports';
import { Settings } from '../../private/Settings/Settings';
import { Wallet } from '../../private/Wallet/Wallet';
import { AutomationNavigator } from '../AutomationNavigator';
import { DrawerIcon } from '../DrawerIcon';
import { MonitorNavigator } from '../MonitorNavigator';
import { OrderNavigator } from '../OrderNavigator';
import { OrderTemplateNavigator } from '../OrderTemplateNavigator';

const Drawer = createDrawerNavigator();

/**
 * props:
 * - navigation
 * - route
 */
function DrawerNavigator({ ...props }) {
	const alertsButton = useMemo(() => {
		return <AlertsButton navigation={props.navigation} />;
	}, [props.navigation]);

	return (
		<Drawer.Navigator
			initialRouteName="Dashboard"
			screenOptions={{
				headerStyle: { backgroundColor: '#1F2937' },
				headerRight: () => alertsButton,
				headerTintColor: '#fff',
				drawerStyle: { backgroundColor: '#1F2937' },
				drawerLabelStyle: { color: '#fff' },
			}}
		>
			<Drawer.Screen
				name="Dashboard"
				component={Dashboard}
				options={{ drawerIcon: () => <DrawerIcon name="pie-chart" /> }}
			/>
			<Drawer.Screen
				name="Reports"
				component={Reports}
				options={{ drawerIcon: () => <DrawerIcon name="activity" /> }}
			/>
			<Drawer.Screen
				name="Wallet"
				component={Wallet}
				options={{ drawerIcon: () => <DrawerIcon name="dollar-sign" /> }}
			/>
			<Drawer.Screen
				name="Orders"
				component={OrderNavigator}
				options={{ drawerIcon: () => <DrawerIcon name="book-open" /> }}
			/>
			<Drawer.Screen
				name="Automations"
				component={AutomationNavigator}
				options={{ drawerIcon: () => <DrawerIcon name="command" /> }}
			/>
			<Drawer.Screen
				name="Order Templates"
				component={OrderTemplateNavigator}
				options={{ drawerIcon: () => <DrawerIcon name="layout" /> }}
			/>
			<Drawer.Screen
				name="Monitors"
				component={MonitorNavigator}
				options={{ drawerIcon: () => <DrawerIcon name="monitor" /> }}
			/>
			<Drawer.Screen
				name="Settings"
				component={Settings}
				options={{ drawerIcon: () => <DrawerIcon name="settings" /> }}
			/>
			<Drawer.Screen
				name="Logout"
				component={Logout}
				options={{
					drawerIcon: () => <DrawerIcon name="log-out" />,
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

export { DrawerNavigator };
