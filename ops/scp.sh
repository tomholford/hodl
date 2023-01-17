#!/usr/bin/env sh

scp $SHIP_PATH/$SHIP/.urb/put/*.glob urbit@sonnet.page:~/globs/
rm $SHIP_PATH/$SHIP/.urb/put/*.glob
echo '*** Now update the docket with the new glob hash ***'
