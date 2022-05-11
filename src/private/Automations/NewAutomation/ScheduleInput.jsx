import React, { useEffect, useState } from 'react';
import { Input } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import { ScheduleInputStyles as styles } from './styles';

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

		props.onChange('');
	}

	function onChangeText(text) {
		if (!isCron) {
			const chars = text.split('');

			const lastChar = chars[chars.length - 1];

			if (text.length === 3 && !text.endsWith('/'))
				text = `${text.substring(0, 2)}/${lastChar}`;
			else if (text.length === 6 && !text.endsWith('/'))
				text = `${text.substring(0, 5)}/${lastChar}`;
			else if (text.length === 11 && !text.endsWith(' '))
				text = `${text.substring(0, 10)} ${lastChar}`;
			else if (text.length === 14 && !text.endsWith(':'))
				text = `${text.substring(0, 13)}:${lastChar}`;
			else if (text.length === 17 && !text.endsWith(':'))
				text = `${text.substring(0, 16)}:${lastChar}`;
			else if (text.length > 19) text = text.substring(0, 19);

			const date = unformatDate(text);

			props.onChange(date);
		} else props.onChange(text);

		setScheduleState(text);
	}

	return (
		<Input
			label={getLabel()}
			placeholder={getPlaceholder()}
			keyboardType={getKeyboard()}
			leftIcon={
				<Icon.Button
					iconStyle={styles.button}
					name="repeat"
					size={24}
					color="black"
					underlayColor="white"
					backgroundColor="transparent"
					onPress={onScheduleByClick}
				/>
			}
			value={scheduleState}
			onChangeText={(event) => onChangeText(event)}
		/>
	);
}

export { ScheduleInput };
