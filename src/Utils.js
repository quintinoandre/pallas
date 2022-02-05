import { orderStatus } from './services/OrdersService';

function getColorByStatus(status, theme) {
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

export { getColorByStatus };
