::  /sur/transaction.hoon
|%
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
+$  amount  @ud
::  optional: cost per unit at the time of the TX (can be roughly auto-populated
::  with CoinGecko History API async, or manually entered by user... or if
::  imported from a CEX, use that value)
+$  cost-basis  @ud
::  %buy, %sell
+$  type  @ta
+$  txn
  $:  =id
      =coin-id
      =date
      =note
      =amount
      =cost-basis
      =type
  ==
++  action
  =<  action
  |%
  +$  action
    $%  [%add add]
        [%edit edit]
        [%del del]
    ==
  +$  add   [=id =coin-id =date =note =amount =cost-basis =type]
  +$  edit  [=id =coin-id =date =note =amount =cost-basis =type]
  +$  del   [=id]
  --
+$  update
  $%  action
      [%txns txns=transactions]
  ==
+$  transactions  (map id txn)
--
