import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native-elements';

import logo from './assets/logo.png';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	logo: {
		width: 100,
		height: 100,
		marginTop: 50,
	},
});

export default function App() {
	return (
		<View style={styles.container}>
			<Image source={logo} style={styles.logo} />
			<Text>Hello World!</Text>
			<StatusBar style="auto" />
		</View>
	);
}
