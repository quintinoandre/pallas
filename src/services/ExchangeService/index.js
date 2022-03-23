import { REACT_APP_API_URL as API_URL } from '@env';

import { axios } from '../BaseService';

async function getFullBalance(fiat) {
	const getFullBalanceUrl = `${API_URL}/exchange/balance/full/${fiat}`;

	const response = await axios.get(getFullBalanceUrl);

	return response.data;
}

export { getFullBalance };
