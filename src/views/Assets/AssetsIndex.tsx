import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAssets } from "../../store/Assets";
import { AssetRow } from "./AssetRow";

export const AssetsIndex = () => {
  const navigate = useNavigate();
  const { assets } = useAssets();

  const handleAddClick = useCallback(() => {
    navigate('/assets/new');
  }, [navigate])

  return (<>
    <h1>Assets Index</h1>
    <button onClick={handleAddClick}>add</button>
    {
      assets && assets.length > 0 ?
      (
        assets.map(a => <AssetRow asset={a} />)
      ) :
      (
        <p>No assets available, <Link to={'/assets/new'}>add one here</Link></p>
      )
    }
  </>)
}
