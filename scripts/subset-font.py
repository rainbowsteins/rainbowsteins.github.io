"""Regenerate the local Chinese font after adding Chinese copy.

Usage: python scripts/subset-font.py /path/to/NotoSansSC[wght].ttf
Requires: fonttools[woff]
Upstream: https://github.com/google/fonts/tree/main/ofl/notosanssc
"""
from pathlib import Path
import sys
from fontTools import subset
from fontTools.ttLib import TTFont

root = Path(__file__).resolve().parent.parent
source = Path(sys.argv[1])
files = [*root.glob('app/*.tsx'), *root.glob('components/*.tsx'), *root.glob('lib/*.ts'), root / 'index.html']
characters = ''.join(sorted(set(''.join(p.read_text() for p in files))))
options = subset.Options()
options.layout_features = ['*']
font = TTFont(source)
subsetter = subset.Subsetter(options=options)
subsetter.populate(text=characters)
subsetter.subset(font)
font.flavor = 'woff2'
output = root / 'public/fonts/noto-sans-sc-portfolio.woff2'
font.save(output)
print(f'{len(characters)} source characters → {output.name} ({output.stat().st_size:,} bytes)')
