import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	iconContainer: { top: 10, right: 12 },
});

const pickerSelectStyles = StyleSheet.create({
	inputAndroid: {
		marginVertical: 15,
		height: 30,
		paddingHorizontal: 10,
		fontSize: 16,
		alignItems: 'stretch',
		fontWeight: 'bold',
	},
	inputIOS: {
		marginVertical: 15,
		height: 30,
		paddingHorizontal: 10,
		fontSize: 16,
		alignItems: 'stretch',
		fontWeight: 'bold',
	},
});

export { styles, pickerSelectStyles };
