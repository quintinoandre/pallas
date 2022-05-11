import { api } from '../BaseService';

async function getAllOrderTemplates(symbol) {
	const response = await api.get(`/orderTemplates/all/${symbol}`);

	return response.data;
}

async function deleteOrderTemplate(id) {
	const response = await api.delete(`/ordertemplates/${id}`);

	return response.data;
}

export { getAllOrderTemplates, deleteOrderTemplate };
