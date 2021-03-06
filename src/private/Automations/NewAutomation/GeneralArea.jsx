import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Input, useTheme } from 'react-native-elements';

import { SwitchInput } from '../../../components/SwitchInput';
import { ENUM_AUTOMATION_TYPE } from '../../../enums';
import { ScheduleInput } from './ScheduleInput';
import { GeneralAreaStyles as styles } from './styles';

/**
 * props:
 * - automation
 * - type
 * - onChange
 */
function GeneralArea({ ...props }) {
	const { theme } = useTheme();

	const [automation, setAutomation] = useState({});

	useEffect(() => {
		setAutomation(props.automation);
	}, [props.automation]);

	function onChange(newProp) {
		const newData = { ...automation, [newProp.name]: newProp.value };

		setAutomation(newData);

		props.onChange(newProp);
	}

	return (
		<View style={{ ...theme.container }}>
			<View style={{ ...theme.inputContainer }}>
				<ScrollView>
					<Input
						label="Name"
						placeholder="Automation name"
						keyboardType="default"
						autoCapitalize="words"
						value={automation.name}
						onChangeText={(event) => onChange({ name: 'name', value: event })}
					/>
					{props.type === ENUM_AUTOMATION_TYPE.SCHEDULE ||
					automation.schedule ? (
						<ScheduleInput
							schedule={automation.schedule}
							onChange={(event) => onChange({ name: 'schedule', value: event })}
						/>
					) : (
						<></>
					)}
					<View style={styles.row}>
						<SwitchInput
							text="Is Active?"
							onChange={(event) => onChange({ name: 'isActive', value: event })}
							isChecked={automation.isActive}
						/>
						<SwitchInput
							text="Enable logs?"
							onChange={(event) => onChange({ name: 'logs', value: event })}
							isChecked={automation.logs}
						/>
					</View>
				</ScrollView>
			</View>
		</View>
	);
}

export { GeneralArea };
