import { ORDER_TYPE } from '../../enums';
import { api } from '../BaseService';

async function getOrders(symbol, page = 1) {
	const response = await api.get(`/orders/${symbol}?page=${page}`);

	return response.data.rows;
}

async function getOrder(orderId, clientOrderId) {
	const response = await api.get(`/orders/${orderId}/${clientOrderId}`);

	return response.data;
}

async function syncOrder(beholderOrderId) {
	const response = await api.post(`/orders/${beholderOrderId}/sync`, null);

	return response.data;
}

async function cancelOrder(symbol, orderId) {
	const response = await api.delete(`/orders/${symbol}/${orderId}`);

	return response.data;
}

async function placeOrder(order) {
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
			ORDER_TYPE.LIMIT,
			ORDER_TYPE.STOP_LOSS_LIMIT,
			ORDER_TYPE.TAKE_PROFIT_LIMIT,
			ORDER_TYPE.TRAILING_STOP,
		].includes(postOrder.options.type)
	)
		postOrder.limitPrice = order.limitPrice;

	if (postOrder.options.type === ORDER_TYPE.ICEBERG)
		postOrder.options.icebergQty = order.icebergQty;

	if (
		[ORDER_TYPE.STOP_LOSS_LIMIT, ORDER_TYPE.TAKE_PROFIT_LIMIT].includes(
			postOrder.options.type
		)
	)
		postOrder.options.stopPrice = order.stopPrice;

	if (postOrder.options.type === ORDER_TYPE.TRAILING_STOP)
		postOrder.options.stopPriceMultiplier = order.stopPriceMultiplier;

	const response = await api.post(`/orders`, postOrder);

	return response.data;
}

function thirtyDaysAgo() {
	const date = new Date();

	date.setUTCDate(date.getUTCDate() - 30);

	date.setUTCHours(0, 0, 0, 0);

	return date.getTime();
}

function getEndToday() {
	const date = new Date();

	date.setUTCHours(23, 59, 59, 999);

	return date.getTime();
}

function getStartToday() {
	const date = new Date();

	date.setUTCHours(0, 0, 0, 0);

	return date.getTime();
}

async function getOrdersReport(quote, startDate, endDate) {
	startDate = startDate || thirtyDaysAgo();

	endDate = endDate || getEndToday();

	const response = await api.get(
		`/orders/reports/${quote}?startDate=${startDate}&endDate=${endDate}`
	);

	return response.data;
}

async function getDayTradeReport(quote, date) {
	date = date || getStartToday();

	const response = await api.get(`/orders/reports/${quote}?date=${date}`);

	return response.data;
}

export {
	getOrders,
	getOrder,
	syncOrder,
	cancelOrder,
	placeOrder,
	thirtyDaysAgo,
	getOrdersReport,
	getDayTradeReport,
};
