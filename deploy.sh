#!/usr/bin/env bash

set -o errexit
set -o nounset
set -o pipefail

sshpass -e ssh $SSHUSER@schoenung.org "rm -rf /var/www/schoenung.org-deploy"
sshpass -e scp -r dist $SSHUSER@schoenung.org:/var/www/schoenung.org-deploy
sshpass -e ssh $SSHUSER@schoenung.org "./deploy.sh schoenung.org"
