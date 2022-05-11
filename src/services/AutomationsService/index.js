import { api } from '../BaseService';

async function getAutomations(page = 1) {
	const response = await api.get(`/automations/?page=${page}`);

	return response.data.rows;
}

async function startAutomation(id) {
	const response = await api.post(`/automations/${id}/start`, {});

	return response.data;
}

async function stopAutomation(id) {
	const response = await api.post(`/automations/${id}/stop`, {});

	return response.data;
}

async function deleteAutomation(id) {
	const response = await api.delete(`/automations/${id}`);

	return response.data;
}

async function saveAutomation(id, newAutomation) {
	let response;

	if (id) response = await api.patch(`/automations/${id}`, newAutomation);
	else response = await api.post('/automations', newAutomation);

	return response.data;
}

async function saveGrid(id, newAutomation, levels, quantity) {
	let response;

	if (id)
		response = await api.patch(
			`/automations/${id}?levels=${levels}&quantity=${quantity}`,
			newAutomation
		);
	else
		response = await api.post(
			`/automations/?levels=${levels}&quantity=${quantity}`,
			newAutomation
		);

	return response.data;
}

export {
	getAutomations,
	startAutomation,
	stopAutomation,
	deleteAutomation,
	saveAutomation,
	saveGrid,
};
