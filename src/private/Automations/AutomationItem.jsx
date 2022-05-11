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
 * - onPress?
 * - onRefresh
 */
function AutomationItem({ ...props }) {
	const { theme } = useTheme();

	const [expanded, setExpanded] = useState(false);

	function errorHandling(error) {
		console.error(error.response ? error.response.data : error.message);
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
			.then(() => props.onRefresh())
			.catch((error) => errorHandling(error));
	}

	function onStopPress(automation) {
		stopAutomation(automation.id)
			.then(() => props.onRefresh())
			.catch((error) => errorHandling(error));
	}

	function onDeletePress(automation) {
		deleteAutomation(automation.id)
			.then(() => props.onRefresh())
			.catch((error) => errorHandling(error));
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
			onPress={() => setExpanded(!expanded)}
			bottomDivider
		>
			<ListItem
				onPress={() => {
					if (props.onPress) props.onPress();
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
				<ListItem onPress={() => onStopPress(props.automation)} bottomDivider>
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
						onPress={() => onStartPress(props.automation)}
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
						onPress={() => onDeletePress(props.automation)}
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

export { AutomationItem };
