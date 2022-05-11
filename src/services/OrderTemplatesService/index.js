import { api } from '../BaseService';

async function getAllOrderTemplates(symbol) {
	const response = await api.get(`/orderTemplates/all/${symbol}`);

	return response.data;
}

export { getAllOrderTemplates };
