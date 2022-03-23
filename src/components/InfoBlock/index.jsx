import React from 'react';
import { Text } from 'react-native';
import { useTheme } from 'react-native-elements';

import { Block } from '../Block';
import { styles } from './styles';

/**
 * props:
 * - color
 * - title
 * - text
 */
function InfoBlock({ ...props }) {
	const { theme } = useTheme();

	return (
		<Block style={styles.block} color={theme.colors[props.color]}>
			<Text style={styles.bold}>{props.title}</Text>
			<Text style={{ color: 'white' }}>{props.text}</Text>
		</Block>
	);
}

export { InfoBlock };
