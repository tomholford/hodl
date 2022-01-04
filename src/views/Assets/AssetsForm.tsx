import * as React from "react";
import { useForm } from "react-hook-form";
import { useAssets } from "../../store/Assets";
import { v4 as uuidv4 } from 'uuid';
import { Currency } from "../../types/Currency.type";
import { CURRENCIES } from "../../constants";
import { Asset } from "../../types/Asset.type";
import { useNavigate } from "react-router-dom";


type FormData = {
  type: string;
  currency: Currency;
  balance: number;
};

export default function AssetsForm({ asset }: { asset?: Asset }) {
  const isEditing = asset !== undefined;
  const navigate = useNavigate()
  const { addAsset, updateAsset } = useAssets();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const onSubmit = handleSubmit(data => {
    reset();

    if(isEditing) {
      updateAsset(asset.uuid, {
        type: 'COIN',
        currency: data.currency,
        balance: data.balance,  
      })
    } else {
      addAsset({
        type: 'COIN',
        currency: data.currency,
        balance: data.balance,
        uuid: uuidv4()
      });  
    }

    navigate('/assets');
  });

  return (
    <>
      {asset ? <p>{`Editing ${asset.uuid}`}</p> : null}
      <form onSubmit={onSubmit}>
        <label>currency</label>
        <select defaultValue={asset?.currency} {...register("currency")}>
          {
            Object.keys(CURRENCIES).map(c => {
              return (
                <option value={c} key={c}>{c}</option>

              )
            })
          }
        </select>
        <label htmlFor="balance">balance</label>
        <input type="number" defaultValue={asset?.balance} min={0} step={'any'} max={Number.MAX_VALUE} { ...register('balance')} />
        <input type="submit" />
      </form>
    </>
  );
}
