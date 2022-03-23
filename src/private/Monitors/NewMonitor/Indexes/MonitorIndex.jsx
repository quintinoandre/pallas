import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import Picker from 'react-native-picker-select';

import { Feather as Icon } from '@expo/vector-icons';

import { getAnalysisIndexes } from '../../../../services';
import { MonitorIndexStyles as pickerSelectStyles } from './styles';

/**
 * props:
 * - onChange
 */
function MonitorIndex({ ...props }) {
	const [isLoading, setIsLoading] = useState(false);
	const [analysis, setAnalysis] = useState([]);
	const [index, setIndex] = useState('');

	function errorHandling(err) {
		console.error(err.response ? err.response.data : err.message);
	}

	useEffect(() => {
		setIsLoading(true);

		getAnalysisIndexes()
			.then((result) => {
				setIsLoading(false);

				setAnalysis(
					Object.keys(result)
						.sort()
						.map((key) => {
							const { name, params } = result[key];

							return { key, name, params: params !== 'none' ? params : '' };
						})
				);
			})
			.catch((err) => {
				setIsLoading(false);

				errorHandling(err);
			});
	}, []);

	function onChange(event) {
		if (!event) return;

		setIndex(event);

		if (props.onChange) props.onChange(analysis.find((a) => a.key === event));
	}

	return (
		// eslint-disable-next-line react/jsx-no-useless-fragment
		<>
			{isLoading ? (
				<ActivityIndicator />
			) : (
				<Picker
					Icon={() => <Icon name="chevron-down" size={24} color="black" />}
					style={{
						...pickerSelectStyles,
						iconContainer: { top: 0, right: 12 },
					}}
					value={index}
					useNativeAndroidPickerStyle={false}
					items={analysis.map((item) => {
						return { label: item.name, value: item.key };
					})}
					onValueChange={(event) => onChange(event)}
				/>
			)}
		</>
	);
}

export default MonitorIndex;
