const base_url="https://feedlr.vercel.app",css_url=base_url+"/widget.css";window.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector("script[data-feedlr-project-id]");var t=e?.getAttribute("data-feedlr-project-id");console.log({script:e,projectId:t});const i=["hate","disappointed","natural","good","excellent"];let u="";const p=document.createElement("div");p.classList.add("feedlr-container"),document.body.appendChild(p);let o=base_url+"/api/projects/widget?url="+window.location.host;t&&(o=base_url+"/api/projects/widget?id="+t);(()=>{const e=document.createElement("link");e.rel="stylesheet",e.href=css_url,document.head.appendChild(e)})(),(async()=>{console.log(o),console.log("Fetching",window.location.host+"http"),fetch(o).then(e=>e.json()).then(e=>{console.log(e),e.url!==window.location.pathname&&!e.setting.localhostEnabled||(console.log(e),(()=>{const e=document.createElement("button");e.classList.add("feedlr-widget-toggler"),e.innerText="Feedback",p.appendChild(e)})(),(e=>{const d=document.createElement("div");d.classList.add("feedlr-widget"),d.classList.add("widget-fixed");const l=document.createElement("p");l.innerText=e.setting?e.setting.question.replaceAll("%name%",e.name):"What do you think about "+e.name+"?",l.classList.add("feedlr-question");const t=document.createElement("p");t.innerHTML=`
     Widget by <a href="https://feedlr.vercel.app" target="_blank">Feedlr.</a>
    `,t.classList.add("feedlr-footer_text");const r=document.createElement("form");r.classList.add("feedlr-form");const n=document.createElement("div");n.classList.add("feedlr-emoji-container"),i.forEach(t=>{const o=document.createElement("button");o.type="button";o.classList.add("feedlr-emoji-button");o.setAttribute("data-emoji",t);o.addEventListener("click",()=>{u=t;const e=document.querySelectorAll(".feedlr-selected-emoji");e.forEach(e=>{e.classList.remove("feedlr-selected-emoji")});o.classList.add("feedlr-selected-emoji");r.classList.add("show")});const e=document.createElement("img");e.src=base_url+"/widget/emojis/"+t+".gif";e.width=40;e.height=40;o.append(e);n.appendChild(o)});const s=document.createElement("input");s.type="email",s.required=true,s.classList.add("feedlr-email_input"),s.placeholder="Enter your email";const a=document.createElement("textarea");a.required=true,a.classList.add("feedlr-feedback_input"),a.placeholder="Your feedback";const o=document.createElement("button");o.innerText="Submit Feedback",o.classList.add("feedlr-feedback_submit"),r.appendChild(s),r.appendChild(a),r.appendChild(o),r.appendChild(t);const c=document.createElement("div");c.classList.add("feedlr-thankyou-window"),c.innerText=e.setting.thankYouMessage,d.appendChild(l),d.appendChild(n),d.appendChild(r),p.appendChild(d),r.addEventListener("submit",e=>{e.preventDefault();const t=s.value;const o=a.value;console.log("Form Submitted");d.removeChild(l);d.removeChild(n);d.removeChild(r);d.appendChild(c);setInterval(()=>{const e=document.querySelector(".feedlr-container");e.style.display="none"},4e3)})})(e),(e=>{const t=document.querySelector(":root"),o=document.querySelector(".dark");t.style.setProperty("--feedlr-primary-color","#"+(e?e.lightModeButtonColor:"9261DF")),o?.style.setProperty("--feedlr-primary-color","#"+(e?e.darkModeButtonColor:"9261DF")),t.style.setProperty("--feedlr-widget-bg","#"+(e?e.lightModeBackground:"ffffff")),o?.style.setProperty("--feedlr-widget-bg","#"+(e?e.darkModeBackground:"0F0F0F")),t.style.setProperty("--feedlr-button-color","#"+(e?e.lightModeButtonColor:"9261DF")),o?.style.setProperty("--feedlr-button-color","#"+(e?e.darkModeButtonColor:"9261DF")),t.style.setProperty("--feedlr-text-color","#"+(e?e.lightModeTextColor:"9261DF")),o?.style.setProperty("--feedlr-text-color","#"+(e?e.darkModeTextColor:"9261DF"))})(e.setting))}).catch(e=>console.log(e))})()});