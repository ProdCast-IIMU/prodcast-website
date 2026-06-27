// ============================================================
//  ProdCast – IIM Udaipur  |  DATA FILE
//  Edit this file to update all website content
// ============================================================

const CLUB_STATS = [
  { number: 15, label: "Events" },
  { number: 5,  label: "Competitions" },
  { number: 50, label: "Members" },
  { number: 2,  label: "Years Active" },
];

// ─── ROADMAP ────────────────────────────────────────────────
const ROADMAP = [
  {
    quarter: "Q1 · Jul – Sep 2024",
    items: [
      {
        title: "Club Induction & Orientation",
        desc: "Welcomed 50+ new members with an immersive orientation covering PM basics, club vision, and upcoming calendar.",
        status: "done",
        date: "Aug 2024",
      },
      {
        title: "PM 101 Workshop Series",
        desc: "3-part workshop series on PM fundamentals — user research, roadmapping, and go-to-market strategy.",
        status: "done",
        date: "Sep 2024",
      },
      {
        title: "ProdCast Website Launch",
        desc: "Official launch of ProdCast's digital presence to share resources and updates with the student community.",
        status: "done",
        date: "Sep 2024",
      },
    ],
  },
  {
    quarter: "Q2 · Oct – Dec 2024",
    items: [
      {
        title: "ProdThon 2024 Hackathon",
        desc: "48-hour product hackathon with 15 teams competing to solve a real-world product challenge across 3 tracks.",
        status: "done",
        date: "Oct 2024",
      },
      {
        title: "ProdNew Instagram Series Launch",
        desc: "Launched our weekly product insights content series bringing PM frameworks and case studies to Instagram.",
        status: "done",
        date: "Nov 2024",
      },
      {
        title: "Industry Speaker Series – Episode 1",
        desc: "Exclusive AMA with a Senior PM at a top tech company — career transitions, day-in-the-life, and advice for MBA students.",
        status: "done",
        date: "Dec 2024",
      },
    ],
  },
  {
    quarter: "Q3 · Jan – Mar 2025",
    items: [
      {
        title: "Case Study Competition",
        desc: "Inter-college product case study competition with industry mentors as judges.",
        status: "inprogress",
        date: "Feb 2025",
      },
      {
        title: "PM Frameworks Library",
        desc: "Building a comprehensive digital reference library of product management frameworks for student use.",
        status: "inprogress",
        date: "Mar 2025",
      },
      {
        title: "Alumni Connect Session",
        desc: "Virtual networking session with ProdCast alumni now working in top product roles at leading companies.",
        status: "planned",
        date: "Mar 2025",
      },
    ],
  },
  {
    quarter: "Q4 · Apr – Jun 2025",
    items: [
      {
        title: "Annual PM Summit",
        desc: "Full-day product management conference with expert panels, workshops, and networking opportunities.",
        status: "planned",
        date: "May 2025",
      },
      {
        title: "ProdCast Research Publication",
        desc: "Releasing our first annual report on emerging PM trends, frameworks, and industry insights.",
        status: "planned",
        date: "Jun 2025",
      },
      {
        title: "Cross-College Collaboration",
        desc: "Joint event with PM clubs from other top B-schools across India for a national-level competition.",
        status: "planned",
        date: "Jun 2025",
      },
    ],
  },
];

// ─── EVENTS ─────────────────────────────────────────────────
const EVENTS = [
  {
    title: "ProdThon 2024",
    type: "Hackathon",
    date: "October 2024",
    emoji: "🚀",
    gradient: "linear-gradient(135deg, #4338CA 0%, #06B6D4 100%)",
    desc: "A 48-hour product hackathon challenging teams to redesign a core feature of a top consumer app. 15 teams, 3 tracks — B2C, B2B & Social Impact.",
    participants: 60,
    tag: "Competition",
  },
  {
    title: "PM 101 Workshop Series",
    type: "Workshop",
    date: "September 2024",
    emoji: "📚",
    gradient: "linear-gradient(135deg, #0891B2 0%, #6366F1 100%)",
    desc: "A 3-part workshop on user research methodologies, product roadmapping, and go-to-market strategy for aspiring PMs.",
    participants: 80,
    tag: "Workshop",
  },
  {
    title: "Industry Speaker Series",
    type: "Speaker Session",
    date: "December 2024",
    emoji: "🎙️",
    gradient: "linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)",
    desc: "Exclusive AMA with a Senior PM from a FAANG company — covering career transitions, PM interviews, and life inside Big Tech.",
    participants: 120,
    tag: "Speaker",
  },
  {
    title: "Design Thinking Sprint",
    type: "Workshop",
    date: "November 2024",
    emoji: "🎨",
    gradient: "linear-gradient(135deg, #059669 0%, #06B6D4 100%)",
    desc: "A full-day design thinking sprint using Stanford d.school methodology — teams ideated solutions for real student-facing problems.",
    participants: 45,
    tag: "Workshop",
  },
  {
    title: "Mock PM Interview Clinic",
    type: "Workshop",
    date: "January 2025",
    emoji: "🎯",
    gradient: "linear-gradient(135deg, #DC2626 0%, #F97316 100%)",
    desc: "Intensive mock interview sessions simulating real PM interviews with peer feedback and coaching from ProdCast alumni.",
    participants: 35,
    tag: "Workshop",
  },
  {
    title: "Case Study Competition",
    type: "Competition",
    date: "February 2025",
    emoji: "📊",
    gradient: "linear-gradient(135deg, #B45309 0%, #F59E0B 100%)",
    desc: "Inter-college product case study competition where teams tackle real PM interview cases, judged by industry professionals.",
    participants: 40,
    tag: "Competition",
  },
];

