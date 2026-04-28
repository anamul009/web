# Yata — Private Bar saloon

A luxury Private Bar saloon website for a Okayama-based venue, built as a pixel-perfect clone of a high-end Japanese bar and music site.

## Project Structure

```
web/
├── index.html          # Main file (pure HTML + Tailwind CDN)
├── index-1.html        # Original 80% base clone
├── img/
│   ├── logo.png        # Venue logo
│   ├── video.mp4       # Hero background video
│   ├── pattern-05.png  # Geometric pattern overlay (mix-blend-mode: multiply)
│   ├── marble-bg.jpg   # Marble texture background
│   ├── chapel.jpg/png  # Chapel photo
│   ├── party.jpg/png   # Banquet hall photo
│   ├── plate.jpg/png   # Fine cuisine photo
│   ├── yata.jpg/png    # Venue photo
│   └── space.jpg       # Space photo
├── src/                # React version (separate experiment)
│   ├── App.jsx
│   └── components/
└── package.json        # React + Vite setup (for src/ version)
```

## Two Versions

### `index.html` — Main version (active)
Pure HTML file with no build step. Uses:
- **Tailwind CSS** via CDN
- **Google Fonts** — Playfair Display, Shippori Mincho B1, Noto Sans JP
- **Vanilla JS** — IntersectionObserver for scroll reveals, hamburger menu
- **CSS animations** — `arcDraw` keyframes for scroll indicator arc

### `src/` — React version (experimental)
React + Vite + Framer Motion + Tailwind build. Run with:
```bash
npm install
npm run dev
```

## Key Sections (index.html)

| Section | Description |
|---|---|
| Nav | Fixed top-right, transparent always, hamburger menu |
| Hero | Centre column (352px) with video + pattern overlay |
| Our Concept | 至極の空間で〜 Japanese copy with reveal animation |
| Wedding Space | Light background, venue photos |
| Bridal Fair | Schedule list |
| Cuisine | Food section |
| Wedding Plan | Plan cards |
| Footer | Links, social icons, access info |

## Design Details

- **Colour palette** — `#0d0d0d` black, `#b79769` / `#9c8257` gold, `#d4c5b0` light
- **Hero column** — 352px wide centre strip with `video.mp4` playing behind `pattern-05.png` at `mix-blend-mode: multiply; opacity: 0.6`
- **Fonts** — Playfair Display (serif headings), Shippori Mincho B1 (Japanese), Noto Sans JP (body)
- **Scroll reveal** — `.reveal` class animates in via IntersectionObserver

## Notes

- `index.html` is the working file — all active development happens here
- The React `src/` version is a separate exploration, not in sync with `index.html`
- Pattern overlay works via `mix-blend-mode: multiply` — black shapes stay visible, white areas let the video show through
