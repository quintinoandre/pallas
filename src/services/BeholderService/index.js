import { REACT_APP_API_URL as API_URL } from '@env';

import { axios } from '../BaseService';

async function getMemoryIndex(symbol, index, interval = '') {
	const getMemoryIndexUrl = `${API_URL}/beholder/memory/${symbol}/${index}/${interval}`;

	const response = await axios.get(getMemoryIndexUrl);

	return response.data;
}

async function getIndexes() {
	const getIndexesUrl = `${API_URL}/beholder/memory/indexes`;

	const response = await axios.get(getIndexesUrl);

	return response.data;
}

async function getAnalysisIndexes() {
	const getAnalysisIndexesUrl = `${API_URL}/beholder/analysis`;

	const response = await axios.get(getAnalysisIndexesUrl);

	return response.data;
}

export { getMemoryIndex, getIndexes, getAnalysisIndexes };
