import * as React from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import { BITCOIN_ORIGIN_DATE, CURRENCIES, DEFAULT_VS_CURRENCY } from "../../constants";
import { Transaction } from "../../types/Transaction.type";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useMemo } from "react";
import useCoinHistory from "../../queries/useCoinHistory";
import { DateTime } from 'luxon';
import { useDebounce } from "usehooks-ts";
import './TransactionsForm.scss';
import { useTransactionsState } from "../../state/transactions";
import { getUnixTime } from 'date-fns'

type FormData = {
  type: string;
  "coin-id": string;
  amount: number;
  "cost-basis": number;
  note: string;
  date: string;
};

export default function TransactionsForm({ transaction }: { transaction?: Transaction }) {
  const isEditing = transaction !== undefined;
  const navigate = useNavigate()
  const { register, handleSubmit, reset, watch, setValue, formState: { isValid }  } = useForm<FormData>();

  const onSubmit = async (data: Transaction) => {
    // TODO: disable submit button when submitting
    const formattedDate = getUnixTime(new Date(data.date)).toString();

    if (isEditing) {
      useTransactionsState.getState().edit({
        id: transaction.id,
        "coin-id": data['coin-id'],
        date: formattedDate,
        note: data.note,
        amount: data.amount,
        "cost-basis": data['cost-basis'],
        type: 'buy',
      })
    } else {
      useTransactionsState.getState().add({
        id: uuidv4(),
        "coin-id": data['coin-id'],
        date: formattedDate,
        note: data.note,
        amount: data.amount,
        "cost-basis": data['cost-basis'],
        type: 'buy',
      });
    }

    navigate('/transactions');
  };

  const selectedCoinId = watch('coin-id', transaction?.['coin-id']);
  const selectedDate = watch('date', transaction?.date);
  const debouncedDate = useDebounce(selectedDate, 500);

  // const coinId = useMemo(() => {
  //   // TODO: what is a good default?
  //   if (!selectedCoinId) { return 'bitcoin' };

  //   return selectedCoinId;
  // }, [selectedCoinId]);

  // const queryDate = useMemo(() => {
  //   if (debouncedDate) {
  //     const d = DateTime.fromFormat(debouncedDate, 'yyyy-LL-dd');

  //     // TODO: check if in range (origin date and before or today)
  //     if (d.isValid) {
  //       return d.toFormat('dd-LL-yyyy');
  //     } else {
  //       return BITCOIN_ORIGIN_DATE;
  //     }
  //   } else {
  //     return BITCOIN_ORIGIN_DATE;
  //   }
  // }, [debouncedDate]);

  // TODO: suggest cost basis based on date?
  // const coinHistoryQuery = useCoinHistory(coinId, queryDate);
  // useEffect(() => {
  //   // TODO: what is the ideal UX?
  //   // Do not overwrite an existing costbasis
  //   // Already persisted, or field touched
  //   if (transaction?.cost-basis) { return };

  //   if (coinHistoryQuery.isSuccess && coinHistoryQuery.data && coinHistoryQuery.data.market_data?.current_price && (DEFAULT_VS_CURRENCY in coinHistoryQuery.data.market_data.current_price)) {
  //     const basis = parseFloat(coinHistoryQuery.data.market_data.current_price[DEFAULT_VS_CURRENCY].toFixed(2));
  //     setValue('cost-basis', basis)
  //   }
  // }, [transaction, coinHistoryQuery, setValue]);

  const handleCancelClick = useCallback(() => navigate('/'), [navigate]);

  return (
    <>
      {transaction ? <p>{`Editing ${transaction.id}`}</p> : null}
      <form id="transactions-form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>coingecko ID</label>
          <select defaultValue={transaction?.['coin-id']} {...register("coin-id")}>
            {
              Object.keys(CURRENCIES).map(c => {
                return (
                  // @ts-expect-error TODO  
                  <option value={CURRENCIES[c as keyof CURRENCIES].id} key={c}>{c}</option>

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
          <label htmlFor="date">date acquired</label>
          <input type="date" defaultValue={transaction?.date} {...register('date')} />
        </div>
        <div>
          <label htmlFor="cost-basis">cost-basis</label>
          <input type="number" defaultValue={transaction?.['cost-basis']} min={0} step={'any'} max={Number.MAX_VALUE} {...register('cost-basis')} />
        </div>
        <div>
          <label htmlFor="note">note</label>
          <input type="text" defaultValue={transaction?.note} {...register('note')} />
        </div>
        <div>
          <button onClick={handleCancelClick}>cancel</button>
          {/* <input type="submit" disabled={coinHistoryQuery.isFetching} /> */}
          <input type="submit" disabled={!isValid} />
        </div>
      </form>
    </>
  );
}
