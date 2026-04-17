# City Club of Tokyo — Wedding Venue Website

Single-page wedding venue site for **City Club of Tokyo (ZOE銀座, Ginza)**.

## Stack
- `index.html` — single file, all HTML + inline styles
- Tailwind CSS via CDN (`https://cdn.tailwindcss.com`)
- Vite dev server — run with `npm run dev`, opens at `http://localhost:5173/`

## Key Assets (`/img/`)
- `pattern-05.png` — decorative pattern used across sections
- `video.mp4` — looping ambient video (hero + concept sections)
- `logo.png` — main logo
- `marble-bg.jpg` — hero background texture
- `chapel.jpg`, `party.jpg`, `yata.jpg`, `plate.jpg` — section images

## Section Structure (top → bottom)
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
All pattern tiles use `background-image` + `background-repeat: repeat`. Never use `<img object-fit:fill>` — compresses pattern.

| Location | bg-size | blend | opacity | notes |
|---|---|---|---|---|
| Hero center column | `100% auto` | multiply | 0.6 | over video |
| Hero left/right strips | `auto 100%` | multiply | 0.3 | `width: 256px`, no video |
| Concept bridge | `auto 100%` | multiply | 0.6 | over video, edge + bottom fades |
| Wedding Space | `auto 100%` | multiply | 0.3 | inside `h-64` div, cream bg |

## Video Sync
Two `<video>` elements play `img/video.mp4` — hero column + concept bridge.
JS syncs them via `timeupdate` on primary (hero): if drift > 0.1s, secondary `currentTime` snapped to match.

## Colors
| Token | Value |
|---|---|
| Dark bg | `#0d0d0d` |
| Column bg | `#1a130c` |
| Gold primary | `#b79769` |
| Gold CTA | `#8c734b` |
| Cream bg | `#f8f7f3` |
| Cream pattern | `#eceadd` / `#f0efe9` |

## Fonts
- `Playfair Display` — serif headings
- `Shippori Mincho B1` — Japanese mincho text
- `Noto Sans JP` — Japanese body text

## Nav & Menu
- Fixed top-right nav: Bridal Fair CTA + hamburger (3 vertical lines)
- Full-screen overlay menu: clip-path circle animation, left image pane + right links grid
