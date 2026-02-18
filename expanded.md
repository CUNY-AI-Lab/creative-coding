# **Creative Coding with Generative AI**

*4:00 PM, Thursday, February 19, 2026, via Zoom*   

*Zach Muhlbauer and Stefano Morello | CUNY AI Lab*

\[Outline goes here… to be continued…\]

**Part I: Icebreaker (15 minutes)**

## **Slide 1: Welcome, “What Does Code Look Like?”**

Display a full-screen animation of the classic Commodore 64 one-liner: 10 PRINT CHR$(205.5+RND(1)); : GOTO 10\. As participants join the Zoom room, the screen fills with a maze of diagonal lines: no interface, no explanation, just the pattern building itself. This sets the tone: code as something you watch unfold, not something you fear.

**Facilitator note:** Welcome everyone. What you’re seeing is one of the most studied single lines of code in computing history. It was written for the Commodore 64 in 1982\. It picks one of two diagonal characters at random and prints it, over and over. That’s it—one line, and it generates an infinite maze. This is where creative coding begins: with the smallest possible instruction that produces something worth looking at.

### **JS Artifact: 10 PRINT Maze Generator**

// Canvas-based 10 PRINT pattern  
const canvas = document.createElement('canvas');  
canvas.width = window.innerWidth;  
canvas.height = window.innerHeight;  
document.body.appendChild(canvas);  
const ctx = canvas.getContext('2d');  
ctx.strokeStyle = '#00FF41'; // phosphor green  
ctx.lineWidth = 2;  
const SIZE = 20;  
let x = 0, y = 0;  
function draw() {  
  if (Math.random() > 0.5) {  
    ctx.beginPath(); ctx.moveTo(x, y);  
    ctx.lineTo(x + SIZE, y + SIZE); ctx.stroke();  
  } else {  
    ctx.beginPath(); ctx.moveTo(x + SIZE, y);  
    ctx.lineTo(x, y + SIZE); ctx.stroke();  
  }  
  x += SIZE;  
  if (x >= canvas.width) { x = 0; y += SIZE; }  
  if (y < canvas.height) requestAnimationFrame(draw);  
}  
draw();

## **Slide 2: Icebreaker Activity, “Describe an Algorithm You Already Know”**

**Prompt:** “Think of something you do by following steps: a recipe, a morning routine, a route you walk, a way you organize your desk. In the chat, describe it in three instructions or fewer.” 

This enacts what Vera Molnar called the machine imaginaire, which involves executing algorithms by hand and following self-imposed rules and constraints to generate series of drawings, well before gaining access to an actual computer in 1968\. The icebreaker makes the same move: participants discover they already think in sequences, conditions, and repetitions.

* **Facilitator note:** Read aloud a few responses. Look for patterns: “If X, then Y” is a conditional. “Repeat until done” is a loop. “First A, then B, then C” is a sequence. Name these structures without jargon. Everyone already knows them.

**Part II: Creative Coding, From Algorithm to Art (15 minutes)**

## **Slide 3: Origins, Bell Labs and the First Computer Art (1962–1965)**

In the summer of 1962, A. Michael Noll programmed his first digital computer art at Bell Telephone Laboratories in Murray Hill, New Jersey, using FORTRAN on an IBM 7090 mainframe. His images combined simple mathematical equations with pseudo-random numbers—combining order with disorder—where he made overall decisions and left the details to the calculations and chance of the algorithm. The origin story is worth telling: a summer intern had used a plotter to display data, but a bug produced a random pattern that was jokingly called “computer art.” By 1965, Georg Nees and Frieder Nake had exhibited the first publicly shown computer-generated artworks, or plotter drawings executed by a machine controlled by a computer, where the act of creation lay entirely in writing the program.

### **Nees-Style “Schotter” (Gravel)**

// Recreates Georg Nees' "Schotter" (1968-70):  
// A grid of squares where disorder increases  
// from top to bottom. Rotation and displacement  
// grow with each row, controlled by a single  
// "disorder" parameter.  
const canvas = document.getElementById('canvas');  
const ctx = canvas.getContext('2d');  
const COLS = 12, ROWS = 22, SIZE = 30;  
for (let row = 0; row < ROWS; row++) {  
  for (let col = 0; col < COLS; col++) {  
    const disorder = row / ROWS;  
    const angle = (Math.random() - 0.5) * disorder * Math.PI;  
    const dx = (Math.random() - 0.5) * disorder * SIZE;  
    const dy = (Math.random() - 0.5) * disorder * SIZE;  
    ctx.save();  
    ctx.translate(col * SIZE + SIZE/2 + dx, row * SIZE + SIZE/2 + dy);  
    ctx.rotate(angle);  
    ctx.strokeRect(-SIZE/2, -SIZE/2, SIZE, SIZE);  
    ctx.restore();  
  }  
}

