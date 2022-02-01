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
		if (error.response && error.response.status === 401)
			return Promise.reject(new Error('Provide a valid email and password!'));
		//! Unauthorized
		return Promise.reject(error);
	}
);

export default axios;
