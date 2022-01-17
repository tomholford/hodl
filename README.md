# hodl

## Setup

1. Clone or fork the repo
1. `npm install`
1. `npm start`

## Usage

Click 'add an asset', or import a CSV file with the following schema:

```csv
currency,balance,costBasis,acquiredAt,note
ETH,1.337,420.69,2021-01-01,funding secured
```

Current supported currencies:
- BTC
- ETH
- AVAX
- SOL
- XMR

## Roadmap

- [ ] UX
  - [ ] test data mode
  - [x] CSV import
  - [x] CSV export
  - [ ] basic styling
  - [ ] alignment of columns
  - [ ] add some margin on the side
  - [ ] seek inspiration from CMC
  - [ ] table should not have duplicated headers
  - [ ] asset form should be inline ,with animation
  - [ ] settings as gear icon
  - [ ] use coin icons
- [ ] Asset enhancements
  - [x] cost basis
  - [ ] cost basis currency
  - [x] date acquired
  - [x] note
  - [ ] associate to Account or Wallet
  - [ ] import balance from API
  - [ ] support NFTs (e.g., Urbit star)
- [ ] Settings
  - [x] privacy mode
  - [x] toggle vs currency
  - [x] dark mode
  - [ ] improved settings UX
- [ ] Visualization
  - [ ] historical portfolio performance chart
  - [ ] forecast chart
- [ ] Data Model
  - [ ] Wallets
  - [ ] Accounts
- [ ] Currency
  - [ ] coinId
  - [ ] data from Coingecko

- Transactions
- 