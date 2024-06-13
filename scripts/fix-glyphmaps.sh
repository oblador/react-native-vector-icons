#!/usr/bin/env bash

# builder-bob doesn't support including something frmo the top level so we need to fix the paths

set -e

sed -i 's/..\/glyphmaps/..\/..\/glyphmaps/' lib/commonjs/index.js
sed -i 's/..\/glyphmaps/..\/..\/glyphmaps/' lib/module/index.js
