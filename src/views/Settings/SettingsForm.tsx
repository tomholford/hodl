import { useForm } from "react-hook-form";
import { CURRENCY_SYMBOLS } from "../../constants";
import { useSettings } from "../../store/Settings";

type FormData = {
  vsCurrency: string;
};

export default function SettingsForm() {
  const { vsCurrency, setVsCurrency } = useSettings();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const onSubmit = handleSubmit(data => {
    setVsCurrency(data.vsCurrency);
  });

  return (
    <form onSubmit={onSubmit}>
      <label>vsCurrency</label>
      <select defaultValue={vsCurrency || undefined} {...register("vsCurrency")}>
        {
          Object.keys(CURRENCY_SYMBOLS).map(c => {
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
