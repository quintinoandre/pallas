import React, { useState } from 'react';
import { Overlay, Button, FAB } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import { SelectQuote, DateInput } from '../../components';
import { thirtyDaysAgo } from '../../services';
import { FilterReportStyles as styles } from './styles';

/**
 * props:
 * onFilter
 */
function FilterReport({ ...props }) {
	const [showFilter, setShowFilter] = useState(false);
	const [filter, setFilter] = useState({
		quote: 'USDT',
		startDate: thirtyDaysAgo(),
		endDate: Date.now(),
	});

	function onFilter() {
		setShowFilter(false);

		props.onFilter(filter);
	}

	return (
		<>
			<FAB
				title={<Icon name="filter" size={20} color="white" />}
				placement="right"
				onPress={() => setShowFilter(true)}
			/>
			<Overlay
				overlayStyle={styles.overlay}
				isVisible={showFilter}
				onBackdropPress={() => setShowFilter(false)}
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
					onPress={onFilter}
				/>
			</Overlay>
		</>
	);
}

export { FilterReport };
