import React, { useState } from 'react';
import { ButtonGroup } from 'react-native-elements';

import { OperatorSelectStyles as styles } from './styles';

/**
 * props:
 * - onChange
 */
function OperatorSelect({ ...props }) {
	const [operator, setOperator] = useState(2);

	function onPress(value) {
		setOperator(value);

		switch (value) {
			case 0:
				return props.onChange('<');
			case 1:
				return props.onChange('<=');
			case 2:
				return props.onChange('==');
			case 3:
				return props.onChange('!==');
			case 4:
				return props.onChange('>=');
			case 5:
				return props.onChange('>');
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

export { OperatorSelect };
