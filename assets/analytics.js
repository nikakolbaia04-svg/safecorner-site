/* Safe Corner — ანონიმური სტატისტიკა (Google Analytics 4).
   ჩასართავად GA_ID-ში ჩაწერე Measurement ID (G-XXXXXXX). ცარიელისას არაფერი ხდება. */
(function(){
  var GA_ID='';
  if(!GA_ID)return;
  var K='sc-consent',c=null;
  try{c=localStorage.getItem(K)}catch(e){}
  window.dataLayer=window.dataLayer||[];
  function gtag(){dataLayer.push(arguments)}window.gtag=gtag;
  function ev(n,p){gtag('event',n,p||{})}
  var started=false;
  function start(){
    if(started)return;started=true;
    var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+GA_ID;document.head.appendChild(s);
    gtag('js',new Date());gtag('config',GA_ID,{anonymize_ip:true});
    var q=new URLSearchParams(location.search);
    if(/\/kanonmdebloba\/doc\.html$/.test(location.pathname)){
      var id=q.get('id'),d=(window.DOCS||[]).filter(function(x){return String(x.id||x.key)===id})[0];
      ev('doc_view',{doc_id:id||'',doc_title:d?d.t:''});
    }
    if(/\/kanonmdebloba\/$/.test(location.pathname)&&q.get('q'))ev('search',{search_term:q.get('q')});
  }
  document.addEventListener('click',function(e){
    if(!started)return;
    var a=e.target.closest&&e.target.closest('a,button[data-yt]');if(!a)return;
    if(a.tagName==='BUTTON'){ev('video_play',{video_id:a.dataset.yt});return}
    var h=a.getAttribute('href')||'';
    if(/\.pdf(\?|$)/i.test(h)){ev('pdf_download',{file_name:h.split('/').pop(),doc_title:(document.querySelector('h1 .ka')||document.querySelector('h1')||{}).textContent||''});return}
    var m=h.match(/youtube|youtu\.be|facebook|whatsapp|instagram|linkedin/i);
    if(m)ev('social_click',{network:m[0].toLowerCase().replace('youtu.be','youtube'),link_url:h});
  },true);
  if(c==='yes'){start();return}
  if(c==='no')return;
  var en=document.documentElement.lang==='en';
  var st=document.createElement('style');
  st.textContent='.scc{position:fixed;left:16px;bottom:16px;z-index:60;max-width:calc(100% - 32px);display:flex;align-items:center;gap:14px;flex-wrap:wrap;background:#F6F5F1;color:#0E0E0E;border:1px solid #0E0E0E26;border-left:4px solid #EBA800;box-shadow:0 8px 28px #0000001f;padding:12px 14px 12px 16px;font:14px/1.45 "Noto Sans Georgian","Archivo",sans-serif}.scc button{font:inherit;font-weight:700;cursor:pointer;border:1.5px solid #0E0E0E;padding:6px 14px;background:#0E0E0E;color:#F6F5F1}.scc button.n{background:none;color:#3A3A38;border-color:#0E0E0E33;font-weight:500}.scc button:hover{background:#EBA800;border-color:#EBA800;color:#0E0E0E}.scc .en{display:none}html[lang=en] .scc .ka{display:none}html[lang=en] .scc .en{display:inline}@media(max-width:560px){.scc{left:12px;right:12px;bottom:12px;max-width:none}}';
  document.head.appendChild(st);
  var b=document.createElement('div');b.className='scc';b.setAttribute('role','region');b.setAttribute('aria-label','Cookies');
  b.innerHTML='<span><span class="ka">ვიყენებთ ანონიმურ სტატისტიკას, რომ საიტი უკეთესი გავხადოთ.</span><span class="en">We use anonymous statistics to improve the site.</span></span><span style="display:flex;gap:8px"><button type="button" class="y"><span class="ka">კარგი</span><span class="en">OK</span></button><button type="button" class="n"><span class="ka">არა, მადლობა</span><span class="en">No thanks</span></button></span>';
  function done(v){try{localStorage.setItem(K,v)}catch(e){}b.remove();if(v==='yes')start()}
  b.querySelector('.y').onclick=function(){done('yes')};b.querySelector('.n').onclick=function(){done('no')};
  document.body.appendChild(b);
})();
