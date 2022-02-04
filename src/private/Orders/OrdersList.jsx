import React from 'react';
import { Text } from 'react-native';

import { NewOrderButton } from '../../components';

/**
 * props:
 * - navigation?
 * - route?
 */
function OrdersList({ ...props }) {
	return (
		<>
			<Text>Orders List</Text>
			<NewOrderButton navigation={props.navigation} symbol="" />
		</>
	);
}

export default OrdersList;
