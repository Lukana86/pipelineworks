# PipelineWorks

Marketing website for **PipelineWorks** — full-funnel lead pipelines for **industrial & technical B2B** companies (manufacturers, engineering, technical products).

Static site: HTML + CSS + vanilla JS. No build step, no framework. Hosted on GitHub Pages.

> Working name only; not yet a registered brand. The operator is anonymous for now (no name/photo/employer anywhere).

## Structure

- `/en`, `/cs`, `/de` — language versions of the single-page site (EN is the master)
- `/en/legal.html`, `/cs/pravni-udaje.html`, `/de/impressum.html` — legal / imprint pages
- `/assets/css/style.css` — shared stylesheet (industrial identity)
- `/assets/js/main.js` — shared script (nav, schematic, FAQ, form)
- `/assets/img/og.png` — social share image
- `index.html` — redirects to the visitor's language, defaults to English

## Running locally

No build step. Serve the folder:

```
# Windows (PowerShell), no Node/Python required
powershell -ExecutionPolicy Bypass -File serve.ps1

# or, if you have Node installed
npx serve .
```

Then visit `http://localhost:5500`.

## Things to configure before going live

All placeholders are single constants / clearly marked `TODO`:

1. **Cal.com booking link** — edit `CAL_URL` at the top of `assets/js/main.js`.
   All "Book a call" buttons and the calendar link use it.
2. **Formspree endpoint** — edit `FORMSPREE_ENDPOINT` at the top of `assets/js/main.js`
   (replace `FORM_ID` with your real Formspree form id). The lead form posts here; no backend needed.
   The hidden `interest` field is set automatically (audit / general) by which button opened the form.
3. **Legal pages** — fill the `[DOPLNIT]` blocks in the three legal pages (business name + IČO, address, VAT ID).
   The DE `impressum.html` is required for the DACH audience.
4. **Custom domain (`pipelineworks.io`)** — when DNS is ready:
   - rename `CNAME.example` to `CNAME` (GitHub Pages then serves from the custom domain),
   - point the domain's DNS at GitHub Pages (A/AAAA records or a `CNAME` to `lukana86.github.io`),
   - in the repo: Settings → Pages → Custom domain → `pipelineworks.io` → enable "Enforce HTTPS".
   Do **not** add the `CNAME` file before DNS is configured, or the current `github.io` site will break.
   All internal links are relative, so the site works on both `github.io` and the custom domain.
5. **Analytics** — uncomment the Plausible snippet in each page `<head>` after the domain switch.
6. **SEO meta** — canonical/hreflang/OG URLs point to `https://pipelineworks.io/…`; they activate with the domain.

## Editing content

Each language has its own `index.html`. Edit the text directly in the HTML.
Copy is kept consistent across the three languages — change all three when you change one.
