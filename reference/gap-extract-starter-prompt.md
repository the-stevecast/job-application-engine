# Gap Extract — Starter Prompt

This is the template behind the `/gap-extract` command. Use it for onboarding, training, or in situations where you want to run the helper conversation manually rather than generating it from a project output.

**In normal production use, run `/gap-extract` instead.** That command reads your most recent application output and fills this template automatically.

---

## How This Works

After generating a job application with `/apply`, you'll have a `revision-notes.md` and `fit-analysis.md` in your output folder. These files identify gaps — experience you likely have but haven't documented yet. This prompt takes those gaps into a separate AI chat session and runs a natural conversation to draw that experience out. The result is structured content you can bring back into your project and add to your context files.

**The flow:**
1. Run `/apply` on a job description
2. Review `revision-notes.md` — note the gaps and missing proof points
3. Use `/gap-extract` (or this template manually) to generate the helper prompt
4. Paste the prompt into a new AI chat and have the conversation
5. Copy the structured output at the end of that conversation
6. Bring it back to this project and say "add these to my context files"

---

## The Template

Copy everything between the START and END markers. Fill in all `[BRACKETED PLACEHOLDERS]` before pasting into a new AI chat.

---

**[START OF HELPER PROMPT — copy everything below this line]**

```
## Context

You are helping [APPLICANT NAME] extract and articulate professional experience to strengthen a job application.

**Applicant:** [APPLICANT NAME] — [ONE SENTENCE: who they are professionally, what they do, how many years of experience]

**Role being applied to:** [JOB TITLE] at [COMPANY NAME]

**What the employer cares most about:**
- [EMPLOYER PRIORITY 1 — e.g., "Hands-on AI workflow design with real adoption evidence"]
- [EMPLOYER PRIORITY 2 — e.g., "Discovery and scoping before implementation"]
- [EMPLOYER PRIORITY 3 — e.g., "Cross-functional communication with executive stakeholders"]

---

## Your Job

[APPLICANT NAME] has experience that's relevant to this role but hasn't yet documented it in a way that's usable in a resume or cover letter. Your job is to draw that experience out through conversation — then turn it into structured, formatted content at the end.

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

These are the specific areas where stronger evidence is needed for this application. For each one, have a conversation until you have enough to write at least one strong resume bullet.

[GAP 1 — NAME THE THEME]
[1-2 sentences explaining what's missing and why it matters for this role. E.g.: "The job requires evidence of leading an AI implementation from discovery through adoption. The applicant's existing materials describe the workflow design but don't show a complete end-to-end example with outcomes."]

[GAP 2 — NAME THE THEME]
[1-2 sentences of context]

[GAP 3 — NAME THE THEME]
[1-2 sentences of context]

[Add as many gaps as needed. Three to five is typical.]

---

## Questions Already Identified

Use these as a starting point — they came out of the initial application review:

- [QUESTION 1 — e.g., "Can you describe a specific AI workflow you designed that a team used daily? What did it do, and what happened to the team's work because of it?"]
- [QUESTION 2]
- [QUESTION 3]

[Add as many as needed.]

---

## How to Start

Open with something like:

"I've reviewed the gaps in your application for [JOB TITLE] at [COMPANY NAME]. I want to ask you some questions about your background — just talk naturally and don't worry about formatting. I'll turn your answers into polished resume content at the end.

Let's start with [FIRST GAP TOPIC]. Can you tell me about a time you [RELEVANT EXPERIENCE PROMPT]?"

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

## After the Conversation

When the helper conversation produces its structured output, bring it back to your job application project and tell the assistant:

> "Here is output from my gap extraction conversation. Please add these to my context files."

The assistant will integrate the new bullets into `resume-bullet-bank.md`, add metrics to `metrics-and-proof-points.md`, and update `systems-experience.md` if needed. Then run `/apply` again on the same job description to regenerate the application with the stronger evidence.
