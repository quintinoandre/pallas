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
	const [indexState, setIndexState] = useState('');

	function errorHandling(error) {
		console.error(error.response ? error.response.data : error.message);
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
			.catch((error) => {
				setIsLoading(false);

				errorHandling(error);
			});
	}, []);

	function onChange(index) {
		if (!index) return;

		setIndexState(index);

		props.onChange(analysis.find((item) => item.key === index));
	}

	return (
		<>
			{isLoading ? (
				<ActivityIndicator />
			) : (
				<Picker
					Icon={() => <Icon name="chevron-down" size={24} color="black" />}
					style={pickerSelectStyles}
					value={indexState}
					useNativeAndroidPickerStyle={false}
					items={analysis.map(({ name, key }) => {
						return { label: name, value: key };
					})}
					onValueChange={(event) => onChange(event)}
				/>
			)}
		</>
	);
}

export { MonitorIndex };
