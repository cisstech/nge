import{a as D,b as O,c as F,f as A,g as I}from"./chunk-33OHPXT7.js";import{C as T}from"./chunk-QET4ZBO7.js";import{$a as v,Ba as E,Ca as S,Ga as c,Ha as _,J as f,N as u,O as M,Ra as a,Sa as w,ab as b,ea as m,fa as y,g,mb as N,pb as H,qb as x,ra as C,ta as d,ya as i,za as n}from"./chunk-4STL355D.js";function z(o,t){if(o&1&&(E(0),i(1,"option",5),a(2),n(),S()),o&2){let h=t.$implicit,e=_();m(),d("selected",h===(e.theme==null?null:e.theme.themeName))("value",h),m(),w(h)}}var V=(()=>{let t=class t{constructor(e){this.theming=e,this.disposables=[],this.subscriptions=[],this.themes=this.theming.themesChanges}ngOnInit(){this.subscriptions.push(this.theming.themeChanges.subscribe(e=>{this.theme=e}))}ngOnDestroy(){this.subscriptions.forEach(e=>e.unsubscribe()),this.disposables.forEach(e=>e.dispose())}onCreateEditor(e){e.updateOptions({scrollbar:{horizontalScrollbarSize:4,verticalScrollbarSize:4}}),this.model=this.model||monaco.editor.createModel('print("Hello world")',"python"),e.setModel(this.model),this.disposables.push(this.model.onDidChangeContent(r=>{var s;console.log((s=this.model)==null?void 0:s.getValue())})),e.addCommand(monaco.KeyMod.CtrlCmd|monaco.KeyCode.KeyS,r=>{console.log("SAVE")})}onCreateDiffEditor(e){e.updateOptions({renderSideBySide:!0}),e.setModel({original:this.originalModel||monaco.editor.createModel('print("Hello world !!!")',"python"),modified:this.modifiedModel||monaco.editor.createModel('print("hello world")',"python")}),this.originalModel=e.getOriginalEditor().getModel(),this.modifiedModel=e.getModifiedEditor().getModel()}switchTheme(e){return g(this,null,function*(){this.theming.setTheme(e)})}};t.\u0275fac=function(r){return new(r||t)(y(F))},t.\u0275cmp=u({type:t,selectors:[["app-monaco-showcase"]],decls:17,vars:6,consts:[["for","theme"],["name","theme",3,"change"],[4,"ngFor","ngForOf"],[3,"language","lines","highlights"],[2,"--editor-height","200px",3,"ready"],[3,"selected","value"]],template:function(r,s){r&1&&(i(0,"h1"),a(1,"Showcase"),n(),i(2,"label",0),a(3,"Theme: "),n(),i(4,"select",1),c("change",function(l){return s.switchTheme(l.target.value)}),C(5,z,3,3,"ng-container",2),v(6,"async"),n(),i(7,"h2"),a(8,"NgeMonacoViewer"),n(),i(9,"nge-monaco-viewer",3),a(10,`
# H1
## H2
### H3
#### H4
##### H5
###### H6

Alternatively, for H1 and H2, an underline-ish style:

Alt-H1
======

Alt-H2
------
`),n(),i(11,"h2"),a(12,"NgeMonacoEditor"),n(),i(13,"nge-monaco-editor",4),c("ready",function(l){return s.onCreateEditor(l)}),n(),i(14,"h2"),a(15,"NgeMonacoDiffEditor"),n(),i(16,"nge-monaco-diff-editor",4),c("ready",function(l){return s.onCreateDiffEditor(l)}),n()),r&2&&(m(5),d("ngForOf",b(6,4,s.themes)),m(4),d("language","markdown")("lines","1 4-7 10")("highlights","2-5"))},dependencies:[N,O,D,A,H]});let o=t;return o})();var U=(()=>{let t=class t{constructor(){this.component=V}};t.\u0275fac=function(r){return new(r||t)},t.\u0275mod=M({type:t}),t.\u0275inj=f({imports:[x,T,I]});let o=t;return o})();export{U as ShowcaseModule};
