const palette={green:'#0b7057',lime:'#b9db69',ink:'#10211d',muted:'#9bad9f'};
let rows=[],charts=[];
const num=v=>Number(v)||0;
const pct=v=>`${v.toFixed(1)}%`;
const compact=v=>new Intl.NumberFormat('en-IN',{notation:'compact',maximumFractionDigits:2}).format(v);
async function init(){
  const response=await fetch('data/textile_production_data.csv');
  const text=await response.text();
  const [head,...lines]=text.trim().split(/\r?\n/); const keys=head.split(',');
  rows=lines.map(line=>{const values=line.split(',');return Object.fromEntries(keys.map((k,i)=>[k,values[i]]))});
  fillFilters(); render(rows);
  document.querySelectorAll('select').forEach(x=>x.addEventListener('change',applyFilters));
  document.getElementById('resetFilters').addEventListener('click',()=>{document.querySelectorAll('select').forEach(x=>x.value='All');applyFilters()});
}
function fillFilters(){[['plantFilter','plant'],['fabricFilter','fabric_type'],['shiftFilter','shift']].forEach(([id,key])=>{[...new Set(rows.map(r=>r[key]))].sort().forEach(v=>document.getElementById(id).insertAdjacentHTML('beforeend',`<option>${v}</option>`))})}
function applyFilters(){const p=plantFilter.value,f=fabricFilter.value,s=shiftFilter.value;render(rows.filter(r=>(p==='All'||r.plant===p)&&(f==='All'||r.fabric_type===f)&&(s==='All'||r.shift===s)))}
function sum(data,key){return data.reduce((a,r)=>a+num(r[key]),0)}
function group(data,key,value){return data.reduce((o,r)=>{o[r[key]]=(o[r[key]]||0)+num(r[value]);return o},{})}
function render(data){
  const actual=sum(data,'actual_meters'),target=sum(data,'target_meters'),defects=sum(data,'defect_meters'),waste=sum(data,'waste_kg');
  productionKpi.textContent=compact(actual); efficiencyKpi.textContent=pct(actual/target*100); defectKpi.textContent=pct(defects/actual*100); wasteKpi.textContent=pct(waste/sum(data,'material_issued_kg')*100);
  otdKpi.textContent=pct(data.filter(r=>r.delivery_status==='On Time').length/data.length*100); recordCount.textContent=`Showing ${data.length.toLocaleString('en-IN')} production records`;
  charts.forEach(c=>c.destroy());charts=[];
  const monthlyActual=group(data,'month','actual_meters'),monthlyTarget=group(data,'month','target_meters');
  const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  charts.push(new Chart(trendChart,{type:'line',data:{labels:months,datasets:[{label:'Actual',data:months.map(m=>monthlyActual[m]||0),borderColor:palette.green,backgroundColor:'#0b705722',fill:true,tension:.35},{label:'Target',data:months.map(m=>monthlyTarget[m]||0),borderColor:palette.muted,borderDash:[5,5],tension:.35}]},options:opts()}));
  const plants=group(data,'plant','actual_meters');charts.push(new Chart(plantChart,{type:'doughnut',data:{labels:Object.keys(plants),datasets:[{data:Object.values(plants),backgroundColor:['#0b7057','#58a079','#b9db69','#d9b85f'],borderWidth:0}]},options:opts()}));
  const defects=group(data,'defect_type','defect_meters');const ds=Object.entries(defects).sort((a,b)=>b[1]-a[1]);charts.push(new Chart(defectChart,{type:'bar',data:{labels:ds.map(x=>x[0]),datasets:[{label:'Defect metres',data:ds.map(x=>x[1]),backgroundColor:palette.green,borderRadius:5}]},options:opts()}));
  const lineA=group(data,'production_line','actual_meters'),lineT=group(data,'production_line','target_meters'),lines=Object.keys(lineA).sort();charts.push(new Chart(lineChart,{type:'bar',data:{labels:lines,datasets:[{label:'Efficiency %',data:lines.map(x=>lineA[x]/lineT[x]*100),backgroundColor:palette.green,borderRadius:4}]},options:{...opts(),scales:{y:{min:75,max:100}}}}));
}
function opts(){return{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{boxWidth:10,usePointStyle:true}}},scales:{x:{grid:{display:false}},y:{grid:{color:'#e7ece8'}}}}}
init().catch(()=>{document.getElementById('recordCount').textContent='Open through GitHub Pages or a local web server to load data.'});

