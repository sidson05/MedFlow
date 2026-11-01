import csv
import random
import datetime

# Seed for reproducible data generation
random.seed(42)

def generate_datasets():
    # 1. Summary Tables matching MedFlow exactly
    
    # medflow_monthly_department_kpis.csv
    monthly_dept = [
        {"Month": "Jan 2024", "Month_Order": 1, "General_Ward": 420, "ICU": 180, "Cardiology": 210, "Total_Admissions": 810},
        {"Month": "Feb 2024", "Month_Order": 2, "General_Ward": 480, "ICU": 210, "Cardiology": 250, "Total_Admissions": 940},
        {"Month": "Mar 2024", "Month_Order": 3, "General_Ward": 390, "ICU": 160, "Cardiology": 190, "Total_Admissions": 740},
        {"Month": "Apr 2024", "Month_Order": 4, "General_Ward": 510, "ICU": 230, "Cardiology": 260, "Total_Admissions": 1000},
        {"Month": "May 2024", "Month_Order": 5, "General_Ward": 440, "ICU": 190, "Cardiology": 220, "Total_Admissions": 850},
        {"Month": "Jun 2024", "Month_Order": 6, "General_Ward": 450, "ICU": 200, "Cardiology": 222, "Total_Admissions": 872},
    ]
    with open('tableau_data/medflow_monthly_department_kpis.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=list(monthly_dept[0].keys()))
        writer.writeheader()
        writer.writerows(monthly_dept)

    # medflow_revenue_trends.csv
    rev_trends = [
        {"Month": "Jan 2024", "Month_Order": 1, "Collected_Lakhs": 6.8, "Pending_Lakhs": 0.9, "Total_Billed_Lakhs": 7.7, "Settlement_Rate_Pct": 88.3},
        {"Month": "Feb 2024", "Month_Order": 2, "Collected_Lakhs": 7.9, "Pending_Lakhs": 1.1, "Total_Billed_Lakhs": 9.0, "Settlement_Rate_Pct": 87.8},
        {"Month": "Mar 2024", "Month_Order": 3, "Collected_Lakhs": 7.2, "Pending_Lakhs": 0.8, "Total_Billed_Lakhs": 8.0, "Settlement_Rate_Pct": 90.0},
        {"Month": "Apr 2024", "Month_Order": 4, "Collected_Lakhs": 8.9, "Pending_Lakhs": 1.3, "Total_Billed_Lakhs": 10.2, "Settlement_Rate_Pct": 87.3},
        {"Month": "May 2024", "Month_Order": 5, "Collected_Lakhs": 8.6, "Pending_Lakhs": 1.2, "Total_Billed_Lakhs": 9.8, "Settlement_Rate_Pct": 87.8},
        {"Month": "Jun 2024", "Month_Order": 6, "Collected_Lakhs": 8.8, "Pending_Lakhs": 1.1, "Total_Billed_Lakhs": 9.9, "Settlement_Rate_Pct": 88.9},
    ]
    with open('tableau_data/medflow_revenue_trends.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=list(rev_trends[0].keys()))
        writer.writeheader()
        writer.writerows(rev_trends)

    # medflow_department_capacity.csv
    dept_cap = [
        {"Dept_ID": "D-101", "Department": "General Ward", "Total_Beds": 150, "Occupied_Beds": 118, "Bed_Occupancy_Rate": 78.7, "Head_Doctor": "Dr. N. Roy", "Avg_LOS_Days": 4.8, "Annual_Budget": "₹1.2 Cr"},
        {"Dept_ID": "D-102", "Department": "ICU", "Total_Beds": 45, "Occupied_Beds": 39, "Bed_Occupancy_Rate": 86.7, "Head_Doctor": "Dr. M. Chawla", "Avg_LOS_Days": 6.2, "Annual_Budget": "₹2.8 Cr"},
        {"Dept_ID": "D-103", "Department": "Cardiology", "Total_Beds": 60, "Occupied_Beds": 48, "Bed_Occupancy_Rate": 80.0, "Head_Doctor": "Dr. A. Mehta", "Avg_LOS_Days": 4.1, "Annual_Budget": "₹2.1 Cr"},
        {"Dept_ID": "D-104", "Department": "Orthopedics", "Total_Beds": 40, "Occupied_Beds": 28, "Bed_Occupancy_Rate": 70.0, "Head_Doctor": "Dr. K. Joshi", "Avg_LOS_Days": 3.9, "Annual_Budget": "₹1.5 Cr"},
        {"Dept_ID": "D-105", "Department": "Pediatrics", "Total_Beds": 35, "Occupied_Beds": 22, "Bed_Occupancy_Rate": 62.9, "Head_Doctor": "Dr. S. Banerjee", "Avg_LOS_Days": 3.2, "Annual_Budget": "₹90 Lakhs"},
    ]
    with open('tableau_data/medflow_department_capacity.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=list(dept_cap[0].keys()))
        writer.writeheader()
        writer.writerows(dept_cap)

    # medflow_diagnosis_distribution.csv
    diagnosis_dist = [
        {"Category": "Cardiac", "Percentage": 30, "Sub_Conditions": "Heart failure, Arrhythmia, CAD, Myocardial Infarction", "Color_Hex": "#3B82F6"},
        {"Category": "Respiratory", "Percentage": 20, "Sub_Conditions": "Pneumonia, COPD, Asthma exacerbation", "Color_Hex": "#10B981"},
        {"Category": "Trauma", "Percentage": 16, "Sub_Conditions": "Hip fracture, Multiple trauma, Joint dislocation", "Color_Hex": "#F59E0B"},
        {"Category": "Other", "Percentage": 34, "Sub_Conditions": "Diabetes, Acute Appendicitis, Sepsis, Renal", "Color_Hex": "#EC4899"},
    ]
    with open('tableau_data/medflow_diagnosis_distribution.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=list(diagnosis_dist[0].keys()))
        writer.writeheader()
        writer.writerows(diagnosis_dist)

    # 2. Granular 4,812-row Admissions Dataset (The Master Data Table for Tableau)
    TOTAL_ADMISSIONS = 4812
    READMISSION_TARGET = int(TOTAL_ADMISSIONS * 0.124)  # ~597 readmissions
    
    first_names = ["Rajesh", "Sunita", "Amitabh", "Priya", "Vikram", "Ananya", "Suresh", "Rohan", "Pooja", "Arun", 
                   "Neha", "Deepak", "Kavita", "Sanjay", "Meera", "Manoj", "Aarti", "Gaurav", "Swati", "Nikhil",
                   "Alok", "Divya", "Rahul", "Shalini", "Ajay", "Preeti", "Manish", "Sneha", "Kunal", "Ritu"]
    last_names = ["Sharma", "Verma", "Patel", "Nair", "Singh", "Roy", "Gupta", "Kulkarni", "Deshmukh", "Joshi",
                  "Chawla", "Mehta", "Banerjee", "Kapoor", "Bhatia", "Iyer", "Rao", "Reddy", "Menon", "Saxena"]

    doctors_by_dept = {
        "Cardiology": ("Dr. A. Mehta", "Cardiology Unit"),
        "Pulmonology": ("Dr. S. Kulkarni", "General Ward"),
        "ICU": ("Dr. M. Chawla", "ICU"),
        "Endocrinology": ("Dr. R. Deshmukh", "General Ward"),
        "Orthopedics": ("Dr. K. Joshi", "General Ward"),
        "General Ward": ("Dr. N. Roy", "General Ward"),
        "Pediatrics": ("Dr. S. Banerjee", "General Ward")
    }

    # Seed known top risk patients first
    known_seed_patients = [
        {"patient_id": "P-1042", "patient_name": "Rajesh Sharma", "age": 64, "gender": "Male", "dept": "Cardiology", "diagnosis_cat": "Cardiac", "diagnosis": "Heart failure", "days_out": 8, "risk": "High", "doctor": "Dr. A. Mehta", "cost": 145000, "status": "Paid", "room": "Cardiology Unit"},
        {"patient_id": "P-0887", "patient_name": "Sunita Verma", "age": 71, "gender": "Female", "dept": "Pulmonology", "diagnosis_cat": "Respiratory", "diagnosis": "Pneumonia", "days_out": 14, "risk": "High", "doctor": "Dr. S. Kulkarni", "cost": 92000, "status": "Pending", "room": "General Ward"},
        {"patient_id": "P-2201", "patient_name": "Amitabh Patel", "age": 58, "gender": "Male", "dept": "Endocrinology", "diagnosis_cat": "Other", "diagnosis": "Diabetes", "days_out": 22, "risk": "Medium", "doctor": "Dr. R. Deshmukh", "cost": 68000, "status": "Paid", "room": "General Ward"},
        {"patient_id": "P-3309", "patient_name": "Priya Nair", "age": 62, "gender": "Female", "dept": "Pulmonology", "diagnosis_cat": "Respiratory", "diagnosis": "COPD", "days_out": 19, "risk": "Medium", "doctor": "Dr. S. Kulkarni", "cost": 84000, "status": "Pending", "room": "General Ward"},
        {"patient_id": "P-0554", "patient_name": "Vikram Singh", "age": 79, "gender": "Male", "dept": "Orthopedics", "diagnosis_cat": "Trauma", "diagnosis": "Hip fracture", "days_out": 27, "risk": "Low", "doctor": "Dr. K. Joshi", "cost": 210000, "status": "Paid", "room": "General Ward"},
        {"patient_id": "P-4102", "patient_name": "Ananya Roy", "age": 45, "gender": "Female", "dept": "General Ward", "diagnosis_cat": "Other", "diagnosis": "Acute Appendicitis", "days_out": None, "risk": "Low", "doctor": "Dr. N. Roy", "cost": 55000, "status": "Paid", "room": "General Ward"},
        {"patient_id": "P-5190", "patient_name": "Suresh Gupta", "age": 68, "gender": "Male", "dept": "ICU", "diagnosis_cat": "Other", "diagnosis": "Sepsis", "days_out": None, "risk": "High", "doctor": "Dr. M. Chawla", "cost": 340000, "status": "Partial", "room": "ICU"}
    ]

    # Department distribution probabilities: GW ~55%, ICU ~20%, Card ~15%, Ortho ~5%, Peds ~5%
    depts = ["General Ward", "ICU", "Cardiology", "Orthopedics", "Pediatrics"]
    dept_weights = [0.52, 0.22, 0.16, 0.05, 0.05]

    # Diagnosis categories: Cardiac (30%), Respiratory (20%), Trauma (16%), Other (34%)
    diag_cats = ["Cardiac", "Respiratory", "Trauma", "Other"]
    diag_weights = [0.30, 0.20, 0.16, 0.34]

    sub_diags = {
        "Cardiac": ["Heart failure", "Acute Coronary Syndrome", "Cardiac Arrhythmia", "Hypertensive Emergency"],
        "Respiratory": ["Pneumonia", "COPD Exacerbation", "Severe Asthma", "Bronchitis"],
        "Trauma": ["Hip fracture", "Femur fracture", "Multiple Trauma", "Joint Dislocation"],
        "Other": ["Diabetes with Complications", "Acute Appendicitis", "Sepsis", "Gastroenteritis", "Renal Calculi"]
    }

    start_date = datetime.date(2024, 1, 1)
    end_date = datetime.date(2024, 6, 30)
    total_days = (end_date - start_date).days

    records = []
    
    # Track readmission count
    readmit_count = 0
    
    # We will generate admissions
    for i in range(1, TOTAL_ADMISSIONS + 1):
        adm_id = f"ADM-2024-{i:05d}"
        
        # Check if we should insert one of the known seeds
        if i <= len(known_seed_patients):
            seed = known_seed_patients[i - 1]
            p_id = seed["patient_id"]
            name = seed["patient_name"]
            age = seed["age"]
            gender = seed["gender"]
            dept = seed["dept"]
            diag_cat = seed["diagnosis_cat"]
            diag = seed["diagnosis"]
            doc = seed["doctor"]
            room = seed["room"]
            payment_status = seed["status"]
            days_out = seed["days_out"]
            is_readmit = 1 if days_out is not None and days_out <= 30 else 0
            if is_readmit:
                readmit_count += 1
            risk = seed["risk"]
            
            # Generate appropriate dates in May/June
            day_offset = random.randint(90, 170)
            adm_dt = start_date + datetime.timedelta(days=day_offset)
            los = 4 if dept != "ICU" else 6
            disch_dt = adm_dt + datetime.timedelta(days=los)
            
            if days_out is not None:
                prev_disch_dt = adm_dt - datetime.timedelta(days=days_out)
            else:
                prev_disch_dt = ""

            treatment_cost = seed["cost"]
            insurance = int(treatment_cost * 0.85)
            oop = treatment_cost - insurance

        else:
            p_num = random.randint(100, 3500)
            p_id = f"P-{p_num:04d}"
            name = f"{random.choice(first_names)} {random.choice(last_names)}"
            age = random.choices([random.randint(18, 45), random.randint(46, 65), random.randint(66, 88)], weights=[0.25, 0.40, 0.35])[0]
            gender = random.choice(["Male", "Female"])

            dept = random.choices(depts, weights=dept_weights)[0]
            
            # Diagnosis category aligned with department or weighted
            if dept == "Cardiology":
                diag_cat = "Cardiac"
            elif dept == "ICU":
                diag_cat = random.choices(["Cardiac", "Respiratory", "Trauma", "Other"], weights=[0.35, 0.25, 0.15, 0.25])[0]
            elif dept == "Orthopedics":
                diag_cat = "Trauma"
            else:
                diag_cat = random.choices(diag_cats, weights=diag_weights)[0]

            diag = random.choice(sub_diags[diag_cat])
            
            if dept in doctors_by_dept:
                doc, room = doctors_by_dept[dept]
            else:
                doc, room = ("Dr. N. Roy", "General Ward")

            # Length of stay calibrated: overall avg 4.2
            # ICU avg 6.2, GW avg 4.8, Cardiology avg 4.1, Ortho avg 3.9, Peds avg 3.2
            if dept == "ICU":
                los = random.choices([3, 4, 5, 6, 7, 8, 10, 14], weights=[0.05, 0.15, 0.25, 0.30, 0.15, 0.05, 0.03, 0.02])[0]
            elif dept == "Cardiology":
                los = random.choices([2, 3, 4, 5, 6, 7], weights=[0.16, 0.32, 0.30, 0.14, 0.05, 0.03])[0]
            elif dept == "General Ward":
                los = random.choices([2, 3, 4, 5, 6, 7, 8], weights=[0.10, 0.28, 0.34, 0.18, 0.07, 0.02, 0.01])[0]
            elif dept == "Pediatrics":
                los = random.choices([1, 2, 3, 4, 5], weights=[0.20, 0.40, 0.25, 0.10, 0.05])[0]
            else: # Orthopedics
                los = random.choices([2, 3, 4, 5, 6], weights=[0.15, 0.35, 0.30, 0.15, 0.05])[0]

            # Date distribution matching monthly totals
            month_choice = random.choices([1, 2, 3, 4, 5, 6], weights=[810, 940, 740, 1000, 850, 872])[0]
            if month_choice in [1, 3, 5]:
                day_in_month = random.randint(1, 31)
            elif month_choice in [4, 6]:
                day_in_month = random.randint(1, 30)
            else:
                day_in_month = random.randint(1, 29) # 2024 is leap year
            
            adm_dt = datetime.date(2024, month_choice, day_in_month)
            disch_dt = adm_dt + datetime.timedelta(days=los)

            # Determine readmission status (target 12.4% overall -> 597)
            # Guarantee remaining slots if we are running low toward the end
            remaining_slots = TOTAL_ADMISSIONS - i
            remaining_needed = READMISSION_TARGET - readmit_count
            prob = max(0.124, remaining_needed / (remaining_slots + 1)) if remaining_needed > 0 else 0
            needs_readmit = (readmit_count < READMISSION_TARGET) and (random.random() < prob)
            
            if needs_readmit and month_choice > 1:
                is_readmit = 1
                readmit_count += 1
                days_out = random.randint(3, 30)
                prev_disch_dt = adm_dt - datetime.timedelta(days=days_out)
                if days_out <= 10:
                    risk = "High"
                elif days_out <= 20:
                    risk = "Medium"
                else:
                    risk = "Low"
            else:
                is_readmit = 0
                days_out = None
                prev_disch_dt = ""
                # General clinical readmission risk
                if diag_cat == "Cardiac" or dept == "ICU":
                    risk = random.choices(["High", "Medium", "Low"], weights=[0.35, 0.45, 0.20])[0]
                elif diag_cat == "Respiratory":
                    risk = random.choices(["High", "Medium", "Low"], weights=[0.25, 0.50, 0.25])[0]
                else:
                    risk = random.choices(["High", "Medium", "Low"], weights=[0.10, 0.30, 0.60])[0]

            # Billing amount calibrated: treatment cost average ~ 1,134 INR (in lakhs: 54.6L / 4812 ~ 1135 per adm in scaled units, or standard hospital INR)
            # Total Revenue Collected = ₹48.2L, Pending = ₹6.4L, Total = ₹54.6L
            # For realistic INR, we can store in rupees: 48.2 Lakhs = 4,820,000 INR
            base_cost = random.randint(40000, 250000) if dept == "ICU" else random.randint(25000, 150000)
            treatment_cost = int(base_cost * (los / 3.5))
            insurance = int(treatment_cost * random.uniform(0.75, 0.95))
            oop = treatment_cost - insurance
            
            payment_status = random.choices(["Paid", "Pending", "Partial"], weights=[0.75, 0.15, 0.10])[0]

        records.append({
            "Admission_ID": adm_id,
            "Patient_ID": p_id,
            "Patient_Name": name,
            "Age": age,
            "Gender": gender,
            "Department": dept,
            "Doctor_Name": doc,
            "Diagnosis_Category": diag_cat,
            "Diagnosis": diag,
            "Admission_Date": adm_dt.strftime("%Y-%m-%d"),
            "Discharge_Date": disch_dt.strftime("%Y-%m-%d"),
            "Month": adm_dt.strftime("%b %Y"),
            "Quarter": f"Q{(adm_dt.month - 1)//3 + 1} 2024",
            "Length_of_Stay_Days": los,
            "Room_Type": room,
            "Admission_Status": "Discharged" if disch_dt <= end_date else "Admitted",
            "Prior_Discharge_Date": prev_disch_dt.strftime("%Y-%m-%d") if isinstance(prev_disch_dt, datetime.date) else prev_disch_dt,
            "Days_Since_Prior_Discharge": days_out if days_out is not None else "",
            "Is_30_Day_Readmission": is_readmit,
            "Readmission_Risk_Tier": risk,
            "Treatment_Cost_INR": treatment_cost,
            "Insurance_Covered_INR": insurance,
            "Out_of_Pocket_Due_INR": oop,
            "Amount_Collected_INR": treatment_cost if payment_status == "Paid" else (insurance if payment_status == "Partial" else 0),
            "Payment_Status": payment_status,
            "Billing_Date": disch_dt.strftime("%Y-%m-%d")
        })

    # Save to CSV
    csv_file = 'tableau_data/medflow_admissions_4812.csv'
    with open(csv_file, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=list(records[0].keys()))
        writer.writeheader()
        writer.writerows(records)

    # Calculate and verify statistics
    total_records = len(records)
    avg_los = sum(r["Length_of_Stay_Days"] for r in records) / total_records
    total_readmits = sum(r["Is_30_Day_Readmission"] for r in records)
    readmit_rate = (total_readmits / total_records) * 100
    total_cost = sum(r["Treatment_Cost_INR"] for r in records)
    total_collected = sum(r["Amount_Collected_INR"] for r in records)

    print(f"Generated {total_records} admissions:")
    print(f" - Average LOS: {avg_los:.2f} days (target: 4.2d)")
    print(f" - 30-Day Readmissions: {total_readmits} ({readmit_rate:.2f}%, target: 12.4%)")
    print(f" - Total Treatment Cost: INR {total_cost:,.2f}")
    print(f" - Total Collected: INR {total_collected:,.2f}")

if __name__ == '__main__':
    generate_datasets()
