import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

const styles = StyleSheet.create({
	button: { paddingRight: 0, marginRight: 0 },
});

/**
 * props:
 * - schedule
 * - onChange
 */
function ScheduleInput({ ...props }) {
	const [scheduleState, setScheduleState] = useState('');
	const [isCron, setIsCron] = useState(false);

	function verifyCron(schedule) {
		return /^(@(annually|yearly|monthly|weekly|daily|hourly|reboot))|(@every (\d+(ns|us|µs|ms|s|m|h))+)|((((\d+,)+\d+|(\d+(\/|-)\d+)|\d+|\*) ?){5,7})$/.test(
			schedule
		);
	}

	function verifyDate(schedule) {
		// yyyy-mm-ddThh:mm:ss.mmmZ
		return /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z)$/.test(schedule);
	}

	function formatDate(isoDate) {
		// dd/mm/yyyy hh:mm:ss
		const splitParts = isoDate.split('T');

		const splitDate = splitParts[0].split('-');

		const time = splitParts[1].replace('.000Z', '');

		return `${splitDate[2]}/${splitDate[1]}/${splitDate[0]} ${time}`;
	}

	function unformatDate(text) {
		if (text.indexOf('/') === -1 || text.length < 10) return text;

		const splitDate = text.split('/');

		const day = splitDate[0];

		const month = splitDate[1];

		const year = splitDate[2].split(' ')[0]; // 01/01/2022 23:45:00

		if (text.indexOf(' ') === -1 || text.length < 19) return text;

		const splitHour = text.split(' ')[1].split(':');

		const hour = splitHour[0];

		const minute = splitHour[1];

		const second = splitHour[2];

		return `${year}-${month}-${day}T${hour}:${minute}:${second}.000Z`;
	}

	useEffect(() => {
		if (!props.schedule) return;

		if (verifyDate(props.schedule))
			setScheduleState(formatDate(props.schedule));
		else setScheduleState(props.schedule);
	}, [props.schedule]);

	useEffect(() => {
		if (!props.schedule || verifyDate(props.schedule)) setIsCron(false);
		else if (verifyCron(props.schedule)) setIsCron(true);
	}, []);

	function getLabel() {
		return isCron ? 'Schedule by cron' : 'Schedule by date';
	}

	function getPlaceholder() {
		return isCron ? '* * * * *' : 'dd/mm/yyyy hh:mm:ss';
	}

	function getKeyboard() {
		return isCron ? 'default' : 'numeric';
	}

	function onScheduleByClick() {
		setScheduleState('');

		setIsCron(!isCron);

		if (props.onChange) props.onChange('');
	}

	function onChangeText(event) {
		if (!isCron) {
			const chars = event.split('');

			const lastChar = chars[chars.length - 1];

			if (event.length === 3 && !event.endsWith('/'))
				event = `${event.substring(0, 2)}/${lastChar}`;
			else if (event.length === 6 && !event.endsWith('/'))
				event = `${event.substring(0, 5)}/${lastChar}`;
			else if (event.length === 11 && !event.endsWith(' '))
				event = `${event.substring(0, 10)} ${lastChar}`;
			else if (event.length === 14 && !event.endsWith(':'))
				event = `${event.substring(0, 13)}:${lastChar}`;
			else if (event.length === 17 && !event.endsWith(':'))
				event = `${event.substring(0, 16)}:${lastChar}`;
			else if (event.length > 19) event = event.substring(0, 19);

			const date = unformatDate(event);

			if (props.onChange) props.onChange(date);
		} else if (props.onChange) props.onChange(event);

		setScheduleState(event);
	}

	return (
		<Input
			iconStyle={styles.button}
			label={getLabel()}
			placeholder={getPlaceholder()}
			keyboardType={getKeyboard()}
			leftIcon={
				<Icon.Button
					name="repeat"
					size={24}
					color="black"
					backgroundColor="transparent"
					onPress={(_event) => onScheduleByClick()}
				/>
			}
			value={scheduleState}
			onChangeText={(event) => onChangeText(event)}
		/>
	);
}

export default ScheduleInput;
