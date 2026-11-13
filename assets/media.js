/* Safe Corner: პოდკასტები და საველე ვიდეოები.
   ახალი პოდკასტი: დაამატე ერთი ჩანაწერი PODCASTS-ში; yt = YouTube-ის ვიდეოს ID (watch?v=ID).
   ახალი საველე ვიდეო: დაამატე FIELD-ში. */
var PODCASTS=[
  {n:1,g:"ირაკლი არაბიძე",r:"შრომის უსაფრთხოების სპეციალისტი",t:"სსიპ შრომის ინსპექციის სამსახურთან კომუნიკაციის წესი",yt:"",ge:"Irakli Arabidze",re:"Occupational safety specialist",te:"How to communicate with the Labour Inspection Service"},
  {n:2,g:"დავით თხელიძე",r:"SafCo-ს თანადამფუძნებელი",t:"შრომის უსაფრთხოების აკრედიტირებული კურსი",yt:"",ge:"Davit Tkhelidze",re:"Co-founder of SafCo",te:"Accredited occupational safety course"},
  {n:3,g:"ვიქტორ დოლიძე",r:"",t:"ქართული შრომის უსაფრთხოების ისტორია",yt:"",ge:"Viktor Dolidze",re:"",te:"The history of occupational safety in Georgia"},
  {n:4,g:"თორნიკე თოდრია",r:"",t:"შრომის უსაფრთხოების პირველი ქართული სოფტი: SafePro",yt:"",ge:"Tornike Todria",re:"",te:"SafePro: the first Georgian occupational safety software"},
  {n:5,g:"ნათია სვანიძე",r:"შრომის უსაფრთხოების სპეციალისტი, ყოფილი ინსპექტორი",t:"ინსპექტირების სახეები და უბედური შემთხვევის მოკვლევა",yt:"",ge:"Natia Svanidze",re:"Occupational safety specialist, former inspector",te:"Types of inspection and accident investigation"},
  {n:6,g:"კახა დათიაშვილი",r:"საკონსულტაციო კომპანიის გენერალური დირექტორი და თანადამფუძნებელი",t:"ჯეოსეიფთის განვითარების ისტორია",yt:"",ge:"Kakha Datiashvili",re:"CEO and co-founder of a safety consulting company",te:"The story of Geosafety"},
  {n:7,g:"დავით თხელიძე",r:"SafCo-ს თანადამფუძნებელი",t:"რისკის შეფასების საერთაშორისო პრაქტიკა",yt:"",ge:"Davit Tkhelidze",re:"Co-founder of SafCo",te:"International risk assessment practice"},
  {n:8,g:"ირაკლი არაბიძე",r:"შრომის უსაფრთხოების სპეციალისტი",t:"შრომის უსაფრთხოების სპეციალისტის სასერთიფიკატო გამოცდა",yt:"",ge:"Irakli Arabidze",re:"Occupational safety specialist",te:"The occupational safety specialist certification exam"},
  {n:9,g:"ვიქტორ დოლიძე",r:"",t:"ლოჯისტიკის უსაფრთხოება",yt:"",ge:"Viktor Dolidze",re:"",te:"Logistics safety"},
  {n:10,g:"არჩილ მარშანია",r:"",t:"პირველადი დახმარების როლი შრომის უსაფრთხოებაში",yt:"",ge:"Archil Marshania",re:"",te:"The role of first aid in occupational safety"},
  {n:11,g:"თაკო გვასალია",r:"„გერგილის“ შრომის უსაფრთხოების პროექტების მენეჯერი",t:"„გერგილი“ როგორც შრომის უსაფრთხოების კომპანია",yt:"",ge:"Tako Gvasalia",re:"Safety project manager at Gergili",te:"Gergili as an occupational safety company"},
  {n:12,g:"მარიამ ქანთარია",r:"მშენებელი, Hazel-ის დამფუძნებელი",t:"",yt:"",ge:"Mariam Kantaria",re:"Builder, founder of Hazel",te:""},
  {n:13,g:"მარიამ ქანთარია",r:"მშენებელი, Hazel-ის დამფუძნებელი",t:"",yt:"",ge:"Mariam Kantaria",re:"Builder, founder of Hazel",te:""},
  {n:14,g:"ლუკა ერქომაიშვილი",r:"SafePro-ს პროდუქტის მენეჯერი",t:"",yt:"",ge:"Luka Erkomaishvili",re:"Product manager at SafePro",te:""}
];
var FIELD=[
  {t:"ამწის ინსპექტირება SafePro-სთან ერთად",d:"",yt:"62tGk5IvQSY",te:"Crane inspection with SafePro",de:""},
  {t:"საფასადე ხარაჩოს შემოწმება",d:"საფასადე ხარაჩოს შემოწმება TCS-ის ხარაჩოს ინსპექტორთან ერთად.",yt:"2OyJ85EGRU0",te:"Facade scaffolding inspection",de:"Inspecting facade scaffolding with a TCS scaffold inspector."},
  {t:"უსაფრთხოების ქამრის შემოწმება SafePro-სთან ერთად",d:"დამცავი ქამრის რეალური ინსპექტირება სამუშაო ობიექტზე.",yt:"nUb-S4GibMA",te:"Safety harness inspection with SafePro",de:"A real inspection of a fall-arrest harness on a work site."}
];
(function(){
  var CH="https://www.youtube.com/@SafeCorner2024";
  function e(t){var d=document.createElement('div');d.textContent=t||'';return d.innerHTML}
  function L(ka,en){return en&&en!==ka?'<span class="ka">'+e(ka)+'</span><span class="en">'+e(en)+'</span>':e(ka)}
  var pl=document.getElementById('pods');
  if(pl)pl.innerHTML=PODCASTS.map(function(p,i){
    var k=PODCASTS.length>1?i/(PODCASTS.length-1):0,c='hsl('+(46-8*k).toFixed(1)+','+(88+8*k).toFixed(0)+'%,'+(64-22*k).toFixed(1)+'%)';
    var u=p.yt?'https://www.youtube.com/watch?v='+p.yt:CH;
    return '<a class="pd" style="--c:'+c+'" href="'+u+'" target="_blank" rel="noopener"><span class="pn">'+(p.n<10?'0':'')+p.n+'</span><span class="pb"><b>'+L(p.g,p.ge)+'</b>'+(p.r?'<small>'+L(p.r,p.re)+'</small>':'')+(p.t?'<span class="pt">'+L(p.t,p.te)+'</span>':'')+'</span><span class="pw" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span></a>';
  }).join('');
  var fl=document.getElementById('field');
  if(fl){fl.innerHTML=FIELD.map(function(v){
    return '<div class="fv"><button class="fv-p" type="button" data-yt="'+e(v.yt)+'" aria-label="ვიდეოს ყურება: '+e(v.t)+'"><img src="https://i.ytimg.com/vi/'+e(v.yt)+'/maxresdefault.jpg" alt="" loading="lazy" onerror="this.onerror=null;this.src=\'https://i.ytimg.com/vi/'+e(v.yt)+'/hqdefault.jpg\'"><span class="fv-b"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span></button><div class="fv-t"><h3>'+L(v.t,v.te)+'</h3>'+(v.d?'<p>'+L(v.d,v.de)+'</p>':'')+'<a href="https://www.youtube.com/watch?v='+e(v.yt)+'" target="_blank" rel="noopener">YouTube ↗</a></div></div>';
  }).join('');
  fl.addEventListener('click',function(ev){var b=ev.target.closest('.fv-p');if(!b)return;
    var f=document.createElement('iframe');f.src='https://www.youtube-nocookie.com/embed/'+b.dataset.yt+'?autoplay=1&rel=0';f.title='YouTube';f.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';f.allowFullscreen=true;f.className='fv-if';b.replaceWith(f)});}
})();
/* ახალი სეზონი: ეპიზოდის გვერდები /epizodi/N/.
   yt = YouTube ID (როცა ეპიზოდი გამოვა), docs = ამ თემის დოკუმენტები საკანონმდებლო ბაზიდან (id ან key). */
var SEASON=[
  {n:1,yt:"",f:["პოდკასტი","Podcast"],
   t:["უსაფრთხო კუთხის დაბრუნება | Safety.ge","The return of Safe Corner | Safety.ge"],
   who:["ნიკოლოზ ყოლბაია და ლევან გრიგალაშვილი","Nikoloz Kolbaia and Levan Grigalashvili"],
   d:["6 თვიანი პაუზის შემდეგ ვბრუნდებით. პირველ ეპიზოდში სტუმარი არ გვყავს: ვსაუბრობთ, რა შეიცვალა, რას გეგმავს Safe Corner ახალ სეზონში და რატომ ვიღებთ Safety.ge-ის შოურუმში.","After a six-month break, we are back. No guest in the first episode: we talk about what has changed, what Safe Corner plans for the new season and why we film in the Safety.ge showroom."],
   docs:[4486188,5003057,4776091]},
  {n:2,yt:"",f:["პოდკასტი","Podcast"],
   t:["როგორ გავხდეთ შრომის უსაფრთხოების სპეციალისტი?","How to become an occupational safety specialist?"],
   who:["",""],
   d:["რა გზა უნდა გაიაროს ადამიანმა, რომ შრომის უსაფრთხოების სპეციალისტი გახდეს: სწავლება, სერტიფიცირება და პირველი ნაბიჯები პრაქტიკაში.","What it takes to become an occupational safety specialist: training, certification and the first steps in practice."],
   docs:[4486188,4776091,4307493]},
  {n:3,yt:"",f:["პოდკასტი","Podcast"],
   t:["გავდივართ შრომის ინსპექციის მითითებებს","Going through the labour inspection requirements"],
   who:["",""],
   d:["ერთად გავდივართ შრომის ინსპექციის ყველაზე ხშირ მითითებებს და ვაჩვენებთ, რაში გვეხმარება Safety.ge.","We go through the labour inspection's most common requirements and show how Safety.ge helps."],
   docs:[5003057,"d99",5512758,5572284,"d590"]},
  {n:4,yt:"",f:["საველე ვიდეო","Field video"],
   t:["ვაწყობთ ობიექტს ინსპექციის მითითებების შესაბამისად","Setting up a site to meet inspection requirements"],
   who:["",""],
   d:["საველე ვიდეო: ობიექტზე ნაბიჯ-ნაბიჯ ვასრულებთ ინსპექციის მითითებებს: ნიშნები, დაცვის საშუალებები, მოწყობილობები და რისკის შეფასება.","Field video: step by step on a real site we put the inspection requirements into practice: signs, protective equipment, work equipment and risk assessment."],
   docs:[5512758,5572284,"d590",6488414,4776091]}
];
(function(){
  /* მთავარ გვერდზე სეზონის სტრიქონები ეპიზოდის გვერდებზე გადადის */
  document.querySelectorAll('.ep[data-ep]').forEach(function(row){
    var ep=SEASON.filter(function(x){return String(x.n)===row.dataset.ep})[0];if(!ep)return;
    var a=document.createElement('a');a.className=row.className;a.href='/epizodi/'+ep.n+'/';a.dataset.ep=row.dataset.ep;a.innerHTML=row.innerHTML;
    if(ep.yt){var s=a.querySelector('.soon');if(s)s.outerHTML='<span class="watch"><svg><use href="#yt"/></svg><span class="ka">უყურე</span><span class="en">Watch</span></span>'}
    row.replaceWith(a);
  });
})();
