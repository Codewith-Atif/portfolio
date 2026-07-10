import fs from "node:fs/promises";
import { Workbook, SpreadsheetFile } from "@oai/artifact-tool";

const root = process.env.PROJECT_ROOT || new URL("../", import.meta.url).pathname;
const text = await fs.readFile(`${root}data/publishing_projects.csv`, "utf8");
const lines = text.trim().split(/\r?\n/).map(line => line.split(","));
const headers = lines[0];
const numeric = new Set(["pages","actual_hours","baseline_hours","hours_saved","actual_cost_inr","baseline_cost_inr","cost_saved_inr","revisions","quality_score"]);
const dates = new Set(["created_date","due_date","completed_date"]);
const rows = lines.slice(1).map(row => row.map((value,index) => numeric.has(headers[index]) ? Number(value) : dates.has(headers[index]) && value ? new Date(`${value}T00:00:00Z`) : value));

const wb = Workbook.create();
const dashboard = wb.worksheets.add("Executive Dashboard");
const summary = wb.worksheets.add("Analysis Summary");
const data = wb.worksheets.add("Project Data");
wb.comments.setSelf({displayName:"Atif"});

const dark="#18201F", teal="#0A776D", mint="#BEE9DC", lime="#D7EF72", paper="#F5F4EF", gray="#697371", line="#DDE3DF";
data.showGridLines=false;
data.getRangeByIndexes(0,0,rows.length+1,headers.length).values=[headers, ...rows];
data.getRange(`A1:U${rows.length+1}`).format.font={name:"Aptos",size:10,color:dark};
data.getRange("A1:U1").format={fill:dark,font:{bold:true,color:"#FFFFFF",size:10},rowHeight:28,verticalAlignment:"center"};
data.getRange(`B2:D${rows.length+1}`).format.numberFormat="yyyy-mm-dd";
data.getRange(`K2:P${rows.length+1}`).format.numberFormat="#,##0.0";
data.getRange(`S2:S${rows.length+1}`).format.numberFormat="0.0";
data.getRange(`A1:U${rows.length+1}`).format.autofitColumns();
data.getRange("A:U").format.columnWidth=14;
data.getRange("A:A").format.columnWidth=13;
data.getRange("E:I").format.columnWidth=18;
data.freezePanes.freezeRows(1);
const rawTable=data.tables.add(`A1:U${rows.length+1}`,true,"PublishingProjects");rawTable.style="TableStyleMedium2";

summary.showGridLines=false;
summary.getRange("A1:H1").merge();summary.getRange("A1").values=[["Analysis Summary · Formula-driven from Project Data"]];
summary.getRange("A1:H1").format={fill:dark,font:{bold:true,color:"#FFFFFF",size:16},rowHeight:36,verticalAlignment:"center"};
summary.getRange("A3:C3").values=[["Workflow","Projects","Avg Quality"]];
summary.getRange("A4:A5").values=[["AI-Assisted"],["Manual"]];
summary.getRange("B4").formulas=[[`=COUNTIF('Project Data'!$H$2:$H$721,A4)`]];summary.getRange("B4:B5").fillDown();
summary.getRange("C4").formulas=[[`=AVERAGEIF('Project Data'!$H$2:$H$721,A4,'Project Data'!$S$2:$S$721)`]];summary.getRange("C4:C5").fillDown();
summary.getRange("E3:F3").values=[["Department","Projects"]];
summary.getRange("E4:E7").values=[["Editorial"],["Design"],["Production"],["Digital Learning"]];
summary.getRange("F4").formulas=[[`=COUNTIF('Project Data'!$E$2:$E$721,E4)`]];summary.getRange("F4:F7").fillDown();
summary.getRange("A10:E10").values=[["Content Type","Projects","Avg Quality","Rework Rate","Hours Saved"]];
summary.getRange("A11:A15").values=[["School Textbook"],["Workbook"],["Assessment"],["Illustration"],["E-book"]];
summary.getRange("B11").formulas=[[`=COUNTIF('Project Data'!$F$2:$F$721,A11)`]];summary.getRange("B11:B15").fillDown();
summary.getRange("C11").formulas=[[`=AVERAGEIF('Project Data'!$F$2:$F$721,A11,'Project Data'!$S$2:$S$721)`]];summary.getRange("C11:C15").fillDown();
summary.getRange("D11").formulas=[[`=COUNTIFS('Project Data'!$F$2:$F$721,A11,'Project Data'!$Q$2:$Q$721,">0")/B11`]];summary.getRange("D11:D15").fillDown();
summary.getRange("E11").formulas=[[`=SUMIF('Project Data'!$F$2:$F$721,A11,'Project Data'!$M$2:$M$721)`]];summary.getRange("E11:E15").fillDown();
summary.getRange("A3:F3").format={fill:teal,font:{bold:true,color:"#FFFFFF"}};summary.getRange("A10:E10").format={fill:teal,font:{bold:true,color:"#FFFFFF"}};
summary.getRange("A3:F15").format.borders={preset:"inside",style:"thin",color:line};summary.getRange("C4:C15").format.numberFormat="0.0";summary.getRange("D11:D15").format.numberFormat="0.0%";summary.getRange("E11:E15").format.numberFormat="#,##0.0";summary.getRange("A:F").format.columnWidth=19;
const workflowChart=summary.charts.add("bar",summary.getRange("A3:C5"));workflowChart.setPosition("H3","N14");workflowChart.title="AI-assisted workflow maintains higher quality";workflowChart.hasLegend=true;
const deptChart=summary.charts.add("bar",summary.getRange("E3:F7"));deptChart.setPosition("H16","N29");deptChart.title="Project volume by department";deptChart.hasLegend=false;

