::  /app/hodl.hoon
::
::  TODO: refactor to match the pattern from homestead/desk/app/groups.hoon;
::  specifically, use the helper core pattern as described by hastuc-dibtux.
::  the goal is to abstract as much as possible to pure functions, and use gall
::  mainly for orchestration. But, first focus on getting a working TX CRUD
::  agent before optimizing. So, one day :)
::
/+  *account, *transaction, *wallet
/+  default-agent, dbug, agentio, verb
|%
+$  card  card:agent:gall
+$  versioned-state
  $%  state-0
      state-1
  ==
::
::  acts: map of account-id --> account
::  txns: map of transaction-id --> transaction
::  wlts: map of wallet-id --> wallets
+$  state-0  [%0 txns=transactions:zero:past]
+$  state-1  [%1 acts=accounts txns=transactions wlts=wallets]
--
=|  state-1
=*  state  -
::
%-  agent:dbug
%+  verb  &  :: TODO: disable before production
^-  agent:gall
|_  =bowl:gall
+*  this  .
    def   ~(. (default-agent this %.n) bowl)
    io    ~(. agentio bowl)
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
  ?-  -.old
      %1
    `this(state old)
      %0
    `this(state-0-to-1 old)
  ==
  ++  state-0-to-1
    |=  zer=state-0
    ^-  state-1
    :*  %1
        acts  *accounts
        txns  (transactions-0-to-1 txns.zer)
        wlts  *wallets
    ==
  ++  transactions-0-to-1
    |=  txns=transactions:zero:past
    ^-  transactions
    %-  ~(run by txns)
    |=  [id=@t txn=transaction:zero:past]
    ^-  [id=@t txn=transaction]
    [id (transaction-0-to-1 txn)]
  ++  transaction-0-to-1
    |=  txn=transaction:zero:past
    ^-  ^transaction :: TODO: which transaction to point to? should use the ket to traverse up the tree?
    :*  id.txn
        coin-id.txn
        date.txn
        note.txn
        amount.txn
        cost-basis.txn
        type.txn
        ~
    ==
::
::  TODO: add pokes for accounts and wallets
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  |^
  ?>  (team:title our.bowl src.bowl)
  ?.  ?=(%hodl-action mark)  (on-poke:def mark vase)
  =/  act  !<(action vase)
  =.  state  (poke-action act)
  :_  this
  ~[(fact:io hodl-update+!>(`update`[act]) ~[/updates])]
  ::
  ++  poke-action
    |=  act=action
    ^-  _state
    ?-    -.act
        %add
      ?<  (~(has by txns) id.act)
      =/  txn=txn
        :*  id=id.act
            coin-id=coin-id.act
            date=date.act
            note=note.act
            amount=amount.act
            cost-basis=cost-basis.act
            type=type.act
            account-id=account-id.act
        ==
      state(txns (~(put by txns) id.act txn))
    ::
        %edit
      ?>  (~(has by txns) id.act)
      =/  txn=txn
        :*  id=id.act
            coin-id=coin-id.act
            date=date.act
            note=note.act
            amount=amount.act
            cost-basis=cost-basis.act
            type=type.act
            account-id=account-id.act
        ==
      state(txns (~(put by txns) id.act txn)) ::  TODO: should all fields be editable? probably not id
    ::
        %del
      ?>  (~(has by txns) id.act)
      state(txns (~(del by txns) id.act))
    ==
  --
::
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?>  (team:title our.bowl src.bowl)
  ?+  path  (on-watch:def path)
    [%updates ~]  `this
  ==
::
::  TODO: add scries for accounts and wallets
++  on-peek
  |=  =path
  ^-  (unit (unit cage))
  ?>  (team:title our.bowl src.bowl)
  ?+    path  (on-peek:def path)
      [%x %transactions *]
    ?+    t.t.path  (on-peek:def path)
        [%all ~]
      :^  ~  ~  %hodl-update
      !>  ^-  update
      [%txns txns]
    ==
  ==
::
++  on-leave  on-leave:def
++  on-agent  on-agent:def
++  on-arvo   on-arvo:def
++  on-fail   on-fail:def
--
