import React, { useState, useEffect } from 'react';
import { FAB } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

/**
 * props:
 * - navigation
 * - symbol
 */
function NewOrderButton({ ...props }) {
	const [symbol, setSymbol] = useState('BTCUSDT');

	useEffect(() => {
		setSymbol(props.symbol || 'BTCUSDT');
	}, [props.symbol]);

	function onPress() {
		props.navigation.navigate('Orders', {
			screen: 'NewOrder',
			params: { symbol },
		});
	}

	return (
		<FAB
			title={<Icon name="dollar-sign" size={20} color="white" />}
			placement="right"
			onPress={onPress}
		/>
	);
}

export { NewOrderButton };
