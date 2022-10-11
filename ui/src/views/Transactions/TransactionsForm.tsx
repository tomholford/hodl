import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import { Transaction } from "../../types/Transaction.type";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useTransactionsState } from "../../state/transactions";
import { format, getTime } from 'date-fns'
import { CURRENCIES } from "../../constants";
import AsyncSelect from 'react-select/async';
import { coinSearch } from "../../services/CoinGecko.service";
import debounce from 'debounce-promise';
import './TransactionsForm.scss';

interface Option {
  value: string,
  label: string,
}

type FormData = {
  type: string;
  "coin-id": Option;
  amount: number;
  "cost-basis": number;
  note: string;
  date: string;
};

export default function TransactionsForm({ transaction }: { transaction?: Transaction }) {
  const isEditing = transaction !== undefined;
  const navigate = useNavigate()
  const { control, register, handleSubmit, formState: { isValid } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    // TODO: disable submit button when submitting
    const msDate = getTime(new Date(data.date));

    if (isEditing) {
      useTransactionsState.getState().edit({
        id: transaction.id,
        "coin-id": data["coin-id"].value,
        date: msDate,
        note: data.note,
        amount: data.amount,
        "cost-basis": data['cost-basis'],
        type: 'buy',
      })
    } else {
      useTransactionsState.getState().add({
        id: uuidv4(),
        "coin-id": data["coin-id"].value,
        date: msDate,
        note: data.note,
        amount: data.amount,
        "cost-basis": data['cost-basis'],
        type: 'buy',
      });
    }

    navigate('/transactions');
  };

  // const selectedCoinId = watch('coin-id', transaction?.['coin-id']);
  // const selectedDate = watch('date', transaction?.date);
  // const debouncedDate = useDebounce(selectedDate, 500);

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

  const defaultDate = transaction?.date ? format(transaction.date, 'y-MM-dd') : undefined;

  const handleCancelClick = useCallback(() => navigate('/'), [navigate]);

  const defaultOptions = React.useMemo(() => {
    return Object.keys(CURRENCIES).map(c => {
      const coin = CURRENCIES[c as keyof typeof CURRENCIES];
      return { label: `${coin.label} (${coin.value})`, value: coin.id , thumb: coin.thumb }
    })
  }, []);

  const loadOptions = async (q: string) => {
    const { coins } = await coinSearch(q);
    return coins ? coins.map(c => ({ label: `${c.name} (${c.symbol?.toUpperCase()})`, value: c.id ?? '', thumb: c.thumb })) : [];
  }

  const debouncedLoadOptions = debounce(loadOptions, 300);

  // TODO: if not in the list of defaults, need to query for it individually and pre-select
  const defaultCoinId = () => {
    if(transaction && defaultOptions) {
      return defaultOptions.find(o => o.value === transaction["coin-id"])
    }
  };

  return (
    <>
      {transaction ? <p>{`Editing ${transaction.id}`}</p> : null}
      <form id="transactions-form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="mb-3 font-semibold">
            <span>asset&nbsp;</span>
            <Controller
              name={"coin-id"}
              control={control}
              defaultValue={defaultCoinId()}
              render={({ field }) => {
                return (
                  <AsyncSelect
                    {...field}
                    isSearchable
                    isClearable
                    cacheOptions
                    placeholder="Select or search for an asset"
                    defaultValue={defaultCoinId()}
                    defaultOptions={defaultOptions}
                    loadOptions={debouncedLoadOptions}
                    formatOptionLabel={(coin) => (
                      <div className="coin-option">
                        {/* @ts-expect-error Coin option has a thumb */}
                        <img src={coin.thumb} alt="coin thumbnail" />
                        <span>{coin.label}</span>
                      </div>
                    )}
                  />
                )
              }}
            />
          </label>
        </div>
        <div>
          <label htmlFor="amount">amount</label>
          <input type="number" placeholder={'420.69'} defaultValue={transaction?.amount} min={0} step={'any'} max={Number.MAX_VALUE} {...register('amount')} />
        </div>
        <div>
          <label htmlFor="date">date acquired</label>
          <input type="date" defaultValue={defaultDate} {...register('date')} />
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
          <input type="submit" disabled={!isValid} />
        </div>
      </form>
    </>
  );
}
