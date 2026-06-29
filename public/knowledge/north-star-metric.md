# The North Star Metric

> The single number that captures the core value your product delivers — and aligns every team around moving it.

## What is it?

A North Star Metric (NSM) is the one metric your entire product team optimises for. It's the measure that, when it goes up, revenue follows — because it reflects real value delivered to real users, not just activity.

The NSM sits above all other metrics. Below it, you build a tree of input metrics: levers different teams can pull to move the NSM.

## Where is it used?

- Setting company-level product strategy at the start of a year/quarter
- Aligning cross-functional teams (growth, engineering, design) around one goal
- PM interviews: "How would you measure the success of this product?"
- Annual planning and OKR-setting sessions
- Investor pitches — the NSM tells the story of your product's health better than revenue alone

## How it Works

### The Three Tests

A valid NSM must pass all three:

1. **It measures value delivered to the user** — not revenue, not page views, not downloads
2. **It predicts long-term business health** — when it goes up, retention and revenue follow
3. **It's actionable** — different teams can run experiments that directly move it

If your "NSM" is just revenue, you've failed test 1. Revenue is a *result* of value, not value itself. Teams optimising for revenue without this constraint will extract short-term value while destroying long-term trust.

---

### Finding Your NSM

**Step 1 — Define your core value exchange.** When does a user *actually* get value from your product? Not when they sign up. Not when they open the app. The moment of value.

- Spotify: when music is playing
- Swiggy: when food arrives at the door
- LinkedIn: when a connection leads to a real opportunity
- Duolingo: when a user completes a daily lesson and builds a streak

**Step 2 — Express it as a rate or frequency.** Cumulative totals always go up and tell you nothing. What matters is whether *ongoing* value is being delivered.

- ❌ Total orders placed (cumulative, always increases)
- ✅ Weekly orders per retained user (shows ongoing value)

**Step 3 — Test all three criteria.** If it fails even one, dig deeper.

---

### Famous NSMs

| Company | North Star Metric |
|---|---|
| Spotify | Time spent listening per monthly active user |
| Airbnb | Nights booked |
| Slack | Messages sent per active team |
| Netflix | Hours of content watched per subscriber |
| Duolingo | Daily active users completing a lesson |
| WhatsApp | Messages sent per day |
| Zepto | Orders delivered under 10 minutes |
| Swiggy | Repeat orders per retained user per month |

---

### The NSM Tree

The NSM alone doesn't tell you *what to do*. The metric tree below it does.

```
North Star Metric
├── Acquisition (new users reaching activation)
│   ├── Install-to-signup rate
│   └── Signup-to-first-order rate
├── Activation (users experiencing core value)
│   ├── Time to first order
│   └── First-order completion rate
└── Retention (users coming back)
    ├── Day-7 retention rate
    ├── Day-30 retention rate
    └── Reorder frequency (Week 2 vs Week 1)
```

Each team owns one branch. The NSM holds them all accountable.

---

### Common Mistakes

**Using revenue as the NSM.** Revenue follows value — it doesn't create it. A product that tricks users into paying once while delivering no value will show high revenue briefly and collapse retention.

**Picking a gameable metric.** If your NSM is "total sessions," opening and closing the app counts as a session. Teams will inflate the number without delivering value.

**Nobody owns it.** The NSM must have a team (or sub-metric) with explicit ownership. If it's everyone's job, it's no one's job.

**Never revisiting it.** As products mature, the core value exchange can shift. Assess your NSM annually.

---

## Real-World Example

**Hotstar's transition from views to watch-time (2019–2021)**

When Hotstar moved beyond cricket to original content and licensed shows, their NSM shifted from *monthly active users* to *average watch time per subscriber per week*.

The old NSM (MAU) was being gamed: users logged in for IPL highlights, counted as "active," but churned the moment cricket season ended. Retention was catastrophic.

By switching to watch-time per subscriber, every team's priorities changed. The content team focused on binge-worthy series. The product team built continue-watching and autoplay features. Personalisation got serious investment. Within 12 months, subscriber churn in non-cricket months dropped by ~30%.

---

## Practice Case

**Scenario:** You're a PM at CRED, the bill-payment and rewards app. CRED's core users are high-income credit card holders. Their current NSM is "monthly transactions on the CRED platform."

1. Does this NSM pass all three tests? Argue both sides.
2. CRED has expanded into loans, rent payment, and travel booking. Should the NSM change to reflect this, or stay product-specific?
3. Propose an alternative NSM and build the first level of the metric tree beneath it.

---

## Go Deeper

- **[Lenny Rachitsky's breakdown of North Star Metrics](https://www.lennysnewsletter.com/p/north-star-metric)** — the most thorough analysis available, with 40+ company examples
- **[Reforge: Metrics and tracking for PMs](https://www.reforge.com/blog/north-star-metric)** — framework-first explanation with team alignment tactics
- **[Amplitude's North Star Playbook](https://amplitude.com/north-star)** — free downloadable guide, heavily practical
- **Inspired by Marty Cagan** (book) — Chapter on product vision and strategy covers NSM in context of roadmap design
