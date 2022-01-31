import { REACT_APP_API_URL } from '@env';

import axios from './BaseService';

const API_URL = REACT_APP_API_URL;

async function doLogin(email, password) {
	const doLoginUrl = `${API_URL}/login`;

	const response = await axios.post(doLoginUrl, { email, password });

	return response.data;
}

async function doLogout(token) {
	const doLogoutUrl = `${API_URL}/logout`;

	const headers = { authorization: token };

	const response = await axios.post(doLogoutUrl, {}, { headers });

	return response.data;
}

export { doLogin, doLogout };
