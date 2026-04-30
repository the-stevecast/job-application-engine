# SYSTEM.md — Job Application Engine

This is the canonical source of truth for this workspace. Read this file at the start of every session.

---

## What This Is

This is a **Job Application Engine** — a structured AI workspace that helps job seekers generate tailored, high-quality application packages for specific roles. It combines a personal context layer (who you are, what you've done, how you communicate) with a role analysis layer (what the job actually requires) to produce a strategy-driven resume, cover letter, fit analysis, and revision notes for every application.

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

## The Workspace Agent's Role

The AI assistant operates as an execution partner across the full application workflow:

- **Setup:** Conducts Q&A and builds all context files from your answers
- **Role analysis:** Reads a job description, extracts employer priorities, classifies the role against your target lanes, and produces a strategy profile
- **Generation:** Uses the strategy profile to drive every decision — which bullets, which competency order, which cover letter angle
- **Export:** Renders markdown to styled HTML and exports to PDF

The workspace agent should always read the relevant context files before generating outputs, and should never produce generic content that ignores the strategy profile.

---

## Workspace Structure

```
.
├── SYSTEM.md                    # This file — canonical workspace reference
├── CLAUDE.md                    # Pointer to SYSTEM.md (platform convention)
├── USER-GUIDE.md                # Human-readable getting-started guide
├── package.json                 # Node.js dependencies
├── .claude/
│   └── commands/                # Slash commands
│       ├── setup.md             # /setup — first-time setup wizard (run this first)
│       ├── load.md              # /load — session initialization and context reset
│       ├── apply.md             # /apply — generate full application package
│       ├── interpret-role.md    # /interpret-role — role analysis only
│       ├── export-pdf.md        # /export-pdf — render and export PDFs
│       ├── gap-extract.md       # /gap-extract — generate helper prompt for gap conversations
│       ├── build.md             # /build — plan workspace changes
│       └── execute.md           # /execute — execute a plan
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
│   ├── gap-extract-starter-prompt.md # Annotated starter prompt for gap conversations
│   └── layout/                  # HTML/CSS templates for PDF export
│       ├── resume.html
│       ├── cover-letter.html
│       ├── styles.css
│       └── README.md
├── scripts/
│   ├── render_html.js           # Markdown → HTML
│   └── export_pdf.js            # HTML → PDF via Playwright
├── plans/                       # Workspace change plans
└── outputs/                     # Application packages (one folder per application)
```

**Key directories:**

| Directory | Purpose |
|-----------|---------|
| `context/` | Your personal and professional context. Built by `/setup`. Read by every command. |
| `outputs/` | One subdirectory per application: `outputs/<company>-<role>-<date>/` |
| `reference/` | Templates and layout files. Structural — rarely edited after setup. |
| `scripts/` | PDF export pipeline. Invoked by `/export-pdf`. |

---

## Commands

### /setup [section]

**Purpose:** Build or update your context files through conversational Q&A.

Run this first, before anything else. The assistant will ask you questions about your background, target roles, career history, communication style, and layout preferences — then write all your context files from the answers.

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

### /load

**Purpose:** Initialize or reset session context.

Run at the start of every session, and between applications to prevent context from one role from bleeding into the next. The assistant reads your context files and confirms it understands who you are, what you're targeting, and what commands are available. Does not modify any files.

### /apply [job posting]

**Purpose:** Generate a complete tailored application package.

Paste a job description (with company name and role title). The assistant will analyze the role, produce a strategy profile, then generate a full package in `outputs/<company>-<role>-<date>/`:
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

### /gap-extract [output-dir]

**Purpose:** Generate a helper prompt for extracting undocumented experience from the user.

Run after `/apply` when `revision-notes.md` or `fit-analysis.md` identifies gaps — experience the user likely has but hasn't documented yet. Reads the output directory, compiles the gaps, and produces a complete ready-to-paste prompt for a separate AI chat session. That conversation draws out the experience in natural language and returns structured content to add back to the context files.

If no directory is specified, uses the most recent output folder. Saves the generated prompt to `gap-extract-prompt.md` in the output directory.

The return flow: after the helper conversation, bring the structured output back here and say "add these to my context files." Then re-run `/apply` on the same job to regenerate with the stronger evidence.

### /build [request]

**Purpose:** Plan workspace changes before implementing them.

Use before adding commands, modifying workflows, or making structural changes. Produces a plan document in `plans/`. Does not execute any changes.

### /execute [plan-path]

**Purpose:** Execute a plan created by `/build`.

---

## Session Workflow

1. **First time:** Run `/setup` to build your context
2. **Each session:** Run `/load` to initialize context
3. **Between applications:** Run `/load` again to reset context and start clean
4. **Each application:** Run `/apply [job description]`
5. **Export:** Run `/export-pdf [output-dir]`
6. **Update context:** Run `/setup [section]` anytime your experience or targeting changes

---

## Critical: Maintain This File

Whenever the workspace structure changes, update the relevant sections above. Context file names, command names, and directory structure documented here must always reflect reality.

---

## For New Users

If you just cloned this template, start here:

1. Run `npm install` in this directory
2. Open the folder in your AI workspace
3. Type `/setup` and follow the prompts
4. When setup is complete, try `/apply` with your first job description

See `USER-GUIDE.md` for more detail.
