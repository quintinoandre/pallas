import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Overlay, Button, FAB } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import { SelectQuote, DateInput } from '../../components';
import { thirtyDaysAgo } from '../../services/OrdersService';

const styles = StyleSheet.create({
	overlay: { flex: 0, width: '90%', height: 310 },
	button: { paddingHorizontal: 10, paddingTop: 10 },
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

	function onFilter(_event) {
		setShowFilter(false);

		if (props.onFilter) props.onFilter(filter);
	}

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
				<SelectQuote
					onChange={(event) =>
						setFilter((prevState) => setFilter({ ...prevState, quote: event }))
					}
				/>
				<DateInput
					label="Start Date"
					timestamp={filter.startDate}
					onChange={(event) =>
						setFilter((prevState) =>
							setFilter({ ...prevState, startDate: event })
						)
					}
				/>
				<DateInput
					label="End Date"
					timestamp={filter.endDate}
					onChange={(event) =>
						setFilter((prevState) =>
							setFilter({ ...prevState, endDate: event })
						)
					}
				/>
				<Button
					icon={<Icon name="filter" size={20} color="white" />}
					style={styles.button}
					title=" Filter Report"
					onPress={(event) => onFilter(event)}
				/>
			</Overlay>
		</>
	);
}

export default FilterReports;
