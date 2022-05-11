import AsyncStorage from '@react-native-async-storage/async-storage';

import { api } from '../BaseService';

async function doLogin(email, password) {
	const response = await api.post('/login', { email, password });

	if (response && response.data) {
		await AsyncStorage.setItem('token', response.data.token);

		return response.data;
	}

	throw new Error('Provide a valid email and password!');
}

async function doLogout() {
	const response = await api.post('/logout', {});

	await AsyncStorage.removeItem('token');

	return response ? response.data : true;
}

export { doLogin, doLogout };
