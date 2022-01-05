import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { useAssets } from "../../store/Assets";
import AssetsForm from "./AssetsForm";

export const AssetsEdit = () => {
  const navigate = useNavigate();
  const { assets } = useAssets();
  const { uuid } = useParams<{uuid: string}>();
  const editingAsset = useMemo(() => {
    if(!assets) { return };

    return assets.find(a => a.uuid === uuid);
  }, [assets, uuid]);

  useEffect(() => {
    if(!editingAsset) {
      navigate('/assets');
    }
  }, [editingAsset, navigate]);

  return (<>
    <h1>Edit an Asset</h1>
    <AssetsForm asset={editingAsset} />
  </>)
}
