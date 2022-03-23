import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { useTheme, Overlay, Button } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import { styles } from './styles';

/**
 * props:
 * - type
 * - text
 * - visible
 * - onDismiss
 */
function Toast({ ...props }) {
	const { theme } = useTheme();

	const [text, setText] = useState('');
	const [type, setType] = useState('');
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		setText(props.text);
		setType(props.type);
		setVisible(props.visible);
	}, [props.type, props.text, props.visible]);

	function onDismiss(_event) {
		setVisible(false);

		if (props.onDismiss) props.onDismiss();
	}

	return (
		<Overlay isVisible={visible} onBackdropPress={(event) => onDismiss(event)}>
			<View style={styles.logo}>
				{type === 'error' ? (
					<Icon name="alert-triangle" size={32} color={theme.colors.danger} />
				) : (
					<Icon name="alert-circle" size={32} color={theme.colors.success} />
				)}
			</View>
			<Text
				style={{
					margin: 10,
					color: type === 'error' ? theme.colors.danger : theme.colors.success,
				}}
			>
				{text}
			</Text>
			<Button
				title="Ok"
				style={{ marginTop: 10 }}
				onPress={(event) => onDismiss(event)}
			/>
		</Overlay>
	);
}

export { Toast };
