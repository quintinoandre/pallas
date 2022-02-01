import axios from 'axios';

import { ORIGIN } from '@env';

axios.interceptors.request.use(
	(config) => {
		config.headers.Origin = ORIGIN;
		return config;
	},
	(error) => {}
);

axios.interceptors.response.use(
	(response) => response,

	(error) => {
		if (error.response) {
			switch (error.response.status) {
				case 401:
					console.error('Redirected to login by 401 response!'); //! Unauthorized
					break;
				default:
					return Promise.reject(error);
			}
		}
	}
);

export default axios;
