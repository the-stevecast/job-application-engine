# Context Files — Reference

These files are the foundation of the Job Application Engine. The agent reads them to understand who you are before generating any output. Better context = better applications.

All files are built by `/setup`. You can update individual sections anytime by running `/setup [section]`.

---

## File Index

| File | What it contains | When the agent reads it |
|------|-----------------|------------------------|
| `user-profile.md` | Your identity, career summary, working style, goals | Every command |
| `positioning-narrative.md` | How you frame your professional identity — core positioning, differentiators, career reframe | `/apply`, `/interpret-role` |
| `resume-bullet-bank.md` | Your accomplishment statements formatted for resume use | `/apply` |
| `metrics-and-proof-points.md` | Quantified achievements — numbers, percentages, revenue, headcount | `/apply` |
| `target-roles.md` | Your defined role lanes, target titles, and search keywords | `/apply`, `/interpret-role`, `/prime` |
| `role-classifier.md` | Engine logic — how to classify a job description and produce a strategy profile | `/apply`, `/interpret-role` |
| `bullet-selection-rules.md` | Engine logic — how to select and order bullets for each lane type | `/apply`, `/interpret-role` |
| `constraints-and-boundaries.md` | Deal-breakers, avoid list, hard constraints | `/apply`, `/interpret-role` |
| `writing-voice.md` | Your tone, style preferences, and what to avoid | `/apply` (cover letter) |
| `systems-experience.md` | Tools, platforms, and technical background | `/apply` |
| `output-rules.md` | Resume and cover letter formatting rules | `/apply` |
| `layout-preferences.md` | PDF page size and layout settings | `/export-pdf` |

---

## Keeping Context Current

The engine is only as good as your context. After completing setup:

- **Add metrics** to `metrics-and-proof-points.md` as you remember them — even rough numbers improve output quality
- **Add new bullets** to `resume-bullet-bank.md` after completing projects or new work
- **Update targeting** with `/setup targeting` if you shift your job search focus
- **Refine your voice** with `/setup voice` if cover letter tone isn't landing right

The `revision-notes.md` file generated with each application will flag missing proof and suggest bullet bank additions.
