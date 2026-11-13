/* Safe Corner: ენის გადამრთველი ქვეგვერდებისთვის (KA/EN). ტექსტი: <span class="ka">..</span><span class="en">..</span> */
(function(){
  var r=document.documentElement,q=null,s=null;
  try{q=new URLSearchParams(location.search).get('lang')}catch(e){}
  try{s=localStorage.getItem('sc-lang')}catch(e){}
  function set(l){
    r.lang=l;
    document.querySelectorAll('.lang button').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.l===l))});
    try{localStorage.setItem('sc-lang',l)}catch(e){}
    try{document.dispatchEvent(new CustomEvent('sc-lang',{detail:l}))}catch(e){}
  }
  window.SC_LANG=function(){return r.lang==='en'?'en':'ka'};
  window.SC_L=function(ka,en){return en?'<span class="ka">'+ka+'</span><span class="en">'+en+'</span>':ka};
  set(q==='en'||q==='ka'?q:(s==='en'?'en':'ka'));
  document.addEventListener('click',function(ev){var b=ev.target.closest&&ev.target.closest('.lang button');if(b)set(b.dataset.l)});
  document.addEventListener('DOMContentLoaded',function(){set(window.SC_LANG())});
})();
