import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme, ListItem, Avatar } from 'react-native-elements';

import { monitorType } from '../../services/MonitorsService';

const styles = StyleSheet.create({
	content: { marginLeft: 10 },
	subtitleView: { marginTop: 10, flexDirection: 'row' },
	subtitle: { color: 'gray', fontSize: 10 },
});

/**
 * props:
 * - monitor
 */
function MonitorItem({ ...props }) {
	const { theme } = useTheme();

	const [expanded, setExpanded] = useState(false);

	function getIcon(type) {
		const icon = { type: 'feather', color: 'white' };

		switch (type) {
			case monitorType.CANDLES:
				return { ...icon, name: 'bar-chart-2' };
			case monitorType.TICKER:
				return { ...icon, name: 'clock' };
			case monitorType.MINI_TICKER:
				return { ...icon, name: 'activity' };
			case monitorType.BOOK:
				return { ...icon, name: 'book-open' };
			case monitorType.USER_DATA:
				return { ...icon, name: 'user' };
			default:
				break;
		}
	}

	function getStatus(monitor) {
		if (!monitor.isActive) return theme.colors.danger;
		return theme.colors.success;
	}

	function getAvatar() {
		return (
			<Avatar
				icon={getIcon(props.monitor.type)}
				size="small"
				overlayContainerStyle={{ backgroundColor: getStatus(props.monitor) }}
				rounded
			/>
		);
	}

	return (
		<ListItem.Accordion
			content={
				<>
					{getAvatar()}
					<ListItem.Content style={styles.content}>
						<ListItem.Title>
							{props.monitor.symbol} {props.monitor.interval}
						</ListItem.Title>
						<View style={styles.subtitleView}>
							<Text style={styles.subtitle}>
								{props.monitor.indexes.replace(',', ', ')}
							</Text>
						</View>
					</ListItem.Content>
				</>
			}
			isExpanded={expanded}
			onPress={(_event) => setExpanded(!expanded)}
			bottomDivider
		>
			<Text>internal content</Text>
		</ListItem.Accordion>
	);
}

export default MonitorItem;
