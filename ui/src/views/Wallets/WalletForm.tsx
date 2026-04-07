import * as React from "react";
import { useForm } from "react-hook-form";
import { useWalletsState } from "../../state/wallets";
import { v4 as uuidv4 } from 'uuid';

type FormData = {
  name: string;
  note: string;
};

export default function WalletForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const onSubmit = handleSubmit(async (data) => {
    await useWalletsState.getState().add({
      id: uuidv4(),
      name: data.name,
      note: data.note ?? '',
    });
    reset();
  });

  return (
    <form onSubmit={onSubmit}>
      <label>name</label>
      <input {...register("name", { required: true })} />
      <label>note</label>
      <input {...register("note")} />
      <input type="submit" />
      {
        errors.name ? <p>Name is required</p> : null
      }
    </form>
  );
}
