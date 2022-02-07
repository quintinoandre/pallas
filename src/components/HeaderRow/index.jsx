import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Feather as Icon } from '@expo/vector-icons';

import { SelectSymbol } from '../SelectSymbol';

const styles = StyleSheet.create({
	row: { flexDirection: 'row', alignItems: 'center' },
	view: { flex: 1, alignItems: 'center' },
});

/**
 * props:
 * - symbol
 * - onBackPress
 * - onSymbolChange
 */
function HeaderRow({ ...props }) {
	const [symbol, setSymbol] = useState(props.symbol);

	useEffect(() => {
		setSymbol(props.symbol);
	}, [props.symbol]);

	function onSymbolChange(event) {
		setSymbol(event);

		if (props.onSymbolChange) props.onSymbolChange(event);
	}

	return (
		<View style={styles.row}>
			<Icon.Button
				name="chevron-left"
				size={24}
				color="black"
				underlayColor="#ccc"
				backgroundColor="transparent"
				onPress={(event) => {
					if (props.onBackPress) props.onBackPress(event);
				}}
			/>
			<View style={styles.view}>
				<SelectSymbol
					symbol={symbol}
					onSymbolChange={(event) => onSymbolChange(event)}
				/>
			</View>
		</View>
	);
}

export { HeaderRow };
