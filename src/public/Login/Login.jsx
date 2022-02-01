import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	ActivityIndicator,
} from 'react-native';
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
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const { theme } = useTheme();

	function clearScreen() {
		setEmail('');
		setPassword('');
		setRememberMe(false);
		setIsLoading(false);
	}

	useEffect(() => {
		clearScreen();
	}, []);

	function onSignInPress(_event) {
		setIsLoading(true);

		doLogin(email, password)
			.then((result) => {
				console.log(email, password, rememberMe);

				clearScreen();
			})
			.catch((err) => {
				clearScreen();
				setError(err.response ? err.response.data : err.message);
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
					<Button
						title={isLoading ? <ActivityIndicator /> : 'Sign In'}
						onPress={(event) => onSignInPress(event)}
					/>
					{error ? <Text style={theme.alert}>{error}</Text> : <></>}
				</View>
			</View>
		</ScrollView>
	);
}

export default Login;
