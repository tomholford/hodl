import { v4 as uuidv4 } from 'uuid';
import { useCallback } from "react";
import { CURRENCIES } from "../../constants";
import { useAssets } from "../../store/Assets";
import { Currency } from "../../types/Currency.type";

export const AddFakeAssetButton = () => {
  const { addAsset } = useAssets();

  const randomElement = (ary: any[]) => {
    return ary[Math.floor(Math.random() * ary.length)];
  }

  const randomFloat = (min = 0, max = 10, decimals = 2) => {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);

    return parseFloat(str);  }

  const handleFakeClick = useCallback(() => {
    addAsset({
      currency: randomElement(Object.keys(CURRENCIES)) as Currency,
      balance: randomFloat(),
      costBasis: randomFloat(),
      note: 'fake asset',
      acquiredAt: '2020-01-01',
      uuid: uuidv4()
    });  
  }, [addAsset]);

  return (<>
    <button onClick={handleFakeClick}>add fake asset</button>
  </>);
}
