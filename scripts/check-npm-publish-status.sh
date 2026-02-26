#!/usr/bin/env bash
set -euo pipefail

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BOLD='\033[1m'
RESET='\033[0m'

published=0
not_published=0
skipped_private=0
not_published_packages=()

for pkg_json in packages/*/package.json; do
  private=$(jq -r '.private // false' "$pkg_json")
  name=$(jq -r '.name' "$pkg_json")
  version=$(jq -r '.version' "$pkg_json")

  if [ "$private" = "true" ]; then
    echo -e "${YELLOW}SKIP (private):${RESET} $name"
    skipped_private=$((skipped_private + 1))
    continue
  fi

  echo -n "Checking $name@$version ... "

  if npm view "$name@$version" version >/dev/null 2>&1; then
    echo -e "${GREEN}published${RESET}"
    published=$((published + 1))
  else
    echo -e "${RED}NOT PUBLISHED${RESET}"
    not_published=$((not_published + 1))
    not_published_packages+=("$name@$version")
  fi
done

echo ""
echo -e "${BOLD}=== Summary ===${RESET}"
echo -e "${GREEN}Published:${RESET}         $published"
echo -e "${RED}Not published:${RESET}     $not_published"
echo -e "${YELLOW}Skipped (private):${RESET} $skipped_private"

if [ ${#not_published_packages[@]} -gt 0 ]; then
  echo ""
  echo -e "${RED}Not published:${RESET}"
  for pkg in "${not_published_packages[@]}"; do
    echo -e "  - ${RED}$pkg${RESET}"
  done
fi
