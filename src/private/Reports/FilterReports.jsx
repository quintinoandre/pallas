import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Overlay, Button, FAB } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import { thirtyDaysAgo } from '../../services/OrdersService';

const styles = StyleSheet.create({
	overlay: { flex: 0, width: '90%', height: 310 },
});

/**
 * props:
 * onFilter
 */
function FilterReports({ ...props }) {
	const [filter, setFilter] = useState({
		quote: 'USDT',
		startDate: thirtyDaysAgo(),
		endDate: Date.now(),
	});
	const [showFilter, setShowFilter] = useState(false);

	return (
		<>
			<FAB
				title={<Icon name="filter" size={20} color="white" />}
				placement="right"
				onPress={(_event) => setShowFilter(true)}
			/>
			<Overlay
				overlayStyle={styles.overlay}
				isVisible={showFilter}
				onBackdropPress={(_event) => setShowFilter(false)}
			>
				<Text>Filter Reports</Text>
				<Button
					icon={<Icon name="filter" size={20} color="white" />}
					title=" Filter Report"
					onPress={(_event) => {
						if (props.onFilter) props.onFilter(filter);
					}}
				/>
			</Overlay>
		</>
	);
}

export default FilterReports;
