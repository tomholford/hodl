::  /sur/wallet.hoon
|%
::  Wallet ID - uuid string used for edit, del, query (not an ETH 0x...)
+$  id  @t
::  Wallet Name
+$  name  @t
::  Note - optional description of the wallet
+$  note  @t
::  TODO: tags, types
+$  wallet
  $:  id=id
      name=name
      note=note
  ==
::  Wallets - map of wallet ids to wallets
+$  wallets  (map id wallet)
++  action
  =<  action
  |%
  +$  action
    $%  [%add add]
        [%del del]
        [%edit edit]
    ==
  +$  add [=id =name =note]
  +$  del [=id]
  +$  edit [=id =name =note]
  --
+$  update
  $%  [%add =wallet]
      [%del =id]
      [%edit =wallet]
  ==
--
