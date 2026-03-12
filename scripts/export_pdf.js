import { existsSync } from 'fs';
import { resolve, join } from 'path';
import { chromium } from 'playwright';

// Parse --inDir argument
const inDirIdx = process.argv.indexOf('--inDir');
if (inDirIdx === -1 || !process.argv[inDirIdx + 1]) {
  console.error('Error: --inDir is required.');
  console.error('Usage: node scripts/export_pdf.js --inDir outputs/<company>-<role>-<date> [--pageSize letter|a4]');
  process.exit(1);
}

const inDir = resolve(process.argv[inDirIdx + 1]);

if (!existsSync(inDir)) {
  console.error(`Error: Directory not found: ${inDir}`);
  process.exit(1);
}

// Parse --pageSize argument (optional, default: letter)
const pageSizeIdx = process.argv.indexOf('--pageSize');
const pageSizeArg = pageSizeIdx !== -1 ? process.argv[pageSizeIdx + 1] : 'letter';
const pageSize = pageSizeArg === 'a4' ? 'A4' : 'Letter';

// Document types to process
const documents = [
  { type: 'resume', htmlFile: 'resume.html' },
  { type: 'cover-letter', htmlFile: 'cover-letter.html' },
];

let filesCreated = 0;
let browser;

try {
  browser = await chromium.launch();
  const context = await browser.newContext();

  for (const doc of documents) {
    const htmlPath = join(inDir, doc.htmlFile);

    if (!existsSync(htmlPath)) {
      console.warn(`Warning: ${doc.htmlFile} not found in ${inDir} — skipping.`);
      continue;
    }

    const page = await context.newPage();
    await page.goto(`file://${resolve(htmlPath)}`, { waitUntil: 'networkidle' });

    const pdfPath = join(inDir, `${doc.type}.pdf`);
    await page.pdf({
      path: pdfPath,
      format: pageSize,
      margin: {
        top: '0.6in',
        bottom: '0.6in',
        left: '0.75in',
        right: '0.75in',
      },
      printBackground: true,
      preferCSSPageSize: false,
    });

    await page.close();
    console.log(`Created: ${pdfPath}`);
    filesCreated++;
  }

  if (filesCreated === 0) {
    console.error('Error: No HTML files found to export.');
    process.exit(1);
  }

  console.log(`\nDone — ${filesCreated} PDF file(s) created.`);
} catch (err) {
  console.error(`Error during PDF export: ${err.message}`);
  process.exit(1);
} finally {
  if (browser) {
    await browser.close();
  }
}
