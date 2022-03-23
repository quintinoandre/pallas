import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useTheme, ListItem, Avatar } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import {
	startAutomation,
	stopAutomation,
	deleteAutomation,
} from '../../services';
import { getColorByAutomationStatus } from '../../Utils';
import { AutomationItemStyles as styles } from './styles';

/**
 * props:
 * - automation
 * - onPress
 * - onRefresh
 */
function AutomationItem({ ...props }) {
	const { theme } = useTheme();

	const [expanded, setExpanded] = useState(false);

	function errorHandling(err) {
		console.error(err.response ? err.response.data : err.message);
	}

	function getIcon(automation) {
		const icon = { color: 'white', type: 'feather' };

		if (automation.schedule) return { ...icon, name: 'calendar' };

		if (automation.grids && automation.grids.length)
			return { ...icon, name: 'align-justify' };

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

	function onStartPress(automation) {
		startAutomation(automation.id)
			.then((_result) => {
				if (props.onRefresh) props.onRefresh();
			})
			.catch((err) => {
				errorHandling(err);
			});
	}

	function onStopPress(automation) {
		stopAutomation(automation.id)
			.then((_result) => {
				if (props.onRefresh) props.onRefresh();
			})
			.catch((err) => {
				errorHandling(err);
			});
	}

	function onDeletePress(automation) {
		deleteAutomation(automation.id)
			.then((_result) => {
				if (props.onRefresh) props.onRefresh();
			})
			.catch((err) => {
				errorHandling(err);
			});
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
		>
			<ListItem
				onPress={(event) => {
					props.onPress && props.onPress(event);
				}}
				bottomDivider
			>
				<Icon style={styles.icon} name="edit" size={20} color="black" />
				<ListItem.Content>
					<ListItem.Title>Edit</ListItem.Title>
				</ListItem.Content>
				<ListItem.Chevron />
			</ListItem>
			{props.automation.isActive ? (
				<ListItem
					onPress={(_event) => {
						onStopPress(props.automation);
					}}
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
						onPress={(_event) => {
							onStartPress(props.automation);
						}}
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
						onPress={(_event) => {
							onDeletePress(props.automation);
						}}
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

export default AutomationItem;
