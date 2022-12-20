import React from 'react';
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { CURRENCY_SYMBOLS } from "../../constants";
import useSupportedVsCurrencies from "../../queries/useSupportedVsCurrencies";
import { useSettings } from "../../store/Settings";

type FormData = {
  vsCurrency: string;
  isDarkMode: boolean;
};

export default function SettingsForm() {
  const { vsCurrency, setVsCurrency } = useSettings();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const onSubmit = handleSubmit(data => {
    setVsCurrency(data.vsCurrency);
  });

  const vsCurrencyQuery = useSupportedVsCurrencies();

  const currencyOptions = useMemo(() => {
    if(!(vsCurrencyQuery.isSuccess && vsCurrencyQuery.data)) { return Object.keys(CURRENCY_SYMBOLS).sort() };

    const output = vsCurrencyQuery.data;
    output.sort();

    return output;
  }, [vsCurrencyQuery.data, vsCurrencyQuery.isSuccess])

  return (
    <form onSubmit={onSubmit}>
      <section>
        <h3>
          Base Currency
        </h3>
        <p>This currency is used in dashboard calculations.</p>
        <p>For each asset, the corresponding base currency exchange rate from Coingecko is used to determine profit / loss and total portfolio value.</p>
        <select style={{ marginTop: '10px', marginBottom: '10px' }} disabled={vsCurrencyQuery.isLoading} defaultValue={vsCurrency || undefined} {...register("vsCurrency")}>
          {
            currencyOptions.map(c => {
              return (
                <option value={c} key={c}>{c.toLocaleUpperCase()}</option>
              )
            })
          }
        {errors.vsCurrency ? <p>Currency error</p> : null}
        </select>
      </section>
      <section>
        <input type="submit" />
      </section>
    </form>
  );
}
