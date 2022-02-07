import React, { useState, useEffect } from 'react';
import { ScrollView, View, ActivityIndicator } from 'react-native';
import { useTheme, Input, Button } from 'react-native-elements';

import { Toast } from '../../components';
import { getSettings, updateSettings } from '../../services/SettingsService';

/**
 * props:
 * - navigation
 * - route
 */
function Settings({ ...props }) {
	const { theme } = useTheme();

	// eslint-disable-next-line no-unused-vars
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

	function clearScreen(_event) {
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
			.catch((err) => {
				clearScreen();

				setNotification({
					type: 'error',
					text: err.response ? err.response.data : err.message,
				});
			});
	}, []);

	function onSavePress(_event) {
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
			.then((_result) => {
				clearScreen();
				setNotification({
					type: 'success',
					text: 'Settings saved successfully!',
				});
			})
			.catch((err) => {
				clearScreen();

				setNotification({
					type: 'error',
					text: err.response ? err.response.data : err.message,
				});
			});
	}

	return (
		<ScrollView>
			<View style={theme.container}>
				<View style={theme.inputContainer}>
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
					<Input label="Limit Plan" placeholder="none" value={limit} disabled />
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
					<View>
						<Button
							title={isLoading ? <ActivityIndicator /> : 'Save Settings'}
							style={{ padding: 10 }}
							onPress={(event) => onSavePress(event)}
						/>
					</View>
				</View>
			</View>
			{notification ? (
				<Toast
					type={notification.type}
					text={notification.text}
					visible={!!notification.type}
					onDismiss={(event) => clearScreen(event)}
				/>
			) : (
				<></>
			)}
		</ScrollView>
	);
}

export default Settings;
