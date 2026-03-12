# Layout Preferences

> **How the agent uses this file:** Read by `/export-pdf` to determine the `--pageSize` argument passed to the PDF export script. Set during `/setup` or updated with `/setup layout`.

---

## Page Size

letter

*(Options: `letter` for US Letter / `a4` for A4. Default: `letter`.)*

---

## Notes

Advanced layout customization (fonts, font sizes, colors, spacing, margins) requires editing files directly:

- **Font family and sizes:** Edit `reference/layout/styles.css`
- **Page margins:** Edit the `margin` object in `scripts/export_pdf.js`
- **Resume vs. cover letter layout differences:** Each has its own template in `reference/layout/`

See `reference/layout/README.md` for guidance on what's safe to change and what to avoid.
