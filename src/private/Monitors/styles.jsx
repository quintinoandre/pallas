import { StyleSheet } from 'react-native';

const MonitorItemStyles = StyleSheet.create({
	content: { marginLeft: 10 },
	subtitleView: { marginTop: 10, flexDirection: 'row' },
	subtitle: { color: 'gray', fontSize: 10 },
	icon: { paddingLeft: 45 },
});

const MonitorsListStyles = StyleSheet.create({
	emptyList: { flex: 1, alignItems: 'center', marginTop: 10 },
});

export { MonitorItemStyles, MonitorsListStyles };
