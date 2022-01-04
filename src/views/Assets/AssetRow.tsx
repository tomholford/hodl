import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAssets } from "../../store/Assets";
import { Asset } from "../../types/Asset.type";
import './AssetRow.scss';

export const AssetRow = ({ asset }: { asset: Asset }) => {
  const navigate = useNavigate();
  const { removeAsset } = useAssets();

  const handleEditClick = useCallback(() => {
    navigate(`/assets/edit/${asset.uuid}`)
  }, [asset.uuid, navigate]);

  const handleRemoveClick = useCallback(() => {
    removeAsset(asset.uuid);
  }, [asset.uuid, removeAsset]);

  return (
    <>
      <div className="asset-row">
        <div className="asset-currency">
          {asset.currency}
        </div>
        <div className="asset-balance">
          {asset.balance}
        </div>
        <div className="asset-action">
          <button onClick={handleEditClick}>edit</button>
          <button onClick={handleRemoveClick}>remove</button>
        </div>
      </div>
    </>
  )
}
