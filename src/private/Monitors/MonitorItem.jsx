import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useTheme, ListItem, Avatar } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import { MONITOR_TYPE } from '../../enums';
import { startMonitor, stopMonitor, deleteMonitor } from '../../services';
import { MonitorItemStyles as styles } from './styles';

/**
 * props:
 * - monitor
 * - onPress
 * - onRefresh
 */
function MonitorItem({ ...props }) {
	const { theme } = useTheme();

	const [expanded, setExpanded] = useState(false);

	function errorHandling(error) {
		console.error(error.response ? error.response.data : error.message);
	}

	function getIcon(type) {
		const icon = { type: 'feather', color: 'white' };

		switch (type) {
			case MONITOR_TYPE.CANDLES:
				return { ...icon, name: 'bar-chart-2' };
			case MONITOR_TYPE.TICKER:
				return { ...icon, name: 'clock' };
			case MONITOR_TYPE.MINI_TICKER:
				return { ...icon, name: 'activity' };
			case MONITOR_TYPE.BOOK:
				return { ...icon, name: 'book-open' };
			case MONITOR_TYPE.USER_DATA:
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

	function onStartPress(monitor) {
		startMonitor(monitor.id)
			.then(() => props.onRefresh())
			.catch((error) => errorHandling(error));
	}

	function onStopPress(monitor) {
		stopMonitor(monitor.id)
			.then(() => props.onRefresh())
			.catch((error) => errorHandling(error));
	}

	function onDeletePress(monitor) {
		deleteMonitor(monitor.id)
			.then(() => props.onRefresh())
			.catch((error) => errorHandling(error));
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
						{props.monitor.indexes ? (
							<View style={styles.subtitleView}>
								<Text style={styles.subtitle}>
									{props.monitor.indexes
										? props.monitor.indexes.replace(/,/gi, ', ')
										: props.monitor.indexes}
								</Text>
							</View>
						) : (
							<></>
						)}
					</ListItem.Content>
				</>
			}
			isExpanded={expanded}
			onPress={() => setExpanded(!expanded)}
			bottomDivider
		>
			<ListItem onPress={props.onPress} bottomDivider>
				<Icon style={styles.icon} name="edit" size={20} color="black" />
				<ListItem.Content>
					<ListItem.Title>Edit</ListItem.Title>
				</ListItem.Content>
				<ListItem.Chevron />
			</ListItem>
			{props.monitor.isActive ? (
				<ListItem onPress={() => onStopPress(props.monitor)} bottomDivider>
					<Icon
						style={styles.icon}
						name="stop-circle"
						size={20}
						color="black"
					/>
					<ListItem.Content>
						<ListItem.Title>Stop</ListItem.Title>
					</ListItem.Content>
				</ListItem>
			) : (
				<>
					<ListItem onPress={() => onStartPress(props.monitor)} bottomDivider>
						<Icon
							style={styles.icon}
							name="play-circle"
							size={20}
							color="black"
						/>
						<ListItem.Content>
							<ListItem.Title>Start</ListItem.Title>
						</ListItem.Content>
					</ListItem>
					<ListItem onPress={() => onDeletePress(props.monitor)} bottomDivider>
						<Icon style={styles.icon} name="trash-2" size={20} color="black" />
						<ListItem.Content>
							<ListItem.Title>Delete</ListItem.Title>
						</ListItem.Content>
					</ListItem>
				</>
			)}
		</ListItem.Accordion>
	);
}

export { MonitorItem };
