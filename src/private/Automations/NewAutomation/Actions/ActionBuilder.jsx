import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Button, useTheme } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import { ENUM_ACTION_TYPE } from '../../../../enums';
import {
	getAllOrderTemplates,
	getSymbol,
	getWithdrawTemplates,
} from '../../../../services';
import { ActionSelect } from './ActionSelect';
import { ActionBuilderStyles } from './styles';
import { TemplateSelect } from './TemplateSelect';

/**
 * props:
 * - symbol
 * - onAddAction
 */
function ActionBuilder({ ...props }) {
	const { theme } = useTheme();

	const [showBuilder, setShowBuilder] = useState(false);
	const [type, setType] = useState('');
	const [template, setTemplate] = useState({});
	const [isLoaded, setIsLoaded] = useState(0);
	const [orderTemplates, setOrderTemplates] = useState([]);
	const [withdrawTemplates, setWithdrawTemplates] = useState([]);

	function errorHandling(error) {
		console.error(error.response ? error.response.data : error.message);
	}

	useEffect(() => {
		if (!props.symbol) return;

		setIsLoaded(0);

		getAllOrderTemplates(props.symbol)
			.then((result) => {
				setOrderTemplates(result);

				setIsLoaded(isLoaded + 1);
			})
			.catch((error) => {
				setIsLoaded(isLoaded + 1);

				errorHandling(error);
			});

		getSymbol(props.symbol)
			.then((symbol) => {
				getWithdrawTemplates(symbol.base, 1).then((result) => {
					setWithdrawTemplates(result);

					setIsLoaded(isLoaded + 1);
				});
			})
			.catch((error) => {
				setIsLoaded(isLoaded + 1);

				errorHandling(error);
			});
	}, [props.symbol]);

	function onPress() {
		const newAction = { type };

		if (
			[ENUM_ACTION_TYPE.ORDER, ENUM_ACTION_TYPE.TRAILING].includes(
				newAction.type
			)
		) {
			if (!template) return;

			newAction.id = `ot${template.id}`;

			newAction.orderTemplateId = template.id;

			newAction.orderTemplate = template;
		} else if (newAction.type === ENUM_ACTION_TYPE.WITHDRAW) {
			if (!template) return;

			newAction.id = `wt${template.id}`;

			newAction.orderTemplateId = template.id;

			newAction.orderTemplate = template;
		} else newAction.id = newAction.type;

		props.onAddAction(newAction);

		setShowBuilder(false);
	}

	const styles = ActionBuilderStyles(type);

	function renderSelect() {
		if (!type || type.indexOf('ALERT') !== -1) return <></>;

		if (type === ENUM_ACTION_TYPE.WITHDRAW && isLoaded < 2)
			return <ActivityIndicator />;

		if (
			[ENUM_ACTION_TYPE.ORDER, ENUM_ACTION_TYPE.TRAILING].includes(type) &&
			isLoaded < 1
		)
			return <ActivityIndicator />;

		return (
			<TemplateSelect
				templates={
					type === ENUM_ACTION_TYPE.WITHDRAW
						? withdrawTemplates
						: orderTemplates
				}
				onChange={(event) => setTemplate(event)}
			/>
		);
	}

	return (
		<>
			{showBuilder ? (
				<View style={{ ...styles.build, ...theme.inputContainer }}>
					{isLoaded < 1 ? (
						<ActivityIndicator />
					) : (
						<ActionSelect onChange={(event) => setType(event)} />
					)}
					{renderSelect()}
					<Button
						icon={() => <Icon name="plus" color="black" size={20} />}
						buttonStyle={{
							...styles.showBuilderButton,
							backgroundColor: theme.colors.secondary,
						}}
						title=" Add Action"
						onPress={onPress}
					/>
				</View>
			) : (
				<View style={{ ...styles.collapsed, ...theme.inputContainer }}>
					<Button
						icon={() => <Icon name="plus" color="black" size={20} />}
						buttonStyle={{
							...styles.hideBuilderButton,
							backgroundColor: theme.colors.secondary,
						}}
						title=" Add Action"
						onPress={() => setShowBuilder(true)}
					/>
				</View>
			)}
		</>
	);
}

export { ActionBuilder };
