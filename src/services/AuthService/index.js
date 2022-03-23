import { REACT_APP_API_URL as API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { axios } from '../BaseService';

async function doLogin(email, password) {
	const doLoginUrl = `${API_URL}/login`;

	const response = await axios.post(doLoginUrl, { email, password });

	if (response && response.data) {
		await AsyncStorage.setItem('token', response.data.token);

		return response.data;
	}

	throw new Error('Provide a valid email and password!');
}

async function doLogout() {
	const doLogoutUrl = `${API_URL}/logout`;

	const response = await axios.post(doLogoutUrl, {});

	await AsyncStorage.removeItem('token');

	return response.data;
}

export { doLogin, doLogout };
