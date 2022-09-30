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
        amount+ni
        cost-basis+ni
        type+so
    ==
  ++  edit
    ^-  $-(json edit:^action) 
    %-  ot
    :~  id+so
        coin-id+so
        date+di
        note+so
        amount+ni
        cost-basis+ni
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
    ~&  upd
    ^-  json
    ?+    -.upd  ~|  %unimplemented  !!
        %txns
      %-  pairs
      %+  turn  ~(tap by txns.upd)
      |=  [=id t=^txn]
      ^-  (pair @t json)
      [id (txn t)]
        %add
      ~&  id.upd
      !!
      :: %-  pairs
      :: |=  [=id t=^txn]
      :: ^-  (pair @t json)
      :: [(scot %ud id) (txn t)]      
    ==
  ++  txn
    |=  ^txn
    ^-  json
    %-  pairs
    :~  id+s+id
        coin-id+s+coin-id
        date+s+(scot %da date)
        note+s+note
        amount+s+(scot %ud amount)
        cost-basis+s+(scot %ud cost-basis)
        type+s+type
    ==
  --
--
