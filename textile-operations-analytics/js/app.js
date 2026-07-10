document.addEventListener('DOMContentLoaded', () => {
  const $ = id => document.getElementById(id);
  const format = n => new Intl.NumberFormat('en-IN', {notation:'compact', maximumFractionDigits:2}).format(n);

  $('productionKpi').textContent = '1.36M';
  $('efficiencyKpi').textContent = '91.4%';
  $('defectKpi').textContent = '3.3%';
  $('wasteKpi').textContent = '3.9%';
  $('otdKpi').textContent = '92.2%';
  $('recordCount').textContent = 'Showing 1,500 production records';

  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const actual = [109750,123714,97916,113699,89826,131789,122207,111191,107980,124075,102404,125187];
  const target = [119210,134005,108154,123644,98442,144054,132952,121763,119344,135897,112678,137677];

  function svgBox(id, inner, height=270) {
    const old = $(id);
    const box = document.createElement('div');
    box.style.height = height + 'px';
    box.style.width = '100%';
    box.innerHTML = `<svg viewBox="0 0 900 ${height}" width="100%" height="100%" role="img" aria-label="Analytics chart">${inner}</svg>`;
    old.replaceWith(box);
  }
  function grid(w,h,pad) {
    let s='';
    for(let i=0;i<5;i++){const y=pad+i*(h-pad*2)/4;s+=`<line x1="${pad}" y1="${y}" x2="${w-pad}" y2="${y}" stroke="#e5ebe7"/>`;}
    return s;
  }
  function points(values,w,h,pad,max) {
    return values.map((v,i)=>`${pad+i*(w-pad*2)/(values.length-1)},${h-pad-(v/max)*(h-pad*2)}`).join(' ');
  }
  const W=900,H=270,P=38,maxMonth=155000;
  let trend=grid(W,H,P);
  trend+=`<polyline fill="none" stroke="#9bad9f" stroke-width="3" stroke-dasharray="7 6" points="${points(target,W,H,P,maxMonth)}"/>`;
  trend+=`<polyline fill="none" stroke="#0b7057" stroke-width="4" points="${points(actual,W,H,P,maxMonth)}"/>`;
  actual.forEach((v,i)=>{const x=P+i*(W-P*2)/11,y=H-P-(v/maxMonth)*(H-P*2);trend+=`<circle cx="${x}" cy="${y}" r="4" fill="#0b7057"/><text x="${x}" y="${H-10}" text-anchor="middle" font-size="11" fill="#61706b">${months[i]}</text>`;});
  trend+=`<text x="650" y="18" font-size="12" fill="#0b7057">● Actual</text><text x="735" y="18" font-size="12" fill="#61706b">-- Target</text>`;
  svgBox('trendChart',trend);

  function bars(id, labels, values, suffix='') {
    const w=900,h=270,p=42,max=Math.max(...values)*1.12,bw=(w-p*2)/values.length*.58;
    let s=grid(w,h,p);
    values.forEach((v,i)=>{const slot=(w-p*2)/values.length,x=p+i*slot+(slot-bw)/2,bh=v/max*(h-p*2),y=h-p-bh;
      s+=`<rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="5" fill="#0b7057"/><text x="${x+bw/2}" y="${y-7}" text-anchor="middle" font-size="11" fill="#10211d">${suffix? v+suffix:format(v)}</text><text x="${x+bw/2}" y="${h-12}" text-anchor="middle" font-size="10" fill="#61706b">${labels[i]}</text>`;
    });
    svgBox(id,s);
  }
  bars('plantChart',['Delhi NCR','Jaipur','Ludhiana','Surat'],[381266,280580,281243,416649]);
  bars('defectChart',['Weaving','Yarn Break','Shade Var.','Stain','Finishing'],[12377,10092,8554,7265,6933]);
  bars('lineChart',['DE-1','DE-2','DE-3','JA-1','JA-2','JA-3','LU-1','LU-2','LU-3','SU-1','SU-2','SU-3'],[90.9,91.2,91.9,91.8,91.6,91.0,91.3,90.9,91.4,91.3,91.3,91.8],'%');

  document.querySelectorAll('.filters select').forEach(select => select.disabled = true);
  $('resetFilters').textContent = '2025 Summary';
  $('resetFilters').disabled = true;
});