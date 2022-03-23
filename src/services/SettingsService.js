import { REACT_APP_API_URL as API_URL } from '@env';

import axios from './BaseService';

const settingsUrl = `${API_URL}/settings`;

async function getUserAlerts() {
	const response = await axios.get(`${settingsUrl}/alerts`);

	return response.data;
}

async function getSettings() {
	const response = await axios.get(settingsUrl);

	return response.data;
}

async function updateSettings(settings) {
	const response = await axios.patch(settingsUrl, settings);

	return response.data;
}

export { getUserAlerts, getSettings, updateSettings };
