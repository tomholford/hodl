#!/usr/bin/env sh

cd $REPO_PATH/ui
npm run build
rsync -avL --delete $REPO_PATH/ui/dist/ $SHIP_PATH/$SHIP/$BUILD_DESK/$DESK
