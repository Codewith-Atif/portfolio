from pathlib import Path
import pandas as pd
ROOT=Path(__file__).resolve().parents[1];df=pd.read_csv(ROOT/'data'/'hr_employees.csv');df['attrition_flag']=df.attrition.eq('Yes');summary=pd.DataFrame({'metric':['Headcount','Attrition Rate','Average Income','Average Tenure','Engagement','Performance'],'value':[len(df),df.attrition_flag.mean(),df.monthly_income.mean(),df.years_at_company.mean(),df.engagement_score.mean(),df.performance_rating.mean()]});summary.to_csv(ROOT/'data'/'kpi_summary.csv',index=False);print(summary.to_string(index=False))
