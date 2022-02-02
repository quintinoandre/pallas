import React from 'react';
import { Text } from 'react-native';

import SelectSymbol from '../../components/SelectSymbol/SelectSymbol';

function onSymbolChange(event) {
	alert(event);
}

function Dashboard() {
	return <SelectSymbol onSymbolChange={(event) => onSymbolChange(event)} />;
}

export default Dashboard;
