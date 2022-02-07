import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme, ListItem, Avatar } from 'react-native-elements';

import { getColorByAutomationStatus } from '../../Utils';

const styles = StyleSheet.create({
	subtitleView: { marginTop: 5, flexDirection: 'row' },
	subtitle: { color: 'gray', fontSize: 10 },
	content: { marginLeft: 10 },
});

/**
 * props:
 * - automation
 * - onPress
 * - onRefresh
 */
function AutomationItem({ ...props }) {
	const { theme } = useTheme();

	const [expanded, setExpanded] = useState(false);

	function getIcon(automation) {
		const icon = { color: 'white', type: 'feather' };

		if (automation.schedule) return { ...icon, name: 'calendar' };

		if (automation.grids && automation.grids.length)
			return { ...icon, name: 'grid' };

		return { ...icon, name: 'command' };
	}

	function getAvatar(automation) {
		return (
			<Avatar
				size="small"
				icon={getIcon(automation)}
				overlayContainerStyle={{
					backgroundColor: getColorByAutomationStatus(automation, theme),
				}}
				rounded
			/>
		);
	}

	return (
		<ListItem.Accordion
			isExpanded={expanded}
			content={
				<>
					{getAvatar(props.automation)}
					<ListItem.Content style={styles.content}>
						<ListItem.Title>{props.automation.name}</ListItem.Title>
						<View style={styles.subtitleView}>
							<Text style={styles.subtitle}>{props.automation.symbol}</Text>
						</View>
					</ListItem.Content>
				</>
			}
			onPress={(_event) => setExpanded(!expanded)}
			bottomDivider
		/>
	);
}

export default AutomationItem;
