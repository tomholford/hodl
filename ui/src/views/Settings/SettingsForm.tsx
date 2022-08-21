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
    if(!(vsCurrencyQuery.isSuccess && vsCurrencyQuery.data)) { return Object.keys(CURRENCY_SYMBOLS) };

    const output = vsCurrencyQuery.data;
    output.sort();

    return output;
  }, [vsCurrencyQuery.data, vsCurrencyQuery.isSuccess])

  return (
    <form onSubmit={onSubmit}>
      <label>vsCurrency</label>
      <select defaultValue={vsCurrency || undefined} {...register("vsCurrency")}>
        {
          currencyOptions.map(c => {
            return (
              <option value={c} key={c}>{c}</option>
            )
          })
        }
      {errors.vsCurrency ? <p>Currency error</p> : null}
      </select>
      <input type="submit" />
    </form>
  );
}
