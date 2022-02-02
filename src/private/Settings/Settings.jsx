import React, { useState, useEffect } from 'react';
import { ScrollView, View, ActivityIndicator } from 'react-native';
import { useTheme, Input, Button } from 'react-native-elements';

import Toast from '../../components/Toast/Toast';
import { getSettings, updateSettings } from '../../services/SettingsService';

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

	function clearScreen() {
		setSecretKey('');

		setPassword('');

		setConfirmPassword('');

		setIsLoading(false);
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

				console.log(err);
			});
	}, []);

	function onSavePress(_event) {
		setIsLoading(true);

		setTimeout(() => {
			setIsLoading(false);
		}, 2000);
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
					<Button
						title={isLoading ? <ActivityIndicator /> : 'Save Settings'}
						style={{ padding: 10 }}
						onPress={(event) => onSavePress(event)}
					/>
				</View>
			</View>
			<Toast type="error" text="Test of error" visible />
		</ScrollView>
	);
}

export default Settings;
