import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import {
	Input,
	Button,
	Overlay,
	ListItem,
	useTheme,
} from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { searchSymbols } from '../../services';
import { styles } from './styles';

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
	const [errorState, setErrorState] = useState('');

	useEffect(() => {
		if (props.symbol) {
			setSelectedSymbol(props.symbol);

			props.onSymbolChange(props.symbol);
		} else {
			AsyncStorage.getItem('symbol').then((symbol) => {
				setSelectedSymbol(symbol || 'BTCUSDT');

				props.onSymbolChange(symbol || 'BTCUSDT');
			});
		}
	}, [props.symbol]);

	function onChangeText(text) {
		setErrorState('');

		if (!text) return setSymbols([]);

		setIsLoading(true);

		searchSymbols(text)
			.then((result) => {
				setSymbols(result.rows);

				setIsLoading(false);
			})
			.catch((error) => {
				setIsLoading(false);

				setSymbols([]);

				setErrorState(error.response ? error.response.data : error.message);
			});
	}

	function onSymbolPress(symbol) {
		setSelectedSymbol(symbol);

		setShowSearch(false);

		props.onSymbolChange(symbol);

		AsyncStorage.setItem('symbol', symbol);
	}

	return (
		<>
			<Button
				title={selectedSymbol}
				type="clear"
				titleStyle={styles.button}
				icon={<Icon name="chevron-down" size={20} color="black" />}
				iconRight
				onPress={() => {
					setShowSearch(true);

					setErrorState('');

					setSymbols([]);
				}}
			/>
			<Overlay
				visible={showSearch}
				onBackdropPress={() => setShowSearch(false)}
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
							onPress={() => setShowSearch(false)}
						/>
					}
					onChangeText={(event) => onChangeText(event)}
				/>
				{errorState ? (
					<Text style={{ color: theme.colors.danger }}>{errorState}</Text>
				) : (
					<></>
				)}
				<View style={styles.list}>
					{symbols.map((symbol) => (
						<ListItem
							key={symbol.symbol}
							onPress={() => onSymbolPress(symbol.symbol)}
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
