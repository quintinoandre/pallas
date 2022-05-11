import React, { useEffect, useState } from 'react';
import { Input } from 'react-native-elements';

import { Feather as Icon } from '@expo/vector-icons';

import { styles } from './styles';

/**
 * props:
 * - timestamp
 * - label
 * - onChange
 */
function DateInput({ ...props }) {
	const [dateState, setDateState] = useState('');

	useEffect(() => {
		if (!props.timestamp) return;

		const isoDate = new Date(props.timestamp).toISOString();

		const splitParts = isoDate.split('T');

		const splitDate = splitParts[0].split('-');

		setDateState(`${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`);
	}, [props.timestamp]);

	function unformatDate(text) {
		if (text.indexOf('/') === -1 || text.length < 10) return text;

		const splitDate = text.split('/');

		const day = splitDate[0];

		const month = splitDate[1];

		const year = splitDate[2].split(' ')[0]; // 01/01/2022 23:45:00

		return new Date(`${year}-${month}-${day}T00:00:00.000Z`);
	}

	function onChangeText(text) {
		const chars = text.split('');

		const lastChar = chars[chars.length - 1];

		if (text.length === 3 && !text.endsWith('/'))
			text = `${text.substring(0, 2)}/${lastChar}`;
		else if (text.length === 6 && !text.endsWith('/'))
			text = `${text.substring(0, 5)}/${lastChar}`;
		else if (text.length > 10) text = text.substring(0, 10);

		const date = unformatDate(text);

		if (date instanceof Date) props.onChange(date.getTime());

		setDateState(text);
	}

	return (
		<Input
			label={props.label}
			placeholder="dd/mm/yyyy"
			keyboardType="numeric"
			leftIcon={
				<Icon
					iconStyle={styles.button}
					name="calendar"
					size={24}
					color="black"
					backgroundColor="transparent"
				/>
			}
			value={dateState.substring(0, 10)}
			onChangeText={(event) => onChangeText(event)}
		/>
	);
}

export { DateInput };
