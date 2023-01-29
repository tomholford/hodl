::  /sur/account.hoon
|%
::  Account ID - uuid string used for edit, del, query (not an ETH 0x...)
+$  id  @t
::  Wallet ID - foreign key to parent wallet
+$  wallet-id  @t
::  Account Name
+$  name  @t
::  Note - optional description of the account
+$  note  @t
::  TODO: tags, types
+$  account
  $:  id=id
      wallet-id=wallet-id
      name=name
      note=note
  ==
::  Accounts - map of account-id to account
+$  accounts  (map id account)
++  action
  =<
  |%
  +$  action
    $%  [%add add]
        [%del del]
        [%edit edit]
    ==
  +$  add [=id =wallet-id =name =note]
  +$  del [=id]
  +$  edit [=id =wallet-id =name =note]
  --
+$  update
  $%  [%add =account]
      [%del =id]
      [%edit =account]
  ==
--
