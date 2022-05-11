import { api } from '../BaseService';

async function searchSymbols(search) {
	const response = await api.get(
		`/symbols/?search=${search}&page=1&pageSize=10&onlyFavorites=false`
	);

	return response.data;
}

async function getSymbol(symbol) {
	const response = await api.get(`/symbols/${symbol}`);

	return response.data;
}

export { searchSymbols, getSymbol };
