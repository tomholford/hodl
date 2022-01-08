import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCoinId } from "../../lib/useCurrencyIdea";
import { useExchangeRate } from "../../lib/useExchangeRate";
import { useAssets } from "../../store/Assets";
import { Asset } from "../../types/Asset.type";
import './AssetRow.scss';

export const AssetRow = ({ asset }: { asset: Asset }) => {
  const navigate = useNavigate();
  const { removeAsset } = useAssets();

  const coinId = useCoinId(asset.currency);
  const exchangeRate = useExchangeRate(coinId);
  const currencyValue = useMemo(() => {
    if(!exchangeRate) { return 0 };

    return exchangeRate * asset.balance;
  }, [asset.balance, exchangeRate]);

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
        <div className="asset-value">$ {currencyValue}</div>
        <div className="asset-action">
          <button onClick={handleEditClick}>edit</button>
          <button onClick={handleRemoveClick}>remove</button>
        </div>
      </div>
    </>
  )
}
