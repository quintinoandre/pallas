import React from 'react';
import { View } from 'react-native';

import { styles } from './styles';

/**
 * props:
 * - color
 * - children
 * - style?
 */
function Block({ ...props }) {
	return (
		<View
			style={{
				...styles.container,
				backgroundColor: props.color,
				...props.style,
			}}
		>
			{props.children}
		</View>
	);
}

export { Block };
