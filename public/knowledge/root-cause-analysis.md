# Root Cause Analysis for PMs

> When a metric drops, resist the reflex to fix the first thing you see. The thing that broke is rarely the reason it broke.

## What is it?

Root Cause Analysis (RCA) is the discipline of finding *what actually caused* a problem — not just what looks broken on the surface. For PMs, it's a critical skill in two contexts: diagnosing metric drops in production, and answering "a metric dropped — walk me through how you'd investigate" in interviews.

The difference between a good PM and a great PM often shows up here. Average PMs fix the symptom. Great PMs find the system-level failure that created it.

## Where is it used?

- Production incidents: "Our Day-7 retention dropped 15% overnight"
- Feature post-mortems: "The new checkout flow reduced conversion instead of improving it"
- PM case interviews (one of the most common question types at top companies)
- Weekly metric reviews when a KPI moves unexpectedly
- Stakeholder communication: explaining what broke, why, and what changes prevent recurrence

## How it Works

### Step 1: Confirm the Problem is Real

Before panicking, verify the data:

- Is this a data pipeline issue or a real product problem? Check your analytics tool's data freshness and ingestion lag.
- Compare across multiple data sources (if your primary analytics and your data warehouse disagree, trust neither until you investigate).
- Is this a reporting artifact? A timezone bug, a dashboard filter that changed, a sampling change?

Roughly 30% of "metric drops" in most companies are data issues. Rule this out first.

---

### Step 2: Bound the Problem

Narrow down exactly where and when the problem started:

- **When?** Identify the exact timestamp the metric shifted. This is your most important clue.
- **What changed at that time?** New deployments, configuration changes, marketing campaigns, external events (competitor launch, regulatory change, news event)?
- **Who is affected?** All users or a specific segment? Segment by: platform (iOS vs Android vs Web), geography, user cohort (new vs returning), traffic source, device type.

Finding that the problem only affects Android users on 4G in Tier 2 cities is not just interesting — it reduces your hypothesis space from hundreds to a handful.

---

### Step 3: Decompose the Metric

Work through the metric tree to isolate which component moved.

**Example — DAU dropped 18%:**

```
DAU
├── New users (acquisition)
│   └── Install rate, signup completion rate
├── Returning users (retention)
│   ├── Day-7 returned users
│   └── Day-30 returned users
└── Resurrected users (re-engagement)
    └── Users who were inactive and came back
```

Check each branch. If new user acquisition is flat but returning users are down, the problem is retention — not acquisition. Every branch you check eliminates a class of causes.

---

### Step 4: The 5 Whys

Once you've isolated *where* in the metric tree the problem lives, use the 5 Whys to find the root cause.

**Example — Checkout conversion dropped 22%:**

> **Why 1:** Why did checkout conversion drop?
> Because fewer users completed the payment step.
>
> **Why 2:** Why did fewer users complete payment?
> Because error rates on the UPI payment screen went up 40%.
>
> **Why 3:** Why did UPI errors increase?
> Because a payment gateway partner had a service degradation.
>
> **Why 4:** Why weren't we alerted?
> Because we had no monitoring on third-party payment success rates.
>
> **Why 5:** Why did we have no monitoring here?
> Because external dependencies were never added to our alerting system.
>
> **Root cause:** No alerting on third-party service health.
> **Fix:** Not just "switch to a backup gateway" — it's "instrument all third-party dependencies and set SLA-based alerts."

The symptom was the UPI error. The root cause was a missing monitoring process. Treating only the symptom means you'll face this again — silently, next time with a different vendor.

---

### The Ishikawa (Fishbone) Diagram

For complex problems with many potential causes, organise hypotheses into categories:

- **People:** Team changes, training gaps, support team handling issues differently
- **Process:** Deployment process changed, release cadence changed
- **Product:** A specific feature, flow, or UI change
- **Technology:** Infrastructure, third-party services, database performance
- **External:** Competitor action, regulatory change, market event

Brainstorm potential causes in each category, then test them against your data.

---

### A Complete PM RCA Checklist

1. **Confirm it's real** — data pipeline or product issue?
2. **Bound it** — exact timestamp, who is affected, what changed
3. **Decompose** — which part of the metric tree moved?
4. **Hypothesise** — list every plausible cause; don't eliminate before checking data
5. **Test** — prioritise by likelihood × ease of verification; use funnel analysis, session recordings, SQL
6. **Root cause** — keep asking "why" until you reach a *systemic* cause, not an incident cause
7. **Fix and monitor** — implement the fix; define what "back to normal" looks like; create an alert

---

## Real-World Example

**Meesho's signup drop (fictional but representative pattern)**

Meesho (social commerce) observed a 24% drop in new seller signups in a specific week. The initial theory from the business team: "Competitor is offering better margins."

RCA revealed something entirely different:

1. **Metric decomposition:** New signups dropped, but existing seller retention was flat — so the problem was acquisition, not retention.
2. **Segmentation:** The drop was concentrated on Android users, not iOS or web.
3. **Timeline correlation:** The drop started 36 hours after a Play Store update.
4. **5 Whys:** The Play Store update changed the screenshots, including one that showed a commission structure that was now outdated. Users landing on the Play Store listing saw conflicting information about earnings. This created enough confusion and trust doubt to kill signup intent before they even downloaded the app.

**Root cause:** Play Store assets weren't updated as part of the commission structure change release.

**Fix:** Add "Play Store / App Store asset review" as a mandatory checklist item for any pricing/commission change.

---

## Practice Case

**Scenario:** You're a PM at a food-tech startup. Your North Star Metric is "orders per retained user per week." On a Monday morning, you see it dropped from 2.1 to 1.6 (a 24% drop) over the past 7 days.

Work through the investigation:
1. Before assuming it's real, what would you check first?
2. List three segmentation cuts you'd make to narrow down the affected users.
3. What does your metric tree look like? Which branches would you check first and why?
4. After decomposing, you find the drop is concentrated in "returning users who haven't ordered in 8+ days." What 3 hypotheses would you generate? What data would you use to test each?

---

## Go Deeper

- **[Reforge: Diagnosing metric drops](https://www.reforge.com/blog/mastering-metrics)** — the most rigorous treatment of metric decomposition for PMs
- **[Lenny's Newsletter: The PM's guide to metrics](https://www.lennysnewsletter.com)** — covers RCA in the context of product analytics and data strategy
- **[First Round Review: How great PMs investigate problems](https://review.firstround.com)** — first-principles RCA approach with real case studies from startup PMs
