(function(){
  const root=document.documentElement,toggle=document.getElementById('themeToggle'),icon=document.getElementById('themeIcon'),label=document.getElementById('themeLabel'),meta=document.querySelector('meta[name="theme-color"]');
  function apply(theme){root.dataset.theme=theme;localStorage.setItem('airport-theme',theme);const light=theme==='light';icon.textContent=light?'☾':'☀';label.textContent=light?'Dark mode':'Light mode';meta.content=light?'#f7f5fb':'#130e1c';window.dispatchEvent(new Event('resize'))}
  apply(localStorage.getItem('airport-theme')||(matchMedia('(prefers-color-scheme:light)').matches?'light':'dark'));
  toggle.addEventListener('click',()=>apply(root.dataset.theme==='light'?'dark':'light'));
  const menu=document.getElementById('mobileMenu'),side=document.getElementById('sidebar'),back=document.getElementById('sidebarBackdrop');
  function close(){side.classList.remove('open');back.classList.remove('show');menu.setAttribute('aria-expanded','false')}
  menu.addEventListener('click',()=>{const open=side.classList.toggle('open');back.classList.toggle('show',open);menu.setAttribute('aria-expanded',String(open))});back.addEventListener('click',close);document.querySelectorAll('.sidebar nav a').forEach(a=>a.addEventListener('click',close));
  const sections=[...document.querySelectorAll('main section[id]')];addEventListener('scroll',()=>{const current=sections.filter(s=>s.getBoundingClientRect().top<180).at(-1)?.id||'overview';document.querySelectorAll('.sidebar nav a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+current))},{passive:true});
})();
