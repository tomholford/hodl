import { Link } from "react-router-dom";
import { useAssets } from "../../store/Assets";
import { AssetSummaryRow } from "./AssetSummaryRow";
import './AssetsIndex.scss';
import { AssetTotals } from "./AssetTotals";
import { ExportAssetsButton } from "./ExportAssetsButton";
import { ImportAssetsButton } from "./ImportAssetsButton";

export const AssetsIndex = () => {
  const { assets, groupedAssets, assetCurrencies } = useAssets();

  return (<>
    <h1>Assets</h1>
    {
      assetCurrencies && assetCurrencies.length > 0 ?
      (
      <>
        <p><Link to={'/assets/new'}>add another asset</Link>, or import from CSV:</p>
        <div>
          <span><ImportAssetsButton /></span>
        </div>
        {assets && assets.length > 0 && <ExportAssetsButton assets={assets} />}
        <div className="asset-summary-row-container">
          { assetCurrencies.map(c => <AssetSummaryRow currency={c} assets={groupedAssets[c]} key={c} />) }
        </div>
        <AssetTotals />
      </>
      ) :
      (
        <div>
          <p>No assets available, <Link to={'/assets/new'}>add one here</Link>, or import from CSV:</p>
          <ImportAssetsButton />
        </div>
      )
    }
  </>)
}
