import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useTheme } from 'react-native-elements';

import { SmartItem } from '../../../../components';
import { ENUM_ACTION_TYPE } from '../../../../enums';
import { ActionBuilder } from './ActionBuilder';
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

		props.onChange(actions);
	}

	function getText(action) {
		switch (action.type) {
			case ENUM_ACTION_TYPE.ALERT_EMAIL:
				return 'Send E-mail';
			case ENUM_ACTION_TYPE.ALERT_SMS:
				return 'Send SMS';
			case ENUM_ACTION_TYPE.ALERT_TELEGRAM:
				return 'Send Telegram';
			case ENUM_ACTION_TYPE.ORDER:
				return action.orderTemplate.name;
			case ENUM_ACTION_TYPE.TRAILING:
				return action.orderTemplate.name;
			case ENUM_ACTION_TYPE.WITHDRAW:
				return action.withdrawTemplate.name;
			default:
				break;
		}
	}

	function getIcon(type) {
		switch (type) {
			case ENUM_ACTION_TYPE.ALERT_EMAIL:
				return 'mail';
			case ENUM_ACTION_TYPE.ALERT_SMS:
				return 'smartphone';
			case ENUM_ACTION_TYPE.ALERT_TELEGRAM:
				return 'message-square';
			case ENUM_ACTION_TYPE.ORDER:
				return 'shopping-cart';
			case ENUM_ACTION_TYPE.TRAILING:
				return 'trending-up';
			case ENUM_ACTION_TYPE.WITHDRAW:
				return 'dollar-sign';
			default:
				break;
		}
	}

	function onAddAction(action) {
		if (actions.some((item) => item.id === action.id)) return;

		actions.push(action);

		setActions(actions);

		props.onChange(actions);
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
								onDelete={() => onDeleteAction(action.id)}
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

export { ActionsArea };
