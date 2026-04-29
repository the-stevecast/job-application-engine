# Setup

Build or update your context files through conversational Q&A.

## Variables

section: $ARGUMENTS (optional — profile, targeting, bullets, skills, voice, layout. If empty, runs full setup.)

---

## Instructions

### Phase 0: Environment Check (full setup only — skip if a section argument is provided)

Before doing anything else, verify the environment is ready to run the export pipeline. Do these checks in order.

**Step 1 — Check Node.js**

Run `node --version`. If the command fails or Node.js is not found, stop immediately and tell the user:

"Node.js is required and doesn't appear to be installed. Please download and install it from https://nodejs.org/en/download — choose the LTS version. Installation takes 2-3 minutes. Once it's done, restart Claude Code and run `/setup` again."

Do not proceed until Node.js is confirmed installed.

**Step 2 — Install npm dependencies**

Check whether `node_modules/` exists in the project root. If it does not:

Ask: "I need to install a few dependencies before we get started. Mind if I do that now? It only takes a few seconds."

On approval, run `npm install`. Confirm it succeeds before continuing.

**Step 3 — Install Playwright browser**

Check whether Playwright's Chromium browser is already installed by running `npx playwright install chromium --dry-run 2>&1`. If the output indicates it needs to be downloaded:

Ask: "I also need to download a browser for PDF export — it's a one-time ~180MB download and takes 1-3 minutes depending on your connection. OK to proceed?"

On approval, run `npx playwright install chromium` and let the user know it's running. Once complete, confirm it succeeded.

**Step 4 — Proceed**

Once all three checks pass, continue to Determine Mode below.

---

### Phase 0b: Determine Mode

1. Check whether `$ARGUMENTS` contains a section name.
2. If a section argument is provided (e.g., `profile`, `targeting`, `bullets`, `skills`, `voice`, `layout`), jump directly to the matching phase and run only that section. Skip to the Phase 9 file-writing step for that section only when done.
3. If no argument is provided:
   - Check whether `context/user-profile.md` already contains non-placeholder content (i.e., setup has been run before).
   - If context exists: ask the user "It looks like you've already completed setup. Would you like to run the full setup again from scratch, or update a specific section? (full / profile / targeting / bullets / skills / voice / layout)"
   - If no context exists: proceed with full setup from Phase 1.

**Section argument routing:**

| Argument | Jump to | Files updated |
|----------|---------|---------------|
| `profile` | Phase 2 + 3 | `context/user-profile.md`, `context/positioning-narrative.md`, `reference/resume-template.md` header |
| `targeting` | Phase 4 | `context/target-roles.md`, `context/constraints-and-boundaries.md` |
| `bullets` | Phase 5 | `context/resume-bullet-bank.md`, `context/metrics-and-proof-points.md` |
| `skills` | Phase 6 | `context/systems-experience.md` |
| `voice` | Phase 7 | `context/writing-voice.md` |
| `layout` | Phase 8 | `context/layout-preferences.md` |

---

### Phase 1: Introduction (full setup only)

Tell the user:

"Welcome to the Job Application Engine. Before you can generate tailored applications, I need to build a picture of who you are — your background, target roles, communication style, and preferences.

