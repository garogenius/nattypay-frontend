import glob
import re

files = glob.glob('src/features/landing/components/*HeroSection.tsx') + ['src/features/landing/components/HeroSection.tsx']

for file in files:
    with open(file, 'r') as f:
        content = f.read()

    # Replace gap-0 in the Trust Badges section.
    # It looks like: className="flex items-center gap-0"
    content = re.sub(r'className="flex items-center gap-0"', 'className="flex items-center gap-2"', content)

    with open(file, 'w') as f:
        f.write(content)

print("Updated gaps in Hero sections.")
