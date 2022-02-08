import React, { useEffect, useState } from 'react';
import { Text, ScrollView, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-elements';

import { getIndexes } from '../../../../services/BeholderService';
import ConditionBuilder from './ConditionBuilder';

const styles = StyleSheet.create({
	list: { flex: 1, width: '100%', paddingHorizontal: 20 },
});

/**
 * props:
 * - conditions
 * - symbol
 * - type
 * - onChange
 */
function ConditionsArea({ ...props }) {
	const { theme } = useTheme();

	const [indexes, setIndexes] = useState([]);
	const [conditions, setConditions] = useState([]);

	useEffect(() => {
		setConditions(props.conditions ? props.conditions.split(' && ') : []);
	}, [props.conditions]);

	function errorHandling(err) {
		console.error(err.response ? err.response.data : err.message);
	}

	useEffect(() => {
		if (!props.symbol) return;

		getIndexes()
			.then((result) => {
				const isWildcard = props.symbol.startsWith('*');

				let filteredIndexes = isWildcard
					? result.filter((k) =>
							k.symbol.endsWith(props.symbol.replace('*', ''))
					  )
					: result.filter((k) => k.symbol === props.symbol);

				if (isWildcard)
					filteredIndexes.forEach((ix) => {
						if (ix.variable.startsWith('WALLET')) {
							ix.symbol = ix.symbol.replace('*', '');
							ix.eval = ix.eval.replace('*', '');
						} else {
							ix.symbol = props.symbol;
							ix.eval = ix.eval.replace(ix.symbol, props.symbol);
						}
					});
				else {
					const baseWallet = result.find(
						(ix) =>
							ix.variable.startsWith('WALLET') &&
							props.symbol.startsWith(ix.symbol)
					);

					if (baseWallet) filteredIndexes.splice(0, 0, baseWallet);

					const quoteWallet = result.find(
						(ix) =>
							ix.variable.startsWith('WALLET') &&
							props.symbol.endsWith(ix.symbol)
					);

					if (quoteWallet) filteredIndexes.splice(0, 0, quoteWallet);
				}

				filteredIndexes = filteredIndexes.filter(
					(item, index, self) =>
						index === self.findIndex((t) => t.eval === item.eval)
				);

				setIndexes(filteredIndexes);
			})
			.catch((err) => {
				errorHandling(err);
			});
	}, [props.symbol]);

	function onAddCondition(event) {}

	return (
		<View style={theme.container}>
			<ConditionBuilder
				indexes={indexes}
				onAddCondition={(event) => onAddCondition(event)}
			/>
			<View style={styles.list}>
				<ScrollView
					contentContainerStyle={{ flexGrow: 1 }}
					alwaysBounceVertical
				>
					<Text>Conditions List</Text>
				</ScrollView>
			</View>
		</View>
	);
}

export default ConditionsArea;
