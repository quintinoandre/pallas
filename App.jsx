import React from 'react';
import { ThemeProvider } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Login from './src/public/Login/Login';
import theme from './Theme';

export default function App() {
	return (
		<SafeAreaProvider>
			<ThemeProvider theme={theme}>
				<Login />
			</ThemeProvider>
		</SafeAreaProvider>
	);
}
