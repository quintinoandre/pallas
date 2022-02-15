import AsyncStorage from '@react-native-async-storage/async-storage';

async function getAlerts() {
	const response = await AsyncStorage.getItem('alerts');

	return response ? JSON.parse(response) : [];
}

async function saveAlert(alert) {
	const alerts = await getAlerts();

	alerts.push(alert);

	return AsyncStorage.setItem('alerts', JSON.stringify(alerts));
}

async function hasAlerts() {
	const response = await AsyncStorage.getItem('alerts');

	if (!response) return false;

	return JSON.parse(response).length > 0;
}

async function deleteAllAlerts() {
	return AsyncStorage.removeItem('alerts');
}

export { getAlerts, saveAlert, hasAlerts, deleteAllAlerts };
