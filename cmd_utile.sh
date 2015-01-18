#!/bin/bash
git add --all
git commit -m $0
git push
git push heroku master

