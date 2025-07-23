#!/usr/bin/env bash

# builder-bob doesn't support including something frmo the top level so we need to fix the paths

set -e

if [ "$(uname)" == "Darwin" ]; then
  ISED='sed -i ""'
else # $OSTYPE == linux64
  ISED='sed -i'
fi

$ISED 's/..\/glyphmaps/..\/..\/glyphmaps/' lib/commonjs/index.js
$ISED 's/..\/fonts/..\/..\/fonts/' lib/commonjs/index.js
$ISED 's/..\/glyphmaps/..\/..\/glyphmaps/' lib/module/index.js
$ISED 's/..\/fonts/..\/..\/fonts/' lib/module/index.js

$ISED 's/..\/glyphmaps/..\/..\/..\/..\/glyphmaps/' lib/typescript/commonjs/src/index.d.ts
$ISED 's/..\/glyphmaps/..\/..\/..\/..\/glyphmaps/' lib/typescript/module/src/index.d.ts
