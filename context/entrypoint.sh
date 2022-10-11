#!/bin/sh

if [ "${RECORD:-false}" = "true" ]; then
  echo ":: --- RECORDING --- ::"
  asciinema rec -i 2 -q /cast
else
  exec ${SHELL}
fi