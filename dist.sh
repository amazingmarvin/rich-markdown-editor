#!/bin/bash

git checkout master
git branch -D production || echo "No local production branch"
git push --delete origin production || echo "No remote production branch"
git checkout -b production

yarn run build
sed -i '.bak' -e 's/^dist//' .gitignore
rm -f .gitignore.bak
git add .gitignore dist
git commit -m "Add dist files."
git push origin production --force
git checkout master
