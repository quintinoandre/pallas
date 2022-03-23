import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme, Badge } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import { hasAlerts } from '../../services/AlertsService';

const styles = StyleSheet.create({
	badge: { position: 'absolute', top: 8, right: 20 },
});

/**
 * props:
 * - navigation
 */
function AlertsButton({ ...props }) {
	const { theme } = useTheme();

	const [showBadge, setShowBadge] = useState(false);

	function errorHandling(err) {
		alert(err.message);
	}

	useEffect(() => {
		hasAlerts()
			.then((result) => {
				setShowBadge(result);
			})
			.catch((err) => {
				errorHandling(err);
			});
	}, []);

	return (
		<>
			<Icon.Button
				name="bell"
				size={20}
				color="white"
				backgroundColor={theme.colors.primary}
				onPress={(_event) => props.navigation.navigate('AlertsList')}
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
