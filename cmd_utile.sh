#!/bin/bash
if [$# -eq 0]
then
    echo "pas de message de commit"
else
    git add --all
    git commit -m $0
    git push
    git push heroku master
fi
