import{a as I,i as l,S as M}from"./assets/vendor-BK_rxH-O.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();async function y(o,t,n){const s="https://pixabay.com",e="/api/",r=new URLSearchParams({key:"51904026-11e1c7708336e49fc55c25133",q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:t,page:n}),a=`${s}${e}?${r}`;try{return(await I.get(a)).data}catch(d){return l.error({position:"center",message:d.message}),[]}}const p=document.querySelector(".loader"),L=document.querySelector(".gallery"),w=document.querySelector(".btn-more");let g=null;function b(o){if(!o||o.length===0)return;const t=o.map(({webformatURL:n,largeImageURL:s,tags:e,likes:r,views:a,comments:d,downloads:$})=>`
        <li class="photo-card">
          <a href="${s}">
          <img src="${n}" alt="${e}" />
          </a>
          <div class="info">
            <ul class="ul-info">
            <li>Likes</li>
            <li>${r}</li>
            </ul>
            <ul class="ul-info">
            <li>Views</li>
            <li>${a}</li>
            </ul>
            <ul class="ul-info">
            <li>Comments</li>
            <li>${d}</li>
            </ul>
            <ul class="ul-info">
            <li>Downloads</li>
            <li>${$}</li>
            </ul>
          </div>
        </li>
         `).join("");L.insertAdjacentHTML("beforeend",t),g?g.refresh():g=new M(".gallery a",{captionsData:"alt",captionDelay:250})}function O(){L.innerHTML=""}function S(){p.classList.remove("hidden")}function q(){p.classList.add("hidden")}function v(){w.classList.remove("hidden")}function P(){w.classList.add("hidden")}let f=1,c=15,i=0,m="",u;const B=document.querySelector('[name="search-text"]'),h=document.querySelector(".form"),x=document.querySelector(".btn-more");h.addEventListener("submit",async o=>{if(o.preventDefault(),f=1,i=0,c=15,m=B.value.trim(),m.length===0){l.error({position:"center",message:"❌ Fill in the search field"});return}O(),P(),S();try{const t=await y(m,c,f),n=t.hits;if(!n||n.length===0){l.warning({position:"center",message:"Sorry, there are no images matching your search query. Please try again!"});return}u=t.totalHits,b(n),i=i+c,i<u&&v()}catch(t){l.error({position:"center",message:t.message})}finally{q(),h.reset()}});x.addEventListener("click",async()=>{f+=1,P(),i+c>=u&&(c=u-i),S();try{const t=(await y(m,c,f)).hits;if(!t||t.length===0){l.warning({position:"center",message:"Sorry, there are no images matching your search query. Please try again!"});return}b(t),i=i+c,i<u?v():l.warning({position:"center",message:"We're sorry, but you've reached the end of search results."});const s=document.querySelector(".photo-card").getBoundingClientRect().height;window.scrollBy({top:s*2,behavior:"smooth"})}catch(o){l.error({position:"center",message:o.message})}finally{q(),h.reset()}});
//# sourceMappingURL=index.js.map
