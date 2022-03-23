import { StyleSheet } from 'react-native';

const GeneralAreaStyles = StyleSheet.create({
	row: { flexDirection: 'row', alignItems: 'center', paddingLeft: 5 },
});

const GridAreaStyles = StyleSheet.create({
	row: { flexDirection: 'row', flex: 1 },
	column: {
		flexDirection: 'column',
		flex: 1,
		marginTop: 10,
		paddingHorizontal: 5,
	},
	block: {
		height: 30,
		flex: 0,
		alignItems: 'center',
		paddingHorizontal: 5,
		marginHorizontal: 0,
	},
	columnTitle: { fontWeight: 'bold' },
});

const NewGridStyles = StyleSheet.create({
	header: { flex: 0, height: 120, backgroundColor: '#ccc' },
	tabButton: { backgroundColor: '#ccc' },
	tab: { backgroundColor: '#ccc', paddingBottom: 6 },
	button: { margin: 10, marginTop: 0, paddingHorizontal: 10 },
});

const QuantityInputPickerSelectStyles = StyleSheet.create({
	inputIOS: {
		marginVertical: 15,
		height: 30,
		paddingHorizontal: 10,
		fontSize: 16,
		fontWeight: 'bold',
		color: 'black',
		alignItems: 'stretch',
	},
	inputAndroid: {
		marginVertical: 15,
		height: 30,
		paddingHorizontal: 10,
		fontSize: 16,
		fontWeight: 'bold',
		color: 'black',
		alignItems: 'stretch',
	},
});

const QuantityInputStyles = StyleSheet.create({
	row: { width: '100%', flexDirection: 'row' },
	label: { fontWeight: 'bold', color: 'grey', paddingLeft: 10, fontSize: 16 },
});

export {
	GeneralAreaStyles,
	GridAreaStyles,
	NewGridStyles,
	QuantityInputPickerSelectStyles,
	QuantityInputStyles,
};
