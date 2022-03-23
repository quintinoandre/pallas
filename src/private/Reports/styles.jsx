import { StyleSheet, Dimensions } from 'react-native';

const ChartReportStyles = StyleSheet.create({
	view: { flex: 0, height: 305, width: Dimensions.get('window').width - 20 },
	chartStyle: { borderRadius: 16, padding: 5 },
	containerStyle: { marginVertical: 8, borderRadius: 8 },
});

const FilterReportStyles = StyleSheet.create({
	overlay: { flex: 0, width: '90%', height: 310 },
	button: { paddingHorizontal: 10, paddingTop: 10 },
});

const ReportsStyles = StyleSheet.create({
	row: { flexDirection: 'row', marginHorizontal: 6 },
});

export { ChartReportStyles, FilterReportStyles, ReportsStyles };
