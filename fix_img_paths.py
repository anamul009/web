import re

# Map of raw img paths with spaces → URL-encoded versions
REPLACEMENTS = {
    '../img/五十嵐 あきこ.jpg':   '../img/%E4%BA%94%E5%8D%81%E5%B5%90%20%E3%81%82%E3%81%8D%E3%81%93.jpg',
    '../img/國井 類.jpg':         '../img/%E5%9C%8B%E4%BA%95%20%E9%A1%9E.jpg',
    '../img/小松 都代子.jpg':     '../img/%E5%B0%8F%E6%9D%BE%20%E9%83%BD%E4%BB%A3%E5%AD%90.jpg',
    '../img/菅 涼子.jpg':         '../img/%E8%8F%85%20%E6%B6%BC%E5%AD%90.jpg',
    '../img/鈴木 琴子.jpg':       '../img/%E9%88%B4%E6%9C%A8%20%E7%90%B4%E5%AD%90.jpg',
    # Also fix the CSS background ref in style.css
    "url('../img/1 (1).jpg')":    "url('../img/1%20(1).jpg')",
    "url('../img/1 (2).jpg')":    "url('../img/1%20(2).jpg')",
}

files = [
    'pages/performer.html',
    'pages/floor.html',
    'pages/concept.html',
    'css/style.css',
]

for path in files:
    try:
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        original = content
        for old, new in REPLACEMENTS.items():
            content = content.replace(old, new)
        if content != original:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f'FIXED: {path}')
        else:
            print(f'no change: {path}')
    except Exception as e:
        print(f'ERROR {path}: {e}')

print('Done.')
