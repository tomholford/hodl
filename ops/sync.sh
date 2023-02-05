#!/usr/bin/env sh

# garden
rsync -avqL --delete $URBIT_PATH/pkg/base-dev/* $SHIP_PATH/$SHIP/garden/ && \
rsync -avqL $LANDSCAPE_PATH/desk/* $SHIP_PATH/$SHIP/garden/ && \

# hodl
rsync -avqL --delete $URBIT_PATH/pkg/base-dev/* $SHIP_PATH/$SHIP/$DESK/ && \
rsync -avqL $LANDSCAPE_PATH/desk-dev/* $SHIP_PATH/$SHIP/$DESK/ && \
rsync -avqL $REPO_PATH/desk/* $SHIP_PATH/$SHIP/$DESK/