## **Slide 4: The Machine Imaginaire, Vera Molnar’s Method**

Vera Molnar (1924–2023) was unique among the early algorithmic artists. She had worked toward art her whole life and did not have a science background. She gained access to a computer by visiting the Paris University computing centre and explaining that she wanted to use one to make art. Around 1960, she developed her machine imaginaire: a method of setting rules and constraints that guided image-making as if executed by a machine, creating what she called a “hint of disorder” to shake up strict algorithmic conception. The name came from her friend Michel Philippot, a composer exploring serial approaches to music. The machine imaginaire is the conceptual bridge between Parts II and IV of this workshop. When participants later write constraint-based system prompts for an LLM, they are essentially building their own machine imaginaire—defining rules that govern output while leaving room for productive surprise. Molnar embraced both the computer’s calculation speed and the importance of chance, programming her own “interferences” that would offset predictable outcomes.

**Molnar’s Hint of Discord**

// Inspired by Molnar's "Interruptions" series:  
// A grid of short line segments at uniform angles,  
// with a growing circular "void" in the center  
// where lines are removed. Participants can drag  
// to reposition the interruption zone.  
// The tension between grid-order and void-disorder  
// is the visual thesis of the machine imaginaire.

## **Slide 5: Creative Coding Today, p5.js and the Browser as Canvas**

The Processing programming language, created by Casey Reas and Ben Fry at MIT in 2001, made creative coding accessible to artists and designers who lacked traditional CS training. Its JavaScript descendant, p5.js, moved creative coding into the browser. For this workshop, we use plain HTML/CSS/JS rather than p5.js for a specific reason: an LLM can generate a complete, self-contained single-page artifact that opens directly in any browser, with no build step, no library import, and no account required. This is the format Simon Willison has noted extensively as HTML tools: single-file apps that combine markup, styling, and behavior into an evergreen document.

## **Slide 6: Key Concept, The Creative Coding Triangle**

Every creative coding work sits somewhere inside this triangle. Noll’s early work at Bell Labs combined simple equations with pseudo-random numbers. Molnar programmed interferences into otherwise predictable algorithms. LeWitt’s instructions were deterministic, but human interpretation in execution introduced variation. This triangle also maps onto LLM parameters: the system prompt defines Rules, the temperature setting controls Randomness, and the human prompt-writer performs Interpretation by selecting, iterating, and curating outputs. This conceptual frame carries into every activity that follows.

// SVG-based triangle with draggable point inside.  
// As the point moves toward "Rules," a background  
// pattern becomes grid-like. Toward "Randomness,"  
// it scatters. Toward "Interpretation," it morphs  
// toward a curated, selected composition.  
// Labels map to LLM equivalents:  
// Rules = System Prompt  
// Randomness = Temperature  
// Interpretation = Human Curation

# **Part III: Vibe Coding, Prompts as Prototypes (15 minutes)**

## **Slide 7: What Is Vibe Coding?**

The term “vibe coding” was coined by Andrej Karpathy in February 2025 to describe a style of programming where the user describes what they want in natural language and an LLM generates the code. Karpathy described it as fully giving in to the vibes, embracing exponentials, and forgetting that the code even exists, a radical departure from the traditional expectation that programmers understand every line they ship. Relevantly, Simon Willison defines vibecoding as when you don’t review what the model produces and “LLM-assisted programming” as thoughtfully reading and iterating on the output.

## **Slide 8: The Spectrum, From Vibe Coding to Deliberate Collaboration**

Present a horizontal spectrum. On the far left: pure vibe coding (one prompt, no review, ship it). On the far right: traditional programming (write every line yourself). In between: iterative prompting (generate, review, refine), constraint-based generation (detailed system prompts and rules), and pair programming with an LLM (human architecture, machine implementation). Research from Xu et al. (2024) on human-LLM co-creation for creative coding found that decomposed subtask invocation—breaking a request into smaller, sequential prompts—encourages more frequent, strategic, and generative reflection, fostering diagnostic reasoning and deeper creative engagement. The workshop activities are designed to move participants along this spectrum from left to right, building sophistication with each round.

