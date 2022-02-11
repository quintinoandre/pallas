import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Button, useTheme } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import { actionType } from '../../../../services/AutomationsService';
import { getAllOrderTemplates } from '../../../../services/OrderTemplatesService';
import { getSymbol } from '../../../../services/SymbolsService';
import { getWithdrawTemplates } from '../../../../services/WithdrawTemplatesService';
import ActionSelect from './ActionSelect';
import TemplateSelect from './TemplateSelect';

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

	function errorHandling(err) {
		console.error(err.response ? err.response.data : err.message);
	}

	useEffect(() => {
		if (!props.symbol) return;

		setIsLoaded(0);

		getAllOrderTemplates(props.symbol)
			.then((result) => {
				setOrderTemplates(result);

				setIsLoaded(isLoaded + 1);
			})
			.catch((err) => {
				setIsLoaded(isLoaded + 1);

				errorHandling(err);
			});

		getSymbol(props.symbol)
			.then((symbol) => {
				getWithdrawTemplates(symbol.base, 1).then((result) => {
					setWithdrawTemplates(result);

					setIsLoaded(isLoaded + 1);
				});
			})
			.catch((err) => {
				setIsLoaded(isLoaded + 1);

				errorHandling(err);
			});
	}, [props.symbol]);

	function onPress(_event) {
		const newAction = { type };

		if ([actionType.ORDER, actionType.TRAILING].includes(newAction.type)) {
			if (!template) return;

			newAction.id = `ot${template.id}`;

			newAction.orderTemplateId = template.id;

			newAction.orderTemplate = template;
		} else if (newAction.type === actionType.WITHDRAW) {
			if (!template) return;

			newAction.id = `wt${template.id}`;

			newAction.orderTemplateId = template.id;

			newAction.orderTemplate = template;
		} else newAction.id = newAction.type;

		if (props.onAddAction) props.onAddAction(newAction);

		setShowBuilder(false);
	}

	const styles = StyleSheet.create({
		build: {
			marginVertical: 15,
			height: type && type.indexOf('ALERT') === -1 ? 220 : 150,
			flex: 0,
		},
		collapsed: { marginVertical: 15, height: 80, flex: 0 },
	});

	function renderSelect() {
		if (!type || type.indexOf('ALERT') !== -1) return <></>;

		if (type === actionType.WITHDRAW && isLoaded < 2)
			return <ActivityIndicator />;

		if ([actionType.ORDER, actionType.TRAILING].includes(type) && isLoaded < 1)
			return <ActivityIndicator />;

		return (
			<TemplateSelect
				templates={
					type === actionType.WITHDRAW ? withdrawTemplates : orderTemplates
				}
				onChange={(event) => setTemplate(event)}
			/>
		);
	}

	return (
		// eslint-disable-next-line react/jsx-no-useless-fragment
		<>
			{showBuilder ? (
				<View style={{ ...theme.inputContainer, ...styles.build }}>
					{isLoaded < 1 ? (
						<ActivityIndicator />
					) : (
						<ActionSelect onChange={(event) => setType(event)} />
					)}
					{renderSelect()}
					<Button
						icon={() => <Icon name="plus" color="black" size={20} />}
						buttonStyle={{
							backgroundColor: theme.colors.secondary,
							marginHorizontal: 10,
							marginTop: 10,
						}}
						title=" Add Action"
						onPress={(event) => onPress(event)}
					/>
				</View>
			) : (
				<View style={{ ...theme.inputContainer, ...styles.collapsed }}>
					<Button
						icon={() => <Icon name="plus" color="black" size={20} />}
						buttonStyle={{
							backgroundColor: theme.colors.secondary,
							marginHorizontal: 10,
						}}
						title=" Add Action"
						onPress={(_event) => setShowBuilder(true)}
					/>
				</View>
			)}
		</>
	);
}

export default ActionBuilder;
