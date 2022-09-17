::  /app/hodl.hoon
::
::  TODO: refactor to match the pattern from homestead/desk/app/groups.hoon;
::  specifically, use the helper core pattern as described by hastuc-dibtux.
::  the goal is to abstract as much as possible to pure functions, and use gall
::  mainly for orchestration. But, first focus on getting a working TX CRUD
::  agent before optimizing. So, one day :)
::
/-  t=transaction
/+  default-agent, dbug, agentio
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0  [%0 txns=transactions.t]
+$  card  card:agent:gall
++  t-orm  ((on id.t txn.t) gth)
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
  ?.  ?=(%hodl-action mark)  (on-poke:def mark vase)  :: TODO: where is this @ta defined
  =/  act  !<(action.t vase)
  =.  state  (poke-action act)
  :_  this
  ~[(fact:io hodl-update+!>(`update.t`[act]) ~[/updates])]  :: TODO: this cell needs now? also hodl-update?
  ::
  ++  poke-action
    |=  act=action.t
    ^-  _state
    ?-    -.act
        %add
      !!
      :: ?<  (has:t-orm txns id.act)
      :: state(txns (put:t-orm txns id.act ...)) ::  TODO: make new TX?
    ::
        %edit
      !!
      :: ?>  (has:t-orm txns id.act)
      :: state(txns (put:t-orm txns id.act ...))
    ::
        %del
      !!
      :: ?>  (has:t-orm txns id.act)
      :: state(txns +:(del:t-orm txns id.act))
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
    (on-peek:def path)
    :: ?+    t.t.path  (on-peek:def path)
    ::     [%all ~]
    ::   :^  ~  ~  %hodl-update
    ::   !>  ^-  update.t
    ::   [now %txns (tap:t-orm txns)]
    :: ::
    ::     [%before @ @ ~]
    ::   =/  before=@  (rash i.t.t.t.path dem)
    ::   =/  max=@  (rash i.t.t.t.t.path dem)
    ::   :^  ~  ~  %hodl-update
    ::   !>  ^-  update.t
    ::   [now %txns (tab:t-orm txns `before max)]
    :: ::
    ::     [%between @ @ ~]
    ::   =/  start=@
    ::     =+  (rash i.t.t.t.path dem)
    ::     ?:(=(0 -) - (sub - 1))
    ::   =/  end=@  (add 1 (rash i.t.t.t.t.path dem))
    ::   :^  ~  ~  %hodl-update
    ::   !>  ^-  update.t
    ::   [now %txns (tap:t-orm (lot:t-orm txns `end `start))]
    :: ==
  ==
::
++  on-leave  on-leave:def
++  on-agent  on-agent:def
++  on-arvo   on-arvo:def
++  on-fail   on-fail:def
--