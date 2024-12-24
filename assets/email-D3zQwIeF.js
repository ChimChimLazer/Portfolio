(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function r(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=r(s);fetch(s.href,o)}})();class l{constructor(t=0,r="Network Error"){this.status=t,this.text=r}}const j=()=>{if(!(typeof localStorage>"u"))return{get:e=>Promise.resolve(localStorage.getItem(e)),set:(e,t)=>Promise.resolve(localStorage.setItem(e,t)),remove:e=>Promise.resolve(localStorage.removeItem(e))}},i={origin:"https://api.emailjs.com",blockHeadless:!1,storageProvider:j()},p=e=>e?typeof e=="string"?{publicKey:e}:e.toString()==="[object Object]"?e:{}:{},H=(e,t="https://api.emailjs.com")=>{if(!e)return;const r=p(e);i.publicKey=r.publicKey,i.blockHeadless=r.blockHeadless,i.storageProvider=r.storageProvider,i.blockList=r.blockList,i.limitRate=r.limitRate,i.origin=r.origin||t},g=async(e,t,r={})=>{const n=await fetch(i.origin+e,{method:"POST",headers:r,body:t}),s=await n.text(),o=new l(n.status,s);if(n.ok)return o;throw o},y=(e,t,r)=>{if(!e||typeof e!="string")throw"The public key is required. Visit https://dashboard.emailjs.com/admin/account";if(!t||typeof t!="string")throw"The service ID is required. Visit https://dashboard.emailjs.com/admin";if(!r||typeof r!="string")throw"The template ID is required. Visit https://dashboard.emailjs.com/admin/templates"},R=e=>{if(e&&e.toString()!=="[object Object]")throw"The template params have to be the object. Visit https://www.emailjs.com/docs/sdk/send/"},w=e=>e.webdriver||!e.languages||e.languages.length===0,v=()=>new l(451,"Unavailable For Headless Browser"),E=(e,t)=>{if(!Array.isArray(e))throw"The BlockList list has to be an array";if(typeof t!="string")throw"The BlockList watchVariable has to be a string"},F=e=>{var t;return!((t=e.list)!=null&&t.length)||!e.watchVariable},O=(e,t)=>e instanceof FormData?e.get(t):e[t],L=(e,t)=>{if(F(e))return!1;E(e.list,e.watchVariable);const r=O(t,e.watchVariable);return typeof r!="string"?!1:e.list.includes(r)},P=()=>new l(403,"Forbidden"),_=(e,t)=>{if(typeof e!="number"||e<0)throw"The LimitRate throttle has to be a positive number";if(t&&typeof t!="string")throw"The LimitRate ID has to be a non-empty string"},q=async(e,t,r)=>{const n=Number(await r.get(e)||0);return t-Date.now()+n},S=async(e,t,r)=>{if(!t.throttle||!r)return!1;_(t.throttle,t.id);const n=t.id||e;return await q(n,t.throttle,r)>0?!0:(await r.set(n,Date.now().toString()),!1)},k=()=>new l(429,"Too Many Requests"),K=async(e,t,r,n)=>{const s=p(n),o=s.publicKey||i.publicKey,a=s.blockHeadless||i.blockHeadless,u=s.storageProvider||i.storageProvider,m={...i.blockList,...s.blockList},d={...i.limitRate,...s.limitRate};return a&&w(navigator)?Promise.reject(v()):(y(o,e,t),R(r),r&&L(m,r)?Promise.reject(P()):await S(location.pathname,d,u)?Promise.reject(k()):g("/api/v1.0/email/send",JSON.stringify({lib_version:"4.4.1",user_id:o,service_id:e,template_id:t,template_params:r}),{"Content-type":"application/json"}))},V=e=>{if(!e||e.nodeName!=="FORM")throw"The 3rd parameter is expected to be the HTML form element or the style selector of the form"},M=e=>typeof e=="string"?document.querySelector(e):e,B=async(e,t,r,n)=>{const s=p(n),o=s.publicKey||i.publicKey,a=s.blockHeadless||i.blockHeadless,u=i.storageProvider||s.storageProvider,m={...i.blockList,...s.blockList},d={...i.limitRate,...s.limitRate};if(a&&w(navigator))return Promise.reject(v());const f=M(r);y(o,e,t),V(f);const c=new FormData(f);return L(m,c)?Promise.reject(P()):await S(location.pathname,d,u)?Promise.reject(k()):(c.append("lib_version","4.4.1"),c.append("service_id",e),c.append("template_id",t),c.append("user_id",o),g("/api/v1.0/email/send-form",c))},T={init:H,send:K,sendForm:B,EmailJSResponseStatus:l},b=document.querySelector("#contact-form-form"),h=document.querySelector("#submit-contact"),D=document.querySelector("#name"),I=document.querySelector("#email"),N=document.querySelector("#message"),x="Mom9JcScPRUDHw_ga",A="service_6xy26rs",J="template_c76zw7r";T.init(x);b.addEventListener("submit",e=>{e.preventDefault(),h.innerHTML="Sending Emails...";const t={name:D.value,email:I.value,message:N.value};T.send(A,J,t).then(()=>{b.innerHTML="Email Sent"},r=>{console.log(r),alert("Somthing went wrong with sending the Email"),h.innerHTML="Send Email"})});
