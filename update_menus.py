import os
import re

pages_dir = r"d:\MyDocument\デスクトップ\Yata design and files\web\pages"

css_to_add = """
    <style>
        /* Hamburger menu transition effects */
        .menu-line { transition: all 0.3s ease-in-out; transform-origin: center; }
        .menu-btn.active .line-1 { transform: rotate(45deg) translate(4px, 0px); }
        .menu-btn.active .line-2 { opacity: 0; }
        .menu-btn.active .line-3 { transform: rotate(-45deg) translate(-4px, 0px); }
        /* Menu Overlay Transition */
        #menu-overlay { clip-path: circle(0% at 100% 0%); transition: clip-path 0.8s cubic-bezier(0.77, 0, 0.175, 1); }
        #menu-overlay.open { clip-path: circle(150% at 100% 0%); }
    </style>
"""

new_menu_overlay = """
    <!-- Full-screen Menu Overlay -->
    <div id="menu-overlay" class="fixed inset-0 bg-[#f4f2ea] z-[90] flex flex-col lg:flex-row overflow-hidden">
        <!-- Close button -->
        <button id="menu-close-btn" class="absolute top-8 right-8 md:right-12 z-[110] flex flex-col items-center justify-center w-10 h-10 group">
            <span class="block w-6 h-[1px] bg-[#1a1a1a] rotate-45 translate-y-[0.5px] transition-all duration-300 group-hover:bg-[#8c734b]"></span>
            <span class="block w-6 h-[1px] bg-[#1a1a1a] -rotate-45 -translate-y-[0.5px] transition-all duration-300 group-hover:bg-[#8c734b]"></span>
        </button>

        <!-- Left Pane: Image (Hidden on mobile) -->
        <div class="hidden lg:block lg:w-1/2 h-full relative overflow-hidden">
            <img src="../img/1%20(3).jpg" alt="Menu Decoration" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-black/20"></div>
            <div class="absolute inset-0 flex items-center justify-center">
                <div class="text-center"></div>
            </div>
        </div>

        <!-- Right Pane: Links -->
        <div class="w-full lg:w-1/2 h-full flex flex-col justify-center px-8 md:px-24 py-32 overflow-y-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-2xl">
                <div class="space-y-4">
                    <a href="../index.html" class="group flex items-center justify-between border-b border-gray-300 pb-4">
                        <span class="text-[#1a1a1a] text-sm tracking-widest font-serif uppercase">Home</span>
                        <span class="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center text-[10px] group-hover:bg-[#1a1a1a] group-hover:text-white transition-colors">→</span>
                    </a>
                    <a href="concept.html" class="group flex items-center justify-between border-b border-gray-300 pb-4">
                        <span class="text-[#1a1a1a] text-sm tracking-widest font-serif uppercase">Concept</span>
                        <span class="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center text-[10px] group-hover:bg-[#1a1a1a] group-hover:text-white transition-colors">→</span>
                    </a>
                    <a href="floor.html" class="group flex items-center justify-between border-b border-gray-300 pb-4">
                        <span class="text-[#1a1a1a] text-sm tracking-widest font-serif uppercase">Floor</span>
                        <span class="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center text-[10px] group-hover:bg-[#1a1a1a] group-hover:text-white transition-colors">→</span>
                    </a>
                    <a href="menu.html" class="group flex items-center justify-between border-b border-gray-300 pb-4">
                        <span class="text-[#1a1a1a] text-sm tracking-widest font-serif uppercase">Menu</span>
                        <span class="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center text-[10px] group-hover:bg-[#1a1a1a] group-hover:text-white transition-colors">→</span>
                    </a>
                </div>
                <div class="space-y-4">
                    <a href="performer.html" class="group flex items-center justify-between border-b border-gray-300 pb-4">
                        <span class="text-[#1a1a1a] text-sm tracking-widest font-serif uppercase">Performer</span>
                        <span class="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center text-[10px] group-hover:bg-[#1a1a1a] group-hover:text-white transition-colors">→</span>
                    </a>
                    <a href="notice.html" class="group flex items-center justify-between border-b border-gray-300 pb-4">
                        <span class="text-[#1a1a1a] text-sm tracking-widest font-serif uppercase">Notice</span>
                        <span class="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center text-[10px] group-hover:bg-[#1a1a1a] group-hover:text-white transition-colors">→</span>
                    </a>
                    <a href="#" class="group flex items-center justify-between border-b border-gray-300 pb-4">
                        <span class="text-[#1a1a1a] text-sm tracking-widest font-serif uppercase">EC</span>
                        <span class="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center text-[10px] group-hover:bg-[#1a1a1a] group-hover:text-white transition-colors">→</span>
                    </a>
                    <a href="contact.html" class="group flex items-center justify-between border-b border-gray-300 pb-4 text-[#8c734b]">
                        <span class="text-sm tracking-widest font-serif font-bold uppercase">Contact</span>
                        <span class="w-6 h-6 rounded-full border border-[#8c734b] flex items-center justify-center text-[10px] group-hover:bg-[#8c734b] group-hover:text-white transition-colors">→</span>
                    </a>
                </div>
            </div>
            <div class="mt-16 flex flex-wrap gap-x-8 gap-y-4">
                <a href="#" class="text-gray-500 text-[10px] tracking-widest border-b border-transparent hover:border-gray-500 transition-colors">資料請求</a>
                <a href="#" class="text-gray-500 text-[10px] tracking-widest border-b border-transparent hover:border-gray-500 transition-colors">お問い合わせ</a>
                <a href="#" class="text-gray-500 text-[10px] tracking-widest border-b border-transparent hover:border-gray-500 transition-colors">よくあるご質問</a>
            </div>
        </div>
    </div>
"""

