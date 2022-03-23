import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { ButtonGroup } from 'react-native-elements';

import { orderSide } from '../../services';

const styles = StyleSheet.create({ group: { height: 30 } });

/**
 * props:
 * - side
 * - onChange
 */
function SelectSide({ ...props }) {
	const [side, setSide] = useState(0);

	useEffect(() => {
		setSide(props.side === orderSide.BUY ? 0 : 1);
	}, [props.side]);

	function onPress(event) {
		setSide(event);

		if (props.onChange)
			props.onChange(event === 0 ? orderSide.BUY : orderSide.SELL);
	}

	return (
		<ButtonGroup
			selectedIndex={side}
			containerStyle={styles.group}
			buttons={[orderSide.BUY, orderSide.SELL]}
			onPress={(event) => onPress(event)}
		/>
	);
}

export { SelectSide };
