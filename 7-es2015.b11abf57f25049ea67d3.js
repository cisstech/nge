(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{iUlN:function(e,o,t){"use strict";t.r(o),t.d(o,"ShowcaseModule",(function(){return a}));var n=t("2kYt"),i=t("D57K"),s=t("EM62"),r=t("lFqq");function c(e,o){if(1&e&&(s.Rb(0),s.Tb(1,"option",5),s.vc(2),s.Sb(),s.Qb()),2&e){const e=o.$implicit,t=s.dc();s.Bb(1),s.ic("selected",e===(null==t.theme?null:t.theme.themeName))("value",e),s.Bb(1),s.wc(e)}}let l=(()=>{class e{constructor(e){this.theming=e,this.disposables=[],this.subscriptions=[],this.themes=this.theming.themesChanges}ngOnInit(){this.subscriptions.push(this.theming.themeChanges.subscribe(e=>{this.theme=e}))}ngOnDestroy(){this.subscriptions.forEach(e=>e.unsubscribe()),this.disposables.forEach(e=>e.dispose())}onCreateEditor(e){e.updateOptions({scrollbar:{horizontalScrollbarSize:4,verticalScrollbarSize:4}}),this.model=this.model||monaco.editor.createModel('print("Hello world")',"python"),e.setModel(this.model),this.disposables.push(this.model.onDidChangeContent(e=>{var o;console.log(null===(o=this.model)||void 0===o?void 0:o.getValue())})),e.addCommand(monaco.KeyMod.CtrlCmd|monaco.KeyCode.KEY_S,e=>{console.log("SAVE")})}onCreateDiffEditor(e){e.updateOptions({renderSideBySide:!0}),e.setModel({original:this.originalModel||monaco.editor.createModel('print("Hello world !!!")',"python"),modified:this.modifiedModel||monaco.editor.createModel('print("hello world")',"python")}),this.originalModel=e.getOriginalEditor().getModel(),this.modifiedModel=e.getModifiedEditor().getModel()}switchTheme(e){return Object(i.a)(this,void 0,void 0,(function*(){this.theming.setTheme(e)}))}}return e.\u0275fac=function(o){return new(o||e)(s.Nb(r.f))},e.\u0275cmp=s.Hb({type:e,selectors:[["app-monaco-showcase"]],decls:17,vars:6,consts:[["for","theme"],["name","theme",3,"change"],[4,"ngFor","ngForOf"],[3,"language","lines","highlights"],[2,"--editor-height","200px",3,"ready"],[3,"selected","value"]],template:function(e,o){1&e&&(s.Tb(0,"h1"),s.vc(1,"Showcase"),s.Sb(),s.Tb(2,"label",0),s.vc(3,"Theme: "),s.Sb(),s.Tb(4,"select",1),s.bc("change",(function(e){return o.switchTheme(e.target.value)})),s.tc(5,c,3,3,"ng-container",2),s.ec(6,"async"),s.Sb(),s.Tb(7,"h2"),s.vc(8,"NgeMonacoViewer"),s.Sb(),s.Tb(9,"nge-monaco-viewer",3),s.vc(10,"\n# H1\n## H2\n### H3\n#### H4\n##### H5\n###### H6\n\nAlternatively, for H1 and H2, an underline-ish style:\n\nAlt-H1\n======\n\nAlt-H2\n------\n"),s.Sb(),s.Tb(11,"h2"),s.vc(12,"NgeMonacoEditor"),s.Sb(),s.Tb(13,"nge-monaco-editor",4),s.bc("ready",(function(e){return o.onCreateEditor(e)})),s.Sb(),s.Tb(14,"h2"),s.vc(15,"NgeMonacoDiffEditor"),s.Sb(),s.Tb(16,"nge-monaco-diff-editor",4),s.bc("ready",(function(e){return o.onCreateDiffEditor(e)})),s.Sb()),2&e&&(s.Bb(5),s.ic("ngForOf",s.fc(6,4,o.themes)),s.Bb(4),s.ic("language","markdown")("lines","1 4-7 10")("highlights","2-5"))},directives:[n.i,r.g,r.d,r.c],pipes:[n.b],styles:[""]}),e})();var d=t("ff+4");let a=(()=>{class e{constructor(){this.component=l}}return e.\u0275mod=s.Lb({type:e}),e.\u0275inj=s.Kb({factory:function(o){return new(o||e)},imports:[[n.c,d.NgeMarkdownModule,r.e]]}),e})()}}]);