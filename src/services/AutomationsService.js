import { REACT_APP_API_URL as API_URL } from '@env';

import axios from './BaseService';

const automationType = {
	SCHEDULED: 'scheduled',
	GRID: 'grid',
};

async function getAutomations(page = 1) {
	const getAutomationsUrl = `${API_URL}/automations/?page=${page}`;

	const response = await axios.get(getAutomationsUrl);

	return response.data.rows;
}

export { automationType, getAutomations };
