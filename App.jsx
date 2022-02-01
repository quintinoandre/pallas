import React from 'react';
import { ThemeProvider } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';

import StackNavigator from './src/navigation/StackNavigator';
import Login from './src/public/Login/Login';
import theme from './Theme';

export default function App() {
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
