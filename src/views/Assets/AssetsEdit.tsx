import { useMemo } from "react";
import { useParams } from "react-router-dom"
import { useAssets } from "../../store/Assets";
import AssetsForm from "./AssetsForm";

export const AssetsEdit = () => {
  const { assets } = useAssets();
  const { uuid } = useParams<{uuid: string}>();
  const editingAsset = useMemo(() => {
    if(!assets) { return };

    return assets.find(a => a.uuid === uuid);
  }, [assets, uuid]);

  // TODO: ensure asset, otherwise redirect to /new

  return (<>
    <h1>Assets Edit</h1>
    <AssetsForm asset={editingAsset} />
  </>)
}
