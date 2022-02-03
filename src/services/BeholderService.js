import { REACT_APP_API_URL as API_URL } from '@env';

import axios from './BaseService';

async function getMemoryIndex(symbol, index, interval = '') {
	const getMemoryIndexUrl = `${API_URL}/beholder/memory/${symbol}/${index}/${interval}`;

	const response = await axios.get(getMemoryIndexUrl);

	return response.data;
}

export { getMemoryIndex };