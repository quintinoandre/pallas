import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem, Avatar, useTheme } from 'react-native-elements';

import { alertType } from '../../services/AlertsService';

import 'intl';
import 'intl/locale-data/jsonp/pt-PT';

const styles = StyleSheet.create({
	content: { marginLeft: 10 },
	subtitleView: { marginTop: 5, flexDirection: 'row' },
	subtitle: { color: 'grey', fontSize: 10 },
	fullView: {
		paddingTop: 10,
		paddingBottom: 20,
		paddingHorizontal: 60,
		backgroundColor: '#fff',
	},
});

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
			case alertType.error:
				color = theme.colors.danger;
				break;
			case alertType.success:
				color = theme.colors.success;
				break;
			case alertType.info:
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
			onPress={(_event) => setExpanded(!expanded)}
			topDivider
		>
			<View style={styles.fullView}>
				<Text>{props.alert.text}</Text>
			</View>
		</ListItem.Accordion>
	);
}

export default AlertItem;
