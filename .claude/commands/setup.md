# Setup

Build or update your context files.

## Variables

section: $ARGUMENTS (optional — profile, targeting, bullets, skills, voice, layout. If empty, runs full setup.)

---

## Instructions

### Phase 0: Environment Check (full setup only — skip if a section argument is provided)

Before doing anything else, verify the environment is ready to run the export pipeline. Do these checks in order.

**Step 1 — Check Node.js**

Run `node --version`. If the command fails or Node.js is not found, stop immediately and tell the user:

"Node.js is required and doesn't appear to be installed. Please download and install it from https://nodejs.org/en/download — choose the LTS version. Installation takes 2-3 minutes. Once it's done, restart your AI workspace and run `/setup` again."

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
2. If a section argument is provided, jump directly to the matching section update phase below. Run only that section, then jump to Phase 9 to write only the relevant files.
3. If no argument is provided:
   - Check whether `context/user-profile.md` already contains non-placeholder content (i.e., setup has been run before).
   - If context exists: ask "It looks like you've already completed setup. Would you like to run the full setup again from scratch, or update a specific section? (full / profile / targeting / bullets / skills / voice / layout)"
   - If no context exists: proceed with full setup from Phase 1.

**Section argument routing:**

| Argument | Jump to | Files updated |
|----------|---------|---------------|
| `profile` | Section Update: Profile | `context/user-profile.md`, `context/positioning-narrative.md`, `reference/resume-template.md` header |
| `targeting` | Section Update: Targeting | `context/target-roles.md`, `context/constraints-and-boundaries.md` |
| `bullets` | Section Update: Bullets | `context/resume-bullet-bank.md`, `context/metrics-and-proof-points.md` |
| `skills` | Section Update: Skills | `context/systems-experience.md` |
| `voice` | Section Update: Voice | `context/writing-voice.md` |
| `layout` | Section Update: Layout | `context/layout-preferences.md` |

---

## Full Setup Flow

### Phase 1: Welcome

Tell the user:

"Welcome. The fastest way to get started is to drop in a resume — any version, any format. PDF, Word doc, plain text, a LinkedIn export. Whatever you have.

I'll read it, build your professional profile, and then ask you three short questions about what you're looking for next. That's it.

Drop your resume here whenever you're ready. If you don't have one handy, just say so and we'll go another way."

Wait for the user to respond before proceeding.

---

### Phase 2: Extract from Resume

**If the user provides a resume (any format):**

Read and extract the following:
- Full name
- Location (city, state)
- Email address
- Phone number
- LinkedIn URL (if present)
- Professional summary or headline (if present)
- All roles: company name, title, dates, and bullet points
- Education: degrees, institutions, years
- Skills, tools, technologies, platforms
- Any metrics or numbers mentioned

After extracting, do two things:

**First**, synthesize and reflect back a professional identity statement — not a data dump. Write it as a paragraph:

"Here's what I've gathered: [Name] is a [X-year] [field] professional based in [location]. [2-3 sentence synthesis of their career arc and what they're known for, derived from the resume content]. Their background includes [brief career highlights]. Their tools and platforms include [key skills/tools]."

**Second**, confirm the contact details:

