#!/usr/bin/env bash
set -euo pipefail

REPO="oblador/react-native-vector-icons"
WORKFLOW_FILE="deploy.yaml"

already_configured=0
newly_configured=0
failed=0
skipped_private=0
failed_packages=()

for pkg_json in packages/*/package.json; do
  private=$(jq -r '.private // false' "$pkg_json")
  name=$(jq -r '.name' "$pkg_json")

  if [ "$private" = "true" ]; then
    echo "SKIP (private): $name"
    skipped_private=$((skipped_private + 1))
    continue
  fi

  echo -n "Checking $name ... "

  trust_output=$(npm trust list --json "$name" 2>/dev/null || true)

  if echo "$trust_output" | jq -e 'select(.type == "github")' >/dev/null 2>&1; then
    echo "already configured"
    already_configured=$((already_configured + 1))
    continue
  fi

  echo -n "configuring ... "

  if npm trust github "$name" --file "$WORKFLOW_FILE" --repo "$REPO" --yes 2>&1; then
    echo "done"
    newly_configured=$((newly_configured + 1))
  else
    echo "FAILED"
    failed=$((failed + 1))
    failed_packages+=("$name")
  fi

  sleep 2
done

echo ""
echo "=== Summary ==="
echo "Already configured: $already_configured"
echo "Newly configured:   $newly_configured"
echo "Skipped (private):  $skipped_private"
echo "Failed:             $failed"

if [ ${#failed_packages[@]} -gt 0 ]; then
  echo ""
  echo "Failed packages:"
  for pkg in "${failed_packages[@]}"; do
    echo "  - $pkg"
  done
fi
