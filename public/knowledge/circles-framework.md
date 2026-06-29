# The CIRCLES Framework

> A 7-step method for answering any "design a product" question — in interviews or on the job — without going blank.

## What is it?

CIRCLES is a structured approach to product design problems. It forces you to slow down before jumping to solutions, ensuring you've understood who you're building for and why before you discuss what to build.

The acronym: **C**omprehend → **I**dentify → **R**eport → **C**ut → **L**ist → **E**valuate → **S**ummarise.

## Where is it used?

- PM case interviews (Google, Meta, Amazon, Swiggy, Razorpay)
- Early-stage product thinking sessions before writing a PRD
- Structuring product reviews when stakeholders push vague feature requests
- Hackathons where you need to defend design decisions quickly

## How it Works

### C — Comprehend the Situation

Ask clarifying questions before anything else. This is the step most candidates skip and most PMs regret.

- What is the goal of this product? What problem does the company need it to solve?
- What platform are we designing for (iOS, Android, Web, hardware)?
- Are there constraints — regulation, timeline, budget, existing tech stack?

*A PM who jumps to solutions before clarifying is a PM who builds the wrong thing fast.*

---

### I — Identify the Customer

Never design for "all users." That's designing for no one.

Segment your users across two or three dimensions, then pick **one primary persona** and commit to it. Common dimensions: demographics (age, geography, income), usage behaviour (new vs returning, power user vs casual), and context (commuter, student, enterprise employee).

Make the persona specific. "Priya, 26, a working professional in Bengaluru who orders food on her commute home" is more useful than "urban millennial."

---

### R — Report the Customer's Needs

Map Priya's journey and extract her real pain points — not just what she says she wants, but what's actually frustrating her. Use the Jobs to Be Done lens:

- **Functional job:** What is she trying to accomplish?
- **Emotional job:** How does she want to feel while doing it?
- **Social job:** How does she want to be perceived?

List 3–5 pain points ranked by severity and frequency. The highest-ranked is where your solution should land.

---

### C — Cut Through Prioritisation

Not all pain points deserve a solution. Use a quick 2×2:

| | High Frequency | Low Frequency |
|---|---|---|
| **High Pain** | Build first | Consider |
| **Low Pain** | Nice-to-have | Skip |

Pick the **one** pain point your solution will nail. Trying to solve all of them in one design means solving none well.

---

### L — List Solutions

Brainstorm 3–5 distinct solutions. Force yourself to think across the spectrum:

- **Incremental:** Small improvement to an existing flow
- **Adjacent:** Borrow a pattern from another product category
- **Radical:** Reimagine the experience entirely

Don't evaluate yet. Volume comes first.

---

### E — Evaluate Trade-offs

For each solution, assess: user impact, build effort (rough: Low / Medium / High), strategic fit with company goals, and risks (technical debt, legal exposure, ethical concerns).

Pick the solution with the best impact-to-effort ratio that also aligns with where the company is headed.

---

### S — Summarise

End with one crisp recommendation. The formula:

> "I'd prioritise **[solution]** because it directly addresses **[pain point]** for **[persona]**, delivers **[measurable outcome]**, and is feasible within **[timeframe]**. The key risk is **[X]**, which I'd mitigate by **[Y]**."

---

## Real-World Example

**Swiggy redesigning restaurant discovery (2021)**

Swiggy's core user (working professional, ordering 3–4x/week) had one dominant pain: choice paralysis. With 500+ restaurants visible at once, re-ordering from the same 3 places was easier than discovering something new.

Applying CIRCLES:

- **Comprehend:** Platform is mobile, goal is to increase weekly order frequency
- **Identify:** The habitual re-orderer who wants something new but doesn't have bandwidth to scroll endlessly
- **Report:** Pain = "I don't know what to try, and scrolling makes it worse"
- **Cut:** Prioritise discovery for repeat users over first-time UX
- **List:** (a) curated "try something new" module, (b) AI-personalized cuisine suggestions, (c) mood-based collections ("Late night?", "Quick lunch")
- **Evaluate:** Mood-based collections = low effort (editorial), high reach (appears for all returning users), immediate test-ability via A/B
- **Summarise:** Ship mood-based collections as a personalised shelf above the fold for users with 3+ orders

---

## Practice Case

**Scenario:** You're a PM at Urban Company (home services marketplace). The CEO wants you to "improve the post-service experience." You have 6 weeks and a team of 3 engineers.

Apply CIRCLES:
1. Who is your primary user — the customer who booked the service, or the professional who delivered it?
2. What are the top 3 pain points after a service is completed? (Think about: payment, reviews, rebooking, complaints.)
3. Pick one pain point and propose a solution. Define one metric that tells you it worked.

---

## Go Deeper

- **[Decode and Conquer](https://www.lewis-lin.com/decode-and-conquer)** by Lewis Lin — the book that introduced CIRCLES; still the best PM interview prep resource
- **[Lenny's Newsletter: How to nail a PM interview](https://www.lennysnewsletter.com)** — practical interview breakdowns from a former Airbnb PM
- **[Product School PM Interview Guide](https://productschool.com/blog/product-management-2/product-manager-interview/)** — covers CIRCLES with worked examples