Here's what we'll cover:
1. Your identity and contact info
2. Career summary and what you're great at
3. Role targeting — what kinds of jobs you're going for
4. Career history — your roles and accomplishments (I'll help you format these into resume bullets)
5. Skills, tools, and platforms
6. Your writing voice and style preferences
7. PDF layout preferences

This takes about 10-15 minutes. I'll write all your context files as we go. You can update any section later by running `/setup [section-name]`.

Ready to start?"

Wait for confirmation before proceeding.

---

### Phase 2: Identity & Contact

Ask these questions one at a time. Wait for each answer before asking the next.

1. "What's your full name?"
2. "Where are you located? (City and state — this will appear on your resume header)"
3. "What's your professional email address?"
4. "What's your phone number?"
5. "What's your LinkedIn URL? (e.g., linkedin.com/in/yourname)"

Collect all five answers before moving on. Confirm: "Got it — I'll use [name], [location], [email], [phone], [linkedin]. Does that look right?"

---

### Phase 3: Career Summary

Ask these questions conversationally. You're building a picture of their professional identity.

1. "In one or two sentences, how would you describe what you do professionally?"
2. "What are you best known for? If a past colleague or client described your strongest skill, what would they say?"
3. "How many years of total professional experience do you have?"
4. "What field or industry are you primarily in?"

After collecting answers, synthesize and reflect back: "So you're a [X-year] [field] professional known for [key strength]. Is that a fair summary?"

---

### Phase 4: Role Targeting

1. "What kinds of roles are you targeting in your job search? Give me 2-3 categories or example titles."

For each category the user names, ask:
- "What's the core value you'd bring to a [role type] role — what problem do you solve for them?"

Then:
2. "Are there any roles, industries, or work environments you want to avoid?"
3. "Any hard constraints — things like travel requirements, company size, remote vs. on-site, or industries you won't consider?"

Organize their answers into 2-3 named "lanes" — groupings of similar target roles. Give each lane a short label based on what they described.

Confirm: "I'm going to organize your targeting into [N] lanes: [Lane 1: description], [Lane 2: description]. Does that capture it?"

---

### Phase 5: Career History

This is the most important phase. Take your time here.

1. "Let's walk through your career history. Starting with your most recent role: what was your title, company, and approximate dates?"

For each role:
2. "What were 3-5 key things you accomplished or owned in this role? Don't worry about formatting — just tell me what you did."

After the user describes each role, generate 3-5 formatted bullet points using this structure:
**Ownership verb + System/Process + Impact**

Example transformation:
- User says: "I managed our CRM and made sure the sales team had accurate data"
- You write: "Administered and maintained CRM data integrity for a 40-person sales team, establishing naming conventions and cleanup processes that reduced duplicate records by [TBD]%"

Show the drafted bullets to the user and say: "Here are the bullets I've drafted for [role]. Do any of these need to be corrected, expanded, or removed?"

3. After all roles are covered, ask: "Are there any metrics or numbers from any of these roles you remember? Things like revenue numbers, percentage improvements, team sizes, timeframes, or dollar amounts. Even rough estimates help."

Mark any unquantified bullets with [TBD] as placeholders.

Repeat for all roles, most recent to oldest.

---

### Phase 6: Skills & Systems

1. "What tools, platforms, or technologies do you use regularly in your work?"
2. "What are your signature technical or domain skills — the things you'd be hired for, not just familiar with?"
3. "Is there anything you're especially known for that might not show up in a job title? Any specialized knowledge, methods, or areas of expertise?"

---

### Phase 7: Writing Voice & Style

1. "How would you describe your communication style? For example: direct and concise, warm and conversational, formal, analytical, enthusiastic — or something else?"
2. "Is there any language, jargon, or phrasing you want to avoid in your application materials?"
3. "Any specific punctuation or formatting preferences? For example, some people prefer no em-dashes, or want to avoid certain buzzwords."
4. "What tone do you want in your cover letters? Options include: peer-to-peer (speaking as an equal to the hiring manager), collaborative, confident and direct, warm and personable, or something specific to your field."

---

### Phase 8: Layout Preferences

1. "What page size do you prefer for your PDFs — US Letter or A4?" (Default: US Letter if outside the US isn't confirmed)
2. "Any other visual preferences for your resume? Note that advanced customization (fonts, colors, spacing) requires editing `reference/layout/styles.css` directly — but I can note any preferences here for your reference."

---

### Phase 9: Write All Context Files

After completing all Q&A phases (or the targeted section), write the relevant files.

**For full setup, write all of the following. For section updates, write only the files listed for that section.**

#### `context/user-profile.md`
Structure:
```
# User Profile

## Who I Am
[Name, location, professional identity statement from Phase 3 synthesis]

## How I Work
[Working style, preferences, strengths from Phase 3 Q2]

## What I'm Great At
[2-4 core skill areas from Phase 3 Q2 + Phase 6]

## Current Situation / Goals
[What they're looking for, why they're in the job market if mentioned]

## Contact
[Name, location, email, phone, LinkedIn from Phase 2]
```

#### `context/positioning-narrative.md`
Structure:
```
# Positioning Narrative

## Core Positioning (1 sentence)
[Synthesized from Phase 3 — who they are + what they bring + for whom]

## What I Am
[3-4 bullet points of what defines their professional identity]

## What I'm Not
[2-3 bullet points clarifying what they're NOT — helps avoid mis-targeting]

## Career Reframe (if applicable)
[If they have non-traditional background, entrepreneurship, career gaps, etc — how to frame it as a strength]

## Proof Themes
[3-4 recurring proof patterns from Phase 5 bullets — "here's the situation... here's what I built... here's what changed"]
```

#### `context/target-roles.md`
Structure:
```
# Target Roles

## Lane Definitions

### Lane [Label] — [one-line description]
**Titles:** [list of role titles in this lane]
**Core value:** [what the user brings to this type of role]
**Positioning emphasis:** [what to lead with in resume and cover letter for this lane]

[Repeat for each lane]

## Search Keywords
[Flat list of 15-20 search terms — role titles, skills, technologies, functions]
```

#### `context/constraints-and-boundaries.md`
Structure:
```
# Constraints & Boundaries

## Must-Haves
[List from Phase 4 — non-negotiables]

## Avoid
[List from Phase 4 — role types, environments, industries to skip]

## Hard Constraints
[Travel, remote, company size, etc.]

## Fit Notes
[Any nuance — e.g., "sales-adjacent is fine if it's enablement, not cold prospecting"]
```

#### `context/resume-bullet-bank.md`
Structure:
```
# Resume Bullet Bank

> Bullet format rule: Every bullet must follow Ownership verb + System/Process + Impact. 1-2 lines max.
> Timeline accuracy: Do not conflate skills from different periods. Note the date range each capability applies to.

## [Most Recent Role] | [Title] | [Dates]

### [Category — e.g., Core Function, Leadership, Systems, etc.]

[Bullet from Phase 5]
[Bullet from Phase 5]
[Bullet from Phase 5]

[Repeat for each role]

## Education

[Education entries]
```

#### `context/metrics-and-proof-points.md`
Structure:
```
# Metrics & Proof Points

## Revenue / Business Impact
| Achievement | Metric | Context | Date/Period |
|-------------|--------|---------|-------------|
[from Phase 5 Q3]

## Efficiency / Process Improvement
| Achievement | Metric | Context | Date/Period |
|-------------|--------|---------|-------------|
[from Phase 5 Q3]

## Growth / Scale
| Achievement | Metric | Context | Date/Period |
|-------------|--------|---------|-------------|
[from Phase 5 Q3]

## Raw Data
[Any other numbers mentioned that haven't been categorized yet]
```

#### `context/systems-experience.md`
Structure:
```
# Systems & Technical Experience

## Platforms & Tools
[Organized list from Phase 6 Q1 — group by category if applicable]

## Core Capabilities
[From Phase 6 Q2 — signature technical/domain skills]

## Specialized Knowledge
[From Phase 6 Q3 — anything that sets them apart]
```

#### `context/writing-voice.md`
Structure:
```
# Writing Voice & Communication Style

## Overall Tone
[From Phase 7 Q1]

## Style Preferences
[From Phase 7 Q2+Q3 — active preferences]

## What to Avoid
[From Phase 7 Q2+Q3 — explicit avoid list]

## Cover Letter Tone
[From Phase 7 Q4]
```

#### `context/layout-preferences.md`
```
# Layout Preferences

## Page Size
[letter or a4 from Phase 8]

## Notes
[Any visual preferences noted — reminder that advanced customization requires styles.css edit]
```

#### `reference/resume-template.md`
Personalize the header with actual contact info from Phase 2. Keep the rest of the template structure generic.

#### System files (write once for all users, same content):
- `context/role-classifier.md` — copy the generic role classifier content
- `context/bullet-selection-rules.md` — copy the generic bullet selection rules
- `context/output-rules.md` — copy the generic output rules

These three files contain engine logic, not personal data. They are the same for all users and do not need to be personalized.

---

### Phase 10: Confirmation

After writing all files:

1. List every file created or updated with its path.
2. Show a one-paragraph summary: "Here's what I know about you: [synthesized summary of who they are, what they're targeting, and their key strengths]."
3. Show their defined lanes with one-line descriptions.
4. Say: "Your context is ready. Here are your next steps:
   - Review the files in `context/` — especially `resume-bullet-bank.md`. Add [TBD] metrics as you remember them.
   - Run `/load` at the start of each new session to load context, and between applications to start fresh.
   - When you have a job to apply to, run `/apply [paste the job description]`.
   - To update any section of your context later, run `/setup [section-name]`."
