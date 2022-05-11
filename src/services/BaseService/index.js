import axios from 'axios';

import { ORIGIN, REACT_APP_API_URL as baseURL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({ baseURL });

function configBaseService(navigator) {
	api.interceptors.request.use(
		async (config) => {
			config.headers.Authorization = await AsyncStorage.getItem('token');

			config.headers.Origin = ORIGIN;

			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	api.interceptors.response.use(
		(response) => response,

		(error) => {
			if (error.response && [401, 403].includes(error.response.status)) {
				//! Unauthorized
				return navigator.navigate('Login', {
					status: error.response.status,
					text: 'Provide a valid email and password!',
				});
			}

			return Promise.reject(error);
		}
	);
}

export { api, configBaseService };
