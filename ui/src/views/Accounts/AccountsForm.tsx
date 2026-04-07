import * as React from "react";
import { useForm } from "react-hook-form";
import { useAccountsState } from "../../state/accounts";
import { useWallets } from "../../state/wallets";
import { v4 as uuidv4 } from 'uuid';

type FormData = {
  "wallet-id": string;
  name: string;
  note: string;
};

export default function AccountForm() {
  const wallets = useWallets();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const onSubmit = handleSubmit(async (data) => {
    await useAccountsState.getState().add({
      id: uuidv4(),
      "wallet-id": data["wallet-id"],
      name: data.name,
      note: data.note ?? '',
    });
    reset();
  });

  return (
    <form onSubmit={onSubmit}>
      <label>wallet</label>
      <select {...register("wallet-id", { required: true })}>
        <option value="">Select a wallet</option>
        {wallets.map(w => (
          <option value={w.id} key={w.id}>{w.name}</option>
        ))}
      </select>
      {errors["wallet-id"] && <p>Wallet is required</p>}
      <label>name</label>
      <input {...register("name", { required: true })} />
      {errors.name && <p>Name is required</p>}
      <label>note</label>
      <input {...register("note")} />
      <input type="submit" />
    </form>
  );
}
