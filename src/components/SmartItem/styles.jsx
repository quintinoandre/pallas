import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-elements';

function Styles() {
	const { theme } = useTheme();

	const styles = StyleSheet.create({
		rightButton: {
			minHeight: '100%',
			paddingLeft: 10,
			backgroundColor: theme.colors.danger,
		},
	});

	return styles;
}

export { Styles };
