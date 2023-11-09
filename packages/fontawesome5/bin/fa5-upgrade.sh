#!/bin/sh

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

"${SCRIPT_DIR}"/fa-upgrade.sh 5 "$@"
