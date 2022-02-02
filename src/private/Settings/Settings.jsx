import React, { useState, useEffect } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { useTheme } from 'react-native-elements';

function Settings({ ...props }) {
	const { theme } = useTheme();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [phone, setPhone] = useState('');
	const [telegramChat, setTelegramChat] = useState('');
	const [accessKey, setAccessKey] = useState('');
	const [secretKey, setSecretKey] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	return (
		<ScrollView>
			<View style={theme.container}>
				<View style={theme.inputContainer}>
					<Text>Settings</Text>
				</View>
			</View>
		</ScrollView>
	);
}

export default Settings;
