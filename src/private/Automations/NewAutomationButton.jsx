import React, { useState } from 'react';
import { Text, View } from 'react-native';
import {
	FAB,
	Overlay,
	ListItem,
	Avatar,
	useTheme,
} from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import { AUTOMATION_TYPE } from '../../enums';
import { NewAutomationButtonStyles as styles } from './styles';

/**
 * props:
 * - navigation
 */
function NewAutomationButton({ ...props }) {
	const { theme } = useTheme();

	const [showModal, setShowModal] = useState(false);

	function onPress(type) {
		setShowModal(false);

		if (type === AUTOMATION_TYPE.GRID)
			return props.navigation.navigate('Automations', {
				screen: 'NewGrid',
				params: { type },
			});

		return props.navigation.navigate('Automations', {
			screen: 'NewAutomation',
			params: { type },
		});
	}

	function getIcon(type) {
		const icon = { color: 'white', type: 'feather' };

		if (type === AUTOMATION_TYPE.SCHEDULE) return { ...icon, name: 'calendar' };

		if (type === AUTOMATION_TYPE.GRID)
			return { ...icon, name: 'align-justify' };

		return { ...icon, name: 'command' };
	}

	function getItem(type, title, last = false) {
		return (
			<ListItem key={type} onPress={() => onPress(type)} bottomDivider={!last}>
				<Avatar
					icon={getIcon(type)}
					overlayContainerStyle={{ backgroundColor: theme.colors.secondary }}
					size="small"
					rounded
				/>
				<ListItem.Content>
					<ListItem.Title>{title}</ListItem.Title>
				</ListItem.Content>
			</ListItem>
		);
	}

	return (
		<>
			<FAB
				title={<Icon name="plus" size={20} color="white" />}
				placement="right"
				onPress={(_event) => setShowModal(!showModal)}
			/>
			<Overlay
				overlayStyle={styles.overlay}
				isVisible={showModal}
				onBackdropPress={(_event) => setShowModal(false)}
			>
				<View>
					<Text style={{ ...theme.h2, alignSelf: 'center' }}>Choose one:</Text>
					{getItem('Regular', 'Regular Automation')}
					{getItem('grid', 'Grid Automation')}
					{getItem('schedule', 'Schedule Automation', true)}
				</View>
			</Overlay>
		</>
	);
}

export { NewAutomationButton };
