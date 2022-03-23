import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme, ListItem, Avatar } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import {
	monitorType,
	startMonitor,
	stopMonitor,
	deleteMonitor,
} from '../../services';

const styles = StyleSheet.create({
	content: { marginLeft: 10 },
	subtitleView: { marginTop: 10, flexDirection: 'row' },
	subtitle: { color: 'gray', fontSize: 10 },
	icon: { paddingLeft: 45 },
});

/**
 * props:
 * - monitor
 * - onPress
 * - onRefresh
 */
function MonitorItem({ ...props }) {
	const { theme } = useTheme();

	const [expanded, setExpanded] = useState(false);

	function errorHandling(err) {
		console.error(err.response ? err.response.data : err.message);
	}

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

	function onStartPress(monitor) {
		startMonitor(monitor.id)
			.then((_result) => {
				if (props.onRefresh) props.onRefresh();
			})
			.catch((err) => {
				errorHandling(err);
			});
	}

	function onStopPress(monitor) {
		stopMonitor(monitor.id)
			.then((_result) => {
				if (props.onRefresh) props.onRefresh();
			})
			.catch((err) => {
				errorHandling(err);
			});
	}

	function onDeletePress(monitor) {
		deleteMonitor(monitor.id)
			.then((_result) => {
				if (props.onRefresh) props.onRefresh();
			})
			.catch((err) => {
				errorHandling(err);
			});
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
			onPress={(_event) => setExpanded(!expanded)}
			bottomDivider
		>
			<ListItem
				onPress={(event) => {
					if (props.onPress) props.onPress(event);
				}}
				bottomDivider
			>
				<Icon style={styles.icon} name="edit" size={20} color="black" />
				<ListItem.Content>
					<ListItem.Title>Edit</ListItem.Title>
				</ListItem.Content>
				<ListItem.Chevron />
			</ListItem>
			{props.monitor.isActive ? (
				<ListItem
					onPress={(_event) => onStopPress(props.monitor)}
					bottomDivider
				>
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
					<ListItem
						onPress={(_event) => onStartPress(props.monitor)}
						bottomDivider
					>
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
					<ListItem
						onPress={(_event) => onDeletePress(props.monitor)}
						bottomDivider
					>
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

export default MonitorItem;
