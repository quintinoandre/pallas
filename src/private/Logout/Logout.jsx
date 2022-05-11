import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

import { doLogout } from '../../services';

/**
 * props:
 * - navigation
 * - route
 */
function Logout({ ...props }) {
	useEffect(() => {
		doLogout()
			.then(() =>
				props.navigation.navigate('Login', {
					text: 'Logged out successfully!',
					type: 'info',
				})
			)
			.catch(() =>
				props.navigation.navigate('Login', {
					text: 'Logged out successfully!',
					type: 'info',
				})
			);
	}, []);

	return <ActivityIndicator />;
}

export { Logout };
