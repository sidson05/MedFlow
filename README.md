# 🏥 MedFlow — Hospital Patient Analytics & Readmission Dashboard

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-2d4a3e?style=for-the-badge&logo=github)](https://sidson05.github.io/MedFlow/)
[![Build Status](https://img.shields.io/badge/Build-Passing-5f8a45?style=for-the-badge&logo=vite)](https://github.com/sidson05/MedFlow)
[![Tech Stack](https://img.shields.io/badge/Tech-React%2019%20%7C%20Tailwind%20v4%20%7C%20Vite%20%7C%20Recharts-1f3a30?style=for-the-badge)](https://react.dev/)

An enterprise-grade **Patient Readmission & Hospital Performance Analysis** platform designed to track patient clinical outcomes, bed occupancy rates, departmental efficiency, physician workload, and billing revenue. Features an embedded client-side **SQLite Data Engine**, a **Patient Admission Intake Flow**, and a distributed **PySpark & Tableau Public BI Pipeline**.

🌐 **Live Application**: [https://sidson05.github.io/MedFlow/](https://sidson05.github.io/MedFlow/)

---

## 🌟 Key Features

### 1. 📊 Executive Overview Dashboard
- **Top Summary KPIs**: Total Admissions (`4,812`), Avg Length of Stay (`4.2d`), Bed Occupancy Rate (`76%`), and 30-Day Readmission Rate (`12.4%`).
- **Monthly Admissions by Department**: Interactive grouped Recharts visualization comparing patient volumes across General Ward, ICU, and Cardiology with dynamic slicer filtering.
- **Admissions by Diagnosis (Donut Chart)**: Clinical breakdown of conditions (Cardiac 30%, Respiratory 20%, Trauma 16%, Other / Diabetes 34%) with dynamic cohort isolation and center volume counters.
- **Readmission Risk by Patient**: Live roster of high-risk returns featuring 56px risk progress meters and color-mixed status pills.
- **Revenue Trend & Billing Trajectory**: Monthly cash and insurance collection curves (Total Collected `₹48.2L` vs Pending Dues `₹6.4L`).

### 2. 🏥 Patient Admission Intake Flow
- **Interactive Admission Modal**: Register new patient admissions with clinical demographics, admitting unit, diagnosis, billing estimates, and payment statuses.
- **Automated HRRP Risk Scoring**: Calculates 30-day readmission risk tiers (`High` for $\le 10\text{d}$, `Medium` for $\le 20\text{d}$, `Low` for $> 20\text{d}$) dynamically upon intake.
- **Real-Time Directory Sync**: Newly admitted patients immediately sync into the patient directory and open their individual clinical detail cards.

### 3. 🌿 Calm Executive Light Design System
- **Color Palette**: Deep forest green (`#1f3a30`, `#2d4a3e`), soft sage (`#5f8a45`, `#8aab6e`), and warm off-white canvas (`#f7f5f0`).
- **Typography**: Dual Google Font system with **Manrope** for body/UI text and **Playfair Display** for KPI figures and page titles, with `lining-nums` enabled globally.
- **Component Geometry**: 18px rounded white cards, hairline `--line` borders (`#e8e4db`), and fully rounded pill selectors and buttons.

### 4. 🗄️ Relational SQL Layer & Live Query Studio
- **Normalized Star Schema**: 3NF schema covering `patients`, `departments`, `doctors`, `admissions`, `billing`, and `readmissions`.
- **Advanced SQL Query Suite**:
  - **30-Day Readmission Analysis**: Uses `LAG(discharge_date)` partitioned by `patient_id` to compute exact return intervals.
  - **Department Length of Stay (LOS)**: Implements Common Table Expressions (CTEs) and conditional aggregations.
  - **Doctor Performance Ranking**: Ranks physicians by patient recovery speed and caseload using `DENSE_RANK()`.
  - **Revenue Leakage**: Isolates outstanding patient dues and insurance settlement percentages.
- **Live SQL Console**: In-browser client-side query runner with pre-built interview templates, copy buttons, execution timer (in ms), and dynamic results tables.

### 5. 📊 Tableau Public & PySpark StayQ Pipeline
- **Pre-Calibrated Data Extracts**: Ready-to-import CSVs in `tableau_data/` matching MedFlow's exact figures (4,812 admissions, 4.2d ALOS, 76% occupancy, 12.4% readmissions, and ₹48.2L billing).
- **Distributed Big-Data ETL**: Scalable PySpark pipeline (`scripts/stayq_transformation.py`) for computing hospital-wide Stay Quartiles (`StayQ-1` to `StayQ-4`) and windowed readmission partitions across millions of EHR records.

---

## 📁 Project Structure

```text
MedFlow/
├── index.html                           # Entry HTML with Manrope & Playfair Google Fonts
├── package.json                         # Node dependencies & build scripts
├── vite.config.js                       # Vite bundler configuration (relative base for Pages)
├── tailwind.config.js                   # Design tokens & color mappings
├── .github/
│   └── workflows/
│       └── deploy.yml                   # Automated GitHub Actions deployment pipeline
├── tableau_data/                        # Pre-calibrated datasets for Tableau Public
│   ├── medflow_admissions_4812.csv      # Master granular 4,812-row admissions dataset
│   ├── medflow_stayq_enriched_4812.csv  # Enriched dataset with StayQ velocity tiers
│   ├── medflow_department_capacity.csv  # Bed capacity and occupancy benchmarks
│   ├── medflow_monthly_department_kpis.csv
│   └── medflow_revenue_trends.csv
├── scripts/                             # Big data & ETL automation scripts
│   ├── generate_tableau_data.py         # Synthetic healthcare data generator
│   ├── stayq_transformation.py          # PySpark windowed StayQ pipeline
│   └── stayq_pandas_pipeline.py         # Local Python ETL pipeline
├── src/
│   ├── main.jsx                         # React root mount
│   ├── index.css                        # Design token CSS variables & global typography
│   ├── App.jsx                          # Main responsive layout shell
│   ├── context/
│   │   └── DashboardContext.jsx         # Global state, slicers & admission intake state
│   ├── db/
│   │   ├── schema.sql                   # Relational DDL Schema
│   │   ├── analyticalQueries.js         # Interview SQL query templates
│   │   ├── mockData.js                  # Hospital baseline dataset
│   │   └── sqlEngine.js                 # In-browser query parser & engine
│   ├── components/
│   │   ├── Sidebar.jsx                  # 232px sticky sidebar with brand pulse & SQLite status
│   │   ├── Header.jsx                   # Global slicers, date picker, search & export button
│   │   ├── KpiCard.jsx                  # Uniform 18px metric cards with delta indicators
│   │   └── RiskBadge.jsx                # Color-mixed risk pill badges (High/Medium/Low)
│   └── pages/
│       ├── OverviewPage.jsx             # Executive overview with Recharts charts & risk table
│       ├── PatientsPage.jsx             # Patient directory & "+ Add Patient" intake modal
│       ├── DepartmentsPage.jsx          # Bed capacity gauges & LOS benchmarks
│       ├── ReadmissionsPage.jsx         # 30-day HRRP return analytics & risk drivers
│       ├── DoctorsPage.jsx              # Physician recovery rankings & caseloads
│       ├── BillingPage.jsx              # Financial collections & outstanding dues
│       ├── SqlStudioPage.jsx            # Live SQL query runner & template explorer
│       └── ConfigPage.jsx               # Database re-seeding & JSON data exports
```

---

## 🛠️ Getting Started Locally

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **Python 3.10+** *(optional, for PySpark & data generation scripts)*

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sidson05/MedFlow.git
   cd MedFlow
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

4. **Lint and verify**:
   ```bash
   npm run lint
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🚀 Deployment

### GitHub Pages (Automated)
MedFlow is configured for automated deployment via GitHub Pages and GitHub Actions:
* **Production Build**: Assets are compiled with relative base paths (`./`) in `vite.config.js` to ensure universal asset resolution.
* **Continuous Deployment**: Any push to the `main` branch triggers `.github/workflows/deploy.yml`, building and publishing directly to the live GitHub Pages environment.
* **Live URL**: [https://sidson05.github.io/MedFlow/](https://sidson05.github.io/MedFlow/)

### Alternative Static Hosts
MedFlow can also be deployed with zero additional configuration to **Vercel** or **Netlify**:
```bash
# Vercel
npx vercel

# Netlify
npx netlify deploy --prod --dir=dist
```

---

## 📄 License
This project is open-source and available under the MIT License.
