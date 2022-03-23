import axios from 'axios';

import { ORIGIN } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function configBaseService(navigator) {
	axios.interceptors.request.use(
		async (config) => {
			config.headers.Authorization = await AsyncStorage.getItem('token');

			config.headers.Origin = ORIGIN;

			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	axios.interceptors.response.use(
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

export { axios };
