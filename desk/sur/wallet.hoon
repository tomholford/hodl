::  /sur/wallet.hoon
|%
::  Wallet ID - uuid string used for edit, del, query (not an ETH 0x...)
+$  id  @t
::  Wallet Name
+$  name  @t
::  Note - optional description of the wallet
+$  note  @t
::  TODO: tags, types
::  Wallet struct, named uniquely
+$  wllt
  $:  =id
      =name
      =note
  ==
::
+$  action
  $%  [%add =wllt]
      [%edit =wllt]
      [%del =id]
  ==
::
+$  update
  $%  [%wllts wllts=wallets]
  ==
::  Wallets - map of wallet ids to wallets
+$  wallets  (map id wllt)
--
