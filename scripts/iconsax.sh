#!/bin/bash -e

TEMP_DIR=tmp
rm -rf $TEMP_DIR/zip
rm -rf $TEMP_DIR/svg
mkdir -p $TEMP_DIR/svg
pushd ${TEMP_DIR}
curl -o svg.zip -L https://iconsax.io/Iconsax/Svg.zip
unzip -d zip svg.zip

find ./zip/Svg/All/ -type f -name "*.svg" | while read file; do
    folder=$(dirname "$file")   # Get the folder (relative path)
    foldername=$(basename "$folder")  # Get the name of the folder

    # Only proceed for the folders "bold", "outline", or "broken"
    if [[ "$foldername" == "bold" || "$foldername" == "outline" || "$foldername" == "broken" ]]; then
        filename=$(basename "$file")  # Get the filename without the folder path
        name="${filename%.*}"         # Get the filename without extension
        ext="${filename##*.}"         # Get the file extension

        # If the folder is "outline", don't add the folder name as a postfix
        if [[ "$foldername" == "outline" ]]; then
            newname="${name}.${ext}"
        else
            newname="${name}-${foldername}.${ext}"
        fi

        cp "$file" "svg/$newname"
    fi
done
popd


# The most icons fail compile with "Some fragments did not join" if not converted to plain paths
./scripts/svg-object-to-path.sh $TEMP_DIR/svg/*.svg

./scripts/fontcustom compile $TEMP_DIR/svg \
  --output $TEMP_DIR \
  --name IconSax \
  --templates css \
  --force \
  --no-hash

node bin/generate-icon ${TEMP_DIR}/IconSax.css \
  --componentName=IconSax \
  --fontFamily=IconSax \
  --template=templates/separated-icon-set.tpl \
  --glyphmap=glyphmaps/IconSax.json > IconSax.js
mv "${TEMP_DIR}/IconSax.ttf" "Fonts/IconSax.ttf"
rm -rf .fontcustom-manifest.json
rm -rf ${TEMP_DIR}

