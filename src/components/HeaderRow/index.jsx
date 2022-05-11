import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { Feather as Icon } from '@expo/vector-icons';

import { SelectSymbol } from '../SelectSymbol';
import { styles } from './styles';

/**
 * props:
 * - symbol
 * - onBackPress
 * - onSymbolChange
 */
function HeaderRow({ ...props }) {
	const [symbolState, setSymbolState] = useState(props.symbol);

	useEffect(() => {
		setSymbolState(props.symbol);
	}, [props.symbol]);

	function onSymbolChange(symbol) {
		setSymbolState(symbol);

		props.onSymbolChange(symbol);
	}

	return (
		<View style={styles.row}>
			<Icon.Button
				name="chevron-left"
				size={24}
				color="black"
				underlayColor="#ccc"
				backgroundColor="transparent"
				onPress={props.onBackPress}
			/>
			<View style={styles.view}>
				<SelectSymbol
					symbol={symbolState}
					onSymbolChange={(event) => onSymbolChange(event)}
				/>
			</View>
		</View>
	);
}

export { HeaderRow };
