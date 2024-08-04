import fontforge

font_path = sys.argv[1]

font = fontforge.open(font_path)

# Iterate through all glyphs in the font
for glyph in font.glyphs():
   glyph.correctDirection()

font.generate(font_path)

print(f'Fixed direction on all glyphs and saved to {font_path}')