// ─── WINNERS ────────────────────────────────────────────────
const WINNERS = [
  {
    competition: "ProdThon 2024",
    winner: "Team Nova",
    members: ["Arjun Patel", "Shreya Kapoor", "Manav Singh"],
    achievement: "1st Place – Best Product Strategy",
    prize: "₹25,000 + Mentorship",
    desc: "Redesigned Swiggy's subscription model to increase user retention by 40% using behavioral economics and tiered value props.",
    emoji: "🥇",
    gradient: "linear-gradient(135deg, #B45309, #F59E0B)",
  },
  {
    competition: "ProdThon 2024",
    winner: "Team Catalyst",
    members: ["Priya Mehta", "Rohit Das"],
    achievement: "2nd Place – Best User Research",
    prize: "₹15,000",
    desc: "Created a B2B SaaS onboarding flow that reduced time-to-value from 14 days to 3 days through progressive disclosure.",
    emoji: "🥈",
    gradient: "linear-gradient(135deg, #475569, #94A3B8)",
  },
  {
    competition: "Case Study Cup 2024",
    winner: "Team Sigma",
    members: ["Vikram Nair", "Ananya Gupta", "Karan Shah"],
    achievement: "Winner – Strategy Track",
    prize: "₹20,000 + Internship Referral",
    desc: "Developed a market entry strategy for a fintech startup targeting rural Tier-3 markets with a phased distribution model.",
    emoji: "🏆",
    gradient: "linear-gradient(135deg, #4338CA, #06B6D4)",
  },
];

// ─── TEAM ────────────────────────────────────────────────────
const TEAM = {
  leadership: [
    {
      name: "Rahul Sharma",
      role: "President",
      batch: "MBA 2024–26",
      bio: "Former SDE at Flipkart. Passionate about 0→1 product building and consumer tech. Drives ProdCast's strategic direction and external partnerships.",
      linkedin: "#",
      avatar: "RS",
      gradient: "linear-gradient(135deg, #4338CA, #06B6D4)",
    },
    {
      name: "Priya Mehta",
      role: "Vice President",
      batch: "MBA 2024–26",
      bio: "Background in UX Research. Runs ProdCast's event calendar and speaker series. Obsessed with user interviews and Jobs-to-be-Done theory.",
      linkedin: "#",
      avatar: "PM",
      gradient: "linear-gradient(135deg, #7C3AED, #EC4899)",
    },
  ],
  core: [
    {
      name: "Arjun Patel",
      role: "Head of Events",
      batch: "MBA 2024–26",
      bio: "Organizes all ProdCast competitions and workshops. Bringing structure and energy to every event.",
      linkedin: "#",
      avatar: "AP",
      gradient: "linear-gradient(135deg, #059669, #06B6D4)",
    },
    {
      name: "Sneha Kumar",
      role: "Head of Content",
      batch: "MBA 2025–27",
      bio: "Runs ProdNew and manages all content strategy. Crafting PM insights that resonate with students.",
      linkedin: "#",
      avatar: "SK",
      gradient: "linear-gradient(135deg, #0891B2, #6366F1)",
    },
    {
      name: "Vikram Singh",
      role: "Head of Strategy",
      batch: "MBA 2024–26",
      bio: "Manages club partnerships and corporate relations. Connecting ProdCast with industry leaders.",
      linkedin: "#",
      avatar: "VS",
      gradient: "linear-gradient(135deg, #B45309, #F59E0B)",
    },
    {
      name: "Ananya Gupta",
      role: "Community Lead",
      batch: "MBA 2025–27",
      bio: "Leads community building and member engagement. Making ProdCast an inclusive, energetic space.",
      linkedin: "#",
      avatar: "AG",
      gradient: "linear-gradient(135deg, #DC2626, #F97316)",
    },
    {
      name: "Rohan Das",
      role: "Finance & Ops",
      batch: "MBA 2025–27",
      bio: "Handles finance, sponsorships, and event logistics. Keeping everything running smoothly behind the scenes.",
      linkedin: "#",
      avatar: "RD",
      gradient: "linear-gradient(135deg, #6D28D9, #4338CA)",
    },
    {
      name: "Kavya Reddy",
      role: "Digital Lead",
      batch: "MBA 2025–27",
      bio: "Manages social media and ProdCast's digital presence. Growing our community one post at a time.",
      linkedin: "#",
      avatar: "KR",
      gradient: "linear-gradient(135deg, #BE185D, #7C3AED)",
    },
  ],
};

// ─── PRODNEW ─────────────────────────────────────────────────
const PRODNEW = [
  {
    title: "The CIRCLES Framework",
    caption: "Ever froze at 'How would you improve YouTube?' 😅 CIRCLES breaks it into 7 steps. Swipe to master it in 60 seconds! 🎯",
    status: "published",
    gradient: "linear-gradient(135deg, #4338CA, #06B6D4)",
    emoji: "⭕",
    likes: 342,
    date: "Dec 15, 2024",
    url: "https://instagram.com",
  },
  {
    title: "What is Product-Market Fit?",
    caption: "PMF isn't a destination — it's a feeling 🔮 Sean Ellis says: if 40%+ would be 'Very Disappointed' without your product, you've found it 👇",
    status: "published",
    gradient: "linear-gradient(135deg, #7C3AED, #EC4899)",
    emoji: "🎯",
    likes: 287,
    date: "Dec 8, 2024",
    url: "https://instagram.com",
  },
  {
    title: "AARRR Pirate Metrics",
    caption: "Acquisition → Activation → Retention → Referral → Revenue. Dave McClure's classic still holds up in 2024. 🏴‍☠️ Which metric does your fav app ace?",
    status: "published",
    gradient: "linear-gradient(135deg, #059669, #06B6D4)",
    emoji: "🏴‍☠️",
    likes: 198,
    date: "Nov 30, 2024",
    url: "https://instagram.com",
  },
  {
    title: "RICE Prioritization Framework",
    caption: "Stop arguing about what to build next! RICE = Reach × Impact × Confidence ÷ Effort. Kill opinion-based roadmapping forever 🎯",
    status: "published",
    gradient: "linear-gradient(135deg, #047857, #06B6D4)",
    emoji: "📊",
    likes: 215,
    date: "Nov 20, 2024",
    url: "https://instagram.com",
  },
  {
    title: "How Duolingo Built a Habit",
    caption: "Duolingo's streak mechanic isn't accidental — it's the Hooked Model in action 🎮 Trigger → Action → Variable Reward → Investment.",
    status: "scheduled",
    gradient: "linear-gradient(135deg, #B45309, #F59E0B)",
    emoji: "🦉",
    likes: null,
    date: "Jan 5, 2025",
    url: null,
  },
  {
    title: "Jobs-to-be-Done Deep Dive",
    caption: "People don't buy drills — they buy holes in walls 🕳️ Christensen's JTBD theory changes how you think about user research forever.",
    status: "scheduled",
    gradient: "linear-gradient(135deg, #DC2626, #F97316)",
    emoji: "🔧",
    likes: null,
    date: "Jan 12, 2025",
    url: null,
  },
  {
    title: "The Kano Model: Delighters",
    caption: "Not all features are created equal 🎪 Basic needs vs Performance vs Delighters. Understanding Kano will change your roadmap strategy.",
    status: "scheduled",
    gradient: "linear-gradient(135deg, #6D28D9, #EC4899)",
    emoji: "😊",
    likes: null,
    date: "Jan 19, 2025",
    url: null,
  },
  {
    title: "OKRs vs KPIs — The Difference",
    caption: "OKRs are where you're going. KPIs are how you know you're on track. Still confused? 😅 Real examples from Google, Spotify & Airbnb.",
    status: "drafting",
    gradient: "linear-gradient(135deg, #0891B2, #6366F1)",
    emoji: "📈",
    likes: null,
    date: "TBD",
    url: null,
  },
  {
    title: "North Star Metric: The ONE Number",
    caption: "Airbnb: Nights Booked. Spotify: Time Listening. WhatsApp: Messages Sent. Every great product has ONE north star 🌟",
    status: "drafting",
    gradient: "linear-gradient(135deg, #BE185D, #7C3AED)",
    emoji: "⭐",
    likes: null,
    date: "TBD",
    url: null,
  },
];

