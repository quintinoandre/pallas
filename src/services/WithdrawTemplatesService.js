import { REACT_APP_API_URL as API_URL } from '@env';

import axios from './BaseService';

async function getWithdrawTemplates(coin, page) {
	const getWithdrawTemplatesUrl = `${API_URL}/withdrawTemplates/${coin}?page=${page}`;

	const response = await axios.get(getWithdrawTemplatesUrl);

	return response.data.rows;
}

export { getWithdrawTemplates };
