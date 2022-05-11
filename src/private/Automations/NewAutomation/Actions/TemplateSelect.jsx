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

	function onChange(template) {
		if (!template) return;

		setSelected(template);

		props.onChange(templates.find((item) => item.id === template));
	}

	return (
		<Picker
			Icon={() => <Icon name="chevron-down" size={24} color="black" />}
			style={pickerSelectStyles}
			value={selected}
			useNativeAndroidPickerStyle={false}
			items={templates.map((template) => {
				return { label: template.name, value: template.id };
			})}
			onValueChange={(event) => onChange(event)}
		/>
	);
}

export { TemplateSelect };
