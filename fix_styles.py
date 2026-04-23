import os
import re

pages_dir = r"d:\MyDocument\デスクトップ\Yata design and files\web\pages"

# The malformed injected block looks like:
#     <style>
#         /* Hamburger menu ...
#         #menu-overlay.open { clip-path: circle(150% at 100% 0%); }
#     </style>
# \n</style>

# We just need to strip out the surrounding <style> tags from the injected block if it's already inside a style tag, OR just remove the extra </style> if we want it to be a separate style block.
# Actually, if we just remove the first `<style>\n` and the last `\n</style>` from css_to_add, it would merge perfectly.
# But it's already injected. Let's fix what was injected.

for filename in os.listdir(pages_dir):
    if filename.endswith(".html"):
        filepath = os.path.join(pages_dir, filename)
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()

        # We have:
        # <style>
        # ... original style ...
        #     <style>
        #         /* Hamburger menu transition effects */
        #         ...
        #     </style>
        # </style>

        # A quick fix is to replace `    <style>\n        /* Hamburger menu transition effects */`
        # with just `        /* Hamburger menu transition effects */`
        # and replace `    </style>\n\n</style>` with `</style>`
        
        # Let's do it cleanly:
        content = content.replace("    <style>\n        /* Hamburger menu transition effects */", "        /* Hamburger menu transition effects */")
        content = content.replace("    </style>\n</style>", "</style>")
        content = content.replace("    </style>\n\n</style>", "</style>")

        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)

print("Fixed styles.")
