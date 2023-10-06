#!/bin/sh

echo "commit command will run now";

echo "commit type: [$1]";
echo "commit message: [$2]";

# add to [] and commit
git add .;
git commit -am "$0:$1";

echo "files now committed"

# push to github
git push;

echo "file pushed to github";
