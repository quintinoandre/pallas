import { StyleSheet } from 'react-native';

const NewOrderStyles = StyleSheet.create({
	header: { flex: 0, height: 130, backgroundColor: '#ccc' },
	row: { flex: 1, flexDirection: 'row', alignItems: 'center' },
	totalView: { marginLeft: 12, paddingBottom: 10 },
	totalTitle: { fontWeight: 'bold', fontSize: 16, color: 'grey' },
	total: { marginTop: 10, fontSize: 18 },
	button: { margin: 10, marginTop: 0, paddingHorizontal: 10 },
	symbolContainer: { flex: 1, alignItems: 'center' },
	error: { marginHorizontal: 0 },
});

const OrderItemStyles = StyleSheet.create({
	avatar: { fontSize: 12 },
	subtitleView: { marginTop: 5, flexDirection: 'row' },
	subtitle: { color: 'gray', fontSize: 10 },
});

const OrdersListStyles = StyleSheet.create({
	emptyList: { flex: 1, alignItems: 'center', marginTop: 10 },
});

const OrderViewStyles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		flex: 0,
		height: 60,
		backgroundColor: '#ccc',
		alignItems: 'center',
	},
	iconChevronLeft: { marginTop: 3 },
	p: {
		marginTop: 10,
		paddingRight: 10,
		flexDirection: 'row',
		flex: 0,
		height: 30,
	},
	text: { marginRight: 20, marginTop: 3 },
	block: { flex: 0, marginTop: 0 },
	status: { color: 'white', marginLeft: 10, fontSize: 10 },
	row: { flexDirection: 'row', alignItems: 'center' },
	bold: { fontWeight: 'bold', marginLeft: 10 },
	button: { margin: 10, marginTop: 0, paddingHorizontal: 10 },
});

export { NewOrderStyles, OrderItemStyles, OrdersListStyles, OrderViewStyles };
