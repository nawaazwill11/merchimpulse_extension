!function(){console.log=(()=>{});const e=e=>new Promise(t=>{window.chrome.storage.sync.get(e,o=>t(o[e]))}),t=(e,t)=>new Promise(e=>{window.chrome.storage.sync.set({key:t},()=>e())});let o,n,s;window.addEventListener("load",async function(){o=await e("auth_token"),n=await e("filter"),s=await e("active"),function(){const e=new RegExp("https://www.tmdn.org/tmview/api/search/*");if(window.location.href.match(e)){const e=JSON.parse(document.body.innerText);window.chrome.runtime.sendMessage({action:"DATA",data:e}),window.close()}}(),window.chrome.runtime.onMessage.addListener((e,t,o)=>{if(console.log(e),"receiveTrademarkData"===e.action){const t=new window.BroadcastChannel("trademark");t.postMessage(e.data),t.close()}o({})}),function(){if(!n)return null;const e=n.toLowerCase(),t=new RegExp("https://www.amazon..*/.*?.*=.*"),o=`&i=fashion-novelty&hidden-keywords=${e}`;window.location.href.match(t)&&["t-shirt","premium","popsocket","sweatshirt","longsleeve"].includes(e)&&!window.location.href.match(o)&&(window.location.href=window.location.href+o)}(),(console.log(o),o?fetch("https://merchimpulse.com/api/ping",{method:"POST",headers:new Headers({Authorization:o})}):Promise.resolve(!1)).then(e=>e?e.json():Promise.resolve({})).then(async e=>{if(console.log(e),e.error)return await t("auth_token","");e.success&&("pro"===e.subs.type||e.subs.count<11)&&s&&(()=>new Promise((e,t)=>{try{const o=document.querySelector(".s-search-results");if(!o)return t("Failed to inject extension.");const n=document.createElement("div");n.id="_mi_injected_element",o.closest(".sg-col-inner").prepend(n),e()}catch(e){t(e)}}))().then(()=>(()=>new Promise((e,t)=>{try{const o=document.head;["bootstrap.min.css","style.css"].forEach(e=>{const t=document.createElement("link");t.href=window.window.chrome.extension.getURL(`static/css/${e}`),t.rel="stylesheet",o.append(t)});const n=document.body;["script0.js","script1.js","script2.js"].forEach(e=>{const t=document.createElement("script");t.type="text/javascript",t.src=window.window.chrome.extension.getURL(`static/js/${e}`),n.append(t)}),e()}catch(e){t(e)}}))()).then(()=>{}).catch(e=>console.log(e))})})}();