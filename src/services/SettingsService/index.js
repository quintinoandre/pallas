import { api } from '../BaseService';

async function getUserAlerts() {
	const response = await api.get('/settings/alerts');

	return response ? response.data : null;
}

async function getSettings() {
	const response = await api.get('/settings');

	return response.data;
}

async function updateSettings(settings) {
	const response = await api.patch('/settings', settings);

	return response.data;
}

export { getUserAlerts, getSettings, updateSettings };
