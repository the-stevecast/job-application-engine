import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

// Parse --inDir argument
const inDirIdx = process.argv.indexOf('--inDir');
if (inDirIdx === -1 || !process.argv[inDirIdx + 1]) {
  console.error('Error: --inDir is required.');
  console.error('Usage: node scripts/render_html.js --inDir outputs/<company>-<role>-<date>');
  process.exit(1);
}

const inDir = resolve(process.argv[inDirIdx + 1]);

if (!existsSync(inDir)) {
  console.error(`Error: Directory not found: ${inDir}`);
  process.exit(1);
}

// Configure marked for GFM
marked.setOptions({ gfm: true });

// Load shared styles
const stylesPath = join(projectRoot, 'reference', 'layout', 'styles.css');
if (!existsSync(stylesPath)) {
  console.error(`Error: Stylesheet not found: ${stylesPath}`);
  process.exit(1);
}
const styles = readFileSync(stylesPath, 'utf-8');

// Document types to process
const documents = [
  { type: 'resume', mdFile: 'resume.md', template: 'resume.html' },
  { type: 'cover-letter', mdFile: 'cover-letter.md', template: 'cover-letter.html' },
];

let filesCreated = 0;

for (const doc of documents) {
  const mdPath = join(inDir, doc.mdFile);

  if (!existsSync(mdPath)) {
    console.warn(`Warning: ${doc.mdFile} not found in ${inDir} — skipping.`);
    continue;
  }

  // Read markdown
  const markdown = readFileSync(mdPath, 'utf-8');

  // Extract title from first heading
  const titleMatch = markdown.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : doc.type;

  // Convert markdown to HTML
  const contentHtml = marked.parse(markdown);

  // Read template
  const templatePath = join(projectRoot, 'reference', 'layout', doc.template);
  if (!existsSync(templatePath)) {
    console.error(`Error: Template not found: ${templatePath}`);
    process.exit(1);
  }
  let template = readFileSync(templatePath, 'utf-8');

  // Replace placeholders
  template = template.replace('{{STYLES}}', styles);
  template = template.replace('{{CONTENT}}', contentHtml);
  template = template.replace('{{TITLE}}', title);

  // Write output
  const outPath = join(inDir, `${doc.type}.html`);
  writeFileSync(outPath, template, 'utf-8');
  console.log(`Created: ${outPath}`);
  filesCreated++;
}

if (filesCreated === 0) {
  console.error('Error: No markdown files found to render.');
  process.exit(1);
}

console.log(`\nDone — ${filesCreated} HTML file(s) created.`);
