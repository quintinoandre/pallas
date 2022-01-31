import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import {
	Image,
	useTheme,
	Input,
	CheckBox,
	Button,
} from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import logo from '../../../assets/logo.png';
import { doLogin } from '../../services/AuthService';

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
	const [rememberMe, setRememberMe] = useState(false);

	const { theme } = useTheme();

	function onSignInPress(_event) {
		doLogin(email, password)
			.then((result) => {
				console.log(email, password, rememberMe);
			})
			.catch((err) => {
				console.error(err);
			});
	}

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
					<CheckBox
						title="Remember Me"
						checked={rememberMe}
						onPress={() => setRememberMe(!rememberMe)}
					/>
					<Button title="Sign In" onPress={(event) => onSignInPress(event)} />
				</View>
			</View>
		</ScrollView>
	);
}

export default Login;
