import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';

import FilterReports from './FilterReports';

/**
 * props:
 * - navigation
 * - route
 */
function Reports({ ...props }) {
	const [filter, setFilter] = useState({ quote: 'USDT' });

	useEffect(() => {
		alert(JSON.stringify(filter));
	}, [filter]);

	return (
		<>
			<Text>Reports</Text>
			<FilterReports onFilter={(event) => setFilter({ ...event })} />
		</>
	);
}

export default Reports;
