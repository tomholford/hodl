import './AssetHeaderRow.scss';

export const AssetHeaderRow = () => {
  return (
    <>
      <div className="asset-header-row">
        <div className="asset-balance header-label">
          balance
        </div>
        <div className="asset-value header-label">current value</div>
        <div className="asset-pnl header-label">P / L</div>
        <div className="asset-cost-basis header-label">cost basis</div>
        <div className="asset-acquired-date header-label">date acquired</div>
        <div className="asset-note header-label">note</div>
        <div className="asset-action header-label">actions</div>
      </div>
    </>
  )
}
