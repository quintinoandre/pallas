import * as Notifications from 'expo-notifications';
import React from 'react';
import { ThemeProvider } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';

import StackNavigator from './src/navigation/StackNavigator';
import { saveAlert } from './src/services/AlertsService';
import theme from './Theme';

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: true,
	}),
});

export default function App() {
	function processNotification(notification) {
		const alert = { ...notification.request.content.data, date: Date.now() };

		saveAlert(alert);
	}

	Notifications.addNotificationReceivedListener(processNotification);

	Notifications.addNotificationResponseReceivedListener(processNotification);

	return (
		<SafeAreaProvider>
			<ThemeProvider theme={theme}>
				<NavigationContainer>
					<StackNavigator />
				</NavigationContainer>
			</ThemeProvider>
		</SafeAreaProvider>
	);
}
