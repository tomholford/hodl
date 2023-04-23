/-  *wallet
|%
++  dejs
  =,  dejs:format
  |%
  ++  action
    ^-  $-(json ^action)
    %-  of
    :~  add+add
        edit+edit
        del+del
    ==
  ++  add
    ^-  json
    %-  ot
    :~  id+so
        name+so
        note+so
    ==
  ++  edit
    ^-  json
    %-  ot
    :~  id+so
        name+so
        note+so
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
    ?-    -.upd
        %wllts  (wllts upd)
    ==
  ++  wllts
    |=  wllts=(map id wllt)
    ^-  json
    %-  pairs
    %+  turn  ~(tap by wllts)
    |=  [=id =wllt]
    ^-  (pair @t json)
    [id (wljs wllt)]
  ++  wljs
    |=  wllt
    ^-  json
    %-  pairs
    :~  id/s+id
        name/s+name
        note/s+note
    ==
  --
--
