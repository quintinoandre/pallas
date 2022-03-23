import { StyleSheet } from 'react-native';

const GeneralAreaStyles = StyleSheet.create({
	row: { flexDirection: 'row', alignItems: 'center', paddingLeft: 5 },
});

const NewAutomationStyles = StyleSheet.create({
	header: { flex: 0, height: 40, backgroundColor: '#ccc' },
	tabButton: { backgroundColor: '#ccc' },
	tab: { backgroundColor: '#ccc', paddingBottom: 6 },
	button: { margin: 10, marginTop: 0, paddingHorizontal: 10 },
});

const ScheduleInputStyles = StyleSheet.create({
	button: { paddingRight: 0, marginRight: 0 },
});

export { GeneralAreaStyles, NewAutomationStyles, ScheduleInputStyles };
