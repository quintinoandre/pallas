import AsyncStorage from '@react-native-async-storage/async-storage';

import { getUserAlerts } from './SettingsService';

const alertType = {
	error: 'error',
	success: 'success',
	info: 'info',
};

async function saveAlert(alert) {
	const alerts = await AsyncStorage.getItem('alerts');

	const savedAlerts = JSON.parse(alerts) || [];

	if (Array.isArray(alert)) savedAlerts.push(...alert);
	else savedAlerts.push(alert);

	return AsyncStorage.setItem('alerts', JSON.stringify(savedAlerts));
}

async function loadAlerts() {
	const alerts = await getUserAlerts();

	await saveAlert(alerts);

	return alerts;
}

async function getAlerts() {
	await loadAlerts();

	const response = await AsyncStorage.getItem('alerts');

	return response ? JSON.parse(response) : [];
}

async function hasAlerts() {
	const response = await getAlerts();

	if (!response) return false;

	return response.length > 0;
}

async function deleteAllAlerts() {
	return AsyncStorage.removeItem('alerts');
}

export {
	alertType,
	saveAlert,
	loadAlerts,
	getAlerts,
	hasAlerts,
	deleteAllAlerts,
};
