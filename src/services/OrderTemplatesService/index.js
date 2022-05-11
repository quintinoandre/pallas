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

async function saveOrderTemplate(id, newOrderTemplate) {
	const regex = /^(\d+([,.]\d+)?)$/;

	if (
		typeof newOrderTemplate.quantityMultiplier !== 'string' &&
		regex.test(newOrderTemplate.quantityMultiplier)
	)
		newOrderTemplate.quantityMultiplier = Number(
			newOrderTemplate.quantityMultiplier.replace(',', '.')
		);

	if (
		typeof newOrderTemplate.limitPriceMultiplier !== 'string' &&
		regex.test(newOrderTemplate.limitPriceMultiplier)
	)
		newOrderTemplate.limitPriceMultiplier = Number(
			newOrderTemplate.limitPriceMultiplier.replace(',', '.')
		);

	if (
		typeof newOrderTemplate.stopPriceMultiplier !== 'string' &&
		regex.test(newOrderTemplate.stopPriceMultiplier)
	)
		newOrderTemplate.stopPriceMultiplier = Number(
			newOrderTemplate.stopPriceMultiplier.replace(',', '.')
		);

	let response;

	if (id) response = await api.patch(`/orderTemplates/${id}`, newOrderTemplate);
	else response = await api.post(`/orderTemplates`, newOrderTemplate);

	return response.data;
}

export {
	getAllOrderTemplates,
	deleteOrderTemplate,
	getOrderTemplates,
	saveOrderTemplate,
};
