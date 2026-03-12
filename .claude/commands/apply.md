# Apply

Generate a tailored application package for a specific job posting.

## Variables

job_input: $ARGUMENTS (company name, role title, and job description — pasted directly or provided as context)

---

## Instructions

### Phase 1: Analyze the Role

1. Extract from the job description:
   - Company name and role title
   - Core responsibilities (bulleted)
   - Required skills, systems, and qualifications
   - Preferred/bonus qualifications
   - Repeated keywords and priority themes (mentioned 2+ times)
   - Team/reporting structure if mentioned
   - Any cultural or values signals

2. Create output directory: `outputs/<company-kebab>-<role-kebab>-<YYYY-MM-DD>/`

3. Save the raw job description to `job.md` in the output directory (as-is, no formatting or extraction).

4. Read strategy context files:
   - `context/role-classifier.md` — classification framework + output format
   - `context/target-roles.md` — user's lane definitions + positioning by lane
   - `context/bullet-selection-rules.md` — bullet mapping rules
   - `context/resume-bullet-bank.md` — available bullets
   - `context/constraints-and-boundaries.md` — deal-breakers and fit criteria

5. Generate a Role Strategy Profile following the format in `context/role-classifier.md`:
   - Classify the role into one of the user's defined lanes (from `context/target-roles.md`) with rationale
   - Extract and rank top signals from the JD
   - Determine employer priorities
   - Map signals to bullet selections using `context/bullet-selection-rules.md`
   - Define resume strategy (summary emphasis, competency order, bullet selections, prior role inclusion)
   - Define cover letter strategy (angles for each paragraph)
   - Identify risks and gaps with reframe suggestions
   - List keywords to mirror

6. Save the profile to `role-strategy.md` in the output directory.

---

### Phase 2: Load User Context

Read the following files:
- The `role-strategy.md` just generated in the output directory
- `context/user-profile.md` — identity and career summary
- `context/positioning-narrative.md` — core positioning and differentiators
- `context/systems-experience.md` — technical proof and platforms
- `context/resume-bullet-bank.md` — accomplishment statements for experience sections
- `context/metrics-and-proof-points.md` — quantified evidence to strengthen bullets
- `context/writing-voice.md` — tone and style for cover letter
- `context/output-rules.md` — resume format rules
- `reference/resume-template.md` — structural template for the full resume
- `reference/cover-letter-template.md` — structural template, tone rules, and header format

---

### Phase 3: Map Requirements to Proof

Use the `role-strategy.md` profile to drive requirement mapping:
- For each major job requirement, find the closest matching experience from the user's context
- Prioritize bullet selections identified in the strategy profile
- Identify the strongest proof point from `resume-bullet-bank.md`, paired with metrics from `metrics-and-proof-points.md`
- Note any gaps flagged in the strategy profile's "Risks and Gaps" section
- Note any requirements that are a strength but not yet well-documented

---

### Phase 4: Generate Outputs

Use the `role-strategy.md` profile to drive all generation decisions:
- Competency ordering from the profile's "Competency order" guidance
- Bullet selection from the profile's bullet selection guidance
- Prior role inclusion from the profile's "Prior roles" guidance
- Cover letter angles from the profile's "Cover Letter Strategy" section
- Keywords to mirror from the profile's "Keywords to Mirror" list

Generate four files (in addition to `job.md` and `role-strategy.md` already created in Phase 1):

#### a) resume.md
- Use `reference/resume-template.md` as the structural template
- Follow all rules in `context/output-rules.md` under "Resume Format Rules"
- **Header:** Use contact info from `reference/resume-template.md` as-is (it was personalized during setup)
- **Professional Summary:** 4-5 lines max. Not a single dense paragraph. Structure: who they are + domain + recent focus + key capability + differentiator. Mirror the job's language without copying.
- **Core Competencies:** 6-8 items. Single column. Reorder to front-load what the job prioritizes.
- **Professional Experience:** Select and tailor bullets from `context/resume-bullet-bank.md`. Every bullet must follow **Ownership verb + System/Process + Impact**. 1-2 lines max per bullet.
  - Primary/most recent role: 5-7 bullets (most weight)
  - Secondary roles: 3-4 bullets each
  - Earlier roles: 1-2 bullets or compress to single line
  - Front-load bullets matching the role's top requirements
  - Pair with metrics from `context/metrics-and-proof-points.md` where available
