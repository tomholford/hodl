import './AssetHeaderRow.scss';

export const AssetHeaderRow = () => {
  return (
    <>
      <div className="asset-header-row">
        <div className="asset-balance cell-label">
          balance
        </div>
        <div className="asset-value cell-label">current value</div>
        <div className="asset-pnl cell-label">P / L</div>
        <div className="asset-cost-basis cell-label">cost basis</div>
        <div className="asset-acquired-date cell-label">date acquired</div>
        <div className="asset-note cell-label">note</div>
        <div className="asset-action cell-label">actions</div>
      </div>
    </>
  )
}
