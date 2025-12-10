#!/bin/bash

# Publish script for @tenerife.music/ui package
# Usage: ./scripts/publish.sh [patch|minor|major]
# Example: ./scripts/publish.sh patch

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if version type is provided
if [ -z "$1" ]; then
  echo -e "${RED}Error: Version type is required${NC}"
  echo "Usage: ./scripts/publish.sh [patch|minor|major]"
  echo "Example: ./scripts/publish.sh patch"
  exit 1
fi

VERSION_TYPE=$1

# Validate version type
if [[ ! "$VERSION_TYPE" =~ ^(patch|minor|major)$ ]]; then
  echo -e "${RED}Error: Invalid version type. Must be patch, minor, or major${NC}"
  exit 1
fi

# Get current version
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo -e "${YELLOW}Current version: ${CURRENT_VERSION}${NC}"

# Calculate new version
if [ "$VERSION_TYPE" == "patch" ]; then
  NEW_VERSION=$(node -e "const v = '${CURRENT_VERSION}'.split('.'); v[2] = parseInt(v[2]) + 1; console.log(v.join('.'))")
elif [ "$VERSION_TYPE" == "minor" ]; then
  NEW_VERSION=$(node -e "const v = '${CURRENT_VERSION}'.split('.'); v[1] = parseInt(v[1]) + 1; v[2] = 0; console.log(v.join('.'))")
else
  NEW_VERSION=$(node -e "const v = '${CURRENT_VERSION}'.split('.'); v[0] = parseInt(v[0]) + 1; v[1] = 0; v[2] = 0; console.log(v.join('.'))")
fi

echo -e "${YELLOW}New version: ${NEW_VERSION}${NC}"

# Get current date
CURRENT_DATE=$(date +"%Y-%m-%d")

# Update package.json version
echo -e "${GREEN}Updating package.json version...${NC}"
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.version = '${NEW_VERSION}';
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
"

# Update CHANGELOG.md
echo -e "${GREEN}Updating CHANGELOG.md...${NC}"
# Create a temporary file with the new changelog entry
TEMP_CHANGELOG=$(mktemp)

# Read header and Unreleased section (first 8 lines)
head -n 8 CHANGELOG.md > "$TEMP_CHANGELOG"

# Add new version entry
cat >> "$TEMP_CHANGELOG" << EOF

## [${NEW_VERSION}] - ${CURRENT_DATE}

### Added

- TBD

### Changed

- TBD

### Fixed

- TBD

### Removed

- TBD

EOF

# Append existing changelog entries (skip first 8 lines)
tail -n +9 CHANGELOG.md >> "$TEMP_CHANGELOG"
mv "$TEMP_CHANGELOG" CHANGELOG.md

# Check if there are uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
  echo -e "${YELLOW}Warning: There are uncommitted changes. Please commit or stash them first.${NC}"
  read -p "Continue anyway? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

# Create git commit
echo -e "${GREEN}Creating git commit...${NC}"
git add package.json CHANGELOG.md
git commit -m "chore: bump version to ${NEW_VERSION}" || {
  echo -e "${RED}Error: Failed to create commit. Make sure you have staged changes or commit manually.${NC}"
  exit 1
}

# Create git tag
echo -e "${GREEN}Creating git tag v${NEW_VERSION}...${NC}"
git tag -a "v${NEW_VERSION}" -m "Release v${NEW_VERSION}" || {
  echo -e "${RED}Error: Failed to create tag. Tag might already exist.${NC}"
  exit 1
}

# Push to remote
echo -e "${GREEN}Pushing to remote...${NC}"
git push && git push --tags || {
  echo -e "${RED}Error: Failed to push to remote.${NC}"
  exit 1
}

# Publish to npm
echo -e "${GREEN}Publishing to npm...${NC}"
npm publish --access public || {
  echo -e "${RED}Error: Failed to publish to npm.${NC}"
  echo -e "${YELLOW}Note: Make sure you are logged in (npm login) and have 2FA enabled for scoped packages.${NC}"
  exit 1
}

echo -e "${GREEN}✅ Successfully published @tenerife.music/ui@${NEW_VERSION}${NC}"
echo -e "${GREEN}Package URL: https://www.npmjs.com/package/@tenerife.music/ui${NC}"
