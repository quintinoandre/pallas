import React, { useEffect, useState } from 'react';
import Picker from 'react-native-picker-select';

import { Feather as Icon } from '@expo/vector-icons';

import { TemplateSelectStyles as pickerSelectStyles } from './styles';

/**
 * props:
 * - templates
 * - onChange
 */
function TemplateSelect({ ...props }) {
	const [templates, setTemplates] = useState([]);
	const [selected, setSelected] = useState();

	useEffect(() => {
		setTemplates(props.templates || []);
	}, [props.templates]);

	function onChange(event) {
		if (!event) return;

		setSelected(event);

		if (props.onChange)
			props.onChange(templates.find((template) => template.id === event));
	}

	return (
		<Picker
			Icon={() => <Icon name="chevron-down" size={24} color="black" />}
			style={{ ...pickerSelectStyles, iconContainer: { top: 10, right: 12 } }}
			value={selected}
			useNativeAndroidPickerStyle={false}
			items={templates.map((template) => {
				return { label: template.name, value: template.id };
			})}
			onValueChange={(event) => onChange(event)}
		/>
	);
}

export default TemplateSelect;
