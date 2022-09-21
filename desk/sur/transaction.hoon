::  /sur/transaction.hoon
|%
::  Transaction ID - uuid used for edit, del, query
+$  id  @ud
::  CoinGecko Coin ID - external ID that maps to a CG entity (e.g. BTC is 1).
::  Used for querying CG API
+$  coin-id  @ud
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
      [%txns txns=transactions]  :: Should this be a mop instead of list?
  ==
+$  transactions  ((mop id txn) gth)
--
