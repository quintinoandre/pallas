import { REACT_APP_API_URL as API_URL } from '@env';

import axios from './BaseService';

async function getAllOrderTemplates(symbol) {
	const getAllOrderTemplatesUrl = `${API_URL}/orderTemplates/all/${symbol}`;

	const response = await axios.get(getAllOrderTemplatesUrl);

	return response.data;
}

export { getAllOrderTemplates };
