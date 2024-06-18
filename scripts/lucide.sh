
#!/bin/bash -e

node bin/generate-icon node_modules/lucide-static/font/lucide.css\
  --prefix=.icon-\
  --componentName=Lucide\
  --fontFamily=Lucide\
  --template=templates/separated-icon-set.tpl\
  --glyphmap=glyphmaps/Lucide.json\
  > Lucide.js
cp node_modules/lucide-static/font/lucide.ttf Fonts/Lucide.ttf
