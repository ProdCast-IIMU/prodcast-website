# RICE: A Framework for Prioritising Features

Every PM faces the same problem: too many ideas, too little time. RICE gives you a repeatable, defensible way to rank features against each other and kill the debate over gut-feel prioritisation.

---

## The Formula

**RICE Score = (Reach × Impact × Confidence) / Effort**

---

## Breaking Down Each Factor

### R — Reach
*How many users will this affect in a given time period?*

Express as **number of users per quarter** (or whatever period makes sense).

- Be specific: "This will affect users who hit the checkout page" — not "all users"
- Use real data from analytics where possible

*Example: 4,000 users per quarter reach the checkout abandonment point this addresses*

---

### I — Impact
*How much will this move the needle for each user it reaches?*

Score on a fixed scale:
| Score | Meaning |
|---|---|
| 3 | Massive impact |
| 2 | High impact |
| 1 | Medium impact |
| 0.5 | Low impact |
| 0.25 | Minimal impact |

This is where honest calibration matters. Don't give everything a 3.

---

### C — Confidence
*How sure are you about your Reach and Impact estimates?*

| Score | Meaning |
|---|---|
| 100% | Strong data (user research + analytics) |
| 80% | Some data (qualitative signals) |
| 50% | Mostly a hunch |

Confidence is a forcing function for intellectual honesty. If you have no data, you should be at 50% or lower.

---

### E — Effort
*How many person-months will this take across all functions?*

Include design, engineering, QA, and PM time.

| Score | Meaning |
|---|---|
| 0.5 | Half a month |
| 1 | One month |
| 3 | One quarter |

---

## Worked Example

| Feature | Reach | Impact | Confidence | Effort | RICE Score |
|---|---|---|---|---|---|
| Checkout autofill | 4,000 | 2 | 80% | 1 | **6,400** |
| Dark mode | 10,000 | 0.5 | 50% | 2 | **1,250** |
| Loyalty rewards | 2,000 | 3 | 50% | 6 | **500** |
| Faster search | 8,000 | 2 | 80% | 3 | **4,267** |

**Ranking:** Checkout autofill → Faster search → Dark mode → Loyalty rewards

---

## RICE Pitfalls

**Pitfall 1: Inflating scores on your favourite feature**
The framework only works if you're honest. Calibrate your scales across the team.

**Pitfall 2: Ignoring strategic alignment**
A feature with a high RICE score that doesn't fit the current strategy should still be deprioritised. RICE ranks *within* a strategy; it doesn't replace strategy.

**Pitfall 3: Treating it as the final word**
RICE surfaces what to debate, not what to build. Use it to structure the conversation, not end it.

**Pitfall 4: Comparing across very different scope levels**
Don't RICE a one-day bug fix against a six-month platform rebuild. Bucket by size first.

---

## Alternatives to RICE

| Framework | Best For |
|---|---|
| **ICE** (Impact × Confidence / Effort) | Smaller teams, faster decisions |
| **Kano Model** | Understanding feature delight vs. basics |
| **MoSCoW** | Stakeholder-driven scope decisions |
| **Opportunity Scoring** | Identifying underserved user needs |
| **Value vs. Complexity 2×2** | Visual, quick prioritisation workshops |
