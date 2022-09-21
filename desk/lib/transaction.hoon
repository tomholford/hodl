/-  *transaction
|%
++  t-orm  ((on id txn) gth)
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
    :~  id+ni
        coin-id+ni
        date+di
        note+so
        amount+ni
        cost-basis+ni
        type+so
    ==
  ++  edit
    ^-  $-(json edit:^action) 
    %-  ot
    :~  id+ni
        coin-id+ni
        date+di
        note+so
        amount+ni
        cost-basis+ni
        type+so
    ==
  ++  del
    ^-  $-(json del:^action) 
    %-  ot
    :~  id+ni
    ==
  --
++  enjs
  =,  enjs:format
  |%
  ++  update
    |=  upd=^update
    ^-  json
    ?+    -.upd  ~|  %unimplemented  !!
        %txns
      %-  pairs
      %+  turn  (tap:t-orm txns.upd)
      |=  [=id t=^txn]
      ^-  (pair @t json)
      [(scot %ud id) (txn t)]
    ==
  ++  txn
    |=  ^txn
    ^-  json
    %-  pairs
    :~  id+s+(scot %ud id)
        coin-id+s+(scot %ud coin-id)
        date+s+(scot %da date)
        note+s+note
        amount+s+(scot %ud amount)
        cost-basis+s+(scot %ud cost-basis)
        type+s+type
    ==
  --
--
