import { v4 as uuidv4 } from 'uuid';
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { csvToArray } from "../../lib/csvToArray";
import { useAssets } from "../../store/Assets";
import { Currency } from "../../types/Currency.type";

export const ImportAssetsButton = () => {
  const { addAsset } = useAssets();
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string | ArrayBuffer | null>(null);
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files && e.target.files[0]);
  }, []);

  const parsedRows = useMemo(() => {
    if(!result) { return null };

    if(result instanceof ArrayBuffer) {
      // TODO: this branch means it's probably not a CSV file
      // const typedArray = new Uint8Array(result);
      // return Array.from(typedArray);
      return null;
    } else {
      return csvToArray(result);
    }
  }, [result]);

  useEffect(() => {
    if (!file) { return };

    const reader = new FileReader();
    reader.onload = (ev) => setResult(ev.target?.result || null);
    reader.readAsText(file);
  }, [file]);

  const reset = useCallback(() => {
    setFile(null);
    setResult(null);
  }, []);

  const handleImportClick = useCallback(() => {
    if(!parsedRows) { return };

    parsedRows.forEach(r => {
      try {
        console.log(`adding ${r.currency} ${r.balance}`)
        addAsset({
          currency: r.currency as Currency,
          balance: Number(r.balance),
          costBasis: Number(r.costBasis),
          note: r.note,
          acquiredAt: r.acquiredAt,
          uuid: uuidv4()
        });  
        console.log('done')
      } catch (error) {
        console.log(error);
      }
    })

    reset();
  }, [addAsset, parsedRows, reset]);

  return (<>
    {
      file ? (
        <div>
          {parsedRows ?
            (
              <>
                <p>Loaded {parsedRows.length} rows from {file.name}</p>
                <button onClick={handleImportClick}>Import?</button>
                <button onClick={reset}>Cancel</button>
              </>
            )
            :
            (<p>Parsing rows...</p>)}
        </div>
      ) :
        (
          <div className="import-assets">
            <input onChange={handleFileChange} type="file"
              id="import" name="import"
              accept="text/csv" multiple={false}></input>
          </div>
        )
    }
  </>);
}
