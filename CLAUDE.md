# CLAUDE.md — Job Application Engine

This file provides guidance to Claude Code when working with code in this repository.

---

## What This Is

This is a **Job Application Engine** — a Claude Code workspace that helps job seekers generate tailored, high-quality application packages for specific roles. It combines a personal context layer (who you are, what you've done, how you communicate) with a role analysis layer (what the job actually requires) to produce a strategy-driven resume, cover letter, fit analysis, and revision notes for every application.

**The engine is field-agnostic.** It works for any professional in any industry. The output quality depends entirely on the quality of your context files — which the `/setup` command builds for you.

---

## How It Works

```
Your context files     +     Job description
(who you are)                (what they need)
        |                           |
        +----------+----------------+
                   |
             Role Strategy Profile
          (middle layer — maps JD signals
           to your experience and story)
                   |
        +----------+----------------+
        |           |               |
    resume.md  cover-letter.md  fit-analysis.md
```

Every application package is driven by a Role Strategy Profile generated from the job description and your context. Nothing generic is ever used directly — everything is filtered through that strategy layer first.

---

## The Agent's Role

Claude operates as an execution partner across the full application workflow:

- **Setup:** Conducts Q&A and builds all context files from your answers
- **Role analysis:** Reads a job description, extracts employer priorities, classifies the role against your target lanes, and produces a strategy profile
- **Generation:** Uses the strategy profile to drive every decision — which bullets, which competency order, which cover letter angle
- **Export:** Renders markdown to styled HTML and exports to PDF

Claude should always read the relevant context files before generating outputs, and should never produce generic content that ignores the strategy profile.

---

## Workspace Structure

```
.
├── CLAUDE.md                    # This file — always loaded
├── USER-GUIDE.md                # Human-readable getting-started guide
├── package.json                 # Node.js dependencies
├── .claude/
│   └── commands/                # Slash commands
│       ├── setup.md             # /setup — first-time setup wizard (run this first)
│       ├── prime.md             # /prime — session initialization
│       ├── apply.md             # /apply — generate full application package
│       ├── interpret-role.md    # /interpret-role — role analysis only
│       ├── export-pdf.md        # /export-pdf — render and export PDFs
│       ├── create-plan.md       # /create-plan — plan workspace changes
│       └── implement.md         # /implement — execute a plan
├── context/                     # Your personal context (built by /setup)
│   ├── README.md                # What each file is for
│   ├── user-profile.md          # Who you are
│   ├── positioning-narrative.md # How you position yourself
│   ├── resume-bullet-bank.md    # Your accomplishment statements
│   ├── metrics-and-proof-points.md # Quantified evidence
│   ├── target-roles.md          # Your role lanes and search keywords
│   ├── role-classifier.md       # How to classify incoming job descriptions
│   ├── bullet-selection-rules.md # How to pick bullets for each lane
│   ├── constraints-and-boundaries.md # Deal-breakers and fit criteria
│   ├── writing-voice.md         # Your communication style
│   ├── systems-experience.md    # Tools and technical background
│   ├── output-rules.md          # Resume and cover letter format rules
│   └── layout-preferences.md   # PDF page size and layout settings
├── reference/
│   ├── resume-template.md       # Resume structure template
│   ├── cover-letter-template.md # Cover letter structure and rules
│   └── layout/                  # HTML/CSS templates for PDF export
│       ├── resume.html
│       ├── cover-letter.html
│       ├── styles.css
│       └── README.md
├── scripts/
│   ├── render_html.js           # Markdown → HTML
│   ├── export_pdf.js            # HTML → PDF via Playwright
│   └── export_all.sh            # Run both in sequence
├── plans/                       # Implementation plans
└── outputs/                     # Application packages (one folder per application)
```

**Key directories:**

| Directory | Purpose |
|-----------|---------|
| `context/` | Your personal and professional context. Built by `/setup`. Read by every command. |
| `outputs/` | One subdirectory per application: `outputs/<company>-<role>-<date>/` |
| `reference/` | Templates and layout files. Structural — rarely edited after setup. |
| `scripts/` | PDF export pipeline. Run via npm scripts or slash commands. |

---

## Commands

### /setup [section]

**Purpose:** Build or update your context files through conversational Q&A.

Run this first, before anything else. Claude will ask you questions about your background, target roles, career history, communication style, and layout preferences — then write all your context files from the answers.

Run with no argument for full setup (or re-setup). Run with a section name to update just that piece:

| Argument | What it updates |
|----------|----------------|
| `/setup` | Full setup or re-setup |
| `/setup profile` | Who you are, career summary |
| `/setup targeting` | Role lanes, target titles, constraints |
| `/setup bullets` | Resume bullet bank, metrics |
| `/setup skills` | Tools, platforms, technical background |
| `/setup voice` | Communication style and tone |
| `/setup layout` | PDF page size and layout preferences |

### /prime

**Purpose:** Initialize a session with full context awareness.

Run at the start of every new Claude Code session. Claude reads your context files and confirms it understands who you are, what you're targeting, and what commands are available.

### /apply [job posting]

**Purpose:** Generate a complete tailored application package.

Paste a job description (with company name and role title). Claude will analyze the role, produce a strategy profile, then generate a full package in `outputs/<company>-<role>-<date>/`:
- `job.md` — raw job description preserved
- `role-strategy.md` — strategy profile driving all generation decisions
- `resume.md` — tailored resume
- `cover-letter.md` — written in your voice
- `fit-analysis.md` — honest requirement-by-requirement mapping
- `revision-notes.md` — gaps, questions, and suggested improvements

Example: `/apply Acme Corp — Product Manager — [paste full JD]`

### /interpret-role [job posting]

**Purpose:** Analyze a job description and produce a Role Strategy Profile only.

Use for quick role analysis without generating the full package. Produces `job.md` and `role-strategy.md`. Useful for evaluating whether to apply before committing to a full package.

### /export-pdf [output-dir]

**Purpose:** Render markdown outputs to HTML and export as PDF.

Takes a directory path (e.g., `outputs/acme-pm-2026-01-15`) and exports `resume.pdf` and `cover-letter.pdf`. Page size is read from `context/layout-preferences.md`.

Example: `/export-pdf outputs/acme-pm-2026-01-15`

### /create-plan [request]

**Purpose:** Plan workspace changes before implementing them.

Use before adding commands, modifying workflows, or making structural changes. Produces a plan document in `plans/`.

### /implement [plan-path]

**Purpose:** Execute a plan created by `/create-plan`.

---

## Session Workflow

1. **First time:** Run `/setup` to build your context
2. **Each session:** Run `/prime` to load context
3. **Each application:** Run `/apply [job description]`
4. **Export:** Run `/export-pdf [output-dir]`
5. **Update context:** Run `/setup [section]` anytime your experience or targeting changes

---

## Critical: Maintain This File

Whenever the workspace structure changes, update the relevant sections above. Context file names, command names, and directory structure documented here must always reflect reality — this file is loaded at the start of every session.

---

## For New Users

If you just cloned this template, start here:

1. Run `npm install` in this directory
2. Open the folder in Claude Code
3. Type `/setup` and follow the prompts
4. When setup is complete, try `/apply` with your first job description

See `USER-GUIDE.md` for more detail.
