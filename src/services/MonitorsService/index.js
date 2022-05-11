import { api } from '../BaseService';

async function getMonitors(page = 1) {
	const response = await api.get(`/monitors/?page=${page}`);

	return response.data.rows;
}

async function getMonitorsBySymbol(symbol) {
	const response = await api.get(`/monitors/?symbol=${symbol}`);

	return response.data.rows;
}

async function startMonitor(id) {
	const response = await api.post(`/monitors/${id}/start`, {});

	return response.data;
}

async function stopMonitor(id) {
	const response = await api.post(`/monitors/${id}/stop`, {});

	return response.data;
}

async function deleteMonitor(id) {
	const response = await api.delete(`/monitors/${id}`);

	return response.data;
}

async function saveMonitor(id, newMonitor) {
	let response;

	if (id) response = await api.patch(`/monitors/${id}`, newMonitor);
	else response = await api.post(`/monitors`, newMonitor);

	return response.data;
}

export {
	getMonitors,
	getMonitorsBySymbol,
	startMonitor,
	stopMonitor,
	deleteMonitor,
	saveMonitor,
};
