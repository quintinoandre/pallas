import React, { useState, useEffect } from 'react';
import { StyleSheet, Platform } from 'react-native';
import Picker from 'react-native-picker-select';

import { Feather as Icon } from '@expo/vector-icons';

import { orderType } from '../../services/OrdersService';

const styles = StyleSheet.create({
	inputAndroid: {
		marginTop: 15,
		marginBottom: 25,
		height: 30,
		paddingHorizontal: 10,
		fontSize: 16,
		alignItems: 'stretch',
		fontWeight: 'bold',
	},
	inputIOS: {
		marginVertical: 15,
		height: 30,
		paddingHorizontal: 10,
		fontSize: 16,
		alignItems: 'stretch',
		fontWeight: 'bold',
	},
});

/**
 * props:
 * - type
 * - onChange
 */
function SelectType({ ...props }) {
	const [type, setType] = useState(orderType.MARKET);

	useEffect(() => {
		setType(props.type);
	}, [props.type]);

	return (
		<Picker
			value={type}
			onValueChange={(event) => {
				setType(event);

				if (props.onchange) props.onchange(event);
			}}
			style={{ ...styles, iconContainer: { top: 10, right: 12 } }}
			Icon={() =>
				Platform.OS === 'ios' ? (
					<Icon name="chevron-down" size={24} color="black" />
				) : (
					<></>
				)
			}
			items={[
				{ label: 'Limit', value: orderType.LIMIT },
				{ label: 'Market', value: orderType.MARKET },
				{ label: 'Stop Loss Limit', value: orderType.STOP_LOSS_LIMIT },
				{ label: 'Take Profit Limit', value: orderType.TAKE_PROFIT_LIMIT },
				{ label: 'Trailing Stop', value: orderType.TRAILING_STOP },
			]}
		/>
	);
}

export { SelectType };
