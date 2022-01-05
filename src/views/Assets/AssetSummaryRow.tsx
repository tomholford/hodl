import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { Asset } from "../../types/Asset.type";
import { Currency } from "../../types/Currency.type";
import { AssetRow } from "./AssetRow";
import './AssetSummaryRow.scss';

export const AssetSummaryRow = ({ assets, currency }: { assets: Asset[], currency: string }) => {
  const count = assets.length;
  const balance = assets.reduce((memo, a) => memo + a.balance, 0);

  const [showDetails, setShowDetails] = useState(false);
  const handleShowDetailsClick = useCallback(() => {
    setShowDetails(state => !state);
  }, []);

  return (<>
    <div className="asset-summary-row">
      <div className="summary-currency">{currency}</div>
      <div className="summary-count">{count} records</div>
      <div className="summary-balance">
        {balance} total balance
      </div>
      <div className="summary-action">
        <button onClick={handleShowDetailsClick}>{showDetails ? 'less' : 'more'}</button>
      </div>
    </div>
    {
      showDetails && (
        <div className="summary-details">
          {assets && assets.length > 0 ?
            (
              assets.map(a => <AssetRow asset={a} key={a.uuid} />)
            ) :
            (
              <p>No assets available, <Link to={'/assets/new'}>add one here</Link></p>
            )
          }
        </div>
      )
    }
  </>)
}
