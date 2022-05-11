import { StyleSheet } from 'react-native';

function ActionBuilderStyles(type) {
	const styles = StyleSheet.create({
		build: {
			marginVertical: 15,
			height: type && type.indexOf('ALERT') === -1 ? 220 : 150,
			flex: 0,
		},
		collapsed: {
			marginVertical: 15,
			height: 80,
			flex: 0,
		},
		showBuilderButton: {
			marginHorizontal: 10,
			marginTop: 10,
		},
		hideBuilderButton: {
			marginHorizontal: 10,
		},
	});

	return styles;
}

const ActionsAreaStyles = StyleSheet.create({
	list: { flex: 1, width: '100%', paddingHorizontal: 20 },
});

const ActionSelectStyles = StyleSheet.create({
	inputIOS: {
		marginVertical: 15,
		height: 30,
		paddingHorizontal: 10,
		fontSize: 16,
		alignItems: 'stretch',
		fontWeight: 'bold',
		color: 'black',
	},
	inputAndroid: {
		marginVertical: 15,
		height: 30,
		paddingHorizontal: 10,
		fontSize: 16,
		alignItems: 'stretch',
		fontWeight: 'bold',
		color: 'black',
	},
	iconContainer: { top: 10, right: 12 },
});

const TemplateSelectStyles = StyleSheet.create({
	inputIOS: {
		marginVertical: 15,
		height: 30,
		paddingHorizontal: 10,
		fontSize: 16,
		alignItems: 'stretch',
		fontWeight: 'bold',
		color: 'black',
	},
	inputAndroid: {
		marginVertical: 15,
		height: 30,
		paddingHorizontal: 10,
		fontSize: 16,
		alignItems: 'stretch',
		fontWeight: 'bold',
		color: 'black',
	},
	iconContainer: { top: 10, right: 12 },
});

export {
	ActionBuilderStyles,
	ActionsAreaStyles,
	ActionSelectStyles,
	TemplateSelectStyles,
};
