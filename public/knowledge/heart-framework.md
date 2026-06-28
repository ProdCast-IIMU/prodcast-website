# Google's HEART Framework for UX Metrics

HEART was developed by Google to measure the quality of user experience at scale. It gives PMs a structured way to move beyond vanity metrics like DAU and actually measure whether users are getting value.

---

## The Five Dimensions

### H — Happiness
How do users feel about your product?

- User satisfaction scores (CSAT)
- Net Promoter Score (NPS)
- App store ratings and reviews
- In-app sentiment surveys

*Happiness metrics are subjective but essential. A product can be heavily used and still be hated — think tax filing software.*

---

### E — Engagement
How often and deeply are users interacting?

- Sessions per user per week
- Actions per session (depth of engagement)
- Content consumption rate
- Feature adoption rate

*Engagement without retention is a red flag. If users engage once and vanish, you have an interest problem, not a product problem.*

---

### A — Adoption
Are new users discovering and using the product or a new feature?

- New user signups per period
- Feature adoption rate (% of users who tried Feature X)
- Time to first key action
- Onboarding completion rate

*Adoption measures the top of the funnel. High acquisition with low adoption signals an onboarding failure.*

---

### R — Retention
Are users coming back?

- Day 1, Day 7, Day 30 retention rates
- Churn rate
- Resurrection rate (users who left and came back)
- Cohort retention curves

*Retention is the single most important metric for product-market fit. If retention is flat at a meaningful level, you have PMF. If it trends to zero, you don't.*

---

### T — Task Success
Can users accomplish what they came to do?

- Task completion rate
- Error rate during key flows
- Time on task
- Search success rate (did the user find what they searched for?)

*Task success is especially critical for utility products — banking apps, B2B tools, search engines.*

---

## The Goals-Signals-Metrics (GSM) Framework

HEART is best used with GSM:

| Step | Question |
|---|---|
| **Goal** | What are you trying to improve for the user? |
| **Signal** | What user behaviour indicates you've succeeded? |
| **Metric** | How do you measure that signal at scale? |

**Example:**
- **Goal:** Reduce frustration during checkout
- **Signal:** Users completing checkout without abandoning
- **Metric:** Checkout completion rate; error rate on payment step

---

## Choosing the Right Dimensions

Not all five dimensions apply to every product:

| Product Type | Most Important |
|---|---|
| Consumer social app | Engagement, Retention |
| B2B SaaS | Task Success, Adoption |
| Marketplace | Retention, Happiness |
| Content platform | Engagement, Retention |
| Utility tool | Task Success, Happiness |

---

## HEART vs. Vanity Metrics

| Vanity Metric | HEART Alternative |
|---|---|
| Total downloads | Day 30 retention |
| Page views | Engagement depth |
| Registered users | Active users completing core action |
| 5-star reviews | NPS with verbatim comments |

*If a metric doesn't change how you'd build the product, it's probably vanity.*
