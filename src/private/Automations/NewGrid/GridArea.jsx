import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { ListItem, useTheme } from 'react-native-elements';

import { Block } from '../../../components';
import { ENUM_ORDER_SIDE } from '../../../enums';
import { GridAreaStyles as styles } from './styles';

/**
 * props:
 * - grids
 */
function GridArea({ ...props }) {
	const { theme } = useTheme();

	function getItem(conditions) {
		return conditions.split(' && ')[0].split(/[><]/)[1];
	}

	return (
		<View style={styles.row}>
			<View style={styles.column}>
				<Block style={styles.block} color={theme.colors.success}>
					<Text style={styles.columnTitle}>{`BUY Levels (${
						props.grids.filter(
							(grid) => grid.orderTemplate.side === ENUM_ORDER_SIDE.BUY
						).length
					})`}</Text>
				</Block>
				<ScrollView>
					{props.grids
						.filter((grid) => grid.orderTemplate.side === ENUM_ORDER_SIDE.BUY)
						.map((grid) => (
							<ListItem key={grid.id} bottomDivider>
								<ListItem.Content>
									<ListItem.Title style={{ color: theme.colors.success }}>
										{getItem(grid.conditions)}
									</ListItem.Title>
								</ListItem.Content>
							</ListItem>
						))}
				</ScrollView>
			</View>
			<View style={styles.column}>
				<Block style={styles.block} color={theme.colors.danger}>
					<Text style={styles.columnTitle}>{`SELL Levels (${
						props.grids.filter(
							(grid) => grid.orderTemplate.side === ENUM_ORDER_SIDE.SELL
						).length
					})`}</Text>
				</Block>
				<ScrollView>
					{props.grids
						.filter((grid) => grid.orderTemplate.side === ENUM_ORDER_SIDE.SELL)
						.map((grid) => (
							<ListItem key={grid.id} bottomDivider>
								<ListItem.Content>
									<ListItem.Title style={{ color: theme.colors.danger }}>
										{getItem(grid.conditions)}
									</ListItem.Title>
								</ListItem.Content>
							</ListItem>
						))}
				</ScrollView>
			</View>
		</View>
	);
}

export { GridArea };
