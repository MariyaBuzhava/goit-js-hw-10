import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{f as g,i as c}from"./assets/vendor-77e16229.js";const s=document.getElementById("datetime-picker"),t=document.querySelector("button[data-start]"),p=document.querySelector("[data-days]"),b=document.querySelector("[data-hours]"),C=document.querySelector("[data-minutes]"),S=document.querySelector("[data-seconds]");let n,l;g(s,{enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){n=e[0],n<new Date?(c.warning({message:"Please choose a date in the future",position:"topRight",backgroundColor:"#ef4040",messageColor:"#fff"}),t.disabled=!0):t.disabled=!1}});function k(e){const m=Math.floor(e/864e5),f=Math.floor(e%864e5/36e5),h=Math.floor(e%864e5%36e5/6e4),y=Math.floor(e%864e5%36e5%6e4/1e3);return{days:m,hours:f,minutes:h,seconds:y}}function o(e){return String(e).padStart(2,"0")}function u(){const e=n-new Date;if(e<=0){clearInterval(l),t.disabled=!1,s.disabled=!1,c.info({message:"Time's up!",position:"topRight",backgroundColor:"#59a10d",messageColor:"#fff"});return}const{days:a,hours:r,minutes:d,seconds:i}=k(e);p.textContent=o(a),b.textContent=o(r),C.textContent=o(d),S.textContent=o(i)}t.addEventListener("click",()=>{t.disabled=!0,s.disabled=!0,l=setInterval(u,1e3),u()});t.disabled=!0;
//# sourceMappingURL=commonHelpers.js.map