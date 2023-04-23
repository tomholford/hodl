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
::  Account struct, named uniquely
+$  acct
  $:  =id
      =wallet-id
      =name
      =note
  ==
::  Accounts - map of account-id to account
+$  accounts  (map id acct)
+$  action
  $%  [%add =id =wallet-id =name =note]
      [%edit =id =wallet-id =name =note]
      [%del =id]
  ==
::
+$  update
  $%  [%accts =accounts]
  ==
--
