import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { ButtonGroup } from 'react-native-elements';

const styles = StyleSheet.create({
	group: { height: 30 },
});

/**
 * props:
 * - onChange
 */
function OperatorSelect({ ...props }) {
	const [operator, setOperator] = useState(2);

	function onPress(event) {
		setOperator(event);

		switch (event) {
			case 0:
				if (props.onChange) return props.onChange('<');
				break;
			case 1:
				if (props.onChange) return props.onChange('<=');
				break;
			case 2:
				if (props.onChange) return props.onChange('==');
				break;
			case 3:
				if (props.onChange) return props.onChange('!==');
				break;
			case 4:
				if (props.onChange) return props.onChange('>=');
				break;
			case 5:
				if (props.onChange) return props.onChange('>');
				break;
			default:
				break;
		}
	}

	return (
		<ButtonGroup
			selectedIndex={operator}
			containerStyle={styles.group}
			buttons={['<', '<=', '=', '!=', '>=', '>']}
			onPress={(event) => onPress(event)}
		/>
	);
}

export default OperatorSelect;
