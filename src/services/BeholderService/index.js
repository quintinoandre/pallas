import { api } from '../BaseService';

async function getMemoryIndex(symbol, index, interval = '') {
	const response = await api.get(
		`/beholder/memory/${symbol}/${index}/${interval}`
	);

	return response.data;
}

async function getIndexes() {
	const response = await api.get(`/beholder/memory/indexes`);

	return response.data;
}

async function getAnalysisIndexes() {
	const response = await api.get(`/beholder/analysis`);

	return response.data;
}

export { getMemoryIndex, getIndexes, getAnalysisIndexes };
