import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { SelectFiat, NewOrderButton } from '../../components';

const styles = StyleSheet.create({
	page: { flexDirection: 'column', flex: 1 },
});

/**
 * props:
 * - navigation?
 * - route?
 */
function Wallet({ ...props }) {
	const [fiat, setFiat] = useState('USD');

	return (
		<>
			<View style={styles.page}>
				<SelectFiat onChange={(event) => setFiat(event)} />
			</View>
			<NewOrderButton symbol="" navigation={props.navigation} />
		</>
	);
}

export default Wallet;
