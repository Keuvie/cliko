#!/bin/sh
export DOCKER_HOST=unix:///var/run/docker.sock

/usr/local/bin/dockerd-entrypoint.sh >& /dev/null &

sleep 10

if [ "${RECORD:-false}" = "true" ]; then
  asciinema rec /cast
else
  exec ${SHELL}
fi
