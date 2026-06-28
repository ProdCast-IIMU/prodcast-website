# Root Cause Analysis for PMs

When a metric drops, a feature underperforms, or a user complaint spikes — the worst thing a PM can do is react to the symptom. Root Cause Analysis (RCA) is the discipline of finding what actually broke, not just what looks broken.

---

## The 5 Whys Technique

Developed by Toyota as part of the Toyota Production System, the 5 Whys is deceptively simple: keep asking "why" until you reach the root cause.

**Rule:** Each answer becomes the input to the next "why."

**Example — Metric Drop:**

> **Problem:** Daily active users dropped 18% last Monday.
>
> **Why 1:** Why did DAUs drop?
> Because fewer users completed onboarding.
>
> **Why 2:** Why did fewer users complete onboarding?
> Because the email verification step saw a 40% drop-off.
>
> **Why 3:** Why did email verification drop off?
> Because verification emails were landing in spam.
>
> **Why 4:** Why were they landing in spam?
> Because our sending domain's SPF record was misconfigured during a DNS update.
>
> **Why 5:** Why was the SPF record misconfigured?
> Because there was no review checklist for DNS changes.
>
> **Root cause:** Missing process — no DNS change review checklist.
> **Fix:** Not "fix the SPF record" (that's symptom treatment) — it's "create a DNS change review process."

---

## The Metric Decomposition Method

When a top-line metric drops, decompose it into its component parts to isolate where the problem is.

**Example — Revenue Drop:**

```
Revenue = Users × Conversion Rate × Average Order Value
         ↓            ↓                    ↓
     Segment       Funnel steps         Pricing mix
     by source     (Step 1, 2, 3...)    by category
```

Walk down each branch until you find which sub-metric moved. Then investigate *that* specifically.

**Segmentation axes to always check:**
- Platform (iOS vs Android vs Web)
- Geography (India vs International)
- User cohort (new vs returning)
- Traffic source (organic vs paid vs referral)
- Device type (mobile vs desktop)

---

## The Ishikawa (Fishbone) Diagram

For complex problems with multiple potential causes, use a fishbone diagram. It organises potential causes into categories:

```
                    ↗ People
                   ↗ Process
Problem ←←←←←←←←←← Product
                   ↘ Technology
                    ↘ External factors
```

Brainstorm potential causes in each category, then gather data to confirm or eliminate each one.

---

## A PM's RCA Checklist

When a metric drops, work through this in order:

**1. Confirm it's real**
- Is it a data pipeline issue or a real product issue?
- Check your analytics tool's data freshness
- Compare multiple data sources

**2. Bound the problem**
- When did it start? (Exact timestamp)
- What changed at that time? (Deployments, campaigns, external events)
- How widespread is it? (All users or a segment?)

**3. Generate hypotheses**
- List every plausible cause
- Don't eliminate hypotheses before checking data

**4. Test hypotheses with data**
- Prioritise by likelihood × ease of verification
- Use funnel analysis, segmentation, session recordings

**5. Identify the root cause**
- Keep asking "why" until you reach a fixable systemic cause
- Distinguish correlation from causation

**6. Fix and monitor**
- Implement the fix
- Define what "back to normal" looks like
- Set up an alert so this doesn't happen silently again

---

## RCA in PM Interviews

When asked "a metric dropped X% — walk me through how you'd diagnose it," interviewers want to see:

1. **Clarification** — Is the data trustworthy? What period?
2. **Segmentation** — Where is the drop concentrated?
3. **Hypothesis generation** — Internal changes? External events?
4. **Structured drilling** — Funnel decomposition, 5 Whys
5. **Root cause + fix** — Not just what broke, but why the system allowed it to break

*The best PMs distinguish between the proximate cause (the SPF record) and the root cause (the missing review process).*
