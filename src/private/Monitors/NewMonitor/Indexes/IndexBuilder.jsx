import React from 'react';
import { Text } from 'react-native';

import MonitorIndex from './MonitorIndex';

function IndexBuilder() {
	function onChange(event) {
		alert(JSON.stringify(event));
	}

	return (
		<>
			<Text>Index Builder</Text>
			<MonitorIndex onChange={(event) => onChange(event)} />
		</>
	);
}

export default IndexBuilder;
