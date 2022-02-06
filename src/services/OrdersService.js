import { REACT_APP_API_URL as API_URL } from '@env';

import axios from './BaseService';

const orderStatus = {
	CANCELED: 'CANCELED',
	EXPIRED: 'EXPIRED',
	FILLED: 'FILLED',
	NEW: 'NEW',
	PARTIALLY_FILLED: 'PARTIALLY_FILLED',
	REJECTED: 'REJECTED',
};

const orderSide = {
	BUY: 'BUY',
	SELL: 'SELL',
};

async function getOrders(symbol, page = 1) {
	const getOrdersUrl = `${API_URL}/orders/${symbol}?page=${page}`;

	const response = await axios.get(getOrdersUrl);

	return response.data.rows;
}

async function getOrder(orderId, clientOrderId) {
	const getOrderUrl = `${API_URL}/orders/${orderId}/${clientOrderId}`;

	const response = await axios.get(getOrderUrl);

	return response.data;
}

async function syncOrder(beholderOrderId) {
	const syncOrderUrl = `${API_URL}/orders/${beholderOrderId}/sync`;

	const response = await axios.post(syncOrderUrl, null);

	return response.data;
}

async function cancelOrder(symbol, orderId) {
	const syncOrderUrl = `${API_URL}/orders/${symbol}/${orderId}`;

	const response = await axios.delete(syncOrderUrl);

	return response.data;
}

export { orderStatus, orderSide, getOrders, getOrder, syncOrder, cancelOrder };
