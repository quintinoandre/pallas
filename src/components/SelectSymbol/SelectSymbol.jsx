import React, { useState, useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useTheme, Button, Overlay } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
	button: { color: 'black' },
});

/**
 * props:
 * - symbol
 *
 */
function SelectSymbol({ ...props }) {
	const { theme } = useTheme();

	const [selectedSymbol, setSelectedSymbol] = useState('BTCUSDT');
	const [showSearch, setShowSearch] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (props.symbol) setSelectedSymbol(props.symbol);
		else {
			AsyncStorage.getItem('symbol').then((symbol) =>
				setSelectedSymbol(symbol || 'BTCUSDT')
			);
		}
	}, [props.symbol]);

	return (
		<>
			<Button
				title={selectedSymbol}
				type="clear"
				titleStyle={styles.button}
				icon={<Icon name="chevron-down" size={20} color="black" />}
				onPress={(_event) => setShowSearch(true)}
				iconRight
			/>
			<Overlay
				visible={showSearch}
				onBackdropPress={(_event) => setShowSearch(false)}
			>
				<Text>Overlay</Text>
			</Overlay>
		</>
	);
}

export default SelectSymbol;
