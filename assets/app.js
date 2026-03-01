
async function loadJSON(path){ const r=await fetch(path); if(!r.ok) throw new Error("Failed "+path); return await r.json(); }

function el(tag, attrs={}, children=[]){
  const n=document.createElement(tag);
  for(const [k,v] of Object.entries(attrs)){
    if(k==="html") n.innerHTML=v;
    else if(k==="text") n.textContent=v;
    else n.setAttribute(k,v);
  }
  for(const c of children) n.appendChild(c);
  return n;
}

function setActiveNav(route){
  document.querySelectorAll("nav a").forEach(a=>{
    a.classList.toggle("active", a.getAttribute("href")==="#"+route);
  });
}

function mdLite(s){
  // ultra-light markdown-ish rendering: headings, links, code blocks, lists, paragraphs.
  // Safe: escape then selectively unescape markup patterns.
  const esc = (t)=>t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
  let t = esc(s);

  // code blocks ```...```
  t = t.replace(/```([\s\S]*?)```/g, (m,code)=>`<pre><code>${code}</code></pre>`);
  // inline code `x`
  t = t.replace(/`([^`]+)`/g, (m,code)=>`<code>${code}</code>`);
  // headings
  t = t.replace(/^### (.*)$/gm, "<h3>$1</h3>");
  t = t.replace(/^## (.*)$/gm, "<h2>$1</h2>");
  t = t.replace(/^# (.*)$/gm, "<h1>$1</h1>");
  // links [text](url)
  t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, `<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>`);
  // unordered lists
  t = t.replace(/^\- (.*)$/gm, "<li>$1</li>");
  t = t.replace(/(<li>[\s\S]*?<\/li>)/g, "<ul>$1</ul>");
  // paragraphs: wrap remaining lines
  // split by blank lines
  const parts = t.split(/\n\s*\n/).map(p=>p.trim()).filter(Boolean);
  t = parts.map(p=>{
    if(/^<h\d|^<pre|^<ul|^<hr/.test(p)) return p;
    return `<p>${p.replace(/\n/g,"<br/>")}</p>`;
  }).join("\n");
  return t;
}

function renderHome(data){
  const root=document.getElementById("app");
  root.innerHTML="";
  root.appendChild(el("div",{class:"panel"},[
    el("div",{class:"kicker",text:"Scholarly Research Portal"}),
    el("h1",{text:data.title}),
    el("p",{html:mdLite(data.intro)}),
    el("div",{class:"searchbar"},[
      el("input",{id:"q",placeholder:"Search documents, hubs, and explainers… (e.g., 'propaganda', 'chain of command')"})
    ]),
    el("div",{id:"results",class:"small",text:"Type to search…"})
  ]));
  root.appendChild(el("div",{class:"panel"},[
    el("div",{class:"kicker",text:"Departments"}),
    el("div",{class:"grid",id:"hubGrid"})
  ]));
  const grid=document.getElementById("hubGrid");
  for(const h of data.hubs){
    grid.appendChild(el("a",{class:"card",href:"#/hub/"+h.slug},[
      el("h3",{text:h.name}),
      el("p",{text:h.blurb})
    ]));
  }

  const index = window.__searchIndex || [];
  const input=document.getElementById("q");
  const out=document.getElementById("results");
  const run=()=>{
    const q=input.value.trim().toLowerCase();
    if(!q){ out.textContent="Type to search…"; return; }
    const hits=index.filter(x => (x.text||"").includes(q)).slice(0,12);
    if(!hits.length){ out.textContent="No matches. Try broader terms."; return; }
    out.innerHTML="";
    const table=el("table",{class:"table"});
    table.appendChild(el("thead",{},[el("tr",{},[
      el("th",{text:"Type"}), el("th",{text:"Title"}), el("th",{text:"Tags"})
    ])]));
    const tb=el("tbody");
    for(const hit of hits){
      const a=el("a",{href:hit.route},[el("span",{text:hit.title})]);
      tb.appendChild(el("tr",{},[
        el("td",{text:hit.kind}),
        el("td",{},[a]),
        el("td",{text:(hit.tags||[]).join(", ")})
      ]));
    }
    table.appendChild(tb);
    out.appendChild(table);
  };
  input.addEventListener("input",run);
}

function renderPage(title, body){
  const root=document.getElementById("app");
  root.innerHTML="";
  root.appendChild(el("div",{class:"panel"},[
    el("div",{class:"kicker",text:"Page"}),
    el("h1",{text:title}),
    el("div",{html:mdLite(body)})
  ]));
}

function renderHub(hub, items){
  const root=document.getElementById("app");
  root.innerHTML="";
  root.appendChild(el("div",{class:"panel"},[
    el("div",{class:"kicker",text:"Hub"}),
    el("h1",{text:hub.name}),
    el("p",{html:mdLite(hub.overview)}),
    el("div",{class:"small",text:"This hub links to curated explainers and a growing primary-source index. All entries are contextualised and non-glorifying."})
  ]));

  // Explain-Readings-Docs
  const panel=el("div",{class:"panel"});
  panel.appendChild(el("div",{class:"kicker",text:"Related content"}));
  const table=el("table",{class:"table"});
  table.appendChild(el("thead",{},[el("tr",{},[
    el("th",{text:"Type"}), el("th",{text:"Title"}), el("th",{text:"Date/Period"})
  ])]));
  const tb=el("tbody");
  for(const it of items){
    tb.appendChild(el("tr",{},[
      el("td",{text:it.kind}),
      el("td",{},[el("a",{href:it.route,text:it.title})]),
      el("td",{text:it.when||""})
    ]));
  }
  table.appendChild(tb);
  panel.appendChild(table);
  root.appendChild(panel);
}

function route(){
  const hash=location.hash || "#/";
  const path = hash.replace(/^#/,"");
  setActiveNav(path.startsWith("/")? path : "/");
  const parts = path.split("/").filter(Boolean);

  if(parts.length===0){ location.hash="#/"; return; }
  if(parts[0]===""){
    // noop
  }
  if(parts[0]===""){ return; }

  if(parts[0]===""){
    return;
  }

  if(parts[0]===""){
    return;
  }

  if(parts[0]===""){
    return;
  }

  if(parts[0]===""){
    return;
  }

  if(parts[0]===""){
    return;
  }

  if(parts[0]===""){
    return;
  }

  if(parts[0]===""){
    return;
  }

  if(parts[0]===""){
    return;
  }

  if(parts[0]===""){
    return;
  }

  if(parts[0]===""){
    return;
  }

  if(parts[0]===""){
    return;
  }

  if(parts[0]===""){
    return;
  }

  if(parts[0]===""){
    return;
  }

  if(parts[0]===""){
    return;
  }

  if(parts[0]===""){
    return;
  }

  if(parts[0]===""){
    return;
  }

  if(parts[0]===""){
    return;
  }

  if(parts[0]===""){
    return;
  }

  if(parts[0]===""){
    return;
  }

  if(parts[0]===""){
    return;
  }

  if(parts[0]===""){
    return;
  }

  if(path === "/"){
    renderHome(window.__site);
    return;
  }

  if(parts[0]==="hub" && parts[1]){
    const slug=parts[1];
    const hub=window.__site.hubs.find(h=>h.slug===slug);
    const items = window.__searchIndex.filter(x=> (x.hubs||[]).includes(slug))
      .map(x=>({kind:x.kind,title:x.title,route:x.route,when:x.when||""}))
      .sort((a,b)=> (a.kind>b.kind?1:-1));
    if(!hub){ renderPage("Not found","This hub does not exist."); return; }
    renderHub(hub, items);
    return;
  }

  if(parts[0]==="page" && parts[1]){
    const slug=parts[1];
    const p=window.__pages.find(x=>x.slug===slug);
    if(!p){ renderPage("Not found","This page does not exist."); return; }
    renderPage(p.title, p.body);
    return;
  }

  if(parts[0]==="doc" && parts[1]){
    const id=parts[1];
    const d=window.__docs.find(x=>x.id===id);
    if(!d){ renderPage("Not found","This document card does not exist."); return; }
    const body = `
