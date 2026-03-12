# Bullet Selection Rules

> **How the agent uses this file:** Provides the logic for selecting and ordering resume bullets once a role has been classified into a lane. Read during `/apply` after the Role Strategy Profile has been generated.
>
> **This is an engine file — the framework is generic, but bullet selection always references the user's actual bullets from `context/resume-bullet-bank.md` and the user's lane definitions from `context/target-roles.md`.**

---

## Core Principle

Every bullet selection decision starts with the Role Strategy Profile. The profile identifies the employer's top priorities — those priorities determine which bullets to lead with, which to include, and which to omit.

**The goal:** A hiring manager who reads only the first 3 bullets of your most recent role should immediately understand why you're a fit for this specific job.

---

## Selection Logic

### Step 1: Map JD signals to bullet categories

Look at the job description's top signals (from the Role Strategy Profile). For each signal, identify which category or categories in the bullet bank contain relevant proof.

Example mapping:
- JD signal: "cross-functional alignment" → look for bullets in Leadership, Stakeholder Management, or GTM categories
- JD signal: "discovery and requirements" → look for bullets in Product Discovery, Research, or Requirements categories
- JD signal: "data-driven decisions" → look for bullets in Analytics, Reporting, or Metrics categories

### Step 2: Front-load the match

Order bullets so that the strongest match to the JD's top signal appears first. Don't bury the most relevant proof at the bottom.

### Step 3: Apply bullet counts

- **Primary/most recent role:** 5-7 bullets (this role carries the most weight)
- **Secondary roles:** 3-4 bullets each
- **Earlier roles:** 1-2 bullets, or compress to a single descriptive line
- If a role has no bullets that match the JD's signals, consider whether to include it at all (breadth vs. relevance trade-off)

### Step 4: Prioritize metrics

When two bullets cover similar ground, prefer the one with a specific metric. If neither has a metric, use [TBD] as a placeholder.

### Step 5: Apply lane positioning

Each lane in `context/target-roles.md` has a "Positioning emphasis" — the competency or value proposition to lead with for that lane. The bullet selection should reinforce this emphasis.

- If the user has defined Lane A as "discovery-led PM roles," the first 2-3 bullets for the primary role should demonstrate discovery work.
- If the user has defined Lane B as "technical/platform PM roles," lead with system design, API work, or engineering partnership bullets.

---

## Prior Role Inclusion Decision Tree

1. **Primary/most recent role:** Always include. 5-7 bullets.
2. **Second most recent role:** Always include. 3-4 bullets. Focus on what's most relevant to this specific JD.
3. **Third role and beyond:** Include if the role adds proof the primary and secondary roles don't cover. 1-2 bullets or compress to a single line.
4. **Very early career:** Include only as a single-line "Earlier Career" entry if it adds meaningful breadth. Otherwise omit.
5. **Education:** Always include.

---

## Competency Order Logic

The Core Competencies section should be ordered so that the first item is the most relevant to this specific job. Derive the order from the JD's top signals.

Example:
- JD leads with "you'll own product discovery" → put discovery-related competency first
- JD leads with "you'll work closely with enterprise customers" → put customer-facing or commercial competency first

The competency pool lives in `reference/resume-template.md`. Select 6-8 items and reorder for this role.

---

## What to Avoid

- Bullets that describe a responsibility without an outcome ("Managed a team of 5 engineers")
- Bullets that duplicate each other in substance (pick the stronger one)
- Bullets from old or irrelevant roles that don't add anything the primary role already covers
- Leading with soft-skill bullets when hard-skill or outcome bullets are available
