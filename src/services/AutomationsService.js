import { REACT_APP_API_URL as API_URL } from '@env';

import axios from './BaseService';

const automationType = {
	SCHEDULE: 'schedule',
	GRID: 'grid',
};

const actionType = {
	ALERT_EMAIL: 'ALERT_EMAIL',
	ALERT_SMS: 'ALERT_SMS',
	ALERT_TELEGRAM: 'ALERT_TELEGRAM',
	ORDER: 'ORDER',
	TRAILING: 'TRAILING',
	WITHDRAW: 'WITHDRAW',
};

async function getAutomations(page = 1) {
	const getAutomationsUrl = `${API_URL}/automations/?page=${page}`;

	const response = await axios.get(getAutomationsUrl);

	return response.data.rows;
}

async function startAutomation(id) {
	const startAutomationUrl = `${API_URL}/automations/${id}/start`;

	const response = await axios.post(startAutomationUrl, {});

	return response.data;
}

async function stopAutomation(id) {
	const stopAutomationUrl = `${API_URL}/automations/${id}/stop`;

	const response = await axios.post(stopAutomationUrl, {});

	return response.data;
}

async function deleteAutomation(id) {
	const deleteAutomationUrl = `${API_URL}/automations/${id}/delete`;

	const response = await axios.delete(deleteAutomationUrl);

	return response.data;
}

export {
	automationType,
	actionType,
	getAutomations,
	startAutomation,
	stopAutomation,
	deleteAutomation,
};
