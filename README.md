# GradPath AU — Australian Graduate Program Prep & Mentor Hub (MVP)

An interactive MVP web application built for university graduates entering the Australian job market (2027 & 2028 graduate program cycles).

## Core Modules Included

1. **AU Grad Program Tracker**
   - Filterable by work rights (**485 Graduate Visa / International OK**, **Citizen / PR**, **Citizen Only**), intake timing (**2027 Rolling** vs **2028 Wave**), stream, and city.
   - Detailed Australian hiring funnel breakdown per employer (Application → Psychometrics → HireVue → Technical → Assessment Centre).
   - Personal pipeline tracker (`Saved` → `Applied` → `Online Test` → `Video Interview` → `Assessment Centre` → `Offer`) persisted in `localStorage`.
   - Community *"Submit Program Intel"* form.

2. **Verified AU Grad Mentor Marketplace (Topmate-style)**
   - Browse affordable 1:1 sessions (A$35–A$75) with recent Australian graduates across Melbourne, Sydney, and Canberra.
   - Interactive booking flow with service selection, AEDT time slots, and session management.

3. **Interview Lab (Intervue-style)**
   - **HireVue Video & STAR Studio:** Timed 30s prep → 90s answer simulator, optional local camera mirror, STAR checklist, and persistent STAR Story Bank.
   - **SHL / Revelian Psychometric Mini-Drill:** 5-question timed Numerical, Verbal, Logical, and Situational Judgement practice test with worked explanations.

4. **Simulated Assessment Centres**
   - Live moderated 4–6 graduate cohort reservations.
   - Interactive 15-minute Melbourne Tech/Banking group case study brief with an Assessor Scorecard self-check rubric.

## Running Locally

Open `index.html` directly in a browser, or run any static server:

```bash
npx serve .
```

## Collaborating on GitHub

1. Push this directory to a shared GitHub repository.
2. Invite collaborators under **Settings → Collaborators**.
3. Connect the repository to **Vercel** or **Netlify** for automatic live preview URLs on every Pull Request.
