# Ismail's stories

Personal portfolio with a hacker-terminal theme. Plain HTML, CSS and JavaScript — no build step.

## Files

- `index.html` — pages (Home, Projects, About, Uses, Contact)
- `style.css` — layout, themes, responsive nav
- `script.js` — routing, theme toggle, typing animation

## Local preview

Open `index.html` in a browser, or serve the folder:

```bash
npx --yes serve .
```

## Deploy to GitHub Pages

1. Create a GitHub repository (for example `ismail-hafiane.github.io` or `portfolio`).
2. Push these files to the `main` branch (keep them at the repo root).
3. On GitHub: **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
5. Branch: `main`, folder: `/ (root)`. Save.
6. After a minute, the site is at `https://<username>.github.io/<repo>/` (or `https://<username>.github.io/` if the repo is named `<username>.github.io`).

Hash links (`#about`, `#projects`, …) work on Pages without extra configuration.
