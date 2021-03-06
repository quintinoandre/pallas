import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Input, useTheme } from 'react-native-elements';

import { SwitchInput } from '../../../components';
import { QuantityInput } from './QuantityInput';
import { GeneralAreaStyles as styles } from './styles';

/**
 * props:
 * - automation
 * - grid
 * - onAutomationChange
 * - onGridChange
 * - type
 */
function GeneralArea({ ...props }) {
	const { theme } = useTheme();

	const DEFAULT_AUTOMATION = {
		symbol: 'BTCUSDT',
		name: '',
		actions: [],
		conditions: '',
		schedule: '',
		logs: false,
		isActive: false,
	};

	const DEFAULT_GRID = {
		lowerLimit: '',
		upperLimit: '',
		levels: '',
		quantity: '',
	};

	const [automation, setAutomation] = useState(DEFAULT_AUTOMATION);
	const [grid, setGrid] = useState(DEFAULT_GRID);

	useEffect(() => {
		setAutomation(props.automation);
	}, [props.automation]);

	useEffect(() => {
		setGrid(props.grid);
	}, [props.grid]);

	function onGridChange(newProp) {
		const newData = { ...grid, [newProp.name]: newProp.value };

		setGrid(newData);

		props.onGridChange(newProp);
	}

	function onAutomationChange(newProp) {
		const newData = { ...automation, [newProp.name]: newProp.value };

		setAutomation(newData);

		props.onAutomationChange(newProp);
	}

	return (
		<View style={theme.container}>
			<View style={theme.inputContainer}>
				<ScrollView>
					<Input
						label="Lower Limit"
						placeholder="0"
						keyboardType="decimal-pad"
						value={`${grid.lowerLimit}`}
						onChangeText={(event) =>
							onGridChange({ name: 'lowerLimit', value: event })
						}
					/>
					<Input
						label="Upper Limit"
						placeholder="0"
						keyboardType="decimal-pad"
						value={`${grid.upperLimit}`}
						onChangeText={(event) =>
							onGridChange({ name: 'upperLimit', value: event })
						}
					/>
					<Input
						label="Levels"
						placeholder="3"
						keyboardType="numeric"
						value={`${grid.levels}`}
						onChangeText={(event) =>
							onGridChange({ name: 'levels', value: event })
						}
						disabled={automation.id > 0}
					/>
					<QuantityInput
						value={grid.quantity}
						onChange={(event) =>
							onGridChange({ name: 'quantity', value: event })
						}
					/>
					<View style={styles.row}>
						<SwitchInput
							text="Is Active?"
							onChange={(event) =>
								onAutomationChange({ name: 'isActive', value: event })
							}
							isChecked={automation.isActive}
						/>
						<SwitchInput
							text="Enable logs?"
							onChange={(event) =>
								onAutomationChange({ name: 'logs', value: event })
							}
							isChecked={automation.logs}
						/>
					</View>
				</ScrollView>
			</View>
		</View>
	);
}

export { GeneralArea };