new_nav = """
    <!-- Navigation Logo (Left) -->
    <nav class="absolute z-50 top-0 w-full px-8 md:px-12 py-8 flex justify-between items-start pointer-events-none">
        <div class="w-28 md:w-64 pointer-events-auto">
            <a href="../index.html">
                <img src="../img/logo.png" alt="YATA" class="w-full">
            </a>
        </div>
    </nav>
    <!-- Hamburger & Order Now (Right) -->
    <nav class="fixed top-0 right-0 z-50 flex items-center p-5 md:p-8 md:pr-12 md:pt-10 pointer-events-auto">
        <a href="#" class="bg-[#b79769] text-white text-[10px] md:text-xs tracking-[0.2em] px-6 py-2.5 uppercase transition-colors duration-300 hover:bg-[#856d47]">
            Order Now
        </a>
        <div class="flex items-center ml-2">
            <div class="w-1 h-1 rounded-full bg-[#b79769]"></div>
            <div class="w-6 md:w-10 h-[1px] bg-[#b79769]"></div>
        </div>
        <button id="mobile-menu-btn" class="menu-btn flex items-center space-x-[5px] ml-4 transition-opacity duration-300 hover:opacity-80 focus:outline-none z-50 relative cursor-pointer" aria-label="Toggle Menu">
            <span class="menu-line line-1 w-[1px] h-7 bg-[#d4c5b0] block"></span>
            <span class="menu-line line-2 w-[1px] h-7 bg-[#d4c5b0] block"></span>
            <span class="menu-line line-3 w-[1px] h-7 bg-[#d4c5b0] block"></span>
        </button>
    </nav>
"""

javascript_toggle = """
<script>
document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("mobile-menu-btn");
    const menuOverlay = document.getElementById("menu-overlay");
    const menuCloseBtn = document.getElementById("menu-close-btn");

    if (menuBtn && menuOverlay && menuCloseBtn) {
        function closeMenu() {
            menuBtn.classList.remove("active");
            menuOverlay.classList.remove("open");
            document.body.style.overflow = "";
        }

        menuBtn.addEventListener("click", () => {
            menuBtn.classList.toggle("active");
            menuOverlay.classList.toggle("open");
            document.body.style.overflow = menuOverlay.classList.contains("open") ? "hidden" : "";
        });

        menuCloseBtn.addEventListener("click", closeMenu);
    }
});
</script>
"""

for filename in os.listdir(pages_dir):
    if filename.endswith(".html"):
        filepath = os.path.join(pages_dir, filename)
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()

        # 1. Remove old Full Screen Menu and Navigation
        content = re.sub(r'<!-- Full Screen Menu -->.*?</div>\s*<!-- Navigation -->', '<!-- Navigation -->', content, flags=re.DOTALL)
        content = re.sub(r'<!-- Navigation -->.*?<button id="menu-btn".*?</button>', new_menu_overlay + new_nav, content, flags=re.DOTALL)

        # 2. Add CSS if not present
        if '<style>' in content:
            content = content.replace('</style>', css_to_add + '\n</style>')
        else:
            content = content.replace('</head>', css_to_add + '\n</head>')

        # 3. Add Javascript
        content = content.replace('</body>', javascript_toggle + '\n</body>')

        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)

print("Done updating menus.")
