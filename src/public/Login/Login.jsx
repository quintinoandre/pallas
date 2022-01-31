import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image, useTheme } from 'react-native-elements';

import logo from '../../../assets/logo.png';

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

function Login() {
	const { theme } = useTheme();

	return (
		<View style={styles.container}>
			<Image source={logo} style={styles.logo} />
			<Text style={theme.h1}>Sign in to our platform</Text>
		</View>
	);
}

export default Login;
