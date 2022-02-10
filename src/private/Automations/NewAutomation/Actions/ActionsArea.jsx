import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-elements';

import { SmartItem } from '../../../../components';
import ActionBuilder from './ActionBuilder';

const styles = StyleSheet.create({
	list: { flex: 1, width: '100%', paddingHorizontal: 20 },
});

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

	function onDeleteAction(event) {}

	function getText(action) {
		return action.type;
	}

	function getIcon(type) {}

	function onAddAction(event) {}

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
								onDelete={(event) => onDeleteAction(event)}
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
