import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { Button, Input, useTheme } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import { HeaderRow, SelectSide, SelectType } from '../../components';
import { ENUM_ORDER_SIDE, ENUM_ORDER_TYPE } from '../../enums/ordersEnums';
import { saveOrderTemplate } from '../../services';
import { NewOrderTemplateStyles as styles } from './styles';

/**
 * props:
 * - navigation
 * - route
 */
function NewOrderTemplate({ ...props }) {
	const { theme } = useTheme();

	const DEFAULT_ORDER_TEMPLATE = {
		symbol: 'BTCUSDT',
		type: ENUM_ORDER_TYPE.MARKET,
		side: ENUM_ORDER_SIDE.BUY,
		name: '',
		quantity: '',
		quantityMultiplier: 1,
		limitPrice: '',
		limitPriceMultiplier: 1,
		stopPrice: '',
		stopPriceMultiplier: 1,
	};

	const [orderTemplate, setOrderTemplate] = useState(DEFAULT_ORDER_TEMPLATE);
	const [errorState, setErrorState] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	function errorHandling(error) {
		console.error(error.response ? error.response.data : error.message);
	}

	useEffect(() => {
		setErrorState('');

		if (props.route.params.data) setOrderTemplate(props.route.params.data);
		else setOrderTemplate(DEFAULT_ORDER_TEMPLATE);
	}, [props.route.params]);

	function onPress() {
		setErrorState('');

		setIsLoading(true);

		saveOrderTemplate(orderTemplate.id, orderTemplate)
			.then((result) => {
				setIsLoading(false);

				props.navigation.navigate('Order Templates', {
					screen: 'OrderTemplatesList',
					params: { orderTemplate: result },
				});
			})
			.catch((error) => {
				setIsLoading(false);

				errorHandling(error);
			});
	}

	return (
		<View style={theme.page}>
			<View style={styles.header}>
				<HeaderRow
					symbol={orderTemplate.symbol}
					onBackPress={() => props.navigation.navigate('OrderTemplatesList')}
					onSymbolChange={(event) =>
						setOrderTemplate({ ...orderTemplate, symbol: event })
					}
				/>
			</View>
			<View style={theme.container}>
				<View
					style={{ ...styles.scrollViewContainer, ...theme.inputContainer }}
				>
					<ScrollView>
						<Input
							label="Name"
							keyboardType="name-phone-pad"
							value={orderTemplate.name}
							onChangeText={(event) =>
								setOrderTemplate({ ...orderTemplate, name: event })
							}
						/>
						<Text style={styles.label}>Side</Text>
						<SelectSide
							side={orderTemplate.side}
							onChange={(event) =>
								setOrderTemplate({ ...orderTemplate, side: event })
							}
						/>
						<SelectType
							type={orderTemplate.type}
							onChange={(event) =>
								setOrderTemplate({ ...orderTemplate, type: event })
							}
						/>
						{orderTemplate.type.indexOf(ENUM_ORDER_TYPE.LIMIT) !== -1 ? (
							<Text>LimiteComponent</Text>
						) : (
							<></>
						)}
						{[
							ENUM_ORDER_TYPE.STOP_LOSS_LIMIT,
							ENUM_ORDER_TYPE.TAKE_PROFIT_LIMIT,
						].includes(orderTemplate.type) ? (
							<Text>StopComponent</Text>
						) : (
							<></>
						)}
						{orderTemplate.type === ENUM_ORDER_TYPE.TRAILING_STOP ? (
							<Text>TrailingStopComponents</Text>
						) : (
							<></>
						)}
						<Text>QuantityComponent</Text>
					</ScrollView>
				</View>
			</View>
			<View>
				<Button
					icon={() => <Icon name="save" size={20} color="white" />}
					title={isLoading ? <ActivityIndicator /> : ' Save Order Template'}
					style={styles.button}
					onPress={onPress}
				/>
				{errorState ? (
					<Text style={{ ...styles.error, ...theme.alert }}>{errorState}</Text>
				) : (
					<></>
				)}
			</View>
		</View>
	);
}

export { NewOrderTemplate };
