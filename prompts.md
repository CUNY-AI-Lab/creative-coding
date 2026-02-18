# Workshop prompts (Activities)

<!-- NOTE (migration): these links and file paths assume the GitHub Pages layout under `/docs/itp-lab/`. Update during the Next.js migration. -->

## Activity system prompts

### Activity 1: One-shot artifact
Motif: **Interpretation** (you steer by taste, the model fills in gaps).

- Use a strict output format: single HTML only.
- Prompt once. No iterations.
- Evaluate by running the artifact and describing what the model assumed.

### Activity 2: Iterate and refine
Motif: **Collaboration** (feedback loop as a creative tool).

- Generate → test → describe → request changes → regenerate.
- Change one thing per round.
- Keep prompt + parameters alongside outputs.

### Activity 3: Write the rules
Motif: **Rules** (constraints as the artwork).

- Write constraints like a score.
- Generate multiple candidates.
- Curate the best one.

## Similar ideas / experimental points of departure

- **Prompt-as-score**: write prompts like performance instructions (Sol LeWitt–style) and compare outputs at different temperatures.
- **Constraint tournaments**: run the same rules across models (GLM 5 vs Kimi K2.5) and vote on the best artifact.
- **Debug the aesthetic**: treat visual glitches as signals; add one constraint to fix only one failure mode at a time.
- **One randomness source**: force all variation to come from a single random seed; explore how structure emerges.
- **Parameter journaling**: keep a small lab notebook of model, temp, max tokens, and the result.
