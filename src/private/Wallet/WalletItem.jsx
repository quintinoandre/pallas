import React from 'react';
import { ListItem } from 'react-native-elements';

/**
 * props:
 * - coin
 * - fiat
 */
function WalletItem({ ...props }) {
	return (
		<ListItem bottomDivider>
			<ListItem.Content>
				<ListItem.Title>{props.coin.coin}</ListItem.Title>
			</ListItem.Content>
		</ListItem>
	);
}

export default WalletItem;
