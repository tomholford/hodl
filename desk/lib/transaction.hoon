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
    ^-  $-(json add:^action) 
    %-  ot
    :~  id+so
        coin-id+so
        date+di
        note+so
        amount+so
        cost-basis+so
        type+so
    ==
  ++  edit
    ^-  $-(json edit:^action) 
    %-  ot
    :~  id+so
        coin-id+so
        date+di
        note+so
        amount+so
        cost-basis+so
        type+so
    ==
  ++  del
    ^-  $-(json del:^action) 
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
    ?-    -.upd
        %txns
      %-  pairs
      %+  turn  ~(tap by txns.upd)
      |=  [=id =txn]
      ^-  (pair @t json)
      [id (txjs txn)]
        %add
      %-  pairs
      :~  add/(txjs +.upd)
      ==
        %edit
      %-  pairs
      :~  edit/(txjs +.upd)
      ==
        %del
      %-  pairs
      :~  del/s+id.upd
      ==
    ==
  ++  txjs
    |=  txn
    ^-  json
    %-  pairs
    :~  id/s+id
        coin-id/s+coin-id
        date/(time date)
        note/s+note
        amount/s+amount
        cost-basis/s+cost-basis
        type/s+type
    ==
  --
--
