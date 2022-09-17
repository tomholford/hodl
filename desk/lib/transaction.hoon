/-  t=transaction
|%
++  dejs-action
  =,  dejs:format
  |=  jon=json
  ^-  action
  %.  jon
  %-  of
  :~  [%add (ot ~[id+ni])]
      [%edit (ot ~[id+ni])]
      [%del (ot ~[id+ni])]
  ==
++  enjs-update
  =,  enjs:format
  |=  upd=update
  ^-  json
  |^
  ?+    -.q.upd  (logged upd)
      %hodl
    %-  pairs
    :~  ['time' (numb p.upd)]
        ['transactions' a+(turn list.q.upd txn)]
    ==
  ==
  ++  txn
    |=  txn=^transaction.t
    ^-  json
    %-  pairs
    :~  ['id' (numb id.txn)]
        ['txt' s+txt.txn]
    ==
--