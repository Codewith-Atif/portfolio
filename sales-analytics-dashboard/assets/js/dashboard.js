let salesData = [];
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeLabel = document.getElementById('themeLabel');
const dashboardStatus = document.getElementById('dashboardStatus');

function preferredTheme(){
  let saved;
  try { saved = localStorage.getItem('sales-dashboard-theme'); } catch (error) {}
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(theme, redraw = false){
  root.dataset.theme = theme;
  const isDark = theme === 'dark';
  themeLabel.textContent = isDark ? 'Light' : 'Dark';
  themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} theme`);
  themeToggle.setAttribute('aria-pressed', String(!isDark));
  if (redraw && salesData.length) plotCharts(filtered());
}

applyTheme(preferredTheme());
themeToggle.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('sales-dashboard-theme', next); } catch (error) {}
  applyTheme(next, true);
});

const money = n => '$' + Math.round(n || 0).toLocaleString();
const pct = n => ((n || 0) * 100).toFixed(1) + '%';

function groupSum(data, key, value){
  const m = {};
  data.forEach(r => {
    const k = r[key] || 'Unknown';
    m[k] = (m[k] || 0) + Number(r[value] || 0);
  });
  return m;
}

function unique(data, key){
  return [...new Set(data.map(r => r[key]).filter(Boolean))].sort();
}

function parseCSV(text){
  const lines = text.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());

  return lines.slice(1).map(line => {
    const values = line.split(',');
    const obj = {};
    headers.forEach((h, i) => obj[h] = values[i]?.trim());
    return obj;
  });
}

function fillFilters(){
  const filters = [
    ['regionFilter', 'region'],
    ['categoryFilter', 'category'],
    ['segmentFilter', 'customer_segment']
  ];

  filters.forEach(([id, key]) => {
    const el = document.getElementById(id);

    unique(salesData, key).forEach(v => {
      const option = document.createElement('option');
      option.value = v;
      option.textContent = v;
      el.appendChild(option);
    });

    el.addEventListener('change', updateDashboard);
  });
}

function filtered(){
  const region = document.getElementById('regionFilter').value;
  const category = document.getElementById('categoryFilter').value;
  const segment = document.getElementById('segmentFilter').value;

  return salesData.filter(r =>
    (region === 'All' || r.region === region) &&
    (category === 'All' || r.category === category) &&
    (segment === 'All' || r.customer_segment === segment)
  );
}

function updateKPIs(data){
  const sales = data.reduce((a, r) => a + Number(r.sales || 0), 0);
  const profit = data.reduce((a, r) => a + Number(r.profit || 0), 0);
  const orders = new Set(data.map(r => r.order_id)).size;
  const customers = new Set(data.map(r => r.customer_id || r.customer_name)).size;
  const aov = sales / (orders || 1);
  const margin = profit / (sales || 1);

  document.getElementById('salesKpi').textContent = money(sales);
  document.getElementById('profitKpi').textContent = money(profit);
  document.getElementById('ordersKpi').textContent = orders.toLocaleString();
  document.getElementById('aovKpi').textContent = money(aov);
  document.getElementById('marginKpi').textContent = pct(margin);
}

function chartTheme(){
  const styles = getComputedStyle(root);
  const grid = styles.getPropertyValue('--grid').trim();
  return {
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    colorway: ['#2fb8ad', '#7c3aed', '#38bdf8', '#f59e0b', '#f472b6'],
    font: { color: styles.getPropertyValue('--text').trim(), family: 'Inter, Segoe UI, Arial' },
    margin: { t: 20, l: 58, r: 24, b: 55 },
    xaxis: { gridcolor: grid, zerolinecolor: grid, automargin: true },
    yaxis: { gridcolor: grid, zerolinecolor: grid, automargin: true },
    hoverlabel: { bgcolor: styles.getPropertyValue('--panel-solid').trim(), bordercolor: styles.getPropertyValue('--line').trim() }
  };
}

const config = {
  responsive: true,
  displayModeBar: false
};

function plotCharts(data){
  const layoutBase = chartTheme();
  const compact = window.innerWidth < 520;

  const monthly = {};
  data.forEach(r => {
    const month = r.order_date?.slice(0, 7) || 'Unknown';
    monthly[month] = (monthly[month] || 0) + Number(r.sales || 0);
  });

  const months = Object.keys(monthly).sort();

  Plotly.newPlot('monthlyTrend', [{
    x: months,
    y: months.map(m => monthly[m]),
    type: 'scatter',
    mode: 'lines+markers',
    fill: 'tozeroy',
    line: {
      width: 4
    },
    marker: {
      size: 8
    },
    hovertemplate: '<b>%{x}</b><br>Revenue: $%{y:,.0f}<extra></extra>'
  }], {
    ...layoutBase,
    height: compact ? 300 : 360
  }, config);

  const region = groupSum(data, 'region', 'sales');

  Plotly.newPlot('regionChart', [{
    x: Object.keys(region),
    y: Object.values(region),
    type: 'bar',
    hovertemplate: '<b>%{x}</b><br>Revenue: $%{y:,.0f}<extra></extra>'
  }], {
    ...layoutBase,
    height: compact ? 300 : 330
  }, config);

  const category = groupSum(data, 'category', 'profit');

  Plotly.newPlot('categoryChart', [{
    labels: Object.keys(category),
    values: Object.values(category),
    type: 'pie',
    hole: .55,
    textinfo: 'label+percent',
    hovertemplate: '<b>%{label}</b><br>Profit: $%{value:,.0f}<extra></extra>'
  }], {
    ...layoutBase,
    height: compact ? 300 : 330,
    showlegend: false
  }, config);

  const segment = groupSum(data, 'customer_segment', 'sales');

  Plotly.newPlot('segmentChart', [{
    x: Object.keys(segment),
    y: Object.values(segment),
    type: 'bar',
    hovertemplate: '<b>%{x}</b><br>Revenue: $%{y:,.0f}<extra></extra>'
  }], {
    ...layoutBase,
    height: compact ? 300 : 330
  }, config);

  const city = groupSum(data, 'city', 'sales');

  const topCities = Object.entries(city)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .reverse();

  Plotly.newPlot('cityChart', [{
    x: topCities.map(x => x[1]),
    y: topCities.map(x => x[0]),
    type: 'bar',
    orientation: 'h',
    hovertemplate: '<b>%{y}</b><br>Revenue: $%{x:,.0f}<extra></extra>'
  }], {
    ...layoutBase,
    height: compact ? 300 : 330,
    margin: {
      t: 20,
      l: compact ? 82 : 120,
      r: 20,
      b: 45
    }
  }, config);
}

function updateDashboard(){
  const data = filtered();
  updateKPIs(data);
  plotCharts(data);
}

fetch('data/sales_data.csv')
  .then(response => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.text();
  })
  .then(text => {
    salesData = parseCSV(text);
    fillFilters();
    updateDashboard();
    dashboardStatus.textContent = '';
  })
  .catch(error => {
    console.error('Dataset loading error:', error);
    dashboardStatus.textContent = 'Dashboard data could not be loaded. Please refresh or try again later.';
    dashboardStatus.classList.add('error');
  });

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (salesData.length) plotCharts(filtered());
  }, 180);
});
