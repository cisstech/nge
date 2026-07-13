import{a as g,c as Y,e as H,f as Z}from"./chunk-LMZWN2G7.js";import{d as X,k as J}from"./chunk-EOR6CVI2.js";import{h as q}from"./chunk-7GVUGIVX.js";import{K as f,L as P,N as E,P as b,Q as z,Va as F,Y as U,Z as y}from"./chunk-Y3QQXCAU.js";import{m as M}from"./chunk-FR3PSOBV.js";var j=/^:::(\+?)\s+(\w+)(\s+.+)?/,Q=/^:::\s*$/,L=(()=>{let t=class t{constructor(){this.document=b(y)}contribute(o){this.addStyles(),this.autoFixAdmonitionsSyntax(o),this.createAdmonitions(o)}addStyles(){let o=this.document.head;if(o.querySelector("[nge-markdown-admonitions]"))return;let n={note:{bg:"rgba(68, 138, 255, 0.1)",border:"#448aff"},abstract:{bg:"rgba(0, 176, 255, 0.1)",border:"#00b0ff"},info:{bg:"rgba(0, 184, 212, 0.1)",border:"#00b8d4"},tip:{bg:"rgba(0, 191, 165, 0.1)",border:"#00bfa5"},success:{bg:"rgba(0, 200, 83, 0.1)",border:"#00c853"},question:{bg:"rgba(100, 221, 23, 0.1)",border:"#64dd17"},warning:{bg:"rgba(255, 145, 0, 0.1)",border:"#ff9100"},failure:{bg:"rgba(255, 82, 82, 0.1)",border:"#ff5252"},danger:{bg:"rgba(255, 23, 68, 0.1)",border:"#ff1744"},bug:{bg:"rgba(245, 0, 87, 0.1)",border:"#f50057"},example:{bg:"rgba(101, 31, 255, 0.1)",border:"#651fff"},quote:{bg:"rgba(158, 158, 158, 0.1)",border:"#9e9e9e"}},r=[`
            /* CONTAINER */
            .nge-md-admonition {
                margin: 1.5625em 0;
                overflow: hidden;
                font-size: 0.84rem;
                page-break-inside: avoid;
                border-radius: 0.1rem;
                box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.05), 0 0 0.05rem rgba(0, 0, 0, 0.1);

                --admonition--note: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83 3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75L3 17.25z"/></svg>');
                --admonition--abstract: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4 5h16v2H4V5m0 4h16v2H4V9m0 4h16v2H4v-2m0 4h10v2H4v-2z"/></svg>');
                --admonition--info: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13 9h-2V7h2m0 10h-2v-6h2m-1-9A10 10 0 002 12a10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z"/></svg>');
                --admonition--tip: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17.55 11.2c-.23-.3-.5-.56-.76-.82-.65-.6-1.4-1.03-2.03-1.66C13.3 7.26 13 4.85 13.91 3c-.91.23-1.75.75-2.45 1.32-2.54 2.08-3.54 5.75-2.34 8.9.04.1.08.2.08.33 0 .22-.15.42-.35.5-.22.1-.46.04-.64-.12a.83.83 0 01-.15-.17c-1.1-1.43-1.28-3.48-.53-5.12C5.89 10 5 12.3 5.14 14.47c.04.5.1 1 .27 1.5.14.6.4 1.2.72 1.73 1.04 1.73 2.87 2.97 4.84 3.22 2.1.27 4.35-.12 5.96-1.6 1.8-1.66 2.45-4.32 1.5-6.6l-.13-.26c-.2-.46-.47-.87-.8-1.25l.05-.01m-3.1 6.3c-.28.24-.73.5-1.08.6-1.1.4-2.2-.16-2.87-.82 1.19-.28 1.89-1.16 2.09-2.05.17-.8-.14-1.46-.27-2.23-.12-.74-.1-1.37.18-2.06.17.38.37.76.6 1.06.76 1 1.95 1.44 2.2 2.8.04.14.06.28.06.43.03.82-.32 1.72-.92 2.27h.01z"/></svg>');
                --admonition--success: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2m-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>');
                --admonition--question: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.07 11.25l-.9.92C13.45 12.89 13 13.5 13 15h-2v-.5c0-1.11.45-2.11 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41a2 2 0 00-2-2 2 2 0 00-2 2H8a4 4 0 014-4 4 4 0 014 4 3.2 3.2 0 01-.93 2.25M13 19h-2v-2h2M12 2A10 10 0 002 12a10 10 0 0010 10 10 10 0 0010-10c0-5.53-4.5-10-10-10z"/></svg>');
                --admonition--warning: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13 14h-2v-4h2m0 8h-2v-2h2M1 21h22L12 2 1 21z"/></svg>');
                --admonition--failure: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2c5.53 0 10 4.47 10 10s-4.47 10-10 10S2 17.53 2 12 6.47 2 12 2m3.59 5L12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41 15.59 7z"/></svg>');
                --admonition--danger: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.5 20l4.86-9.73H13V4l-5 9.73h3.5V20M12 2c2.75 0 5.1 1 7.05 2.95C21 6.9 22 9.25 22 12s-1 5.1-2.95 7.05C17.1 21 14.75 22 12 22s-5.1-1-7.05-2.95C3 17.1 2 14.75 2 12s1-5.1 2.95-7.05C6.9 3 9.25 2 12 2z"/></svg>');
                --admonition--bug: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14 12h-4v-2h4m0 6h-4v-2h4m6-6h-2.81a5.985 5.985 0 00-1.82-1.96L17 4.41 15.59 3l-2.17 2.17a6.002 6.002 0 00-2.83 0L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8z"/></svg>');
                --admonition--example: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 13v-2h14v2H7m0 6v-2h14v2H7M7 7V5h14v2H7M3 8V5H2V4h2v4H3m-1 9v-1h3v4H2v-1h2v-.5H3v-1h1V17H2m2.25-7a.75.75 0 01.75.75c0 .2-.08.39-.21.52L3.12 13H5v1H2v-.92L4 11H2v-1h2.25z"/></svg>');
                --admonition--quote: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14 17h3l2-4V7h-6v6h3M6 17h3l2-4V7H5v6h3l-2 4z"/></svg>');
                --admonition--chevron-right: url('data:image/svg+xml;:charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg>');
                --admonition--chevron-down: url('data:image/svg+xml;:charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/></svg>');
            }

            /* TITLE */
            .nge-md-admonition-title {
                min-height: 24px;
                box-sizing: border-box;
                position: relative;
                display: flex;
                align-items: center;
                margin-top: 0 !important;
                margin-bottom: 0 !important;
                padding: 0.4rem 0.6rem 0.4rem 2rem;
                font-weight: 700;
                /*REMOVE DETAILS MARKER IN FIREFOX*/
                list-style-type: none;
            }
            .nge-md-admonition-title:focus {
                outline: none;
            }

            /* DETAILS MARKER */
            .nge-md-admonition-title::marker,
            .nge-md-admonition-title::-webkit-details-marker {
                display: none;
            }

            /* TITLE COLLAPSIBLE */

            details .nge-md-admonition-title {
                cursor: pointer;
            }
            details .nge-md-admonition-title:after {
                position: absolute;
                right: 0.6rem;
                width: 1rem;
                height: 1rem;
                -o-mask-image: var(--admonition--chevron-right);
                -webkit-mask-image: var(--admonition--chevron-right);
                mask-image: var(--admonition--chevron-right);
                content: "";
            }
            details[open] .nge-md-admonition-title:after {
                -o-mask-image: var(--admonition--chevron-down);
                -webkit-mask-image: var(--admonition--chevron-down);
                mask-image: var(--admonition--chevron-down);
            }

            /* CONTENT */
            .nge-md-admonition-content {
                padding: 0 0.6rem;
            }
        `];Object.keys(n).forEach(i=>{let c=n[i];r.push(`
                .nge-md-admonition--${i} {
                    border-left: 0.2rem solid ${c.border};
                }
                .nge-md-admonition-title--${i} {
                    background-color: ${c.bg};
                }
                .nge-md-admonition-title--${i}:before,
                .nge-md-admonition-title--${i}:after {
                    background-color: ${c.border};
                }
                .nge-md-admonition-title--${i}:before {
                    position: absolute;
                    left: 0.6rem;
                    width: 1rem;
                    height: 1rem;
                    -o-mask-image: var(--admonition--${i});
                    -webkit-mask-image: var(--admonition--${i});
                    mask-image: var(--admonition--${i});
                    content: "";
                }
            `)});let s=this.document.createElement("style");s.setAttribute("nge-markdown-admonitions",""),s.innerHTML=r.join(`
`),o.appendChild(s)}createAdmonitions(o){o.addHtmlTransformer(n=>{Array.from(n.querySelectorAll("p")).forEach(s=>{var a;let c=s.innerHTML.match(j);if(c){let d=c[1],h=c[2],p=(c[3]||"").trim(),u=this.document.createElement("details");d.endsWith("+")&&(u.open=!0),u.className="nge-md-admonition nge-md-admonition--"+h;let l=this.document.createElement("summary");l.className="nge-md-admonition-title nge-md-admonition-title--"+h,l.innerHTML=p;let v=[];u.appendChild(l);let w=s.nextElementSibling,A=1;for(;w;){let x=w.innerHTML.trim();if(x.match(j))A++;else if(x.match(Q)&&(A--,A===0)){w.remove();break}v.push(w),w=w.nextElementSibling}let T=this.document.createElement("div");T.className="nge-md-admonition-content",v.forEach(x=>T.appendChild(x)),u.appendChild(T),(a=s.parentElement)==null||a.insertBefore(u,s),s.remove()}})})}autoFixAdmonitionsSyntax(o){o.addMarkdownTransformer(n=>{let r=n.split(`
`),s=r.length,i=!1;for(let c=0;c<s;c++){let a=r[c];if(a.startsWith("```")&&(i=!i),i)continue;let d=c>0?r[c-1]:void 0,h=c<s-1?r[c+1]:void 0;a.match(j)?h!=null&&h.trim()&&(r[c]=a+`
`):a.match(Q)&&d!=null&&d.trim()&&(r[c]=`
`+a)}return r.join(`
`)})}};t.\u0275fac=function(n){return new(n||t)},t.\u0275prov=f({token:t,factory:t.\u0275fac});let e=t;return e})(),wt={provide:g,multi:!0,useClass:L};var C=new E("NGE_MARKDOWN_EMOJI_OPTIONS"),S=(()=>{let t=class t{constructor(){var o;this.options=(o=b(C,{optional:!0}))!=null?o:{url:"https://cdn.jsdelivr.net/npm/emoji-toolkit@8.0.0/lib/js/joypixels.min.js"}}dependencies(){let o=[];return typeof window<"u"&&!("joypixels"in window)&&o.push(["script",this.options.url]),o}contribute(o){o.addMarkdownTransformer(n=>{if(typeof window>"u"||!("joypixels"in window))return n;let{joypixels:r}=window,s=n.split(`
`),i=s.length,c=!1;for(let a=0;a<i;a++)s[a].startsWith("```")&&(c=!c),!c&&s[a].match(/:[a-z0-9_+-]+:/g)&&(s[a]=r.shortnameToUnicode(s[a]));return s.join(`
`)})}};t.\u0275fac=function(n){return new(n||t)},t.\u0275prov=f({token:t,factory:t.\u0275fac});let e=t;return e})(),yt={provide:g,multi:!0,useClass:S};function At(e){return{provide:C,useValue:e}}var tt="nge-markdown-code-chrome",et='<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',ot='<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',ct='<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg>';function nt(e,t){var c,a,d,h,p;let{pre:m}=t,o=m.parentNode;if(!o||(a=(c=o.getAttribute)==null?void 0:c.call(o,"class"))!=null&&a.includes("nge-code-block"))return;let n=e.createElement("div");n.setAttribute("class","nge-code-block");let r=e.createElement("div");r.setAttribute("class","nge-code-toolbar");let s=e.createElement("span");s.setAttribute("class","nge-code-toolbar-label"),s.textContent=(h=(d=t.filename)!=null?d:t.language)!=null?h:"",r.appendChild(s);let i=e.createElement("div");i.setAttribute("class","nge-code-toolbar-actions");for(let u of(p=t.actions)!=null?p:[])i.appendChild(dt(e,t.code,u));i.appendChild(lt(e,t)),i.appendChild(mt(e,t)),r.appendChild(i),o.insertBefore(n,m),n.appendChild(r),n.appendChild(m),ht(e)}function dt(e,t,m){let o=R(e,m.title,m.icon);return o.addEventListener("click",n=>{n.preventDefault(),n.stopPropagation(),m.run(t)}),o}function lt(e,t){let m=R(e,"Copy code to clipboard",et);return m.addEventListener("click",o=>M(null,null,function*(){o.preventDefault(),o.stopPropagation();try{yield navigator.clipboard.writeText(t.code),rt(m,et)}catch(n){}})),m}function mt(e,t){let m=R(e,"Download code as file",ot);return m.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation();let n=URL.createObjectURL(new Blob([t.code],{type:"text/plain"})),r=e.createElement("a");r.href=n,r.download=t.filename||`code.${t.language||"txt"}`,r.click(),URL.revokeObjectURL(n),rt(m,ot)}),m}function R(e,t,m){let o=e.createElement("button");return o.setAttribute("type","button"),o.setAttribute("class","nge-code-action"),o.setAttribute("title",t),o.setAttribute("aria-label",t),o.innerHTML=m,o}function rt(e,t){e.innerHTML=ct,e.setAttribute("class","nge-code-action nge-code-action-done"),setTimeout(()=>{e.innerHTML=t,e.setAttribute("class","nge-code-action")},2e3)}function ht(e){if(e.getElementById(tt))return;let t=e.createElement("style");t.id=tt,t.textContent=[".nge-code-block { border: 1px solid color-mix(in srgb, currentColor 14%, transparent); border-radius: 8px; overflow: hidden; margin: 1em 0; }",".nge-code-block > pre { margin: 0; border-radius: 0; }",".nge-code-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 0.5em; padding: 0.35em 0.5em 0.35em 1em; font-size: 0.8em; background-color: color-mix(in srgb, currentColor 5%, transparent); border-bottom: 1px solid color-mix(in srgb, currentColor 10%, transparent); }",".nge-code-toolbar-label { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; opacity: 0.75; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }",".nge-code-toolbar-actions { display: flex; gap: 0.25em; }",".nge-code-action { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; padding: 0; border: none; border-radius: 6px; background: transparent; color: inherit; opacity: 0.65; cursor: pointer; transition: opacity 0.2s, background-color 0.2s; }",".nge-code-action:hover { opacity: 1; background-color: color-mix(in srgb, currentColor 10%, transparent); }",".nge-code-action-done { color: #22c55e; opacity: 1; }"].join(`
`),e.head.appendChild(t)}var it="data-nge-md-hl-lines",D="data-nge-md-hl-language",st="data-nge-md-hl-highlights",at="data-nge-md-hl-filename",pt="data-nge-md-hl-stackblitz",ut=new E("NGE_MARKDOWN_CODE_ACTIONS"),O=new E("NGE_MARKDOWN_HIGHLIGHTER_SERVICE"),$=(()=>{let t=class t{constructor(){this.injector=b(U),this.options=b(O,{optional:!0})}contribute(o){this.createAttributes(o),this.colorizeCodes(o)}createAttributes(o){o.addRendererTransformer(n=>(n.code=(r,s)=>{s=s||"";let i=new Map,c=s.split(" ").slice(0,1).pop()||"plaintext";i.set(D,c);let a=s.match(/lines="(.+?)"/);return a&&i.set(it,a[1]),a=s.match(/highlights="(.+?)"/),a&&i.set(st,a[1]),a=s.match(/filename="(.+?)"/),a&&i.set(at,a[1]),/(^|\s)stackblitz(\s|$)/.test(s)&&i.set(pt,"true"),`<pre ${Array.from(i.entries()).map(([h,p])=>`${h}="${p}"`).join(" ")}><code>${this.escapeHtml(r)}</code></pre>`},n))}colorizeCodes(o){var s;if(!((s=this.options)!=null&&s.highligtht))return;let n=this.options.highligtht,r=this.injector.get(ut,[]);o.addHtmlTransformer(i=>M(this,null,function*(){var d,h;if(typeof document>"u"&&!((d=this.options)!=null&&d.ssr))return;let c=this.injector.get(y),a=Array.from(i.querySelectorAll(`pre[${D}]`));for(let p of a){let u=p.querySelector("code"),l=p.getAttribute(D)||"plaintext",v=p.getAttribute(at)||void 0,w=(h=u==null?void 0:u.textContent)!=null?h:"";yield n(this.injector,{lines:p.getAttribute(it)||"",element:u,language:l,highlights:p.getAttribute(st)||"",filename:v||""});let A={pre:p,code:w,language:l,filename:v},T=r.map(x=>x(A)).filter(x=>x!=null);nt(c,{pre:p,code:w,filename:v,language:l,actions:T})}}))}escapeHtml(o){let n={"<":"&lt;",">":"&gt;"};return o.replace(/[<>]/g,r=>n[r]||r)}};t.\u0275fac=function(n){return new(n||t)},t.\u0275prov=f({token:t,factory:t.\u0275fac});let e=t;return e})(),Lt={provide:g,multi:!0,useClass:$};function B(e){return{highligtht:(t,m)=>{let o=t.get(e,null),n=m.element,r=n.parentElement;r.style.overflow="auto",o==null||o.colorizeElement({element:n,language:m.language,code:n.textContent,lines:m.lines,filename:m.filename,highlights:m.highlights,fileTab:!1})}}}function St(e){return{provide:O,useValue:B(e)}}var _=(()=>{let t=class t{contribute(o){o.addMarkdownTransformer(n=>{let r=/@(\w+)\s+([\w-]+)((\s+(?:color|size)=[^\s]+)*?)?@/gm,s=n.split(`
`),i=s.length,c=!1;for(let a=0;a<i;a++)s[a].startsWith("```")&&(c=!c),!c&&(s[a]=s[a].replace(r,(h,p,u,l)=>(l=(l!=null?l:"").trim().split(" ").filter(v=>v.trim()).join("&"),l=l?"?"+l:"",`<img src="https://icongr.am/${p.trim()}/${u.trim()}.svg${l}"/>`)));return s.join(`
`)})}};t.\u0275fac=function(n){return new(n||t)},t.\u0275prov=f({token:t,factory:t.\u0275fac});let e=t;return e})(),Bt={provide:g,multi:!0,useClass:_};var I=new E("NGE_MARKDOWN_KATEX_OPTIONS"),G=(()=>{let t=class t{constructor(){var o,n,r;this.options=(o=b(I,{optional:!0}))!=null?o:{},this.options.extensions=this.options.extensions||{},this.options.extensions.mhchem=(n=this.options.extensions.mhchem)!=null?n:!0,this.options.extensions.copyTex=(r=this.options.extensions.copyTex)!=null?r:!0}dependencies(){var r,s,i;if(typeof window>"u"||"katex"in window)return[];let o=((r=this.options)==null?void 0:r.baseUrl)||"https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/";o.endsWith("/")||(o+="/");let n=[["style",`${o}katex.min.css`],["script",`${o}katex.js`],["script",`${o}contrib/auto-render.js`]];return(s=this.options.extensions)!=null&&s.copyTex&&n.push(["script",`${o}contrib/copy-tex.min.js`]),(i=this.options.extensions)!=null&&i.mhchem&&n.push(["script",`${o}contrib/mhchem.js`]),n}contribute(o){let n=[];o.addMarkdownTransformer(r=>r.replace(/(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`\n]*`)|(\$\$[\s\S]+?\$\$|\\\[[\s\S]+?\\\])/g,(s,i,c)=>i!=null?i:`

<div class="nge-markdown-math" data-math="${n.push(c)-1}"></div>

`)),o.addHtmlTransformer(r=>{if(Array.from(r.querySelectorAll(".nge-markdown-math")).forEach(i=>{var a,d;let c=r.ownerDocument.createElement("div");c.textContent=(a=n[Number(i.getAttribute("data-math"))])!=null?a:"",(d=i.parentNode)==null||d.replaceChild(c,i)}),typeof window>"u")return;let{renderMathInElement:s}=window;try{s(r,this.options.options||{delimiters:[{left:"$$",right:"$$",display:!1},{left:"$",right:"$",display:!1},{left:"\\(",right:"\\)",display:!1},{left:"\\[",right:"\\]",display:!1}]})}catch(i){console.error(i)}})}};t.\u0275fac=function(n){return new(n||t)},t.\u0275prov=f({token:t,factory:t.\u0275fac});let e=t;return e})(),Vt={provide:g,multi:!0,useClass:G};function Pt(e){return{provide:I,useValue:e}}var K=(()=>{let t=class t{constructor(){this.router=b(X),this.location=b(q)}contribute(o){o.addRendererTransformer(n=>(n.link=(r,s,i)=>{let c=new Map;return r.startsWith("#")&&(r=this.location.path()+r),c.set("href",r),(this.router.config||[]).map(d=>{var h;return(h=d.path)!=null&&h.startsWith("/")?d.path:"/"+d.path}).find(d=>r.startsWith(d))||c.set("target","_blank"),`<a ${Array.from(c.entries()).map(d=>d[0]+"="+d[1]).join(" ")}>${i}</a>`},n))}};t.\u0275fac=function(n){return new(n||t)},t.\u0275prov=f({token:t,factory:t.\u0275fac});let e=t;return e})(),Yt={provide:g,multi:!0,useClass:K};var W=0,V=(()=>{let t=class t{constructor(){this.document=b(y)}contribute(o){this.addStyles(),o.addHtmlTransformer(n=>{let r=/^===\s*(.+)/,s=/^===\s*$/,i=[],c=[];Array.from(n.querySelectorAll("p")).forEach(a=>{var h;if(i.indexOf(a)!==-1)return;let d=a.innerHTML.match(r);if(d){let p=[],u={title:d[1],content:[]},l=a.nextElementSibling;for(;l;){let v=!0,w=l.innerHTML.trim();if(w.match(r))p.push(u),u={title:w.replace("===","").trim(),content:[]},v=!1,c.push(l);else if(w.match(s)){p.push(u),c.push(l);break}v&&u.content.push(l),i.push(l),l=l.nextElementSibling}(h=a.parentElement)==null||h.replaceChild(this.createTabs(p),a),a.remove(),c.forEach(v=>v.remove())}})})}createTabs(o){let n=this.document.createElement("div");n.className="nge-md-tabbed-set";let r=0;return W++,o.forEach(s=>{let i=this.document.createElement("input");i.type="radio",i.id="nge-md-tabbed-"+W+"-"+r,i.name="nge-md-tabbed-"+W,r===0&&i.setAttribute("checked","checked");let c=this.document.createElement("label");c.setAttribute("for",i.id),c.innerHTML=s.title;let a=this.document.createElement("div");a.className="nge-md-tabbed-content",s.content.forEach(d=>a.appendChild(d)),n.appendChild(i),n.appendChild(c),n.appendChild(a),r++}),n}addStyles(){let o=this.document.head;if(o.querySelector("[nge-markdown-tabbed-set]"))return;let n=this.document.createElement("style");n.setAttribute("nge-markdown-tabbed-set",""),n.innerHTML=`
            /*  TAB SET */
            .nge-md-tabbed-set {
                display: flex;
                position: relative;
                flex-wrap: wrap;
                margin: 1em 0;
                border-radius: .1rem;
            }

            .nge-md-tabbed-set .highlight {
                background: #ddd;
            }

            .nge-md-tabbed-set .nge-md-tabbed-content {
                display: none;
                order: 99;
                width: 100%;
            }
            .nge-md-tabbed-set .nge-md-tabbed-content :first-child {
                margin: 0;
            }

            .nge-md-tabbed-set label {
                width: auto;
                /*padding: 0.25em;*/
                padding: .9375em 1.25em .78125em;
                font-weight: 700;
                font-size: .84rem;
                cursor: pointer;
            }

            .nge-md-tabbed-set input {
                position: absolute;
                opacity: 0;
            }

            .nge-md-tabbed-set input:nth-child(n+1) {
                color: #333333;
            }

            .nge-md-tabbed-set input:nth-child(n+1):checked + label {
                color: #ff5252;
                transition: all 0.3s;
                /* background-color: rgba(255, 82, 82, 0.1);*/
                border-bottom: .1rem solid;
            }

            .nge-md-tabbed-set input:nth-child(n+1):checked + label + .nge-md-tabbed-content {
                display: block;
                border-top: 1px solid #F5F5F5;
            }
        `,o.appendChild(n)}};t.\u0275fac=function(n){return new(n||t)},t.\u0275prov=f({token:t,factory:t.\u0275fac});let e=t;return e})(),oe={provide:g,multi:!0,useClass:V};var ae=(()=>{let t=class t{};t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=F({type:t}),t.\u0275inj=P({imports:[J]});let e=t;return e})();function xe(...e){return z(e.flatMap(t=>t.providers))}function Ee(e){return{providers:[typeof e=="function"?{provide:H,useFactory:e}:{provide:H,useValue:e}]}}function Ne(...e){return{providers:e.map(t=>({provide:Z,useValue:t,multi:!0}))}}function ke(e){return{providers:[{provide:Y,useValue:e}]}}function ye(e){return{providers:[k(G),...e?[{provide:I,useValue:e}]:[]]}}function Ae(e){return{providers:[k(S),...e?[{provide:C,useValue:e}]:[]]}}function Te(){return{providers:[k(_)]}}function Me(){return{providers:[k(V)]}}function Ce(){return{providers:[k(K)]}}function Oe(){return{providers:[k(L)]}}function Ie(e){return{providers:[k($),...e?[gt(e)]:[]]}}function k(e){return{provide:g,multi:!0,useClass:e}}function gt(e){return{provide:O,useValue:B(e)}}export{L as a,wt as b,C as c,S as d,yt as e,At as f,pt as g,ut as h,O as i,$ as j,Lt as k,B as l,St as m,_ as n,Bt as o,I as p,G as q,Vt as r,Pt as s,K as t,Yt as u,V as v,oe as w,ae as x,xe as y,Ee as z,Ne as A,ke as B,ye as C,Ae as D,Te as E,Me as F,Ce as G,Oe as H,Ie as I};
