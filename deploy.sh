npm run build
git add dist -f
git commit -m "Update gh-pages commit"
git subtree push --prefix dist origin gh-pages