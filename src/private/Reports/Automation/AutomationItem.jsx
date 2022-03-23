import React from 'react';
import { Text, View } from 'react-native';
import { Avatar, ListItem, useTheme } from 'react-native-elements';

import { AutomationItemStyles as styles } from './styles';

/**
 * props:
 * - automation
 */
function AutomationItem({ ...props }) {
	const { theme } = useTheme();

	function getColor(net) {
		if (net >= 0) return theme.colors.success;

		return theme.colors.danger;
	}

	function getTitle(automation) {
		return automation.name + ` $${automation.net}`.substring(0, 10);
	}

	function getSubtitle(executions) {
		return (
			<View style={styles.subtitleView}>
				<Text style={styles.subtitle}>{executions} executions</Text>
			</View>
		);
	}

	return (
		<ListItem bottomDivider>
			<Avatar
				size="small"
				overlayContainerStyle={{
					backgroundColor: getColor(props.automation.net),
				}}
				rounded
			/>
			<ListItem.Content>
				<ListItem.Title>{getTitle(props.automation)}</ListItem.Title>
				{getSubtitle(props.automation.executions)}
			</ListItem.Content>
		</ListItem>
	);
}

export default AutomationItem;
