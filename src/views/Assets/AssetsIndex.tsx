import { Link } from "react-router-dom";
import { useAssets } from "../../store/Assets";
import { AssetSummaryRow } from "./AssetSummaryRow";
import './AssetsIndex.scss';
import { AssetTotals } from "./AssetTotals";

export const AssetsIndex = () => {
  const { groupedAssets, assetCurrencies } = useAssets();

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
        <AssetTotals />
      </>
      ) :
      (
        <p>No assets available, <Link to={'/assets/new'}>add one here</Link></p>
      )
    }
  </>)
}
