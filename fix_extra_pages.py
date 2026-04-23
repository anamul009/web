import re, os

FONT_LINK = '''    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Shippori+Mincho+B1:wght@400;500;600&family=Noto+Sans+JP:wght@300;400&display=swap" rel="stylesheet" />'''

TAILWIND_CONFIG = '''    <script>
        tailwind.config = {
            theme: { extend: { fontFamily: {
                serif:    ['"Playfair Display"', 'serif'],
                mincho:   ['"Shippori Mincho B1"', 'serif'],
                'sans-jp':['"Noto Sans JP"', 'sans-serif'],
            }}}
        };
    </script>'''

files = [
    'pages/message.html',
    'pages/notices/notice-20241020.html',
    'pages/notices/notice-20241115.html',
    'pages/notices/notice-20241201.html',
]

for path in files:
    with open(path, 'r', encoding='utf-8') as f:
        html = f.read()

    # Skip if already has font link
    if 'fonts.googleapis.com/css2' in html:
        print(f'SKIP (already has fonts): {path}')
        continue

    # Insert font links before </head>
    html = html.replace('</head>', FONT_LINK + '\n</head>', 1)

    # Insert tailwind config after tailwindcss CDN script
    html = re.sub(
        r'(<script src="https://cdn\.tailwindcss\.com[^"]*"></script>)',
        r'\1\n' + TAILWIND_CONFIG,
        html, count=1
    )

    # Update body class to include font-serif antialiased
    html = re.sub(
        r'<body class="([^"]*)"',
        lambda m: '<body class="' + m.group(1).replace('bg-[#03080b]', 'bg-[#03080b] text-white font-serif antialiased overflow-x-hidden') + '"'
        if 'font-serif' not in m.group(1) else m.group(0),
        html, count=1
    )

    with open(path, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'UPDATED: {path}')

print('Done.')
