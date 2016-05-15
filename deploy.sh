#!/usr/bin/env bash

set -o errexit
set -o nounset
set -o pipefail

echo "SSHTEST=$SSHTEST"

echo "Deleting old deployment directory"
sshpass -e ssh $SSHUSER@schoenung.org "rm -rf /var/www/schoenung.org-deploy"

echo "Copying deployment directory to server"
sshpass -e scp -r dist $SSHUSER@schoenung.org:/var/www/schoenung.org-deploy

echo "Running deployment script on server"
sshpass -e ssh $SSHUSER@schoenung.org "./deploy.sh schoenung.org"
