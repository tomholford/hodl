import { useCallback, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAssets } from "../../store/Assets";
import { AssetRow } from "./AssetRow";
import { groupBy } from 'lodash';
import { Asset } from "../../types/Asset.type";
import { AssetSummaryRow } from "./AssetSummaryRow";
import { Currency } from "../../types/Currency.type";

export const AssetsIndex = () => {
  const navigate = useNavigate();
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

  const handleAddClick = useCallback(() => {
    navigate('/assets/new');
  }, [navigate])

  return (<>
    <h1>Assets</h1>
    <button onClick={handleAddClick}>add</button>
    {/* {
      assets && assets.length > 0 ?
      (
        assets.map(a => <AssetRow asset={a} key={a.uuid} />)
      ) :
      (
        <p>No assets available, <Link to={'/assets/new'}>add one here</Link></p>
      )
    } */}

    {
      assetCurrencies && assetCurrencies.length > 0 ?
      (
        assetCurrencies.map(c => <AssetSummaryRow currency={c} assets={groupedAssets[c]} key={c} />)
      ) :
      (
        <p>No assets available, <Link to={'/assets/new'}>add one here</Link></p>
      )
    }
  </>)
}

// grouped assets by currency
