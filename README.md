# hodl

A simple cryto portfolio app for Urbit.

Enter your transactions in the UI. The data is stored on your ship. [CoinGecko API](https://www.coingecko.com/en/api) is used to pull price data and calculate your net worth.

## Demo

https://user-images.githubusercontent.com/16504501/200311743-ef330af9-12b3-4a3f-ac9c-1faf36e62c17.mp4

## Installation

On your Urbit's home screen, search for:
```
~hodler-datder-sonnet
```

Or paste this in your ship's terminal:
```
|install ~hodler-datder-sonnet %hodl
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

## Deployment

### Make a new glob

1. Boot a new fake ship; in this example, using `~bus`
2. Merge and mount a desk:
```
|merge %work our %base
|mount %work
```
3. Run `npm run build` in `ui/` to build frontend assets
4. Copy built `dist`: 
```
rsync -avL --delete ui/dist/ ~/dev/urbit/ships/bus/work/hodl
```
5. Switch dojo working directory:
```
=dir /=garden
```
6. Make glob:
```
-make-glob %work /hodl
```
7. Find the built glob in the mounted ship dir under `.urb/put`, e.g.
```
~/dev/urbit/ships/nus/.urb/put
```
8. scp to file server, update docket with hash and URL

### Publish

1. Boot a new fake ship; in this example, using `~nus`
2. Fork an existing desk:
```
|merge %hodl our %webterm
|mount %hodl
```
3. Remove existing files:
```
rm -Rv ~/dev/urbit/ships/nus/hodl/*
```
4. Within Urbit git repo:
```
./symbolic-merge.sh base-dev hodl
./symbolic-merge.sh garden-dev hodl
```
5. Copy linked dev files to mount:
```
cp -rL hodl/* ~/dev/urbit/ships/nus/hodl/
```
6. Copy desk contents to mount:
```
cp -r ./desk/* ~/dev/urbit/ships/nus/hodl
```
7. Commit and install:
```
|commit %hodl
|install our %hodl
```
8. Publish:
```
:treaty|publish %hodl
```

## Roadmap

- responsive mobile UI
- connect a wallet to automatically import transactions
- data visualization

## Questions or Feedback

DM me on the network at `~datder-sonnet`, or join the app group:

```
~hodler-datder-sonnet/hodl
```
