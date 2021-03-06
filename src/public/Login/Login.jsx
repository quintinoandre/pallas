import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect } from 'react';
import {
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
import { doLogin, updateSettings, configBaseService } from '../../services';
import { styles } from './styles';

/**
 * props:
 * - navigation
 * - route
 */
function Login({ ...props }) {
	const { theme } = useTheme();

	configBaseService(props.navigation);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [errorState, setErrorState] = useState('');
	const [info, setInfo] = useState('');

	function clearScreen() {
		if (!rememberMe) setEmail('');

		setPassword('');

		setErrorState('');

		setInfo('');

		setIsLoading(false);
	}

	useEffect(() => {
		if (props.route.params) {
			clearScreen();

			if (props.route.params.type === 'info') setInfo(props.route.params.text);
			else setErrorState(props.route.params.text);
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

			const response = await Notifications.getExpoPushTokenAsync();

			token = response.data;

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

	async function onSignInPress() {
		setIsLoading(true);

		if (rememberMe) AsyncStorage.setItem('email', email);
		else AsyncStorage.removeItem('email');

		try {
			const result = await doLogin(email, password);

			if (result) {
				let pushToken = await AsyncStorage.getItem('push');

				if (!pushToken || result.pushToken !== pushToken) {
					pushToken = await registerForPushNotificationsAsync();

					await updateSettings({ pushToken });
				}

				clearScreen();

				props.navigation.navigate('DrawerNavigator');
			}
		} catch (error) {
			clearScreen();

			setErrorState(error.response ? error.response.data : error.message);
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
						onChangeText={(event) => setEmail(event)}
						leftIcon={<Icon size={24} color="black" name="user" />}
					/>
					<Input
						placeholder="Your password"
						autoComplete="password"
						value={password}
						secureTextEntry
						onChangeText={(event) => setPassword(event)}
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
						onPress={onSignInPress}
					/>
					{errorState ? <Text style={theme.alert}>{errorState}</Text> : <></>}
					{info ? <Text style={theme.info}>{info}</Text> : <></>}
				</View>
			</View>
		</ScrollView>
	);
}

export { Login };
