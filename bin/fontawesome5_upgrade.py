import os
import re
import sys
from shutil import copyfile

regex = ".*Font\\ Awesome\\ 5\\ (.*)-(.*)-.*"

def handle_file(file):
    print("Handling file: " + file)
    search = re.search(regex, file)

    if search:
        print("Copying: " + file)

        fa_type = search.group(1)
        fa_size = search.group(2)

        addon = fa_size
        if fa_type == "Brands":
            addon = fa_type

        filename = "FontAwesome5_" + addon + ".otf"
        print("\tNew filename: " + filename)

        new_path = os.path.join(fa_output, filename)

        try:
            copyfile(file, new_path)
            print("\tCopy successful")
        except:
            print("\tCopy failed")
    else:
        print("No regex match")

def handle_dir(dir):
    print("Handling dir: " + dir)
    for file in os.listdir(dir):
        if not os.path.isdir(file):
            handle_file(os.path.join(dir, file))

if len(sys.argv) < 3:
    print("Not enough args...")
    print("fontawesome5_upgrade.py [INPUT] [OUTPUT]")
    print("INPUT must be the path of the downloaded Font Awesome 5 Pro folder")
    print("OUTPUT must be the path of the folder containing the node_modules"
            "folder (usually the project folder)")

font_files = "otfs"
fonts_folder = "node_modules/react-native-vector-icons/Fonts"
fa_path = os.path.join(sys.argv[1], font_files)
fa_output = os.path.join(sys.argv[2], fonts_folder)

handle_dir(fa_path)

print("----- Done ------\n\n")
print("If all font files were successfully copied you may now (re)link the "
        "library using 'react-native link'. If you have linked the library "
        "earlier you should first unlink it using 'react-native unlink "
        "react-native-vector-icons'\n")
print("Happy coding :)")

