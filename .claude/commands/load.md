# Load

Initialize or reset session context.

Run this at the start of every session, and between applications to prevent context from one role bleeding into the next. This command reads your context files fresh each time — it does not modify any files.

## Instructions

### Step 1: Check Setup Status

Check whether `context/user-profile.md` contains populated content.

If the file is empty or contains only placeholder text, stop and say:
"It looks like setup hasn't been completed yet. Run `/setup` first to build your context — it takes about 10-15 minutes and only needs to be done once."

### Step 2: Read Context

Read the following files:
- `SYSTEM.md` — workspace structure and commands
- `context/user-profile.md` — who the user is
- `context/positioning-narrative.md` — positioning and differentiators
- `context/target-roles.md` — role lanes and search keywords
- `context/constraints-and-boundaries.md` — deal-breakers and fit criteria
- `context/resume-bullet-bank.md` — accomplishment statements (skim for breadth)
- `context/writing-voice.md` — tone and style

### Step 3: Summarize

Provide a brief session brief covering:

1. **Who you are:** One paragraph synthesizing their professional identity, career background, and what they're targeting — written back to them so they can confirm the context is correct.

2. **Target lanes:** List their defined lanes with one-line descriptions.

3. **Available commands:**
   - `/setup [section]` — build or update context
   - `/apply [job description]` — generate full application package
   - `/interpret-role [job description]` — role analysis only
   - `/export-pdf [output-dir]` — render and export PDFs
   - `/build [request]` — plan workspace changes
   - `/execute [plan-path]` — execute a plan

4. **Recent outputs** (if any exist in `outputs/`): List the most recent 2-3 application packages by directory name.

5. **Confirmation:** "Context loaded. Ready to help."
