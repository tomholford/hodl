import * as React from "react";
import { useForm } from "react-hook-form";
import { useAccounts } from "../../store/Accounts";
import { v4 as uuidv4 } from 'uuid';
import { Currency } from "../../types/Currency.type";
import { CURRENCIES } from "../../constants";
import { isValidAddress } from "../../lib/validators";

type FormData = {
  custodial: boolean;
  address: string;
  currency: Currency;
};

export default function AccountForm() {
  const { addAccount } = useAccounts();
  const { register, handleSubmit, setError, reset, watch, formState: { errors } } = useForm<FormData>();
  const onSubmit = handleSubmit(data => {
    if (!isValidAddress(data.address, data.currency)) {
      setError('address', { message: `Invalid ${data.currency} address` })
      return;
    }

    reset();

    addAccount({
      custodial: data.custodial,
      address: data.address,
      currency: data.currency,
      uuid: uuidv4()
    });
  });

  const isCustodial = watch("custodial");

  return (
    <form onSubmit={onSubmit}>
      <label>custodial</label>
      <input type="checkbox" {...register("custodial")} />
      {
        isCustodial ?
          (<>
            <span>custodial</span>
          </>) : (
            <>
              <label>address</label>
              <input {...register("address", { required: true })} />
            </>)
      }
      {
        errors.address && <p>{errors.address.message}</p>
      }
      <label>currency</label>
      <select {...register("currency")}>
        {
          Object.keys(CURRENCIES).map(c => {
            return (
              <option value={c} key={c}>{c}</option>

            )
          })
        }
      </select>
      <input type="submit" />
    </form>
  );
}
