import { StyleSheet } from 'react-native';

function ActionBuilderStyles(type) {
	const actionBuilderStyles = StyleSheet.create({
		build: {
			marginVertical: 15,
			height: type && type.indexOf('ALERT') === -1 ? 220 : 150,
			flex: 0,
		},
		collapsed: { marginVertical: 15, height: 80, flex: 0 },
	});

	return actionBuilderStyles;
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
});

export {
	ActionBuilderStyles,
	ActionsAreaStyles,
	ActionSelectStyles,
	TemplateSelectStyles,
};