// Horizontal slider from "Vibe" to "Deliberate."  
// As user drags, the background visualization shifts:  
// Left = chaotic particle system (pure randomness)  
// Center = organized but dynamic flow field  
// Right = precise geometric grid  
// Labels below mark the three workshop activities.

## **Slide 9: Anatomy of a Prompt for Creative Code**

Break down the structure of an effective prompt for generating single-page HTML/CSS/JS artifacts. This structure maps directly onto the Open WebUI configuration panel: Role goes in the system prompt, constraints can be enforced via system-level instructions, and output format can be specified in either the system prompt or the user message.

Show a concrete example with annotations:

1. **Role:** “You are a creative coder who generates single-page HTML artifacts.”

2. **Constraint:** “Use only vanilla JavaScript—no external libraries or CDN imports.”

3. **Aesthetic direction:** “The visual style should reference early computer art: monochrome, geometric, generative.”

4. **Technical frame:** “Use the Canvas API. The canvas should fill the viewport. Include animation via requestAnimationFrame.”

5. **Output format:** “Return a single HTML file with all CSS and JS inline. No explanation—just the code.”

## **Slide 10: Live Demo, The CUNY AI Lab Sandbox**

Walk through the Open WebUI interface live. Show participants how to:

1. Select a model (recommend a capable model available in the Sandbox)

2. Open the configuration panel (gear icon or parameter controls)

3. Enter a system prompt

4. Adjust temperature (demonstrate 0.3 vs. 1.0 vs. 1.5 on the same prompt)

5. Set max tokens (demonstrate what happens when set too low—truncated output)

6. Copy the generated HTML, paste into a local .html file, and open in browser

**Teaching moment:** Run the same prompt three times at temperature 0.3, then three times at 1.2. Show that low temperature produces near-identical outputs while high temperature yields genuine variation. This is the computational equivalent of Molnar’s “hint of disorder.” Then set max tokens to 256 and show how the output truncates mid-tag so that participants see what the parameter controls downstream.

**Part IV: Hands-On Activities (40 minutes)**

The three activities move participants along the vibe coding spectrum from left to right. Activity 1 is pure vibe coding. Activity 2 introduces iterative refinement. Activity 3 reaches the deepest mode: constraint-based generation, echoing Molnar’s machine imaginaire. Each round uses a different system prompt configuration in the CUNY Sandbox.

## **Slide 11: Activity 1, “One Prompt, One Artifact” (10 minutes)**

* **Setup:** Participants log into the CUNY AI Lab Sandbox at tools.ailab.gc.cuny.edu. They select a model, paste the Activity 1 system prompt (see Appendix B) into the configuration panel, set temperature to 0.9 and max tokens to 4096\.  
* **Task:** Write a single natural-language prompt describing a visual or interactive artifact you’d like to see in the browser. Examples: “a starfield that responds to mouse movement,” “a clock made of bouncing particles,” “a grid of squares that rotate more the further they are from center.” Send the prompt. Do not iterate. Copy the generated HTML into a file and open it.  
* **Discussion (2 minutes):** What worked? What surprised you? What would you change? The point: a single prompt can produce something functional and visually interesting, but you have limited control over the details.

// A simple particle starfield that responds to  
// mouse position for parallax depth effect.  
// Demonstrates the kind of artifact a single  
// vibe-coding prompt can produce.  
const stars = Array.from({length: 200}, () => ({  
  x: Math.random() * canvas.width,  
  y: Math.random() * canvas.height,  
  z: Math.random() * 3 + 0.5  
}));  
function animate() {  
  ctx.fillStyle = 'rgba(0,0,0,0.2)';  
  ctx.fillRect(0, 0, canvas.width, canvas.height);  
  stars.forEach(s => {  
    ctx.fillStyle = `rgba(255,255,255,${s.z/3})`;  
    ctx.fillRect(s.x, s.y, s.z, s.z);  
    s.x += (mouseX - canvas.width/2) * 0.001 * s.z;  
    s.y += (mouseY - canvas.height/2) * 0.001 * s.z;  
  });  
  requestAnimationFrame(animate);  
}

## **Slide 12: Activity 2, “Iterate and Refine” (15 minutes)**

