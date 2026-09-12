(function(){
  const form = document.getElementById('genForm');
  const genBtn = document.getElementById('genBtn');
  const previewBtn = document.getElementById('previewBtn');
  const preview = document.getElementById('preview');
  const frame = document.getElementById('previewFrame');

  function makeIndex(data){
    const skillsHtml = data.skills.split(',').map(s=>`<li><span class="skill-name">${escapeHtml(s.trim()||'Skill')}</span><span class="skill-desc">&nbsp;</span></li>`).join('\n');
    return `<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n<title>${escapeHtml(data.name)} — Web Developer</title>\n<meta name="description" content="${escapeHtml(data.bio)}">\n<link rel="stylesheet" href="style.css">\n</head>\n<body>\n<div class="wrap">\n  <header class="hero">\n    <p class="eyebrow">${escapeHtml(data.name)}</p>\n    <h1 class="hero-name">I build simple websites<br>that work.<svg class="underline" viewBox="0 0 320 12" aria-hidden="true"><path d="M2 8 C 80 2, 240 2, 318 8"/></svg></h1>\n    <p class="hero-bio">${escapeHtml(data.bio)}</p>\n    <a class="cta" href="#contact">Get in touch</a>\n  </header>\n\n  <section class="section">\n    <h2 class="section-title">What I can do</h2>\n    <ul class="skill-list">\n      ${skillsHtml}\n    </ul>\n  </section>\n\n  <section class="section">\n    <h2 class="section-title">Something I've built</h2>\n    <div class="project">\n      <div class="browser-frame" aria-hidden="true">\n        <div class="browser-bar">\n          <span class="dot"></span><span class="dot"></span><span class="dot"></span>\n        </div>\n        <div class="browser-body">\n          <p class="browser-placeholder">${escapeHtml(data.projectTitle||'example.com')}</p>\n        </div>\n      </div>\n      <div class="project-info">\n        <h3>${escapeHtml(data.projectTitle||'Project')}</h3>\n        <p>${escapeHtml(data.projectDesc||'Project description')}</p>\n      </div>\n    </div>\n  </section>\n\n  <section class="section" id="contact">\n    <h2 class="section-title">Need a simple website?</h2>\n    <p class="contact-text">I set up small, clean websites for people who want to get online without the hassle. Send me a message and tell me what you need.</p>\n    <div class="contact-links">\n      <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a>\n    </div>\n  </section>\n\n  <footer class="footer">\n    <p>Built by ${escapeHtml(data.name)}.</p>\n  </footer>\n</div>\n</body>\n</html>`;
  }

  function makeStyle(accent){
    return `:root{--bg:#10151c;--surface:#161d26;--border:#232c38;--text:#ecf0f3;--text-muted:#8d96a3;--accent:${accent};--accent-soft:#4a3820;--font-display:"Fraunces",serif;--font-body:"IBM Plex Sans",sans-serif}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--bg);color:var(--text);font-family:var(--font-body);line-height:1.6;-webkit-font-smoothing:antialiased}.wrap{max-width:700px;margin:0 auto;padding:6rem 1.5rem 4rem}.hero{margin-bottom:5rem}.eyebrow{margin:0 0 .75rem;font-size:.95rem;color:var(--accent);font-weight:600}.hero-name{position:relative;margin:0 0 1.5rem;font-family:var(--font-display);font-weight:600;font-size:clamp(2.1rem,5.5vw,3.2rem);line-height:1.15}.underline{display:block;width:min(320px,60%);height:12px;margin-top:.4rem}.underline path{fill:none;stroke:var(--accent);stroke-width:3;stroke-linecap:round}.hero-bio{max-width:46ch;color:var(--text-muted);font-size:1.05rem}.cta{display:inline-block;margin-top:1.75rem;padding:.75rem 1.5rem;background:var(--accent);color:#17130a;font-weight:600;text-decoration:none;border-radius:3px}.section{margin-bottom:4.5rem;padding-top:2.5rem;border-top:1px solid var(--border)}.section-title{font-family:var(--font-display);font-weight:600;font-size:1.5rem;margin:0 0 1.75rem}.skill-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:1.25rem}.kill-list li{display:grid;grid-template-columns:9rem 1fr;gap:1rem;align-items:baseline}.skill-name{font-weight:600;color:var(--accent)}.skill-desc{color:var(--text-muted)}.project{display:grid;gap:1.5rem}.browser-frame{border:1px solid var(--border);border-radius:8px;overflow:hidden;background:var(--surface)}.browser-bar{display:flex;gap:6px;padding:.6rem .8rem;border-bottom:1px solid var(--border)}.dot{width:9px;height:9px;border-radius:50%;background:var(--border)}.browser-body{padding:2.5rem 1.5rem;display:flex;align-items:center;justify-content:center}.browser-placeholder{margin:0;color:var(--text-muted);font-family:var(--font-display);font-style:italic}.project-info h3{margin:0 0 .4rem;font-family:var(--font-display);font-size:1.15rem;font-weight:600}.project-info p{margin:0;color:var(--text-muted)}.contact-text{max-width:50ch;color:var(--text-muted)}.contact-links a{color:var(--accent);font-weight:600;text-decoration:none;border-bottom:1px solid var(--accent-soft)}.footer{margin-top:3rem;color:var(--text-muted);font-size:.9rem}`;
  }

  function escapeHtml(s){
    return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  genBtn.addEventListener('click',async ()=>{
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());
    const accent = data.accent || '#e8a33d';
    const index = makeIndex(data);
    const style = makeStyle(accent);

    // create zip
    const zip = new JSZip();
    zip.file('index.html', index);
    zip.file('style.css', style);
    zip.file('README.md', '# PortfolioKit — Generated by the web generator\\n\\nOpen index.html and edit to personalize.');
    const content = await zip.generateAsync({type:'blob'});
    const name = (data.name||'portfolio').toLowerCase().replace(/[^a-z0-9]+/g,'-') + '-portfolio.zip';
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });

  previewBtn.addEventListener('click', ()=>{
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());
    const index = makeIndex(data);
    const blob = new Blob([index],{type:'text/html'});
    const url = URL.createObjectURL(blob);
    frame.src = url;
    preview.hidden = false;
  });
})();
