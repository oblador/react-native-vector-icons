# Generating Feather icon set

### To build Feather Icon Set is necessary:

- [Inkscape](https://inkscape.org/)
- [GNU Parallel](https://www.gnu.org/software/parallel/)
- [Font Custom](https://github.com/FontCustom/fontcustom)
- [Xvfb](https://www.x.org/releases/X11R7.6/doc/man/man1/Xvfb.1.xhtml) - Optional, but highly recommended

1. Go to [Font Custom](https://github.com/FontCustom/fontcustom) and follow the installation instructions
2. Generate the icon set with `yarn build-feather`

Before we can build icon set, is necessary pre-process the icons. This task will be done using Inkscape with help of Parallel.
If you have Xvfb installed, you will see a progress-bar on console, if not, for every single icon one inkscape window will be launched to adjust svg.

During the building stage, a folder named Feather will be created.
It will be removed at the end of build.
