import * as React from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import { Currency } from "../../types/Currency.type";
import { BITCOIN_ORIGIN_DATE, CURRENCIES, DEFAULT_VS_CURRENCY } from "../../constants";
import { Transaction } from "../../types/Transaction.type";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useMemo } from "react";
import useCoinHistory from "../../queries/useCoinHistory";
import { DateTime } from 'luxon';
import { useDebounce } from "usehooks-ts";
import './TransactionsForm.scss';

type FormData = {
  type: string;
  "coin-id": string;
  amount: number;
  costBasis: number;
  note: string;
  acquiredAt: string;
};

export default function TransactionsForm({ transaction }: { transaction?: Transaction }) {
  const isEditing = transaction !== undefined;
  const navigate = useNavigate()
  const { register, handleSubmit, reset, watch, setValue } = useForm<FormData>();
  const onSubmit = handleSubmit(data => {
    // TODO: confirm isValid

    if (isEditing) {
      updateTransaction(transaction.uuid, {
        type: 'buy',
        "coin-id": data.coin-id,
        amount: data.amount,
        costBasis: data.costBasis,
        note: data.note,
        acquiredAt: data.acquiredAt,
      })
    } else {
      add({
        type: 'buy',
        "coin-id": data.coin-id,
        amount: data.amount,
        costBasis: data.costBasis,
        note: data.note,
        acquiredAt: data.acquiredAt,
        uuid: uuidv4()
      });
    }

    reset();
    navigate('/transactions');
  });

  const selectedCoinId = watch('coin-id', transaction["coin-id"]);
  const selectedDate = watch('acquiredAt', transaction?.acquiredAt);
  const debouncedDate = useDebounce(selectedDate, 500);

  const coinId = useMemo(() => {
    // TODO: what is a good default?
    if (!selectedCoinId) { return 'bitcoin' };

    return selectedCoinId;
  }, [selectedCoinId]);

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
    if (transaction?.costBasis) { return };

    if (coinHistoryQuery.isSuccess && coinHistoryQuery.data && coinHistoryQuery.data.market_data?.current_price && (DEFAULT_VS_CURRENCY in coinHistoryQuery.data.market_data.current_price)) {
      const basis = parseFloat(coinHistoryQuery.data.market_data.current_price[DEFAULT_VS_CURRENCY].toFixed(2));
      setValue('costBasis', basis)
    }
  }, [transaction, coinHistoryQuery, setValue]);

  const handleCancelClick = useCallback(() => navigate('/'), [navigate]);

  return (
    <>
      {transaction ? <p>{`Editing ${transaction.id}`}</p> : null}
      <form id="transactions-form" onSubmit={onSubmit}>
        <div>
          <label>coin-id</label>
          <select defaultValue={transaction['coin-id']} {...register("coin-id")}>
            {
              Object.keys(CURRENCIES).map(c => {
                return (
                  <option value={c} key={c}>{c}</option>

                )
              })
            }
          </select>
        </div>
        <div>
          <label htmlFor="amount">amount</label>
          <input type="number" placeholder={'420.69'} defaultValue={transaction?.amount} min={0} step={'any'} max={Number.MAX_VALUE} {...register('amount')} />
        </div>
        <div>
          <label htmlFor="acquiredAt">date acquired</label>
          <input type="date" defaultValue={transaction?.acquiredAt} {...register('acquiredAt')} />
        </div>
        <div>
          <label htmlFor="costBasis">costBasis</label>
          <input type="number" defaultValue={transaction?.costBasis} min={0} step={'any'} max={Number.MAX_VALUE} {...register('costBasis')} />
        </div>
        <div>
          <label htmlFor="note">note</label>
          <input type="text" defaultValue={transaction?.note} {...register('note')} />
        </div>
        <div>
          <button onClick={handleCancelClick}>cancel</button>
          <input type="submit" disabled={coinHistoryQuery.isFetching} />
        </div>
      </form>
    </>
  );
}
