import { orderStatus, orderSide } from './services';

function getColorByOrderStatus(status, theme) {
	switch (status) {
		case orderStatus.REJECTED:
		case orderStatus.CANCELED:
		case orderStatus.EXPIRED:
			return theme.colors.danger;
		case orderStatus.FILLED:
			return theme.colors.success;
		case orderStatus.PARTIALLY_FILLED:
			return theme.colors.info;
		default:
			return theme.colors.warning;
	}
}

function getColorByOrderSide(side, theme) {
	switch (side) {
		case orderSide.SELL:
			return theme.colors.danger;
		case orderSide.BUY:
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
