# Gap Extract

Generate a ready-to-paste helper prompt for extracting undocumented experience from a user.

Use this after running `/apply` when `revision-notes.md` or `fit-analysis.md` identifies gaps — experience the user likely has but hasn't documented in their context files yet. The generated prompt is designed to be dropped into a separate AI chat session for a natural-language conversation that produces structured output ready to paste back into this project.

## Variables

target_dir: $ARGUMENTS (path to the output folder, e.g., `outputs/acme-ai-lead-2026-04-30`). If not provided, use the most recent directory in `outputs/`.

---

## Instructions

### Phase 1: Identify Target Directory

1. If `$ARGUMENTS` is provided, use it as the target directory.
2. If not, list directories in `outputs/` and select the most recently modified one.
3. Confirm the directory contains `revision-notes.md` and `fit-analysis.md`. If either is missing, stop and inform the user.

---

### Phase 2: Read Source Files

Read the following files:

- `outputs/<target-dir>/revision-notes.md` — primary source for gaps, missing proof, and suggested bullet additions
- `outputs/<target-dir>/fit-analysis.md` — for the gap rows in the requirement mapping table and honest gap assessment
- `outputs/<target-dir>/role-strategy.md` — for company name, role title, and top employer priorities
- `context/user-profile.md` — for the user's identity and brief professional background

---

### Phase 3: Extract Gaps

From the source files, compile:

1. **Role context:** Company name, role title, top 2-3 employer priorities (from role-strategy.md)
2. **Missing proof points:** From `revision-notes.md` — "Missing Proof" and "Suggested Bullet-Bank Additions" sections
3. **Requirement gaps:** From `fit-analysis.md` — rows rated "Gap" or "Moderate" where stronger evidence is needed
4. **Open questions:** From `revision-notes.md` — "Questions for the User" section

Organize these into a clean gap list. Group by theme where possible (e.g., "AI implementation experience", "team leadership", "metrics and outcomes").

---

### Phase 4: Generate the Helper Prompt

Produce a complete, self-contained prompt block — formatted so the user can copy and paste it directly into a new AI chat session. The prompt must include all context the helper AI needs to conduct the conversation without access to this project.

Use this structure:

---

**[START OF HELPER PROMPT — copy everything below this line]**

```
## Context

You are helping [Name] extract and articulate professional experience to strengthen a job application.

**Applicant:** [Name] — [1-sentence professional identity from user-profile.md]

**Role being applied to:** [Role Title] at [Company]

**What the employer cares most about:**
[Top 2-3 priorities from role-strategy.md, as bullet points]

---

## Your Job

[Name] has experience that's relevant to this role but hasn't yet documented it in a way that's usable in a resume or cover letter. Your job is to draw that experience out through conversation — then turn it into structured, formatted content at the end.

**How to conduct the conversation:**
- Ask one question at a time. Wait for the answer before asking the next.
- Be conversational, not interrogating. This should feel like a colleague asking "tell me more about that."
- When you get a vague answer, probe for specifics: What did you actually do? What changed because of it? What were the numbers?
- When you hear a result, ask for the metric: How much? How many? Over what timeframe?
- When you hear a tool or system mentioned, note it.
- Keep going until you've covered all the gaps listed below, or the user signals they're done.

**What to listen for:**
- Specific actions the user took (not just responsibilities they had)
- Outcomes and results — quantified if possible, estimated if not
- Systems, tools, or processes involved
- Team size, scope, timeline, or scale of the work
- Before/after comparisons (what existed before, what changed)

---

## Gaps to Explore

These are the specific areas where stronger evidence is needed for this application:

[Paste compiled gap list here — organized by theme, 1-2 sentences of context per gap explaining why it matters for this role]

---

## Questions Already Identified

These questions were flagged during the application review. Use them as a starting point, but follow the conversation where it goes:

[Paste "Questions for the User" from revision-notes.md]

---

## How to Start

Open with something like:

"I've reviewed the gaps in your application for [Role] at [Company]. I want to ask you some questions about your background — just talk naturally and don't worry about formatting. I'll turn your answers into polished resume content at the end.

Let's start with [first gap topic]. Can you tell me about a time you [relevant experience prompt]?"

---

## Output Format

When the conversation is complete — or when the user says they're done — produce a structured output block using exactly this format. This output will be pasted directly into the job application project.

---

### OUTPUT: Context File Additions

**Instructions for use:** Copy each section below and paste it into the corresponding file in your job application project. A collaborator or AI assistant will help you integrate it.

---

#### Additions to `context/resume-bullet-bank.md`

For each experience discussed, format as:

**[Role Title] | [Company] | [Approximate Dates]**

Category: [Theme — e.g., AI Implementation, Team Leadership, Process Design]

- [Ownership verb] + [what was built/done/led] + [operational result or outcome]
- [Repeat for each bullet]

*(If a metric is approximate or estimated, mark it with ~ . If unknown, use [TBD].)*

---

#### Additions to `context/metrics-and-proof-points.md`

| Achievement | Metric | Context | Date/Period |
|-------------|--------|---------|-------------|
| [What was accomplished] | [Number, %, $, timeframe] | [Brief context] | [Year or range] |

*(Add a row for every quantified result that came up in the conversation.)*

---

#### Additions to `context/systems-experience.md` (if applicable)

Any tools, platforms, or methods mentioned that aren't already documented:

- [Tool or method] — [how it was used, in what context]

---

#### Notes for Review

[Any context, caveats, or follow-up questions the applicant should consider before these additions go into the project — e.g., "Confirm the revenue figure before using it" or "This bullet needs a specific outcome added."]

---
```

**[END OF HELPER PROMPT]**

---

### Phase 5: Save and Report

1. Save the generated prompt to `outputs/<target-dir>/gap-extract-prompt.md`
2. Tell the user:
   - The prompt has been saved to `[path]/gap-extract-prompt.md`
   - How many gaps were identified and what themes they cover
   - Instructions: "Open that file, copy everything between the START and END markers, and paste it into a new AI chat session to begin the conversation."
3. Remind the user that when the helper conversation is complete, they can bring the structured output back here and say "add these to my context files" — the assistant will integrate it.
