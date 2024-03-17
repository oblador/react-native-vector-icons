#!/usr/bin/env bash

set -e

export PATH="$PATH":"$HOME/.maestro/bin"

cd e2e

if [ -z "$CI" ]; then
  for i in tests/*.yaml; do
    maestro test --no-color $i
  done
else
  maestro test --format=JUNIT --color tests || true
  ls
  echo MOO
  ls ..
fi

mkdir -p diff

echo '<?xml version="1.0" encoding="UTF-8"?>' > diff.xml
echo '<testsuites>' >> diff.xml
echo '  <testsuite name="Test Suite" device="emulator-18730" tests="4" failures="0" time="86">' >> diff.xml

for i in *.png; do
  pixels=$(compare -crop 1440x3120+0+100 -metric AE $i snapshot/$i diff/$i 2>&1 || true)
  if [ -z "$CI" ]; then
    echo $i: $pixels
  fi
  if [ "$pixels" != "0" ]; then
    echo "    <testcase id=\"$i\" name=\"$i\" time=\"1\" status=\"FAILURE\">" >> diff.xml
    echo "      <failure message=\"$pixels pixels different\"/>" >> diff.xml
    echo "      <properties>" >> diff.xml
    echo "          <property name=\"attachment\" value=\"diff/$i\" />" >> diff.xml
    echo "      </properties>" >> diff.xml
    echo "    </testcase>" >> diff.xml
  else
    echo "    <testcase id=\"$i\" name=\"$i\" time=\"1\" status=\"SUCCESS\"/>" >> diff.xml
  fi
done

echo '  </testsuite>' >> diff.xml
echo '</testsuites>' >> diff.xml
