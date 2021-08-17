document.addEventListener("DOMContentLoaded",()=>{const e=document.createElement("link");e.rel="stylesheet",e.href="https://feedlr.vercel.app/widget.css",document.head.append(e);const t=document.createElement("div"),n=document.createElement("iframe");n.src="https://feedlr.vercel.app/widget/index.html",n.width="350",n.classList.add("feedlr-widget-iframe-bottom"),n.classList.add("feedlr-widget-sticky-bottom"),n.onload=function(){d();const e=n.contentWindow.document.querySelectorAll(".emoji_radio"),t=n.contentWindow.document.querySelectorAll("button");e.forEach(e=>{e.addEventListener("change",()=>{d()})}),t.forEach(e=>{e.addEventListener("click",()=>{d()})})};const o=document.createElement("button");function d(){n.style.height=n.contentWindow.document.body.scrollHeight+10+"px"}o.innerHTML=`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  class="feather feather-x"
>
  <line x1="18" y1="6" x2="6" y2="18"></line>
  <line x1="6" y1="6" x2="18" y2="18"></line>
</svg>`,o.classList.add("feedlr-widget-close_button"),o.onclick=function(){document.body.removeChild(t)},t.append(n),t.append(o),document.body.append(n),d()});