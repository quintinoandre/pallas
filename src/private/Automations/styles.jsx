import { StyleSheet } from 'react-native';

const AutomationItemStyles = StyleSheet.create({
	subtitleView: { marginTop: 5, flexDirection: 'row' },
	subtitle: { color: 'gray', fontSize: 10 },
	content: { marginLeft: 10 },
	icon: { paddingLeft: 45 },
});

const AutomationsListStyles = StyleSheet.create({
	emptyList: { flex: 1, alignItems: 'center', marginTop: 10 },
});

const NewAutomationButtonStyles = StyleSheet.create({
	overlay: { flex: 0, width: '90%' },
});

export {
	AutomationItemStyles,
	AutomationsListStyles,
	NewAutomationButtonStyles,
};
