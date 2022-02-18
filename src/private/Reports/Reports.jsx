import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';

import FilterReport from './FilterReport';

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
			<FilterReport onFilter={(event) => setFilter({ ...event })} />
		</>
	);
}

export default Reports;
