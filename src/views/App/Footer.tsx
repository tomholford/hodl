import { useIsFetching } from 'react-query'

export const Footer = () => {
  const isFetching = useIsFetching();

  return (
    <>
      <div className="footer">
        <div className="fetching-indicator">
          {isFetching > 0 ? `Fetching ${isFetching} value${isFetching === 1 ? '' : 's'}` : ''}
        </div>
      </div>
    </>
  )
}
