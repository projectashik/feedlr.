document.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("iframe");function n(){t.height=t.contentWindow.document.body.scrollHeight+"px"}t.src="https://feedlr.vercel.app/widget/index.html",t.width="350",t.classList.add("feedlr-widget-sticky-bottom"),t.onload=function(){n();const e=t.contentWindow.document.querySelectorAll(".emoji_radio");t.contentWindow.document.querySelector(".submit_button");e.forEach(e=>{e.addEventListener("change",()=>{n()})}),window.addEventListener("message",e=>{"requested_url"===e.data&&t.contentWindow.postMessage("url_is_here"),"response_submitted"===e.data&&(t.height="250px",setInterval(()=>{t.height=0},1100))})},function(){const e=document.createElement("link");e.rel="stylesheet",e.href="https://feedlr.vercel.app/widget.css",document.head.append(e)}(),document.body.append(t),n()});