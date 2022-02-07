import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Switch, useTheme } from 'react-native-elements';

const styles = StyleSheet.create({
	view: { width: '50%', flexDirection: 'column', alignItems: 'flex-start' },
	label: { marginBottom: 10 },
});

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
