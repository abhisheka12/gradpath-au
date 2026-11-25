# GradHuddle v1 (Live Pilot Site) — Customer Journey Minimal Acceptance Test Kit (MAT)

> **Regression Gate Rule:** Before every push to `abhisheka12/gradpath-au` (`main`), run:
> ```bash
> node tests/mat-v1.mjs
> ```

---

## Customer Journey Test Matrix

### Journey 1 — Graduate Discovery, 32 Programs & 7 Melbourne Tech Founders
| Test ID | Flow / Acceptance Criteria |
| --- | --- |
| `MAT-V1-J1-01` | All embedded `<script>` blocks in `index.html` parse with zero JS syntax errors. |
| `MAT-V1-J1-02` | All **7 Verified Melbourne Tech Founders** (Abhishek Agarwal, Rishi Aggarwal, Brijesh Patel, Paresh Bapna, Jacob George, Shifali Singla, Rupam Agarwal) exist with `isFounder: true`, `Founder` role suffix, and real `.jpg` headshots present under `assets/`. |
| `MAT-V1-J1-03` | All referenced local media files (`assets/mentoring-walkthrough.mp4`, `assets/mentoring-walkthrough-poster.jpg`, `assets/hero-mentorship.jpg`, `assets/assessment-centre.jpg`, and every `assets/...` reference) exist on disk. |
| `MAT-V1-J1-04` | Catalogue contains 32 Australian graduate programs (`PROGRAMS`) with `https://` official career portal URLs. |

### Journey 2 — Graduate Self-Practice Lab & Assessment Centre Prep
| Test ID | Flow / Acceptance Criteria |
| --- | --- |
| `MAT-V1-J2-01` | One-Way Video Simulator (`VIDEO_PROMPTS`), STAR Checklist, STAR Story Bank, and 5-question SHL Psychometric Drill (`PSYCHOMETRIC_QUESTIONS`) are wired cleanly. |
| `MAT-V1-J2-02` | Assessment Centres tab includes Pilot AC Cohorts, MediLink AU Group Case Brief, and 6-point AU Assessor Rubric. |

### Journey 3 — Graduate Free 30-Min Pilot Booking & Mobile Navigation
| Test ID | Flow / Acceptance Criteria |
| --- | --- |
| `MAT-V1-J3-01` | Booking modal wires Formspree endpoint (`https://formspree.io/f/xjywpzpq`) and hidden `mentor_portal_link` deep-link field. |
| `MAT-V1-J3-02` | Zero mobile-tab attribute collision: bottom navigation uses `data-mtab` while Session Blueprint showcase uses `data-extab`. |

### Journey 4 — Mentor Studio, Google Meet Invite & Branded Scorecard
| Test ID | Flow / Acceptance Criteria |
| --- | --- |
| `MAT-V1-J4-01` | Mentor Studio uses **Google Meet** (`google_meet_auto`, `meet.new`, `createGoogleMeet`), connects to the deployed Google Apps Script Web App URL, and contains **zero Jitsi (`meet.jit.si`) references**. |
| `MAT-V1-J4-02` | Shareable `?report=` Scorecard encoder/decoder and `?studio=book` / `?studio=room` deep-link router are intact. |
