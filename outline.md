# Creative Coding with Generative AI — slide outline (1:1 distilled)

## Part I — Icebreaker (15m)

### Slide 1 — Welcome: “What does code look like?”
- Display 10 PRINT maze animation full-screen
- Set tone by showing code as watchable pattern-building
- Explain one-line rule: randomly choose 1 of 2 diagonals; loop forever

### Slide 2 — Icebreaker: “Describe an algorithm you already know”
- Prompt participants to post a 3-steps-or-fewer routine in chat
- Connect activity to Molnar’s “machine imaginaire” (rules executed by hand)
- Name structures without jargon: sequence, conditional, loop

## Part II — From algorithm to art (15m)

### Slide 3 — Origins: Bell Labs + first computer art (1962–1965)
- Situate Noll at Bell Labs (FORTRAN on IBM 7090)
- Frame work as order + disorder (equations + pseudo-randomness)
- Tell origin anecdote: plotter bug → “computer art” joke → exhibitions (Nees/Nake)

### Slide 4 — Vera Molnar: the “machine imaginaire”
- Define method as rules/constraints + “hint of disorder”
- Link to later LLM constraint prompts as modern machine imaginaire
- Emphasize productive chance (“interferences”) inside strict structure

### Slide 5 — Creative coding today: p5.js + browser as canvas
- Credit Processing (Reas/Reas & Fry) for access + pedagogy
- Note p5.js as browser descendant
- Justify workshop choice: plain HTML/CSS/JS enables single-file artifacts (no build/import/account)
- Reference Willison: “HTML tools” as evergreen single-file apps

### Slide 6 — Key concept: creative coding triangle
- Place works inside triangle: Rules / Randomness / Interpretation
- Map to LLM practice: system prompt / temperature / human curation
- Use frame as scaffold for upcoming activities

## Part III — Vibe coding: prompts as prototypes (15m)

### Slide 7 — What is “vibe coding”?
- Attribute term to Karpathy (Feb 2025)
- Distinguish vibecoding (no review) vs LLM-assisted programming (review/iterate) via Willison

### Slide 8 — Spectrum: vibe → deliberate collaboration
- Show continuum: one-shot no-review → traditional programming
- Position middle modes: iterative prompting, constraint prompts, LLM pair programming
- Cite Xu et al. (2024): decomposed subtasks increase reflection/diagnostic reasoning
- State workshop intent: move participants left→right across rounds

### Slide 9 — Anatomy of a prompt for creative code
- Break prompt into: role, constraints, aesthetic direction, technical frame, output format
- Map fields to Open WebUI configuration (system prompt vs user prompt)

### Slide 10 — Live demo: CUNY AI Lab Sandbox
- Demonstrate: model selection, system prompt entry, temperature, max tokens
- Show teaching contrasts: temp 0.3 vs 1.2; max tokens too low truncates HTML
- Tie temperature variation to Molnar’s “hint of disorder”

## Part IV — Hands-on activities (40m)

### Slide 11 — Activity 1: “one prompt, one artifact” (10m)
- Set up Sandbox with Activity 1 system prompt
- Fix parameters: temperature 0.9; max tokens 4096
- Do one-shot prompt; copy HTML; open locally; no iteration
- Debrief: identify surprises + limits of control

### Slide 12 — Activity 2: “iterate and refine” (15m)
- Switch to Activity 2 system prompt (adds design choices + mod suggestions)
- Iterate ≥3 rounds: generate → test → describe change → regenerate
- Connect to Willison workflow + Xu et al. reflection benefits

### Slide 13 — Activity 3: “write the rules, not the request” (15m)
- Have participants author system-prompt constraint sets
- Allow parameter range: temperature 0.5–1.5; max tokens 1k–3k
- Run “Generate” 3 times; select favorite (Interpretation happens at selection)

### Slide 14 — Reflection: map activities onto triangle
- Map Activity 1: high Interpretation, moderate Randomness, low Rules
- Map Activity 2: high Interpretation, moderate Rules, moderate Randomness
- Map Activity 3: high Rules, variable Randomness, Interpretation at end
- Summarize arc: consumer → architect of generative process

## Part V — Wrap-up (5m)

### Slide 15 — Takeaways
- For teaching: reuse 3-activity scaffold; use machine imaginaire to demystify prompts
- For research: use Sandbox as reproducible, privacy-respecting environment; save prompts/params
- For practice: use single-page HTML artifacts as portable/shareable format

## Appendices (reference)
- Appendix A: Sandbox configuration guide (system prompt, temperature, max tokens)
- Appendix B: system prompts for Activities 1–3
- Appendix C: per-slide artifact spec list (deck embeds JS artifacts)
- Appendix D: sources/links