dashboard.showGridLines=false;dashboard.getRange("A1:L2").merge();dashboard.getRange("A1").values=[["AI Publishing Operations Analytics"]];dashboard.getRange("A1:L2").format={fill:dark,font:{bold:true,color:"#FFFFFF",size:22},verticalAlignment:"center"};
dashboard.getRange("A3:L3").merge();dashboard.getRange("A3").values=[["Executive KPI dashboard · 720 synthetic publishing projects · 2025–2026"]];dashboard.getRange("A3:L3").format={fill:dark,font:{color:mint,size:10}};
const cards=[["A5:B5","A6:B7","Projects",`=COUNTA('Project Data'!$A$2:$A$721)`,"#,##0"],["D5:E5","D6:E7","On-time Rate",`=COUNTIF('Project Data'!$T$2:$T$721,"Yes")/COUNTIF('Project Data'!$U$2:$U$721,"Completed")`,"0.0%"],["G5:H5","G6:H7","First-pass Approval",`=COUNTIF('Project Data'!$R$2:$R$721,"Yes")/COUNTIF('Project Data'!$U$2:$U$721,"Completed")`,"0.0%"],["J5:L5","J6:L7","Avg Quality",`=AVERAGE('Project Data'!$S$2:$S$721)`,"0.0"]];
for(const [labelRange,valueRange,label,formula,format] of cards){dashboard.getRange(labelRange).merge();dashboard.getRange(valueRange).merge();dashboard.getRange(labelRange).values=[[label]];dashboard.getRange(valueRange).formulas=[[formula]];dashboard.getRange(labelRange).format={fill:mint,font:{bold:true,color:teal,size:10}};dashboard.getRange(valueRange).format={fill:"#FFFFFF",font:{bold:true,color:dark,size:22},verticalAlignment:"center"};dashboard.getRange(valueRange).format.numberFormat=format;}
dashboard.getRange("A10:C10").merge();dashboard.getRange("A11:C13").merge();dashboard.getRange("A10").values=[["ESTIMATED COST SAVED"]];dashboard.getRange("A11").formulas=[[`=SUM('Project Data'!$P$2:$P$721)`]];dashboard.getRange("A10:C10").format={fill:lime,font:{bold:true,color:dark}};dashboard.getRange("A11:C13").format={fill:dark,font:{bold:true,color:"#FFFFFF",size:20},verticalAlignment:"center"};dashboard.getRange("A11:C13").format.numberFormat='"₹"#,##0';
dashboard.getRange("E10:G10").merge();dashboard.getRange("E11:G13").merge();dashboard.getRange("E10").values=[["HOURS SAVED"]];dashboard.getRange("E11").formulas=[[`=SUM('Project Data'!$M$2:$M$721)`]];dashboard.getRange("E10:G10").format={fill:mint,font:{bold:true,color:teal}};dashboard.getRange("E11:G13").format={fill:"#FFFFFF",font:{bold:true,color:dark,size:22},verticalAlignment:"center"};dashboard.getRange("E11:G13").format.numberFormat="#,##0.0";
dashboard.getRange("I10:L13").merge();dashboard.getRange("I10").values=[["Insight\nAI-assisted and manual workflows can be compared consistently across speed, quality, rework, and savings. Use the Analysis Summary sheet for drill-down."]];dashboard.getRange("I10:L13").format={fill:paper,font:{color:gray,size:11},wrapText:true,verticalAlignment:"center"};
dashboard.getRange("A16:L16").merge();dashboard.getRange("A16").values=[["Workbook navigation: Executive Dashboard → Analysis Summary → Project Data"]];dashboard.getRange("A16:L16").format={fill:teal,font:{bold:true,color:"#FFFFFF"}};
dashboard.getRange("A:L").format.columnWidth=13;dashboard.getRange("C:C").format.columnWidth=3;dashboard.getRange("F:F").format.columnWidth=3;dashboard.getRange("I:I").format.columnWidth=3;
dashboard.getRange("A1:L16").format.borders={preset:"outside",style:"thin",color:line};
wb.comments.addThread({cell:dashboard.getRange("A3")},"Synthetic portfolio dataset. No employer or customer data is included.");

const inspect=await wb.inspect({kind:"table",range:"Executive Dashboard!A1:L16",include:"values,formulas",tableMaxRows:20,tableMaxCols:12});console.log(inspect.ndjson);
const errors=await wb.inspect({kind:"match",searchTerm:"#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",options:{useRegex:true,maxResults:100},summary:"final formula error scan"});console.log(errors.ndjson);
const preview=await wb.render({sheetName:"Executive Dashboard",range:"A1:L16",scale:1.5,format:"png"});await fs.writeFile(`${root}excel/dashboard_preview.png`,new Uint8Array(await preview.arrayBuffer()));
const summaryPreview=await wb.render({sheetName:"Analysis Summary",range:"A1:N29",scale:1,format:"png"});await fs.writeFile(`${root}excel/summary_preview.png`,new Uint8Array(await summaryPreview.arrayBuffer()));
const dataPreview=await wb.render({sheetName:"Project Data",range:"A1:U18",scale:.8,format:"png"});await fs.writeFile(`${root}excel/data_preview.png`,new Uint8Array(await dataPreview.arrayBuffer()));
const out=await SpreadsheetFile.exportXlsx(wb);await out.save(`${root}excel/Publishing_Analytics.xlsx`);
