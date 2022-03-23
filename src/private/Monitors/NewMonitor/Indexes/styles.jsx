import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-elements';

function IndexBuilderStyles(analysis) {
	const { theme } = useTheme();

	const indexBuilderStyles = StyleSheet.create({
		collapsed: { marginVertical: 15, height: 80, flex: 0 },
		build: { marginVertical: 15, height: analysis.params ? 220 : 125, flex: 0 },
		button: { backgroundColor: theme.colors.secondary, marginHorizontal: 10 },
	});

	return indexBuilderStyles;
}

const IndexesAreaStyles = StyleSheet.create({
	list: { width: '100%', flex: 1, paddingHorizontal: 20 },
});

const MonitorIndexStyles = StyleSheet.create({
	inputAndroid: {
		marginBottom: 10,
		height: 30,
		paddingHorizontal: 10,
		fontSize: 16,
		alignItems: 'stretch',
		fontWeight: 'bold',
		color: 'black',
	},
	inputIOS: {
		marginBottom: 10,
		height: 30,
		paddingHorizontal: 10,
		fontSize: 16,
		alignItems: 'stretch',
		fontWeight: 'bold',
		color: 'black',
	},
});

export { IndexBuilderStyles, IndexesAreaStyles, MonitorIndexStyles };
