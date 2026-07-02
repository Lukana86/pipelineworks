# PipelineWorks

Marketing website for PipelineWorks — a lead pipeline agency (campaign → landing page → form → ActiveCampaign → nurturing → sales handoff).

Working name only; not yet a registered brand/domain.

## Structure

- `/en`, `/cs`, `/de` — language versions of the single-page site
- `/assets/css` — shared stylesheet
- `/assets/js` — shared script (mobile nav toggle)
- `index.html` — redirects to the visitor's language, defaults to English

## Running locally

No build step. Open `index.html` directly in a browser, or serve the folder locally:

```
# Windows (PowerShell), no Node/Python required
powershell -ExecutionPolicy Bypass -File serve.ps1

# or, if you have Node installed
npx serve .
```

Then visit `http://localhost:5500`.

## Editing content

Each language has its own `index.html` under `/en`, `/cs`, `/de` — edit the text directly in the HTML. Shared styling lives in `assets/css/style.css`.
