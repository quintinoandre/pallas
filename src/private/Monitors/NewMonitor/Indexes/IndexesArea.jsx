import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useTheme } from 'react-native-elements';

import { SmartItem } from '../../../../components';
import IndexBuilder from './IndexBuilder';
import { IndexesAreaStyles as styles } from './styles';

/**
 * props:
 * - indexes
 * - onChange
 */
function IndexesArea({ ...props }) {
	const { theme } = useTheme();

	const [indexes, setIndexes] = useState([]);

	useEffect(() => {
		if (props.indexes)
			setIndexes(
				props.indexes.split(',').map((index) => {
					const split = index.split('_');

					if (split.length > 1) {
						const key = split[0];

						split.splice(0, 1);

						return { key, params: split.join(',') };
					}

					return { key: split[0], params: '' };
				})
			);
	}, [props.indexes]);

	function onRemoveIndex(key) {
		const position = indexes.findIndex((index) => index.key === key);

		indexes.splice(position, 1);

		setIndexes(indexes);

		if (props.onChange) props.onChange(indexes);
	}

	function getText(index) {
		return `${index.key}${
			index.params ? `_${index.params.replace(/,/gi, '_')}` : ''
		}`;
	}

	function onAddIndex(event) {
		if (indexes.some((index) => index.key === event.key)) return;

		indexes.push(event);

		setIndexes(indexes);

		if (props.onChange) props.onChange(indexes);
	}

	return (
		<View style={theme.container}>
			<IndexBuilder onAddIndex={(event) => onAddIndex(event)} />
			<View style={styles.list}>
				<ScrollView>
					{indexes && indexes.length > 0 ? (
						indexes.map((index) => (
							<SmartItem
								key={index.key}
								icon="bar-chart-2"
								text={getText(index)}
								onDelete={(_event) => onRemoveIndex(index.key)}
							/>
						))
					) : (
						<></>
					)}
				</ScrollView>
			</View>
		</View>
	);
}

export default IndexesArea;
