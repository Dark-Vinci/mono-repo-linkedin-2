#!/bin/sh

echo "commit command will run now";

echo "commit type: [$1]";
echo "commit message: [$2]";

directory = '../APP/BACKEND';


for diren in "$directory"; do
    echo $diren
#    if [ -d "$diren/node_modules" ]; then
#     echo "node modules exists ====> Removing now"
#     rm -rf $diren/node_modules
#    else
#     echo "The directory does not exist ====> well pass"
#    fi
done

# add to [] and commit
git add .;
sleep 2
git commit -am "$1:$2";

echo "files now committed"

# push to github
git push;

echo "file pushed to github";
