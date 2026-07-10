# Mohan Shoe Co. & Garments — Website

A premium, responsive fashion retail website. Pure HTML5 + CSS3 + vanilla JS — no build step, no backend.

## Files
- `index.html` — all page markup, SEO meta tags, Open Graph/Twitter cards, JSON-LD LocalBusiness schema
- `style.css` — design tokens, layout, animations, responsive rules
- `script.js` — nav, dark mode, filters, quick view, testimonial slider, counters, accordion, form validation
- `assets/images/` — put a real `og-cover.jpg` here for social sharing previews (product photos currently load from Unsplash as placeholders)

## Deploy to GitHub Pages
1. Push this folder to a GitHub repository (files at the repo root, or in a `/docs` folder).
2. Repo Settings → Pages → set source branch (and `/docs` if used).
3. Your site goes live at `https://<username>.github.io/<repo>/`.

## Before going live — swap these placeholders
- Phone number `+91 98123 45678` (nav, floating buttons, store section, footer, JSON-LD)
- Google Maps embed src in the Store Information section (currently a generic search embed — replace with your exact Place ID for a pinned marker)
- `latitude`/`longitude` in the JSON-LD block
- Unsplash product/category/gallery images → your own photography
- Contact form and newsletter form currently confirm locally in-browser (no backend). Wire to Formspree, Getform, EmailJS, or your own endpoint to actually receive submissions.

## Notes
- Dark mode preference is remembered via `localStorage`.
- All animations respect `prefers-reduced-motion`.
- Signature visual motif: a thin gold "jaali lattice" hairline divider between sections and a corner-bracket frame on the hero, echoing Indian textile borders.
