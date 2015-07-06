#!/usr/bin/env bash

if [ -f ~/.nvm/nvm.sh ]
then
  source ~/.nvm/nvm.sh
elif [ -f $(brew --prefix nvm)/nvm.sh ] 
then
  source $(brew --prefix nvm)/nvm.sh
fi

set -e # exit when error
set -x # debug messages

[ -z $TRAVIS_PULL_REQUEST ] && TRAVIS_PULL_REQUEST='false'
[ -z $TRAVIS_BUILD_NUMBER ] && TRAVIS_BUILD_NUMBER='false'

currentVersion=$(nvm current)

# always test on node 0.12
echo "Node test 0.12"
nvm use 0.12
node test/run.js

# in a PR or in local environement, test only on node 0.12
if [ $TRAVIS_PULL_REQUEST != 'false' ] || [ $TRAVIS_BUILD_NUMBER == 'false' ]; then
  echo 'Skipping 0.10 and iojs tests (PR or local)'
  exit 0
else
  echo "Node test 0.10"
  nvm use 0.10
  node test/run.js

  echo "Node test iojs"
  nvm use iojs
  node test/run.js
fi

# switch back to node.js 0.12
nvm use $currentVersion