* **Setup:** Same Sandbox session. Participants now switch to the Activity 2 system prompt (see Appendix B), which instructs the model to explain its design choices and suggest three possible modifications after each generation. Temperature stays at 0.9; max tokens at 4096\.  
* **Task:** Take your Activity 1 artifact and improve it through conversation. You might say: “The starfield is good but I want the stars to leave trails” or “Change the color palette to warm sunset tones” or “Add a UI element that lets the user control the speed.” Iterate at least three times. Each round, copy the new HTML and test it. This maps to Willison’s pattern for building HTML tools with LLMs: generate, test, describe what’s wrong or what’s missing, regenerate. The key insight from the Xu et al. research is that this decomposed, iterative approach fosters deeper creative reflection than one-shot generation.  
* **Discussion (3 minutes):** How did the artifact change across iterations? Did the model suggest anything you hadn’t considered? Where did you override its suggestions?

## **Slide 13: Activity 3, “Write the Rules, Not the Request” (15 minutes)**

* **Position on the spectrum:** Constraint-based generation (far right)  
* **Setup:** Participants now write their own system prompt from scratch. This is the machine imaginaire exercise: instead of describing what they want, they describe the rules the model must follow. Temperature can be set anywhere from 0.5 to 1.5 with max tokens set between 1k-3k.

You are a creative coding engine. Follow these rules exactly:  
1\. Generate a single HTML file with inline CSS and JS.  
2\. Use only the Canvas API. No external libraries.  
3\. The composition must be based on a grid of at least  
   100 elements.  
4\. Each element must have a property that varies  
   according to its distance from the center.  
5\. Include exactly one source of randomness.  
6\. The palette must use only three colors.  
7\. The canvas must fill the viewport.  
8\. Include animation using requestAnimationFrame.  
Return only the HTML. No explanation.

**Task:** Write your constraint set (your “instruction drawing” in the LeWitt sense), paste it as the system prompt, then send a minimal user prompt like “Generate.” Run it three times. Each output will be different because of the randomness constraint, but all will follow your rules. Select the one you like best—this is the Interpretation vertex of the triangle from Slide 7\.

**Discussion (3 minutes):** How did defining constraints change your relationship to the output? Did the rules produce anything you didn’t expect? How does this compare to Activities 1 and 2?

// A grid composition generated from a rule set:  
// - 144 circles (12x12 grid)  
// - Radius varies by distance from center  
// - Opacity varies by distance from top-left  
// - One random displacement per element  
// - Three-color palette: #1a1a2e, #16213e, #e94560  
// This is what the Activity 3 system prompt produces.

## **Slide 14: Reflection, Mapping the Activities to the Triangle**

Return to the Creative Coding Triangle from Slide 7\. Map each activity:

* **Activity 1 (One Prompt):** High Interpretation (you chose the prompt), moderate Randomness (temperature 0.9), low Rules (no system-level constraints beyond the default).  
* **Activity 2 (Iterate):** High Interpretation (you directed each iteration), moderate Rules (the system prompt guided the model’s behavior), moderate Randomness.  
* **Activity 3 (Write the Rules):** High Rules (you defined the constraint set), variable Randomness (you chose temperature), Interpretation comes at the end when selecting among outputs.

The arc of the workshop moved participants from consumer to architect of the generative process—the same trajectory as the history of creative coding itself, from Noll’s accidental plotter bug to Molnar’s deliberate machine imaginaire.

### **JavaScript Artifact: Animated Triangle with Activity Markers**

// The Slide 7 triangle, now with three labeled  
// points plotted inside it representing Activities  
// 1, 2, and 3\. Animated arrows show the trajectory  
// from Activity 1 to Activity 3, tracing the  
// workshop's arc from vibe coding to deliberate  
// constraint-based generation.

**Part V: Wrap-Up and Takeaways (5 minutes)**

## **Slide 15: What to Take With You**

Practical takeaways for participants to bring into teaching, research, or creative practice:

* **For teaching:** The three-activity structure (one-shot, iterative, constraint-based) can scaffold any creative coding assignment. The machine imaginaire framing makes system prompts accessible to students who have never written code.  
* **For research:** The CUNY AI Lab Sandbox provides a no-cost, privacy-respecting environment for experimenting with LLM-assisted prototyping. System prompts and parameter settings are reproducible—save them as part of your methodology.  
* **For creative practice:** The single-page HTML artifact is a portable format. It runs in any browser, can be hosted for free on GitHub Pages, and can be shared as easily as sending a file. The Sandbox lets you prototype without exposing work to commercial platforms.

# **Appendix A: CUNY AI Lab Sandbox Configuration Guide**

## **Accessing the Sandbox**

