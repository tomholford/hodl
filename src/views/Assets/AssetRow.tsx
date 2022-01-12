import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useExchangeRate } from "../../lib/useExchangeRate";
import { useAssets } from "../../store/Assets";
import { Asset } from "../../types/Asset.type";
import { Balance } from "../Shared/Balance";
import './AssetRow.scss';

export const AssetRow = ({ asset }: { asset: Asset }) => {
  const navigate = useNavigate();
  const { removeAsset } = useAssets();

  const exchangeRate = useExchangeRate(asset.currency);

  const currentValue = useMemo(() => {
    if(!exchangeRate) { return 0 };

    return exchangeRate * asset.balance;
  }, [asset.balance, exchangeRate]);

  const initialValue = useMemo(() => {
    if(!(asset.balance && asset.costBasis)) { return null };

    return asset.balance * asset.costBasis;
  }, [asset.balance, asset.costBasis]);

  const pnl = useMemo(() => {
    if(!(initialValue && currentValue)) { return null };

    return currentValue - initialValue;
  }, [currentValue, initialValue]);

  const handleEditClick = useCallback(() => {
    navigate(`/assets/edit/${asset.uuid}`)
  }, [asset.uuid, navigate]);

  const handleRemoveClick = useCallback(() => {
    removeAsset(asset.uuid);
  }, [asset.uuid, removeAsset]);

  return (
    <>
      <div className="asset-row">
        <div className="asset-balance">
          {asset.balance} {asset.currency}
        </div>
        <div className="asset-value"><Balance balance={currentValue} /></div>
        <div className="asset-pnl">{pnl && <Balance balance={pnl} />}</div>
        <div className="asset-cost-basis">{asset.costBasis ? `$ ${asset.costBasis} / unit` : null}</div>
        <div className="asset-acquired-date">{asset.acquiredAt}</div>
        <div className="asset-note">{asset.note}</div>
        <div className="asset-action">
          <button onClick={handleEditClick}>edit</button>
          <button onClick={handleRemoveClick}>remove</button>
        </div>
      </div>
    </>
  )
}
