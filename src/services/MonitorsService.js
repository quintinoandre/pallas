import { REACT_APP_API_URL as API_URL } from '@env';

import axios from './BaseService';

const monitorType = {
	BOOK: 'BOOK',
	CANDLES: 'CANDLES',
	MINI_TICKER: 'MINI_TICKER',
	TICKER: 'TICKER',
	USER_DATA: 'USER_DATA',
};

async function getMonitors(page = 1) {
	const getMonitorsUrl = `${API_URL}/monitors/?page=${page}`;

	const response = await axios.get(getMonitorsUrl);

	return response.data.rows;
}

async function startMonitor(id) {
	const startMonitorUrl = `${API_URL}/monitors/${id}/start`;

	const response = await axios.post(startMonitorUrl, {});

	return response.data;
}

async function stopMonitor(id) {
	const stopMonitorUrl = `${API_URL}/monitors/${id}/stop`;

	const response = await axios.post(stopMonitorUrl, {});

	return response.data;
}

async function deleteMonitor(id) {
	const deleteMonitorUrl = `${API_URL}/monitors/${id}`;

	const response = await axios.delete(deleteMonitorUrl);

	return response.data;
}

async function saveMonitor(id, newMonitor) {
	const saveMonitorUrl = id
		? `${API_URL}/monitors/${id}`
		: `${API_URL}/monitors`;

	const response = id
		? await axios.patch(saveMonitorUrl, newMonitor)
		: await axios.post(saveMonitorUrl, newMonitor);

	return response.data;
}

export {
	monitorType,
	getMonitors,
	startMonitor,
	stopMonitor,
	deleteMonitor,
	saveMonitor,
};
