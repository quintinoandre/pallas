import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { useTheme } from 'react-native-elements';

import { SelectFiat, NewOrderButton } from '../../components';
import { getFullBalance } from '../../services';
import { WalletStyles as styles } from './styles';
import { WalletItem } from './WalletItem';

/**
 * props:
 * - navigation
 * - route
 */
function Wallet({ ...props }) {
	const { theme } = useTheme();

	const [fiat, setFiat] = useState('USD');
	const [wallet, setWallet] = useState({});

	function errorHandling(error) {
		console.error(error.response ? error.response.data : error.message);
	}

	useEffect(() => {
		if (!fiat) return;

		getFullBalance(fiat)
			.then((result) => {
				wallet.fiatEstimate = result.fiatEstimate;

				delete result.fiatEstimate;

				wallet.coins = Object.entries(result).map((coin) => {
					return {
						coin: coin[0],
						available: coin[1].available,
						onOrder: coin[1].onOrder,
						fiatEstimate: coin[1].fiatEstimate,
						avg: coin[1].avg,
					};
				});

				setWallet(wallet);
			})
			.catch((error) => errorHandling(error));
	}, [fiat]);

	function onFiatChange(event) {
		setWallet({});

		setFiat(event);
	}

	return (
		<>
			<View style={styles.page}>
				<SelectFiat onChange={(event) => onFiatChange(event)} />
				<View style={styles.header}>
					<Text style={{ ...styles.estimate, ...theme.h2 }}>Wallet Total:</Text>
					<Text style={styles.estimate}>
						{wallet.fiatEstimate || <ActivityIndicator />}
					</Text>
				</View>
				<View style={styles.list}>
					<ScrollView>
						{wallet.coins ? (
							wallet.coins
								.filter(
									(coin) =>
										parseFloat(coin.available) > 0 ||
										parseFloat(coin.onOrder) > 0
								)
								.map((coin) => (
									<WalletItem coin={coin} fiat={fiat} key={coin.coin} />
								))
						) : (
							<ActivityIndicator />
						)}
					</ScrollView>
				</View>
			</View>
			<NewOrderButton symbol="" navigation={props.navigation} />
		</>
	);
}

export { Wallet };
