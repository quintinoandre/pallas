import { api } from '../BaseService';

async function getFullBalance(fiat) {
	const response = await api.get(`/exchange/balance/full/${fiat}`);

	return response.data;
}

export { getFullBalance };
