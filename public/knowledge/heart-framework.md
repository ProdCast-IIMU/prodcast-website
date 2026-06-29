# Google's HEART Framework

> Five dimensions for measuring user experience at scale — so you stop optimising for vanity metrics.

## What is it?

HEART was developed by Google researchers Kerry Rodden, Hilary Hutchinson, and Xin Fu to give product teams a structured way to measure UX quality — particularly on products at massive scale where traditional usability testing can't keep up.

**HEART** = **H**appiness · **E**ngagement · **A**doption · **R**etention · **T**ask Success

It's typically used alongside the **Goals–Signals–Metrics (GSM)** method, which forces you to define *what you want to achieve* before choosing which metric to track.

## Where is it used?

- Defining success metrics for a new feature before shipping
- PM interviews: "How would you measure UX quality for this product?"
- OKR-setting sessions to move beyond surface-level KPIs
- Post-launch retrospectives to evaluate whether a redesign actually improved the experience
- B2B SaaS products where traditional engagement metrics (DAU) don't capture real usage

## How it Works

### H — Happiness

How do users *feel* about your product? This is qualitative signal measured at scale.

- NPS (Net Promoter Score): "How likely are you to recommend us to a colleague?"
- CSAT (Customer Satisfaction Score): post-task or post-interaction surveys
- App store ratings and review sentiment
- In-app sentiment pulse ("Was this helpful?")

**The trap:** A heavily-used product can still score low on happiness. Tax filing software gets used every year and is universally dreaded. Don't confuse usage with satisfaction.

---

### E — Engagement

How deeply and frequently are users interacting with your product?

- Sessions per user per week
- Actions per session (depth of a single visit)
- Feature adoption rate (% of users who have used Feature X at least once)
- Content consumption rate (for media/content products)

**Watch out:** Engagement without retention is a red flag. If users engage once and vanish, you have an itch-scratch problem, not a product that delivers ongoing value.

---

### A — Adoption

Are new users discovering and using the product — or a specific new feature?

- New user signups per period
- Feature adoption rate among eligible users (did they try the new thing?)
- Time to first key action (how quickly do users reach the moment of value?)
- Onboarding completion rate

**The insight:** High install-to-signup conversion with low feature adoption usually means an onboarding failure, not a feature quality problem. Fix the path, not the feature.

---

### R — Retention

Are users coming back?

- Day 1, Day 7, Day 30 retention rates
- Monthly/weekly active user rate
- Cohort retention curves (how does retention evolve over time for a signup cohort?)
- Churn rate and resurrection rate (users who left and returned)

**Retention is the single most important metric for product-market fit.** If your retention curve flattens at a meaningful level, you have PMF. If it trends steadily to zero, you don't — regardless of how impressive your download numbers are.

---

### T — Task Success

Can users actually accomplish what they came to do?

- Task completion rate (for defined key tasks)
- Error rate during critical flows
- Time on task
- Search success rate (did the user find what they searched for, and did they click it?)

**This is especially critical for:** B2B tools, banking apps, healthcare apps, e-commerce checkout flows — any product where failing to complete a task has real consequences for the user.

---

### Goals–Signals–Metrics (GSM)

Before selecting which HEART dimension to focus on, use GSM:

| Step | Question | Example |
|---|---|---|
| **Goal** | What are you trying to improve? | Reduce frustration during checkout |
| **Signal** | What user behaviour indicates success? | Users completing checkout without abandoning or seeking help |
| **Metric** | How do you measure that signal at scale? | Checkout completion rate; error rate on payment page |

The sequence matters. If you start with a metric, you end up measuring what's easy to track, not what matters.

---

### Which Dimensions to Prioritise

| Product Type | Most Critical HEART Dimensions |
|---|---|
| Consumer social app | Engagement, Retention |
| B2B SaaS | Task Success, Adoption |
| E-commerce / Marketplace | Retention, Happiness, Task Success |
| Content / Media platform | Engagement, Retention |
| Utility / Financial tool | Task Success, Happiness |
| Growth-stage startup | Adoption, Retention |

---

## Real-World Example

**Duolingo applying HEART during the 2022 streak redesign**

Duolingo's core engagement mechanic is the learning streak. In 2022, they noticed a concerning pattern: users were maintaining streaks by doing the minimum (one easy exercise per day) rather than actually learning. Engagement metrics looked fine. Task Success was broken.

Their HEART analysis:
- **Happiness:** NPS was stable
- **Engagement:** High (streak maintenance behaviour)
- **Adoption:** New learners were starting — but the 14-day onboarding drop-off was steep
- **Retention:** Long-term retention was deceptively high (streak anxiety keeping users in)
- **Task Success:** Lesson completion rates for harder content were dropping

The fix: they redesigned the streak system to reward *meaningful* practice (time spent, XP earned on harder lessons) rather than just daily check-ins. Short-term engagement dipped slightly. Long-term retention improved, and CSAT scores rose as users felt they were actually making progress.

---

## Practice Case

**Scenario:** You're PM at PhonePe working on the UPI payments feature (the core product). Leadership wants a dashboard of metrics to track post a major app redesign. The redesign simplified the home screen and changed how users find their frequent contacts.

Using GSM + HEART:
1. Define one Goal for the redesign (what were you trying to improve for users?).
2. For Task Success: what is the key task, and what signal would tell you the redesign helped or hurt?
3. The redesign has been live for 3 weeks. Day-7 retention is flat. Engagement (sessions per week) is up 12%. What story might this tell, and what would you investigate next?

---

## Go Deeper

- **[Original HEART paper by Google](https://research.google/pubs/measuring-the-user-experience-on-a-large-scale-user-research-on-google-apps/)** — the primary source; short, readable, and surprisingly practical
- **[Lenny's Newsletter: The metrics that matter](https://www.lennysnewsletter.com)** — how modern PMs adapt HEART to their specific context
- **[Nielsen Norman Group on UX metrics](https://www.nngroup.com/articles/ux-metrics/)** — deep dive into measuring UX quality beyond satisfaction scores
