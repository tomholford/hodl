import './AssetTotals.scss';
import { useAssets } from '../../store/Assets';
import { useMemo } from 'react';
import useSimpleCoinPrices from '../../queries/useSimpleCoinPrices';
import { currencyToCoinId } from '../../lib/currencyToCoinId';
import { Balance } from '../Shared/Balance';
import { useSettings } from '../../store/Settings';

export const AssetTotals = () => {
  const { assetCurrencies, groupedAssets } = useAssets();
  const { vsCurrency } = useSettings();
  const priceQueries = useSimpleCoinPrices(assetCurrencies.map(currencyToCoinId), vsCurrency);

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
  }, [assetCurrencies, priceQueries, vsCurrency]);

  const totalCurrentValue = useMemo(() => {
    if(!(priceMap && assetCurrencies && groupedAssets)) { return 0 };
  
    return assetCurrencies.reduce((total, c) => {
      const coinId = currencyToCoinId(c);
      const assets = groupedAssets[c];

      return assets.reduce((assetTotal, a) => assetTotal + (a.balance * priceMap[coinId]), total)
    }, 0);
  }, [assetCurrencies, groupedAssets, priceMap]);

  const totalInitialValue = useMemo(() => {
    if(!(assetCurrencies && groupedAssets)) { return 0 };
  
    return assetCurrencies.reduce((total, c) => {
      const assets = groupedAssets[c];

      return assets.reduce((assetTotal, a) => assetTotal + (a.balance * (a?.costBasis || 1)), total)
    }, 0);
  }, [assetCurrencies, groupedAssets]);

  const totalPnl = useMemo(() => {
    if(!(totalCurrentValue && totalInitialValue)) { return 0 };

    return totalCurrentValue - totalInitialValue;
  }, [totalCurrentValue, totalInitialValue]);

  const totalAssetCount = useMemo(() => {
    if(!(groupedAssets && assetCurrencies)) { return 0 };

    return assetCurrencies.reduce((total, c) => {
      const assets = groupedAssets[c];
      return assets.length + total;
    }, 0);  
  }, [assetCurrencies, groupedAssets])

  return (<>
    <h2>TOTAL</h2>
    <div className="asset-totals">
      <div className="total-value">
        <Balance balance={totalCurrentValue} />
        <div className="total-label">
          balance
        </div>
      </div>
      <div className="total-pnl">
        <Balance balance={totalPnl} />
        <div className="total-label">
          P / L
        </div>
      </div>
      <div className="total-assets">{totalAssetCount} records across {assetCurrencies.length} assets</div>
    </div>
  </>);
}
