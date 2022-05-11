import { ENUM_ORDER_STATUS, ENUM_ORDER_SIDE } from './enums';

function getColorByOrderStatus(status, theme) {
	switch (status) {
		case ENUM_ORDER_STATUS.REJECTED:
		case ENUM_ORDER_STATUS.CANCELED:
		case ENUM_ORDER_STATUS.EXPIRED:
			return theme.colors.danger;
		case ENUM_ORDER_STATUS.FILLED:
			return theme.colors.success;
		case ENUM_ORDER_STATUS.PARTIALLY_FILLED:
			return theme.colors.info;
		default:
			return theme.colors.warning;
	}
}

function getColorByOrderSide(side, theme) {
	switch (side) {
		case ENUM_ORDER_SIDE.SELL:
			return theme.colors.danger;
		case ENUM_ORDER_SIDE.BUY:
			return theme.colors.success;
		default:
			return 'black';
	}
}

function getColorByAutomationStatus(automation, theme) {
	if (!automation.isActive) return theme.colors.danger;

	if (automation.isActive && automation.schedule) return theme.colors.info;

	return theme.colors.success;
}

export {
	getColorByOrderStatus,
	getColorByOrderSide,
	getColorByAutomationStatus,
};
