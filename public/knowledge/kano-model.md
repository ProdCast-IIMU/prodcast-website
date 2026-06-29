# The Kano Model

> Not all features satisfy users equally. The Kano Model explains why some features cause zero delight, why others cause disproportionate delight, and why last year's delight is this year's basic expectation.

## What is it?

The Kano Model was developed by Professor Noriaki Kano in 1984 to help teams understand the relationship between feature quality and user satisfaction. Its central insight is that features fall into distinct categories — and treating all features as equal is a prioritisation mistake.

The model is particularly useful for avoiding the trap of over-investing in features that users will never notice, or under-investing in features whose absence will cause a catastrophic drop in satisfaction.

## Where is it used?

- Feature prioritisation before a planning cycle
- User research to classify existing and proposed features
- Roadmap design to balance "keep the lights on" basics vs. innovation
- PM interviews: "How do you decide which features to invest in?"
- Product strategy discussions about what makes a product premium vs. commodity

## How it Works

### The Five Feature Categories

**1. Basic Needs (Must-Haves)**
Features so fundamental that their absence causes extreme dissatisfaction — but their presence goes completely unnoticed. Users never thank you for these. They destroy you without them.

- A ride-hailing app that shows you the driver's location
- A banking app that doesn't lose your money
- An e-commerce site with a working search bar

You cannot delight users with basic needs. You can only fail them.

---

**2. Performance Needs (More = Better)**
Features where more quality linearly increases satisfaction. Users consciously ask for these in surveys.

- Battery life on a phone
- Delivery speed on Swiggy or Zepto
- Call quality on a video conferencing tool

These are the most predictable category. More → better. Invest based on your competitive gap.

---

**3. Delighters (Excitement Features)**
Features users don't expect and don't ask for — but when present, cause disproportionate delight. Their absence causes *no* dissatisfaction because users didn't know to expect them.

- Spotify Wrapped (an annual surprise that generates millions in organic social posts)
- iPhone's original pinch-to-zoom gesture (nobody asked for it)
- Zomato's "Ordering for someone special?" feature on Valentine's Day

A small delighter can generate more loyalty and word-of-mouth than a significant performance improvement. Pick 1–2 per cycle. Protect the surprise.

---

**4. Indifferent Features**
Features that cause neither satisfaction nor dissatisfaction regardless of whether they're present. These are resource sinks.

- The exact shade of the checkout button
- How many server locations a VPN uses (for most non-technical users)
- The animation style on a confirmation screen

Stop building these. Every hour spent here is an hour not spent on basics or delighters.

---

**5. Reverse Features**
Features that actively cause dissatisfaction when present. Sometimes the best product decision is removal.

- Autoplay video with sound on a news site
- Forced account creation before a first purchase
- Push notifications you didn't ask for
- Mandatory ratings prompts at inopportune moments

Run a regular "what should we remove?" session alongside your "what should we build?" sessions.

---

### The Time Decay of Delighters

The most important Kano insight that most teams miss: **delighters decay into basics over time.**

- 2007: Multi-touch gestures on the original iPhone were magic (delighter)
- 2012: The absence of multi-touch on any device was inexcusable (basic need)

- 2018: Free same-day delivery was a remarkable Amazon Prime differentiator (delighter)
- 2023: Users expect same-day as a baseline from any major e-commerce platform (basic need)

- 2019: 10-minute grocery delivery was a fantasy (not even a delighter — seemed impossible)
- 2022: Zepto and Blinkit made it a delighter
- 2025: A growing segment of urban users considers it a basic need

**The implication:** You must continuously invest in new delighters while relentlessly maintaining basics. Resting on yesterday's innovation is how you become a commodity.

---

### Running a Kano Survey

For each proposed feature, ask users two questions:

**Functional form:** "How would you feel if this feature *was* present?"
**Dysfunctional form:** "How would you feel if this feature *was not* present?"

Response scale: Delighted / I expect it / Neutral / I can live with it / Dislike it

Map the paired responses to classify each feature. Features that generate "Delighted" on functional + "Neutral" on dysfunctional = classic Delighter. Features that generate "I expect it" on functional + "Dislike it" on dysfunctional = Basic Need.

---

### Applying Kano to Prioritisation

| Category | Prioritisation Logic |
|---|---|
| Basic Needs | Ship immediately. Non-negotiable. |
| Performance Needs | Invest proportional to competitive gap |
| Delighters | Pick 1–2 per cycle. Protect the surprise. |
| Indifferent | Cut ruthlessly. Redirect that capacity. |
| Reverse | Remove. Not "deprioritise." Remove. |

---

## Real-World Example

**Zepto's delivery tracking experience (2022–2023)**

When Zepto entered the quick-commerce market, live delivery tracking was a basic need — users expected it from day one (Swiggy and Zomato had trained this expectation). Zepto's challenge was to find delighters that could differentiate without competing on features users already took for granted.

Their insight from JTBD interviews: users' biggest anxiety wasn't "where is my order?" It was "is my order actually correct?" A missing item at 11pm when you wanted milk for tomorrow's coffee was genuinely stressful.

Their delighter: a "picker preview" — a photo of your packed bag taken by the dark store picker before dispatch, visible in-app. Users hadn't asked for it. Nobody else offered it. The reaction was disproportionate — NPS jumped 9 points in the cohort that saw it. Within 12 months, competitors started building similar features. It was already decaying toward a basic need.

---

## Practice Case

**Scenario:** You're PM at a B2B SaaS company (think: accounting software for SMBs in India). You're planning your next quarter's roadmap and have the following candidate features from your backlog:

1. GST filing integration (currently handled by export → manual upload elsewhere)
2. Dark mode
3. Automatic payment reminders to clients (via WhatsApp)
4. Monthly "financial health score" report
5. Multi-user access with role-based permissions

Classify each feature using Kano. Which category does each fall into for your primary user (a founder with 5–20 employees)? Which would you build first, and which would you cut entirely?

---

## Go Deeper

- **[Kano Model: Original paper by Noriaki Kano](https://www.tandfonline.com/doi/abs/10.1080/08823668.1984.11336892)** — dense but the primary source if you want to understand the research base
- **[Mind the Product: Using Kano for roadmapping](https://www.mindtheproduct.com/kano-model/)** — practical implementation guide with a real product team case study
- **[Product Talk: Combining Kano with discovery](https://www.producttalk.org)** — Teresa Torres on integrating Kano into continuous discovery
