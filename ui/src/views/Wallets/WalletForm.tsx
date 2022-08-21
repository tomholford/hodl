import * as React from "react";
import { useForm } from "react-hook-form";
import { useWallets } from "../../store/Wallets";
import { v4 as uuidv4 } from 'uuid';


type FormData = {
  mnemonic: string;
  passphrase?: string;
};

export default function WalletForm() {
  const { addWallet } = useWallets();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const onSubmit = handleSubmit(data => {
    console.log(data);
    addWallet({
      mnemonic: data.mnemonic,
      passphrase: data.passphrase,
      uuid: uuidv4()
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <label>mnemonic</label>
      <input {...register("mnemonic")} />
      <label>passphrase</label>
      <input {...register("passphrase")} />
      <input type="submit" />
      {
        errors ? <p>There's an error</p> : null
      }
    </form>
  );
}
