let salesData = [];
const money = n => '$' + Math.round(n).toLocaleString();
const pct = n => (n * 100).toFixed(1) + '%';
function groupSum(data, key, value){const m={}; data.forEach(r=>m[r[key]]=(m[r[key]]||0)+Number(r[value])); return m;}
function unique(data,key){return [...new Set(data.map(r=>r[key]))].sort();}
function parseCSV(text){
  const lines=text.trim().split('\n'); const headers=lines[0].split(',');
  return lines.slice(1).map(line=>{const values=line.split(','); const obj={}; headers.forEach((h,i)=>obj[h]=values[i]); return obj;});
}
function fillFilters(){
  [['regionFilter','region'],['categoryFilter','category'],['segmentFilter','customer_segment']].forEach(([id,key])=>{
    const el=document.getElementById(id); unique(salesData,key).forEach(v=>{const o=document.createElement('option');o.value=v;o.textContent=v;el.appendChild(o);});
    el.addEventListener('change', updateDashboard);
  });
}
function filtered(){
  const region=document.getElementById('regionFilter').value, cat=document.getElementById('categoryFilter').value, seg=document.getElementById('segmentFilter').value;
  return salesData.filter(r=>(region==='All'||r.region===region)&&(cat==='All'||r.category===cat)&&(seg==='All'||r.customer_segment===seg));
}
function updateKPIs(data){
  const sales=data.reduce((a,r)=>a+Number(r.sales),0), profit=data.reduce((a,r)=>a+Number(r.profit),0), orders=new Set(data.map(r=>r.order_id)).size;
  document.getElementById('salesKpi').textContent=money(sales);
  document.getElementById('profitKpi').textContent=money(profit);
  document.getElementById('ordersKpi').textContent=orders.toLocaleString();
  document.getElementById('aovKpi').textContent=money(sales/(orders||1));
  document.getElementById('marginKpi').textContent=pct(profit/(sales||1));
}
function plotCharts(data){
  const layout={paper_bgcolor:'rgba(0,0,0,0)',plot_bgcolor:'rgba(0,0,0,0)',font:{color:'#eef5ff'},margin:{t:50,l:55,r:25,b:55}};
  const config={responsive:true,displayModeBar:false};
  const monthly={}; data.forEach(r=>{const m=r.order_date.slice(0,7); monthly[m]=(monthly[m]||0)+Number(r.sales);});
  const months=Object.keys(monthly).sort();
  Plotly.newPlot('monthlyTrend',[{x:months,y:months.map(m=>monthly[m]),type:'scatter',mode:'lines+markers',fill:'tozeroy'}],{...layout,title:'Monthly Sales Trend'},config);
  const rg=groupSum(data,'region','sales'); Plotly.newPlot('regionChart',[{x:Object.keys(rg),y:Object.values(rg),type:'bar'}],{...layout,title:'Sales by Region'},config);
  const cg=groupSum(data,'category','profit'); Plotly.newPlot('categoryChart',[{labels:Object.keys(cg),values:Object.values(cg),type:'pie',hole:.45}],{...layout,title:'Profit by Category'},config);
  const sg=groupSum(data,'customer_segment','sales'); Plotly.newPlot('segmentChart',[{x:Object.keys(sg),y:Object.values(sg),type:'bar'}],{...layout,title:'Sales by Segment'},config);
  const city=groupSum(data,'city','sales'); const top=Object.entries(city).sort((a,b)=>b[1]-a[1]).slice(0,10).reverse(); Plotly.newPlot('cityChart',[{x:top.map(x=>x[1]),y:top.map(x=>x[0]),type:'bar',orientation:'h'}],{...layout,title:'Top 10 Cities by Revenue'},config);
}
function updateDashboard(){const data=filtered(); updateKPIs(data); plotCharts(data);}
fetch('data/sales_data.csv').then(r=>r.text()).then(text=>{salesData=parseCSV(text); fillFilters(); updateDashboard();});
