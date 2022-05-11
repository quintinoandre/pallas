import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Avatar, ListItem, useTheme } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import { ENUM_ORDER_SIDE } from '../../enums';
import { deleteOrderTemplate } from '../../services';
import { OrderTemplateItemStyles as styles } from './styles';

/**
 * props:
 * - data
 * - onPress
 * - onRefresh
 */
function OrderTemplateItem({ ...props }) {
	const { theme } = useTheme();

	const [expanded, setExpanded] = useState(false);

	function errorHandling(error) {
		console.error(error.response ? error.response.data : error.message);
	}

	function getColor(side) {
		switch (side) {
			case ENUM_ORDER_SIDE.BUY:
				return theme.colors.success;
			case ENUM_ORDER_SIDE.SELL:
				return theme.colors.danger;
			default:
				return 'black';
		}
	}

	function getAvatar(orderTemplate) {
		return (
			<Avatar
				rounded
				size="small"
				title={orderTemplate.side}
				titleStyle={styles.avatar}
				overlayContainerStyle={{
					backgroundColor: getColor(orderTemplate.side),
				}}
			/>
		);
	}

	function onDeletePress(orderTemplate) {
		deleteOrderTemplate(orderTemplate.id)
			.then(() => props.onRefresh())
			.catch((error) => errorHandling(error));
	}

	return (
		<ListItem.Accordion
			bottomDivider
			content={
				<>
					{getAvatar(props.data)}
					<ListItem.Content style={styles.content}>
						<ListItem.Title>{props.data.name}</ListItem.Title>
						<View style={styles.subtitleView}>
							<Text styles={styles.subtitle}>
								{props.data.symbol} {props.data.type}
							</Text>
						</View>
					</ListItem.Content>
				</>
			}
			isExpanded={expanded}
			onPress={() => setExpanded(!expanded)}
		>
			<ListItem bottomDivider onPress={(event) => props.onPress(event)}>
				<Icon name="edit" size={20} color="black" style={styles.icon} />
				<ListItem.Content>
					<ListItem.Title>Edit</ListItem.Title>
				</ListItem.Content>
				<ListItem.Chevron />
			</ListItem>
			<ListItem bottomDivider onPress={() => onDeletePress(props.data)}>
				<Icon name="trash" size={20} color="black" style={styles.icon} />
				<ListItem.Content>
					<ListItem.Title>Delete</ListItem.Title>
				</ListItem.Content>
				<ListItem.Chevron />
			</ListItem>
		</ListItem.Accordion>
	);
}

export { OrderTemplateItem };
