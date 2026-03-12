# Layout Templates

These templates render markdown application outputs into ATS-safe HTML for PDF export.

## Files

| File | Purpose |
|---|---|
| `resume.html` | HTML template for resume documents |
| `cover-letter.html` | HTML template for cover letters |
| `styles.css` | Shared stylesheet used by both templates |

## How It Works

1. `scripts/render_html.js` reads a markdown file and the corresponding template
2. It converts the markdown to HTML using `marked`
3. It inlines `styles.css` into the template's `<style>` block
4. The result is a self-contained HTML file in the output directory
5. `scripts/export_pdf.js` opens the HTML in Playwright and prints to PDF

## Customizing Safely

### Fonts

The default font stack uses system fonts (no external downloads required):
- Body: `Georgia`, `Times New Roman`, serif
- Headings: `Helvetica Neue`, `Arial`, sans-serif

To change fonts, edit the `font-family` properties in `styles.css`. Stick to widely available system fonts — web fonts loaded via `@import` or `<link>` may not resolve during PDF export.

### Margins

Page margins are set in `scripts/export_pdf.js` (the Playwright PDF options), not in CSS. The defaults are:
- Top/Bottom: 0.6in
- Left/Right: 0.75in

To change them, edit the `margin` object in the `page.pdf()` call.

### Font Sizes

- Resume body: 11pt
- Cover letter body: 11.5pt
- Name (h1): 22pt
- Section headings (h2): 13pt

Adjust in `styles.css`. Keep body text between 10pt and 12pt for ATS readability.

### What to Avoid

- Multi-column layouts (CSS Grid, Flexbox for columns)
- Tables for layout purposes
- Icons, images, or embedded graphics
- Absolute or fixed positioning
- `@import` for external fonts
- Background colors behind text (some ATS strip backgrounds)

These can cause ATS parsers to misread or scramble content.
