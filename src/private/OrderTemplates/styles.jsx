import { StyleSheet } from 'react-native';

const OrderTemplateItemStyles = StyleSheet.create({
	content: { marginLeft: 10 },
	subtitleView: { marginTop: 5, flexDirection: 'row' },
	subtitle: { color: 'gray', fontSize: 10 },
	avatar: { fontSize: 12 },
	icon: { paddingLeft: 45 },
});

const OrderTemplatesListStyles = StyleSheet.create({
	emptyList: { flex: 1, alignItems: 'center', marginTop: 10 },
});

const NewOrderTemplateStyles = StyleSheet.create({
	header: { flex: 0, height: 50, backgroundColor: '#cccccc' },
	scrollViewContainer: { paddingTop: 20 },
	label: {
		fontWeight: 'bold',
		color: 'gray',
		paddingLeft: 10,
		fontSize: 16,
		marginTop: 15,
	},
	button: { margin: 10, marginTop: 0, paddingHorizontal: 10 },
	error: { marginHorizontal: 0 },
});

export {
	OrderTemplateItemStyles,
	OrderTemplatesListStyles,
	NewOrderTemplateStyles,
};
