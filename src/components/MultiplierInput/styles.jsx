import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	label: { fontWeight: 'bold', color: 'gray', paddingLeft: 10, fontSize: 16 },
	buttonText: {
		flex: 1,
		paddingLeft: 4,
		fontWeight: 'normal',
		color: 'black',
		textAlign: 'justify',
	},
	button: { width: '100%' },
	overlay: { flex: 0, width: '90%', height: 270 },
	text: { paddingLeft: 10 },
	overlayButton: { padding: 10 },
	row: { flexDirection: 'row', width: '100%' },
	pickerContainer: { flex: 1 },
});

const pickerSelectStyles = StyleSheet.create({
	inputAndroid: {
		marginTop: 15,
		height: 30,
		paddingHorizontal: 10,
		fontSize: 16,
		alignItems: 'stretch',
		fontWeight: 'bold',
		color: 'black',
	},
	inputIOS: {
		marginTop: 15,
		height: 30,
		paddingHorizontal: 10,
		fontSize: 16,
		alignItems: 'stretch',
		fontWeight: 'bold',
		color: 'black',
	},
	iconContainer: { top: 20, right: 12 },
});

export { styles, pickerSelectStyles };