- **Timeline accuracy:** Do not imply capabilities started earlier or later than they did. If the user's context specifies when certain skills began, reflect that accurately.
- **Education:** Include as-is from the template

#### b) cover-letter.md
- Use `reference/cover-letter-template.md` as the structural template
- Written in the user's voice (reference `context/writing-voice.md`)
- Tone: as defined in the user's writing-voice.md. Default: confident, peer-to-peer, not pitching.
- **Header:** Use the format from `reference/cover-letter-template.md` with contact info from the resume template
- **Paragraph 1 (Lead with Capability):** Open with what the user brings, NOT praise of the company. State the core capability that maps to this role. A company-specific hook can appear naturally but must not be the opening sentence.
- **Paragraph 2 (Operational Example):** One concrete example: specific situation, what was built or done, operational result. Proves the claim from paragraph 1.
- **Paragraph 3 (Differentiator):** What makes this candidate's approach distinctive. Connect to the specific role's needs.
- **Paragraph 4 (Close):** Direct, confident. Express interest in a conversation. No desperation.
- 4 paragraphs max. Each 3-5 sentences.
- Never open with: "I'm excited about...", "I was thrilled to see...", "Your company's mission..."
- Follow all style rules in `context/writing-voice.md` (tone, avoid list, punctuation preferences)

#### c) fit-analysis.md
- **Role Classification:** Which lane and why
- **Requirement-by-Requirement Mapping:**

  | Requirement | User's Match | Strength | Evidence |
  |-------------|--------------|----------|----------|
  | (from JD)   | (from context) | Strong / Moderate / Gap | (specific bullet or experience) |

- **Overall Fit Score:** Honest assessment (Strong Fit / Good Fit / Stretch / Poor Fit)
- **Key Differentiators:** What makes this candidate stand out
- **Honest Gaps:** What's missing and how to address it
- **Red Flags:** Anything in the posting that conflicts with the user's constraints

#### d) revision-notes.md
- **Questions for the User:** Things to clarify that would strengthen the application
- **Missing Proof:** Experience the user likely has but hasn't documented in the bullet bank yet
- **Suggested Bullet-Bank Additions:** New bullets or metrics to add to `context/resume-bullet-bank.md`
- **Language to Steal:** Phrases from the JD worth incorporating into general positioning
- **Positioning Insights:** What this application revealed about how to strengthen the overall narrative

---

### Phase 5: Summarize

After generating all outputs:
1. State what was generated and where (list all 6 files with full paths)
2. Show the lane classification from the strategy profile
3. Provide the overall fit assessment (1-2 sentences)
4. Highlight the #1 strength and #1 gap
5. List recommended next actions

---

## Output Standards
- Every sentence should be specific to this role and this person — nothing generic
- Use plain language per `context/writing-voice.md`
- Prioritize concrete systems and outcomes over abstract claims
- Mark any assumed metrics as [TBD] for the user to verify or replace

---

## Quality Check

Before finalizing, verify:
- [ ] `job.md` exists in output directory (raw JD preserved)
- [ ] `role-strategy.md` exists and follows the format in `context/role-classifier.md`
- [ ] Resume competency order matches `role-strategy.md` guidance
- [ ] Resume bullet selection aligns with `role-strategy.md` guidance
- [ ] Cover letter angles match `role-strategy.md` guidance
- [ ] Resume follows `reference/resume-template.md` structure
- [ ] Resume follows all rules in `context/output-rules.md`
- [ ] Summary is 4-5 lines max, not a single dense block
- [ ] Every bullet follows Ownership + System/Process + Impact, 1-2 lines max
- [ ] No soft verb openers (Helped, Supported, Assisted, Participated, Worked on)
- [ ] Cover letter follows `reference/cover-letter-template.md` structure
- [ ] Cover letter opens with capability, not company praise
- [ ] Cover letter includes one operational example with outcome
- [ ] Cover letter tone matches `context/writing-voice.md`
- [ ] Fit analysis is honest about gaps, not just cheerleading
- [ ] Revision notes contain actionable items
- [ ] Role classification matches the actual job requirements
- [ ] No style violations from `context/writing-voice.md` (check avoid list)
