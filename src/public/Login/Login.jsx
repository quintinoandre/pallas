import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	ActivityIndicator,
	Platform,
} from 'react-native';
import {
	Image,
	useTheme,
	Input,
	CheckBox,
	Button,
} from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import logo from '../../../assets/logo.png';
import { doLogin } from '../../services/AuthService';
import { configBaseService } from '../../services/BaseService';
import { updateSettings } from '../../services/SettingsService';

const styles = StyleSheet.create({
	logo: {
		width: 100,
		height: 100,
		marginTop: 50,
	},
});

/**
 * props:
 * - navigation
 * - route
 */
function Login({ ...props }) {
	configBaseService(props.navigation);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [info, setInfo] = useState('');

	const { theme } = useTheme();

	function clearScreen() {
		if (!rememberMe) setEmail('');

		setPassword('');

		setError('');

		setInfo('');

		setIsLoading(false);
	}

	useEffect(() => {
		if (props.route.params) {
			clearScreen();

			if (props.route.params.type === 'info') setInfo(props.route.params.text);
			else setError(props.route.params.text);
		}

		AsyncStorage.getItem('email').then((result) => {
			if (result) {
				setEmail(result);

				setRememberMe(true);
			}
		});
	}, [props.route.params]);

	async function registerForPushNotificationsAsync() {
		let token;

		if (Device.isDevice) {
			const { status: existingStatus } =
				await Notifications.getPermissionsAsync();

			let finalStatus = existingStatus;

			if (existingStatus !== 'granted') {
				const { status } = await Notifications.requestPermissionsAsync();

				finalStatus = status;
			}

			if (finalStatus !== 'granted') {
				alert('Failed to get push token for push notification!');

				return;
			}

			token = (await Notifications.getExpoPushTokenAsync()).data;

			AsyncStorage.setItem('push', token);
		} else {
			alert('Must use physical device for Push Notifications');
		}

		if (Platform.OS === 'android') {
			Notifications.setNotificationChannelAsync('default', {
				name: 'default',
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: '#FF231F7C',
			});
		}

		return token;
	}

	async function onSignInPress(_event) {
		setIsLoading(true);

		if (rememberMe) AsyncStorage.setItem('email', email);
		else AsyncStorage.removeItem('email');

		try {
			const result = await doLogin(email, password);

			if (result) {
				/* let pushToken = await AsyncStorage.getItem('push');

				if (!pushToken || result.pushToken !== pushToken) {
					pushToken = await registerForPushNotificationsAsync();

					updateSettings({ pushToken });
				} */

				clearScreen();

				props.navigation.navigate('DrawerNavigator');
			}
		} catch (err) {
			clearScreen();

			setError(err.response ? err.response.data : err.message);
		}
	}

	return (
		<ScrollView style={{ backgroundColor: theme.backgroundColor }}>
			<View style={theme.container}>
				<Image source={logo} style={styles.logo} />
				<Text style={theme.h1}>Sign in to our platform</Text>
				<View style={{ ...theme.inputContainer, marginTop: 30 }}>
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
						style={{ padding: 10 }}
						onPress={(event) => onSignInPress(event)}
					/>
					{error ? <Text style={theme.alert}>{error}</Text> : <></>}
					{info ? <Text style={theme.info}>{info}</Text> : <></>}
				</View>
			</View>
		</ScrollView>
	);
}

export default Login;
