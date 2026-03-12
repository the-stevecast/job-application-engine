# Role Classifier

> **How the agent uses this file:** Read during `/apply` and `/interpret-role` to analyze incoming job descriptions, extract employer priorities, classify the role into one of the user's defined lanes, and produce a Role Strategy Profile that drives all generation decisions.
>
> **This is an engine file — it does not need to be personalized.** The lane definitions it references come from `context/target-roles.md`, which is specific to the user.

---

## Purpose

Analyze job descriptions before generating application materials. This layer extracts what the employer actually values — not just what they list in the requirements, but what problems they're trying to solve and what proof they want to see.

---

## Signals to Extract

From the job description, identify:

### Functional Signals
- Core responsibilities (what the person will actually do day-to-day)
- Ownership level (individual contributor, manager, lead, director)
- Team structure (who they report to, who works with them)
- Success metrics (how performance will be measured)

### Skills Signals
- Required technical skills, tools, platforms
- Required domain knowledge or industry background
- Soft skills emphasized (communication, leadership, cross-functional, etc.)

### Priority Signals
- What is mentioned 2+ times (this is what they actually care about)
- What appears in the opening summary vs. buried in requirements (order matters)
- What's listed as "required" vs. "preferred"

### Cultural / Context Signals
- Company stage, size, pace
- Values language ("we value X", "you'll thrive if...")
- What they say about the team or environment

---

## Lane Classification

Classify the role into one of the lanes defined in `context/target-roles.md`.

For each lane, compare:
- Does the core responsibility match this lane's description?
- Does the employer's stated value proposition align with what the user offers in this lane?
- Does the required background match the user's experience for this lane?

If the role doesn't fit cleanly into any defined lane, note this explicitly and classify it as the closest match with a caveat.

---

## Employer Priority Analysis

Determine:
1. **What problems they want solved** — the gap they're hiring to fill
2. **What proof they want to see** — the evidence that will convince them
3. **Which accomplishments matter most** — the 1-2 things that would make this application stand out

---

## Role Strategy Profile Output Format

Every analysis must produce a Role Strategy Profile in this exact structure. This profile drives all generation decisions in `/apply`.

```
# Role Strategy Profile

**Company:** [Company Name]
**Role:** [Role Title]
**Date:** [YYYY-MM-DD]
**Lane:** [Lane Label from context/target-roles.md] — [one-line rationale]

---

## Top Signals

1. [Signal] — [why it matters for positioning]
2. [Signal] — [why it matters for positioning]
3. [Signal] — [why it matters for positioning]
(4-5 signals max)

---

## Employer Priorities

**Problems they want solved:**
- [problem 1]
- [problem 2]

**Proof they want to see:**
- [proof type 1]
- [proof type 2]

---

## Resume Strategy

**Summary emphasis:** [what to lead with in the 4-5 line summary]

**Competency order:**
1. [competency]
2. [competency]
...

**Bullet selection guidance:**
- [Role/Category]: [which bullets to prioritize, or "skip"]
- [Role/Category]: [which bullets to prioritize, or "skip"]

**Prior role inclusion:**
- [Role]: [include/omit, bullet count, what to emphasize]

**Keywords to mirror:** [5-10 phrases from the JD to echo in resume language]

---

## Cover Letter Strategy

**Paragraph 1 (Capability Lead):** [what capability to open with, how to frame it]
**Paragraph 2 (Operational Example):** [which story best maps, what to emphasize]
**Paragraph 3 (Differentiator):** [how to connect distinctive approach to this role's specific needs]
**Paragraph 4 (Close):** [any role-specific hooks for the closing]
**Company-specific hooks:** [things to weave in naturally, not as flattery]

---

## Risks and Gaps

| Requirement | Gap | Reframe |
|-------------|-----|---------|
| [requirement] | [what's missing] | [how to address it] |

**Red flags:** [anything conflicting with constraints from context/constraints-and-boundaries.md]
```

---

## Example (abbreviated)

```
# Role Strategy Profile

**Company:** Meridian Health
**Role:** Senior Product Manager, Patient Experience
**Date:** 2026-01-15
**Lane:** Product Management — Core PM role at a growth-stage company

## Top Signals
1. Patient-facing workflow improvement — mentioned 4x, clearly the primary outcome
2. Cross-functional stakeholder management — clinical, engineering, and operations all mentioned
3. Discovery and requirements ownership — "you will own discovery" appears in summary

## Employer Priorities
**Problems they want solved:**
- Patients are dropping off during digital intake — conversion and completion rates are low
- Clinical and engineering teams aren't aligned on priorities

**Proof they want to see:**
- Evidence of shipping patient-facing features with measurable outcome
- Demonstrated ability to run discovery and translate findings into requirements

## Resume Strategy
**Summary emphasis:** Patient experience PM with a track record of shipping features that measurably improve care delivery workflows

**Competency order:**
1. Product Discovery & Requirements Ownership
2. Patient-Facing Feature Development
3. Cross-Functional Alignment (Clinical + Engineering)
4. Data-Informed Prioritization
5. Regulatory / Compliance Awareness

**Keywords to mirror:** patient intake, digital health, clinical workflows, discovery, cross-functional, measurable outcomes

## Risks and Gaps
| Requirement | Gap | Reframe |
|-------------|-----|---------|
| EHR integration experience | Limited — one integration project | Frame as sufficient: built one EHR integration end-to-end, learned the constraints |
```
