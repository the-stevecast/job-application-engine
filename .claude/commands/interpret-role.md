# Interpret Role

Analyze a job description and produce a Role Strategy Profile.

## Variables

job_input: $ARGUMENTS (company name, role title, and job description — pasted directly or provided as context)

---

## Instructions

### Phase 1: Parse the Job Description

1. Extract from the job description:
   - Company name and role title
   - Core responsibilities (bulleted)
   - Required skills, systems, and qualifications
   - Preferred/bonus qualifications
   - Repeated keywords and priority themes (mentioned 2+ times)
   - Team/reporting structure if mentioned
   - Any cultural or values signals

2. If company name or role title is unclear from the input, ask the user before proceeding.

---

### Phase 2: Load Context

Read the following files:
- `context/role-classifier.md` — classification framework + output format
- `context/target-roles.md` — user's lane definitions + positioning by lane
- `context/bullet-selection-rules.md` — bullet mapping rules
- `context/resume-bullet-bank.md` — available bullets (skim for coverage)
- `context/constraints-and-boundaries.md` — deal-breakers and fit criteria
- `context/output-rules.md` — resume format rules

---

### Phase 3: Classify and Analyze

1. **Classify the role** into one of the user's defined lanes (from `context/target-roles.md`) using the framework in `context/role-classifier.md`. If the role doesn't fit cleanly into any defined lane, note this and explain why.

2. **Extract and rank top signals** (3-5) from the JD using the signal categories in `context/role-classifier.md`. For each signal, note why it matters for positioning.

3. **Determine employer priorities:** What problems do they want solved? What proof do they want to see?

4. **Build resume strategy** using `context/bullet-selection-rules.md`:
   - Select competency order based on lane and JD emphasis
   - Select specific bullet bank entries by category
   - Determine prior role inclusion and bullet counts
   - Identify 5-10 keywords from the JD to mirror

5. **Build cover letter strategy:**
   - Choose paragraph 1 capability angle based on lane
   - Choose paragraph 2 operational example that best maps to the role
   - Define paragraph 3 differentiator connection to this role's needs
   - Identify company-specific hooks to weave in naturally

6. **Identify risks and gaps:** Requirements where the user is weak or lacks proof. For each gap, suggest a reframe. Flag any deal-breakers from `context/constraints-and-boundaries.md`.

---

### Phase 4: Generate Output

1. Create output directory: `outputs/<company-kebab>-<role-kebab>-<YYYY-MM-DD>/`
2. Save the raw job description to `job.md` in the output directory (as-is, no formatting)
3. Generate `role-strategy.md` following the Role Strategy Profile output format defined in `context/role-classifier.md`

The profile must be:
- Concise and skimmable (not an essay)
- Specific enough to drive resume and cover letter generation
- Honest about gaps (no cheerleading)

---

### Phase 5: Report

After generating the profile:
1. State what was generated and where (full paths)
2. Show the lane classification with rationale
3. List the top 3 signals
4. Note any red flags or deal-breakers
5. Remind the user they can review and edit `role-strategy.md` before running `/apply`
