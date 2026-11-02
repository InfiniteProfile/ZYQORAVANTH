(()=>{'use strict';
/* ================= PROFILE DATA (word banks & templates) ================= */
const L=s=>s.split('|');
const D={
syl:L('ka|ze|vi|thor|ra|mi|no|lu|xe|qua|dra|sel|ya|ko|ve|na|sha|el|or|ix|un|ta|so|ae|gal|mer|zy|ph|ur|be|cha|dim|fen|hu|jo|lin|os|pra|ru|sy|tev|wy|yor|zan'),
spEnd:L('ari|oid|kin|ians|eth|ox|ae|ul|yr'),
gov:L('Dominion|Concord|Hegemony|Syndicate|Collective|Covenant|Republic|Armada|Conclave|Reach|Assembly|Dynasty|Enclave|Federation|Compact|Thearchy|Swarm|Choir'),
suf:L('| Prime| IV| Minor| Station| Reach'),
wt:L('tidally locked desert|ocean world|ringed gas-giant moon|shattered asteroid belt|jungle megacity|frozen ice shelf|storm-wrapped giant|orbital ring habitat|crystal canyon planet|volcanic archipelago'),
gender:L('Female|Male|Non-binary|Agender|Fluid|Tri-gendered|Neuter|Seasonal|Hive-aligned'),
occA:L('Orbital|Void|Deep-core|Reef|Archive|Frontier|Temple|Courier|Tidal|Quantum|Rogue|Imperial|Nomad|Free|Synthetic|Spore|Glass|Storm'),
occB:L('Cartographer|Surgeon|Diplomat|Smuggler|Archivist|Pilot|Engineer|Linguist|Chef|Duelist|Botanist|Navigator|Oracle|Mechanic|Historian|Broker|Cantor|Warden|Terraformer|Salvager|Poet|Assassin|Physician|Architect'),
trait:L('curious|stoic|mischievous|devout|ruthless|gentle|restless|meticulous|defiant|nostalgic|generous|secretive|fearless|cynical|whimsical|loyal|ambitious|serene|volatile|patient|charming|guarded|idealistic|pragmatic|melancholic|boisterous|methodical|compassionate|stubborn|playful'),
abA:L('Gravity|Memory|Plasma|Echo|Time|Dream|Void|Signal|Spore|Mirror|Solar|Quantum|Shadow|Crystal|Tide|Thought|Ember|Static|Bone|Aether'),
abB:L('weaving|sense|surge|sculpting|whisper|shield|forging|drift|bloom|siphon|lens|tuning|rift|harmonics|mending|hunting'),
ev:L('the Glass Famine|a collapsed orbital elevator|the Silent Eclipse|a border war over ice moons|a plague of singing spores|the Great Migration|a stolen star-chart|a failed first contact|the drowning of the lower cities|a rogue lullaby AI|the vanishing of an entire fleet|the Ash Winter'),
who:L('a pilgrim|a defector|a ghost signal|a wounded stranger|a talking machine|an exiled prince|a retired assassin|a child with no shadow'),
org:L('Born under the twin suns of {w}, {n} grew up in the long shadow of {e}.|{n} was raised in the lower districts of {w}, where {e} rewrote every rule {c} once held sacred.|Raised by a travelling guild, {n} left {w} as a child, carrying only stories of {e}.|The records of {c} list {n} as a foundling of {w}, found in the wreckage left by {e}.|On {w} nobody forgets {e}, and {n} was born exactly one year after it.'),
turn:L('Everything changed when {n} met {x}, who offered a map and a warning.|At age {a}, {n} survived a catastrophe that only {x} could explain.|A debt owed to {x} pulled {n} into a conflict far larger than {w}.|{n} spent {a} years chasing the truth about {e}, guided only by {x}.'),
now:L('Officially listed as {o}, {n} now walks the trade lanes of {c}, trusted by few and feared by fewer.|Known across {c} as its {o}, {n} quietly rebuilds what {e} destroyed.|Today {n} holds the title of {o} and keeps one eye on the horizon, waiting for the past to return.|As {o}, {n} has become a living rumor on a dozen frontier worlds.'),
sec:L('keeps a private map of every world never discovered|speaks nightly to a sibling who may no longer exist|owes a lifelong debt to a smuggler clan|forged their own birth records to escape a vow|hides a prototype that could rewrite local physics|has never once told the truth about their age'),
dream:L('dreams of founding a free port beyond the last charted star|wants to reunite the scattered clans of their people|hopes to repay those who sheltered them|plans to vanish into the deep void when the work is done|seeks the origin of their own unexplained abilities|aims to publish the one true history of their civilization'),
voice:L('a low resonant purr|clicking harmonics|a whisper that carries|a bell-like tone|a gravelly drawl|a layered double voice|a soft melodic trill'),
mark:L('a spiral scar across the brow|constellation-shaped freckles|a missing left horn|glowing tally lines on the forearms|a ritual tattoo of their homeworld|one cloudy eye|a cracked visor fused to the temple|silver-dusted hair|a tail ring from their first voyage|burn marks from a reactor leak'),
skin:L('obsidian scales|pearlescent skin|bioluminescent fur|segmented chitin|mirror-chrome plating|moss-green hide|ash-grey plumage|crystalline growths|translucent membrane|copper-veined bark'),
eyes:L('amber|violet|mercury-white|ember-red|deep teal|triple-lensed black|opal|moss-green|pale gold|cobalt'),
build:L('wiry|towering|compact|lithe|broad|gaunt|elegant|massive'),
quirk:L('hums while thinking|collects broken clocks|never sits with their back to a door|feeds stray drones|counts stars before sleeping|tells lies only on holidays|speaks to machines politely|keeps a jar of homeworld soil|hates the smell of ozone|laughs at the worst moments'),
item:L('a cracked navigation compass|a pocket-sized star map|a ceremonial blade|an heirloom data-locket|a battered translator|a tin of spiced moss|a coil of memory-wire|a lucky ion coin')
};

/* ================= GENERATION (deterministic, string-ID based) ================= */
// Decimal-string arithmetic: IDs are never converted to Number.
function inc(s){const a=s.split('');let i=a.length-1;while(i>=0){if(a[i]==='9'){a[i]='0';i--}else{a[i]=String.fromCharCode(a[i].charCodeAt(0)+1);return a.join('')}}return '1'+a.join('')}
function dec(s){if(s==='1')return s;const a=s.split('');let i=a.length-1;while(a[i]==='0'){a[i]='9';i--}a[i]=String.fromCharCode(a[i].charCodeAt(0)-1);return a.join('').replace(/^0+/,'')||'1'}
// 128-bit state seeded from every character of the ID string, then sfc32.
function seed(s){let a=0x811c9dc5,b=0x9e3779b9,c=0x85ebca6b,d=0xc2b2ae35;
for(let i=0;i<s.length;i++){const x=s.charCodeAt(i);
a=Math.imul(a^x,16777619);
b=Math.imul(b^(x+i*31),0x85ebca6b);b^=b>>>13;
c=Math.imul(c+x,0xcc9e2d51);c=(c<<15)|(c>>>17);
d=(Math.imul(d^x,0x1b873593)+i)|0;d^=d>>>11}
return[a,b,c,d]}
function rng(s){let[a,b,c,d]=seed(s);const f=()=>{let t=(a+b)|0;a=b^(b>>>9);b=(c+(c<<3))|0;c=(c<<21)|(c>>>11);d=(d+1)|0;t=(t+d)|0;c=(c+t)|0;return(t>>>0)/4294967296};for(let i=0;i<16;i++)f();return f}
const pick=(r,a)=>a[r()*a.length|0],int=(r,a,b)=>a+(r()*(b-a+1)|0),cap=s=>s[0].toUpperCase()+s.slice(1);
const nm=(r,a,b)=>{let s='';for(let n=int(r,a,b);n--;)s+=pick(r,D.syl);return cap(s)};
const many=(r,f,n)=>{const o=[];while(o.length<n){const x=f();if(o.indexOf(x)<0)o.push(x)}return o};
const fill=(t,o)=>t.replace(/\{(\w+)\}/g,(_,k)=>o[k]);
// Civilizations are shared by 1000 consecutive IDs (a "sector"), 3 per sector, so societies recur.
const cc=new Map();
function civ(sec,k){const key=sec+':'+k;let c=cc.get(key);if(c)return c;const r=rng('c'+key),w=nm(r,2,3);
c={name:r()<.5?'The '+nm(r,2,3)+' '+pick(r,D.gov):'The '+pick(r,D.gov)+' of '+nm(r,2,3),world:w+pick(r,D.suf),wt:pick(r,D.wt),sp:nm(r,2,2)+pick(r,D.spEnd),life:pick(r,[40,70,90,120,200,400,900,1500,3000]),hue:int(r,0,359)};
if(cc.size>600)cc.clear();cc.set(key,c);return c}
function gen(id){
const r=rng('p'+id),sec=id.length>3?id.slice(0,-3):'0',c=civ(sec,r()*3|0),
first=nm(r,2,3),name=first+' '+nm(r,2,4),g=pick(r,D.gender),
age=Math.max(1,Math.floor(c.life*(.03+Math.pow(r(),1.7)*.97))),
occ=pick(r,D.occA)+' '+pick(r,D.occB),
tr=many(r,()=>pick(r,D.trait),3),ab=many(r,()=>pick(r,D.abA)+' '+pick(r,D.abB),3),
ev=pick(r,D.ev),x=pick(r,D.who),
o={n:first,w:c.world,c:c.name,e:ev,x:x,a:Math.max(1,Math.floor(age*(.1+r()*.5))),o:occ},
story=[pick(r,D.org),pick(r,D.turn),pick(r,D.now)].map(t=>fill(t,o)).join(' '),
se=pick(r,D.sec),dr=pick(r,D.dream),vo=pick(r,D.voice),mk=pick(r,D.mark),
bio=name+' (age '+age+', '+g.toLowerCase()+', '+c.sp+') hails from '+c.world+', a '+c.wt+', and belongs to '+c.name+'. Described as '+tr[0]+', '+tr[1]+' and '+tr[2]+', '+first+' is best known for '+ab[0].toLowerCase()+' and '+ab[1].toLowerCase()+'. Privately, '+first+' '+se+', and '+dr+'. Anyone who meets '+first+' remembers '+vo+' and '+mk+'.',
chars=[['Height',int(r,40,290)+' cm'],['Build',pick(r,D.build)],['Surface',pick(r,D.skin)],['Eyes',pick(r,D.eyes)],['Voice',vo],['Distinguishing mark',mk],['Quirk',pick(r,D.quirk)],['Carries',pick(r,D.item)]];
return{id:id,name:name,age:age,gender:g,species:c.sp,home:c.world,wt:c.wt,civ:c.name,occ:occ,traits:tr,abil:ab,story:story,bio:bio,chars:chars,
vis:{h:(c.hue+int(r,-30,30)+360)%360,sh:int(r,0,3),ey:int(r,1,3),hn:int(r,0,2),l:int(r,0,14),mo:int(r,0,1)}}}

/* ================= SEARCH LOGIC ================= */
function parseQ(q){q=q.trim().replace(/^#/,'');const d=/^\d+$/.test(q)?q.replace(/^0+/,''):'';
return d?{k:'id',id:d}:q?{k:'text',t:q.toLowerCase().split(/\s+/)}:{k:'all'}}
const ixOf=p=>(p.name+'|'+p.civ+'|'+p.home+'|'+p.species+'|'+p.occ+'|#'+p.id).toLowerCase();
const matches=(p,t)=>{const s=ixOf(p);return t.every(w=>s.indexOf(w)>=0)};

if(typeof document==='undefined'){if(typeof module!=='undefined')module.exports={gen,inc,dec,rng,parseQ,matches};return}

/* ================= RENDERING ================= */
const bg=p=>'background:radial-gradient(circle at 50% 38%,hsl('+p.vis.h+',70%,36%),hsl('+(p.vis.h+200)%360+',60%,7%) 78%)';
function art(p){const v=p.vis,h=v.h,k='hsl('+(h+160)%360+',95%,62%)',sk='hsl('+(h+25)%360+',40%,'+(30+v.l)+'%)',dk='hsl('+h+',50%,14%)';
const hd=['<ellipse cx="50" cy="46" rx="19" ry="24"/>','<path d="M50 20 72 62Q50 74 28 62Z"/>','<rect x="30" y="24" width="40" height="42" rx="14"/>','<path d="M50 18 70 44 50 72 30 44Z"/>'][v.sh];
const xs=[[50],[42,58],[39,50,61]][v.ey-1];
const ho=['','<path d="M35 30 24 10 42 25M65 30 76 10 58 25" fill="none" stroke="'+k+'" stroke-width="3" stroke-linecap="round"/>','<path d="M44 26 38 8M56 26 62 8" stroke="'+k+'" stroke-width="2"/><circle cx="38" cy="8" r="3" fill="'+k+'"/><circle cx="62" cy="8" r="3" fill="'+k+'"/>'][v.hn];
return'<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="46" r="40" fill="none" stroke="'+k+'" stroke-opacity=".3"/><path d="M12 100Q14 70 50 68Q86 70 88 100Z" fill="'+dk+'" stroke="'+k+'" stroke-opacity=".5"/><g fill="'+sk+'">'+hd+'</g>'+ho+xs.map(x=>'<circle cx="'+x+'" cy="'+(v.sh===1?46:42)+'" r="3" fill="'+k+'"/>').join('')+'<path d="M43 '+(56+v.mo*2)+'h14" stroke="'+dk+'" stroke-width="2" stroke-linecap="round"/></svg>'}
const chips=a=>a.map(x=>'<i>'+x+'</i>').join('');
function card(p){return'<a class="card" href="#p/'+p.id+'"><div class="pt" style="'+bg(p)+'">'+art(p)+'</div><div class="cb"><span class="no">#'+p.id+'</span><h3>'+p.name+'</h3><p>'+p.species+' · '+p.civ+'</p><p>'+p.age+' yrs · '+p.gender+' · '+p.home+'</p><p class="oc">'+p.occ+'</p><div class="ch">'+chips(p.abil)+'</div></div></a>'}
const kv=a=>'<dl>'+a.map(x=>'<div><dt>'+x[0]+'</dt><dd>'+x[1]+'</dd></div>').join('')+'</dl>';
function detail(p){return'<div class="dw"><div class="bar"><button class="btn" data-a="bk">← Back to the universe</button></div><header class="dh"><div class="pt big" style="'+bg(p)+'">'+art(p)+'</div><div><span class="no">#'+p.id+'</span><h2>'+p.name+'</h2><p class="sp">'+p.species+' · '+p.civ+'</p><p class="oc">'+p.occ+'</p></div></header>'+
kv([['ID','#'+p.id],['Age',p.age+' years'],['Gender',p.gender],['Species',p.species],['Homeworld',p.home+' ('+p.wt+')'],['Civilization',p.civ],['Occupation',p.occ]])+
'<h3>PERSONALITY</h3><div class="ch">'+chips(p.traits)+'</div><h3>ABILITIES</h3><div class="ch">'+chips(p.abil)+'</div><h3>BACKGROUND STORY</h3><p>'+p.story+'</p><h3>BIOGRAPHY</h3><p>'+p.bio+'</p><h3>PERSONAL CHARACTERISTICS</h3>'+kv(p.chars)+
'<div class="nav"><button class="btn" data-a="go" data-i="'+dec(p.id)+'"'+(p.id==='1'?' disabled':'')+'>← Previous identity</button><button class="btn" data-a="go" data-i="'+inc(p.id)+'">Next identity →</button><button class="btn pri" data-a="ex" data-i="'+p.id+'">Explore from here</button></div></div>'}

/* ================= INFINITE FEED (generation scheduler + windowed DOM) ================= */
const $=id=>document.getElementById(id),feed=$('feed'),st=$('st'),dv=$('dv'),qi=$('q'),T=document.title;
const P=30,FIRST=360,BATCH=300,AHEAD=260,CAP=840; // page size, first load, batch size, runway that triggers next batch, max mounted cards
let pages=[],mounted=new Set(),mcount=0,cur=0,epoch=0,total=0,Q,nextId,scanned=0,buf=[],batchLeft=0,busy=false,lastFlush=0;

function status(){const n=total.toLocaleString();
st.textContent=Q.k==='text'?n+' matches · '+scanned.toLocaleString()+' identities scanned · still searching the endless universe':Q.k==='id'?'Exact ID #'+Q.id+' · the universe continues from here · '+n+' identities forged':n+' identities forged · and counting'}
function mount(pg){if(pg.m)return;let ids=pg.ids;if(!ids){ids=[];let s=pg.start;for(let i=0;i<pg.n;i++){ids.push(s);s=inc(s)}}
let h='';for(let i=0;i<ids.length;i++)h+=card(gen(ids[i]));
pg.el.style.height='';pg.el.innerHTML=h;pg.m=1;mounted.add(pg.i);mcount+=pg.n}
function unmount(pg){if(!pg.m)return;pg.el.style.height=pg.el.offsetHeight+'px';pg.el.innerHTML='';pg.m=0;mounted.delete(pg.i);mcount-=pg.n}
function addPage(ids,start,n){const el=document.createElement('div');el.className='pg';feed.appendChild(el);
const pg={el:el,ids:ids,start:start,n:n,m:0,i:pages.length,o:total};pages.push(pg);total+=n;mount(pg)}
function run(sync){if(busy)return;busy=true;const e=epoch;
(function step(){if(e!==epoch)return;const t0=performance.now();
if(Q.k!=='text'){ // sequential universe (from ID 1, or from a requested exact ID)
 while(batchLeft>0){addPage(null,nextId,P);for(let i=0;i<P;i++)nextId=inc(nextId);batchLeft-=P;if(!sync&&performance.now()-t0>14)break}
}else{ // text search scans the endless universe in small time slices
 while(batchLeft>0&&performance.now()-t0<8){const p=gen(nextId);scanned++;
  if(matches(p,Q.t)){buf.push(nextId);batchLeft--;if(buf.length>=P){addPage(buf,null,P);buf=[];lastFlush=t0}}
  nextId=inc(nextId)}
 if(buf.length&&t0-lastFlush>400){addPage(buf,null,buf.length);buf=[];lastFlush=t0}
}
status();sweep();
if(batchLeft>0)setTimeout(step,Q.k==='text'?20:0);else busy=false})()}
function ensure(ahead){if(!busy&&batchLeft<=0&&ahead<=AHEAD){batchLeft=BATCH;run()}}
function sweep(){const n=pages.length;if(!n){ensure(0);return}
const vh=innerHeight||600,t=-2*vh,b=3*vh;let i=Math.min(cur,n-1);
while(i>0&&pages[i].el.getBoundingClientRect().top>t)i--;
while(i<n-1&&pages[i].el.getBoundingClientRect().bottom<t)i++;
cur=i;let v=i,j=i;
while(v<n-1&&pages[v].el.getBoundingClientRect().bottom<0)v++;
while(j<n&&pages[j].el.getBoundingClientRect().top<b){mount(pages[j]);j++}
while(mcount>CAP){let far=-1,fd=-1;mounted.forEach(k=>{if(k<i||k>=j){const d=Math.abs(k-v);if(d>fd){fd=d;far=k}}});if(far<0)break;unmount(pages[far])}
ensure(total-pages[v].o)}
function reset(q,user){epoch++;feed.textContent='';pages=[];mounted.clear();mcount=0;cur=0;total=0;buf=[];scanned=0;busy=false;
Q=parseQ(q);nextId=Q.k==='id'?Q.id:'1';batchLeft=FIRST;if(user)scrollTo(0,0);status();run(Q.k!=='text')}
// Never lose generation: scroll, IntersectionObserver, and a timer all drive the same sweep.
let tk=0;addEventListener('scroll',()=>{if(!tk){tk=1;(window.requestAnimationFrame||setTimeout)(()=>{tk=0;sweep()})}},{passive:true});
setInterval(()=>{if(!document.hidden)sweep()},700);
try{if('IntersectionObserver'in window)new IntersectionObserver(()=>sweep(),{rootMargin:'0px 0px 3000px 0px'}).observe($('sent'))}catch(e){}
let rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(()=>{let h=0,n=0;mounted.forEach(k=>{h+=pages[k].el.offsetHeight;n+=pages[k].n});if(!n)return;const a=h/n;pages.forEach(p=>{if(!p.m)p.el.style.height=Math.round(a*p.n)+'px'});sweep()},200)});

/* ================= SEARCH UI ================= */
let sd,last='';
function apply(user){const q=qi.value;$('x').hidden=!q;if(q.trim()===last&&user)return;last=q.trim();reset(q,user)}
qi.addEventListener('input',()=>{clearTimeout(sd);sd=setTimeout(()=>apply(true),250)});
qi.addEventListener('keydown',e=>{if(e.key==='Enter'){clearTimeout(sd);apply(true)}});
$('x').addEventListener('click',()=>{qi.value='';apply(true);qi.focus()});

/* ================= PROFILE DETAIL (hash routed; feed & scroll stay untouched underneath) ================= */
let inApp=false;
const clearHash=()=>history.replaceState(null,'',location.pathname+location.search);
function route(){const m=/^#p\/([1-9]\d*)$/.exec(location.hash);
if(m){const p=gen(m[1]);dv.innerHTML=detail(p);dv.hidden=false;dv.scrollTop=0;document.title=p.name+' · ZYQORAVANTH';const b=dv.querySelector('button');try{b.focus({preventScroll:true})}catch(e){}}
else{dv.hidden=true;dv.innerHTML='';document.title=T}}
function back(){if(dv.hidden)return;if(inApp){inApp=false;history.back()}else{clearHash();route()}}
addEventListener('hashchange',route);
feed.addEventListener('click',e=>{if(e.target.closest('.card'))inApp=true});
dv.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const a=b.getAttribute('data-a'),id=b.getAttribute('data-i');
if(a==='bk')back();else if(a==='go')location.replace('#p/'+id);
else if(a==='ex'){clearHash();inApp=false;route();qi.value=id;apply(true)}});
addEventListener('keydown',e=>{if(e.key==='Escape')back()});

window.ZYQ={stats:()=>({total:total,pages:pages.length,mountedCards:mcount,scanned:scanned,mode:Q.k,next:nextId}),gen:gen,inc:inc,dec:dec};
apply(false);route();
})();
