import { StyleSheet } from 'react-native';

const ConditionBuilderStyles = StyleSheet.create({
	build: {
		marginVertical: 15,
		height: 240,
		flex: 0,
	},
	button: { marginHorizontal: 10 },
	collapsed: {
		marginVertical: 15,
		height: 80,
		flex: 0,
	},
});

const ConditionsAreaStyles = StyleSheet.create({
	list: { flex: 1, width: '100%', paddingHorizontal: 20 },
	scrollView: { flexGrow: 1 },
	smartItem: { fontSize: 12 },
});

const IndexSelectStyles = StyleSheet.create({
	inputIOS: {
		height: 30,
		marginBottom: 15,
		paddingHorizontal: 10,
		fontSize: 16,
		alignItems: 'stretch',
		fontWeight: 'bold',
		color: 'black',
	},
	inputAndroid: {
		height: 30,
		marginBottom: 15,
		paddingHorizontal: 10,
		fontSize: 16,
		alignItems: 'stretch',
		fontWeight: 'bold',
		color: 'black',
	},
	iconContainer: { top: 0, right: 12 },
});

const OperatorSelectStyles = StyleSheet.create({
	group: { height: 30 },
});

const VariableInputStyles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		width: '100%',
		flex: 0,
		height: 60,
		marginBottom: 10,
	},
	flex: { flex: 1, paddingTop: 15 },
});

export {
	ConditionBuilderStyles,
	ConditionsAreaStyles,
	IndexSelectStyles,
	OperatorSelectStyles,
	VariableInputStyles,
};
