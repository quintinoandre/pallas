import React, { useState, useEffect } from 'react';
import { ScrollView, View, ActivityIndicator } from 'react-native';
import { useTheme, Input, Button } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import { Toast } from '../../components';
import { getSettings, updateSettings } from '../../services';
import { styles } from './styles';

/**
 * props:
 * - navigation
 * - route
 */
function Settings() {
	const { theme } = useTheme();

	const [limit, setLimit] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [phone, setPhone] = useState('');
	const [telegramChat, setTelegramChat] = useState('');
	const [accessKey, setAccessKey] = useState('');
	const [secretKey, setSecretKey] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [notification, setNotification] = useState(null);

	function clearScreen() {
		setSecretKey('');

		setPassword('');

		setConfirmPassword('');

		setIsLoading(false);

		setNotification(null);
	}

	useEffect(() => {
		getSettings()
			.then((settings) => {
				setName(settings.name);

				setEmail(settings.email);

				setPhone(settings.phone);

				setTelegramChat(settings.telegramChat);

				setAccessKey(settings.accessKey);

				setLimit(settings.limit.name || 'none');

				clearScreen();
			})
			.catch((error) => {
				clearScreen();

				setNotification({
					type: 'error',
					text: error.response ? error.response.data : error.message,
				});
			});
	}, []);

	function onSavePress() {
		setIsLoading(true);

		if (password && password !== confirmPassword)
			return setNotification({
				type: 'error',
				text: 'Password and Confirm Password must be equals!',
			});

		updateSettings({
			name,
			email,
			password,
			telegramChat,
			phone,
			accessKey,
			secretKey,
		})
			.then(() => {
				clearScreen();
				setNotification({
					type: 'success',
					text: 'Settings saved successfully!',
				});
			})
			.catch((error) => {
				clearScreen();

				setNotification({
					type: 'error',
					text: error.response ? error.response.data : error.message,
				});
			});
	}

	return (
		<View style={theme.page}>
			<View style={theme.container}>
				<View style={theme.inputContainer}>
					<ScrollView>
						<Input
							label="Name"
							placeholder="John Doe"
							autoComplete="name"
							autoCapitalize="words"
							onChangeText={(event) => setName(event)}
							value={name}
						/>
						<Input
							label="Email"
							placeholder="contact@domain.com"
							autoComplete="email"
							autoCapitalize="none"
							keyboardType="email-address"
							onChangeText={(event) => setEmail(event)}
							value={email}
						/>
						<Input
							label="Limit Plan"
							placeholder="none"
							value={limit}
							disabled
						/>
						<Input
							label="New Password"
							autoComplete="password-new"
							autoCapitalize="none"
							onChangeText={(event) => setPassword(event)}
							value={password}
							secureTextEntry
						/>
						{password ? (
							<Input
								label="Confirm Password"
								autoCapitalize="none"
								onChangeText={(event) => setConfirmPassword(event)}
								value={confirmPassword}
								secureTextEntry
							/>
						) : (
							<></>
						)}
						<Input
							label="Cellphone"
							placeholder="+351123456789"
							autoComplete="tel"
							keyboardType="phone-pad"
							onChangeText={(event) => setPhone(event)}
							value={phone}
						/>
						<Input
							label="Telegram Chat ID"
							placeholder="-12345678"
							keyboardType="numeric"
							onChangeText={(event) => setTelegramChat(event)}
							value={telegramChat}
						/>
						<Input
							label="Access Key"
							placeholder="Your access key"
							autoComplete="none"
							onChangeText={(event) => setAccessKey(event)}
							value={accessKey}
						/>
						<Input
							label="Secret Key"
							placeholder="Your secret key"
							autoComplete="none"
							onChangeText={(event) => setSecretKey(event)}
							value={secretKey}
							secureTextEntry
						/>
					</ScrollView>
				</View>
			</View>
			<View>
				<Button
					icon={() => <Icon name="save" size={20} color="white" />}
					title={isLoading ? <ActivityIndicator /> : ' Save Settings'}
					style={styles.button}
					onPress={onSavePress}
				/>
			</View>
			{notification ? (
				<Toast
					type={notification.type}
					text={notification.text}
					visible={!!notification.type}
					onDismiss={clearScreen}
				/>
			) : (
				<></>
			)}
		</View>
	);
}

export { Settings };
