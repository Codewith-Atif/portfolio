from pathlib import Path
import pandas as pd
from openpyxl.styles import Font,PatternFill
R=Path(__file__).resolve().parents[1];d=pd.read_csv(R/'data'/'hr_employees.csv');d['attrition_flag']=d.attrition.eq('Yes');dept=d.groupby('department').agg(Headcount=('employee_id','count'),Attrition_Rate=('attrition_flag','mean'),Avg_Income=('monthly_income','mean'),Engagement=('engagement_score','mean')).reset_index();out=R/'excel'/'HR_Analytics.xlsx'
with pd.ExcelWriter(out,engine='openpyxl') as w:
 d.to_excel(w,index=False,sheet_name='Employee Data');dept.to_excel(w,index=False,sheet_name='Department Summary')
 for s in w.book.worksheets:
  s.freeze_panes='A2';s.auto_filter.ref=s.dimensions
  for c in s[1]:c.font=Font(color='FFFFFF',bold=True);c.fill=PatternFill('solid',fgColor='9D174D')
  for col in s.columns:s.column_dimensions[col[0].column_letter].width=min(28,max(12,max(len(str(c.value or '')) for c in col)+2))
print(out)
