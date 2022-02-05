import { REACT_APP_API_URL as API_URL } from '@env';

import axios from './BaseService';

const orderStatus = {
	CANCELED: 'CANCELED',
	EXPIRED: 'EXPIRED',
	FILLED: 'FILLED',
	PARTIALLY_FILLED: 'PARTIALLY_FILLED',
	REJECTED: 'REJECTED',
};

async function getOrders(symbol, page = 1) {
	const getOrdersUrl = `${API_URL}/orders/${symbol}?page=${page}`;

	const response = await axios.get(getOrdersUrl);

	return response.data.rows;
}

export { getOrders, orderStatus };
