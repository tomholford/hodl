import './AssetHeaderRow.scss';

export const AssetHeaderRow = () => {
  return (
    <thead>
      <tr>
        <th className="asset-balance cell-label">
          balance
        </th>
        <th className="asset-value cell-label">current value</th>
        <th className="asset-pnl cell-label">P / L</th>
        <th className="asset-cost-basis cell-label">cost basis</th>
        <th className="asset-acquired-date cell-label">date acquired</th>
        <th className="asset-note cell-label">note</th>
        <th className="asset-action cell-label">actions</th>
      </tr>
    </thead>
  )
}
