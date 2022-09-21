::  /app/hodl.hoon
::
::  TODO: refactor to match the pattern from homestead/desk/app/groups.hoon;
::  specifically, use the helper core pattern as described by hastuc-dibtux.
::  the goal is to abstract as much as possible to pure functions, and use gall
::  mainly for orchestration. But, first focus on getting a working TX CRUD
::  agent before optimizing. So, one day :)
::
/+  *transaction
/+  default-agent, dbug, agentio
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0  [%0 txns=transactions]
+$  card  card:agent:gall
--
%-  agent:dbug
=|  state-0
=*  state  -
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
  |=  old-vase=vase
  ^-  (quip card _this)
  `this(state !<(versioned-state old-vase))
::
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
      ?<  (has:t-orm txns id.act)
      =/  txn=txn
        :*  id=id.act
            coin-id=coin-id.act
            date=date.act
            note=note.act
            amount=amount.act
            cost-basis=cost-basis.act
            type=type.act
        ==
      state(txns (put:t-orm txns id.act txn))
    ::
        %edit
      ?>  (has:t-orm txns id.act)
      =/  txn=txn
        :*  id=id.act
            coin-id=coin-id.act
            date=date.act
            note=note.act
            amount=amount.act
            cost-basis=cost-basis.act
            type=type.act
        ==
      state(txns (put:t-orm txns id.act txn)) ::  TODO: should all fields be editable?
    ::
        %del
      ?>  (has:t-orm txns id.act)
      state(txns +:(del:t-orm txns id.act))
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
:: ++  on-peek  on-peek:def
++  on-peek
  |=  =path
  ^-  (unit (unit cage))
  ?>  (team:title our.bowl src.bowl)
  =/  now=@  (unm:chrono:userlib now.bowl)
  ?+    path  (on-peek:def path)
      [%x %transactions *]
    :: ~&  t.path
    :: (on-peek:def path)
    ?+    t.t.path  (on-peek:def path)
        [%all ~]
      :^  ~  ~  %hodl-update
      !>  ^-  update
      [%txns txns]
      :: [%txns (tap:t-orm txns)]
      :: [now %txns (tap:t-orm txns)]
    ==
      ::   [%before @ @ ~]
      :: =/  before=@  (rash i.t.t.t.path dem)
      :: =/  max=@  (rash i.t.t.t.t.path dem)
      :: :^  ~  ~  %hodl-update
      :: !>  ^-  update
      :: [now %txns (tab:t-orm txns `before max)]
    ::
      ::   [%between @ @ ~]
      :: =/  start=@
      ::   =+  (rash i.t.t.t.path dem)
      ::   ?:(=(0 -) - (sub - 1))
      :: =/  end=@  (add 1 (rash i.t.t.t.t.path dem))
      :: :^  ~  ~  %hodl-update
      :: !>  ^-  update
      :: [now %txns (tap:t-orm (lot:t-orm txns `end `start))]
    :: ==
  ==
::
++  on-leave  on-leave:def
++  on-agent  on-agent:def
++  on-arvo   on-arvo:def
++  on-fail   on-fail:def
--
