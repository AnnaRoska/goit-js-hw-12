import{a as $,i as a,S as P}from"./assets/vendor-D3oKd7SZ.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();async function f(o,t){const n="https://pixabay.com",i="/api/",e=new URLSearchParams({key:"51904026-11e1c7708336e49fc55c25133",q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t}),r=`${n}${i}?${e}`;try{return(await $.get(r)).data}catch(s){return a.error({position:"center",message:s.message}),[]}}const g=document.querySelector(".loader"),h=document.querySelector(".gallery"),y=document.querySelector(".btn-more");let l=null;function p(o){if(!o||o.length===0)return;const t=o.map(({webformatURL:n,largeImageURL:i,tags:e,likes:r,views:s,comments:q,downloads:v})=>`
        <li class="photo-card">
          <a href="${i}">
          <img src="${n}" alt="${e}" />
          </a>
          <div class="info">
            <ul class="ul-info">
            <li>Likes</li>
            <li>${r}</li>
            </ul>
            <ul class="ul-info">
            <li>Views</li>
            <li>${s}</li>
            </ul>
            <ul class="ul-info">
            <li>Comments</li>
            <li>${q}</li>
            </ul>
            <ul class="ul-info">
            <li>Downloads</li>
            <li>${v}</li>
            </ul>
          </div>
        </li>
         `).join("");h.insertAdjacentHTML("beforeend",t),l?l.refresh():l=new P(".gallery a",{captionsData:"alt",captionDelay:250})}function I(){h.innerHTML=""}function L(){g.classList.remove("hidden")}function w(){g.classList.add("hidden")}function b(){y.classList.remove("hidden")}function S(){y.classList.add("hidden")}let m=1,c="";const M=document.querySelector('[name="search-text"]'),u=document.querySelector(".form"),O=document.querySelector(".btn-more");let d;u.addEventListener("submit",async o=>{if(o.preventDefault(),c=M.value.trim(),c.length===0){a.error({position:"center",message:"❌ Fill in the search field"});return}I(),S(),L();try{const t=await f(c,1),n=t.hits;if(d=t.totalHits,p(n),!n||n.length===0){a.warning({position:"center",message:"Sorry, there are no images matching your search query. Please try again!"});return}b()}catch(t){a.error({position:"center",message:t.message})}finally{w(),u.reset()}});O.addEventListener("click",async()=>{S(),L();try{const o=await f(c,m+=1),t=o.hits;if(d=o.totalHits,m*15>d){a.warning({position:"center",message:"We're sorry, but you've reached the end of search results."});return}if(p(t),!t||t.length===0){a.warning({position:"center",message:"Sorry, there are no images matching your search query. Please try again!"});return}const i=document.querySelector(".photo-card").getBoundingClientRect().height;console.log("Висота картки:",i),window.scrollBy({top:i*2,behavior:"smooth"})}catch(o){a.error({position:"center",message:o.message})}finally{w(),b(),u.reset()}});
//# sourceMappingURL=index.js.map
