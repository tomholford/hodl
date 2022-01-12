import * as React from "react";
import { useForm } from "react-hook-form";
import { useAssets } from "../../store/Assets";
import { v4 as uuidv4 } from 'uuid';
import { Currency } from "../../types/Currency.type";
import { BITCOIN_ORIGIN_DATE, CURRENCIES } from "../../constants";
import { Asset } from "../../types/Asset.type";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import useCoinHistory from "../../queries/useCoinHistory";
import { currencyToCoinId } from "../../lib/currencyToCoinId";
import { DateTime } from 'luxon';
import { useDebounce } from "usehooks-ts";

type FormData = {
  type: string;
  currency: Currency;
  balance: number;
  costBasis: number;
  note: string;
  acquiredAt: string;
};

export default function AssetsForm({ asset }: { asset?: Asset }) {
  const isEditing = asset !== undefined;
  const navigate = useNavigate()
  const { addAsset, updateAsset } = useAssets();
  const { register, handleSubmit, reset, watch, setValue } = useForm<FormData>();
  const onSubmit = handleSubmit(data => {
    reset();

    if(isEditing) {
      updateAsset(asset.uuid, {
        type: 'COIN',
        currency: data.currency,
        balance: data.balance,
        costBasis: data.costBasis,
        note: data.note,
        acquiredAt: data.acquiredAt,
      })
    } else {
      addAsset({
        type: 'COIN',
        currency: data.currency,
        balance: data.balance,
        costBasis: data.costBasis,
        note: data.note,
        acquiredAt: data.acquiredAt,
        uuid: uuidv4()
      });  
    }

    navigate('/assets');
  });

  const selectedCurrency = watch('currency', asset?.currency);
  const selectedDate = watch('acquiredAt', asset?.acquiredAt);
  const debouncedDate = useDebounce(selectedDate, 500);

  const coinId = useMemo(() => {  
    if(!selectedCurrency) { return 'bitcoin' };
  
    return currencyToCoinId(selectedCurrency)
  }, [selectedCurrency]);

  const queryDate = useMemo(() => {
    if(debouncedDate) {
      const d = DateTime.fromFormat(debouncedDate, 'yyyy-LL-dd');
      
      // TODO: check if in range (origin date and before or today)
      if(d.isValid) {
        return d.toFormat('dd-LL-yyyy');
      } else {
        return BITCOIN_ORIGIN_DATE;
      }
    } else { 
      return BITCOIN_ORIGIN_DATE;
    }
  }, [debouncedDate]);

  const coinHistoryQuery = useCoinHistory(coinId, queryDate);
  useEffect(() => {
    if(asset?.costBasis) { return };

    if(coinHistoryQuery.isSuccess && coinHistoryQuery.data && coinHistoryQuery.data.market_data?.current_price && ('usd' in coinHistoryQuery.data.market_data.current_price)) {
      const basis = parseFloat(coinHistoryQuery.data.market_data.current_price['usd'].toFixed(2));
      setValue('costBasis', basis)
    }
  }, [asset?.costBasis, coinHistoryQuery, setValue]);

  return (
    <>
      {asset ? <p>{`Editing ${asset.uuid}`}</p> : null}
      <form onSubmit={onSubmit}>
        <label>currency</label>
        <select defaultValue={asset?.currency} {...register("currency")}>
          {
            Object.keys(CURRENCIES).map(c => {
              return (
                <option value={c} key={c}>{c}</option>

              )
            })
          }
        </select>
        <label htmlFor="balance">balance</label>
        <input type="number" defaultValue={asset?.balance} min={0} step={'any'} max={Number.MAX_VALUE} { ...register('balance')} />
        <label htmlFor="acquiredAt">date acquired</label>
        <input type="date" defaultValue={asset?.acquiredAt} {...register('acquiredAt')} />
        <label htmlFor="costBasis">costBasis</label>
        <input type="number" defaultValue={asset?.costBasis} min={0} step={'any'} max={Number.MAX_VALUE} { ...register('costBasis')} />
        <label htmlFor="note">note</label>
        <input type="text" defaultValue={asset?.note} {...register('note')} />
        <input type="submit" disabled={coinHistoryQuery.isFetching} />
      </form>
    </>
  );
}
