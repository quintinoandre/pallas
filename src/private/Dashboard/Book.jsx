import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import { Block } from '../../components';

const styles = StyleSheet.create({
	column: {
		flex: 1,
		flexDirection: 'column',
		paddingLeft: 10,
		paddingBottom: 10,
	},
	p: { paddingTop: 10 },
	bold: { fontWeight: 'bold' },
});

/**
 * props:
 * - data
 */
function Book({ ...props }) {
	const { theme } = useTheme();

	const [book, setBook] = useState(null);

	useEffect(() => {
		setBook(props.data || null);
	}, [props.data]);

	return (
		<Block color="white">
			<Text style={theme.h2}>
				<View style={{ paddingRight: 5 }}>
					<Icon name="book-open" size={20} color="black" />
				</View>
				Book
			</Text>
			{book ? (
				<View style={styles.column}>
					<View style={styles.p}>
						<Text style={styles.bold}>Current Price: </Text>
						<Text>{book.close}</Text>
					</View>
					<View style={styles.p}>
						<Text style={styles.bold}>Best Bid: </Text>
						<Text style={{ color: theme.colors.success }}>{book.bestBid}</Text>
					</View>
					<View style={styles.p}>
						<Text style={styles.bold}>Best Ask: </Text>
						<Text style={{ color: theme.colors.danger }}>{book.bestAsk}</Text>
					</View>
					<View style={styles.p}>
						<Text style={styles.bold}>Trades in 24h: </Text>
						<Text>{book.numberOfTrades}</Text>
					</View>
				</View>
			) : (
				<ActivityIndicator />
			)}
		</Block>
	);
}

export default Book;
