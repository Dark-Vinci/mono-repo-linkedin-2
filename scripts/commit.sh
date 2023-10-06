#!/bin/sh

echo "commit command will run now"

echo "$1"
echo "$2"

git add .;
git commit -am '$0:$1';

echo "files now committed"

git push;

echo 'file pushed to github';
