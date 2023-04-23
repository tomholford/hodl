::  /sur/transaction.hoon
/-  zer=transaction-0
|%
++  past
  |%
  ++  zero  zer
  --
::  Transaction ID - uuid string used for edit, del, query (not an ETH 0x...)
+$  id  @t
::  CoinGecko Coin ID - external ID that maps to a CG entity (e.g. BTC is 'bitcoin').
::  Used for querying CG API
+$  coin-id  @t
::  Timestamp of transaction
+$  date  @da
::  Optional description of the TX
+$  note  @t
::  TX Amount in currency
::  Note usage of a string for storage; since no maths will be done in the app
::  (for now!), it is simpler for a noob like me to work with. Eventually this 
::  will be migrated to using an aura with numerical precision
+$  amount  @t
::  optional: cost per unit at the time of the TX (can be roughly auto-populated
::  with CoinGecko History API async, or manually entered by user... or if
::  imported from a CEX, use that value). see note re: string usage for amount,
::  same goes for this
+$  cost-basis  @t
::  %buy, %sell
+$  type  @ta
::  Account ID - foreign key to parent account
+$  account-id  @t
:: Transaction struct, named uniquely
+$  txn
  $:  =id
      =coin-id
      =date
      =note
      =amount
      =cost-basis
      =type
      =account-id
  ==
::  Transactions are stored in a map keyed by ID
+$  transactions  (map id txn)
+$  action
  $%  [%add =txn]
      [%edit =txn]
      [%del =id]
  ==
::
+$  update
  $%  [%txns txns=transactions]
  ==
--
