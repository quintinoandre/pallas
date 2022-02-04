import React from 'react';
import { View } from 'react-native';

/**
 * props:
 * - color
 * - children
 */
function Block({ ...props }) {
	return (
		<View
			style={{
				padding: 5,
				margin: 3,
				flex: 1,
				borderRadius: 5,
				backgroundColor: props.color,
			}}
		>
			{props.children}
		</View>
	);
}

export { Block };
