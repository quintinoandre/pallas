import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

import { doLogout } from '../../services/AuthService';

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