// ─── PM FRAMEWORKS ───────────────────────────────────────────
const FRAMEWORKS = [
  {
    name: "CIRCLES Method",
    category: "strategy",
    emoji: "⭕",
    tagline: "Structure any product design or improvement question",
    color: "#4338CA",
    visualType: "steps",
    description:
      "The most widely used PM interview framework by Lewis Lin. Provides a structured approach to answering product design questions in any PM interview. It helps you avoid vague, rambling answers by giving a clear, logical structure that impresses interviewers.",
    components: [
      "C – Comprehend the situation (clarify constraints & goals)",
      "I – Identify the customer (segment users by type)",
      "R – Report customer needs (surface pain points)",
      "C – Cut through prioritization (pick one segment to focus)",
      "L – List solutions (brainstorm 3–5 features)",
      "E – Evaluate tradeoffs (pros/cons, feasibility, impact)",
      "S – Summarize recommendation (clear, confident close)",
    ],
    useWhen: "PM interviews, product design questions, feature improvement discussions",
    example:
      "How would you improve Netflix? → Clarify: growth vs retention goal. Identify: casual viewers vs power bingers. Cut: focus on lapsed subscribers. List: social watch parties, AI-curated 'for you tonight' row, offline mode. Evaluate: social is high risk, offline is high confidence. Summarize: prioritize offline + AI curation.",
    resources: [
      { title: "Decode and Conquer", type: "book", url: "https://www.amazon.com/dp/0615917275", desc: "The definitive PM interview prep book by Lewis Lin — creator of the CIRCLES Method." },
      { title: "Lewis Lin's PM Interview Blog", type: "article", url: "https://www.lewis-lin.com/blog", desc: "Free blog posts, walkthroughs, and interview tips from the CIRCLES creator himself." },
      { title: "Exponent PM Interview Course", type: "course", url: "https://www.tryexponent.com/courses/pm", desc: "Structured video course with CIRCLES walkthroughs for common PM interview questions." },
      { title: "PM Interview Questions Bank", type: "article", url: "https://www.productmanagementexercises.com", desc: "150+ PM interview questions to practice with CIRCLES — organized by company and type." },
    ],
  },
  {
    name: "AARRR Pirate Metrics",
    category: "growth",
    emoji: "🏴☠️",
    tagline: "Map your entire growth funnel in one model",
    color: "#059669",
    visualType: "funnel",
    description:
      "Created by Dave McClure in 2007, AARRR (nicknamed 'Pirate Metrics') tracks 5 critical stages across the user lifecycle — from first touchpoint to revenue. It's the canonical framework for diagnosing growth bottlenecks and aligning product, marketing, and growth teams.",
    components: [
      "A – Acquisition: How do users find you? (SEO, paid, viral, PR)",
      "A – Activation: Do users have a great first experience? (aha moment)",
      "R – Retention: Do users come back? (DAU, WAU, churn rate)",
      "R – Referral: Do users tell others? (NPS, viral coefficient)",
      "R – Revenue: How do you monetize? (ARPU, LTV, conversion)",
    ],
    useWhen: "Growth strategy discussions, identifying funnel leaks, startup metrics conversations, investor decks",
    example:
      "Spotify AARRR: Acquisition (digital ads, word-of-mouth, student deals) → Activation (user creates their first playlist in session 1) → Retention (Discover Weekly, Wrapped drive weekly habit) → Referral (share Spotify Wrapped on social) → Revenue (convert free to Premium via feature gating).",
    resources: [
      { title: "Startup Metrics for Pirates (Original)", type: "article", url: "https://www.slideshare.net/dmc500hats/startup-metrics-for-pirates-long-version", desc: "Dave McClure's original 2007 SlideShare deck that introduced the AARRR framework to the world." },
      { title: "AARRR Deep Dive – Andrew Chen", type: "article", url: "https://andrewchen.com", desc: "Andrew Chen's blog — the best source for growth loops, funnel thinking, and AARRR in practice at scale." },
      { title: "Reforge Growth Series", type: "course", url: "https://www.reforge.com/growth-series", desc: "The most respected growth program in tech — goes deep on AARRR metrics and growth loops." },
      { title: "GrowthHackers Community", type: "tool", url: "https://growthhackers.com", desc: "Community of growth practitioners sharing experiments, case studies, and metric breakdowns." },
    ],
  },
  {
    name: "Jobs-to-be-Done",
    category: "discovery",
    emoji: "🔧",
    tagline: "Understand what users truly hire your product for",
    color: "#7C3AED",
    visualType: "cycle",
    description:
      "Clayton Christensen's theory reframes product thinking: customers don't buy products — they 'hire' them to make progress in specific situations. JTBD shifts focus from demographics to motivations, making it one of the most powerful lenses for product discovery and innovation.",
    components: [
      "Functional Jobs: The practical task (get from A to B, save time)",
      "Emotional Jobs: How users want to feel (confident, safe, in control)",
      "Social Jobs: How users want to be perceived by others (successful, modern)",
      "Job Map: Trigger → Planning → Execution → Monitoring → Concluding",
      "Forces of Progress: Push (away from old) + Pull (toward new) vs Anxiety + Habit",
    ],
    useWhen: "User research, defining problem statements, product positioning, innovation strategy, pricing",
    example:
      "McDonald's milkshake insight: Customers weren't buying milkshakes as dessert — they were hiring them for a morning commute job (something slow to consume while driving). This single JTBD insight led to a thicker, larger milkshake that tripled morning sales.",
    resources: [
      { title: "Competing Against Luck – Christensen", type: "book", url: "https://www.amazon.com/dp/0062435612", desc: "The definitive book on JTBD by Clayton Christensen. Essential reading for every PM." },
      { title: "When Coffee and Kale Compete", type: "book", url: "https://www.amazon.com/dp/1483583597", desc: "Alan Klement's practical JTBD book focused on application in product and marketing." },
      { title: "Intercom's JTBD Guide", type: "article", url: "https://www.intercom.com/blog/using-job-stories", desc: "How Intercom applies JTBD with 'Job Stories' — a practical alternative to user stories." },
      { title: "JTBD.info", type: "tool", url: "https://jtbd.info", desc: "A dedicated resource site for JTBD theory with articles, interviews, and case studies." },
    ],
  },
  {
    name: "OKRs",
    category: "strategy",
    emoji: "🎯",
    tagline: "Align goals from company to individual contributor",
    color: "#B45309",
    visualType: "hierarchy",
    description:
      "OKRs (Objectives and Key Results) were created at Intel by Andy Grove and popularized by Google. They provide a goal-setting system that cascades from company → team → individual, ensuring everyone is rowing in the same direction with measurable outcomes.",
    components: [
      "Objective: Qualitative, inspiring, directional — answers 'Where are we going?'",
      "Key Results: 3–5 measurable, time-bound outcomes — answers 'How will we know?'",
      "Initiatives: Specific projects and tasks that drive Key Results",
      "Grading: Score 0.0–1.0 each quarter; 0.7 is the 'sweet spot'",
      "Transparency: OKRs are public — everyone sees company, team, and individual OKRs",
    ],
    useWhen: "Quarterly planning, team alignment, strategic goal-setting, investor updates, OKR review meetings",
    example:
      "Google 2004 OKR example: O = Get to 1 billion users faster. KR1: Launch Google Search in 3 new languages. KR2: Reduce search latency to < 0.5s for 95% of queries. KR3: 10M new users from mobile in Q2.",
    resources: [
      { title: "Measure What Matters – John Doerr", type: "book", url: "https://www.amazon.com/dp/0525536221", desc: "The definitive OKR book by John Doerr, the person who brought OKRs from Intel to Google." },
      { title: "Google re:Work OKR Guide", type: "article", url: "https://rework.withgoogle.com/guides/set-goals-with-okrs", desc: "Google's official OKR guide — free, authoritative, and includes real Google OKR examples." },
      { title: "Atlassian OKR Template", type: "tool", url: "https://www.atlassian.com/agile/agile-at-scale/okr", desc: "Free OKR templates and playbooks from Atlassian, designed for agile teams." },
      { title: "What Matters (Doerr's Organization)", type: "article", url: "https://www.whatmatters.com", desc: "OKR case studies from Adobe, Bono's ONE Campaign, Bill Gates Foundation, and more." },
    ],
  },
  {
    name: "RICE Scoring",
    category: "prioritization",
    emoji: "📊",
    tagline: "Kill roadmap arguments with data-driven prioritization",
    color: "#DC2626",
    visualType: "formula",
    description:
      "Developed by Intercom's product team, RICE is a scoring model that assigns a numerical priority to each product initiative. By quantifying 4 dimensions, it removes gut-feel debates from roadmap planning and creates a defensible, data-backed priority list.",
    components: [
      "R – Reach: How many users impacted per quarter? (raw number)",
      "I – Impact: How much does it move the needle? (0.25=minimal, 0.5=low, 1=medium, 2=high, 3=massive)",
      "C – Confidence: How certain are you of estimates? (expressed as %, e.g. 80%)",
      "E – Effort: Total person-months required across all team members",
      "Formula: RICE Score = (Reach × Impact × Confidence) ÷ Effort",
    ],
    useWhen: "Feature prioritization, sprint planning, stakeholder roadmap reviews, competing initiative decisions",
    example:
      "Push Notifications: 5000 × 2 × 0.8 ÷ 1 = 8000. Search Improvements: 2000 × 3 × 0.5 ÷ 2 = 1500. Onboarding Redesign: 1000 × 3 × 0.9 ÷ 3 = 900. Prioritize in order: Push → Search → Onboarding.",
    resources: [
      { title: "RICE: Simple Prioritization – Intercom", type: "article", url: "https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers", desc: "The original Intercom blog post introducing the RICE framework — with worked examples." },
      { title: "Product Prioritization Methods", type: "article", url: "https://www.productplan.com/learn/product-prioritization-frameworks", desc: "ProductPlan's comparison of 10+ prioritization frameworks including RICE, ICE, and MoSCoW." },
      { title: "RICE Scoring Template (Notion)", type: "tool", url: "https://www.notion.so/templates/product-roadmap", desc: "Free Notion templates for RICE scoring — plug in your numbers and auto-rank features." },
      { title: "Mind the Product – Prioritization", type: "article", url: "https://www.mindtheproduct.com/tag/prioritization", desc: "Collection of articles from product leaders on prioritization in practice." },
    ],
  },
  {
    name: "Kano Model",
    category: "discovery",
    emoji: "😊",
    tagline: "Categorize features by their impact on user satisfaction",
    color: "#0891B2",
    visualType: "kano",
    description:
      "Developed by Professor Noriaki Kano in 1984, the Kano Model maps features onto a 2D grid of satisfaction vs. functionality. It reveals that not all features deliver equal satisfaction — some delight users, while others are merely expected. Essential for roadmap strategy.",
    components: [
      "Must-Haves (Basic): Expected — absent = dissatisfied, present = neutral",
      "Performance (Linear): More = more satisfied, less = less satisfied (linear relationship)",
      "Delighters (Excitement): Unexpected — absent = neutral, present = wow",
      "Indifferent: Users don't care either way (avoid investing here)",
      "Reverse: Some users dislike this feature (segment carefully)",
    ],
    useWhen: "Feature evaluation, user satisfaction surveys, roadmap strategy, MVP scoping, competitive analysis",
    example:
      "Smartphone Kano: Must-Have = battery that lasts a day. Performance = camera megapixels (more = better). Delighter = Face ID in 2017 (unexpected, amazing). Indifferent = stylus for most users. Reverse = notch (some users hated it).",
    resources: [
      { title: "Original Kano Paper (1984)", type: "article", url: "https://www.tandfonline.com/doi/abs/10.1080/10686967.1984.11918832", desc: "Professor Kano's original academic paper introducing the model — the primary source." },
      { title: "Kano Model Guide – ProductPlan", type: "article", url: "https://www.productplan.com/glossary/kano-model", desc: "Clear, practical guide to running a Kano survey and interpreting results for your roadmap." },
      { title: "UX Collective – Kano in Practice", type: "article", url: "https://uxdesign.cc/kano-model-in-practice", desc: "How to run Kano surveys with real users and translate results into product decisions." },
      { title: "FeatureFit (Kano Tool)", type: "tool", url: "https://www.featurefit.io", desc: "A dedicated tool for running Kano surveys with your users and auto-categorizing features." },
    ],
  },
  {
    name: "North Star Metric",
    category: "metrics",
    emoji: "⭐",
    tagline: "Find the ONE metric that drives all your growth",
    color: "#7C3AED",
    visualType: "star",
    description:
      "The North Star Metric (NSM) is the single metric that best captures the core value your product delivers to customers. It aligns every team — from engineering to marketing — around a common mission. Coined by Sean Ellis and popularized by Amplitude.",
    components: [
      "Value Exchange: The NSM should capture when value is exchanged between product and user",
      "Breadth: Number of users experiencing the core value",
      "Depth: How much core value each user gets per interaction",
      "Frequency: How often users get the core value",
      "Leading Indicators: 3–5 sub-metrics that predict movement in the NSM",
    ],
    useWhen: "Annual strategy, team alignment, investor conversations, product reviews, growth strategy",
    example:
      "Famous NSMs: Airbnb = Nights Booked | Spotify = Time Spent Listening | Facebook = DAU | Slack = Messages Sent by Paying Teams | HubSpot = Weeks of DAU | Duolingo = DAU/MAU ratio (stickiness)",
    resources: [
      { title: "North Star Playbook – Amplitude", type: "article", url: "https://amplitude.com/north-star", desc: "Amplitude's comprehensive, free playbook on finding and using your North Star Metric — the best resource available." },
      { title: "Sean Ellis on North Star", type: "article", url: "https://www.growthhackers.com/articles/north-star-metric", desc: "Sean Ellis's original thinking on the North Star Metric and how it connects to long-term growth." },
      { title: "Reforge – North Star Framework", type: "course", url: "https://www.reforge.com", desc: "Reforge goes deep on North Star Metrics in their growth and product strategy courses." },
      { title: "Lenny's Newsletter on Metrics", type: "article", url: "https://www.lennysnewsletter.com", desc: "Lenny Rachitsky's newsletter features metric teardowns for top consumer and B2B products." },
    ],
  },
  {
    name: "HEART Framework",
    category: "metrics",
    emoji: "❤️",
    tagline: "Measure user experience at scale (Google's model)",
    color: "#DC2626",
    visualType: "grid5",
    description:
      "Developed by Kerry Rodden, Hilary Hutchinson, and Xin Fu at Google, HEART provides a structured approach to measuring UX quality at scale. It defines 5 user-centered dimensions and pairs them with Goals, Signals, and Metrics (the GSM framework) to operationalize UX measurement.",
    components: [
      "H – Happiness: Satisfaction, delight, ease (NPS, CSAT, app store ratings)",
      "E – Engagement: Depth & frequency of use (DAU/MAU, sessions/week, pages/visit)",
      "A – Adoption: New users or feature uptake (conversion rate, % using new feature)",
      "R – Retention: Users returning over time (30/60/90-day retention, churn rate)",
      "T – Task Success: Completion rate, efficiency, error rate (task completion %, time-on-task)",
    ],
    useWhen: "UX measurement strategy, quarterly business reviews, defining success metrics for new features, research planning",
    example:
      "Google Maps HEART: Happiness (star ratings, NPS), Engagement (searches/day, route starts/week), Adoption (% using Live Traffic), Retention (% still using Maps after 30 days), Task Success (% of routes completed without re-routing).",
    resources: [
      { title: "HEART Framework – Google Research Paper", type: "article", url: "https://research.google/pubs/pub36299", desc: "The original 2010 academic paper by Rodden, Hutchinson & Fu introducing HEART at Google." },
      { title: "UX Metrics with HEART – Google Design", type: "article", url: "https://design.google/library/ux-metrics", desc: "Google's design blog post on applying HEART practically to real product teams." },
      { title: "Measuring UX – Nielsen Norman Group", type: "article", url: "https://www.nngroup.com/articles/measuring-perceived-usability", desc: "NNG's guide to UX measurement — complements HEART with usability testing methods." },
      { title: "HEART Template – Figma", type: "tool", url: "https://www.figma.com/community/file/heart-framework", desc: "Free Figma template for mapping HEART dimensions to Goals, Signals, and Metrics (GSM)." },
    ],
  },
  {
    name: "Design Thinking",
    category: "design",
    emoji: "🎨",
    tagline: "A human-centered approach to breakthrough innovation",
    color: "#059669",
    visualType: "cycle",
    description:
      "Design Thinking is a non-linear, iterative process for solving complex problems with radical empathy for users. Pioneered by IDEO and codified by Stanford d.school. It's been applied by Apple, IBM, Google, Airbnb, and thousands of startups to drive breakthrough products.",
    components: [
      "Empathize: Observe, interview, and shadow real users — suspend assumptions",
      "Define: Synthesize findings into a clear 'How Might We' problem statement",
      "Ideate: Generate divergent ideas — quantity over quality (Crazy 8s, SCAMPER)",
      "Prototype: Build the cheapest, fastest representation to test your hypothesis",
      "Test: Get real user feedback — fail fast, learn faster, iterate",
    ],
    useWhen: "New product discovery, innovation workshops, design sprints, user research synthesis, 0→1 product building",
    example:
      "Airbnb in 2009: Founders were struggling. Went to NYC, did empathy interviews, photographed every listing (prototyped professional photography). Revenue doubled in one week. A $40 investment in human-centered design saved the company.",
    resources: [
      { title: "Stanford d.school Design Thinking Toolkit", type: "tool", url: "https://dschool.stanford.edu/resources", desc: "Free worksheets, exercises, and facilitation guides from Stanford's design school — the original source." },
      { title: "IDEO Design Thinking Guide", type: "article", url: "https://designthinking.ideo.com", desc: "IDEO's official introduction to their Design Thinking methodology with case studies and tools." },
      { title: "Sprint – Jake Knapp", type: "book", url: "https://www.amazon.com/dp/150112174X", desc: "The Google Ventures Design Sprint book — a 5-day version of Design Thinking for fast product teams." },
      { title: "IBM Design Thinking", type: "article", url: "https://www.ibm.com/design/thinking", desc: "IBM's enterprise-scale adaptation of Design Thinking — includes the Hills framework and Playbacks." },
    ],
  },
  {
    name: "Lean Canvas",
    category: "strategy",
    emoji: "📋",
    tagline: "One-page business model for early-stage products",
    color: "#B45309",
    visualType: "canvas",
    description:
      "Created by Ash Maurya as a startup-focused adaptation of Osterwalder's Business Model Canvas. The Lean Canvas forces you to document all critical business assumptions on a single page — making it easy to pivot quickly as you learn. Designed to be completed in 20 minutes.",
    components: [
      "Problem: Top 3 customer problems + existing alternatives",
      "Solution: Top 3 features that address those problems",
      "Unique Value Proposition: Why you're different and worth buying",
      "Customer Segments: Target customers + early adopters specifically",
      "Channels: Path to customers (owned, paid, earned media)",
      "Revenue Streams + Cost Structure: Unit economics and business model",
      "Key Metrics + Unfair Advantage",
    ],
    useWhen: "Early-stage validation, startup pitching, pivot decisions, product strategy, accelerator/investor presentations",
    example:
      "Slack Lean Canvas: Problem = team communication is fragmented across email+IM. Solution = channels + integrations + search. UVP = 'Where work happens.' Segment = remote tech teams. Revenue = per-seat SaaS. Unfair Advantage = Slack Fund ecosystem.",
    resources: [
      { title: "Running Lean – Ash Maurya", type: "book", url: "https://www.amazon.com/dp/1449305172", desc: "The definitive book on Lean Canvas by its creator — includes step-by-step instructions." },
      { title: "Leanstack.com", type: "tool", url: "https://leanstack.com", desc: "Official Lean Canvas tool with templates, guides, and a community of practitioners." },
      { title: "Lean Canvas vs Business Model Canvas", type: "article", url: "https://blog.leanstack.com/why-lean-canvas-vs-business-model-canvas", desc: "Ash Maurya explains why he adapted Osterwalder's BMC and what makes Lean Canvas better for startups." },
      { title: "Strategyzer (BMC + Value Proposition)", type: "tool", url: "https://www.strategyzer.com", desc: "Advanced strategy tools including Value Proposition Canvas — pairs well with Lean Canvas." },
    ],
  },
  {
    name: "The Hooked Model",
    category: "growth",
    emoji: "🪝",
    tagline: "Build habit-forming products by design",
    color: "#6D28D9",
    visualType: "cycle",
    description:
      "Nir Eyal's model from 'Hooked: How to Build Habit-Forming Products' describes how the most successful consumer products create habits through a repeating 4-step cycle. Each loop through the Hook makes the behavior more automatic and the product harder to quit.",
    components: [
      "Trigger: External (push notification, email, ad) or Internal (boredom, loneliness, FOMO)",
      "Action: Simplest behavior in anticipation of reward — governed by BJ Fogg's B=MAT model",
      "Variable Reward: Tribe (social validation), Hunt (information/resources), Self (achievement/mastery)",
      "Investment: User puts time, data, social capital into the product — improving future reward",
    ],
    useWhen: "Engagement feature design, onboarding optimization, retention strategy, consumer app product reviews",
    example:
      "Instagram Hook: External Trigger (like notification) → Action (open app, scroll) → Variable Reward (sometimes great content, sometimes meh — the variability is the hook) → Investment (post a photo, follow someone, improving your feed for next time).",
    resources: [
      { title: "Hooked – Nir Eyal", type: "book", url: "https://www.amazon.com/dp/1591847788", desc: "The foundational book on habit-forming product design. Required reading for consumer product PMs." },
      { title: "NirAndFar.com", type: "article", url: "https://www.nirandfar.com", desc: "Nir Eyal's blog with deep dives on behavior design, distraction, and the Hooked Model in practice." },
      { title: "Persuasive Technology – BJ Fogg", type: "book", url: "https://www.amazon.com/dp/1893115399", desc: "BJ Fogg's foundational work on behavior design — underpins the Action phase of the Hooked Model." },
      { title: "Indistractable – Nir Eyal", type: "book", url: "https://www.amazon.com/dp/1526610204", desc: "Nir's follow-up book — the ethical counterpart to Hooked, on building focus in a distracted world." },
    ],
  },
  {
    name: "User Story Mapping",
    category: "execution",
    emoji: "🗺️",
    tagline: "Visualize the complete user journey for sprint planning",
    color: "#0891B2",
    visualType: "map",
    description:
      "Jeff Patton's technique helps teams visualize the entire user experience horizontally (across activities) and plan releases as 'horizontal slices' — ensuring each release delivers a complete, end-to-end experience rather than a disconnected pile of features.",
    components: [
      "Backbone: User Activities at the top (high-level goals like 'Browse' → 'Buy' → 'Track')",
      "Tasks: Steps to complete each activity (second level of detail)",
      "User Stories: Specific stories under each task (third level)",
      "Release Slices: Horizontal cuts across the map = MVP, Version 1, Version 2",
      "Walking Skeleton: The thinnest possible end-to-end slice that delivers value",
    ],
    useWhen: "Sprint planning, MVP definition, release roadmapping, stakeholder alignment, cross-team communication",
    example:
      "Amazon User Story Map: Browse (search, filter, recommendations) → Select (PDPs, reviews, Q&A) → Buy (cart, checkout, payments) → Receive (tracking, delivery) → Return. MVP slice = one story from each activity column.",
    resources: [
      { title: "User Story Mapping – Jeff Patton", type: "book", url: "https://www.amazon.com/dp/1491904909", desc: "The definitive book by the framework's creator — includes workshop exercises and real examples." },
      { title: "Agile Alliance Story Mapping Guide", type: "article", url: "https://www.agilealliance.org/glossary/story-mapping", desc: "Clear overview of User Story Mapping with diagrams and facilitation tips." },
      { title: "Miro Story Map Template", type: "tool", url: "https://miro.com/templates/user-story-map", desc: "Free digital whiteboard template for collaborative User Story Mapping with your team." },
      { title: "Atlassian Story Mapping Guide", type: "article", url: "https://www.atlassian.com/agile/project-management/user-stories", desc: "Atlassian's practical guide to writing user stories and building story maps in Jira/Confluence." },
    ],
  },
  {
    name: "MoSCoW Method",
    category: "prioritization",
    emoji: "🎭",
    tagline: "Quickly categorize features by urgency and importance",
    color: "#BE185D",
    visualType: "moscow",
    description:
      "Developed by Dai Clegg at Oracle in 1994, MoSCoW is a simple but highly effective prioritization technique that categorizes requirements into 4 buckets. It's widely used in agile sprints and product discovery to manage scope, align stakeholders, and protect engineering capacity.",
    components: [
      "Mo – Must Have: Non-negotiable requirements — the product fails without these",
      "S – Should Have: Important, high-value requirements — but not mission-critical",
      "Co – Could Have: 'Nice to have' if time/budget allows — often become Should Haves",
      "W – Won't Have (this time): Explicitly out of scope — but NOT permanently rejected",
    ],
    useWhen: "Sprint planning, stakeholder negotiations, scope discussions, MVP definition, release scope-cutting",
    example:
      "E-commerce checkout redesign: Must = Stripe payment integration, shipping address form. Should = saved addresses, gift wrapping. Could = loyalty points display. Won't = cryptocurrency payments (next quarter).",
    resources: [
      { title: "Agile Alliance MoSCoW Guide", type: "article", url: "https://www.agilealliance.org/glossary/moscow", desc: "The Agile Alliance's official guide to MoSCoW prioritization with examples." },
      { title: "MoSCoW in Practice – Atlassian", type: "article", url: "https://www.atlassian.com/agile/project-management/prioritization", desc: "How to run MoSCoW workshops with cross-functional teams using Jira." },
      { title: "Product Prioritization Guide", type: "article", url: "https://www.productplan.com/learn/prioritization-frameworks", desc: "ProductPlan's comparison of MoSCoW vs RICE vs Kano vs Value/Effort matrix." },
      { title: "Miro MoSCoW Template", type: "tool", url: "https://miro.com/templates/moscow-method", desc: "Free digital whiteboard template for running MoSCoW prioritization workshops remotely." },
    ],
  },
  {
    name: "ICE Scoring",
    category: "prioritization",
    emoji: "🧊",
    tagline: "Fast, lightweight prioritization for growth teams",
    color: "#047857",
    visualType: "formula",
    description:
      "ICE Scoring was created by Sean Ellis (inventor of the term 'growth hacking') as a faster, simpler alternative to RICE for growth experiment prioritization. It's ideal for high-velocity teams running many small experiments where speed of prioritization matters.",
    components: [
      "I – Impact: How significant is the expected outcome if it works? (1–10)",
      "C – Confidence: How certain are you the experiment will work? (1–10)",
      "E – Ease: How easy/cheap is this to implement? (1–10, 10 = trivially easy)",
      "Formula: ICE Score = (Impact + Confidence + Ease) ÷ 3",
      "Usage: Score all experiments, rank by ICE, run highest-scoring first",
    ],
    useWhen: "Growth experiment queues, weekly sprint prioritization, A/B test planning, lean startup experiment cycles",
    example:
      "Growth team experiment queue: Personalized push notifications (I=8, C=7, E=9) → ICE=8.0. Checkout page CTA color test (I=4, C=8, E=10) → ICE=7.3. Referral program redesign (I=9, C=5, E=3) → ICE=5.7. Run in that order.",
    resources: [
      { title: "Sean Ellis on Growth Hacking", type: "article", url: "https://growthhackers.com/articles/ice-scoring", desc: "Sean Ellis's original explanation of ICE scoring and how it fits into a growth experimentation system." },
      { title: "Hacking Growth – Sean Ellis", type: "book", url: "https://www.amazon.com/dp/0451397134", desc: "Sean Ellis's book on building a growth team — ICE scoring is covered in depth in the experimentation chapters." },
      { title: "GrowthHackers.com", type: "tool", url: "https://growthhackers.com", desc: "The original growth hacking community where ICE-scored experiment libraries are openly shared." },
      { title: "ICE vs RICE – ProductPlan Comparison", type: "article", url: "https://www.productplan.com/learn/ice-scoring-model", desc: "When to use ICE vs RICE — a clear comparison with worked examples for product teams." },
    ],
  },
  {
    name: "Product-Market Fit",
    category: "strategy",
    emoji: "🔗",
    tagline: "The most important milestone in any product's life",
    color: "#DC2626",
    visualType: "pmf",
    description:
      "PMF is the degree to which a product satisfies strong market demand. Marc Andreessen coined it in 2007: 'PMF means being in a good market with a product that can satisfy that market.' It is the #1 predictor of startup success — everything before PMF is learning, everything after is scaling.",
    components: [
      "Sean Ellis Test: If 40%+ say 'Very Disappointed' without your product, you have PMF",
      "Retention Curve: Flattens above zero — users don't churn, they stick permanently",
      "NPS: Net Promoter Score > 40 is a strong qualitative signal",
      "Organic Growth: Word-of-mouth is driving measurable new user acquisition",
      "Cohort Analysis: Monthly retention curves are healthy across acquisition cohorts",
    ],
    useWhen: "Go/no-go scaling decisions, investor conversations, pivot vs persevere decisions, growth strategy",
    example:
      "Slack's PMF signal: Early teams had 93% weekly active usage and near-zero churn after 30 days. Retention curves flatlined at ~100% — classic PMF. They scaled from 8k to 500k DAU in 24 hours after launching. Brian Chesky (Airbnb) called this 'the product that sells itself.'",
    resources: [
      { title: "Marc Andreessen's Original PMF Essay", type: "article", url: "https://web.stanford.edu/class/ee204/ProductMarketFit.html", desc: "The 2007 essay that coined 'Product-Market Fit' — required reading for every PM and founder." },
      { title: "Sean Ellis PMF Survey", type: "tool", url: "https://www.pmfsurvey.com", desc: "The free 'Very Disappointed' survey tool — measure your PMF score in minutes." },
      { title: "First Round Review – 12 Things About PMF", type: "article", url: "https://review.firstround.com/how-superhuman-built-an-engine-to-find-product-market-fit", desc: "Rahul Vohra (Superhuman) on building a rigorous, data-driven engine to measure and find PMF." },
      { title: "Lenny's PMF Deep Dive", type: "article", url: "https://www.lennysnewsletter.com/p/how-to-know-if-youve-got-product-market-fit", desc: "Lenny Rachitsky's comprehensive newsletter post on every signal, method, and heuristic for detecting PMF." },
    ],
  },
];

