#!/bin/bash

OUTPUT=$(
docker run --rm --interactive --tty \
  --volume $(pwd):/app \
  --workdir /app \
  minidocks/inkscape:1 \
  --actions="select-all;object-to-path;object-stroke-to-path;object-set-attribute:stroke-width,0;export-overwrite;export-plain-svg;export-do" \
  $@
)

EXIT_CODE=$?

if [ $EXIT_CODE -ne 0 ]; then
  echo $OUTPUT
  exit $EXIT_CODE
fi
