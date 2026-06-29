# RICE Prioritisation

> Reach × Impact × Confidence ÷ Effort — a repeatable scoring system that kills gut-feel prioritisation debates.

## What is it?

RICE is a feature prioritisation framework developed by the team at Intercom. It gives every feature idea a numerical score so you can rank them objectively — or at least, make the subjectivity visible and debatable.

The formula: **RICE = (Reach × Impact × Confidence) / Effort**

## Where is it used?

- Sprint and quarterly roadmap planning
- Breaking deadlocks when two vocal stakeholders want different things
- Communicating prioritisation decisions to leadership ("here's why X beats Y")
- PM interviews: "How do you decide what to build next?"
- Backlog grooming sessions before a planning cycle

## How it Works

### R — Reach

How many users will this feature touch in a specific time period (typically one quarter)?

Be precise. "All users" is not a number. Pull from analytics:

- "This affects users who reach the checkout page — that's 8,000 per quarter"
- "Only users on Android 12+ — that's 3,200 per quarter"

Vague reach estimates are where RICE scores get gamed most. Use real data.

---

### I — Impact

How much does this move the needle *for each user it reaches*?

Use a fixed scale and calibrate it across your team:

| Score | Meaning |
|---|---|
| 3 | Massive — core value proposition change |
| 2 | High — significantly improves a key flow |
| 1 | Medium — noticeable improvement |
| 0.5 | Low — minor quality-of-life change |
| 0.25 | Minimal — edge case improvement |

Don't give everything a 2 or 3. If every feature is "High Impact," you've learned nothing.

---

### C — Confidence

How sure are you about your Reach and Impact estimates?

| Score | Meaning |
|---|---|
| 100% | Strong data: user research + analytics backing |
| 80% | Some data: qualitative signals, a few interviews |
| 50% | Mostly gut feeling |

Confidence is a forcing function for intellectual honesty. If you don't have data, say 50%. If the team consistently scores confidence at 80%+ without evidence, the framework is being gamed.

---

### E — Effort

How many person-months will this take across all functions — design, engineering, QA, PM?

| Score | Meaning |
|---|---|
| 0.5 | Half a month (one sprint) |
| 1 | One month |
| 3 | One quarter (3 months) |
| 6 | Two quarters or more |

Include the full team cost, not just engineering.

---

### Worked Example

Say you're a PM at a D2C brand and have four feature requests on the table:

| Feature | Reach | Impact | Confidence | Effort | RICE Score |
|---|---|---|---|---|---|
| Checkout address autofill | 6,000 | 2 | 80% | 1 | **9,600** |
| Dark mode | 15,000 | 0.5 | 50% | 2 | **1,875** |
| Loyalty point redemption | 2,500 | 3 | 50% | 6 | **625** |
| Faster search (reduce latency) | 10,000 | 2 | 80% | 3 | **5,333** |

**Ranking:** Address autofill → Faster search → Dark mode → Loyalty redemption

The loyalty program *felt* big. RICE revealed it had a poor Reach-to-Effort ratio at this stage. That's an honest, defensible conversation.

---

## Common Pitfalls

**Inflating scores on your pet feature.** RICE only works if you're calibrated. Align with your team on what a "2" and a "3" actually look like before scoring.

**Ignoring strategic alignment.** A feature with a high RICE score that doesn't fit the current quarter's strategy should still be deprioritised. RICE ranks within a strategy — it doesn't replace strategic judgement.

**Treating it as the final word.** RICE surfaces what to debate, not what to build. Use it to structure the conversation, not end it.

**Comparing across wildly different scope.** Don't RICE a two-day bug fix against a six-month platform migration. Bucket by rough size first, then score within buckets.

---

## When Not to Use RICE

RICE works well for feature-level decisions. It's the wrong tool for:

- Platform or architectural decisions (too many unknowns in effort)
- "Should we build this entirely new product?" (use a different framework, like a business case or opportunity assessment)
- Decisions that are primarily about brand or positioning (those don't score well numerically)

---

## Real-World Example

**Razorpay's dashboard redesign (2022)**

Razorpay's product team faced competing requests: merchants wanted a redesigned analytics dashboard, the engineering team wanted to refactor the payments SDK, and sales wanted a bulk-payment feature for enterprise clients.

RICE analysis:

- Bulk payment feature for enterprise: Reach = low (enterprise only, ~200 accounts), Impact = 3 (critical for those accounts), Confidence = 90% (direct sales feedback), Effort = 4 months → Score: **135**
- Dashboard redesign: Reach = high (all ~500k merchants), Impact = 1 (quality of life), Confidence = 70%, Effort = 3 months → Score: **117**
- SDK refactor: Reach = all merchants indirectly, Impact = 0.5 (invisible to end users), Confidence = 100%, Effort = 6 months → Score: **42**

Bulk payments won the quarter. The SDK refactor was scheduled as tech debt for the following quarter with a dedicated engineer.

---

## Practice Case

**Scenario:** You're PM at a HealthTech startup building a doctor consultation app. You have 3 engineers for the next quarter and the following backlog:

1. In-app prescription download (patients request it constantly in support tickets)
2. Multi-doctor household profiles (requested by a few power users)
3. Video consultation quality improvements (engineering found a 40% drop rate on 4G)
4. Insurance coverage checker before booking (sales team thinks this will drive enterprise deals)

Apply RICE to rank them. What data would you need to fill in the confidence scores? What would you build first and why?

---

## Go Deeper

- **[Intercom's RICE article](https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/)** — the original post where the framework was introduced
- **[Lenny's Newsletter: How to prioritise](https://www.lennysnewsletter.com)** — comparison of RICE vs ICE vs opportunity scoring
- **[Mind the Product: Prioritisation techniques](https://www.mindtheproduct.com/tag/prioritization/)** — multiple frameworks compared with real PM examples
