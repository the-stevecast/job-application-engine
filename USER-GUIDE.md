# Job Application Engine — User Guide

A Claude Code workspace that generates tailored, submission-ready job applications from a job description and your personal context.

---

## What This Does

Paste a job description and get back a complete application package:

- **resume.md** — tailored resume with bullets and summary matched to the role
- **cover-letter.md** — written in your voice, not a template
- **role-strategy.md** — the strategy profile that drove every decision
- **fit-analysis.md** — honest requirement-by-requirement mapping with a fit score
- **revision-notes.md** — gaps, questions, and suggestions to strengthen over time

Export to PDF with one command when you're ready to submit.

---

## Prerequisites

Before you start, you need:

1. **Claude Code** — the Anthropic CLI tool. Install at [claude.ai/code](https://claude.ai/code)
2. **Node.js** (v18 or later) — [nodejs.org](https://nodejs.org)
3. That's it. Playwright (for PDF export) installs automatically with npm.

---

## Getting Started

### 1. Get the template

Copy this folder to a location on your computer:

```bash
cp -r job-application-engine/ ~/my-job-search/
cd ~/my-job-search/
```

Or clone it if it's hosted as a GitHub repository:

```bash
git clone https://github.com/[username]/job-application-engine.git my-job-search
cd my-job-search
```

### 2. Install dependencies

```bash
npm install
npx playwright install chromium
```

### 3. Open in Claude Code

```bash
claude
```

### 4. Run setup

Type `/setup` and follow the prompts. Claude will ask you questions about your background, target roles, career history, communication style, and PDF preferences — then write all your context files from the answers.

Setup takes about 10-15 minutes and only needs to be done once.

---

## Your First Application

Once setup is complete, find a job you want to apply to and run:

```
/apply [Company Name] — [Role Title] — [paste the full job description]
```

Claude will:
1. Analyze the job description and classify the role against your targets
2. Generate a strategy profile mapping the JD to your experience
3. Produce all 6 application files in `outputs/[company]-[role]-[date]/`

Review the outputs, make any edits you want, then export.

---

## Exporting to PDF

```
/export-pdf outputs/[company]-[role]-[date]
```

This produces `resume.pdf` and `cover-letter.pdf` in the same directory. Page size is set by your layout preference (configured during setup or via `/setup layout`).

Always review the PDFs before submitting — check formatting and pagination.

---

## Maintaining Your Context

Your context files in `context/` are the foundation of every application. Keep them current:

| What changed | Command |
|-------------|---------|
| New job or accomplishment | `/setup bullets` |
| Shifting your target roles | `/setup targeting` |
| Cover letter tone isn't right | `/setup voice` |
| Changed page size preference | `/setup layout` |
| Updating your career summary | `/setup profile` |

The `revision-notes.md` file in each application package will also suggest specific bullets and metrics to add to your bank over time.

---

## Commands Reference

| Command | What it does |
|---------|-------------|
| `/setup [section]` | Build or update your context files through Q&A |
| `/prime` | Initialize a session — confirms context is loaded |
| `/apply [job description]` | Generate a full application package |
| `/interpret-role [job description]` | Role analysis only (no full package) |
| `/export-pdf [output-dir]` | Render and export PDFs from an output directory |
| `/create-plan [request]` | Plan workspace changes before making them |
| `/implement [plan-path]` | Execute a plan |

---

## Customizing the Layout

The default layout uses a clean serif/sans-serif system font stack that renders well in all PDF viewers and is ATS-safe.

To customize:

- **Font family and sizes:** Edit `reference/layout/styles.css`
- **Page margins:** Edit the `margin` object in `scripts/export_pdf.js`
- **Page size:** Run `/setup layout` or edit `context/layout-preferences.md` directly

See `reference/layout/README.md` for guidance on what's safe to change and what to avoid (multi-column layouts, web fonts, and images can break ATS parsing).

---

## How It Works (for the curious)

Every application is driven by a **Role Strategy Profile** — a middle layer generated from the job description and your context that answers: what does this employer actually want, and how does your experience map to it?

The profile determines:
- Which competencies to lead with
- Which resume bullets to select and in what order
- What angle to take in each cover letter paragraph
- What risks and gaps exist and how to address them

Nothing generic is ever used directly. Every output is filtered through this strategy layer first.

Your context files are the other half of the equation:
- `context/resume-bullet-bank.md` — the pool of accomplishment statements the agent selects from
- `context/writing-voice.md` — the tone and style rules that govern the cover letter
- `context/target-roles.md` — the lane definitions that classify each incoming JD

Better context = better applications. The more specific and well-populated your context files are, the more precisely the engine can tailor each package.

---

## Troubleshooting

**PDF export fails:**
- Run `npx playwright install chromium` to ensure the browser is installed
- Check that `npm install` has been run

**Output feels generic:**
- Review your `context/resume-bullet-bank.md` — sparse bullets produce sparse output
- Add more specific accomplishments with metrics
- Check `context/writing-voice.md` — if voice preferences aren't set, output defaults to neutral

**Cover letter tone is off:**
- Run `/setup voice` to update your communication style preferences

**Role wasn't classified correctly:**
- Review and edit `role-strategy.md` in the output directory before running the full `/apply`, or re-run with more context about the role
