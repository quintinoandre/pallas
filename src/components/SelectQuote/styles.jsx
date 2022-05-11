import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	iconContainer: { top: 10, right: 12 },
});

const pickerSelectStyles = StyleSheet.create({
	inputAndroid: {
		marginVertical: 10,
		height: 30,
		paddingHorizontal: 10,
		fontSize: 16,
		alignItems: 'stretch',
	},
	inputIOS: {
		marginTop: 10,
		height: 30,
		paddingHorizontal: 10,
		fontSize: 16,
		alignItems: 'stretch',
	},
});

export { styles, pickerSelectStyles };
