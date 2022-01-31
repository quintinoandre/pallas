import axios from 'axios';

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
