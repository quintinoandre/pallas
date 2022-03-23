import React from 'react';

import { Feather as Icon } from '@expo/vector-icons';

/**
 * props:
 * - name
 */
function DrawerIcon({ ...props }) {
	return <Icon name={props.name} size={23} color="#9CA3AF" />;
}

export { DrawerIcon };
