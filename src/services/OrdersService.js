import { REACT_APP_API_URL as API_URL } from '@env';

import axios from './BaseService';

async function getOrders(symbol, page = 1) {
	const getOrdersUrl = `${API_URL}/orders/${symbol}?page=${page}`;

	const response = await axios.get(getOrdersUrl);

	return response.data.rows;
}

export { getOrders };
