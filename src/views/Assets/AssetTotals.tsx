import './AssetTotals.scss';
import { useAssets } from '../../store/Assets';
import { useMemo } from 'react';
import useSimpleCoinPrices from '../../queries/useSimpleCoinPrices';
import { currencyToCoinId } from '../../lib/currencyToCoinId';
import { Balance } from '../Shared/Balance';

export const AssetTotals = () => {
  const { assetCurrencies, groupedAssets } = useAssets();
  const priceQueries = useSimpleCoinPrices(assetCurrencies.map(currencyToCoinId));

  // TODO: refactor vs currency, as global setting?
  const vsCurrency = 'usd';

  type PriceMap = Record<string, number>;
  const priceMap: PriceMap | null = useMemo(() => {
    if(!priceQueries && assetCurrencies) return null;
    if(!priceQueries.every(q => q.isSuccess)) return null;

    return assetCurrencies.reduce((memo, c) => {
      const coinId = currencyToCoinId(c);

      const priceQuery = priceQueries.find(p => Object.keys(p?.data || {}).includes(coinId));
      if(priceQuery && priceQuery.data) {
        memo[coinId] = priceQuery.data[coinId][vsCurrency];
      }

      return memo;
    }, {} as PriceMap);
  }, [assetCurrencies, priceQueries]);


  const totalValue = useMemo(() => {
    if(!(priceMap && assetCurrencies && groupedAssets)) { return 0 };
  
    return assetCurrencies.reduce((total, c) => {
      const coinId = currencyToCoinId(c);
      const assets = groupedAssets[c];

      return assets.reduce((assetTotal, a) => assetTotal + (a.balance * priceMap[coinId]), total)
    }, 0);
  }, [assetCurrencies, groupedAssets, priceMap]);

  return (<>
    <div className="asset-totals">
      <div className="total-header">TOTAL</div>
      <div className="total-value"><Balance balance={totalValue} /></div>
    </div>
  </>);
}
