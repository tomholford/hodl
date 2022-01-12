import './AssetHeaderRow.scss';

export const AssetHeaderRow = () => {
  return (
    <>
      <div className="asset-header-row">
        <div className="asset-balance">
          balance
        </div>
        <div className="asset-value">current value</div>
        <div className="asset-pnl">P / L</div>
        <div className="asset-cost-basis">cost basis</div>
        <div className="asset-acquired-date">date acquired</div>
        <div className="asset-note">note</div>
        <div className="asset-action">actions</div>
      </div>
    </>
  )
}
