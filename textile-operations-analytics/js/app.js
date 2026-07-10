document.addEventListener('DOMContentLoaded', async () => {
  const $ = id => document.getElementById(id);
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('textile-theme');
  const preferredDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const setTheme = theme => {
    root.dataset.theme = theme;
    $('themeIcon').textContent = theme === 'dark' ? '☀' : '☾';
    const label = document.querySelector('.theme-label');
    if(label) label.textContent = theme === 'dark' ? 'Light' : 'Dark';
  };
  setTheme(savedTheme || (preferredDark ? 'dark' : 'light'));
  $('themeToggle').addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(next); localStorage.setItem('textile-theme', next);
  });
  const num = v => Number(v) || 0;
  const format = n => new Intl.NumberFormat('en-IN',{notation:'compact',maximumFractionDigits:2}).format(n);
  let rows = [];

  function sum(data,key){return data.reduce((a,r)=>a+num(r[key]),0)}
  function group(data,key,value){return data.reduce((o,r)=>{o[r[key]]=(o[r[key]]||0)+num(r[value]);return o},{})}
  function svgBox(id,inner,height=270){
    const old=$(id),box=document.createElement('div'); box.id=id; box.style.cssText=`height:${height}px;width:100%`;
    box.innerHTML=`<svg viewBox="0 0 900 ${height}" width="100%" height="100%" role="img"><g>${inner}</g></svg>`; old.replaceWith(box);
  }
  function grid(w,h,p){let s='';for(let i=0;i<5;i++){const y=p+i*(h-p*2)/4;s+=`<line x1="${p}" y1="${y}" x2="${w-p}" y2="${y}" stroke="var(--chart-grid)"/>`}return s}
  function bars(id,labels,values,suffix=''){
    const w=900,h=270,p=42,max=Math.max(...values,1)*1.14,slot=(w-p*2)/values.length,bw=Math.min(55,slot*.58);let s=grid(w,h,p);
    values.forEach((v,i)=>{const x=p+i*slot+(slot-bw)/2,bh=v/max*(h-p*2),y=h-p-bh;
      s+=`<rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="3" fill="var(--accent)"/><text x="${x+bw/2}" y="${Math.max(13,y-7)}" text-anchor="middle" font-size="10" fill="var(--text)">${suffix?v.toFixed(1)+suffix:format(v)}</text><text x="${x+bw/2}" y="${h-11}" text-anchor="middle" font-size="9" fill="var(--chart-text)">${labels[i].replace(' Variation',' Var.')}</text>`;
    }); svgBox(id,s);
  }
  function lineChart(labels,a,t){
    const w=900,h=270,p=40,max=Math.max(...a,...t,1)*1.08;
    const pts=v=>v.map((n,i)=>`${p+i*(w-p*2)/(v.length-1)},${h-p-n/max*(h-p*2)}`).join(' ');
    let s=grid(w,h,p)+`<polyline fill="none" stroke="var(--chart-text)" stroke-width="3" stroke-dasharray="7 6" points="${pts(t)}"/><polyline fill="none" stroke="var(--accent)" stroke-width="4" points="${pts(a)}"/>`;
    a.forEach((v,i)=>{const x=p+i*(w-p*2)/(a.length-1),y=h-p-v/max*(h-p*2);s+=`<circle cx="${x}" cy="${y}" r="4" fill="var(--accent)"/><text x="${x}" y="${h-10}" text-anchor="middle" font-size="10" fill="var(--chart-text)">${labels[i]}</text>`});
    s+=`<text x="680" y="17" font-size="11" fill="var(--accent)">● Actual</text><text x="760" y="17" font-size="11" fill="var(--chart-text)">-- Target</text>`;svgBox('trendChart',s);
  }
  function render(data){
    if(!data.length)return;
    const actual=sum(data,'actual_meters'),target=sum(data,'target_meters'),defects=sum(data,'defect_meters');
    $('productionKpi').textContent=format(actual);$('efficiencyKpi').textContent=(100*actual/target).toFixed(1)+'%';
    $('defectKpi').textContent=(100*defects/actual).toFixed(1)+'%';$('wasteKpi').textContent=(100*sum(data,'waste_kg')/sum(data,'material_issued_kg')).toFixed(1)+'%';
    $('otdKpi').textContent=(100*data.filter(r=>r.delivery_status==='On Time').length/data.length).toFixed(1)+'%';
    $('recordCount').textContent=`Showing ${data.length.toLocaleString('en-IN')} production records`;
    const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],ma=group(data,'month','actual_meters'),mt=group(data,'month','target_meters');
    lineChart(months,months.map(m=>ma[m]||0),months.map(m=>mt[m]||0));
    const plants=group(data,'plant','actual_meters');bars('plantChart',Object.keys(plants),Object.values(plants));
    const defectsBy=Object.entries(group(data,'defect_type','defect_meters')).sort((a,b)=>b[1]-a[1]);bars('defectChart',defectsBy.map(x=>x[0]),defectsBy.map(x=>x[1]));
    const la=group(data,'production_line','actual_meters'),lt=group(data,'production_line','target_meters'),lines=Object.keys(la).sort();bars('lineChart',lines.map(x=>x.replace('-L0','-')),lines.map(x=>100*la[x]/lt[x]),'%');
  }
  function fill(id,key){[...new Set(rows.map(r=>r[key]))].sort().forEach(v=>$(id).insertAdjacentHTML('beforeend',`<option value="${v}">${v}</option>`))}
  function apply(){const p=$('plantFilter').value,f=$('fabricFilter').value,s=$('shiftFilter').value;render(rows.filter(r=>(p==='All'||r.plant===p)&&(f==='All'||r.fabric_type===f)&&(s==='All'||r.shift===s)))}
  try{
    const response=await fetch(new URL('data/textile_production_data.csv',document.baseURI),{cache:'no-store'});
    if(!response.ok)throw new Error('Data unavailable');
    const text=await response.text(),[head,...lines]=text.trim().split(/\r?\n/),keys=head.split(',');
    rows=lines.map(line=>{const v=line.split(',');return Object.fromEntries(keys.map((k,i)=>[k,v[i]]))});
    fill('plantFilter','plant');fill('fabricFilter','fabric_type');fill('shiftFilter','shift');
    ['plantFilter','fabricFilter','shiftFilter'].forEach(id=>$(id).addEventListener('change',apply));
    $('resetFilters').addEventListener('click',()=>{['plantFilter','fabricFilter','shiftFilter'].forEach(id=>$(id).value='All');apply()});
    render(rows);
  }catch(e){$('recordCount').textContent='2025 portfolio summary';}
});