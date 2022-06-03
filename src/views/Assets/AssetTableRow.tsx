import React, { useCallback, useMemo, useState } from "react";
import { useCoinImage } from "../../lib/useCoinImage";
import { useExchangeRate } from "../../lib/useExchangeRate";
import { Asset } from "../../types/Asset.type";
import { Balance } from "../Shared/Balance";
import { AssetHeaderRow } from "./AssetHeaderRow";
import { AssetRow } from "./AssetRow";
import { ReactComponent as ChevronDown } from '../../images/chevron-down.svg';
import { ReactComponent as ChevronUp } from '../../images/chevron-up.svg';
import './AssetTableRow.scss';
import { formattedBalance } from "../../lib/presenters";
import useCoin from "../../queries/useCoin";

export const AssetTableRow = ({ assets, coinId }: { assets: Asset[], coinId: string }) => {
  const balance = assets.reduce((memo, a) => memo + Number(a.balance), 0);
  const [showDetails, setShowDetails] = useState(false);
  const handleShowDetailsClick = useCallback((event: React.MouseEvent<HTMLButtonElement | HTMLTableRowElement>) => {
    event.stopPropagation();
    setShowDetails(state => !state);
  }, []);

  const exchangeRate = useExchangeRate(coinId);
  const coinQuery = useCoin(coinId);
  const symbol = useMemo(() => {
    if(coinQuery.isSuccess && coinQuery.data) {
      return coinQuery.data.symbol
    }

    return '?'; // TODO: is there a better experience?
  }, [coinQuery.data, coinQuery.isSuccess])

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
    if(coinQuery.isSuccess && coinQuery.data) {
      return coinQuery.data.name
    }

    return '?'; // TODO: is there a better experience?
  }, [coinQuery.data, coinQuery.isSuccess]);

  const currencyShortLabel = useMemo(() => {
    if(coinQuery.isSuccess && coinQuery.data) {
      return coinQuery.data.symbol; // TODO: what should we show here? inspect the response
    }

    return '?'; // TODO: is there a better experience?
  }, [coinQuery.data, coinQuery.isSuccess]);

  const apiCoinImage = useCoinImage(coinId);
  const assetIcon = useMemo(() => {
    if(!apiCoinImage) { return '?' };
    
    return <img src={apiCoinImage.thumb} alt={symbol} />
  }, [apiCoinImage, symbol]);

  return (<>
    <tr className="asset-table-row" onClick={handleShowDetailsClick}>
      <td>{assetIcon}</td>
      <td className="">{currencyLabel} <small>{currencyShortLabel}</small></td>
      <td className="align-right">{exchangeRate ? `${symbol} ${exchangeRate}` : 'Loading...'}</td>
      <td className="align-right">{formattedBalance(balance)} <small>{currencyShortLabel}</small></td>
      <td className="align-right">{<Balance balance={currentValue} />}</td>
      <td className="align-right">{<Balance balance={pnl} />}</td>
      <td className="align-right">
        <span className="details-button" onClick={handleShowDetailsClick}>{showDetails ? <ChevronUp/> : <ChevronDown/>}</span>
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
