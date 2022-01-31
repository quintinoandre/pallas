import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Image, useTheme, Input } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import logo from '../../../assets/logo.png';

const styles = StyleSheet.create({
	logo: {
		width: 100,
		height: 100,
		marginTop: 50,
	},
});

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { theme } = useTheme();

	return (
		<ScrollView style={{ backgroundColor: theme.backgroundColor }}>
			<View style={theme.container}>
				<Image source={logo} style={styles.logo} />
				<Text style={theme.h1}>Sign in to our platform</Text>
				<View style={theme.inputContainer}>
					<Input
						placeholder="Your email"
						autoComplete="email"
						autoCapitalize="none"
						keyboardType="email-address"
						value={email}
						onChangeText={(text) => setEmail(text)}
						leftIcon={<Icon size={24} color="black" name="user" />}
					/>
					<Input
						placeholder="Your password"
						autoComplete="password"
						value={password}
						secureTextEntry
						onChangeText={(text) => setPassword(text)}
						leftIcon={<Icon size={24} color="black" name="key" />}
					/>
				</View>
			</View>
		</ScrollView>
	);
}

export default Login;
