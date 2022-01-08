import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useExchangeRate } from "../../lib/useExchangeRate";
import { Asset } from "../../types/Asset.type";
import { Balance } from "../Shared/Balance";
import { AssetRow } from "./AssetRow";
import './AssetSummaryRow.scss';

export const AssetSummaryRow = ({ assets, currency }: { assets: Asset[], currency: string }) => {
  const count = assets.length;
  const balance = assets.reduce((memo, a) => memo + Number(a.balance), 0);
  
  const [showDetails, setShowDetails] = useState(false);
  const handleShowDetailsClick = useCallback(() => {
    setShowDetails(state => !state);
  }, []);

  const exchangeRate = useExchangeRate(currency);

  const currencyValue = useMemo(() => {
    if(!exchangeRate) { return 0 };

    return exchangeRate * balance;
  }, [balance, exchangeRate]);

  return (<>
    <h2>{currency} <small>{exchangeRate ? `($ ${exchangeRate})` : 'Loading...'}</small></h2>
    <div className="asset-summary-row">
      <div className="summary-balance">
        {balance} {currency}
      </div>
      <div className="summary-value"><Balance balance={currencyValue} /></div>
      <div className="summary-count">{count} records</div>
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
