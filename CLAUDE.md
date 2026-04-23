# City Club of Tokyo — Wedding Venue Website

Wedding venue site for **City Club of Tokyo (ZOE銀座, Ginza)** — luxury Japanese aesthetic, dark/gold palette.

## Stack
- **Main site**: vanilla HTML + inline styles/CDN Tailwind. No build step for HTML pages.
- **Tailwind**: CDN (`https://cdn.tailwindcss.com`), config inline in each `<script>` block
- **Vite + React** (`src/`) — scaffolded but separate from main HTML delivery; run with `npm run dev`
- Dev server opens at `http://localhost:5173/`

## File Structure
```
index.html          — homepage
pages/              — subpages (all standalone HTML)
  concept.html
  contact.html
  floor.html
  menu.html
  message.html
  notice.html
  performer.html
  notices/          — dated notice articles
    notice-20241020.html
    notice-20241115.html
    notice-20241201.html
css/
  style.css         — shared styles for subpages (cursor, typography classes, base)
js/
  main.js           — custom cursor, IntersectionObserver fade, accordion
  reservation.js    — calendar modal / reservation widget
src/                — Vite React scaffold (not used for main HTML site)
img/                — all assets (see below)
```

## Key Assets (`/img/`)
- `pattern-05.png` — decorative pattern used across sections
- `video.mp4` — looping ambient video (hero + concept sections)
- `logo.png` — main logo
- `marble-bg.jpg` — hero background texture
- `hero-bg.jpg` — alternate hero bg
- `concept.jpg` — concept section image
- `chapel.jpg`, `party.jpg`, `yata.jpg`, `plate.jpg` — section images
- `menu-img.jpg`, `recommand.jpg`, `service.jpg`, `space.jpg`, `music.jpg` — section images
- `五十嵐 あきこ.jpg`, `國井 類.jpg`, `小松 都代子.jpg`, `菅 涼子.jpg`, `鈴木 琴子.jpg` — staff/performer portraits

## Section Structure — index.html (top → bottom)
1. **Hero** — full-screen dark marble bg, center column (video + pattern), left/right vertical pattern strips
2. **Concept** — dark section, horizontal pattern bridge at top connecting from hero column
3. **Wedding Space** — cream `#f8f7f3` bg, chapel + party room content
4. **Recommend Bridal Fair** — centered portrait image with overlaid gold text
5. **Exquisite Cuisine** — full-width hero image + dark content area
6. **3-panel grid** — Cake & Desert / Wedding Dress / Wedding Items
7. **Wedding Plan + Presents** — plan CTA + gift items list + footer nav
8. **Group Company** — full group venue directory
9. **Copyright footer**

## Pattern System (pattern-05.png)
Always use `background-image` + `background-repeat: repeat`. Never `<img object-fit:fill>` — compresses pattern.

| Location | bg-size | blend | opacity | notes |
|---|---|---|---|---|
| Hero center column | `100% auto` | multiply | 0.6 | over video |
| Hero left/right strips | `auto 100%` | multiply | 0.3 | `width: 256px`, no video |
| Concept bridge | `auto 100%` | multiply | 0.6 | over video, edge + bottom fades |
| Wedding Space | `auto 100%` | multiply | 0.3 | inside `h-64` div, cream bg |

## Video Sync
Two `<video>` elements play `img/video.mp4` — hero column + concept bridge.
JS syncs via `timeupdate` on primary (hero): if drift > 0.1s, secondary `currentTime` snapped to match.

## Shared JS (`js/main.js`)
Loaded by all pages. Handles:
- **Custom cursor** — `#cursor` dot + `#cursor-follower` ring with lerp follow (rAF loop)
- **Fade sections** — `.fade-section` elements observed via IntersectionObserver; adds `.is-visible` at 12% threshold
- **Text slide-in** — `.text-content` observed at 15% threshold
- **Accordion** — `.accordion-header` click toggles height on sibling; only one open at a time

## Shared CSS (`css/style.css`)
Base styles + utility classes used by subpages:
- `.cursive-title` — Playfair italic, white
- `.concept-title` — Playfair 600, letter-spacing 0.1em
- `.jp-font` — Shippori Mincho B1
- `.writing-vertical-rl` — vertical text utility
- Custom cursor styles (`#cursor`, `#cursor-follower`)

## Subpages (`pages/`)
Each subpage is standalone HTML. All include:
- Tailwind CDN + inline `tailwind.config`
- Google Fonts (same 3 families)
- `../css/style.css`
- `../js/main.js`
- Some pages also load **GSAP + ScrollTrigger** + **Lenis smooth scroll** via CDN

## Reservation Widget (`js/reservation.js`)
Calendar modal triggered by `#calendar-toggle` button. Self-contained IIFE. Requires `#calendar-modal` and `#close-calendar` in HTML.

## Colors
| Token | Value |
|---|---|
| Dark bg | `#0d0d0d` |
| Column bg | `#1a130c` |
| Gold primary | `#b79769` |
| Gold CTA | `#8c734b` |
| Brand gold (Tailwind) | `#9c8257` |
| Brand gold hover | `#856d47` |
| Brand light | `#d4c5b0` |
| Cream bg | `#f8f7f3` |
| Cream pattern | `#eceadd` / `#f0efe9` |

## Fonts
- `Playfair Display` — serif headings (italic for display titles)
- `Shippori Mincho B1` — Japanese mincho text
- `Noto Sans JP` — Japanese body text

## Nav & Menu
- Fixed top-right nav: Bridal Fair CTA + hamburger (3 vertical lines → X on open)
- Full-screen overlay menu: clip-path circle animation, left image pane + right links grid
- Menu image: `img/menu-img.jpg`

## Asset Path Convention
- `index.html` references assets as `img/...`
- Subpages in `pages/` reference as `../img/...` and `../css/...` / `../js/...`
