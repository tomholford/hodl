#!/usr/bin/env sh

SHIP="${1:-dev}"
URBIT_PATH=~/dev/urbit/urbit
REPO_PATH=~/dev/hodl
SHIP_PATH=~/dev/urbit/ships
APP_BASE=hodl

rsync -avqL --delete $URBIT_PATH/pkg/base-dev/* $SHIP_PATH/$SHIP/garden/ && \
rsync -avqL $URBIT_PATH/pkg/garden/* $SHIP_PATH/$SHIP/garden/ && \
rsync -avqL --delete $URBIT_PATH/pkg/base-dev/* $SHIP_PATH/$SHIP/$APP_BASE/ && \
rsync -avqL $URBIT_PATH/pkg/garden-dev/* $SHIP_PATH/$SHIP/$APP_BASE/ && \
rsync -avqL $REPO_PATH/desk/* $SHIP_PATH/$SHIP/$APP_BASE/
