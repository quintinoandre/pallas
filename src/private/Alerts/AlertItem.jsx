import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { ListItem, Avatar, useTheme } from 'react-native-elements';

import 'intl';
import 'intl/locale-data/jsonp/pt-PT';

import { ENUM_ALERT_TYPE } from '../../enums';
import { AlertItemStyles as styles } from './styles';

/**
 * props:
 * - alert
 */
function AlertItem({ ...props }) {
	const { theme } = useTheme();

	const [expanded, setExpanded] = useState(false);

	function getAvatar(type) {
		let color = '';

		switch (type) {
			case ENUM_ALERT_TYPE.error:
				color = theme.colors.danger;
				break;
			case ENUM_ALERT_TYPE.success:
				color = theme.colors.success;
				break;
			case ENUM_ALERT_TYPE.info:
				color = theme.colors.info;
				break;
			default:
				break;
		}

		return (
			<Avatar
				icon={{ name: 'bell', type: 'feather', color: 'white' }}
				size="small"
				overlayContainerStyle={{ backgroundColor: color }}
				rounded
			/>
		);
	}

	function getDate(timestamp) {
		const date = new Date(timestamp);

		const frm = new Intl.DateTimeFormat('en-GB', {
			dateStyle: 'short',
			timeStyle: 'medium',
		}).format(date);

		return (
			<View style={styles.subtitleView}>
				<Text style={styles.subtitle}>{`at ${frm}`}</Text>
			</View>
		);
	}

	return (
		<>
			{props.alert ? (
				<ListItem.Accordion
					content={
						<>
							{getAvatar(props.alert.type)}
							<ListItem.Content style={styles.content}>
								<ListItem.Title>{`${props.alert.text.substring(
									0,
									20
								)}...`}</ListItem.Title>
								{getDate(props.alert.date)}
							</ListItem.Content>
						</>
					}
					isExpanded={expanded}
					onPress={() => setExpanded(!expanded)}
					topDivider
				>
					<View style={styles.fullView}>
						<Text>{props.alert.text}</Text>
					</View>
				</ListItem.Accordion>
			) : (
				<></>
			)}
		</>
	);
}

export { AlertItem };
