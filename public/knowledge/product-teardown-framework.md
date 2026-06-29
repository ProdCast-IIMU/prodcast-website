# Product Teardown Framework

> A systematic way to deconstruct any product — to understand its strategy, its user psychology, and why it does or doesn't work.

## What is it?

A product teardown is a structured analysis of an existing product from a PM's perspective. Unlike a UX review (which focuses on usability) or a business case (which focuses on financials), a teardown cuts across all layers: strategy, user motivation, core mechanics, UX decisions, and monetisation.

Done well, a teardown is one of the best ways to develop product intuition — the ability to look at a product and immediately understand why it was built a certain way and what trade-offs the team made.

## Where is it used?

- PM interviews: "Critique this product" or "How would you improve [X]?"
- Competitor analysis before entering a new market
- Onboarding to a new PM role (tear down your own product to understand it)
- Personal practice — most senior PMs tear down 1–2 products a week
- MBA case presentations and product strategy projects

## How it Works

Use these five lenses in order. Each layer informs the next.

---

### 1. The Core Loop

Every successful product has a repeating behaviour loop at its centre. Before analysing anything else, identify it:

**Action → Reward → Motivation to Return → Action Again**

Examples:
- **Instagram:** Post content → Get likes/comments → Feel rewarded → Post more
- **Duolingo:** Complete a lesson → Maintain streak → Fear of breaking it → Complete another lesson tomorrow
- **LinkedIn:** Update profile → Get connection requests → Professional validation → Update profile again
- **Zepto:** Order groceries → Get them in 10 minutes → Trust builds → Order again faster next time

If the core loop is broken, the product will fail regardless of how good the UX is. Test it first: can you complete the core loop in one session? How many steps does it take?

---

### 2. User Motivation and Psychology

What brings users to this product, and what keeps them there? Go beyond "it's useful":

**Initial hook:** What solved a problem painful enough to make someone try this?

**Retention mechanics:** What makes users come back without being asked?
- Habit triggers (external: notifications; internal: boredom, anxiety, aspiration)
- Investment (the more you use it, the more personalised/valuable it becomes — Spotify's taste graph, Notion's workspace, LinkedIn's network)
- Social obligation (your friends are on it; leaving would mean losing access to something)

**The "jobs" layer:** What job is the user actually hiring this product to do? (See: JTBD article)

---

### 3. Friction Analysis

Identify moments of high friction in the core flows, and ask: was this intentional?

**Good friction** slows users down before a consequential action:
- "Are you sure you want to send ₹50,000?" confirmation screens
- A progress bar on a multi-step form that makes effort feel worth it
- A checkout review page before finalising a purchase

**Bad friction** blocks users from getting value with no good reason:
- Five-step signup to read a single article
- Mandatory phone number before showing prices
- Every session requiring re-authentication

Document the three highest-friction moments in a flow. Then ask: is this friction serving the user, serving the business (for the wrong reasons), or simply the result of technical debt or poor design decisions?

---

### 4. Monetisation Engine

How does this product make money, and does the business model align with user interests?

| Model | How it works | Tension with users |
|---|---|---|
| Subscription (SaaS) | Flat recurring fee | Low tension — company wants users to get value to retain them |
| Marketplace (take rate) | % cut of transactions | Medium — company wants volume, may sacrifice quality |
| Advertising | Sell user attention | High — company's customer is the advertiser, not the user |
| Freemium | Free tier + paid upgrade | Variable — depends on whether the free tier is genuinely useful |
| Transactional | Pay per use | Low — aligns cost with value |

The most important question: **does the monetisation model create incentives that work against the user?** Ad-supported social media platforms profit when users are more engaged, even if that engagement is anxiety-inducing. Subscription models profit when users renew, which only happens if they're getting value. The model shapes everything.

---

### 5. What's Missing and Why

This is the synthesis. Based on your analysis:

- What user need is clearly unmet despite being in scope?
- What feature exists that probably shouldn't (too expensive, low value, anti-user)?
- What constraint is the team likely operating under that explains a seemingly bad decision?
- If you were the PM, what is the one thing you'd change and why?

This is the answer to "How would you improve this product?" in an interview. Do not skip to this layer. Interviewers can tell when you've skipped the analysis.

---

## Real-World Example

**Teardown: CRED (as of 2023)**

**Core loop:** Pay credit card bills → Earn CRED coins → Spend coins on curated rewards/offers → Stay engaged for next billing cycle

**User motivation:** Primary job: "Pay my credit card bill in one place without switching between 5 apps." Retention mechanic: CRED coins create an investment — leaving means losing an accumulated balance. The social job is also strong: CRED explicitly signals exclusivity (invite-only for high credit scores), which makes membership feel like a status marker.

**Friction analysis:**
- Good: CRED shows your credit score trend, which keeps users checking monthly even when they don't have a bill due
- Bad: Coin redemption UX is confusing — the value of coins vs. the effort to redeem is opaque to most users; this is friction that doesn't serve the user

**Monetisation:** CRED makes money from brands paying for featured offers, loan products, and now rent/e-commerce. The tension: brands want conversion, which can create pressure toward cluttered, promotional UX that degrades the "curated" feel that makes CRED premium.

**What's missing:** A clear "what are my coins worth in rupees?" answer at any point in the app. Users hoard coins they don't use because the conversion rate is hidden. This likely reduces redemption and increases perceived coin value — but at the cost of users not using the core rewards loop.

---

## Practice Case

**Your teardown assignment:** Choose any one app you use regularly. Do a 20-minute teardown using the five lenses:

1. Draw the core loop in one diagram.
2. Identify one piece of "good friction" and one piece of "bad friction" in the first-time user flow.
3. Name the user's primary job (functional + emotional layer).
4. Describe the monetisation model and whether it aligns with user interests.
5. Propose one change. Define a metric that would tell you if the change worked.

Come prepared to walk through this in a 10-minute mock PM interview.

---

## Go Deeper

- **[Stratechery by Ben Thompson](https://stratechery.com)** — the gold standard of product and business strategy teardowns; read his analyses of Apple, Google, and Meta to understand how business models shape product decisions
- **[Lenny's Newsletter: How to do a product teardown](https://www.lennysnewsletter.com)** — format for structured teardowns in interviews
- **[Product Hunt teardowns](https://www.producthunt.com)** — read the comment threads on top products; PMs leave detailed observations
- **[Sachin Rekhi's product reviews](https://www.sachinrekhi.com)** — deep teardowns of consumer apps with PM annotations
