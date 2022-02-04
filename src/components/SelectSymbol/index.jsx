import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import {
	useTheme,
	Input,
	Button,
	Overlay,
	ListItem,
} from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { searchSymbols } from '../../services/SymbolsService';

const styles = StyleSheet.create({
	button: { color: 'black' },
	overlay: { flex: 0, width: '90%', height: '75%' },
	closeButton: { paddingRight: 0, marginRight: 0 },
	list: { flex: 1, width: '100%' },
});

/**
 * props:
 * - symbol
 * - onSymbolChange
 */
function SelectSymbol({ ...props }) {
	const { theme } = useTheme();

	const [selectedSymbol, setSelectedSymbol] = useState('BTCUSDT');
	const [showSearch, setShowSearch] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [symbols, setSymbols] = useState([]);
	const [error, setError] = useState('');

	useEffect(() => {
		if (props.symbol) setSelectedSymbol(props.symbol);
		else {
			AsyncStorage.getItem('symbol').then((symbol) =>
				setSelectedSymbol(symbol || 'BTCUSDT')
			);
		}
	}, [props.symbol]);

	function onChangeText(event) {
		setError('');

		if (!event) return setSymbols([]);

		setIsLoading(true);

		searchSymbols(event)
			.then((result) => {
				setSymbols(result.rows);

				setIsLoading(false);
			})
			.catch((err) => {
				setIsLoading(false);

				setSymbols([]);

				setError(err.response ? err.response.data : err.message);
			});
	}

	function onSymbolPress(symbol) {
		setSelectedSymbol(symbol);

		setShowSearch(false);

		if (props.onSymbolChange) props.onSymbolChange(symbol);

		AsyncStorage.setItem('symbol', symbol);
	}

	return (
		<>
			<Button
				title={selectedSymbol}
				type="clear"
				titleStyle={styles.button}
				icon={<Icon name="chevron-down" size={20} color="black" />}
				onPress={(_event) => {
					setShowSearch(true);
					setError('');
					setSymbols([]);
				}}
				iconRight
			/>
			<Overlay
				visible={showSearch}
				onBackdropPress={(_event) => setShowSearch(false)}
				overlayStyle={styles.overlay}
			>
				<Input
					placeholder="Type a symbol"
					autoCapitalize="characters"
					leftIcon={
						isLoading ? (
							<ActivityIndicator />
						) : (
							<Icon name="search" size={20} color="black" />
						)
					}
					rightIcon={
						<Icon.Button
							name="x"
							size={24}
							color="black"
							iconStyle={styles.closeButton}
							backgroundColor="transparent"
							onPress={(_event) => setShowSearch(false)}
						/>
					}
					onChangeText={(event) => onChangeText(event)}
				/>
				{error ? (
					<Text style={{ color: theme.colors.danger }}>{error}</Text>
				) : (
					<></>
				)}
				<View style={styles.list}>
					{symbols.map((symbol) => (
						<ListItem
							key={symbol.symbol}
							onPress={(_event) => onSymbolPress(symbol.symbol)}
							bottomDivider
						>
							<ListItem.Content>
								<ListItem.Title>{symbol.symbol}</ListItem.Title>
							</ListItem.Content>
						</ListItem>
					))}
				</View>
			</Overlay>
		</>
	);
}

export { SelectSymbol };
