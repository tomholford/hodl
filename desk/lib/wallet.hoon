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
    %-  ot
    :~  id+so
        name+so
        note+so
    ==
  ++  edit
    %-  ot
    :~  id+so
        name+so
        note+so
    ==
  ++  del
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
        %wllts  (wllts +.upd)
        %add    (wljs wllt.upd)
        %edit   (wljs wllt.upd)
        %del    s+id.upd
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
