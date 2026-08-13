# 🏥 MedFlow — Hospital Patient Analytics & Readmission Dashboard

An enterprise-grade **Patient Readmission & Hospital Performance Analysis** platform designed to track patient outcomes, bed occupancy rates, department efficiency, doctor workload, and billing revenue. Built with React, Vite, Tailwind CSS, Recharts, and an embedded client-side **SQLite Data Engine**.

---

## 🌟 Key Features

### 1. 📊 Executive Overview Dashboard
- **Top Summary KPIs**: Total Admissions (`4,812`), Avg Length of Stay (`4.2d`), Bed Occupancy Rate (`76%`), and 30-Day Readmission Rate (`12.4%`).
- **Monthly Admissions by Department**: Bar chart visualizing patient volume across General Ward, ICU, and Cardiology.
- **Admissions by Diagnosis**: Donut chart breaking down primary clinical conditions (Cardiac 30%, Respiratory 20%, Trauma 16%, Other 34%).
- **Readmission Risk by Patient Table**: Real-time roster of top 5 high-risk patients with `High`, `Medium`, and `Low` risk pills.
- **Revenue Trend Area Chart**: Monthly revenue collection trajectory depicting Total Collected (`₹48.2L`) vs Pending Dues (`₹6.4L`).

### 2. 🗄️ Relational SQL Layer & Embedded SQL Query Studio
- **Normalized Star Schema**: Clean 3NF database schema featuring `patients`, `departments`, `doctors`, `admissions`, `billing`, and `readmissions`.
- **Advanced SQL Query Suite**:
  - **30-Day Readmission Analysis**: Uses `LAG(discharge_date)` window functions partitioned by `patient_id` to calculate exact days between visits.
  - **Average Length of Stay (LOS)**: Uses Common Table Expressions (CTEs) and conditional aggregations.
  - **Doctor Performance Ranking**: Ranks doctors within departments using `DENSE_RANK()`.
  - **Revenue Leakage**: Calculates pending dues and insurance settlement percentages.
- **Live SQL Console**: An in-browser query runner with pre-built interview query templates, copy buttons, execution timers (in ms), and dynamic result tables.

### 3. 🎛️ Interactive Global Slicers
- **Date Range Picker**: Custom popover selector (`Jan – Jun 2024`, `Q1 2024`, `Q2 2024`, `Last 30 Days`).
- **Department Selector**: Filter analytics by unit (`General Ward`, `ICU`, `Cardiology`, `Pulmonology`, `Orthopedics`).
- **Diagnosis Selector**: Filter by clinical condition (`Cardiac`, `Respiratory`, `Trauma`, `Diabetes`).
- **Advanced Slicers & Reset**: Filter by Risk Level (`High`, `Medium`, `Low`) and Payment Status (`Paid`, `Pending`), with a single-click **Reset All Slicers** button.

---

## 📁 Project Structure

```text
MedFlow/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── index.css
│   ├── App.jsx
│   ├── context/
│   │   └── DashboardContext.jsx     # Shared state & dynamic filter calculations
│   ├── db/
│   │   ├── schema.sql               # Relational DDL Schema
│   │   ├── analyticalQueries.js     # Interview SQL Query Templates
│   │   ├── mockData.js              # Hospital dataset matching wireframe metrics
│   │   └── sqlEngine.js             # Client-side SQLite query parser & engine
│   ├── components/
│   │   ├── Sidebar.jsx              # Left navigation bar (MedFlow branding)
│   │   ├── Header.jsx               # Top bar with dynamic title & global slicers
│   │   ├── KpiCard.jsx              # Metric tile with trend indicators
│   │   └── RiskBadge.jsx            # High / Medium / Low risk pills
│   └── pages/
│       ├── OverviewPage.jsx         # Main 1:1 dashboard wireframe layout
│       ├── PatientsPage.jsx         # Patient directory & profile detail view
│       ├── DepartmentsPage.jsx      # Department bed capacity & LOS breakdown
│       ├── ReadmissionsPage.jsx     # 30-day HRRP readmission risk analytics
│       ├── DoctorsPage.jsx          # Doctor recovery times & patient load
│       ├── BillingPage.jsx          # Financial breakdown & pending dues
│       ├── SqlStudioPage.jsx        # Live SQL Query Studio
│       └── ConfigPage.jsx           # System configuration & dataset export
```

---

## 🛠️ Getting Started Locally

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

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
   Open your browser and navigate to `http://localhost:5173` (or the printed port).

4. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 💡 Why This Project Impresses Interviewers

- **Solves a Real Healthcare Business Challenge**: Addresses Medicare HRRP readmission penalties and bed occupancy management.
- **SQL Depth**: Showcases production SQL logic (`LAG`, `LEAD`, `CTEs`, `DENSE_RANK`, conditional aggregation) rather than simple `SELECT` queries.
- **Interactive Storytelling**: Combines executive KPI summaries with granular drill-down pages and live SQL query execution.
