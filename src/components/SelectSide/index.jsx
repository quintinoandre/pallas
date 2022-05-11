import React, { useState, useEffect } from 'react';
import { ButtonGroup } from 'react-native-elements';

import { ENUM_ORDER_SIDE } from '../../enums';
import { styles } from './styles';

/**
 * props:
 * - side
 * - onChange
 */
function SelectSide({ ...props }) {
	const [sideState, setSideState] = useState(0);

	useEffect(() => {
		setSideState(props.side === ENUM_ORDER_SIDE.BUY ? 0 : 1);
	}, [props.side]);

	function onPress(side) {
		setSideState(side);

		props.onChange(side === 0 ? ENUM_ORDER_SIDE.BUY : ENUM_ORDER_SIDE.SELL);
	}

	return (
		<ButtonGroup
			selectedIndex={sideState}
			containerStyle={styles.group}
			buttons={[ENUM_ORDER_SIDE.BUY, ENUM_ORDER_SIDE.SELL]}
			onPress={(event) => onPress(event)}
		/>
	);
}

export { SelectSide };
