"use strict";(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[822],{9822:(S,d,t)=>{t.r(d),t.d(d,{ShowcaseModule:()=>y});var r=t(9808),c=t(655),e=t(5e3),h=t(4216),m=t(1578),g=t(2226),u=t(7139);function p(n,s){if(1&n&&(e.ynx(0),e.TgZ(1,"option",5),e._uU(2),e.qZA(),e.BQk()),2&n){const o=s.$implicit,i=e.oxw();e.xp6(1),e.Q6J("selected",o===(null==i.theme?null:i.theme.themeName))("value",o),e.xp6(1),e.Oqu(o)}}let f=(()=>{class n{constructor(o){this.theming=o,this.disposables=[],this.subscriptions=[],this.themes=this.theming.themesChanges}ngOnInit(){this.subscriptions.push(this.theming.themeChanges.subscribe(o=>{this.theme=o}))}ngOnDestroy(){this.subscriptions.forEach(o=>o.unsubscribe()),this.disposables.forEach(o=>o.dispose())}onCreateEditor(o){o.updateOptions({scrollbar:{horizontalScrollbarSize:4,verticalScrollbarSize:4}}),this.model=this.model||monaco.editor.createModel('print("Hello world")',"python"),o.setModel(this.model),this.disposables.push(this.model.onDidChangeContent(i=>{var a;console.log(null===(a=this.model)||void 0===a?void 0:a.getValue())})),o.addCommand(monaco.KeyMod.CtrlCmd|monaco.KeyCode.KeyS,i=>{console.log("SAVE")})}onCreateDiffEditor(o){o.updateOptions({renderSideBySide:!0}),o.setModel({original:this.originalModel||monaco.editor.createModel('print("Hello world !!!")',"python"),modified:this.modifiedModel||monaco.editor.createModel('print("hello world")',"python")}),this.originalModel=o.getOriginalEditor().getModel(),this.modifiedModel=o.getModifiedEditor().getModel()}switchTheme(o){return(0,c.mG)(this,void 0,void 0,function*(){this.theming.setTheme(o)})}}return n.\u0275fac=function(o){return new(o||n)(e.Y36(h.y))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-monaco-showcase"]],decls:17,vars:6,consts:[["for","theme"],["name","theme",3,"change"],[4,"ngFor","ngForOf"],[3,"language","lines","highlights"],[2,"--editor-height","200px",3,"ready"],[3,"selected","value"]],template:function(o,i){1&o&&(e.TgZ(0,"h1"),e._uU(1,"Showcase"),e.qZA(),e.TgZ(2,"label",0),e._uU(3,"Theme: "),e.qZA(),e.TgZ(4,"select",1),e.NdJ("change",function(l){return i.switchTheme(l.target.value)}),e.YNc(5,p,3,3,"ng-container",2),e.ALo(6,"async"),e.qZA(),e.TgZ(7,"h2"),e._uU(8,"NgeMonacoViewer"),e.qZA(),e.TgZ(9,"nge-monaco-viewer",3),e._uU(10,"\n# H1\n## H2\n### H3\n#### H4\n##### H5\n###### H6\n\nAlternatively, for H1 and H2, an underline-ish style:\n\nAlt-H1\n======\n\nAlt-H2\n------\n"),e.qZA(),e.TgZ(11,"h2"),e._uU(12,"NgeMonacoEditor"),e.qZA(),e.TgZ(13,"nge-monaco-editor",4),e.NdJ("ready",function(l){return i.onCreateEditor(l)}),e.qZA(),e.TgZ(14,"h2"),e._uU(15,"NgeMonacoDiffEditor"),e.qZA(),e.TgZ(16,"nge-monaco-diff-editor",4),e.NdJ("ready",function(l){return i.onCreateDiffEditor(l)}),e.qZA()),2&o&&(e.xp6(5),e.Q6J("ngForOf",e.lcZ(6,4,i.themes)),e.xp6(4),e.Q6J("language","markdown")("lines","1 4-7 10")("highlights","2-5"))},directives:[r.sg,m.Y,g.R,u.f],pipes:[r.Ov],styles:[""]}),n})();var v=t(2085);let y=(()=>{class n{constructor(){this.component=f}}return n.\u0275fac=function(o){return new(o||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[[r.ez,v.NgeMarkdownModule,h.vS]]}),n})()}}]);