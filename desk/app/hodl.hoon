::  /app/hodl.hoon
::
::  TODO: refactor to match the pattern from homestead/desk/app/groups.hoon;
::  specifically, use the helper core pattern as described by hastuc-dibtux.
::  the goal is to abstract as much as possible to pure functions, and use gall
::  mainly for orchestration. But, first focus on getting a working TX CRUD
::  agent before optimizing. So, one day :)
::
/+  a=account, t=transaction, w=wallet
/+  default-agent, dbug, verb
|%
+$  card  card:agent:gall
::  old transaction type (state-0): no account-id field
+$  txn-0  [@t @t @da @t @t @t @ta]
+$  txns-0  (map @t txn-0)
+$  versioned-state
  $%  state-0
      state-1
  ==
+$  state-0  [%0 txns=txns-0]
+$  state-1  [%1 acts=accounts:a txns=transactions:t wlts=wallets:w]
--
=|  state-1
=*  state  -
::
%-  agent:dbug
%+  verb  &  :: TODO: disable before production
^-  agent:gall
::
=<  :: app core
|_  =bowl:gall
+*  this  .
    do  ~(. +> bowl)
    def   ~(. (default-agent this %.n) bowl)
::
++  on-init  on-init:def
::
++  on-save
  ^-  vase
  !>(state)
::
++  on-load
  |=  old-state=vase
  ^-  (quip card _this)
  =/  old  !<(versioned-state old-state)
  |^
  ?-  -.old
    %1  `this(state old)
    %0  `this(state (state-0-to-1 old))
  ==
  ++  state-0-to-1
    |=  zer=state-0
    ^-  state-1
    [%1 *accounts:a (transactions-0-to-1 txns.zer) *wallets:w]
  ++  transactions-0-to-1
    |=  txns=txns-0
    ^-  transactions:t
    %-  ~(run by txns)
    |=  old=txn-0
    ^-  txn:t
    =+  [id cid dat not amt cb typ]=old
    [id cid dat not amt cb typ '']
  --
::
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?>  (team:title our.bowl src.bowl)
  =^  cards  state
    ?+  mark                 (on-poke:def mark vase)
        %account-action      (poke-account-action:do !<(action:a vase)) :: TODO do these action need to be namesspaced?
        %transaction-action  (poke-transaction-action:do !<(action:t vase))
        %wallet-action       (poke-wallet-action:do !<(action:w vase))
    ==
  [cards this]
::
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?>  (team:title our.bowl src.bowl)
  ?+  path  (on-watch:def path)
    [%updates ~]  `this  
  :: TODO: should the updates be scoped to each model?
  :: ?:  ?=([%updates ~] path)
  ::   :_  this
  ::   [%give %fact ~ %hodl-update !>(update)]~
  :: (on-watch:def path)
  ==
::
++  on-peek
  |=  =path
  ^-  (unit (unit cage))
  ?>  (team:title our.bowl src.bowl)
  ?+  path  (on-peek:def path)
      [%x %accounts @t ~]      ``noun+!>((~(get by acts) i.t.t.path))
      [%x %accounts ~]        ``noun+!>(acts)
      [%x %transactions @t ~]  ``noun+!>((~(get by txns) i.t.t.path))
      [%x %transactions ~]    ``noun+!>(txns)
      [%x %wallets @t ~]       ``noun+!>((~(get by wlts) i.t.t.path))
      [%x %wallets ~]         ``noun+!>(wlts)
  ==
::
++  on-leave  on-leave:def
++  on-agent  on-agent:def
++  on-arvo   on-arvo:def
++  on-fail   on-fail:def
--
::  helper core
|_  =bowl:gall
++  poke-account-action
  |=  act=action:a
  ^-  (quip card _state)
  ?-    -.act
      %add
    ?<  (~(has by acts) id.act)
    =/  =acct:a
      :*  id=id.act
          wallet-id=wallet-id.act
          name=name.act
          note=note.act
      ==
    `state(acts (~(put by acts) id.act acct))
  ::
      %edit
    ?>  (~(has by acts) id.act)
    =/  =acct:a
      :*  id=id.act  ::  TODO: should all fields be editable? probably not id
          wallet-id=wallet-id.act
          name=name.act
          note=note.act
      ==
    `state(acts (~(put by acts) id.act acct))
  ::
      %del
    ?>  (~(has by acts) id.act)
    `state(acts (~(del by acts) id.act))
  ==
::
++  poke-transaction-action
  |=  act=action:t
  ^-  (quip card _state)
  ?-    -.act
      %add
    =/  =txn:t  txn.act
    ?<  (~(has by txns) id.txn)
    `state(txns (~(put by txns) id.txn txn))
  ::
      %edit
    =/  =txn:t  txn.act
    ?>  (~(has by txns) id.txn)
    `state(txns (~(put by txns) id.txn txn))
  ::
      %del
    ?>  (~(has by txns) id.act)
    `state(txns (~(del by txns) id.act))
  ==
::
++  poke-wallet-action
  |=  act=action:w
  ^-  (quip card _state)
  ?-    -.act
      %add
    =/  =wllt:w  wllt.act
    ?<  (~(has by wlts) id.wllt)
    `state(wlts (~(put by wlts) id.wllt wllt))
  ::
      %edit
    =/  =wllt:w  wllt.act
    ?>  (~(has by wlts) id.wllt)
    `state(wlts (~(put by wlts) id.wllt wllt))
  ::
      %del
    ?>  (~(has by wlts) id.act)
    `state(wlts (~(del by wlts) id.act))
  ==
--
