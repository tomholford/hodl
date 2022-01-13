import React, { useCallback, useMemo, useRef } from "react";
import { Asset } from "../../types/Asset.type";
import './ExportAssetsButton.scss';

// TODO: better filename, use less memos
export function ExportAssetsButton({ assets }: { assets: Asset[] }) {
  const filename = useMemo(() => {
    return `assets-${((new Date().getTime() / 1000).toFixed(0)).toString()}.csv`;
  }, []);

  const headers = useMemo(() => { 
    return [
      'currency',
      'balance',
      'costBasis',
      'acquiredAt',
      'note',
    ];
  }, [])

  const assetRowToCSVRow = (asset: Asset) => {
    return [
      asset.currency,
      asset.balance,
      asset.costBasis,
      asset.acquiredAt,
      asset.note,
    ].join(',');
  }

  const csv = useMemo(() => {
    if(!assets) { return null };

    const output = [headers.join(',')];
    assets.forEach(a => {
      output.push(assetRowToCSVRow(a));
    });

    return output.join('\n');
  }, [assets, headers]);

  const file = useMemo(() => {
    if(!csv) { return null };

    return new Blob([csv], { type: 'text/csv' });
  }, [csv]);

  const objectUrl = useMemo(() => {
    if(!file) { return null };

    // TODO: revoke URL when no longer needed
    // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
    return window.URL.createObjectURL(file);
  }, [file]);

  const anchorRef = useRef<HTMLAnchorElement | null>(null);
  const handleExportClick = useCallback(() => {
    if(anchorRef && anchorRef.current) {
      anchorRef.current.click();
    }
  }, []);

  return (<>

    {
      objectUrl ? (
        <>
          <button title={'export to csv'} onClick={handleExportClick}>📤</button>
          <a ref={anchorRef} style={{ display: 'none' }} title={'export to csv'} className={'export-button'} href={objectUrl} download={filename}>export</a> 
        </>
      )
      : (<p>'generating csv ...'</p>)
    }
  </>);
}
