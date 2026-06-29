# OKRs for Product Managers

> Objectives and Key Results — the goal-setting system that separates teams who ship things from teams who make things happen.

## What is it?

OKRs (Objectives and Key Results) were invented at Intel by Andy Grove in the 1970s, brought to Google by John Doerr in 1999, and are now the default goal-setting system at product-led companies worldwide.

The structure is simple: an **Objective** tells you where you're going (qualitative, inspiring). **Key Results** tell you how you'll know you got there (quantitative, measurable). The magic — and the difficulty — is in writing Key Results that measure outcomes, not outputs.

## Where is it used?

- Quarterly planning: aligning team goals with company priorities
- Roadmap justification: "Here's what we're building and here's the outcome we expect"
- PM interviews: "Walk me through how you set goals for your product team"
- Annual strategy setting: connecting team-level goals to company-level mission
- Stakeholder communication: making trade-offs visible and defensible

## How it Works

### The One Rule: Outcomes, Not Outputs

This is the thing PMs get wrong most often. Key Results must measure what *changed for users or the business* — not what the team did.

| ❌ Output (Wrong) | ✅ Outcome (Right) |
|---|---|
| Ship the new onboarding flow | Increase Day-7 retention from 32% to 45% |
| Launch 3 new features | Increase weekly active usage by 25% |
| Conduct 20 user interviews | Reduce checkout abandonment from 68% to 50% |
| Fix the top 5 bugs | CSAT on checkout flow improves from 3.2 to 4.1 |

Shipping features is an output. Users getting value is an outcome. A team can complete every output and deliver zero business value. OKRs should make that failure visible.

---

### Writing a Strong Objective

A strong Objective is:
- **Qualitative and inspiring** — it motivates the team
- **Time-bound** — quarterly is standard; annual for company-level
- **Aligned upward** — it directly contributes to a company-level objective
- **Not a metric** — the metrics go in the Key Results

**Weak:** "Improve our product metrics"
**Strong:** "Make our checkout experience the fastest and most trusted in the category"

---

### Writing Strong Key Results

A strong Key Result follows this formula: **[Verb] + [metric] + [from X to Y]**

The "from X to Y" forces you to know your baseline, which is itself valuable.

Good examples:
- "Increase checkout completion rate from 58% to 72%"
- "Reduce average delivery time from 34 minutes to 28 minutes"
- "Grow Day-30 retention from 18% to 27%"
- "Achieve NPS of 50+ among users who complete onboarding (currently 34)"

**Target 70% attainment.** Google's rule: if you consistently hit 100% of your Key Results, your OKRs aren't ambitious enough. The right tension is 60–70% attainment. 100% means you sandbagged.

---

### The OKR Hierarchy

OKRs work through vertical alignment:

```
Company OKR
  "Become the #1 PM learning platform in India"
  KR: 50,000 unique monthly readers by Q4

    Team / Product OKR
      "Build a knowledge hub that PMs share with colleagues"
      KR1: 10 high-quality articles published
      KR2: Average article NPS of 60+
      KR3: 40% of readers share at least one article

        Individual OKR (optional)
          "Become the editorial voice of the knowledge hub"
          KR: Research and publish 3 in-depth frameworks
```

If you can't draw a line from your team OKR to the company OKR, the OKR is misaligned. This is the fastest way to check whether your work matters.

---

### Grading OKRs

At the end of the quarter, score each Key Result from 0.0 to 1.0:

| Score | Meaning |
|---|---|
| 1.0 | Fully achieved |
| 0.7 | Strong — this is the expected outcome |
| 0.5 | Partial — needs a retrospective |
| 0.3 | Minimal progress — something went wrong |
| 0.0 | Not started |

Average across KRs to get an Objective score. Use retrospectives at 0.3 and below to understand what systemic failure allowed this.

---

### Common OKR Mistakes

**Making OKRs a task list.** "Run 3 A/B tests" is a task, not an outcome. Rewrite as: "Increase signup conversion rate by 20% through experimentation."

**Too many OKRs.** 3 Objectives × 3 Key Results = 9 metrics per quarter maximum. More than that and focus dissolves. Teams with 7 Objectives are teams with zero focus.

**No check-ins.** OKRs need weekly or bi-weekly check-ins. Without them, they become aspirational wallpaper. The check-in is where you identify blockers before they kill the quarter.

**Tying grades to performance reviews.** This incentivises sandbagging. OKR grades and HR performance systems must be separate — Google is explicit about this. Connect OKRs to learning, not compensation.

---

### OKRs vs. KPIs

| OKRs | KPIs |
|---|---|
| Aspirational, change each quarter | Steady-state health metrics, monitored continuously |
| Set collaboratively by teams | Often top-down |
| Measure progress toward change | Measure operational health |
| Comfortable to miss at 30% attainment | Missing a KPI is usually a crisis |

You need both. KPIs keep the lights on. OKRs drive change. A product team with only KPIs is in maintenance mode. A team with only OKRs has no floor under them.

---

## Real-World Example

**Spotify's discovery team OKRs (reconstructed from public data)**

Spotify's discovery team (responsible for Discover Weekly, Daily Mixes, etc.) set an OKR in 2019 focused on deepening personalisation rather than broadening the user base:

**Objective:** Make every listening session feel personally curated, not algorithmically random.

**Key Results:**
- KR1: Increase skip rate on Discover Weekly recommendations from 38% to under 25%
- KR2: Increase share rate of Discover Weekly playlists from 4.1% to 7%
- KR3: Increase users who save at least one Discover Weekly track from 31% to 42%

All three KRs measured user *behaviour* (skipping, sharing, saving) not team *activity* (models trained, algorithms updated). The team's quarter was spent improving the embedding model and adding user taste signals — but the OKRs didn't mention any of that. They only mentioned what changed for the listener.

---

## Practice Case

**Scenario:** You're PM at a B2B SaaS company (HR tech — employee engagement surveys). The company's North Star Metric is "monthly active teams completing at least one survey." Your team's charter is improving survey response rates.

Write the OKR:
1. Define one strong Objective for your team this quarter.
2. Write 3 Key Results using the [verb] + [metric] + [from X to Y] formula. What data would you need to establish the "from X" baseline?
3. Leadership wants to add "publish 5 new survey templates" as a KR. How would you push back, and what outcome-based KR would you propose instead?

---

## Go Deeper

- **[Measure What Matters](https://www.whatmatters.com)** by John Doerr — the book that brought OKRs to mainstream; includes Google's early OKR stories
- **[Lenny's Newsletter: OKRs for product teams](https://www.lennysnewsletter.com)** — how top PMs adapt OKRs to fast-moving product contexts
- **[Christina Wodtke on OKRs](https://eleganthack.com)** — the most practical writing on OKR implementation; includes what goes wrong in year one
- **[Reforge: Product strategy and goal-setting](https://www.reforge.com/blog/product-strategy)** — connecting OKRs to product strategy and north star metrics
