# Export PDF

Render markdown application outputs to HTML and export as PDF.

## Variables

target_dir: $ARGUMENTS (path to the output folder, e.g., `outputs/acme-pm-2026-01-15`)

---

## Instructions

### Phase 1: Identify Target Directory

1. If `$ARGUMENTS` is provided, use it as the target directory path.
2. If `$ARGUMENTS` is empty, list the directories in `outputs/` and ask the user which one to export.
3. Verify the directory exists and contains at least one of: `resume.md`, `cover-letter.md`.
4. If neither file exists, stop and inform the user.

### Phase 2: Check Layout Preferences

Read `context/layout-preferences.md` to determine the page size setting.
- If `Page Size` is set to `a4`, use `--pageSize a4`
- Otherwise default to `--pageSize letter`

### Phase 3: Render HTML

Run the HTML rendering script:

```
node scripts/render_html.js --inDir <target_dir>
```

Confirm the HTML files were created successfully.

### Phase 4: Export PDF

Run the PDF export script, passing the page size from Phase 2:

```
node scripts/export_pdf.js --inDir <target_dir> --pageSize <letter|a4>
```

Confirm the PDF files were created successfully.

### Phase 5: Report

After export completes:
1. List all generated files with full paths
2. Note any warnings or skipped files
3. Remind the user to review the PDFs before submitting

---

## Troubleshooting

- If `npm install` hasn't been run, run it first
- If Playwright browsers aren't installed, run `npx playwright install chromium`
- If the HTML doesn't look right, check `reference/layout/styles.css` and the templates in `reference/layout/`
- To change page margins or font sizes, see `reference/layout/README.md`
