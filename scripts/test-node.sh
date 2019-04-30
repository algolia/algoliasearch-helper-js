#!/usr/bin/env bash

[ -z $CIRCLE_BUILD_NUM ] && CI='false' || CI='true'

set -e # exit when error
if [ $CI == 'true' ]; then
  set -x # debug messages
fi

node test/run.js
