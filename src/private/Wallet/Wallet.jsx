import React, { useEffect, useState } from 'react';
import {
	View,
	StyleSheet,
	Text,
	ActivityIndicator,
	ScrollView,
} from 'react-native';
import { useTheme } from 'react-native-elements';

import { SelectFiat, NewOrderButton } from '../../components';
import { getFullBalance } from '../../services/ExchangeService';
import WalletItem from './WalletItem';

const styles = StyleSheet.create({
	page: { flexDirection: 'column', flex: 1 },
	header: { flexDirection: 'row', flex: 1, height: 150 },
	estimate: { margin: 10, fontSize: 16, paddingLeft: 14 },
	list: { marginTop: 10 },
});

/**
 * props:
 * - navigation?
 * - route?
 */
function Wallet({ ...props }) {
	const { theme } = useTheme();

	const [fiat, setFiat] = useState('USD');
	const [wallet, setWallet] = useState({});

	useEffect(() => {
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
			.catch((err) => {
				console.error(err);
			});
	}, [fiat]);

	return (
		<>
			<View style={styles.page}>
				<SelectFiat onChange={(event) => setFiat(event)} />
				<View style={styles.header}>
					<Text style={{ ...theme.h2, ...styles.estimate }}>Wallet Total:</Text>
					<Text style={styles.estimate}>
						{wallet.fiatEstimate || <ActivityIndicator />}
					</Text>
				</View>
				<View style={styles.list}>
					<ScrollView>
						{wallet.coins ? (
							wallet.coins.map((coin) => (
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

export default Wallet;
