import { StyleSheet } from 'react-native';

const GeneralAreaStyles = StyleSheet.create({
	row: { flexDirection: 'row', alignItems: 'center', paddingLeft: 5 },
});

const MonitorIntervalPickerSelectStyles = StyleSheet.create({
	inputIOS: {
		marginVertical: 15,
		height: 30,
		paddingRight: 5,
		fontSize: 16,
		alignItems: 'stretch',
		fontWeight: 'bold',
		color: 'black',
	},
	inputAndroid: {
		marginVertical: 15,
		height: 30,
		paddingRight: 5,
		fontSize: 16,
		alignItems: 'stretch',
		fontWeight: 'bold',
		color: 'black',
	},
});

const MonitorIntervalStyles = StyleSheet.create({
	label: { color: 'grey', fontWeight: 'bold', fontSize: 16 },
});

const MonitorTypePickerSelectStyles = StyleSheet.create({
	inputIOS: {
		marginVertical: 15,
		height: 30,
		paddingRight: 5,
		fontSize: 16,
		alignItems: 'stretch',
		fontWeight: 'bold',
		color: 'black',
	},
	inputAndroid: {
		marginVertical: 15,
		height: 30,
		paddingRight: 5,
		fontSize: 16,
		alignItems: 'stretch',
		fontWeight: 'bold',
		color: 'black',
	},
});

const MonitorTypeStyles = StyleSheet.create({
	label: { color: 'grey', fontWeight: 'bold', fontSize: 16 },
});

export {
	GeneralAreaStyles,
	MonitorIntervalPickerSelectStyles,
	MonitorIntervalStyles,
	MonitorTypePickerSelectStyles,
	MonitorTypeStyles,
};
