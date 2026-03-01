# Authoring Guide (Practical)

## What you add next (highest ROI)
1) Expand `content/docs.json` with **real Document Cards**.
2) Add **Explainers** as pages in `content/pages.json` and tag them to hubs (you can extend the schema easily).
3) Keep language **neutral** and **non-glorifying**.

## Document Card rules
- Always include a provenance note.
- Separate:
  - what the document *says*,
  - what you *infer*.
- Add at least 1 reputable scholarly citation in `scholarship_notes` when possible.

## Publishing
This is a static site:
- Upload everything to GitHub.
- Enable GitHub Pages (deploy from main branch).
- Or drag-and-drop to Netlify / Cloudflare Pages.

## Custom domain
Point `thefuhrer.com` DNS to your host’s instructions.
