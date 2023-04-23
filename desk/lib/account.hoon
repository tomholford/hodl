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
    |=  [id=@tas wallet-id=@tas name=@tas note=@tas]
    ^-  json
    %-  pairs
    :~  id/s+id
        wallet-id/s+wallet-id
        name/s+name
        note/s+note
    ==
  --
--
