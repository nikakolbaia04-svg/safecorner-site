/* Safe Corner: პოდკასტები და საველე ვიდეოები.
   ახალი პოდკასტი: დაამატე ერთი ჩანაწერი PODCASTS-ში; yt = YouTube-ის ვიდეოს ID (watch?v=ID).
   ახალი საველე ვიდეო: დაამატე FIELD-ში. */
var PODCASTS=[
  {n:1,g:"ირაკლი არაბიძე",r:"შრომის უსაფრთხოების სპეციალისტი",t:"სსიპ შრომის ინსპექციის სამსახურთან კომუნიკაციის წესი",yt:""},
  {n:2,g:"დავით თხელიძე",r:"SafCo-ს თანადამფუძნებელი",t:"შრომის უსაფრთხოების აკრედიტირებული კურსი",yt:""},
  {n:3,g:"ვიქტორ დოლიძე",r:"",t:"ქართული შრომის უსაფრთხოების ისტორია",yt:""},
  {n:4,g:"თორნიკე თოდრია",r:"",t:"შრომის უსაფრთხოების პირველი ქართული სოფტი: SafePro",yt:""},
  {n:5,g:"ნათია სვანიძე",r:"შრომის უსაფრთხოების სპეციალისტი, ყოფილი ინსპექტორი",t:"ინსპექტირების სახეები და უბედური შემთხვევის მოკვლევა",yt:""},
  {n:6,g:"კახა დათიაშვილი",r:"საკონსულტაციო კომპანიის გენერალური დირექტორი და თანადამფუძნებელი",t:"ჯეოსეიფთის განვითარების ისტორია",yt:""},
  {n:7,g:"დავით თხელიძე",r:"SafCo-ს თანადამფუძნებელი",t:"რისკის შეფასების საერთაშორისო პრაქტიკა",yt:""},
  {n:8,g:"ირაკლი არაბიძე",r:"შრომის უსაფრთხოების სპეციალისტი",t:"შრომის უსაფრთხოების სპეციალისტის სასერთიფიკატო გამოცდა",yt:""},
  {n:9,g:"ვიქტორ დოლიძე",r:"",t:"ლოჯისტიკის უსაფრთხოება",yt:""},
  {n:10,g:"არჩილ მარშანია",r:"",t:"პირველადი დახმარების როლი შრომის უსაფრთხოებაში",yt:""},
  {n:11,g:"თაკო გვასალია",r:"„გერგილის“ შრომის უსაფრთხოების პროექტების მენეჯერი",t:"„გერგილი“ როგორც შრომის უსაფრთხოების კომპანია",yt:""},
  {n:12,g:"მარიამ ქანთარია",r:"მშენებელი, Hazel-ის დამფუძნებელი",t:"",yt:""},
  {n:13,g:"მარიამ ქანთარია",r:"მშენებელი, Hazel-ის დამფუძნებელი",t:"",yt:""},
  {n:14,g:"ლუკა ერქომაიშვილი",r:"SafePro-ს პროდუქტის მენეჯერი",t:"",yt:""}
];
var FIELD=[
  {t:"ამწის ინსპექტირება SafePro-სთან ერთად",d:"",yt:"62tGk5IvQSY"},
  {t:"საფასადე ხარაჩოს შემოწმება",d:"საფასადე ხარაჩოს შემოწმება TCS-ის ხარაჩოს ინსპექტორთან ერთად.",yt:"2OyJ85EGRU0"},
  {t:"უსაფრთხოების ქამრის შემოწმება SafePro-სთან ერთად",d:"დამცავი ქამრის რეალური ინსპექტირება სამუშაო ობიექტზე.",yt:"nUb-S4GibMA"}
];
(function(){
  var CH="https://www.youtube.com/@SafeCorner2024";
  function e(t){var d=document.createElement('div');d.textContent=t||'';return d.innerHTML}
  var pl=document.getElementById('pods');
  if(pl)pl.innerHTML=PODCASTS.map(function(p,i){
    var k=PODCASTS.length>1?i/(PODCASTS.length-1):0,c='hsl('+(46-8*k).toFixed(1)+','+(88+8*k).toFixed(0)+'%,'+(64-22*k).toFixed(1)+'%)';
    var u=p.yt?'https://www.youtube.com/watch?v='+p.yt:CH;
    return '<a class="pd" style="--c:'+c+'" href="'+u+'" target="_blank" rel="noopener"><span class="pn">'+(p.n<10?'0':'')+p.n+'</span><span class="pb"><b>'+e(p.g)+'</b>'+(p.r?'<small>'+e(p.r)+'</small>':'')+(p.t?'<span class="pt">'+e(p.t)+'</span>':'')+'</span><span class="pw" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span></a>';
  }).join('');
  var fl=document.getElementById('field');
  if(fl){fl.innerHTML=FIELD.map(function(v){
    return '<div class="fv"><button class="fv-p" type="button" data-yt="'+e(v.yt)+'" aria-label="ვიდეოს ყურება: '+e(v.t)+'"><img src="https://i.ytimg.com/vi/'+e(v.yt)+'/maxresdefault.jpg" alt="" loading="lazy" onerror="this.onerror=null;this.src=\'https://i.ytimg.com/vi/'+e(v.yt)+'/hqdefault.jpg\'"><span class="fv-b"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span></button><div class="fv-t"><h3>'+e(v.t)+'</h3>'+(v.d?'<p>'+e(v.d)+'</p>':'')+'<a href="https://www.youtube.com/watch?v='+e(v.yt)+'" target="_blank" rel="noopener">YouTube ↗</a></div></div>';
  }).join('');
  fl.addEventListener('click',function(ev){var b=ev.target.closest('.fv-p');if(!b)return;
    var f=document.createElement('iframe');f.src='https://www.youtube-nocookie.com/embed/'+b.dataset.yt+'?autoplay=1&rel=0';f.title='YouTube';f.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';f.allowFullscreen=true;f.className='fv-if';b.replaceWith(f)});}
})();
