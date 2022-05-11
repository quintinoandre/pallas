import { api } from '../BaseService';

async function getAllOrderTemplates(symbol) {
	const response = await api.get(`/orderTemplates/all/${symbol}`);

	return response.data;
}

async function deleteOrderTemplate(id) {
	const response = await api.delete(`/ordertemplates/${id}`);

	return response.data;
}

async function getOrderTemplates(symbol = '', page = 1) {
	const response = await api.get(
		`/orderTemplates/${symbol || ''}?page=${page}`
	);

	return response.data; // {count, rows}
}

export { getAllOrderTemplates, deleteOrderTemplate, getOrderTemplates };
