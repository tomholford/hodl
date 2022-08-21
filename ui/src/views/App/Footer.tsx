import { useIsFetching } from 'react-query'
import { pluralize } from '../../lib/presenters';

export const Footer = () => {
  const isFetching = useIsFetching();

  return (
    <>
      <div className="footer">
        <div className="fetching-indicator">
          {isFetching > 0 ? `Fetching ${isFetching} ${pluralize('value', isFetching)}` : ''}
        </div>
      </div>
    </>
  )
}
