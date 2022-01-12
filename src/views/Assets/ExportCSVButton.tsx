import { useEffect, useMemo } from "react";
import { Asset } from "../../types/Asset.type";

// TODO: better filename, use less memos
export function ExportAssetsButton({ assets }: { assets: Asset[] }) {

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

    return window.URL.createObjectURL(file);
  }, [file]);

  return (<>
    {objectUrl ? <a href={objectUrl} download={`assets.csv`}>export csv</a> : 'generating csv ...'}
  </>);
}
