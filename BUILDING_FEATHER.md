# Generating Feather icon set

### To build the Feather icon Set you will need:

- [Inkscape](https://inkscape.org/)
- [GNU Parallel](https://www.gnu.org/software/parallel/)
- [Font Custom](https://github.com/FontCustom/fontcustom)
- [Xvfb](https://www.x.org/releases/X11R7.6/doc/man/man1/Xvfb.1.xhtml) - Optional, but highly recommended

1. Go to [Font Custom](https://github.com/FontCustom/fontcustom) and follow the installation instructions
2. Generate the icon set with `yarn build-feather`

Before we can build the icon set, you'll need to pre-process the icons. You can do this using Inkscape with help of Parallel.
If you have Xvfb installed, you will see a progress bar in the console; if not, each icon will launch one Inkscape window to adjust the SVG.

The building stage will create a folder called `Feather`. This will be removed at the end of the build.
