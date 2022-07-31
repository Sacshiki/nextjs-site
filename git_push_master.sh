#!/bin/bash
# This script automates pushing the develop branch to master

# If the status is clean, just show it.  Otherwise, exit with a helpful message.
if [[ -z $(git status --porcelain) ]];
then
    git status
else
    git status
    echo "your status is not clean.  plz commit and push"
    exit 1
fi

# If the pull is already synched proceed to the push.  Otherwise, exit with a helpful message.
if [[ -z $(git pull --dry-run | grep -q -v 'Already up-to-date.' && changed=1) ]];
then
    echo Already up-to-date.
else
    echo git pull not up-to-date
    exit
fi

git checkout master
git pull
git merge develop 
git push origin master
git checkout develop
git merge master
git log -1
git checkout develop

open "https://vercel.com/cpres/nextjs-site/deployments"