The CUNY AI Lab Sandbox is an Open WebUI instance hosted at tools.ailab.gc.cuny.edu. Participants log in with their CUNY credentials. Open WebUI provides a chat-based interface to large language models with a configuration panel for adjusting model behavior.

## **The Configuration Panel**

In Open WebUI, the configuration panel (accessed via the gear/settings icon near the chat input or at the top of a new conversation) exposes several parameters. The ones most relevant to this workshop:

### **System Prompt**

The system prompt is a persistent instruction that precedes every user message. It defines the model’s role, constraints, and output format. In Open WebUI, this field appears in the chat parameters or model configuration area. For this workshop, participants will paste different system prompts for each activity (see Appendix B).

**Teaching tip:** Frame the system prompt as “the rules of the game.” This is directly analogous to Molnar’s self-imposed constraints or LeWitt’s instruction sets.

### **Temperature:**

Temperature controls the randomness of the model’s token selection. A value of 0 makes the model deterministic (always choosing the most probable next token). A value of 1.0 samples proportionally from the probability distribution. Values above 1.0 flatten the distribution, making less-probable tokens more likely to be chosen. Temperature is like Molnar’s “hint of disorder” where low temperature entails algorithmic control, and higher temperature imply more randomness or interference. 

| Value | Behavior | Workshop Use |
| :---- | :---- | :---- |
| 0.0–0.3 | Near-deterministic | Good for reproducing a specific pattern; use in demo to show consistency |
| 0.5–0.8 | Balanced | Default range for most code generation; reliable structure with some variation |
| 0.9–1.0 | Creative | Recommended for Activities 1 and 2; produces varied, surprising outputs |
| 1.1–1.5 | Highly random | Experimental; may produce broken code but interesting visual ideas |

### **Max Tokens (Max Output Length)**

Max tokens sets the upper limit on the length of the model’s response. One token is roughly 3–4 characters of code. A single-page HTML artifact with inline CSS and JS typically requires 1,500–3,000 tokens. Setting this too low (e.g., 256) will truncate the output mid-tag, producing broken HTML. Setting it to 4,096 provides ample room for most artifacts.

**Appendix B: System Prompts for Each Activity**

## **Activity 1: One Prompt, One Artifact**

*Paste this into the System Prompt field in the Sandbox configuration panel.*

You are a creative coding generator. When the user describes a visual  
or interactive idea, generate a complete, self-contained HTML file that  
implements it. The file must include all CSS in a <style> tag and all  
JavaScript in a <script> tag. Use the Canvas API for graphics. The  
canvas must fill the browser viewport. Use requestAnimationFrame for  
animation. Do not use any external libraries, CDN imports, or  
frameworks. Do not include any explanation, comments about your  
approach, or markdown formatting. Return only the raw HTML file  
content, starting with <!DOCTYPE html> and ending with </html>.

## **Activity 2: Iterate and Refine**

*Paste this into the System Prompt field. This prompt encourages the model to support iterative dialogue.*

You are a creative coding collaborator. When the user describes a  
visual or interactive idea, generate a complete, self-contained HTML  
file (all CSS in <style>, all JS in <script>, Canvas API, full  
viewport, requestAnimationFrame, no external libraries).  
   
