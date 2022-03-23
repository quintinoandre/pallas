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
		doLogout().then((_result) => {
			props.navigation.navigate('Login', {
				text: 'Logged out successfully!',
				type: 'info',
			});
		});
	}, []);

	return <ActivityIndicator />;
}

export default Logout;
