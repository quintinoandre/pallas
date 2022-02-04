import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';

const styles = StyleSheet.create({
	subtitleView: { marginTop: 5, flexDirection: 'row' },
	subtitle: { color: 'grey', fontSize: 10 },
});

/**
 * props:
 * - coin
 * - fiat
 */
function WalletItem({ ...props }) {
	function getTitle(coin) {
		return `${coin.coin} ${coin.available}`;
	}

	function getPriceAvg(avg) {
		return `Price Avg.: ~${props.fiat} ${avg ? avg.toFixed(2) : '-'}`;
	}

	function getEstimate(estimate) {
		return `Total Est.: ~${props.fiat} ${estimate ? estimate.toFixed(2) : '-'}`;
	}

	return (
		<ListItem bottomDivider>
			<ListItem.Content>
				<ListItem.Title>{getTitle(props.coin)}</ListItem.Title>
				<View style={styles.subtitleView}>
					{parseFloat(props.coin.onOrder) ? (
						<>
							<Text style={styles.subtitle}>Locked: {props.coin.onOrder}</Text>
							<Text style={styles.subtitle}> | </Text>
						</>
					) : (
						<></>
					)}
					<Text style={styles.subtitle}>
						{getEstimate(props.coin.fiatEstimate)}
					</Text>
					<Text style={styles.subtitle}> | </Text>
					<Text style={styles.subtitle}>{getPriceAvg(props.coin.avg)}</Text>
				</View>
			</ListItem.Content>
		</ListItem>
	);
}

export default WalletItem;
