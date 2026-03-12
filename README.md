# Job Application Engine

A Claude Code workspace that generates tailored, submission-ready job applications — resume, cover letter, fit analysis, and PDF export — from a job description and your professional context.

---

## The Problem This Solves

Most job seekers send the same resume to every role with minor edits, or spend hours manually rewriting materials for each application. Generic applications get generic results.

The Job Application Engine solves this by treating every application as a strategy problem: what does this employer actually need, how does your experience map to it, and what's the most compelling way to tell that story?

---

## How It Works

The engine runs on three layers:

**1. Your context** — built once through a guided setup wizard. Your career history, accomplishments, skills, positioning, and communication style — stored as structured files the agent reads on every application.

**2. Role analysis** — for each job, the agent reads the job description, extracts what the employer actually cares about (not just what they list), and classifies the role against your defined targets.

**3. Strategy layer** — a Role Strategy Profile is generated that maps the employer's priorities to your specific experience. Every output decision — which bullets, which order, which cover letter angle — flows from this profile.

```
Your context  +  Job description
      |                 |
      +--------+--------+
               |
       Role Strategy Profile
       (what they need × what you have)
               |
      +--------+--------+--------+
      |        |        |        |
  resume  cover    fit      revision
   .md   letter  analysis   notes
               |
           PDF export
```

Nothing generic is used directly. Everything is filtered through the strategy layer first.

---

## What You Get Per Application

Six files in `outputs/<company>-<role>-<date>/`:

| File | Contents |
|------|----------|
| `job.md` | Raw job description preserved for reference |
| `role-strategy.md` | The strategy profile — signals, employer priorities, bullet selection, cover letter angles |
| `resume.md` | Tailored resume with bullets and summary matched to this role |
| `cover-letter.md` | Written in your voice — specific, not templated |
| `fit-analysis.md` | Requirement-by-requirement mapping with an honest fit score |
| `revision-notes.md` | Gaps, missing proof, suggested bullet bank additions |

Plus `resume.pdf` and `cover-letter.pdf` on export.

---

## Getting Started

### Prerequisites

- [Claude Code](https://claude.ai/code) — Anthropic's CLI
- [Node.js](https://nodejs.org) v18+

### Setup

```bash
# Clone or copy this folder
git clone https://github.com/the-stevecast/job-application-engine.git my-job-search
cd my-job-search

# Install dependencies
npm install
npx playwright install chromium

# Open in Claude Code
claude
```

Then type `/setup` and follow the prompts. Claude will walk you through building your context in about 10-15 minutes. You only do this once.

### Your First Application

```
/apply Acme Corp — Product Manager — [paste the full job description]
```

### Export to PDF

```
/export-pdf outputs/acme-pm-2026-01-15
```

---

## Commands

| Command | What it does |
|---------|-------------|
| `/setup [section]` | Build or update your context through Q&A |
| `/prime` | Initialize a session — confirms context is loaded |
| `/apply [job description]` | Generate a full application package |
| `/interpret-role [job description]` | Role analysis only, no full package |
| `/export-pdf [output-dir]` | Render and export PDFs |
| `/create-plan [request]` | Plan workspace changes |
| `/implement [plan-path]` | Execute a plan |

`/setup` supports targeted section updates so you never have to redo everything:

```
/setup voice      # update communication style
/setup bullets    # update career history and accomplishments
/setup targeting  # update role lanes and search focus
```

---

## Context System

Your context is stored in structured files in `context/`. The agent reads these on every command — they are the foundation of everything the engine produces.

| File | What it holds |
|------|--------------|
| `user-profile.md` | Identity, career summary, working style |
| `positioning-narrative.md` | Core positioning, differentiators, career reframe |
| `resume-bullet-bank.md` | Accomplishment statements by role and category |
| `metrics-and-proof-points.md` | Quantified achievements |
| `target-roles.md` | Your defined role lanes, target titles, keywords |
| `writing-voice.md` | Tone, style, what to avoid |
| `systems-experience.md` | Tools, platforms, technical background |

Context files are plain markdown — readable, editable, version-controllable. They improve over time as you add metrics and new accomplishments after each application.

---

## Role Targeting: The Lane System

During setup, you define 2-3 "lanes" — groupings of similar target roles with their own positioning emphasis. For example:

- **Lane: Core PM** — product manager roles at growth-stage B2B companies
- **Lane: Platform PM** — technical/API/infrastructure PM roles

When you run `/apply`, the agent classifies the incoming JD into one of your lanes, then adjusts competency ordering, bullet selection, and cover letter angle accordingly. The same experience, positioned differently for different role types.

---

## PDF Export

The export pipeline converts markdown to styled, ATS-safe HTML, then to PDF via Playwright. No external services, no upload required — everything runs locally.

- Page size: US Letter or A4 (configured during setup)
- Layout: clean serif/sans-serif system font stack, ATS-safe single-column
- Margins and font sizes are configurable in `reference/layout/styles.css` and `scripts/export_pdf.js`

---

## Design Principles

**Strategy before generation.** Every output is preceded by an analysis step that determines what to say and how to say it. The resume and cover letter are outputs of a strategy, not templates filled in.

**Your voice, not a template.** The cover letter is written from your communication style preferences, not a generic professional tone. Setup captures how you actually write and talk about your work.

**Honest gaps, not cheerleading.** The fit analysis scores each requirement honestly and flags what's missing. The revision notes tell you what to do about it.

**Context compounds.** Every application makes your context better — revision notes suggest bullet bank additions, missing metrics get flagged, positioning gaps get identified. The engine gets more effective the more you use it.

---

## Requirements

- Claude Code (Anthropic CLI)
- Node.js v18+
- Playwright (installs via npm)

No external APIs, no subscriptions, no data sent to third parties beyond Claude's standard API usage.

---

## License

MIT