After generating the code, briefly describe three design choices you  
made and suggest three possible modifications the user might want to  
try. Keep suggestions concrete and actionable (e.g., "change the  
color palette to warm tones" or "add mouse interaction to control  
particle speed").  
   
When the user requests changes, generate the complete updated HTML  
file — do not provide partial snippets or diffs. Always return the  
full file so it can be directly saved and opened.

## **Activity 3: Write the Rules, Not the Request**

*For this activity, participants write their own system prompt. The example below can be shared as a starting template. Participants replace the bracketed placeholders with their own values. Encourage them to add at least one original rule (line 9) that reflects a personal aesthetic or conceptual interest.*

You are a creative coding engine governed by strict rules.  
You must follow every constraint listed below exactly.  
   
RULES:  
1. Output a single, complete HTML file with inline CSS and JS.  
2. Use only the Canvas API. No external libraries.  
3. The composition must be based on a grid of [NUMBER] elements.  
4. Each element must vary a visual property (size, color, rotation,  
   or opacity) based on its distance from [REFERENCE POINT].  
5. Include exactly [NUMBER] sources of randomness.  
6. Use only these colors: [COLOR 1], [COLOR 2], [COLOR 3].  
7. The canvas fills the viewport.  
8. Animate with requestAnimationFrame.  
9. [ADD YOUR OWN RULE HERE]  
   
Return only the HTML. No explanation. No comments.

# **Appendix C: JavaScript Artifact Specifications per Slide**

Each slide in the deck should include a live or pre-rendered creative coding artifact, embedded via JavaScript in the presentation framework (Reveal.js, following the critical-play model). The artifacts serve dual purposes: they illustrate the historical or conceptual point being made, and they demonstrate the kind of output participants will create in the hands-on section. Below is a summary table.

| Slide | Title | Artifact | Reference |
| :---- | :---- | :---- | :---- |
| 1 | Welcome | 10 PRINT maze generator | Commodore 64 (1982) |
| 2 | Icebreaker | Instruction card visualizer | Molnar, machine imaginaire |
| 3 | Origins | Nees Schotter recreation | Georg Nees (1968) |
| 4 | Machine Imaginaire | Molnar Interruptions generator | Vera Molnar (1968–) |
| 5 | Instructions as Art | LeWitt Wall Drawing #118 | Sol LeWitt (1971) |
| 6 | p5.js and the Browser | p5.js vs. vanilla JS split-screen | Processing / p5.js |
| 7 | Creative Coding Triangle | Interactive SVG triangle | Workshop framework |
| 8 | What Is Vibe Coding | Animated terminal + code pane | Karpathy (2025) |
| 9 | The Spectrum | Interactive spectrum slider | Willison, Xu et al. |
| 10 | Prompt Anatomy | Annotated prompt builder | Workshop tool |
| 11 | Live Demo | Parameter visualization | Open WebUI |
| 12 | Activity 1 | Starfield example output | Vibe coding |
| 13 | Activity 2 | Diff visualizer | Iterative prompting |
| 14 | Activity 3 | Constraint-based grid | Machine imaginaire |
| 15 | Gallery Walk | Gallery grid layout | Exhibition tradition |
| 16 | Reflection | Animated triangle + markers | Workshop synthesis |
| 17 | Takeaways | Takeaway card generator | Personalized export |

# **Appendix D: Sources**

10 PRINT CHR$(205.5+RND(1)); : GOTO 10\. MIT Press, 2012\. Available at: https://10print.org/

Goodchild, Amy. “Early Computer Art in the 50s & 60s.” https://www.amygoodchild.com/blog/computer-art-50s-and-60s

Noll, A. Michael. “The Beginnings of Generative Art.” Engineering and Technology History Wiki. https://ethw.org/First-Hand:The_Beginnings_of_Generative_Art

V&A Museum. “Vera Molnar: Machine Imaginaire.” https://www.vam.ac.uk/blog/museum-life/vera-molnar-machine-imaginaire-the-dance-of-hands-and-machine-thinking

Sotheby’s. “Vera Molnár, the Grande Dame of Generative Art.” https://www.sothebys.com/en/articles/vera-molnar-the-grande-dame-of-generative-art

Solving Sol. “Implement Sol LeWitt’s instructions in JavaScript.” https://solvingsol.com/

Chan, Mitchell F. “NFTs, Generative Art, and Sol LeWitt.” Medium. https://medium.com/@mitchellfchan/nfts-generative-art-and-sol-lewitt-e99a5fa2b0cb

Reprage. “From LeWitt to AI: The Evolution of Conceptual Art.” https://reprage.com/posts/2024-11-26-from-lewitt-to-ai-the-evolution-of-conceptual-art/

Xu, Y. et al. “Reflection in Human–LLM Co-Creation for Creative Coding.” arXiv:2402.09750, 2024\. https://arxiv.org/html/2402.09750v2

Willison, Simon. “Not all AI-assisted programming is vibe coding.” 2025\. https://simonwillison.net/2025/Mar/19/vibe-coding/

Willison, Simon. “Useful patterns for building HTML tools with LLMs.” 2025\. https://simonwillison.net/2025/Dec/10/html-tools/

CUNY AI Lab. https://ailab.gc.cuny.edu/

CUNY AI Lab Sandbox (Open WebUI). https://tools.ailab.gc.cuny.edu/

p5.js. https://p5js.org/

Processing Foundation. https://processing.org/

Kadenze. “Generative Art and Computational Creativity.” https://www.kadenze.com/programs/generative-art-and-computational-creativity

Muhlbauer, Zach. “Critical Play Workshop.” https://zmuhls.github.io/critical-play/
