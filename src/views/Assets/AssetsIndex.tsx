import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useAssets } from "../../store/Assets";
import { groupBy } from 'lodash';
import { AssetSummaryRow } from "./AssetSummaryRow";
import './AssetsIndex.scss';

export const AssetsIndex = () => {
  const { assets } = useAssets();

  const groupedAssets = useMemo(() => {
    if(!assets) { return {} };

    return groupBy(assets, a => a.currency)
  }, [assets]);

  const assetCurrencies = useMemo(() => {
    if(!groupedAssets) { return [] };

    const currencies = Object.keys(groupedAssets);
    currencies.sort();

    return currencies;
  }, [groupedAssets]);

  return (<>
    <h1>Assets</h1>
    {
      assetCurrencies && assetCurrencies.length > 0 ?
      (
      <>
        <p><Link to={'/assets/new'}>add another asset</Link></p>
        <div className="asset-summary-row-container">
          { assetCurrencies.map(c => <AssetSummaryRow currency={c} assets={groupedAssets[c]} key={c} />) }
        </div>
      </>
      ) :
      (
        <p>No assets available, <Link to={'/assets/new'}>add one here</Link></p>
      )
    }
  </>)
}
