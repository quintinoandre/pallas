import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme, Badge } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

const styles = StyleSheet.create({
	badge: { position: 'absolute', top: 8, right: 20 },
});

/**
 * props:
 * - navigation
 */
function AlertButton({ ...props }) {
	const { theme } = useTheme();

	const [showBadge, setShowBadge] = useState(false);

	useEffect(() => {
		setShowBadge(false);
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

export { AlertButton };
