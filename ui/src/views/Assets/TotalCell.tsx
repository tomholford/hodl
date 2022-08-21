import { Balance } from '../Shared/Balance';
import './TotalCell.scss'

export const TotalCell = ({ balance, label }: { balance: number, label: string }) => {
  return (<>
    <div className="total-cell">
      <div className="total-balance">
        <Balance balance={balance} />
      </div>
      <div className="cell-label">
        {label}
      </div>
    </div>
  </>);
}
