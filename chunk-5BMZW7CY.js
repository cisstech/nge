import{a as v,b as M,c as rt,g as it}from"./chunk-UXF4QT5A.js";import{d as ot,k as nt}from"./chunk-OWTTFE3C.js";import{h as tt,s as et}from"./chunk-XG5V2PFH.js";import{T as w,U as q,W as y,Y as b,Z as X,a as I,b as L,cb as Z,fa as J,fb as Q,ga as N,i as x,qa as Y}from"./chunk-EIIO7OCB.js";var R=/^:::(\+?)\s+(\w+)(\s+.+)?/,st=/^:::\s*$/,D=(()=>{let t=class t{constructor(){this.document=b(N)}contribute(o){this.addStyles(),this.autoFixAdmonitionsSyntax(o),this.createAdmonitions(o)}addStyles(){let o=this.document.head;if(o.querySelector("[nge-markdown-admonitions]"))return;let n={note:{bg:"rgba(68, 138, 255, 0.1)",border:"#448aff"},abstract:{bg:"rgba(0, 176, 255, 0.1)",border:"#00b0ff"},info:{bg:"rgba(0, 184, 212, 0.1)",border:"#00b8d4"},tip:{bg:"rgba(0, 191, 165, 0.1)",border:"#00bfa5"},success:{bg:"rgba(0, 200, 83, 0.1)",border:"#00c853"},question:{bg:"rgba(100, 221, 23, 0.1)",border:"#64dd17"},warning:{bg:"rgba(255, 145, 0, 0.1)",border:"#ff9100"},failure:{bg:"rgba(255, 82, 82, 0.1)",border:"#ff5252"},danger:{bg:"rgba(255, 23, 68, 0.1)",border:"#ff1744"},bug:{bg:"rgba(245, 0, 87, 0.1)",border:"#f50057"},example:{bg:"rgba(101, 31, 255, 0.1)",border:"#651fff"},quote:{bg:"rgba(158, 158, 158, 0.1)",border:"#9e9e9e"}},r=[`
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
        `];Object.keys(n).forEach(a=>{let c=n[a];r.push(`
                .nge-md-admonition--${a} {
                    border-left: 0.2rem solid ${c.border};
                }
                .nge-md-admonition-title--${a} {
                    background-color: ${c.bg};
                }
                .nge-md-admonition-title--${a}:before,
                .nge-md-admonition-title--${a}:after {
                    background-color: ${c.border};
                }
                .nge-md-admonition-title--${a}:before {
                    position: absolute;
                    left: 0.6rem;
                    width: 1rem;
                    height: 1rem;
                    -o-mask-image: var(--admonition--${a});
                    -webkit-mask-image: var(--admonition--${a});
                    mask-image: var(--admonition--${a});
                    content: "";
                }
            `)});let s=this.document.createElement("style");s.setAttribute("nge-markdown-admonitions",""),s.innerHTML=r.join(`
`),o.appendChild(s)}createAdmonitions(o){o.addHtmlTransformer(n=>{Array.from(n.querySelectorAll("p")).forEach(s=>{var i;let c=s.innerHTML.match(R);if(c){let d=c[1],h=c[2],u=(c[3]||"").trim(),p=this.document.createElement("details");d.endsWith("+")&&(p.open=!0),p.className="nge-md-admonition nge-md-admonition--"+h;let m=this.document.createElement("summary");m.className="nge-md-admonition-title nge-md-admonition-title--"+h,m.innerHTML=u;let g=[];p.appendChild(m);let f=s.nextElementSibling,k=1;for(;f;){let E=f.innerHTML.trim();if(E.match(R))k++;else if(E.match(st)&&(k--,k===0)){f.remove();break}g.push(f),f=f.nextElementSibling}let C=this.document.createElement("div");C.className="nge-md-admonition-content",g.forEach(E=>C.appendChild(E)),p.appendChild(C),(i=s.parentElement)==null||i.insertBefore(p,s),s.remove()}})})}autoFixAdmonitionsSyntax(o){o.addMarkdownTransformer(n=>{let r=n.split(`
`),s=r.length,a=!1;for(let c=0;c<s;c++){let i=r[c];if(i.startsWith("```")&&(a=!a),a)continue;let d=c>0?r[c-1]:void 0,h=c<s-1?r[c+1]:void 0;i.match(R)?h!=null&&h.trim()&&(r[c]=i+`
`):i.match(st)&&d!=null&&d.trim()&&(r[c]=`
`+i)}return r.join(`
`)})}};t.\u0275fac=function(n){return new(n||t)},t.\u0275prov=w({token:t,factory:t.\u0275fac});let e=t;return e})(),Dt={provide:v,multi:!0,useClass:D};var S=new y("NGE_MARKDOWN_EMOJI_OPTIONS"),_=(()=>{let t=class t{constructor(){var o;this.options=(o=b(S,{optional:!0}))!=null?o:{url:"https://cdn.jsdelivr.net/npm/emoji-toolkit@8.0.0/lib/js/joypixels.min.js"}}dependencies(){let o=[];return typeof window<"u"&&!("joypixels"in window)&&o.push(["script",this.options.url]),o}contribute(o){o.addMarkdownTransformer(n=>{if(typeof window>"u"||!("joypixels"in window))return n;let{joypixels:r}=window,s=n.split(`
`),a=s.length,c=!1;for(let i=0;i<a;i++)s[i].startsWith("```")&&(c=!c),!c&&s[i].match(/:[a-z0-9_+-]+:/g)&&(s[i]=r.shortnameToUnicode(s[i]));return s.join(`
`)})}};t.\u0275fac=function(n){return new(n||t)},t.\u0275prov=w({token:t,factory:t.\u0275fac});let e=t;return e})(),Kt={provide:v,multi:!0,useClass:_};function Wt(e){return{provide:S,useValue:e}}var at="nge-markdown-code-chrome",ct='<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',lt='<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',kt='<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg>';function dt(e,t){var c,i,d,h,u;let{pre:l}=t,o=l.parentNode;if(!o||(i=(c=o.getAttribute)==null?void 0:c.call(o,"class"))!=null&&i.includes("nge-code-block"))return;let n=e.createElement("div");n.setAttribute("class","nge-code-block");let r=e.createElement("div");r.setAttribute("class","nge-code-toolbar");let s=e.createElement("span");s.setAttribute("class","nge-code-toolbar-label"),s.textContent=(h=(d=t.filename)!=null?d:t.language)!=null?h:"",r.appendChild(s);let a=e.createElement("div");a.setAttribute("class","nge-code-toolbar-actions");for(let p of(u=t.actions)!=null?u:[])a.appendChild(Et(e,t.code,p));a.appendChild(Nt(e,t)),a.appendChild(At(e,t)),r.appendChild(a),o.insertBefore(n,l),n.appendChild(r),n.appendChild(l),yt(e)}function Et(e,t,l){let o=$(e,l.title,l.icon);return o.addEventListener("click",n=>{n.preventDefault(),n.stopPropagation(),l.run(t)}),o}function Nt(e,t){let l=$(e,"Copy code to clipboard",ct);return l.addEventListener("click",o=>x(null,null,function*(){o.preventDefault(),o.stopPropagation();try{yield navigator.clipboard.writeText(t.code),mt(l,ct)}catch(n){}})),l}function At(e,t){let l=$(e,"Download code as file",lt);return l.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation();let n=URL.createObjectURL(new Blob([t.code],{type:"text/plain"})),r=e.createElement("a");r.href=n,r.download=t.filename||`code.${t.language||"txt"}`,r.click(),URL.revokeObjectURL(n),mt(l,lt)}),l}function $(e,t,l){let o=e.createElement("button");return o.setAttribute("type","button"),o.setAttribute("class","nge-code-action"),o.setAttribute("title",t),o.setAttribute("aria-label",t),o.innerHTML=l,o}function mt(e,t){e.innerHTML=kt,e.setAttribute("class","nge-code-action nge-code-action-done"),setTimeout(()=>{e.innerHTML=t,e.setAttribute("class","nge-code-action")},2e3)}function yt(e){if(e.getElementById(at))return;let t=e.createElement("style");t.id=at,t.textContent=[".nge-code-block { border: 1px solid color-mix(in srgb, currentColor 14%, transparent); border-radius: 8px; overflow: hidden; margin: 1em 0; }",".nge-code-block > pre { margin: 0; border-radius: 0; }",".nge-code-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 0.5em; padding: 0.35em 0.5em 0.35em 1em; font-size: 0.8em; background-color: color-mix(in srgb, currentColor 5%, transparent); border-bottom: 1px solid color-mix(in srgb, currentColor 10%, transparent); }",".nge-code-toolbar-label { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; opacity: 0.75; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }",".nge-code-toolbar-actions { display: flex; gap: 0.25em; }",".nge-code-action { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; padding: 0; border: none; border-radius: 6px; background: transparent; color: inherit; opacity: 0.65; cursor: pointer; transition: opacity 0.2s, background-color 0.2s; }",".nge-code-action:hover { opacity: 1; background-color: color-mix(in srgb, currentColor 10%, transparent); }",".nge-code-action-done { color: #22c55e; opacity: 1; }"].join(`
`),e.head.appendChild(t)}var ht="data-nge-md-hl-lines",B="data-nge-md-hl-language",ut="data-nge-md-hl-highlights",pt="data-nge-md-hl-filename",G="data-nge-md-hl-stackblitz",K=new y("NGE_MARKDOWN_CODE_ACTIONS"),O=new y("NGE_MARKDOWN_HIGHLIGHTER_SERVICE"),H=(()=>{let t=class t{constructor(){this.injector=b(J),this.options=b(O,{optional:!0})}contribute(o){this.createAttributes(o),this.colorizeCodes(o)}createAttributes(o){o.addRendererTransformer(n=>(n.code=(r,s)=>{s=s||"";let a=new Map,c=s.split(" ").slice(0,1).pop()||"plaintext";a.set(B,c);let i=s.match(/lines="(.+?)"/);return i&&a.set(ht,i[1]),i=s.match(/highlights="(.+?)"/),i&&a.set(ut,i[1]),i=s.match(/filename="(.+?)"/),i&&a.set(pt,i[1]),/(^|\s)stackblitz(\s|$)/.test(s)&&a.set(G,"true"),`<pre ${Array.from(a.entries()).map(([h,u])=>`${h}="${u}"`).join(" ")}><code>${this.escapeHtml(r)}</code></pre>`},n))}colorizeCodes(o){var s;if(!((s=this.options)!=null&&s.highligtht))return;let n=this.options.highligtht,r=this.injector.get(K,[]);o.addHtmlTransformer(a=>x(this,null,function*(){var d,h;if(typeof document>"u"&&!((d=this.options)!=null&&d.ssr))return;let c=this.injector.get(N),i=Array.from(a.querySelectorAll(`pre[${B}]`));for(let u of i){let p=u.querySelector("code"),m=u.getAttribute(B)||"plaintext",g=u.getAttribute(pt)||void 0,f=(h=p==null?void 0:p.textContent)!=null?h:"";yield n(this.injector,{lines:u.getAttribute(ht)||"",element:p,language:m,highlights:u.getAttribute(ut)||"",filename:g||""});let k={pre:u,code:f,language:m,filename:g},C=r.map(E=>E(k)).filter(E=>E!=null);dt(c,{pre:u,code:f,filename:g,language:m,actions:C})}}))}escapeHtml(o){let n={"<":"&lt;",">":"&gt;"};return o.replace(/[<>]/g,r=>n[r]||r)}};t.\u0275fac=function(n){return new(n||t)},t.\u0275prov=w({token:t,factory:t.\u0275fac});let e=t;return e})(),Jt={provide:v,multi:!0,useClass:H};function W(e){return{highligtht:(t,l)=>{let o=t.get(e,null),n=l.element,r=n.parentElement;r.style.overflow="auto",o==null||o.colorizeElement({element:n,language:l.language,code:n.textContent,lines:l.lines,filename:l.filename,highlights:l.highlights,fileTab:!1})}}}function Yt(e){return{provide:O,useValue:W(e)}}var z=(()=>{let t=class t{contribute(o){o.addMarkdownTransformer(n=>{let r=/@(\w+)\s+([\w-]+)((\s+(?:color|size)=[^\s]+)*?)?@/gm,s=n.split(`
`),a=s.length,c=!1;for(let i=0;i<a;i++)s[i].startsWith("```")&&(c=!c),!c&&(s[i]=s[i].replace(r,(h,u,p,m)=>(m=(m!=null?m:"").trim().split(" ").filter(g=>g.trim()).join("&"),m=m?"?"+m:"",`<img src="https://icongr.am/${u.trim()}/${p.trim()}.svg${m}"/>`)));return s.join(`
`)})}};t.\u0275fac=function(n){return new(n||t)},t.\u0275prov=w({token:t,factory:t.\u0275fac});let e=t;return e})(),ee={provide:v,multi:!0,useClass:z};var j=new y("NGE_MARKDOWN_KATEX_OPTIONS"),P=(()=>{let t=class t{constructor(){var o,n,r;this.options=(o=b(j,{optional:!0}))!=null?o:{},this.options.extensions=this.options.extensions||{},this.options.extensions.mhchem=(n=this.options.extensions.mhchem)!=null?n:!0,this.options.extensions.copyTex=(r=this.options.extensions.copyTex)!=null?r:!0}dependencies(){var r,s,a;if(typeof window>"u"||"katex"in window)return[];let o=((r=this.options)==null?void 0:r.baseUrl)||"https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/";o.endsWith("/")||(o+="/");let n=[["style",`${o}katex.min.css`],["script",`${o}katex.js`],["script",`${o}contrib/auto-render.js`]];return(s=this.options.extensions)!=null&&s.copyTex&&n.push(["script",`${o}contrib/copy-tex.min.js`]),(a=this.options.extensions)!=null&&a.mhchem&&n.push(["script",`${o}contrib/mhchem.js`]),n}contribute(o){let n=[];o.addMarkdownTransformer(r=>r.replace(/(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`\n]*`)|(\$\$[\s\S]+?\$\$|\\\[[\s\S]+?\\\])/g,(s,a,c)=>a!=null?a:`

<div class="nge-markdown-math" data-math="${n.push(c)-1}"></div>

`)),o.addHtmlTransformer(r=>{if(Array.from(r.querySelectorAll(".nge-markdown-math")).forEach(a=>{var i,d;let c=r.ownerDocument.createElement("div");c.textContent=(i=n[Number(a.getAttribute("data-math"))])!=null?i:"",(d=a.parentNode)==null||d.replaceChild(c,a)}),typeof window>"u")return;let{renderMathInElement:s}=window;try{s(r,this.options.options||{delimiters:[{left:"$$",right:"$$",display:!1},{left:"$",right:"$",display:!1},{left:"\\(",right:"\\)",display:!1},{left:"\\[",right:"\\]",display:!1}]})}catch(a){console.error(a)}})}};t.\u0275fac=function(n){return new(n||t)},t.\u0275prov=w({token:t,factory:t.\u0275fac});let e=t;return e})(),se={provide:v,multi:!0,useClass:P};function ae(e){return{provide:j,useValue:e}}var V=(()=>{let t=class t{constructor(){this.router=b(ot),this.location=b(tt)}contribute(o){o.addRendererTransformer(n=>(n.link=(r,s,a)=>{let c=new Map;return r.startsWith("#")&&(r=this.location.path()+r),c.set("href",r),(this.router.config||[]).map(d=>{var h;return(h=d.path)!=null&&h.startsWith("/")?d.path:"/"+d.path}).find(d=>r.startsWith(d))||c.set("target","_blank"),`<a ${Array.from(c.entries()).map(d=>d[0]+"="+d[1]).join(" ")}>${a}</a>`},n))}};t.\u0275fac=function(n){return new(n||t)},t.\u0275prov=w({token:t,factory:t.\u0275fac});let e=t;return e})(),pe={provide:v,multi:!0,useClass:V};var Tt=["bash","css","html","javascript","json","markdown","scss","shell","typescript","yaml"];function bt(){return x(this,null,function*(){return import("shiki")})}function vt(){return x(this,arguments,function*(e={}){var n,r;let t=(n=e.themes)!=null?n:{light:"github-light",dark:"github-dark"},l=(r=e.langs)!=null?r:Tt,{codeToHtml:o}=yield bt();yield Promise.all(l.map(s=>o("",{lang:s,themes:t,defaultColor:!1}).catch(()=>{})))})}var gt="nge-markdown-shiki";function wt(e={}){var l;let t=(l=e.themes)!=null?l:{light:"github-light",dark:"github-dark"};return{ssr:!0,highligtht:(o,n)=>x(null,null,function*(){var p,m,g,f,k;let r=n.element,s=(p=r.parentElement)!=null?p:r.parentNode;if(!s)return;let{codeToHtml:a}=yield bt(),c;try{c=yield a((m=r.textContent)!=null?m:"",{lang:n.language||"plaintext",themes:t,defaultColor:!1})}catch(C){return}let i=o.get(N),d=i.createElement("div");d.innerHTML=c;let h=d.querySelector("pre"),u=d.querySelector("pre > code");!h||!u||(s.setAttribute("class",(g=h.getAttribute("class"))!=null?g:"shiki"),s.setAttribute("style",(f=h.getAttribute("style"))!=null?f:""),r.innerHTML=u.innerHTML,Ct(s,r,n.lines,n.highlights),Mt(i,(k=o.get(M,null))==null?void 0:k.darkThemeClassName))})}}function Ct(e,t,l,o){var s,a,c;let n=Array.from(t.querySelectorAll(".line"));for(let i of ft(o!=null?o:"")){let d=n[i-1];d==null||d.setAttribute("class",`${(s=d.getAttribute("class"))!=null?s:""} nge-highlighted`.trim())}let r=ft(l!=null?l:"");if(r.length){if(r.length===1)for(let i=r[0]+1;i<=n.length;i++)r.push(i);e.setAttribute("class",`${(a=e.getAttribute("class"))!=null?a:""} nge-numbered`.trim());for(let i of r)(c=n[i-1])==null||c.setAttribute("data-line",`${i}`)}}function ft(e){let t=[];for(let l of e.split(" ").filter(Boolean)){let o=l.match(/^(\d+)-(\d+)$/);if(o)for(let n=Number(o[1]);n<=Number(o[2]);n++)t.push(n);else/^\d+$/.test(l)&&t.push(Number(l))}return[...new Set(t)]}function Mt(e,t){if(e.getElementById(gt))return;let o=(t?[t].flat():["dark-theme"]).map(r=>`.${r} .shiki, .${r} .shiki span { color: var(--shiki-dark); background-color: var(--shiki-dark-bg); }`).join(`
`),n=e.createElement("style");n.id=gt,n.textContent=[".shiki, .shiki span { color: var(--shiki-light); background-color: var(--shiki-light-bg); }",o,".shiki { padding: 0.75em 1em; border-radius: 6px; overflow: auto; }",".shiki .nge-highlighted { display: inline-block; width: 100%; background-color: color-mix(in srgb, currentColor 12%, transparent); }",".shiki.nge-numbered .line::before { content: attr(data-line); display: inline-block; min-width: 2.5ch; margin-right: 1.25em; text-align: right; opacity: 0.45; }"].join(`
`),e.head.appendChild(n)}var Ot='<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M10.5 13.5H4.5L14 2l-.5 8.5h6L10 22z"/></svg>';function It(e,t){var l,o,n,r;return{project:I(L(I({title:(l=t.title)!=null?l:"Example"},t.description?{description:t.description}:{}),{template:(o=t.template)!=null?o:"node",files:L(I({},(n=t.files)!=null?n:{}),{[t.file]:e})}),t.dependencies?{dependencies:t.dependencies}:{}),openFile:(r=t.openFile)!=null?r:t.file}}function St(e,t){return x(this,null,function*(){let{project:l,openFile:o}=It(e,t);(yield import("@stackblitz/sdk")).default.openProject(l,{openFile:o,newWindow:!0})})}function xt(e){return({pre:t})=>t.getAttribute(G)==="true"?{title:"Open in StackBlitz",icon:Ot,run:l=>St(l,e)}:null}var F=0,U=(()=>{let t=class t{constructor(){this.document=b(N)}contribute(o){this.addStyles(),o.addHtmlTransformer(n=>{let r=/^===\s*(.+)/,s=/^===\s*$/,a=[],c=[];Array.from(n.querySelectorAll("p")).forEach(i=>{var h;if(a.indexOf(i)!==-1)return;let d=i.innerHTML.match(r);if(d){let u=[],p={title:d[1],content:[]},m=i.nextElementSibling;for(;m;){let g=!0,f=m.innerHTML.trim();if(f.match(r))u.push(p),p={title:f.replace("===","").trim(),content:[]},g=!1,c.push(m);else if(f.match(s)){u.push(p),c.push(m);break}g&&p.content.push(m),a.push(m),m=m.nextElementSibling}(h=i.parentElement)==null||h.replaceChild(this.createTabs(u),i),i.remove(),c.forEach(g=>g.remove())}})})}createTabs(o){let n=this.document.createElement("div");n.className="nge-md-tabbed-set";let r=0;return F++,o.forEach(s=>{let a=this.document.createElement("input");a.type="radio",a.id="nge-md-tabbed-"+F+"-"+r,a.name="nge-md-tabbed-"+F,r===0&&a.setAttribute("checked","checked");let c=this.document.createElement("label");c.setAttribute("for",a.id),c.innerHTML=s.title;let i=this.document.createElement("div");i.className="nge-md-tabbed-content",s.content.forEach(d=>i.appendChild(d)),n.appendChild(a),n.appendChild(c),n.appendChild(i),r++}),n}addStyles(){let o=this.document.head;if(o.querySelector("[nge-markdown-tabbed-set]"))return;let n=this.document.createElement("style");n.setAttribute("nge-markdown-tabbed-set",""),n.innerHTML=`
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
        `,o.appendChild(n)}};t.\u0275fac=function(n){return new(n||t)},t.\u0275prov=w({token:t,factory:t.\u0275fac});let e=t;return e})(),Te={provide:v,multi:!0,useClass:U};var Se=(()=>{let t=class t{};t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=Z({type:t}),t.\u0275inj=q({imports:[nt]});let e=t;return e})();function Ue(...e){return X(e.flatMap(t=>t.providers))}function qe(e){return{providers:[typeof e=="function"?{provide:M,useFactory:e}:{provide:M,useValue:e}]}}function Xe(...e){return{providers:e.map(t=>({provide:rt,useValue:t,multi:!0}))}}function Je(e){return{providers:[{provide:it,useValue:e}]}}function Ye(e){return{providers:[A(P),...e?[{provide:j,useValue:e}]:[]]}}function Ze(e){return{providers:[A(_),...e?[{provide:S,useValue:e}]:[]]}}function Qe(){return{providers:[A(z)]}}function to(){return{providers:[A(U)]}}function eo(){return{providers:[A(V)]}}function oo(){return{providers:[A(D)]}}function no(e){return{providers:[A(H),...e?[Ht(e)]:[]]}}function ro(e){return{providers:[A(H),{provide:O,useValue:wt(e)},Q(()=>{if(et(b(Y)))return vt(e)})]}}function io(e){return{providers:[{provide:K,multi:!0,useValue:xt(e)}]}}function A(e){return{provide:v,multi:!0,useClass:e}}function Ht(e){return{provide:O,useValue:W(e)}}export{D as a,Dt as b,S as c,_ as d,Kt as e,Wt as f,G as g,K as h,O as i,H as j,Jt as k,W as l,Yt as m,z as n,ee as o,j as p,P as q,se as r,ae as s,V as t,pe as u,Tt as v,vt as w,wt as x,It as y,St as z,xt as A,U as B,Te as C,Se as D,Ue as E,qe as F,Xe as G,Je as H,Ye as I,Ze as J,Qe as K,to as L,eo as M,oo as N,no as O,ro as P,io as Q};
