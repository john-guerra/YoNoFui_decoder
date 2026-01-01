#!/bin/sh

# Build the Vite project
npm run build

# Deploy dist folder to server
rsync -avzgu --delete --partial -e "ssh -i /Users/aguerra/Dropbox/dutoVizNew.pem" dist/ ubuntu@johnguerra.co:/var/www/viz/YoNoFui/
