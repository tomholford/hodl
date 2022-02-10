import React, { useCallback, useMemo, useState } from "react";
import { CURRENCIES, CURRENCY_SYMBOLS } from "../../constants";
import { pluralize } from "../../lib/presenters";
import { useCoinImage } from "../../lib/useCoinImage";
import { useExchangeRate } from "../../lib/useExchangeRate";
import { useSettings } from "../../store/Settings";
import { Asset } from "../../types/Asset.type";
import { Balance } from "../Shared/Balance";
import { AssetHeaderRow } from "./AssetHeaderRow";
import { AssetRow } from "./AssetRow";
import './AssetTableRow.scss';

export const AssetTableRow = ({ assets, currency }: { assets: Asset[], currency: string }) => {
  const count = assets.length;
  const balance = assets.reduce((memo, a) => memo + Number(a.balance), 0);
  const presentedBalance = useMemo(() => {
    if(balance === 0) { return 0.0 };

    return balance.toFixed(5).replace(/[0]+$/g,"");
  }, [balance]);

  const [showDetails, setShowDetails] = useState(false);
  const handleShowDetailsClick = useCallback((event: React.MouseEvent<HTMLButtonElement | HTMLTableRowElement>) => {
    event.stopPropagation();
    setShowDetails(state => !state);
  }, []);

  const exchangeRate = useExchangeRate(currency);
  const { vsCurrency } = useSettings();
  const symbol = useMemo(() => {
    if (vsCurrency in CURRENCY_SYMBOLS) {
      return CURRENCY_SYMBOLS[vsCurrency as keyof typeof CURRENCY_SYMBOLS];
    } else {
      return vsCurrency.toUpperCase();
    }
  }, [vsCurrency]);

  const currentValue = useMemo(() => {
    if (!exchangeRate) { return 0 };

    return exchangeRate * balance;
  }, [balance, exchangeRate]);

  const initialValue = useMemo(() => {
    if (!assets) { return 0 };

    return assets.reduce((memo, a) => memo + Number(a.costBasis) * a.balance, 0)
  }, [assets]);

  const pnl = useMemo(() => {
    return currentValue - initialValue;
  }, [currentValue, initialValue]);

  const currencyLabel = useMemo(() => {
    return CURRENCIES[currency as keyof typeof CURRENCIES].label;
  }, [currency]);

  const apiCoinImage = useCoinImage(currency);
  const assetIcon = useMemo(() => {
    if(!apiCoinImage) { return currency };
    
    return <img src={apiCoinImage.thumb} alt={symbol} />
  }, [apiCoinImage, currency, symbol]);

  return (<>
    <tr className="asset-table-row" onClick={handleShowDetailsClick}>
      <td>{assetIcon}</td>
      <td className="">{currencyLabel} <small>{currency}</small></td>
      <td className="align-right">{exchangeRate ? `${symbol} ${exchangeRate}` : 'Loading...'}</td>
      <td className="align-right">{presentedBalance} <small>{currency}</small></td>
      <td className="align-right">{<Balance balance={currentValue} />}</td>
      <td className="align-right">{<Balance balance={pnl} />}</td>
      <td className="align-right">
        <button onClick={handleShowDetailsClick}>{showDetails ? 'hide' : 'show'} {count} {pluralize('record', count)}</button>
      </td>
    </tr>
    {
      showDetails && (
        <tr className="asset-table-details">
          <td colSpan={8}>
            {assets && assets.length > 0 &&
              (
                <table className="asset-transactions">
                  <AssetHeaderRow />
                  {assets.map(a => <AssetRow asset={a} key={a.uuid} />)}
                </table>
              )
            }
          </td>
        </tr>
      )
    }
  </>)
}
