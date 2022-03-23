import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Switch, useTheme } from 'react-native-elements';

import { styles } from './styles';

/**
 * props:
 * - text
 * - isChecked
 * - onChange
 */
function SwitchInput({ ...props }) {
	const { theme } = useTheme();

	const [checked, setChecked] = useState(false);

	useEffect(() => {
		setChecked(props.isChecked);
	}, [props.isChecked]);

	function onCheck(event) {
		setChecked(event);

		if (props.onChange) props.onChange(event);
	}

	return (
		<View style={styles.view}>
			<Text style={{ ...theme.h2, ...styles.label }}>{props.text}</Text>
			<Switch value={checked} onValueChange={(event) => onCheck(event)} />
		</View>
	);
}

export { SwitchInput };
