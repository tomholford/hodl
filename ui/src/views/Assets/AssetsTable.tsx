import { useAssets } from "../../store/Assets";
import { AssetTableRow } from "./AssetTableRow";
import './AssetsTable.scss';

export const AssetsTable = () => {
  const { groupedAssets, assetCurrencies } = useAssets();

  return (<>
    <div className="asset-summary-table-container">
      <table className="assets-table">
        <thead>
          <tr>
            <th colSpan={2}>asset</th>
            <th>price</th>
            <th>balance</th>
            <th>value</th>
            <th>P / L</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {assetCurrencies.map(c => <AssetTableRow currency={c} assets={groupedAssets[c]} key={c} />)}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  </>);
};
