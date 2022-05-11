const MONITOR_TYPE = Object.freeze({
	BOOK: 'BOOK',
	CANDLES: 'CANDLES',
	MINI_TICKER: 'MINI_TICKER',
	TICKER: 'TICKER',
	USER_DATA: 'USER_DATA',
});

const MONITOR_INTERVAL = Object.freeze({
	oneMinute: '1m',
	threeMinutes: '3m',
	fiveMinutes: '5m',
	fifteenMinutes: '15m',
	thirtyMinutes: '30m',
	oneHour: '1h',
	twoHours: '2h',
	fourHours: '4h',
	sixHours: '6h',
	eightHours: '8h',
	twelveHours: '12h',
	oneDay: '1d',
	threeDays: '3d',
	oneWeek: '1w',
	oneMonth: '1M',
});

export { MONITOR_TYPE, MONITOR_INTERVAL };
