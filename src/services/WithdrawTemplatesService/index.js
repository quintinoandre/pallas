import { api } from '../BaseService';

async function getWithdrawTemplates(coin, page) {
	const response = await api.get(`/withdrawTemplates/${coin}?page=${page}`);

	return response.data.rows;
}

export { getWithdrawTemplates };
