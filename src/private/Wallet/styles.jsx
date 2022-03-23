import { StyleSheet } from 'react-native';

const WalletStyles = StyleSheet.create({
	page: { flexDirection: 'column', flex: 1 },
	header: { flexDirection: 'row', flex: 0, height: 40 },
	estimate: { margin: 10, fontSize: 16, paddingLeft: 14 },
	list: { marginTop: 10 },
});

const WalletItemStyles = StyleSheet.create({
	subtitleView: { marginTop: 5, flexDirection: 'row' },
	subtitle: { color: 'grey', fontSize: 10 },
});

export { WalletStyles, WalletItemStyles };
