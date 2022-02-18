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

const orderType = {
	LIMIT: 'LIMIT',
	MARKET: 'MARKET',
	STOP_LOSS_LIMIT: 'STOP_LOSS_LIMIT',
	TAKE_PROFIT_LIMIT: 'TAKE_PROFIT_LIMIT',
	TRAILING_STOP: 'TRAILING_STOP',
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

async function placeOrder(order) {
	const placeOrderUrl = `${API_URL}/orders`;

	const postOrder = {
		symbol: order.symbol.toUpperCase(),
		quantity: order.quantity,
		side: order.side.toUpperCase(),
		options: {
			type: order.type.toUpperCase(),
		},
	};

	if (
		[
			orderType.LIMIT,
			orderType.STOP_LOSS_LIMIT,
			orderType.TAKE_PROFIT_LIMIT,
			orderType.TRAILING_STOP,
		].includes(postOrder.options.type)
	)
		postOrder.limitPrice = order.limitPrice;

	if (postOrder.options.type === orderType.ICEBERG)
		postOrder.options.icebergQty = order.icebergQty;

	if (
		[orderType.STOP_LOSS_LIMIT, orderType.TAKE_PROFIT_LIMIT].includes(
			postOrder.options.type
		)
	)
		postOrder.options.stopPrice = order.stopPrice;

	if (postOrder.options.type === orderType.TRAILING_STOP)
		postOrder.options.stopPriceMultiplier = order.stopPriceMultiplier;

	const response = await axios.post(placeOrderUrl, postOrder);

	return response.data;
}

function thirtyDaysAgo() {
	const date = new Date();

	date.setUTCDate(date.getUTCDate() - 30);

	date.setUTCHours(0, 0, 0, 0);

	return date.getTime();
}

export {
	orderStatus,
	orderSide,
	orderType,
	getOrders,
	getOrder,
	syncOrder,
	cancelOrder,
	placeOrder,
	thirtyDaysAgo,
};
