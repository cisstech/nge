import{Aa as C,Ga as j,Hb as le,I as A,Ia as re,J as oe,Ja as se,K as S,L as _,La as N,M as V,Ma as u,N as T,Na as E,O as ne,Q as ie,Ra as K,X as D,a as R,da as M,db as ce,fa as x,g as h,j as Y,k as G,n as Z,nb as k,o as J,p as ee,q as te,qb as ae,ra as w,sb as de,ta as F,ya as W,za as z}from"./chunk-4STL355D.js";var O=new S("NGE_MONACO_CONFIG");var v=new S("NGE_MONACO_CONTRIBUTION");var pe="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.43.0";var g=window,y=(()=>{let n=class n{constructor(e,t,o){this.config=e,this.contributions=t,this.resourceLoader=o,this.monaco$=new Y,this.baseUrl=pe,this.contributions=t||[]}ngOnDestroy(){return h(this,null,function*(){yield this.deactivateContributions()})}onLoadMonaco(e){return typeof g.monaco>"u"?this.monaco$.asObservable().subscribe(e):Z(g.monaco).subscribe(e)}loadAsync(){var e;return(e=this.loadPromise)!=null?e:this.loadPromise=new Promise(t=>h(this,null,function*(){let o=setInterval(()=>{document.readyState==="complete"&&(clearInterval(o),setTimeout(()=>h(this,null,function*(){var i;yield this.resourceLoader.waitForPendings(),this.baseUrl=((i=this.config)==null?void 0:i.assets)||pe,this.baseUrl.endsWith("/")&&(this.baseUrl=this.baseUrl.slice(0,this.baseUrl.length-1)),this.addWorkersIfCrossDomain(),g.require?this.onLoad(t):J(this.resourceLoader.loadAllAsync([["script",`${this.baseUrl}/min/vs/loader.js`]])).then(()=>this.onLoad(t))}),300))})}))}onLoad(e){var o;g.require.config({paths:{vs:this.baseUrl+"/min/vs"}});let t=((o=this.config)==null?void 0:o.locale)||"";t!=="en"&&g.require.config({"vs/nls":{availableLanguages:{"*":t}}}),g.require(["vs/editor/editor.main"],()=>h(this,null,function*(){yield this.activateContributions(),this.monaco$.next(monaco),e(monaco)}))}addWorkersIfCrossDomain(){if(this.baseUrl.startsWith("http")){let e=URL.createObjectURL(new Blob([`
                self.MonacoEnvironment = { baseUrl: '${this.baseUrl}/min' };
                importScripts('${this.baseUrl}/min/vs/base/worker/workerMain.js');
            `],{type:"text/javascript"}));g.MonacoEnvironment={baseUrl:this.baseUrl+"/min",getWorkerUrl:()=>e,globalAPI:!0}}}activateContributions(){return h(this,null,function*(){yield Promise.all(this.contributions.map(e=>e.activate()))})}deactivateContributions(){return h(this,null,function*(){yield Promise.all(this.contributions.map(e=>e.deactivate?e.deactivate():Promise.resolve()))})}};n.\u0275fac=function(t){return new(t||n)(_(O,8),_(v,8),_(le))},n.\u0275prov=A({token:n,factory:n.\u0275fac,providedIn:"root"});let c=n;return c})();var _e=["container"],Ue=(()=>{let n=class n{constructor(e,t){this.loader=e,this.config=t,this.ready=new D,this.autoLayout=!0,this.width=0,this.height=0}onResizeWindow(){var e;(e=this.editor)==null||e.layout()}ngAfterViewInit(){this.loader.loadAsync().then(()=>{this.createEditor()})}ngAfterViewChecked(){var o;if(!this.autoLayout)return;let{offsetWidth:e,offsetHeight:t}=this.container.nativeElement;(e!==this.width||t!==this.height)&&(this.width=e,this.height=t,(o=this.editor)==null||o.layout())}ngOnDestroy(){var e;(e=this.editor)==null||e.dispose()}createEditor(){this.editor=monaco.editor.createDiffEditor(this.container.nativeElement,R(R({},this.config.options||{}),this.options||{})),this.ready.emit(this.editor)}};n.\u0275fac=function(t){return new(t||n)(x(y),x(O,8))},n.\u0275cmp=T({type:n,selectors:[["nge-monaco-diff-editor"]],viewQuery:function(t,o){if(t&1&&N(_e,7),t&2){let i;u(i=E())&&(o.container=i.first)}},hostBindings:function(t,o){t&1&&j("resize",function(){return o.onResizeWindow()},!1,M)},inputs:{autoLayout:"autoLayout",options:"options"},outputs:{ready:"ready"},decls:2,vars:0,consts:[["container",""],[1,"nge-monaco-diff-editor-container"]],template:function(t,o){t&1&&C(0,"div",1,0)},styles:["[_nghost-%COMP%]{display:block;height:var(--editor-height, 100%);border:1px solid #F5F5F5;box-sizing:border-box}.nge-monaco-diff-editor-container[_ngcontent-%COMP%]{width:100%;height:100%}"]});let c=n;return c})();var H=(()=>{let n=class n{};n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=T({type:n,selectors:[["nge-monaco-placeholder"]],decls:0,vars:0,template:function(t,o){},styles:["[_nghost-%COMP%]{display:block;height:100%;width:100%;background:linear-gradient(90deg,#f0f0f0 25%,#e0e0e0,#f0f0f0 75%);background-size:200% 100%;animation:_ngcontent-%COMP%_shimmer 1.5s infinite}@keyframes _ngcontent-%COMP%_shimmer{0%{background-position:-200% 0}to{background-position:200% 0}}"],changeDetection:0});let c=n;return c})();var Te=["container"];function Ce(c,n){c&1&&C(0,"nge-monaco-placeholder")}var et=(()=>{let n=class n{constructor(e,t){this.loader=e,this.config=t,this.loading=!0,this.ready=new D,this.autoLayout=!0,this.width=0,this.height=0}ngAfterViewInit(){this.loader.loadAsync().then(()=>{this.createEditor()})}ngAfterViewChecked(){var o;if(!this.autoLayout)return;let{offsetWidth:e,offsetHeight:t}=this.container.nativeElement;(e!==this.width||t!==this.height)&&(this.width=e,this.height=t,(o=this.editor)==null||o.layout())}ngOnDestroy(){var e;(e=this.editor)==null||e.dispose()}onResizeWindow(){var e;(e=this.editor)==null||e.layout()}createEditor(){this.editor=monaco.editor.create(this.container.nativeElement,R(R({},this.config.options||{}),this.options||{})),this.loading=!1,this.ready.emit(this.editor)}};n.\u0275fac=function(t){return new(t||n)(x(y),x(O,8))},n.\u0275cmp=T({type:n,selectors:[["nge-monaco-editor"]],viewQuery:function(t,o){if(t&1&&N(Te,7),t&2){let i;u(i=E())&&(o.container=i.first)}},hostBindings:function(t,o){t&1&&j("resize",function(){return o.onResizeWindow()},!1,M)},inputs:{autoLayout:"autoLayout",options:"options"},outputs:{ready:"ready"},decls:3,vars:1,consts:[["container",""],[4,"ngIf"],[1,"nge-monaco-editor-container"]],template:function(t,o){t&1&&(w(0,Ce,1,0,"nge-monaco-placeholder",1),C(1,"div",2,0)),t&2&&F("ngIf",o.loading)},dependencies:[k,H],styles:["[_nghost-%COMP%]{display:block;height:var(--editor-height, 100%);border:1px solid #f5f5f5;box-sizing:border-box}.nge-monaco-editor-container[_ngcontent-%COMP%]{width:100%;height:100%}"],changeDetection:0});let c=n;return c})();var P=(()=>{let n=class n{constructor(e,t){this.http=e,this.config=t,this.themes=new G([]),this.activeTheme=new G(void 0)}get theme(){return this.activeTheme.value}get themeChanges(){return this.activeTheme.asObservable()}get themesChanges(){return this.themes.asObservable().pipe(te(e=>e.slice()))}activate(){return h(this,null,function*(){var o,i;let e=document.createElement("div"),t=monaco.editor.create(e);this.themeService=t._themeService,setTimeout(()=>t.dispose()),this.retrieveThemes(),yield this.setTheme(((i=(o=this.config)==null?void 0:o.theming)==null?void 0:i.default)||"vs"),e.remove()})}setTheme(e){return h(this,null,function*(){yield this.defineTheme(e),monaco.editor.setTheme(e),this.activeTheme.next(this.themeService.getColorTheme())})}getTheme(e){return h(this,null,function*(){return yield this.defineTheme(e),this.themeService._knownThemes.get(e)})}defineTheme(e){return h(this,null,function*(){var i,s,r;if(!e)throw new ReferenceError('Argument "themeName" is required');if(this.themeService._knownThemes.has(e))return;let o=(r=(s=(i=this.config)==null?void 0:i.theming)==null?void 0:s.themes)==null?void 0:r.find(a=>this.themeNameFromPath(a)===e);if(!o)throw new Error(`[nge-monaco] Missing theme "${e}"`);if(!this.http)throw new Error("[nge-monaco] Missing HttpClientModule in AppModule. See README for more information");try{let a=yield ee(this.http.get(o));monaco.editor.defineTheme(e,{base:a.base,inherit:a.inherit,rules:a.rules,colors:a.colors})}catch(a){console.error("[nge-monaco] Failed to load theme "+o,a)}})}retrieveThemes(){var o,i;let e=[];this.themeService._knownThemes.forEach(s=>{e.push(s.themeName)});let t=(((i=(o=this.config)==null?void 0:o.theming)==null?void 0:i.themes)||[]).map(this.themeNameFromPath.bind(this));this.themes.next(e.concat(t))}themeNameFromPath(e){let t=e.split("/").pop();if(!t)throw new Error(`[nge-monaco]: invalid theme path "${e}"`);return t.replace(".json","")}decorateCreateEditorAPI(){let e=monaco.editor.create;monaco.editor.create=(t,o,i)=>{let s=e.call(monaco.editor,t,o,i),r=s.updateOptions;return s.updateOptions=a=>{r.call(s,a),a.theme&&this.setTheme(a.theme).catch(console.error)},o!=null&&o.theme&&this.setTheme(o.theme).catch(console.error),s}}};n.\u0275fac=function(t){return new(t||n)(_(de,8),_(O,8))},n.\u0275prov=A({token:n,factory:n.\u0275fac,providedIn:"root"});let c=n;return c})(),ct=["active4d.json","all-hallows-eve.json","amy.json","birds-of-paradise.json","blackboard.json","brilliance-black.json","brilliance-dull.json","chrome-devtools.json","clouds-midnight.json","clouds.json","cobalt.json","dawn.json","dreamweaver.json","eiffel.json","espresso-libre.json","github.json","idle-fingers.json","idle.json","iplastic.json","katzenmilch.json","kuroir-theme.json","kr-theme.json","lazy.json","magicwb-amiga.json","merbivore-soft.json","merbivore.json","monokai-bright.json","monokai.json","monoindustrial.json","night-owl.json","nord.json","oceanic-next.json","one-dark-pro.json","pastels-on-dark.json","slush-and-poppies.json","solarized-dark.json","solarized-light.json","space-cadet.json","sunburst.json","textmate.json","tomorrow-night-blue.json","tomorrow-night-bright.json","tomorrow-night-eighties.json","tomorrow-night.json","tomorrow.json","twilight.json","upstream-sunburst.json","vibrant-ink.json","xcode.json","zenburnesque.json"];var me=(()=>{let n=class n{constructor(e,t){this.loader=e,this.theming=t}colorizeElement(e){return h(this,null,function*(){var r,a;yield this.loader.loadAsync(),e.theme&&(yield this.theming.defineTheme(e.theme));let{element:t}=e;t.innerHTML=this.escapeHtml(e.code||""),t.style.padding="4px",t.style.display="block";let o=t.parentElement;(o==null?void 0:o.tagName)==="PRE"&&(o.classList.contains("monaco-editor")||o.classList.add("monaco-editor"),o.classList.contains("monaco-editor-background")||o.classList.add("monaco-editor-background")),t.className="";let s=(r=monaco.languages.getLanguages().find(p=>{var l;return p.id===e.language||((l=p.aliases)==null?void 0:l.find(d=>d===e.language))}))==null?void 0:r.id;yield monaco.editor.colorizeElement(t,{mimeType:s||"plaintext",theme:e.theme||((a=this.theming.theme)==null?void 0:a.themeName)||"vs"}),this.highlightLines(e),this.showLineNumbers(e),this.addFileTab(e)})}escapeHtml(e){let t={"<":"&lt;",">":"&gt;"};return e.replace(/[<>]/g,o=>t[o]||o)}highlightLines(e){if(!e.highlights)return;let{element:t}=e,o=this.lineNumbersFromString(e.highlights.toString()),i=!0,s=1;t.childNodes.forEach(r=>{let a=r;if(i){let p=document.createElement("div");p.style.height="18px",o.includes(s)&&(p.classList.add("rangeHighlight"),p.classList.add("selected-text")),t.insertBefore(p,a),t.removeChild(a),p.appendChild(a),i=!1}else a.tagName==="BR"&&(s++,i=!0)}),Array.from(t.getElementsByTagName("br")).forEach(r=>r.remove())}showLineNumbers(e){if(!e.lines)return;let{element:t}=e,o=this.lineNumbersFromString(e.lines.toString()),i=(e.code||"").split(`
`).length;if(o.length===1)for(let r=o[0]+1;r<=i;r++)o.push(r);let s=['<div style="padding:0  12px; text-align: right;">'];for(let r=0;r<i;r++){let a="";o.includes(r+1)&&(a=""+(r+1)),s.push(`<div class="line-numbers" style="height: 18px">${a}</div>`)}s.push("</div>"),t.style.display="flex",t.innerHTML=`
            ${s.join("")}
            <div style="flex: 1;">${t.innerHTML}</div>
        `}lineNumbersFromString(e){let t=(e||"").trim().split(" "),o=[];for(let i of t)if(i.includes("-")){let s=i.split("-"),r=Number.parseInt(s[0],10),a=Number.parseInt(s[1],10);if(r&&a)for(let p=r;p<=a;p++)o.includes(p)||o.push(p)}else{let s=Number.parseInt(i,10);s&&o.push(s)}return o}addFileTab(e){let{element:t,code:o,filename:i}=e,s=t.parentElement;s&&(s.style.padding="0",s.style.margin="0",s.style.width="100%");let r=document.createElement("div");r.style.display="flex",r.style.justifyContent="space-between",r.style.alignItems="center",r.style.padding="8px 16px",r.style.borderBottom="1px solid var(--vscode-dropdown-border, #e8e8e8)",r.style.backgroundColor="var(--vscode-editor-background, #fafafa)",r.style.fontSize="14px",r.style.width="100%",r.style.boxSizing="border-box",r.style.fontFamily='var(--monaco-monospace-font, "SF Mono", Monaco, Menlo, Consolas, "Ubuntu Mono", monospace)';let a=document.createElement("span");a.textContent=i||"",a.style.overflow="hidden",a.style.textOverflow="ellipsis",a.style.whiteSpace="nowrap",a.style.fontWeight="500",a.style.color="var(--vscode-editor-foreground, rgba(0, 0, 0, 0.85))",a.title=i||"";let p=document.createElement("div");p.className="file-actions",p.style.display="flex",p.style.gap="4px";let l=document.createElement("button");l.style.border="none",l.style.background="none",l.style.cursor="pointer",l.style.color="var(--vscode-editor-foreground, rgba(0, 0, 0, 0.85))",l.style.display="flex",l.style.alignItems="center",l.style.justifyContent="center",l.style.width="32px",l.style.height="32px",l.style.padding="0",l.style.borderRadius="4px",l.style.transition="all 0.3s",l.title="Copy code to clipboard",l.addEventListener("mouseover",()=>{l.style.color="#1890ff",l.style.backgroundColor="rgba(0, 0, 0, 0.04)"}),l.addEventListener("mouseout",()=>{l.style.color="var(--vscode-editor-foreground, rgba(0, 0, 0, 0.85))",l.style.backgroundColor="transparent"}),l.addEventListener("click",m=>h(this,null,function*(){m.preventDefault(),m.stopPropagation();try{yield navigator.clipboard.writeText(o||""),l.innerHTML='<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg>',l.style.color="#52c41a",setTimeout(()=>{requestAnimationFrame(()=>{l.innerHTML=q,l.style.color="var(--vscode-editor-foreground, rgba(0, 0, 0, 0.85))"})},2e3)}catch(L){console.error("Failed to copy code:",L)}return!1}));let d=document.createElement("button");d.style.border="none",d.style.background="none",d.style.cursor="pointer",d.style.color="var(--vscode-editor-foreground, rgba(0, 0, 0, 0.85))",d.style.display="flex",d.style.alignItems="center",d.style.justifyContent="center",d.style.width="32px",d.style.height="32px",d.style.padding="0",d.style.borderRadius="4px",d.style.transition="all 0.3s",d.title="Download code as file",d.addEventListener("mouseover",()=>{d.style.color="#1890ff",d.style.backgroundColor="rgba(0, 0, 0, 0.04)"}),d.addEventListener("mouseout",()=>{d.style.color="var(--vscode-editor-foreground, rgba(0, 0, 0, 0.85))",d.style.backgroundColor="transparent"}),d.addEventListener("click",m=>{m.preventDefault(),m.stopPropagation();let L=d.innerHTML;try{let U=new Blob([o||""],{type:"text/plain"}),$=URL.createObjectURL(U),f=document.createElement("a");f.href=$,f.download=i||"code.txt",f.style.display="none",f.setAttribute("data-no-scroll","true"),document.body.appendChild(f),f.click(),document.body.removeChild(f),d.innerHTML='<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg>',d.style.color="#52c41a",setTimeout(()=>{requestAnimationFrame(()=>{d.innerHTML=X,d.style.color="var(--vscode-editor-foreground, rgba(0, 0, 0, 0.85))",URL.revokeObjectURL($)})},2e3)}catch(U){console.error("Failed to download code:",U),d.innerHTML=L}return!1});let q='<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',X='<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>';if(l.innerHTML=q,d.innerHTML=X,p.appendChild(l),p.appendChild(d),r.appendChild(a),r.appendChild(p),s)s.insertBefore(r,t),s.style.border="1px solid #e8e8e8",s.style.borderRadius="2px",s.style.overflow="hidden",s.style.marginBottom="16px",s.style.padding="0",t.style.padding="16px";else{let m=document.createElement("div");m.style.border="1px solid #e8e8e8",m.style.borderRadius="2px",m.style.overflow="hidden",m.style.marginBottom="16px",m.style.padding="0",m.style.width="100%";let L=t.parentElement;L&&(L.insertBefore(m,t),m.appendChild(r),m.appendChild(t),t.style.padding="16px")}}};n.\u0275fac=function(t){return new(t||n)(_(y),_(P))},n.\u0275prov=A({token:n,factory:n.\u0275fac,providedIn:"root"});let c=n;return c})();var Ne=["container"],ue=["transclusion"],Ee=["*"];function ge(c,n){c&1&&C(0,"nge-monaco-placeholder")}var Ct=(()=>{let n=class n{constructor(){this.colorizer=V(me),this.changeDetectorRef=V(ce),this.subscriptions=[],this.loading=!0}ngOnChanges(){var t;let e=((t=this.transclusion.nativeElement.textContent)==null?void 0:t.trim())||this.code||"";this.colorize(e)}ngOnDestroy(){var e,t;(e=this.editor)==null||e.dispose(),(t=this.observer)==null||t.disconnect(),this.subscriptions.forEach(o=>o.unsubscribe())}colorize(e){return h(this,null,function*(){try{yield this.colorizer.colorizeElement({code:e||"",theme:this.theme,lines:this.lines,language:this.language,highlights:this.highlights,filename:this.filename,element:this.container.nativeElement})}finally{this.loading=!1,this.changeDetectorRef.markForCheck()}})}};n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=T({type:n,selectors:[["nge-monaco-viewer"]],viewQuery:function(t,o){if(t&1&&(N(Ne,7),N(ue,7)),t&2){let i;u(i=E())&&(o.container=i.first),u(i=E())&&(o.transclusion=i.first)}},inputs:{code:"code",lines:"lines",theme:"theme",language:"language",highlights:"highlights",filename:"filename"},features:[ie],ngContentSelectors:Ee,decls:9,vars:1,consts:[["container",""],["transclusion",""],[4,"ngIf"],[1,"monaco-editor","monaco-editor-background"],[2,"display","none"]],template:function(t,o){t&1&&(re(),w(0,ge,1,0,"nge-monaco-placeholder",2),W(1,"pre",3),K(2,"  "),C(3,"code",null,0),K(5,`
`),z(),W(6,"div",4,1),se(8),z()),t&2&&F("ngIf",o.loading)},dependencies:[k,H],styles:["pre[_ngcontent-%COMP%]{margin:.5em 0;overflow:auto;border:1px solid #f2f2f2}nge-monaco-placeholder[_ngcontent-%COMP%]{max-height:200px}"],changeDetection:0});let c=n;return c})();var B=class{activate(){this.disposable=monaco.editor.onDidCreateEditor(n=>{this.preventSymbolDuplicationOnCompositionEnd(n)})}deactivate(){var n;(n=this.disposable)==null||n.dispose()}preventSymbolDuplicationOnCompositionEnd(n){let b=[],e=[];e.push(n.onDidCompositionStart(()=>{let t=n.getPosition();t&&b.push(t)})),e.push(n.onDidCompositionEnd(()=>{setTimeout(()=>{var s;if(!b.length)return;let t=b[0],o=n.getPosition();if(!o)return;b.splice(0,1);let i=o.column-t.column;if(i>1){(s=document.activeElement)==null||s.blur(),n.focus();let r=new monaco.Range(o.lineNumber,o.column-(i-1),o.lineNumber,o.column);n.executeEdits("api",[{range:r,text:"",forceMoveMarkers:!1}])}})})),e.push(n.onDidDispose(()=>{e.forEach(t=>t.dispose()),e=[]}))}};var wt=(()=>{let n=class n{static forRoot(e){return{ngModule:n,providers:[{provide:O,useValue:e},{provide:v,multi:!0,useExisting:P},{provide:v,multi:!0,useClass:B}]}}};n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=ne({type:n}),n.\u0275inj=oe({imports:[ae]});let c=n;return c})();export{Ue as a,et as b,P as c,ct as d,me as e,Ct as f,wt as g};
