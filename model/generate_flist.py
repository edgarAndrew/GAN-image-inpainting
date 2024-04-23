import argparse
import os
from random import shuffle

parser = argparse.ArgumentParser()
parser.add_argument('--folder_path', default='./training_data', type=str,
                    help='The folder path')
parser.add_argument('--train_filename', default='./data_flist/train_shuffled.flist', type=str,
                    help='The output filename.')
parser.add_argument('--validation_filename', default='./data_flist/validation_shuffled.flist', type=str,
                    help='The output filename.')
parser.add_argument('--is_shuffled', default='1', type=int,
                    help='Needed to shuffle')

args = parser.parse_args()

# get the list of directories
dirs = os.listdir(args.folder_path)
dirs_name_list = []

# make 2 lists to save file paths
training_file_names = []
validation_file_names = []

# print all directory names
for dir_item in dirs:
    # modify to full path -> directory
    dir_item = os.path.join(args.folder_path, dir_item)

    training_folder = os.listdir(os.path.join(dir_item, "training"))
    for training_item in training_folder:
        training_item = os.path.join(dir_item, "training", training_item)
        training_file_names.append(training_item)

    validation_folder = os.listdir(os.path.join(dir_item, "validation"))
    for validation_item in validation_folder:
        validation_item = os.path.join(dir_item, "validation", validation_item)
        validation_file_names.append(validation_item)

# shuffle file names if set
if args.is_shuffled == 1:
    shuffle(training_file_names)
    shuffle(validation_file_names)

# make output file if not existed
if not os.path.exists(args.train_filename):
    with open(args.train_filename, 'w') as f:
        pass

if not os.path.exists(args.validation_filename):
    with open(args.validation_filename, 'w') as f:
        pass

# write to file
with open(args.train_filename, 'w') as f:
    f.write("\n".join(training_file_names))

with open(args.validation_filename, 'w') as f:
    f.write("\n".join(validation_file_names))

# print process
print("Written file is: ", args.train_filename, ", is_shuffle: ", args.is_shuffled)