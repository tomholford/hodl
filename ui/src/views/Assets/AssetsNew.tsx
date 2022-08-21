import { isDevelopment } from "../../flags"
import { AddFakeAssetButton } from "./AddFakeAssetButton"
import AssetsForm from "./AssetsForm"
import { ImportAssetsButton } from "./ImportAssetsButton"

export const AssetsNew = () => {
  return (<>
    <h2><span className="subdued">Assets</span> / Add an Asset</h2>
    {
      isDevelopment &&
        <>
          <p>[development] add a fake asset</p>
          <AddFakeAssetButton />
        </>
    }

    <p>Import from CSV:</p>
    <ImportAssetsButton />

    <br />
    <p>Or, add one below:</p>
    <AssetsForm />
  </>)
}