"I'll use these for your resume header:
- Name: [name]
- Location: [location]
- Email: [email]
- Phone: [phone]
- LinkedIn: [linkedin or 'not found — let me know if you'd like to add it']

Does that look right?"

Wait for confirmation. Correct anything the user flags.

If any contact detail is missing and the user doesn't correct it, note it as [TBD] — don't ask for it as a separate question.

**If the user says they don't have a resume:**

Say: "No problem. You can drop in anything — a LinkedIn About section, a professional bio, even just a few sentences describing what you do. Or if you'd prefer, I can walk you through a few questions instead. What works best for you?"

- If they provide any text: treat it the same as a resume and extract what you can.
- If they prefer questions: run the fallback Q&A (see end of this section).

---

### Phase 3: Targeted Follow-up

After confirming the extracted profile, ask these three questions. Ask them one at a time, in order.

**Question 1 — Targeting**

"What kinds of roles are you going for? Give me 2-3 titles or categories."

For each category they name, ask:
"What's the core value you'd bring to a [role type] role — what problem do you solve for them?"

Then ask: "Any hard no's? Industries, work environments, company sizes, or constraints like remote-only?"

Organize their answers into 2-3 named lanes and confirm:
"I'm going to organize your targeting into [N] lanes: [Lane 1], [Lane 2]. Does that capture it?"

**Question 2 — Voice**

"How would you describe your communication style? And is there anything you'd want to avoid in how your application materials sound — certain words, phrases, or tones?"

If the resume had a clear and distinctive voice, note it and confirm rather than asking from scratch:
"Your resume reads as [observation about tone]. Is that how you'd describe your style, or would you adjust it?"

**Question 3 — (none)**

Layout defaults to US Letter. No question needed.

---

### Phase 3 Fallback: Q&A Path (no resume provided)

Use this only if the user has no document to provide and prefers questions.

Ask these in order, one at a time:

1. "What's your full name?"
2. "Where are you located? (City and state)"
3. "What's your professional email and phone number?"
4. "LinkedIn URL, if you have one?"
5. "In a sentence or two, how would you describe what you do professionally?"
6. "What are you best known for — what would a past colleague say your strongest skill is?"
7. "Walk me through your most recent role: title, company, dates, and what you actually did there." (Repeat for each role.)
8. "What tools, platforms, or technologies do you use regularly?"
9. "What roles are you targeting next? Any hard no's or constraints?"
10. "How would you describe your communication style? Anything to avoid in your materials?"

After each role description, draft 3-5 bullets using **Ownership verb + System/Process + Impact** and confirm with the user before moving on.

---

## Section Update Phases

These phases are used only when a section argument is provided (e.g., `/setup targeting`). They are not part of the full setup flow.

---

### Section Update: Profile

Ask:
1. "Do you have an updated resume or any new material to pull from? If so, drop it here."
   - If yes: extract and update identity, contact, career history, and skills from the document.
   - If no: ask the questions below.
2. "How has your professional identity or focus changed since your last setup?"
3. "Any contact details to update? (email, phone, location, LinkedIn)"

Update `context/user-profile.md`, `context/positioning-narrative.md`, and the header in `reference/resume-template.md`.

---

### Section Update: Targeting

Ask:
1. "What kinds of roles are you going for now? Have your target lanes changed?"
2. "Any new industries or environments to avoid? Any changes to your hard constraints?"

Reorganize into updated lane definitions and confirm before writing.

Update `context/target-roles.md` and `context/constraints-and-boundaries.md`.

---

### Section Update: Bullets

Ask:
1. "Do you have any new roles, projects, or accomplishments to add? Drop a resume or describe what's new."
   - If they provide a document: extract new roles and bullets.
   - If they describe verbally: draft bullets using **Ownership verb + System/Process + Impact** and confirm.
2. "Any new metrics or numbers to add? Revenue, team size, percentages, timeframes?"

Update `context/resume-bullet-bank.md` and `context/metrics-and-proof-points.md`.

---

### Section Update: Skills

Ask:
1. "Any new tools, platforms, or technologies to add?"
2. "Any skills you've deepened or started leading with that weren't in your profile before?"

Update `context/systems-experience.md`.

---

### Section Update: Voice

Ask:
1. "How would you describe your communication style?"
2. "Anything to avoid in your application materials — words, phrases, tones, punctuation?"
3. "What tone do you want in cover letters? Peer-to-peer, confident and direct, warm, formal?"

Update `context/writing-voice.md`.

---

### Section Update: Layout

Ask:
1. "What page size do you prefer for your PDFs — US Letter or A4?"

Update `context/layout-preferences.md`.

---

## Phase 9: Write All Context Files

After completing the full setup flow (or a section update), write the relevant files.

**For full setup, write all of the following. For section updates, write only the files listed for that section.**

#### `context/user-profile.md`
```
# User Profile

## Who I Am
[Name, location, professional identity synthesized from resume or Q&A]

## How I Work
[Working style, strengths, what they're known for]

## What I'm Great At
[2-4 core skill areas]

## Current Situation / Goals
[What they're looking for next]

## Contact
[Name, location, email, phone, LinkedIn]
```

#### `context/positioning-narrative.md`
```
# Positioning Narrative

## Core Positioning (1 sentence)
[Who they are + what they bring + for whom]

## What I Am
[3-4 bullet points defining professional identity]

## What I'm Not
[2-3 bullet points — helps avoid mis-targeting]

## Career Reframe (if applicable)
[Non-traditional background, gaps, entrepreneurship — framed as strength]

## Proof Themes
[3-4 recurring proof patterns: situation → what was built → what changed]
```

#### `context/target-roles.md`
```
# Target Roles

## Lane Definitions

### Lane [Label] — [one-line description]
**Titles:** [list of role titles]
**Core value:** [what the user brings to this lane]
**Positioning emphasis:** [what to lead with for this lane]

[Repeat for each lane]

## Search Keywords
[Flat list of 15-20 search terms]
```

#### `context/constraints-and-boundaries.md`
```
# Constraints & Boundaries

## Must-Haves
[Non-negotiables]

## Avoid
[Role types, environments, industries to skip]

## Hard Constraints
[Travel, remote, company size, geography]

## Fit Notes
[Any nuance that doesn't fit neatly above]
```

#### `context/resume-bullet-bank.md`
```
# Resume Bullet Bank

> Bullet format rule: Every bullet must follow Ownership verb + System/Process + Impact. 1-2 lines max.
> Timeline accuracy: Do not conflate skills from different periods.

## [Most Recent Role] | [Title] | [Dates]

### [Category]
[Bullet]
[Bullet]

[Repeat for each role]

## Education
[Degree, Field — University (Year)]
```

#### `context/metrics-and-proof-points.md`
```
# Metrics & Proof Points

## Revenue / Business Impact
| Achievement | Metric | Context | Date/Period |
|-------------|--------|---------|-------------|

## Efficiency / Process Improvement
| Achievement | Metric | Context | Date/Period |
|-------------|--------|---------|-------------|

## Growth / Scale
| Achievement | Metric | Context | Date/Period |
|-------------|--------|---------|-------------|

## Raw Data
[Any numbers not yet categorized]
```

#### `context/systems-experience.md`
```
# Systems & Technical Experience

## Platforms & Tools
[Grouped by category]

## Core Capabilities
[Signature skills — things they'd be hired for]

## Specialized Knowledge
[Domain expertise, niche knowledge, certifications]
```

#### `context/writing-voice.md`
```
# Writing Voice & Communication Style

## Overall Tone
[Synthesized from resume voice and/or user's description]

## Style Preferences
[Active preferences]

## What to Avoid
[Explicit avoid list — words, phrases, tones, punctuation]

## Cover Letter Tone
[Peer-to-peer / confident / warm / formal]
```

#### `context/layout-preferences.md`
```
# Layout Preferences

## Page Size
letter

## Notes
Advanced customization (fonts, colors, spacing) requires editing reference/layout/styles.css directly.
```

#### `reference/resume-template.md`
Update the header with the user's actual contact info. Keep the rest of the template structure as-is.

#### System files (engine logic — same for all users, do not personalize):
- `context/role-classifier.md`
- `context/bullet-selection-rules.md`
- `context/output-rules.md`

---

## Phase 10: Confirmation

After writing all files:

1. List every file created or updated.
2. Show a one-paragraph summary: "Here's what I know about you: [synthesized summary — who they are, what they're targeting, key strengths]."
3. Show their defined lanes with one-line descriptions.
4. Say: "Your context is ready. Here's what to do next:
   - Review `context/resume-bullet-bank.md` and fill in any [TBD] metrics as you remember them.
   - Run `/load` at the start of each session, and between applications to start fresh.
   - When you have a job to apply to, run `/apply [paste the job description]`.
   - To update any section later, run `/setup [section-name]`."
