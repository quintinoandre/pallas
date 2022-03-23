import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { ListItem, useTheme } from 'react-native-elements';

import { Block } from '../../../components';
import { orderSide } from '../../../services';
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
							(grid) => grid.orderTemplate.side === orderSide.BUY
						).length
					})`}</Text>
				</Block>
				<ScrollView>
					{props.grids
						.filter((grid) => grid.orderTemplate.side === orderSide.BUY)
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
							(grid) => grid.orderTemplate.side === orderSide.SELL
						).length
					})`}</Text>
				</Block>
				<ScrollView>
					{props.grids
						.filter((grid) => grid.orderTemplate.side === orderSide.SELL)
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

export default GridArea;
