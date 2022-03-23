import React from 'react';
import { Button, ListItem } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import { Styles as styles } from './styles';

/**
 * props:
 * - text
 * - icon
 * - onDelete
 * - style?
 */
function SmartItem({ ...props }) {
	const icon = <Icon name={props.icon} color="black" size={20} />;

	const rightButton = (
		<Button
			icon={<Icon name="trash-2" color="white" size={20} />}
			title="Delete"
			buttonStyle={styles.rightButton}
			onPress={(event) => {
				if (props.onDelete) props.onDelete(event);
			}}
		/>
	);

	return (
		<ListItem.Swipeable rightContent={rightButton} bottomDivider>
			{icon}
			<ListItem.Content>
				<ListItem.Title style={{ ...props.style }}>{props.text}</ListItem.Title>
			</ListItem.Content>
		</ListItem.Swipeable>
	);
}

export { SmartItem };
