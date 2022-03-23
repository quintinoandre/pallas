import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useTheme } from 'react-native-elements';

import { SmartItem } from '../../../../components';
import { actionType } from '../../../../services';
import ActionBuilder from './ActionBuilder';
import { ActionsAreaStyles as styles } from './styles';

/**
 * props:
 * - actions
 * - symbol
 * - type
 * - onChange
 */
function ActionsArea({ ...props }) {
	const { theme } = useTheme();

	const [actions, setActions] = useState([]);
	const [symbol, setSymbol] = useState('');

	useEffect(() => {
		setActions(props.actions || []);
	}, [props.actions]);

	useEffect(() => {
		if (!props.symbol) return;

		setSymbol(props.symbol);
	}, [props.symbol]);

	function onDeleteAction(id) {
		const index = actions.findIndex((action) => action.id === id);

		actions.splice(index, 1);

		setActions(actions);

		if (props.onChange) props.onChange(actions);
	}

	function getText(action) {
		switch (action.type) {
			case actionType.ALERT_EMAIL:
				return 'Send E-mail';
			case actionType.ALERT_SMS:
				return 'Send SMS';
			case actionType.ALERT_TELEGRAM:
				return 'Send Telegram';
			case actionType.ORDER:
				return action.orderTemplate.name;
			case actionType.TRAILING:
				return action.orderTemplate.name;
			case actionType.WITHDRAW:
				return action.withdrawTemplate.name;
			default:
				break;
		}
	}

	function getIcon(type) {
		switch (type) {
			case actionType.ALERT_EMAIL:
				return 'mail';
			case actionType.ALERT_SMS:
				return 'smartphone';
			case actionType.ALERT_TELEGRAM:
				return 'message-square';
			case actionType.ORDER:
				return 'shopping-cart';
			case actionType.TRAILING:
				return 'trending-up';
			case actionType.WITHDRAW:
				return 'dollar-sign';
			default:
				break;
		}
	}

	function onAddAction(event) {
		if (actions.some((action) => action.id === event.id)) return;

		actions.push(event);

		setActions(actions);

		if (props.onChange) props.onChange(actions);
	}

	return (
		<View style={theme.container}>
			<ActionBuilder
				symbol={symbol}
				onAddAction={(event) => onAddAction(event)}
			/>
			<View style={styles.list}>
				<ScrollView>
					{actions && actions.length > 0 ? (
						actions.map((action) => (
							<SmartItem
								key={action.id}
								icon={getIcon(action.type)}
								text={getText(action)}
								onDelete={(_event) => onDeleteAction(action.id)}
							/>
						))
					) : (
						<></>
					)}
				</ScrollView>
			</View>
		</View>
	);
}

export default ActionsArea;
