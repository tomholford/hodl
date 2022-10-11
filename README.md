# hodl

A simple cryto portfolio app for Urbit.

Enter your transactions in the UI. The data is stored on your ship. [CoinGecko API](https://www.coingecko.com/en/api) is used to pull price data and calculate your net worth.

[video]

## Installation

On your Urbit's home screen, search for:
```
~hodler-datder-sonnet
```

Or you can manually install using the Development instructions below.

## Usage

1. Click Add a Transaction  button (the $)
2. Enter the relevant data in the New Transaction form
3. Submit and view the data in the dashboard

It is also possible to programmatically add Transactions using pokes, see `notes/pokes.txt` for examples.

## Development

0. Install the [bouncer desk sync tool](https://github.com/tloncorp/bouncer) and update the `env` values in `ops/*.yml` to match your system configuration.
1. Clone this repo
2. In `ui/`, run `npm install`
3. Start a fake ship; `~dev` is what's used in the default bouncer config.
4. Run `bin/bounce` to sync the agent desk and install on your fake ship
5. Open http://localhost:3000/apps/hodl/ in your browser
6. Changes in `ui/` will automatically reload the frontend; after making backend changes run `bin/sync`

## Roadmap

- support all 13K+ coingecko coins 
- connect a wallet to automatically import transactions
- data visualization

## Questions or Feedback

DM me on the network at `~datder-sonnet`, or join the app channel [TODO: link]
