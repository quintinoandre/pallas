import { REACT_APP_API_URL as API_URL } from '@env';

import { axios } from '../BaseService';

async function searchSymbols(search) {
	const searchSymbolsUrl = `${API_URL}/symbols/?search=${search}&page=1&pageSize=10&onlyFavorites=false`;

	const response = await axios.get(searchSymbolsUrl);

	return response.data;
}

async function getSymbol(symbol) {
	const getSymbolUrl = `${API_URL}/symbols/${symbol}`;

	const response = await axios.get(getSymbolUrl);

	return response.data;
}

export { searchSymbols, getSymbol };
