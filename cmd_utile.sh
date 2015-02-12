#!/bin/bash

if [ -n "$1" ]
then
  echo "*******************************"
  echo "*****   BEGING UPDATE    ******"
  echo "*******************************"

  git add -A
  git commit -m $1
  git push
  git push heroku master

  echo "****************************"
  echo "*****   END UPDATE    ******"
  echo "****************************"

else
  echo "********************"
  echo "***   WARNING   ****"
  echo "********************"
  echo "PAS DE MESSAGE DE COMMIT"
fi
