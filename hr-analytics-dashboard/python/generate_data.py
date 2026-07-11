"""Generate reproducible synthetic HR employee data."""
import csv,random
from pathlib import Path
random.seed(47);OUT=Path(__file__).resolve().parents[1]/'data'/'hr_employees.csv'
DEPTS={'Technology':['Data Analyst','Software Engineer','IT Support'],'Sales':['Account Executive','Sales Manager','Business Development'],'Operations':['Operations Analyst','Team Lead','Coordinator'],'Finance':['Financial Analyst','Accountant','Finance Manager'],'HR':['HR Analyst','Recruiter','HR Business Partner']}
def main(n=1200):
 rows=[]
 for i in range(1,n+1):
  dept=random.choices(list(DEPTS),[.31,.23,.2,.15,.11])[0];level=random.choices([1,2,3,4,5],[.26,.3,.24,.14,.06])[0];age=random.randint(21+level,58);tenure=min(age-20,max(0,round(random.gauss(level*1.7,2.4))));overtime=random.choices(['Yes','No'],[.29,.71])[0];sat=random.choices([1,2,3,4],[.11,.2,.4,.29])[0];eng=max(35,min(98,round(random.gauss(72+(sat-2.5)*6-(8 if overtime=='Yes' else 0),10))));perf=max(1,min(5,round(random.gauss(3.45+(eng-70)/55,.65),1)));salary=round((27000+level*22000+tenure*1250+random.gauss(0,6500))/500)*500;prob=.055+(overtime=='Yes')*.1+(sat<=2)*.11+(eng<60)*.1+(tenure<2)*.06-(level>=4)*.035;attr='Yes' if random.random()<prob else 'No';month=f"2026-{random.randint(1,12):02d}"
  work_mode=random.choices(['Hybrid','On-site','Remote'],[.48,.34,.18])[0];education=random.choice(['Bachelors','Masters','Diploma','Doctorate']);training=max(4,round(random.gauss(28+level*2,10)));absence=max(0,round(random.gauss(6+(5 if eng<60 else 0),4)));manager=max(1,min(5,round(random.gauss(3.6,.7),1)));promotion='Yes' if tenure>=2 and perf>=3.7 and eng>=68 and random.random()<.62 else 'No'
  rows.append([f'EMP{i:04d}',age,random.choice(['Female','Male','Non-binary']),dept,random.choice(DEPTS[dept]),level,tenure,max(22000,salary),overtime,sat,eng,perf,attr,month,work_mode,education,training,absence,manager,promotion])
 OUT.parent.mkdir(exist_ok=True);h=['employee_id','age','gender','department','job_role','job_level','years_at_company','monthly_income','overtime','job_satisfaction','engagement_score','performance_rating','attrition','review_month','work_mode','education','training_hours','absence_days','manager_rating','promotion_eligible']
 with OUT.open('w',newline='',encoding='utf-8') as f:w=csv.writer(f);w.writerow(h);w.writerows(rows)
 print(f'Created {OUT} with {n} records')
if __name__=='__main__':main()
