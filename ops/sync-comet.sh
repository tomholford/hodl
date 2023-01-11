#!/usr/bin/env sh


rsync -avqL --delete $URBIT_PATH/pkg/base-dev/* $SHIP_PATH/$COMET_NAME/$DESK/ && \
rsync -avqL $URBIT_PATH/pkg/garden-dev/* $SHIP_PATH/$COMET_NAME/$DESK/ && \
rsync -avqL $REPO_PATH/desk/* $SHIP_PATH/$COMET_NAME/$DESK/