// ─── PM ROADMAP STAGES ──────────────────────────────────────────
const PM_ROADMAP_STAGES = [
  {
    number: 1,
    name: "Discover",
    icon: "🔍",
    tagline: "Explore problems, identify gaps, and empathize with users",
    skills: ["Problem Identification", "Market Research", "Opportunity Sizing", "Customer Empathy"],
    resources: [
      { title: "The Lean Product Playbook", desc: "Dan Olsen's step-by-step guide to finding product-market fit." },
      { title: "Inspired: How to Create Tech Products", desc: "Marty Cagan's bible on product discovery and management." }
    ],
    workshops: ["Product Discovery 101", "Problem Space vs. Solution Space"],
    projects: ["Redesign a broken local digital service", "Conduct user empathy interviews for college apps"]
  },
  {
    number: 2,
    name: "Research",
    icon: "📊",
    tagline: "Conduct qualitative & quantitative user research",
    skills: ["Qualitative Interviews", "Survey Design", "Persona Creation", "Journey Mapping"],
    resources: [
      { title: "Just Enough Research", desc: "Erika Hall's practical guide to quick and actionable research." },
      { title: "Nielsen Norman Group Articles", desc: "Industry-standard benchmarks and UX research articles." }
    ],
    workshops: ["Mastering User Interviews", "Data Analytics for Product Managers"],
    projects: ["Map the complete user journey for a banking app", "Create customer personas for a travel startup"]
  },
  {
    number: 3,
    name: "Define",
    icon: "📋",
    tagline: "Scope the problem, define requirements, and carve out the MVP",
    skills: ["PRD Writing", "User Story Mapping", "MVP Scoping", "Functional Requirements"],
    resources: [
      { title: "How to Write a PRD (Figma Guide)", desc: "Practical product specs templates used by elite tech teams." },
      { title: "User Story Mapping", desc: "Jeff Patton's guide to mapping scope and releases horizontally." }
    ],
    workshops: ["Writing Bulletproof PRDs", "Scoping MVPs & Walking Skeletons"],
    projects: ["Write a full product requirements spec for Spotify", "Draft an MVP feature backlog for Swiggy"]
  },
  {
    number: 4,
    name: "Prioritize",
    icon: "⚖️",
    tagline: "Quantify impact and determine feature ordering",
    skills: ["RICE Scoring", "Kano Model", "Value vs. Effort Matrix", "MoSCoW Method"],
    resources: [
      { title: "Intercom on Product Prioritization", desc: "How Intercom scores and ranks backlog roadmaps." },
      { title: "Kano Survey Guide (ProductPlan)", desc: "Running user surveys to classify must-haves vs delighters." }
    ],
    workshops: ["RICE Prioritization Bootcamp", "Roadmap Scoping & Kano Analysis"],
    projects: ["Rank 10 competing roadmap features for a food delivery startup", "Build a RICE framework matrix sheet"]
  },
  {
    number: 5,
    name: "Build",
    icon: "🛠️",
    tagline: "Collaborate with design and engineering to build mockups and sprint forward",
    skills: ["Agile/Scrum Methodologies", "Figma Wireframing", "Technical Literacy (APIs, DBs)", "Sprint Planning"],
    resources: [
      { title: "The Design of Everyday Things", desc: "Don Norman's cognitive rules for intuitive UI/UX design." },
      { title: "Technical PM Primer", desc: "Understanding API requests, databases, and system architectures." }
    ],
    workshops: ["Tech Talk for PMs: System Design", "Agile & Sprint Planning Simulations"],
    projects: ["Design interactive Figma wireframes for an AI task manager", "Map API calls and payload JSONs for checkout"]
  },
  {
    number: 6,
    name: "Launch",
    icon: "🚀",
    tagline: "Go-to-market strategies, release cycles, and pricing structures",
    skills: ["GTM Strategies", "Pricing & Packaging", "Product Positioning", "Release Planning"],
    resources: [
      { title: "Product Marketing Debunked", desc: "Yasmeen Turayhi's framework for driving successful product releases." },
      { title: "Reforge Growth Series", desc: "Modern frameworks for scaling product loops and acquisition." }
    ],
    workshops: ["Crafting GTM Positioning Plans", "Pricing Models & SaaS Economics"],
    projects: ["Build a multi-channel GTM plan for a carbon offset tracker", "Create pricing tiers for a new AI photo tool"]
  },
  {
    number: 7,
    name: "Iterate",
    icon: "🔄",
    tagline: "Analyze metrics, conduct A/B testing, and make pivot decisions",
    skills: ["A/B Testing", "Amplitude & Mixpanel Telemetry", "User Feedback Loops", "Cohort Analysis"],
    resources: [
      { title: "Lean Analytics", desc: "Alistair Croll's guide to measurement-driven growth loops." },
      { title: "Amplitude Analytics Playbooks", desc: "Tactical guidelines for tracking user retention and conversion." }
    ],
    workshops: ["amplitude Analytics for PMs", "Designing Valid A/B Experiments"],
    projects: ["Propose a retention loop roadmap based on churn cohort analysis", "Design an A/B test layout for checkout conversion"]
  }
];

