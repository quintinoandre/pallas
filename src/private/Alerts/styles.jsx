import { StyleSheet } from 'react-native';

const AlertItemStyles = StyleSheet.create({
	content: { marginLeft: 10 },
	subtitleView: { marginTop: 5, flexDirection: 'row' },
	subtitle: { color: 'grey', fontSize: 10 },
	fullView: {
		paddingTop: 10,
		paddingBottom: 20,
		paddingHorizontal: 60,
		backgroundColor: '#fff',
	},
});

const AlertsListStyles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 0,
		height: 90,
		paddingTop: 40,
		backgroundColor: '#ccc',
	},
	headerTitle: { fontWeight: 'bold', fontSize: 16 },
	emptyList: { flex: 1, alignItems: 'center', marginTop: 10 },
});

export { AlertItemStyles, AlertsListStyles };