## Summary
${d.summary}

## Metadata
- **Date:** ${d.date}
- **Author:** ${d.author}
- **Recipient:** ${d.recipient}
- **Type:** ${d.type}
- **Archive ref:** ${d.archive_ref}
- **Provenance / reliability notes:** ${d.reliability}

## Neutral takeaways
- ${d.takeaways.join("\n- ")}

## Tags
${d.tags.map(t=>`- ${t}`).join("\n")}

## Scholarship notes
${d.scholarship_notes}

## Related items
${(d.related||[]).map(r=>`- ${r}`).join("\n") || "- (none)"}
`;
    renderPage(d.title, body);
    return;
  }

  renderPage("Not found","Unknown route.");
}

async function boot(){
  const [site,pages,docs,index] = await Promise.all([
    loadJSON("content/site.json"),
    loadJSON("content/pages.json"),
    loadJSON("content/docs.json"),
    loadJSON("content/search_index.json")
  ]);
  window.__site=site;
  window.__pages=pages;
  window.__docs=docs;
  window.__searchIndex=index;

  window.addEventListener("hashchange", route);
  route();
}

boot().catch(e=>{
  const root=document.getElementById("app");
  root.innerHTML = "<div class='panel'><h1>Load error</h1><p class='small'>"+(e.message||e)+"</p></div>";
});
