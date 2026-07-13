import{a as f,b as C,c as ot,g as rt}from"./chunk-VLGUGQYC.js";import{d as et,k as nt}from"./chunk-EOR6CVI2.js";import{h as Q,s as tt}from"./chunk-7GVUGIVX.js";import{K as w,L as U,N as E,P as g,Q as q,Va as J,Y as Z,Ya as Y,Z as A,ha as X}from"./chunk-Y3QQXCAU.js";import{a as O,b as R,m as k}from"./chunk-FR3PSOBV.js";var _=/^:::(\+?)\s+(\w+)(\s+.+)?/,it=/^:::\s*$/,D=(()=>{let t=class t{constructor(){this.document=g(A)}contribute(n){this.addStyles(),this.autoFixAdmonitionsSyntax(n),this.createAdmonitions(n)}addStyles(){let n=this.document.head;if(n.querySelector("[nge-markdown-admonitions]"))return;let o={note:{bg:"rgba(68, 138, 255, 0.1)",border:"#448aff"},abstract:{bg:"rgba(0, 176, 255, 0.1)",border:"#00b0ff"},info:{bg:"rgba(0, 184, 212, 0.1)",border:"#00b8d4"},tip:{bg:"rgba(0, 191, 165, 0.1)",border:"#00bfa5"},success:{bg:"rgba(0, 200, 83, 0.1)",border:"#00c853"},question:{bg:"rgba(100, 221, 23, 0.1)",border:"#64dd17"},warning:{bg:"rgba(255, 145, 0, 0.1)",border:"#ff9100"},failure:{bg:"rgba(255, 82, 82, 0.1)",border:"#ff5252"},danger:{bg:"rgba(255, 23, 68, 0.1)",border:"#ff1744"},bug:{bg:"rgba(245, 0, 87, 0.1)",border:"#f50057"},example:{bg:"rgba(101, 31, 255, 0.1)",border:"#651fff"},quote:{bg:"rgba(158, 158, 158, 0.1)",border:"#9e9e9e"}},r=[`
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
        `];Object.keys(o).forEach(a=>{let c=o[a];r.push(`
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
`),n.appendChild(s)}createAdmonitions(n){n.addHtmlTransformer(o=>{Array.from(o.querySelectorAll("p")).forEach(s=>{var i;let c=s.innerHTML.match(_);if(c){let d=c[1],h=c[2],p=(c[3]||"").trim(),u=this.document.createElement("details");d.endsWith("+")&&(u.open=!0),u.className="nge-md-admonition nge-md-admonition--"+h;let m=this.document.createElement("summary");m.className="nge-md-admonition-title nge-md-admonition-title--"+h,m.innerHTML=p;let b=[];u.appendChild(m);let v=s.nextElementSibling,x=1;for(;v;){let I=v.innerHTML.trim();if(I.match(_))x++;else if(I.match(it)&&(x--,x===0)){v.remove();break}b.push(v),v=v.nextElementSibling}let y=this.document.createElement("div");y.className="nge-md-admonition-content",b.forEach(I=>y.appendChild(I)),u.appendChild(y),(i=s.parentElement)==null||i.insertBefore(u,s),s.remove()}})})}autoFixAdmonitionsSyntax(n){n.addMarkdownTransformer(o=>{let r=o.split(`
`),s=r.length,a=!1;for(let c=0;c<s;c++){let i=r[c];if(i.startsWith("```")&&(a=!a),a)continue;let d=c>0?r[c-1]:void 0,h=c<s-1?r[c+1]:void 0;i.match(_)?h!=null&&h.trim()&&(r[c]=i+`
`):i.match(it)&&d!=null&&d.trim()&&(r[c]=`
`+i)}return r.join(`
`)})}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=w({token:t,factory:t.\u0275fac});let e=t;return e})(),Lt={provide:f,multi:!0,useClass:D};var S=new E("NGE_MARKDOWN_EMOJI_OPTIONS"),$=(()=>{let t=class t{constructor(){var n;this.options=(n=g(S,{optional:!0}))!=null?n:{url:"https://cdn.jsdelivr.net/npm/emoji-toolkit@8.0.0/lib/js/joypixels.min.js"}}dependencies(){let n=[];return typeof window<"u"&&!("joypixels"in window)&&n.push(["script",this.options.url]),n}contribute(n){n.addMarkdownTransformer(o=>{if(typeof window>"u"||!("joypixels"in window))return o;let{joypixels:r}=window,s=o.split(`
`),a=s.length,c=!1;for(let i=0;i<a;i++)s[i].startsWith("```")&&(c=!c),!c&&s[i].match(/:[a-z0-9_+-]+:/g)&&(s[i]=r.shortnameToUnicode(s[i]));return s.join(`
`)})}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=w({token:t,factory:t.\u0275fac});let e=t;return e})(),Bt={provide:f,multi:!0,useClass:$};function Gt(e){return{provide:S,useValue:e}}var st="nge-markdown-code-chrome",at='<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',ct='<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',xt='<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg>';function lt(e,t){var c,i,d,h,p;let{pre:l}=t,n=l.parentNode;if(!n||(i=(c=n.getAttribute)==null?void 0:c.call(n,"class"))!=null&&i.includes("nge-code-block"))return;let o=e.createElement("div");o.setAttribute("class","nge-code-block");let r=e.createElement("div");r.setAttribute("class","nge-code-toolbar");let s=e.createElement("span");s.setAttribute("class","nge-code-toolbar-label"),s.textContent=(h=(d=t.filename)!=null?d:t.language)!=null?h:"",r.appendChild(s);let a=e.createElement("div");a.setAttribute("class","nge-code-toolbar-actions");for(let u of(p=t.actions)!=null?p:[])a.appendChild(kt(e,t.code,u));a.appendChild(Et(e,t)),a.appendChild(At(e,t)),r.appendChild(a),n.insertBefore(o,l),o.appendChild(r),o.appendChild(l),Nt(e)}function kt(e,t,l){let n=B(e,l.title,l.icon);return n.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation(),l.run(t)}),n}function Et(e,t){let l=B(e,"Copy code to clipboard",at);return l.addEventListener("click",n=>k(null,null,function*(){n.preventDefault(),n.stopPropagation();try{yield navigator.clipboard.writeText(t.code),dt(l,at)}catch(o){}})),l}function At(e,t){let l=B(e,"Download code as file",ct);return l.addEventListener("click",n=>{n.preventDefault(),n.stopPropagation();let o=URL.createObjectURL(new Blob([t.code],{type:"text/plain"})),r=e.createElement("a");r.href=o,r.download=t.filename||`code.${t.language||"txt"}`,r.click(),URL.revokeObjectURL(o),dt(l,ct)}),l}function B(e,t,l){let n=e.createElement("button");return n.setAttribute("type","button"),n.setAttribute("class","nge-code-action"),n.setAttribute("title",t),n.setAttribute("aria-label",t),n.innerHTML=l,n}function dt(e,t){e.innerHTML=xt,e.setAttribute("class","nge-code-action nge-code-action-done"),setTimeout(()=>{e.innerHTML=t,e.setAttribute("class","nge-code-action")},2e3)}function Nt(e){if(e.getElementById(st))return;let t=e.createElement("style");t.id=st,t.textContent=[".nge-code-block { border: 1px solid color-mix(in srgb, currentColor 14%, transparent); border-radius: 8px; overflow: hidden; margin: 1em 0; }",".nge-code-block > pre { margin: 0; border-radius: 0; }",".nge-code-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 0.5em; padding: 0.35em 0.5em 0.35em 1em; font-size: 0.8em; background-color: color-mix(in srgb, currentColor 5%, transparent); border-bottom: 1px solid color-mix(in srgb, currentColor 10%, transparent); }",".nge-code-toolbar-label { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; opacity: 0.75; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }",".nge-code-toolbar-actions { display: flex; gap: 0.25em; }",".nge-code-action { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; padding: 0; border: none; border-radius: 6px; background: transparent; color: inherit; opacity: 0.65; cursor: pointer; transition: opacity 0.2s, background-color 0.2s; }",".nge-code-action:hover { opacity: 1; background-color: color-mix(in srgb, currentColor 10%, transparent); }",".nge-code-action-done { color: #22c55e; opacity: 1; }"].join(`
`),e.head.appendChild(t)}function Tt(e,t){var l,n,o,r;return{project:O(R(O({title:(l=t.title)!=null?l:"Example"},t.description?{description:t.description}:{}),{template:(n=t.template)!=null?n:"node",files:R(O({},(o=t.files)!=null?o:{}),{[t.file]:e})}),t.dependencies?{dependencies:t.dependencies}:{}),openFile:(r=t.openFile)!=null?r:t.file}}function mt(e,t){return k(this,null,function*(){let{project:l,openFile:n}=Tt(e,t);(yield import("./chunk-CNT3SZ3N.js")).default.openProject(l,{openFile:n,newWindow:!0})})}var H=new E("NGE_MARKDOWN_STACKBLITZ");var ht="data-nge-md-hl-lines",G="data-nge-md-hl-language",pt="data-nge-md-hl-highlights",ut="data-nge-md-hl-filename",gt="data-nge-md-hl-stackblitz",yt='<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M10.5 13.5H4.5L14 2l-.5 8.5h6L10 22z"/></svg>',M=new E("NGE_MARKDOWN_HIGHLIGHTER_SERVICE"),j=(()=>{let t=class t{constructor(){this.injector=g(Z),this.options=g(M,{optional:!0})}contribute(n){this.createAttributes(n),this.colorizeCodes(n)}createAttributes(n){n.addRendererTransformer(o=>(o.code=(r,s)=>{s=s||"";let a=new Map,c=s.split(" ").slice(0,1).pop()||"plaintext";a.set(G,c);let i=s.match(/lines="(.+?)"/);return i&&a.set(ht,i[1]),i=s.match(/highlights="(.+?)"/),i&&a.set(pt,i[1]),i=s.match(/filename="(.+?)"/),i&&a.set(ut,i[1]),/(^|\s)stackblitz(\s|$)/.test(s)&&a.set(gt,"true"),`<pre ${Array.from(a.entries()).map(([h,p])=>`${h}="${p}"`).join(" ")}><code>${this.escapeHtml(r)}</code></pre>`},o))}colorizeCodes(n){var s;if(!((s=this.options)!=null&&s.highligtht))return;let o=this.options.highligtht,r=this.injector.get(H,null);n.addHtmlTransformer(a=>k(this,null,function*(){var d,h;if(typeof document>"u"&&!((d=this.options)!=null&&d.ssr))return;let c=this.injector.get(A),i=Array.from(a.querySelectorAll(`pre[${G}]`));for(let p of i){let u=p.querySelector("code"),m=p.getAttribute(G)||"plaintext",b=p.getAttribute(ut)||void 0,v=(h=u==null?void 0:u.textContent)!=null?h:"";yield o(this.injector,{lines:p.getAttribute(ht)||"",element:u,language:m,highlights:p.getAttribute(pt)||"",filename:b||""});let x=[];r&&p.getAttribute(gt)==="true"&&x.push({title:"Open in StackBlitz",icon:yt,run:y=>mt(y,r)}),lt(c,{pre:p,code:v,filename:b,language:m,actions:x})}}))}escapeHtml(n){let o={"<":"&lt;",">":"&gt;"};return n.replace(/[<>]/g,r=>o[r]||r)}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=w({token:t,factory:t.\u0275fac});let e=t;return e})(),Yt={provide:f,multi:!0,useClass:j};function K(e){return{highligtht:(t,l)=>{let n=t.get(e,null),o=l.element,r=o.parentElement;r.style.overflow="auto",n==null||n.colorizeElement({element:o,language:l.language,code:o.textContent,lines:l.lines,filename:l.filename,highlights:l.highlights,fileTab:!1})}}}function Qt(e){return{provide:M,useValue:K(e)}}var W=(()=>{let t=class t{contribute(n){n.addMarkdownTransformer(o=>{let r=/@(\w+)\s+([\w-]+)((\s+(?:color|size)=[^\s]+)*?)?@/gm,s=o.split(`
`),a=s.length,c=!1;for(let i=0;i<a;i++)s[i].startsWith("```")&&(c=!c),!c&&(s[i]=s[i].replace(r,(h,p,u,m)=>(m=(m!=null?m:"").trim().split(" ").filter(b=>b.trim()).join("&"),m=m?"?"+m:"",`<img src="https://icongr.am/${p.trim()}/${u.trim()}.svg${m}"/>`)));return s.join(`
`)})}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=w({token:t,factory:t.\u0275fac});let e=t;return e})(),oe={provide:f,multi:!0,useClass:W};var L=new E("NGE_MARKDOWN_KATEX_OPTIONS"),V=(()=>{let t=class t{constructor(){var n,o,r;this.options=(n=g(L,{optional:!0}))!=null?n:{},this.options.extensions=this.options.extensions||{},this.options.extensions.mhchem=(o=this.options.extensions.mhchem)!=null?o:!0,this.options.extensions.copyTex=(r=this.options.extensions.copyTex)!=null?r:!0}dependencies(){var r,s,a;if(typeof window>"u"||"katex"in window)return[];let n=((r=this.options)==null?void 0:r.baseUrl)||"https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/";n.endsWith("/")||(n+="/");let o=[["style",`${n}katex.min.css`],["script",`${n}katex.js`],["script",`${n}contrib/auto-render.js`]];return(s=this.options.extensions)!=null&&s.copyTex&&o.push(["script",`${n}contrib/copy-tex.min.js`]),(a=this.options.extensions)!=null&&a.mhchem&&o.push(["script",`${n}contrib/mhchem.js`]),o}contribute(n){let o=[];n.addMarkdownTransformer(r=>r.replace(/(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`\n]*`)|(\$\$[\s\S]+?\$\$|\\\[[\s\S]+?\\\])/g,(s,a,c)=>a!=null?a:`

<div class="nge-markdown-math" data-math="${o.push(c)-1}"></div>

`)),n.addHtmlTransformer(r=>{if(Array.from(r.querySelectorAll(".nge-markdown-math")).forEach(a=>{var i,d;let c=r.ownerDocument.createElement("div");c.textContent=(i=o[Number(a.getAttribute("data-math"))])!=null?i:"",(d=a.parentNode)==null||d.replaceChild(c,a)}),typeof window>"u")return;let{renderMathInElement:s}=window;try{s(r,this.options.options||{delimiters:[{left:"$$",right:"$$",display:!1},{left:"$",right:"$",display:!1},{left:"\\(",right:"\\)",display:!1},{left:"\\[",right:"\\]",display:!1}]})}catch(a){console.error(a)}})}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=w({token:t,factory:t.\u0275fac});let e=t;return e})(),ce={provide:f,multi:!0,useClass:V};function le(e){return{provide:L,useValue:e}}var z=(()=>{let t=class t{constructor(){this.router=g(et),this.location=g(Q)}contribute(n){n.addRendererTransformer(o=>(o.link=(r,s,a)=>{let c=new Map;return r.startsWith("#")&&(r=this.location.path()+r),c.set("href",r),(this.router.config||[]).map(d=>{var h;return(h=d.path)!=null&&h.startsWith("/")?d.path:"/"+d.path}).find(d=>r.startsWith(d))||c.set("target","_blank"),`<a ${Array.from(c.entries()).map(d=>d[0]+"="+d[1]).join(" ")}>${a}</a>`},o))}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=w({token:t,factory:t.\u0275fac});let e=t;return e})(),fe={provide:f,multi:!0,useClass:z};var Ct=["bash","css","html","javascript","json","markdown","scss","shell","typescript","yaml"];function vt(){return k(this,arguments,function*(e={}){var o,r;let t=(o=e.themes)!=null?o:{light:"github-light",dark:"github-dark"},l=(r=e.langs)!=null?r:Ct,{codeToHtml:n}=yield import("./chunk-AP3WE6PN.js");yield Promise.all(l.map(s=>n("",{lang:s,themes:t,defaultColor:!1}).catch(()=>{})))})}var ft="nge-markdown-shiki";function wt(e={}){var l;let t=(l=e.themes)!=null?l:{light:"github-light",dark:"github-dark"};return{ssr:!0,highligtht:(n,o)=>k(null,null,function*(){var u,m,b,v,x;let r=o.element,s=(u=r.parentElement)!=null?u:r.parentNode;if(!s)return;let{codeToHtml:a}=yield import("./chunk-AP3WE6PN.js"),c;try{c=yield a((m=r.textContent)!=null?m:"",{lang:o.language||"plaintext",themes:t,defaultColor:!1})}catch(y){return}let i=n.get(A),d=i.createElement("div");d.innerHTML=c;let h=d.querySelector("pre"),p=d.querySelector("pre > code");!h||!p||(s.setAttribute("class",(b=h.getAttribute("class"))!=null?b:"shiki"),s.setAttribute("style",(v=h.getAttribute("style"))!=null?v:""),r.innerHTML=p.innerHTML,Mt(s,r,o.lines,o.highlights),It(i,(x=n.get(C,null))==null?void 0:x.darkThemeClassName))})}}function Mt(e,t,l,n){var s,a,c;let o=Array.from(t.querySelectorAll(".line"));for(let i of bt(n!=null?n:"")){let d=o[i-1];d==null||d.setAttribute("class",`${(s=d.getAttribute("class"))!=null?s:""} nge-highlighted`.trim())}let r=bt(l!=null?l:"");if(r.length){if(r.length===1)for(let i=r[0]+1;i<=o.length;i++)r.push(i);e.setAttribute("class",`${(a=e.getAttribute("class"))!=null?a:""} nge-numbered`.trim());for(let i of r)(c=o[i-1])==null||c.setAttribute("data-line",`${i}`)}}function bt(e){let t=[];for(let l of e.split(" ").filter(Boolean)){let n=l.match(/^(\d+)-(\d+)$/);if(n)for(let o=Number(n[1]);o<=Number(n[2]);o++)t.push(o);else/^\d+$/.test(l)&&t.push(Number(l))}return[...new Set(t)]}function It(e,t){if(e.getElementById(ft))return;let n=(t?[t].flat():["dark-theme"]).map(r=>`.${r} .shiki, .${r} .shiki span { color: var(--shiki-dark); background-color: var(--shiki-dark-bg); }`).join(`
`),o=e.createElement("style");o.id=ft,o.textContent=[".shiki, .shiki span { color: var(--shiki-light); background-color: var(--shiki-light-bg); }",n,".shiki { padding: 0.75em 1em; border-radius: 6px; overflow: auto; }",".shiki .nge-highlighted { display: inline-block; width: 100%; background-color: color-mix(in srgb, currentColor 12%, transparent); }",".shiki.nge-numbered .line::before { content: attr(data-line); display: inline-block; min-width: 2.5ch; margin-right: 1.25em; text-align: right; opacity: 0.45; }"].join(`
`),e.head.appendChild(o)}var P=0,F=(()=>{let t=class t{constructor(){this.document=g(A)}contribute(n){this.addStyles(),n.addHtmlTransformer(o=>{let r=/^===\s*(.+)/,s=/^===\s*$/,a=[],c=[];Array.from(o.querySelectorAll("p")).forEach(i=>{var h;if(a.indexOf(i)!==-1)return;let d=i.innerHTML.match(r);if(d){let p=[],u={title:d[1],content:[]},m=i.nextElementSibling;for(;m;){let b=!0,v=m.innerHTML.trim();if(v.match(r))p.push(u),u={title:v.replace("===","").trim(),content:[]},b=!1,c.push(m);else if(v.match(s)){p.push(u),c.push(m);break}b&&u.content.push(m),a.push(m),m=m.nextElementSibling}(h=i.parentElement)==null||h.replaceChild(this.createTabs(p),i),i.remove(),c.forEach(b=>b.remove())}})})}createTabs(n){let o=this.document.createElement("div");o.className="nge-md-tabbed-set";let r=0;return P++,n.forEach(s=>{let a=this.document.createElement("input");a.type="radio",a.id="nge-md-tabbed-"+P+"-"+r,a.name="nge-md-tabbed-"+P,r===0&&a.setAttribute("checked","checked");let c=this.document.createElement("label");c.setAttribute("for",a.id),c.innerHTML=s.title;let i=this.document.createElement("div");i.className="nge-md-tabbed-content",s.content.forEach(d=>i.appendChild(d)),o.appendChild(a),o.appendChild(c),o.appendChild(i),r++}),o}addStyles(){let n=this.document.head;if(n.querySelector("[nge-markdown-tabbed-set]"))return;let o=this.document.createElement("style");o.setAttribute("nge-markdown-tabbed-set",""),o.innerHTML=`
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
        `,n.appendChild(o)}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=w({token:t,factory:t.\u0275fac});let e=t;return e})(),Te={provide:f,multi:!0,useClass:F};var Oe=(()=>{let t=class t{};t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=J({type:t}),t.\u0275inj=U({imports:[nt]});let e=t;return e})();function Fe(...e){return q(e.flatMap(t=>t.providers))}function Ue(e){return{providers:[typeof e=="function"?{provide:C,useFactory:e}:{provide:C,useValue:e}]}}function qe(...e){return{providers:e.map(t=>({provide:ot,useValue:t,multi:!0}))}}function Ze(e){return{providers:[{provide:rt,useValue:e}]}}function Xe(e){return{providers:[N(V),...e?[{provide:L,useValue:e}]:[]]}}function Je(e){return{providers:[N($),...e?[{provide:S,useValue:e}]:[]]}}function Ye(){return{providers:[N(W)]}}function Qe(){return{providers:[N(F)]}}function tn(){return{providers:[N(z)]}}function en(){return{providers:[N(D)]}}function nn(e){return{providers:[N(j),...e?[Ot(e)]:[]]}}function on(e){return{providers:[N(j),{provide:M,useValue:wt(e)},Y(()=>{if(tt(g(X)))return vt(e)})]}}function rn(e){return{providers:[{provide:H,useValue:e}]}}function N(e){return{provide:f,multi:!0,useClass:e}}function Ot(e){return{provide:M,useValue:K(e)}}export{D as a,Lt as b,S as c,$ as d,Bt as e,Gt as f,Tt as g,mt as h,H as i,M as j,j as k,Yt as l,K as m,Qt as n,W as o,oe as p,L as q,V as r,ce as s,le as t,z as u,fe as v,Ct as w,vt as x,wt as y,F as z,Te as A,Oe as B,Fe as C,Ue as D,qe as E,Ze as F,Xe as G,Je as H,Ye as I,Qe as J,tn as K,en as L,nn as M,on as N,rn as O};
