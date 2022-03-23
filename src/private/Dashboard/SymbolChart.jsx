import React, { useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';

import { SymbolChartStyles as styles } from './styles';

/**
 * props:
 * - symbol
 *
 */
function SymbolChart({ ...props }) {
	const [widget, setWidget] = useState();

	useEffect(() => {
		if (!props.symbol) return;

		setWidget(`
      <div class="tradingview-widget-container">
        <div style="border-radius:10px;" id="tradingview_8e76f"></div>
        <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
        <script type="text/javascript">
          new TradingView.widget(
            {
              "autosize": true,
              "symbol": "BINANCE:${props.symbol}",
              "interval": "D",
              "timezone": "Etc/UTC",
              "theme": "dark",
              "style": "1",
              "locale": "en",
              "toolbar_bg": "#f1f3f6",
              "enable_publishing": false,
              "hide_top_toolbar": true,
              "allow_symbol_change": true,
              "save_image": false,
              "container_id": "tradingview_8e76f"
            }
          );
        </script>
        <style>body { background-color: #000; }</style>
      </div>
    `);
	}, [props.symbol]);

	return (
		<WebView
			containerStyle={styles.chart}
			style={styles.bugfixAndroid}
			originWhitelist={['*']}
			source={{ html: widget }}
		/>
	);
}

export default SymbolChart;
