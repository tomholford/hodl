import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { useAssets } from "../../store/Assets";
import { v4 as uuidv4 } from 'uuid';
import { Currency } from "../../types/Currency.type";
import { BITCOIN_ORIGIN_DATE, CURRENCIES, DEFAULT_VS_CURRENCY } from "../../constants";
import { Asset } from "../../types/Asset.type";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useMemo } from "react";
import useCoinHistory from "../../queries/useCoinHistory";
import { currencyToCoinId } from "../../lib/currencyToCoinId";
import { DateTime } from 'luxon';
import { useDebounce } from "usehooks-ts";
import './AssetsForm.scss';
import useCoinsList from "../../queries/useCoinsList";
import Select from "react-select";

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
  const { control, register, handleSubmit, reset, watch, setValue } = useForm<FormData>();
  const onSubmit = handleSubmit(data => {
    reset();

    if (isEditing) {
      updateAsset(asset.uuid, {
        currency: data.currency,
        balance: data.balance,
        costBasis: data.costBasis,
        note: data.note,
        acquiredAt: data.acquiredAt,
      })
    } else {
      addAsset({
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
    // TODO: what is a good default?
    if (!selectedCurrency) { return 'bitcoin' };

    return currencyToCoinId(selectedCurrency)
  }, [selectedCurrency]);

  const queryDate = useMemo(() => {
    if (debouncedDate) {
      const d = DateTime.fromFormat(debouncedDate, 'yyyy-LL-dd');

      // TODO: check if in range (origin date and before or today)
      if (d.isValid) {
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
    // TODO: what is the ideal UX?
    // Do not overwrite an existing costbasis
    // Already persisted, or field touched
    if (asset?.costBasis) { return };

    if (coinHistoryQuery.isSuccess && coinHistoryQuery.data && coinHistoryQuery.data.market_data?.current_price && (DEFAULT_VS_CURRENCY in coinHistoryQuery.data.market_data.current_price)) {
      const basis = parseFloat(coinHistoryQuery.data.market_data.current_price[DEFAULT_VS_CURRENCY].toFixed(2));
      setValue('costBasis', basis)
    }
  }, [asset, coinHistoryQuery, setValue]);

  // const coinsListQuery = useCoinsList();

  // const currencySelectOptions = useMemo(() => {
  //   if(coinsListQuery.)
  //   if(coinsListQuery.isSuccess && )
  // }, [])

  // TODO: use the coinslistquer loading
  const isLoading = false;

  const handleCancelClick = useCallback(() => navigate('/'), [navigate]);

  return (
    <>
      {asset ? <p>{`Editing ${asset.uuid}`}</p> : null}
      <form id="assets-form" onSubmit={onSubmit}>
        <div>
          <label>currency</label>
          {/* <select defaultValue={asset?.currency} {...register("currency")}>
            {
              Object.keys(CURRENCIES).map(c => {
                return (
                  <option value={c} key={c}>{c}</option>

                )
              })
            }
          </select> */}

          <Controller
            name="currency"
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Select
                isLoading={isLoading}
                isSearchable={true}
                placeholder={isLoading ? "Loading..." : "Select a currency..."}
                onChange={onChange}
                onBlur={onBlur}
                options={
                  Object.keys(CURRENCIES).map(c => { 
                    return { label: CURRENCIES[c as Currency].label, value: CURRENCIES[c as Currency].value }
                  })
                }
              />
            )}
          />
        </div>
        <div>
          <label htmlFor="balance">balance</label>
          <input type="number" placeholder={'420.69'} defaultValue={asset?.balance} min={0} step={'any'} max={Number.MAX_VALUE} {...register('balance')} />
        </div>
        <div>
          <label htmlFor="acquiredAt">date acquired</label>
          <input type="date" defaultValue={asset?.acquiredAt} {...register('acquiredAt')} />
        </div>
        <div>
          <label htmlFor="costBasis">costBasis</label>
          <input type="number" defaultValue={asset?.costBasis} min={0} step={'any'} max={Number.MAX_VALUE} {...register('costBasis')} />
        </div>
        <div>
          <label htmlFor="note">note</label>
          <input type="text" defaultValue={asset?.note} {...register('note')} />
        </div>
        <div>
          <button onClick={handleCancelClick}>cancel</button>
          <input type="submit" disabled={coinHistoryQuery.isFetching} />
        </div>
      </form>
    </>
  );
}
