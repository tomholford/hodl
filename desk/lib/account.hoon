/-  *account
|%
++  dejs-action
  =,  dejs:format
  |=  jon=json
  ^-  action
  %.  jon
  %-  of
  :~  [%add (ot ~[id+so wallet-id+so name+so note+so])]
      [%edit (ot ~[id+so wallet-id+so name+so note+so])]
      [%del (ot ~[id+so])]
  ==
++  enjs-update
  =,  enjs:format
  |=  upd=update
  ^-  json
  |^
  ?-    -.upd
      %accts  (acts +.upd)
      %add    (acjs +.upd)
      %edit   (acjs +.upd)
      %del    s+id.upd
  ==
  ++  acts
    |=  ud=[=accounts]
    ^-  json
    %-  pairs
    %+  turn  ~(tap by accounts.ud)
    |=  act=[=id =acct]
    ^-  (pair @t json)
    [id.act (acjs acct.act)]
  ++  acjs
    |=  [id=@t wallet-id=@t name=@t note=@t]
    ^-  json
    %-  pairs
    :~  id/s+id
        wallet-id/s+wallet-id
        name/s+name
        note/s+note
    ==
  --
--
