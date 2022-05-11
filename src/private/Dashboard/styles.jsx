import { StyleSheet } from 'react-native';

const BookStyles = StyleSheet.create({
	iconContainer: { paddingRight: 5 },
	column: {
		flex: 1,
		flexDirection: 'column',
		paddingLeft: 10,
		paddingBottom: 10,
	},
	p: { paddingTop: 10 },
	bold: { fontWeight: 'bold' },
});

const DashboardStyles = StyleSheet.create({
	row: {
		flex: 1,
		flexDirection: 'row',
		paddingHorizontal: 3,
		paddingBottom: 10,
		marginTop: 10,
	},
});

const SymbolChartStyles = StyleSheet.create({
	chart: { flex: 0, width: '100%', height: 200 },
	bugfixAndroid: { opacity: 0.99, overflow: 'hidden' },
});

const TickerStyles = StyleSheet.create({
	iconContainer: { paddingRight: 5 },
	column: {
		flex: 1,
		flexDirection: 'column',
		paddingLeft: 10,
		paddingBottom: 10,
	},
	p: { paddingTop: 10 },
	bold: { fontWeight: 'bold' },
});

export { BookStyles, DashboardStyles, SymbolChartStyles, TickerStyles };
