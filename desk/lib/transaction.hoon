/-  *transaction
|%
++  dejs
  =,  dejs:format
  |%
  ++  action
    ^-  $-(json ^action)
    %-  of
    :~  [%add add]
        [%edit edit]
        [%del del]
    ==
  ++  add
    %-  ot
    :~  id+so
        coin-id+so
        date+di
        note+so
        amount+so
        cost-basis+so
        type+so
        account-id+so
    ==
  ++  edit
    %-  ot
    :~  id+so
        coin-id+so
        date+di
        note+so
        amount+so
        cost-basis+so
        type+so
        account-id+so
    ==
  ++  del
    ^-  json
    %-  ot
    :~  id+so
    ==
  --
++  enjs
  =,  enjs:format
  |%
  ++  update
    |=  upd=^update
    ^-  json
    %+  frond  -.upd
    ?-    -.upd
          %txns  (txns txns.upd)
      ==
  ::
  ++  txns
    |=  txns=transactions
    ^-  json
    %-  pairs
    %+  turn  ~(tap by txns)
    |=  t=[=id =txn]
    ^-  (pair @t json)
    [id.t (txjs txn.t)]
  ::
  ++  txjs
    |=  t=txn
    ^-  json
    %-  pairs
    :~  id/s+id.t
        coin-id/s+coin-id.t
        date/(time date.t)
        note/s+note.t
        amount/s+amount.t
        cost-basis/s+cost-basis.t
        type/s+type.t
        account-id/s+account-id.t
    ==
  --
--
