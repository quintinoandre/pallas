import React, { useEffect, useState } from 'react';
import { Badge, useTheme } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import { hasAlerts } from '../../services';
import { styles } from './styles';

/**
 * props:
 * - navigation
 */
function AlertsButton({ ...props }) {
	const { theme } = useTheme();

	const [showBadge, setShowBadge] = useState(false);

	function errorHandling(error) {
		alert(error.message);
	}

	useEffect(() => {
		hasAlerts()
			.then((result) => setShowBadge(result))
			.catch((error) => errorHandling(error));
	}, []);

	return (
		<>
			<Icon.Button
				name="bell"
				size={20}
				color="white"
				backgroundColor={theme.colors.primary}
				onPress={() => props.navigation.navigate('AlertsList')}
			/>
			{showBadge ? (
				<Badge status="success" containerStyle={styles.badge} />
			) : (
				<></>
			)}
		</>
	);
}

export { AlertsButton };
