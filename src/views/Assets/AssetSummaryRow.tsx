import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CURRENCY_SYMBOLS } from "../../constants";
import { pluralize } from "../../lib/presenters";
import { useExchangeRate } from "../../lib/useExchangeRate";
import { useSettings } from "../../store/Settings";
import { Asset } from "../../types/Asset.type";
import { Balance } from "../Shared/Balance";
import { AssetHeaderRow } from "./AssetHeaderRow";
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
  const { vsCurrency } = useSettings();
  const symbol = useMemo(() => {
    if(vsCurrency in CURRENCY_SYMBOLS) {
      return CURRENCY_SYMBOLS[vsCurrency as keyof typeof CURRENCY_SYMBOLS];
    } else {
      return vsCurrency.toUpperCase();
    }
  }, [vsCurrency]);

  const currentValue = useMemo(() => {
    if(!exchangeRate) { return 0 };

    return exchangeRate * balance;
  }, [balance, exchangeRate]);

  const initialValue = useMemo(() => {
    if(!assets) { return 0 };

    return assets.reduce((memo, a) => memo + Number(a.costBasis) * a.balance, 0)
  }, [assets]);

  const pnl = useMemo(() => {
    return currentValue - initialValue;
  }, [currentValue, initialValue]);

  return (<>
    <h3>{currency} <small>{exchangeRate ? `(${symbol} ${exchangeRate})` : 'Loading...'}</small></h3>
    <div className="asset-summary-row">
      <div className="summary-balance">
        {balance} {currency}
        <div className="cell-label">
          balance
        </div>
      </div>
      <div className="summary-value">
        <Balance balance={currentValue} />
        <div className="cell-label">
          current value
        </div>
      </div>
      <div className="summary-pnl">
        <Balance balance={pnl} />
        <div className="cell-label">
          P / L
        </div>
      </div>
      <div className="summary-count">{count} {pluralize('record', count)}</div>
      <div className="summary-action">
        <button onClick={handleShowDetailsClick}>{showDetails ? 'less' : 'more'}</button>
      </div>
    </div>
    {
      showDetails && (
        <div className="summary-details">
          <hr/>
          {assets && assets.length > 0 ?
            (
              <>
                <AssetHeaderRow />
                { assets.map(a => <AssetRow asset={a} key={a.uuid} />) }
              </>
            ) :
            (
              <p>No assets available, <Link to={'/assets/new'}>add one here</Link></p>
            )
          }
          <hr/>
        </div>
      )
    }
  </>)
}
