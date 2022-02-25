import { Link, useNavigate } from "react-router-dom";
import { useAssets } from "../../store/Assets";
import './AssetsIndex.scss';
import { AssetTotals } from "./AssetTotals";
import { ExportAssetsButton } from "./ExportAssetsButton";
import { ImportAssetsButton } from "./ImportAssetsButton";
import { useCallback } from "react";
import { AssetsTable } from "./AssetsTable";

export const AssetsIndex = () => {
  const { assets, assetCurrencies } = useAssets();

  const navigate = useNavigate();
  const handleAddClick = useCallback(() => {
    navigate('/assets/new');
  }, [navigate]);

  return (<>
    <h2>Assets</h2>
    {
      assetCurrencies && assetCurrencies.length > 0 ?
      (
      <>
        <div className="assets-actions">
          <button title="add another asset" onClick={handleAddClick}>💲</button>
          {assets && assets.length > 0 && <ExportAssetsButton assets={assets} />}
        </div>
        <AssetTotals />
        <AssetsTable />
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
