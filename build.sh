#!/bin/sh

mkdir -p temp
cp build/static/css/style.css temp
cp build/static/js/script*.js temp
cp -r build/static/img temp
npx react-scripts build
npx cross-env BABEL_ENV=production babel src/lib -d build
cp temp/style.css build/static/css
cp temp/script*.js build/static/js
cp -r temp/img build/static/
cp manifest.json build
