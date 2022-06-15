# -*- coding: utf-8 -*-
"""__init__.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1umdXoBk5NVmCc9ryyldcMHzVoBY-LjXT
"""

import os

__version__ = "0.5.0"
__docs__ = "Tooling for Kaggle Plant Pathology"
__author__ = "Jiri Borovec"
__author_email__ = "jirka@pytorchlightning.ai"

_PATH_PACKAGE = os.path.realpath(os.path.dirname(__file__))
_PATH_PROJECT = os.path.dirname(_PATH_PACKAGE)

#: computed color mean from given dataset
DATASET_IMAGE_MEAN = (0.48690377, 0.62658835, 0.4078062)
#: computed color STD from given dataset
DATASET_IMAGE_STD = (0.18142496, 0.15883319, 0.19026241)