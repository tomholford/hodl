import './AssetTotals.scss';
import { useAssets } from '../../store/Assets';
import { useMemo } from 'react';
import useSimpleCoinPrices from '../../queries/useSimpleCoinPrices';
import { currencyToCoinId } from '../../lib/currencyToCoinId';
import { useSettings } from '../../store/Settings';
import { pluralize } from '../../lib/presenters';
import { TotalCell } from './TotalCell';

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
    <div className="asset-totals">
      <div className="total-value">
        <TotalCell balance={totalCurrentValue} label='balance' />
      </div>
      <div className="total-pnl">
        <TotalCell balance={totalPnl} label='P / L' />
      </div>
      <div className="total-assets">{totalAssetCount} {pluralize('record', totalAssetCount)} across {assetCurrencies.length} {pluralize('asset', assetCurrencies.length)}</div>
    </div>
  </>);
}
