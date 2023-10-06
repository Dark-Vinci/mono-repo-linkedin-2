#!/bin/sh

echo "commit command will run now";

echo "commit type: [$1]";
echo "commit message: [$2]";

git add .;
git commit -am "$0:$1";

echo "files now committed"

git push;

echo 'file pushed to github';
