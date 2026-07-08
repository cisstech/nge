import {z as zt$1,y as yt$1,u as uf,m as mr$1,E,k as kd,g,V as Vt,q as qr$1,A,a as V,S as SH,b as qa,T as TH,o as oe,r as re,$ as $p,c as gu,Y,d as bE,C as Ce,e as Co$1,v as vE,N as NH,f as Av,h as cE,i as z,j as jo$1,n as nr$1,l as Te$1,p as nI,L,K,s as Ae,t as oi$1,B as Bg,w as Ts,x as di$1,D as te,F as le,X,G as Tt,H as AH,I as Yn$1,J as ce,M as DE,O as me$1,P as y,Q as SE,R as IE,_,U as se$1,W as Ho$1,Z as Kn$1,a0 as yn$1,a1 as jr$1,a2 as Ue,a3 as Za,a4 as ua$1,a5 as _t$1,a6 as Ie$1,a7 as j,a8 as x,a9 as ys,aa as hu,ab as tr$1,ac as Z,ad as xe,ae as EE,af as uy,ag as PS,ah as Va,ai as Xn$1,aj as Ha,ak as Ny,al as _b,am as vy,an as tS,ao as gy,ap as zd,aq as nS,ar as Gd,as as Iy,at as wy,au as Cy,av as MT,aw as dy,ax as wa,ay as Bb,az as Vd,aA as zw,aB as Hb,aC as Sy,aD as oS,aE as by,aF as Zd,aG as py,aH as CT,aI as My,aJ as cr$1,aK as _S,aL as zb,aM as $b,aN as Gb,aO as D,aP as Xb,aQ as $a,aR as iS,aS as Lp,aT as Kb,aU as Py,aV as Fy,aW as xC,aX as Ly,aY as kC,aZ as VS,a_ as Cp,a$ as RS,b0 as bp}from'./main-ARUFEQ2D.js';var _n=(()=>{class n{_renderer;_elementRef;onChange=e=>{};onTouched=()=>{};constructor(e,t){this._renderer=e,this._elementRef=t;}setProperty(e,t){this._renderer.setProperty(this._elementRef.nativeElement,e,t);}registerOnTouched(e){this.onTouched=e;}registerOnChange(e){this.onChange=e;}setDisabledState(e){this.setProperty("disabled",e);}static \u0275fac=function(t){return new(t||n)(Ae(oi$1),Ae(Vt))};static \u0275dir=nr$1({type:n})}return n})(),Sr=(()=>{class n extends _n{static \u0275fac=(()=>{let e;return function(r){return (e||(e=Bg(n)))(r||n)}})();static \u0275dir=nr$1({type:n,features:[uy]})}return n})(),vn=new E("");var Vr={provide:vn,useExisting:Ts(()=>at),multi:true};function Tr(){let n=_t$1()?_t$1().getUserAgent():"";return /android (\d+)/.test(n.toLowerCase())}var Rr=new E(""),at=(()=>{class n extends _n{_compositionMode;_composing=false;constructor(e,t,r){super(e,t),this._compositionMode=r,this._compositionMode==null&&(this._compositionMode=!Tr());}writeValue(e){let t=e==null?"":e;this.setProperty("value",t);}_handleInput(e){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(e);}_compositionStart(){this._composing=true;}_compositionEnd(e){this._composing=false,this._compositionMode&&this.onChange(e);}static \u0275fac=function(t){return new(t||n)(Ae(oi$1),Ae(Vt),Ae(Rr,8))};static \u0275dir=nr$1({type:n,selectors:[["input","formControlName","",3,"type","checkbox",3,"ngNoCva",""],["textarea","formControlName","",3,"ngNoCva",""],["input","formControl","",3,"type","checkbox",3,"ngNoCva",""],["textarea","formControl","",3,"ngNoCva",""],["input","ngModel","",3,"type","checkbox",3,"ngNoCva",""],["textarea","ngModel","",3,"ngNoCva",""],["","ngDefaultControl",""]],hostBindings:function(t,r){t&1&&Va("input",function(a){return r._handleInput(a.target.value)})("blur",function(){return r.onTouched()})("compositionstart",function(){return r._compositionStart()})("compositionend",function(a){return r._compositionEnd(a.target.value)});},standalone:false,features:[PS([Vr]),uy]})}return n})();function kt(n){return n==null||Lt(n)===0}function Lt(n){return n==null?null:Array.isArray(n)||typeof n=="string"?n.length:n instanceof Set?n.size:null}var st=new E(""),Ht=new E(""),Nr=/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,Ne=class{static min(i){return Or(i)}static max(i){return Pr(i)}static required(i){return bn(i)}static requiredTrue(i){return kr(i)}static email(i){return Lr(i)}static minLength(i){return Hr(i)}static maxLength(i){return jr(i)}static pattern(i){return Br(i)}static nullValidator(i){return Ye()}static compose(i){return wn(i)}static composeAsync(i){return Dn(i)}};function Or(n){return i=>{if(i.value==null||n==null)return null;let e=parseFloat(i.value);return !isNaN(e)&&e<n?{min:{min:n,actual:i.value}}:null}}function Pr(n){return i=>{if(i.value==null||n==null)return null;let e=parseFloat(i.value);return !isNaN(e)&&e>n?{max:{max:n,actual:i.value}}:null}}function bn(n){return kt(n.value)?{required:true}:null}function kr(n){return n.value===true?null:{required:true}}function Lr(n){return kt(n.value)||Nr.test(n.value)?null:{email:true}}function Hr(n){return i=>{var t,r;let e=(r=(t=i.value)==null?void 0:t.length)!=null?r:Lt(i.value);return e===null||e===0?null:e<n?{minlength:{requiredLength:n,actualLength:e}}:null}}function jr(n){return i=>{var t,r;let e=(r=(t=i.value)==null?void 0:t.length)!=null?r:Lt(i.value);return e!==null&&e>n?{maxlength:{requiredLength:n,actualLength:e}}:null}}function Br(n){if(!n)return Ye;let i,e;return typeof n=="string"?(e="",n.charAt(0)!=="^"&&(e+="^"),e+=n,n.charAt(n.length-1)!=="$"&&(e+="$"),i=new RegExp(e)):(e=n.toString(),i=n),t=>{if(kt(t.value))return null;let r=t.value;return i.test(r)?null:{pattern:{requiredPattern:e,actualValue:r}}}}function Ye(n){return null}function yn(n){return n!=null}function xn(n){return tr$1(n)?Z(n):n}function Cn(n){let i={};return n.forEach(e=>{i=e!=null?y(y({},i),e):i;}),Object.keys(i).length===0?null:i}function Mn(n,i){return i.map(e=>e(n))}function zr(n){return !n.validate}function En(n){return n.map(i=>zr(i)?i:e=>i.validate(e))}function wn(n){if(!n)return null;let i=n.filter(yn);return i.length==0?null:function(e){return Cn(Mn(e,i))}}function jt(n){return n!=null?wn(En(n)):null}function Dn(n){if(!n)return null;let i=n.filter(yn);return i.length==0?null:function(e){let t=Mn(e,i).map(xn);return hu(t).pipe(Y(Cn))}}function Bt(n){return n!=null?Dn(En(n)):null}function dn(n,i){return n===null?[i]:Array.isArray(n)?[...n,i]:[n,i]}function An(n){return n._rawValidators}function Fn(n){return n._rawAsyncValidators}function Nt(n){return n?Array.isArray(n)?n:[n]:[]}function Xe(n,i){return Array.isArray(n)?n.includes(i):n===i}function cn(n,i){let e=Nt(i);return Nt(n).forEach(r=>{Xe(e,r)||e.push(r);}),e}function un(n,i){return Nt(i).filter(e=>!Xe(n,e))}var Je=class{get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators=[];_rawAsyncValidators=[];_setValidators(i){this._rawValidators=i||[],this._composedValidatorFn=jt(this._rawValidators);}_setAsyncValidators(i){this._rawAsyncValidators=i||[],this._composedAsyncValidatorFn=Bt(this._rawAsyncValidators);}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_onDestroyCallbacks=[];_registerOnDestroy(i){this._onDestroyCallbacks.push(i);}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(i=>i()),this._onDestroyCallbacks=[];}reset(i=void 0){var e;(e=this.control)==null||e.reset(i);}hasError(i,e){return this.control?this.control.hasError(i,e):false}getError(i,e){return this.control?this.control.getError(i,e):null}},ae=class extends Je{name;get formDirective(){return null}get path(){return null}};var Ie="VALID",Qe="INVALID",me="PENDING",Se="DISABLED",ie=class{},et=class extends ie{value;source;constructor(i,e){super(),this.value=i,this.source=e;}},Te=class extends ie{pristine;source;constructor(i,e){super(),this.pristine=i,this.source=e;}},Re=class extends ie{touched;source;constructor(i,e){super(),this.touched=i,this.source=e;}},he=class extends ie{status;source;constructor(i,e){super(),this.status=i,this.source=e;}},tt=class extends ie{source;constructor(i){super(),this.source=i;}},pe=class extends ie{source;constructor(i){super(),this.source=i;}};function In(n){return (lt(n)?n.validators:n)||null}function Ur(n){return Array.isArray(n)?jt(n):n||null}function Sn(n,i){return (lt(i)?i.asyncValidators:n)||null}function Gr(n){return Array.isArray(n)?Bt(n):n||null}function lt(n){return n!=null&&!Array.isArray(n)&&typeof n=="object"}function qr(n,i,e){let t=n.controls;if(!(Object.keys(t)).length)throw new D(1e3,"");if(!Vn(t,e))throw new D(1001,"")}function Wr(n,i,e){n._forEachChild((t,r)=>{if(e[r]===void 0)throw new D(-1002,"")});}var it=class{_pendingDirty=false;_hasOwnPendingAsyncValidator=null;_pendingTouched=false;_onCollectionChange=()=>{};_updateOn;_hasRequired=oe(false);_parent=null;_asyncValidationSubscription;_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators;_rawAsyncValidators;value;constructor(i,e){this._assignValidators(i),this._assignAsyncValidators(e);}get validator(){return this._composedValidatorFn}set validator(i){this._rawValidators=this._composedValidatorFn=i,this._updateHasRequiredValidator();}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(i){this._rawAsyncValidators=this._composedAsyncValidatorFn=i;}get parent(){return this._parent}get status(){return te(this.statusReactive)}set status(i){te(()=>this.statusReactive.set(i));}_status=qa(()=>this.statusReactive());statusReactive=oe(void 0);get valid(){return this.status===Ie}get invalid(){return this.status===Qe}get pending(){return this.status===me}get disabled(){return this.status===Se}get enabled(){return this.status!==Se}errors;get pristine(){return te(this.pristineReactive)}set pristine(i){te(()=>this.pristineReactive.set(i));}_pristine=qa(()=>this.pristineReactive());pristineReactive=oe(true);get dirty(){return !this.pristine}get touched(){return te(this.touchedReactive)}set touched(i){te(()=>this.touchedReactive.set(i));}_touched=qa(()=>this.touchedReactive());touchedReactive=oe(false);get untouched(){return !this.touched}_events=new re;events=this._events.asObservable();valueChanges;statusChanges;get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(i){this._assignValidators(i);}setAsyncValidators(i){this._assignAsyncValidators(i);}addValidators(i){this.setValidators(cn(i,this._rawValidators));}addAsyncValidators(i){this.setAsyncValidators(cn(i,this._rawAsyncValidators));}removeValidators(i){this.setValidators(un(i,this._rawValidators));}removeAsyncValidators(i){this.setAsyncValidators(un(i,this._rawAsyncValidators));}hasValidator(i){return Xe(this._rawValidators,i)}hasAsyncValidator(i){return Xe(this._rawAsyncValidators,i)}clearValidators(){this.validator=null;}clearAsyncValidators(){this.asyncValidator=null;}markAsTouched(i={}){var r,o;let e=this.touched===false;this.touched=true;let t=(r=i.sourceControl)!=null?r:this;i.onlySelf||(o=this._parent)==null||o.markAsTouched(j(y({},i),{sourceControl:t})),e&&i.emitEvent!==false&&this._events.next(new Re(true,t));}markAllAsDirty(i={}){this.markAsDirty({onlySelf:true,emitEvent:i.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsDirty(i));}markAllAsTouched(i={}){this.markAsTouched({onlySelf:true,emitEvent:i.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsTouched(i));}markAsUntouched(i={}){var r,o;let e=this.touched===true;this.touched=false,this._pendingTouched=false;let t=(r=i.sourceControl)!=null?r:this;this._forEachChild(a=>{a.markAsUntouched({onlySelf:true,emitEvent:i.emitEvent,sourceControl:t});}),i.onlySelf||(o=this._parent)==null||o._updateTouched(i,t),e&&i.emitEvent!==false&&this._events.next(new Re(false,t));}markAsDirty(i={}){var r,o;let e=this.pristine===true;this.pristine=false;let t=(r=i.sourceControl)!=null?r:this;i.onlySelf||(o=this._parent)==null||o.markAsDirty(j(y({},i),{sourceControl:t})),e&&i.emitEvent!==false&&this._events.next(new Te(false,t));}markAsPristine(i={}){var r,o;let e=this.pristine===false;this.pristine=true,this._pendingDirty=false;let t=(r=i.sourceControl)!=null?r:this;this._forEachChild(a=>{a.markAsPristine({onlySelf:true,emitEvent:i.emitEvent});}),i.onlySelf||(o=this._parent)==null||o._updatePristine(i,t),e&&i.emitEvent!==false&&this._events.next(new Te(true,t));}markAsPending(i={}){var t,r;this.status=me;let e=(t=i.sourceControl)!=null?t:this;i.emitEvent!==false&&(this._events.next(new he(this.status,e)),this.statusChanges.emit(this.status)),i.onlySelf||(r=this._parent)==null||r.markAsPending(j(y({},i),{sourceControl:e}));}disable(i={}){var r;let e=this._parentMarkedDirty(i.onlySelf);this.status=Se,this.errors=null,this._forEachChild(o=>{o.disable(j(y({},i),{onlySelf:true}));}),this._updateValue();let t=(r=i.sourceControl)!=null?r:this;i.emitEvent!==false&&(this._events.next(new et(this.value,t)),this._events.next(new he(this.status,t)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(j(y({},i),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(o=>o(true));}enable(i={}){let e=this._parentMarkedDirty(i.onlySelf);this.status=Ie,this._forEachChild(t=>{t.enable(j(y({},i),{onlySelf:true}));}),this.updateValueAndValidity({onlySelf:true,emitEvent:i.emitEvent}),this._updateAncestors(j(y({},i),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(t=>t(false));}_updateAncestors(i,e){var t,r,o;i.onlySelf||((t=this._parent)==null||t.updateValueAndValidity(i),i.skipPristineCheck||(r=this._parent)==null||r._updatePristine({},e),(o=this._parent)==null||o._updateTouched({},e));}setParent(i){this._parent=i;}getRawValue(){return this.value}updateValueAndValidity(i={}){var t,r;if(this._setInitialStatus(),this._updateValue(),this.enabled){let o=this._cancelExistingSubscription();this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===Ie||this.status===me)&&this._runAsyncValidator(o,i.emitEvent);}let e=(t=i.sourceControl)!=null?t:this;i.emitEvent!==false&&(this._events.next(new et(this.value,e)),this._events.next(new he(this.status,e)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),i.onlySelf||(r=this._parent)==null||r.updateValueAndValidity(j(y({},i),{sourceControl:e}));}_updateTreeValidity(i={emitEvent:true}){this._forEachChild(e=>e._updateTreeValidity(i)),this.updateValueAndValidity({onlySelf:true,emitEvent:i.emitEvent});}_setInitialStatus(){this.status=this._allControlsDisabled()?Se:Ie;}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(i,e){if(this.asyncValidator){this.status=me,this._hasOwnPendingAsyncValidator={emitEvent:e!==false,shouldHaveEmitted:i!==false};let t=xn(this.asyncValidator(this));this._asyncValidationSubscription=t.subscribe(r=>{this._hasOwnPendingAsyncValidator=null,this.setErrors(r,{emitEvent:e,shouldHaveEmitted:i});});}}_cancelExistingSubscription(){var i,e,t;if(this._asyncValidationSubscription){this._asyncValidationSubscription.unsubscribe();let r=(t=((i=this._hasOwnPendingAsyncValidator)==null?void 0:i.emitEvent)||((e=this._hasOwnPendingAsyncValidator)==null?void 0:e.shouldHaveEmitted))!=null?t:false;return this._hasOwnPendingAsyncValidator=null,r}return  false}setErrors(i,e={}){this.errors=i,this._updateControlsErrors(e.emitEvent!==false,this,e.shouldHaveEmitted);}get(i){let e=i;return e==null||(Array.isArray(e)||(e=e.split(".")),e.length===0)?null:e.reduce((t,r)=>t&&t._find(r),this)}getError(i,e){let t=e?this.get(e):this;return t!=null&&t.errors?t.errors[i]:null}hasError(i,e){return !!this.getError(i,e)}get root(){let i=this;for(;i._parent;)i=i._parent;return i}_updateControlsErrors(i,e,t){this.status=this._calculateStatus(),i&&this.statusChanges.emit(this.status),(i||t)&&this._events.next(new he(this.status,e)),this._parent&&this._parent._updateControlsErrors(i,e,t);}_initObservables(){this.valueChanges=new Te$1,this.statusChanges=new Te$1;}_calculateStatus(){return this._allControlsDisabled()?Se:this.errors?Qe:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(me)?me:this._anyControlsHaveStatus(Qe)?Qe:Ie}_anyControlsHaveStatus(i){return this._anyControls(e=>e.status===i)}_anyControlsDirty(){return this._anyControls(i=>i.dirty)}_anyControlsTouched(){return this._anyControls(i=>i.touched)}_updatePristine(i,e){var o;let t=!this._anyControlsDirty(),r=this.pristine!==t;this.pristine=t,i.onlySelf||(o=this._parent)==null||o._updatePristine(i,e),r&&this._events.next(new Te(this.pristine,e));}_updateTouched(i={},e){var t;this.touched=this._anyControlsTouched(),this._events.next(new Re(this.touched,e)),i.onlySelf||(t=this._parent)==null||t._updateTouched(i,e);}_onDisabledChange=[];_registerOnCollectionChange(i){this._onCollectionChange=i;}_setUpdateStrategy(i){lt(i)&&i.updateOn!=null&&(this._updateOn=i.updateOn);}_parentMarkedDirty(i){var e;return !i&&!!((e=this._parent)!=null&&e.dirty)&&!this._parent._anyControlsDirty()}_find(i){return null}_assignValidators(i){this._rawValidators=Array.isArray(i)?i.slice():i,this._composedValidatorFn=Ur(this._rawValidators),this._updateHasRequiredValidator();}_assignAsyncValidators(i){this._rawAsyncValidators=Array.isArray(i)?i.slice():i,this._composedAsyncValidatorFn=Gr(this._rawAsyncValidators);}_updateHasRequiredValidator(){te(()=>this._hasRequired.set(this.hasValidator(Ne.required)));}};function Vn(n,i){return Object.hasOwn(n,i)}function $r(n){return n.tagName==="INPUT"||n.tagName==="SELECT"||n.tagName==="TEXTAREA"}function Kr(n,i,e,t){switch(e){case "name":n.setAttribute(i,e,t);break;case "disabled":case "readonly":case "required":t?n.setAttribute(i,e,""):n.removeAttribute(i,e);break;case "max":case "min":case "minLength":case "maxLength":t!==void 0?n.setAttribute(i,e,t.toString()):n.removeAttribute(i,e);break}}var Ot=class{kind;context;control;message;constructor({kind:i,context:e,control:t}){this.kind=i,this.context=e,this.control=t;}};var Zr=(()=>{class n{_validator=Ye;_onChange;_enabled;ngOnChanges(e){var t;if(this.inputName in e){let r=this.normalizeInput(e[this.inputName].currentValue);this._enabled=this.enabled(r),this._validator=this._enabled?this.createValidator(r):Ye,(t=this._onChange)==null||t.call(this);}}validate(e){return this._validator(e)}registerOnValidatorChange(e){this._onChange=e;}enabled(e){return e!=null}static \u0275fac=function(t){return new(t||n)};static \u0275dir=nr$1({type:n,features:[Xn$1]})}return n})();var Qr={provide:st,useExisting:Ts(()=>Tn),multi:true};var Tn=(()=>{class n extends Zr{required;inputName="required";normalizeInput=di$1;createValidator=e=>bn;enabled(e){return e}static \u0275fac=(()=>{let e;return function(r){return (e||(e=Bg(n)))(r||n)}})();static \u0275dir=nr$1({type:n,selectors:[["","required","","formControlName","",3,"type","checkbox"],["","required","","formControl","",3,"type","checkbox"],["","required","","ngModel","",3,"type","checkbox"]],hostVars:1,hostBindings:function(t,r){t&2&&Ha("required",r._enabled?"":null);},inputs:{required:"required"},standalone:false,features:[PS([Qr]),uy]})}return n})();var Yr=new E(""),dt=new E("",{factory:()=>zt}),zt="always";function Xr(n,i){return [...i.path,n]}function fn(n,i,e=zt){var t,r;Ut(n,i),i.valueAccessor.writeValue(n.value),(n.disabled||e==="always")&&((r=(t=i.valueAccessor).setDisabledState)==null||r.call(t,n.disabled)),eo(n,i),io(n,i),to(n,i),Jr(n,i);}function mn(n,i,e=true){var r,o;let t=()=>{};(r=i==null?void 0:i.valueAccessor)==null||r.registerOnChange(t),(o=i==null?void 0:i.valueAccessor)==null||o.registerOnTouched(t),rt(n,i),n&&(i._invokeOnDestroyCallbacks(),n._registerOnCollectionChange(()=>{}));}function nt(n,i){n.forEach(e=>{e.registerOnValidatorChange&&e.registerOnValidatorChange(i);});}function Jr(n,i){if(i.valueAccessor.setDisabledState){let e=t=>{i.valueAccessor.setDisabledState(t);};n.registerOnDisabledChange(e),i._registerOnDestroy(()=>{n._unregisterOnDisabledChange(e);});}}function Ut(n,i){let e=An(n);i.validator!==null?n.setValidators(dn(e,i.validator)):typeof e=="function"&&n.setValidators([e]);let t=Fn(n);i.asyncValidator!==null?n.setAsyncValidators(dn(t,i.asyncValidator)):typeof t=="function"&&n.setAsyncValidators([t]);let r=()=>n.updateValueAndValidity();nt(i._rawValidators,r),nt(i._rawAsyncValidators,r);}function rt(n,i){let e=false;if(n!==null){if(i.validator!==null){let r=An(n);if(Array.isArray(r)&&r.length>0){let o=r.filter(a=>a!==i.validator);o.length!==r.length&&(e=true,n.setValidators(o));}}if(i.asyncValidator!==null){let r=Fn(n);if(Array.isArray(r)&&r.length>0){let o=r.filter(a=>a!==i.asyncValidator);o.length!==r.length&&(e=true,n.setAsyncValidators(o));}}}let t=()=>{};return nt(i._rawValidators,t),nt(i._rawAsyncValidators,t),e}function eo(n,i){i.valueAccessor.registerOnChange(e=>{n._pendingValue=e,n._pendingChange=true,n._pendingDirty=true,n.updateOn==="change"&&Rn(n,i);});}function to(n,i){i.valueAccessor.registerOnTouched(()=>{n._pendingTouched=true,n.updateOn==="blur"&&n._pendingChange&&Rn(n,i),n.updateOn!=="submit"&&n.markAsTouched();});}function Rn(n,i){n._pendingDirty&&n.markAsDirty(),n.setValue(n._pendingValue,{emitModelToViewChange:false}),i.viewToModelUpdate(n._pendingValue),n._pendingChange=false;}function io(n,i){let e=(t,r)=>{i.valueAccessor.writeValue(t),r&&i.viewToModelUpdate(t);};n.registerOnChange(e),i._registerOnDestroy(()=>{n._unregisterOnChange(e);});}function Nn(n,i){Ut(n,i);}function no(n,i){return rt(n,i)}function ro(n,i){if(!n.hasOwnProperty("model"))return  false;let e=n.model;return e.isFirstChange()?true:!Object.is(i,e.currentValue)}function oo(n){return Object.getPrototypeOf(n.constructor)===Sr}function On(n,i){n._syncPendingControls(),i.forEach(e=>{let t=e.control;t.updateOn==="submit"&&t._pendingChange&&(e.viewToModelUpdate(t._pendingValue),t._pendingChange=false);});}function ao(n,i){if(!i)return null;let e,t,r;return i.forEach(o=>{o.constructor===at?e=o:oo(o)?t=o:r=o;}),r||t||e||null}function so(n,i){let e=n.indexOf(i);e>-1&&n.splice(e,1);}var lo={provide:Yr,useFactory:()=>{let n=g(ne,{self:true});return {setParseErrors:i=>{n.setParseErrorSource(i);},set onReset(i){n.onReset=i;}}}},ne=class extends Je{_parent=null;name=null;valueAccessor=null;isCustomControlBased=false;userOnReset;resetSubscription;set onReset(i){var e,t;this.userOnReset=i,(e=this.resetSubscription)==null||e.unsubscribe(),this.resetSubscription=void 0,this.control&&(this.resetSubscription=this.control.events.subscribe(r=>{var o;r instanceof pe&&this.control&&((o=this.userOnReset)==null||o.call(this,this.control.value));}),(t=this.subscription)==null||t.add(this.resetSubscription));}isNativeFormElement=false;rawValueAccessors;_selectedValueAccessor=null;get selectedValueAccessor(){var i;return (i=this._selectedValueAccessor)!=null?i:this._selectedValueAccessor=ao(this,this.rawValueAccessors)}parseErrorsValidator=null;renderer;injector;requiredValidatorViaDi;subscription;customControlBindings=null;constructor(i,e,t){var r,o;super(),this.injector=i,this.renderer=e,this.rawValueAccessors=t,(o=(r=this.injector)==null?void 0:r.get(Ie$1))==null||o.onDestroy(()=>{var a;this.removeParseErrorsValidator(this.control),(a=this.subscription)==null||a.unsubscribe();});}setupCustomControl(){var t,r,o;(t=this.subscription)==null||t.unsubscribe();let i=(r=this.injector)==null?void 0:r.get(qr$1);if(!this.control||!i)return;let e=i.markForCheck.bind(i);this.subscription=new se$1,this.subscription.add(this.control.valueChanges.subscribe(e)),this.subscription.add(this.control.statusChanges.subscribe(e)),(o=this.resetSubscription)==null||o.unsubscribe(),this.resetSubscription=void 0,this.userOnReset&&(this.resetSubscription=this.control.events.subscribe(a=>{var l;a instanceof pe&&this.control&&((l=this.userOnReset)==null||l.call(this,this.control.value));}),this.subscription.add(this.resetSubscription)),this.parseErrorsValidator&&this.control.addValidators(this.parseErrorsValidator);}ngControlCreate(i){var r,o;!((o=(r=i.nativeElement).hasAttribute)!=null&&o.call(r,"ngNoCva"))&&(this.rawValueAccessors&&this.rawValueAccessors.length>0||this.valueAccessor!==null)||!i.customControl||(this.isCustomControlBased=true,i.listenToCustomControlModel(a=>{var l,v;(l=this.control)==null||l.setValue(a,{emitModelToViewChange:false}),(v=this.control)==null||v.markAsDirty(),this.viewToModelUpdate(a);}),i.listenToCustomControlOutput("touch",()=>{var a;(a=this.control)==null||a.markAsTouched();}),this.customControlBindings={},this.isNativeFormElement=$r(i.nativeElement),this.requiredValidatorViaDi=this._rawValidators.find(a=>a instanceof Tn));}ngControlUpdate(i,e){if(!this.isCustomControlBased)return;let t=this.control,r=this.customControlBindings;Object.is(r.value,t.value)||(r.value=t.value,i.setCustomControlModelInput(t.value)),this.bindControlProperty(i,r,"touched",t.touched),this.bindControlProperty(i,r,"dirty",t.dirty),this.bindControlProperty(i,r,"valid",t.valid),this.bindControlProperty(i,r,"invalid",t.invalid),this.bindControlProperty(i,r,"pending",t.pending),this.bindControlProperty(i,r,"disabled",t.disabled),this.shouldBindRequired&&this.bindControlProperty(i,r,"required",this.isRequired);let o=t.errors;if(r.errors!==o){r.errors=o;let a=this._convertErrors(o);i.setInputOnDirectives("errors",a);}}get isRequired(){var i,e,t;return (t=((i=this.requiredValidatorViaDi)==null?void 0:i._enabled)||((e=this.control)==null?void 0:e._hasRequired()))!=null?t:false}get shouldBindRequired(){return  true}bindControlProperty(i,e,t,r){if(e[t]===r)return;e[t]=r;let o=i.setInputOnDirectives(t,r);this.isNativeFormElement&&!o&&(t==="disabled"||t==="required")&&this.renderer&&Kr(this.renderer,i.nativeElement,t,r);}_convertErrors(i){if(i===null)return [];let e=this.control;return Object.entries(i).map(([t,r])=>new Ot({context:r,kind:t,control:e}))}setParseErrorSource(i){if(i===void 0)return;let e=null,t=qa(()=>{let r=i();return r.length===0?null:r.reduce((o,a)=>(o[a.kind]=a,o),{})});this.parseErrorsValidator=(()=>e).bind(this),$p(()=>{var r;e=t(),(r=this.control)==null||r.updateValueAndValidity({emitEvent:false});},{injector:this.injector});}removeParseErrorsValidator(i){this.parseErrorsValidator&&(i==null||i.removeValidators(this.parseErrorsValidator),i==null||i.updateValueAndValidity({emitEvent:false}));}},Pt=class{_cd;constructor(i){this._cd=i;}get isTouched(){var i,e,t,r,o;return (t=(e=(i=this._cd)==null?void 0:i.control)==null?void 0:e._touched)==null||t.call(e),!!((o=(r=this._cd)==null?void 0:r.control)!=null&&o.touched)}get isUntouched(){var i,e;return !!((e=(i=this._cd)==null?void 0:i.control)!=null&&e.untouched)}get isPristine(){var i,e,t,r,o;return (t=(e=(i=this._cd)==null?void 0:i.control)==null?void 0:e._pristine)==null||t.call(e),!!((o=(r=this._cd)==null?void 0:r.control)!=null&&o.pristine)}get isDirty(){var i,e;return !!((e=(i=this._cd)==null?void 0:i.control)!=null&&e.dirty)}get isValid(){var i,e,t,r,o;return (t=(e=(i=this._cd)==null?void 0:i.control)==null?void 0:e._status)==null||t.call(e),!!((o=(r=this._cd)==null?void 0:r.control)!=null&&o.valid)}get isInvalid(){var i,e;return !!((e=(i=this._cd)==null?void 0:i.control)!=null&&e.invalid)}get isPending(){var i,e;return !!((e=(i=this._cd)==null?void 0:i.control)!=null&&e.pending)}get isSubmitted(){var i,e,t;return (e=(i=this._cd)==null?void 0:i._submitted)==null||e.call(i),!!((t=this._cd)!=null&&t.submitted)}};var Pn=(()=>{class n extends Pt{constructor(e){super(e);}static \u0275fac=function(t){return new(t||n)(Ae(ne,2))};static \u0275dir=nr$1({type:n,selectors:[["","formControlName",""],["","ngModel",""],["","formControl",""]],hostVars:14,hostBindings:function(t,r){t&2&&Ny("ng-untouched",r.isUntouched)("ng-touched",r.isTouched)("ng-pristine",r.isPristine)("ng-dirty",r.isDirty)("ng-valid",r.isValid)("ng-invalid",r.isInvalid)("ng-pending",r.isPending);},standalone:false,features:[uy]})}return n})();var ot=class extends it{constructor(i,e,t){super(In(e),Sn(t,e)),this.controls=i,this._initObservables(),this._setUpdateStrategy(e),this._setUpControls(),this.updateValueAndValidity({onlySelf:true,emitEvent:!!this.asyncValidator});}controls;registerControl(i,e){let t=this._find(i);return t||(this.controls[i]=e,e.setParent(this),e._registerOnCollectionChange(this._onCollectionChange),e)}addControl(i,e,t={}){this.registerControl(i,e),this.updateValueAndValidity({emitEvent:t.emitEvent}),this._onCollectionChange();}removeControl(i,e={}){let t=this._find(i);t&&t._registerOnCollectionChange(()=>{}),delete this.controls[i],this.updateValueAndValidity({emitEvent:e.emitEvent}),this._onCollectionChange();}setControl(i,e,t={}){let r=this._find(i);r&&r._registerOnCollectionChange(()=>{}),delete this.controls[i],e&&this.registerControl(i,e),this.updateValueAndValidity({emitEvent:t.emitEvent}),this._onCollectionChange();}contains(i){var e;return ((e=this._find(i))==null?void 0:e.enabled)===true}setValue(i,e={}){te(()=>{Wr(this,true,i),Object.keys(i).forEach(t=>{qr(this,true,t),this.controls[t].setValue(i[t],{onlySelf:true,emitEvent:e.emitEvent});}),this.updateValueAndValidity(e);});}patchValue(i,e={}){i!=null&&(Object.keys(i).forEach(t=>{let r=this._find(t);r&&r.patchValue(i[t],{onlySelf:true,emitEvent:e.emitEvent});}),this.updateValueAndValidity(e));}reset(i={},e={}){this._forEachChild((t,r)=>{t.reset(i?i[r]:null,j(y({},e),{onlySelf:true}));}),this._updatePristine(e,this),this._updateTouched(e,this),this.updateValueAndValidity(e),(e==null?void 0:e.emitEvent)!==false&&this._events.next(new pe(this));}getRawValue(){return this._reduceChildren({},(i,e,t)=>(i[t]=e.getRawValue(),i))}_syncPendingControls(){let i=this._reduceChildren(false,(e,t)=>t._syncPendingControls()?true:e);return i&&this.updateValueAndValidity({onlySelf:true}),i}_forEachChild(i){Object.keys(this.controls).forEach(e=>{let t=this.controls[e];t&&i(t,e);});}_setUpControls(){this._forEachChild(i=>{i.setParent(this),i._registerOnCollectionChange(this._onCollectionChange);});}_updateValue(){this.value=this._reduceValue();}_anyControls(i){for(let[e,t]of Object.entries(this.controls))if(this.contains(e)&&i(t))return  true;return  false}_reduceValue(){let i={};return this._reduceChildren(i,(e,t,r)=>((t.enabled||this.disabled)&&(e[r]=t.value),e))}_reduceChildren(i,e){let t=i;return this._forEachChild((r,o)=>{t=e(t,r,o);}),t}_allControlsDisabled(){for(let i of Object.keys(this.controls))if(this.controls[i].enabled)return  false;return Object.keys(this.controls).length>0||this.disabled}_find(i){return Vn(this.controls,i)?this.controls[i]:null}};var co={provide:ae,useExisting:Ts(()=>Gt)},Ve=Promise.resolve(),Gt=(()=>{class n extends ae{callSetDisabledState;get submitted(){return te(this.submittedReactive)}_submitted=qa(()=>this.submittedReactive());submittedReactive=oe(false);_directives=new Set;form;ngSubmit=new Te$1;options;constructor(e,t,r){super(),this.callSetDisabledState=r,this.form=new ot({},jt(e),Bt(t));}ngAfterViewInit(){this._setUpdateStrategy();}get formDirective(){return this}get control(){return this.form}get path(){return []}get controls(){return this.form.controls}addControl(e){Ve.then(()=>{let t=this._findContainer(e.path);e.control=t.registerControl(e.name,e.control),e._setupWithForm(this.callSetDisabledState),e.control.updateValueAndValidity({emitEvent:false}),this._directives.add(e);});}getControl(e){return this.form.get(e.path)}removeControl(e){Ve.then(()=>{let t=this._findContainer(e.path);t==null||t.removeControl(e.name),this._directives.delete(e);});}addFormGroup(e){Ve.then(()=>{let t=this._findContainer(e.path),r=new ot({});Nn(r,e),t.registerControl(e.name,r),r.updateValueAndValidity({emitEvent:false});});}removeFormGroup(e){Ve.then(()=>{var r;let t=this._findContainer(e.path);(r=t==null?void 0:t.removeControl)==null||r.call(t,e.name);});}getFormGroup(e){return this.form.get(e.path)}updateModel(e,t){Ve.then(()=>{this.form.get(e.path).setValue(t);});}setValue(e){this.control.setValue(e);}onSubmit(e){var t;return this.submittedReactive.set(true),On(this.form,this._directives),this.ngSubmit.emit(e),this.form._events.next(new tt(this.control)),((t=e==null?void 0:e.target)==null?void 0:t.method)==="dialog"}onReset(){this.resetForm();}resetForm(e=void 0){this.form.reset(e),this.submittedReactive.set(false);}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.form._updateOn=this.options.updateOn);}_findContainer(e){return e.pop(),e.length?this.form.get(e):this.form}static \u0275fac=function(t){return new(t||n)(Ae(st,10),Ae(Ht,10),Ae(dt,8))};static \u0275dir=nr$1({type:n,selectors:[["form",3,"ngNoForm","",3,"formGroup","",3,"formArray",""],["ng-form"],["","ngForm",""]],hostBindings:function(t,r){t&1&&Va("submit",function(a){return r.onSubmit(a)})("reset",function(){return r.onReset()});},inputs:{options:[0,"ngFormOptions","options"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:false,features:[PS([co]),uy]})}return n})();function hn(n,i){let e=n.indexOf(i);e>-1&&n.splice(e,1);}function pn(n){return typeof n=="object"&&n!==null&&Object.keys(n).length===2&&"value"in n&&"disabled"in n}var kn=class extends it{defaultValue=null;_onChange=[];_pendingValue;_pendingChange=false;constructor(i=null,e,t){super(In(e),Sn(t,e)),this._applyFormState(i),this._setUpdateStrategy(e),this._initObservables(),this.updateValueAndValidity({onlySelf:true,emitEvent:!!this.asyncValidator}),lt(e)&&(e.nonNullable||e.initialValueIsDefault)&&(pn(i)?this.defaultValue=i.value:this.defaultValue=i);}setValue(i,e={}){te(()=>{this.value=this._pendingValue=i,this._onChange.length&&e.emitModelToViewChange!==false&&this._onChange.forEach(t=>t(this.value,e.emitViewToModelChange!==false)),this.updateValueAndValidity(e);});}patchValue(i,e={}){this.setValue(i,e);}reset(i=this.defaultValue,e={}){this._applyFormState(i),this.markAsPristine(e),this.markAsUntouched(e),this.setValue(this.value,e),e.overwriteDefaultValue&&(this.defaultValue=this.value),this._pendingChange=false,(e==null?void 0:e.emitEvent)!==false&&this._events.next(new pe(this));}_updateValue(){}_anyControls(i){return  false}_allControlsDisabled(){return this.disabled}registerOnChange(i){this._onChange.push(i);}_unregisterOnChange(i){hn(this._onChange,i);}registerOnDisabledChange(i){this._onDisabledChange.push(i);}_unregisterOnDisabledChange(i){hn(this._onDisabledChange,i);}_forEachChild(i){}_syncPendingControls(){return this.updateOn==="submit"&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:true,emitModelToViewChange:false}),true):false}_applyFormState(i){pn(i)?(this.value=this._pendingValue=i.value,i.disabled?this.disable({onlySelf:true,emitEvent:false}):this.enable({onlySelf:true,emitEvent:false})):this.value=this._pendingValue=i;}};var uo=n=>n instanceof kn;var fo={provide:ne,useExisting:Ts(()=>qt)},gn=Promise.resolve(),qt=(()=>{class n extends ne{_changeDetectorRef;callSetDisabledState;control=new kn;static ngAcceptInputType_isDisabled;_registered=false;viewModel;name="";isDisabled;model;options;update=new Te$1;constructor(e,t,r,o,a,l,v,$){super(v,$,o),this._changeDetectorRef=a,this.callSetDisabledState=l,this._parent=e,this._setValidators(t),this._setAsyncValidators(r);}ngOnChanges(e){if(this._checkForErrors(),!this._registered||"name"in e){if(this._registered&&(this._checkName(),this.formDirective)){let t=e.name.previousValue;this.formDirective.removeControl({name:t,path:this._getPath(t)});}this._setUpControl();}"isDisabled"in e&&this._updateDisabled(e),ro(e,this.viewModel)&&(this._updateValue(this.model),this.viewModel=this.model);}ngOnDestroy(){var e;(e=this.formDirective)==null||e.removeControl(this);}\u0275ngControlCreate(e){super.ngControlCreate(e);}\u0275ngControlUpdate(e){super.ngControlUpdate(e,false);}get shouldBindRequired(){return  false}get path(){return this._getPath(this.name)}get formDirective(){return this._parent?this._parent.formDirective:null}viewToModelUpdate(e){this.viewModel=e,this.update.emit(e);}_setUpControl(){this._setUpdateStrategy(),this._isStandalone()?this._setUpStandalone():this.formDirective.addControl(this),this._registered=true;}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.control._updateOn=this.options.updateOn);}_isStandalone(){return !this._parent||!!(this.options&&this.options.standalone)}_setUpStandalone(){this.isCustomControlBased?this.setupCustomControl():((this.valueAccessor)!=null||(this.valueAccessor=this.selectedValueAccessor),fn(this.control,this,this.callSetDisabledState)),this.control.updateValueAndValidity({emitEvent:false});}_setupWithForm(e){this.isCustomControlBased?this.setupCustomControl():((this.valueAccessor)!=null||(this.valueAccessor=this.selectedValueAccessor),fn(this.control,this,e));}_checkForErrors(){this._checkName();}_checkName(){this.options&&this.options.name&&(this.name=this.options.name),!this._isStandalone()&&this.name;}_updateValue(e){gn.then(()=>{var t;this.control.setValue(e,{emitViewToModelChange:false}),(t=this._changeDetectorRef)==null||t.markForCheck();});}_updateDisabled(e){let t=e.isDisabled.currentValue,r=t!==0&&di$1(t);gn.then(()=>{var o;r&&!this.control.disabled?this.control.disable():!r&&this.control.disabled&&this.control.enable(),(o=this._changeDetectorRef)==null||o.markForCheck();});}_getPath(e){return this._parent?Xr(e,this._parent):[e]}static \u0275fac=function(t){return new(t||n)(Ae(ae,9),Ae(st,10),Ae(Ht,10),Ae(vn,10),Ae(qr$1,8),Ae(dt,8),Ae(le,8),Ae(oi$1,8))};static \u0275dir=nr$1({type:n,selectors:[["","ngModel","",3,"formControlName","",3,"formControl",""]],inputs:{name:"name",isDisabled:[0,"disabled","isDisabled"],model:[0,"ngModel","model"],options:[0,"ngModelOptions","options"]},outputs:{update:"ngModelChange"},exportAs:["ngModel"],standalone:false,features:[PS([fo,lo]),uy,Xn$1,_b(null)]})}return n})();var mo=(()=>{class n extends ae{callSetDisabledState;get submitted(){return te(this._submittedReactive)}set submitted(e){this._submittedReactive.set(e);}_submitted=qa(()=>this._submittedReactive());_submittedReactive=oe(false);_oldForm;_onCollectionChange=()=>this._updateDomValue();directives=[];constructor(e,t,r){super(),this.callSetDisabledState=r,this._setValidators(e),this._setAsyncValidators(t);}ngOnChanges(e){this.onChanges(e);}ngOnDestroy(){this.onDestroy();}onChanges(e){this._checkFormPresent(),e.hasOwnProperty("form")&&(this._updateValidators(),this._updateDomValue(),this._updateRegistrations(),this._oldForm=this.form);}onDestroy(){this.form&&(rt(this.form,this),this.form._onCollectionChange===this._onCollectionChange&&this.form._registerOnCollectionChange(()=>{}));}get formDirective(){return this}get path(){return []}addControl(e){let t=this.form.get(e.path);return e._setupWithForm(t,this.callSetDisabledState),t.updateValueAndValidity({emitEvent:false}),this.directives.push(e),t}getControl(e){return this.form.get(e.path)}removeControl(e){mn(e.control||null,e,false),so(this.directives,e);}addFormGroup(e){this._setUpFormContainer(e);}removeFormGroup(e){this._cleanUpFormContainer(e);}getFormGroup(e){return this.form.get(e.path)}getFormArray(e){return this.form.get(e.path)}addFormArray(e){this._setUpFormContainer(e);}removeFormArray(e){this._cleanUpFormContainer(e);}updateModel(e,t){this.form.get(e.path).setValue(t);}onReset(){this.resetForm();}resetForm(e=void 0,t={}){this.form.reset(e,t),this._submittedReactive.set(false);}onSubmit(e){var t;return this.submitted=true,On(this.form,this.directives),this.ngSubmit.emit(e),this.form._events.next(new tt(this.control)),((t=e==null?void 0:e.target)==null?void 0:t.method)==="dialog"}_updateDomValue(){this.directives.forEach(e=>{let t=e.control,r=this.form.get(e.path);t!==r&&(mn(t||null,e),uo(r)&&e._setupWithForm(r,this.callSetDisabledState));}),this.form._updateTreeValidity({emitEvent:false});}_setUpFormContainer(e){let t=this.form.get(e.path);Nn(t,e),t.updateValueAndValidity({emitEvent:false});}_cleanUpFormContainer(e){var r;let t=(r=this.form)==null?void 0:r.get(e.path);t&&no(t,e)&&t.updateValueAndValidity({emitEvent:false});}_updateRegistrations(){var e;this.form._registerOnCollectionChange(this._onCollectionChange),(e=this._oldForm)==null||e._registerOnCollectionChange(()=>{});}_updateValidators(){Ut(this.form,this),this._oldForm&&rt(this._oldForm,this);}_checkFormPresent(){this.form;}static \u0275fac=function(t){return new(t||n)(Ae(st,10),Ae(Ht,10),Ae(dt,8))};static \u0275dir=nr$1({type:n,features:[uy,Xn$1]})}return n})();var ho={provide:ae,useExisting:Ts(()=>Wt)},Wt=(()=>{class n extends mo{form=null;ngSubmit=new Te$1;get control(){return this.form}static \u0275fac=(()=>{let e;return function(r){return (e||(e=Bg(n)))(r||n)}})();static \u0275dir=nr$1({type:n,selectors:[["","formGroup",""]],hostBindings:function(t,r){t&1&&Va("submit",function(a){return r.onSubmit(a)})("reset",function(){return r.onReset()});},inputs:{form:[0,"formGroup","form"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:false,features:[PS([ho]),uy]})}return n})();var po=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=zt$1({type:n});static \u0275inj=yt$1({})}return n})();var ct=(()=>{class n{static withConfig(e){var t;return {ngModule:n,providers:[{provide:dt,useValue:(t=e.callSetDisabledState)!=null?t:zt}]}}static \u0275fac=function(t){return new(t||n)};static \u0275mod=zt$1({type:n});static \u0275inj=yt$1({imports:[po]})}return n})();function $t(n,i=0){return _o(n)?Number(n):arguments.length===2?i:0}function _o(n){return !isNaN(parseFloat(n))&&!isNaN(Number(n))}function se(n){return n instanceof Vt?n.nativeElement:n}function ge(n){return n!=null&&`${n}`!="false"}var Kt;function vo(){if(Kt==null){let n=typeof document<"u"?document.head:null;Kt=!!(n&&(n.createShadowRoot||n.attachShadow));}return Kt}function Ln(n){if(vo()){let i=n.getRootNode?n.getRootNode():null;if(typeof ShadowRoot<"u"&&ShadowRoot&&i instanceof ShadowRoot)return i}return null}function _e(n){if(n.composedPath)try{return n.composedPath()[0]}catch(i){}return n.target}var Oe;function bo(){if(Oe==null&&typeof window<"u")try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:()=>Oe=!0}));}finally{Oe=Oe||false;}return Oe}function Hn(n){return bo()?n:!!n.capture}var ve,jn=["color","button","checkbox","date","datetime-local","email","file","hidden","image","month","number","password","radio","range","reset","search","submit","tel","text","time","url","week"];function Zt(){if(ve)return ve;if(typeof document!="object"||!document)return ve=new Set(jn),ve;let n=document.createElement("input");return ve=new Set(jn.filter(i=>(n.setAttribute("type",i),n.type===i))),ve}var ut=new WeakMap,be=(()=>{class n{_appRef;_injector=g(le);_environmentInjector=g(X);load(e){let t=this._appRef=this._appRef||this._injector.get(Tt),r=ut.get(t);r||(r={loaders:new Set,refs:[]},ut.set(t,r),t.onDestroy(()=>{var o;(o=ut.get(t))==null||o.refs.forEach(a=>a.destroy()),ut.delete(t);})),r.loaders.has(e)||(r.loaders.add(e),r.refs.push(AH(e,{environmentInjector:this._environmentInjector})));}static \u0275fac=function(t){return new(t||n)};static \u0275prov=z({token:n,factory:n.\u0275fac})}return n})();var Bn=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275cmp=kd({type:n,selectors:[["ng-component"]],hostAttrs:["cdk-text-field-style-loader",""],decls:0,vars:0,template:function(t,r){},styles:[`textarea.cdk-textarea-autosize {
  resize: none;
}

textarea.cdk-textarea-autosize-measuring {
  padding: 2px 0 !important;
  box-sizing: content-box !important;
  height: auto !important;
  overflow: hidden !important;
}

textarea.cdk-textarea-autosize-measuring-firefox {
  padding: 2px 0 !important;
  box-sizing: content-box !important;
  height: 0 !important;
}

@keyframes cdk-text-field-autofill-start { /*!*/ }
@keyframes cdk-text-field-autofill-end { /*!*/ }
.cdk-text-field-autofill-monitored:-webkit-autofill {
  animation: cdk-text-field-autofill-start 0s 1ms;
}

.cdk-text-field-autofill-monitored:not(:-webkit-autofill) {
  animation: cdk-text-field-autofill-end 0s 1ms;
}
`],encapsulation:2})}return n})(),yo={passive:true},zn=(()=>{class n{_platform=g(A);_ngZone=g(V);_renderer=g(Yn$1).createRenderer(null,null);_styleLoader=g(be);_monitoredElements=new Map;monitor(e){if(!this._platform.isBrowser)return ce;this._styleLoader.load(Bn);let t=se(e),r=this._monitoredElements.get(t);if(r)return r.subject;let o=new re,a="cdk-text-field-autofilled",l=$=>{$.animationName==="cdk-text-field-autofill-start"&&!t.classList.contains(a)?(t.classList.add(a),this._ngZone.run(()=>o.next({target:$.target,isAutofilled:true}))):$.animationName==="cdk-text-field-autofill-end"&&t.classList.contains(a)&&(t.classList.remove(a),this._ngZone.run(()=>o.next({target:$.target,isAutofilled:false})));},v=this._ngZone.runOutsideAngular(()=>(t.classList.add("cdk-text-field-autofill-monitored"),this._renderer.listen(t,"animationstart",l,yo)));return this._monitoredElements.set(t,{subject:o,unlisten:v}),o}stopMonitoring(e){let t=se(e),r=this._monitoredElements.get(t);r&&(r.unlisten(),r.subject.complete(),t.classList.remove("cdk-text-field-autofill-monitored"),t.classList.remove("cdk-text-field-autofilled"),this._monitoredElements.delete(t));}ngOnDestroy(){this._monitoredElements.forEach((e,t)=>this.stopMonitoring(t));}static \u0275fac=function(t){return new(t||n)};static \u0275prov=z({token:n,factory:n.\u0275fac})}return n})();var Un=(()=>{class n{_elementRef=g(Vt);_platform=g(A);_ngZone=g(V);_renderer=g(oi$1);_resizeEvents=new re;_previousValue;_initialHeight;_destroyed=new re;_listenerCleanups;_minRows;_maxRows;_enabled=true;_previousMinRows=-1;_textareaElement;get minRows(){return this._minRows}set minRows(e){this._minRows=$t(e),this._setMinHeight();}get maxRows(){return this._maxRows}set maxRows(e){this._maxRows=$t(e),this._setMaxHeight();}get enabled(){return this._enabled}set enabled(e){this._enabled!==e&&((this._enabled=e)?this.resizeToFitContent(true):this.reset());}get placeholder(){return this._textareaElement.placeholder}set placeholder(e){this._cachedPlaceholderHeight=void 0,e?this._textareaElement.setAttribute("placeholder",e):this._textareaElement.removeAttribute("placeholder"),this._cacheTextareaPlaceholderHeight();}_cachedLineHeight;_cachedPlaceholderHeight;_document=g(K);_hasFocus=false;_isViewInited=false;constructor(){g(be).load(Bn),this._textareaElement=this._elementRef.nativeElement;}_setMinHeight(){let e=this.minRows&&this._cachedLineHeight?`${this.minRows*this._cachedLineHeight}px`:null;e&&(this._textareaElement.style.minHeight=e);}_setMaxHeight(){let e=this.maxRows&&this._cachedLineHeight?`${this.maxRows*this._cachedLineHeight}px`:null;e&&(this._textareaElement.style.maxHeight=e);}ngAfterViewInit(){this._platform.isBrowser&&(this._initialHeight=this._textareaElement.style.height,this.resizeToFitContent(),this._ngZone.runOutsideAngular(()=>{this._listenerCleanups=[this._renderer.listen("window","resize",()=>this._resizeEvents.next()),this._renderer.listen(this._textareaElement,"focus",this._handleFocusEvent),this._renderer.listen(this._textareaElement,"blur",this._handleFocusEvent)],this._resizeEvents.pipe(DE(16)).subscribe(()=>{this._cachedLineHeight=this._cachedPlaceholderHeight=void 0,this.resizeToFitContent(true);});}),this._isViewInited=true,this.resizeToFitContent(true));}ngOnDestroy(){var e;(e=this._listenerCleanups)==null||e.forEach(t=>t()),this._resizeEvents.complete(),this._destroyed.next(),this._destroyed.complete();}_cacheTextareaLineHeight(){if(this._cachedLineHeight)return;let e=this._textareaElement.cloneNode(false),t=e.style;e.rows=1,t.position="absolute",t.visibility="hidden",t.border="none",t.padding="0",t.height="",t.minHeight="",t.maxHeight="",t.top=t.bottom=t.left=t.right="auto",t.overflow="hidden",this._textareaElement.parentNode.appendChild(e),this._cachedLineHeight=e.clientHeight,e.remove(),this._setMinHeight(),this._setMaxHeight();}_measureScrollHeight(){let e=this._textareaElement,t=e.style.marginBottom||"",r=this._platform.FIREFOX,o=this._hasFocus,a=r?"cdk-textarea-autosize-measuring-firefox":"cdk-textarea-autosize-measuring";o&&(e.style.marginBottom=`${e.clientHeight}px`),e.classList.add(a);let l=e.scrollHeight-4;return e.classList.remove(a),o&&(e.style.marginBottom=t),l}_cacheTextareaPlaceholderHeight(){if(!this._isViewInited||this._cachedPlaceholderHeight!=null)return;if(!this.placeholder){this._cachedPlaceholderHeight=0;return}let e=this._textareaElement.value;this._textareaElement.value=this._textareaElement.placeholder,this._cachedPlaceholderHeight=this._measureScrollHeight(),this._textareaElement.value=e;}_handleFocusEvent=e=>{this._hasFocus=e.type==="focus";};ngDoCheck(){this._platform.isBrowser&&this.resizeToFitContent();}resizeToFitContent(e=false){if(!this._enabled||(this._cacheTextareaLineHeight(),this._cacheTextareaPlaceholderHeight(),!this._cachedLineHeight))return;let t=this._elementRef.nativeElement,r=t.value;if(!e&&this._minRows===this._previousMinRows&&r===this._previousValue)return;let o=this._measureScrollHeight(),a=Math.max(o,this._cachedPlaceholderHeight||0);t.style.height=`${a}px`,this._ngZone.runOutsideAngular(()=>{typeof requestAnimationFrame<"u"?requestAnimationFrame(()=>this._scrollToCaretPosition(t)):setTimeout(()=>this._scrollToCaretPosition(t));}),this._previousValue=r,this._previousMinRows=this._minRows;}reset(){this._initialHeight!==void 0&&(this._textareaElement.style.height=this._initialHeight);}_noopInputHandler(){}_scrollToCaretPosition(e){let{selectionStart:t,selectionEnd:r}=e;!this._destroyed.isStopped&&this._hasFocus&&e.setSelectionRange(t,r);}static \u0275fac=function(t){return new(t||n)};static \u0275dir=nr$1({type:n,selectors:[["textarea","cdkTextareaAutosize",""]],hostAttrs:["rows","1",1,"cdk-textarea-autosize"],hostBindings:function(t,r){t&1&&Va("input",function(){return r._noopInputHandler()});},inputs:{minRows:[0,"cdkAutosizeMinRows","minRows"],maxRows:[0,"cdkAutosizeMaxRows","maxRows"],enabled:[2,"cdkTextareaAutosize","enabled",di$1],placeholder:"placeholder"},exportAs:["cdkTextareaAutosize"]})}return n})(),Gn=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=zt$1({type:n});static \u0275inj=yt$1({})}return n})();function qn(n){return n.buttons===0||n.detail===0}function Wn(n){let i=n.touches&&n.touches[0]||n.changedTouches&&n.changedTouches[0];return !!i&&i.identifier===-1&&(i.radiusX==null||i.radiusX===1)&&(i.radiusY==null||i.radiusY===1)}var $n=new E("cdk-input-modality-detector-options"),Kn={ignoreKeys:[18,17,224,91,16]},Zn=650,Qt={passive:true,capture:true},Qn=(()=>{class n{_platform=g(A);_listenerCleanups;modalityDetected;modalityChanged;get mostRecentModality(){return this._modality.value}_mostRecentTarget=null;_modality=new me$1(null);_options;_lastTouchMs=0;_onKeydown=e=>{var t,r;(r=(t=this._options)==null?void 0:t.ignoreKeys)!=null&&r.some(o=>o===e.keyCode)||(this._modality.next("keyboard"),this._mostRecentTarget=_e(e));};_onMousedown=e=>{Date.now()-this._lastTouchMs<Zn||(this._modality.next(qn(e)?"keyboard":"mouse"),this._mostRecentTarget=_e(e));};_onTouchstart=e=>{if(Wn(e)){this._modality.next("keyboard");return}this._lastTouchMs=Date.now(),this._modality.next("touch"),this._mostRecentTarget=_e(e);};constructor(){let e=g(V),t=g(K),r=g($n,{optional:true});if(this._options=y(y({},Kn),r),this.modalityDetected=this._modality.pipe(SE(1)),this.modalityChanged=this.modalityDetected.pipe(IE()),this._platform.isBrowser){let o=g(Yn$1).createRenderer(null,null);this._listenerCleanups=e.runOutsideAngular(()=>[o.listen(t,"keydown",this._onKeydown,Qt),o.listen(t,"mousedown",this._onMousedown,Qt),o.listen(t,"touchstart",this._onTouchstart,Qt)]);}}ngOnDestroy(){var e;this._modality.complete(),(e=this._listenerCleanups)==null||e.forEach(t=>t());}static \u0275fac=function(t){return new(t||n)};static \u0275prov=z({token:n,factory:n.\u0275fac})}return n})(),Pe=(function(n){return n[n.IMMEDIATE=0]="IMMEDIATE",n[n.EVENTUAL=1]="EVENTUAL",n})(Pe||{}),Yn=new E("cdk-focus-monitor-default-options"),ft=Hn({passive:true,capture:true}),Yt=(()=>{class n{_ngZone=g(V);_platform=g(A);_inputModalityDetector=g(Qn);_origin=null;_lastFocusOrigin=null;_windowFocused=false;_windowFocusTimeoutId;_originTimeoutId;_originFromTouchInteraction=false;_elementInfo=new Map;_monitoredElementCount=0;_rootNodeFocusListenerCount=new Map;_detectionMode;_windowFocusListener=()=>{this._windowFocused=true,this._windowFocusTimeoutId=setTimeout(()=>this._windowFocused=false);};_document=g(K);_stopInputModalityDetector=new re;constructor(){let e=g(Yn,{optional:true});this._detectionMode=(e==null?void 0:e.detectionMode)||Pe.IMMEDIATE;}_rootNodeFocusAndBlurListener=e=>{let t=_e(e);for(let r=t;r;r=r.parentElement)e.type==="focus"?this._onFocus(e,r):this._onBlur(e,r);};monitor(e,t=false){let r=se(e);if(!this._platform.isBrowser||r.nodeType!==1)return _();let o=Ln(r)||this._document,a=this._elementInfo.get(r);if(a)return t&&(a.checkChildren=true),a.subject;let l={checkChildren:t,subject:new re,rootNode:o};return this._elementInfo.set(r,l),this._registerGlobalListeners(l),l.subject}stopMonitoring(e){let t=se(e),r=this._elementInfo.get(t);r&&(r.subject.complete(),this._setClasses(t),this._elementInfo.delete(t),this._removeGlobalListeners(r));}focusVia(e,t,r){let o=se(e),a=this._document.activeElement;o===a?this._getClosestElementsInfo(o).forEach(([l,v])=>this._originChanged(l,t,v)):(this._setOrigin(t),typeof o.focus=="function"&&o.focus(r));}ngOnDestroy(){this._elementInfo.forEach((e,t)=>this.stopMonitoring(t));}_getWindow(){return this._document.defaultView||window}_getFocusOrigin(e){return this._origin?this._originFromTouchInteraction?this._shouldBeAttributedToTouch(e)?"touch":"program":this._origin:this._windowFocused&&this._lastFocusOrigin?this._lastFocusOrigin:e&&this._isLastInteractionFromInputLabel(e)?"mouse":"program"}_shouldBeAttributedToTouch(e){return this._detectionMode===Pe.EVENTUAL||!!(e!=null&&e.contains(this._inputModalityDetector._mostRecentTarget))}_setClasses(e,t){e.classList.toggle("cdk-focused",!!t),e.classList.toggle("cdk-touch-focused",t==="touch"),e.classList.toggle("cdk-keyboard-focused",t==="keyboard"),e.classList.toggle("cdk-mouse-focused",t==="mouse"),e.classList.toggle("cdk-program-focused",t==="program");}_setOrigin(e,t=false){this._ngZone.runOutsideAngular(()=>{if(this._origin=e,this._originFromTouchInteraction=e==="touch"&&t,this._detectionMode===Pe.IMMEDIATE){clearTimeout(this._originTimeoutId);let r=this._originFromTouchInteraction?Zn:1;this._originTimeoutId=setTimeout(()=>this._origin=null,r);}});}_onFocus(e,t){let r=this._elementInfo.get(t),o=_e(e);!r||!r.checkChildren&&t!==o||this._originChanged(t,this._getFocusOrigin(o),r);}_onBlur(e,t){let r=this._elementInfo.get(t);!r||r.checkChildren&&e.relatedTarget instanceof Node&&t.contains(e.relatedTarget)||(this._setClasses(t),this._emitOrigin(r,null));}_emitOrigin(e,t){e.subject.observers.length&&this._ngZone.run(()=>e.subject.next(t));}_registerGlobalListeners(e){if(!this._platform.isBrowser)return;let t=e.rootNode,r=this._rootNodeFocusListenerCount.get(t)||0;r||this._ngZone.runOutsideAngular(()=>{t.addEventListener("focus",this._rootNodeFocusAndBlurListener,ft),t.addEventListener("blur",this._rootNodeFocusAndBlurListener,ft);}),this._rootNodeFocusListenerCount.set(t,r+1),++this._monitoredElementCount===1&&(this._ngZone.runOutsideAngular(()=>{this._getWindow().addEventListener("focus",this._windowFocusListener);}),this._inputModalityDetector.modalityDetected.pipe(Co$1(this._stopInputModalityDetector)).subscribe(o=>{this._setOrigin(o,true);}));}_removeGlobalListeners(e){let t=e.rootNode;if(this._rootNodeFocusListenerCount.has(t)){let r=this._rootNodeFocusListenerCount.get(t);r>1?this._rootNodeFocusListenerCount.set(t,r-1):(t.removeEventListener("focus",this._rootNodeFocusAndBlurListener,ft),t.removeEventListener("blur",this._rootNodeFocusAndBlurListener,ft),this._rootNodeFocusListenerCount.delete(t));}--this._monitoredElementCount||(this._getWindow().removeEventListener("focus",this._windowFocusListener),this._stopInputModalityDetector.next(),clearTimeout(this._windowFocusTimeoutId),clearTimeout(this._originTimeoutId));}_originChanged(e,t,r){this._setClasses(e,t),this._emitOrigin(r,t),this._lastFocusOrigin=t;}_getClosestElementsInfo(e){let t=[];return this._elementInfo.forEach((r,o)=>{(o===e||r.checkChildren&&o.contains(e))&&t.push([o,r]);}),t}_isLastInteractionFromInputLabel(e){let{_mostRecentTarget:t,mostRecentModality:r}=this._inputModalityDetector;if(r!=="mouse"||!t||t===e||e.nodeName!=="INPUT"&&e.nodeName!=="TEXTAREA"||e.disabled)return  false;let o=e.labels;if(o){for(let a=0;a<o.length;a++)if(o[a].contains(t))return  true}return  false}static \u0275fac=function(t){return new(t||n)};static \u0275prov=z({token:n,factory:n.\u0275fac})}return n})();var xo=(()=>{class n{create(e){return typeof MutationObserver>"u"?null:new MutationObserver(e)}static \u0275fac=function(t){return new(t||n)};static \u0275prov=z({token:n,factory:n.\u0275fac})}return n})();var Xn=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=zt$1({type:n});static \u0275inj=yt$1({providers:[xo]})}return n})();var Co=200,mt=class{_letterKeyStream=new re;_items=[];_selectedItemIndex=-1;_pressedLetters=[];_skipPredicateFn;_selectedItem=new re;selectedItem=this._selectedItem;constructor(i,e){let t=typeof(e==null?void 0:e.debounceInterval)=="number"?e.debounceInterval:Co;e!=null&&e.skipPredicate&&(this._skipPredicateFn=e.skipPredicate),this.setItems(i),this._setupKeyHandler(t);}destroy(){this._pressedLetters=[],this._letterKeyStream.complete(),this._selectedItem.complete();}setCurrentSelectedItemIndex(i){this._selectedItemIndex=i;}setItems(i){this._items=i;}handleKey(i){let e=i.keyCode;i.key&&i.key.length===1?this._letterKeyStream.next(i.key.toLocaleUpperCase()):(e>=65&&e<=90||e>=48&&e<=57)&&this._letterKeyStream.next(String.fromCharCode(e));}isTyping(){return this._pressedLetters.length>0}reset(){this._pressedLetters=[];}_setupKeyHandler(i){this._letterKeyStream.pipe(xe(e=>this._pressedLetters.push(e)),EE(i),Ce(()=>this._pressedLetters.length>0),Y(()=>this._pressedLetters.join("").toLocaleUpperCase())).subscribe(e=>{var t,r;for(let o=1;o<this._items.length+1;o++){let a=(this._selectedItemIndex+o)%this._items.length,l=this._items[a];if(!((t=this._skipPredicateFn)!=null&&t.call(this,l))&&((r=l.getLabel)==null?void 0:r.call(l).toLocaleUpperCase().trim().indexOf(e))===0){this._selectedItem.next(l);break}}this._pressedLetters=[];});}};function ht(n,...i){return i.length?i.some(e=>n[e]):n.altKey||n.shiftKey||n.ctrlKey||n.metaKey}var pt=class{_items;_activeItemIndex=oe(-1);_activeItem=oe(null);_wrap=false;_typeaheadSubscription=se$1.EMPTY;_itemChangesSubscription;_vertical=true;_horizontal=null;_allowedModifierKeys=[];_homeAndEnd=false;_pageUpAndDown={enabled:false,delta:10};_effectRef;_typeahead;_skipPredicateFn=i=>i.disabled;constructor(i,e){this._items=i,i instanceof ua$1?this._itemChangesSubscription=i.changes.subscribe(t=>this._itemsChanged(t.toArray())):Ho$1(i)&&(this._effectRef=$p(()=>this._itemsChanged(i()),{injector:e}));}tabOut=new re;change=new re;skipPredicate(i){return this._skipPredicateFn=i,this}withWrap(i=true){return this._wrap=i,this}withVerticalOrientation(i=true){return this._vertical=i,this}withHorizontalOrientation(i){return this._horizontal=i,this}withAllowedModifierKeys(i){return this._allowedModifierKeys=i,this}withTypeAhead(i=200){this._typeaheadSubscription.unsubscribe();let e=this._getItemsArray();return this._typeahead=new mt(e,{debounceInterval:typeof i=="number"?i:void 0,skipPredicate:t=>this._skipPredicateFn(t)}),this._typeaheadSubscription=this._typeahead.selectedItem.subscribe(t=>{this.setActiveItem(t);}),this}cancelTypeahead(){var i;return (i=this._typeahead)==null||i.reset(),this}withHomeAndEnd(i=true){return this._homeAndEnd=i,this}withPageUpDown(i=true,e=10){return this._pageUpAndDown={enabled:i,delta:e},this}setActiveItem(i){let e=this._activeItem();this.updateActiveItem(i),this._activeItem()!==e&&this.change.next(this._activeItemIndex());}onKeydown(i){var o,a;let e=i.keyCode,r=["altKey","ctrlKey","metaKey","shiftKey"].every(l=>!i[l]||this._allowedModifierKeys.indexOf(l)>-1);switch(e){case 9:this.tabOut.next();return;case 40:if(this._vertical&&r){this.setNextItemActive();break}else return;case 38:if(this._vertical&&r){this.setPreviousItemActive();break}else return;case 39:if(this._horizontal&&r){this._horizontal==="rtl"?this.setPreviousItemActive():this.setNextItemActive();break}else return;case 37:if(this._horizontal&&r){this._horizontal==="rtl"?this.setNextItemActive():this.setPreviousItemActive();break}else return;case 36:if(this._homeAndEnd&&r){this.setFirstItemActive();break}else return;case 35:if(this._homeAndEnd&&r){this.setLastItemActive();break}else return;case 33:if(this._pageUpAndDown.enabled&&r){let l=this._activeItemIndex()-this._pageUpAndDown.delta;this._setActiveItemByIndex(l>0?l:0,1);break}else return;case 34:if(this._pageUpAndDown.enabled&&r){let l=this._activeItemIndex()+this._pageUpAndDown.delta,v=this._getItemsArray().length;this._setActiveItemByIndex(l<v?l:v-1,-1);break}else return;default:(r||ht(i,"shiftKey"))&&((o=this._typeahead)==null||o.handleKey(i));return}(a=this._typeahead)==null||a.reset(),i.preventDefault();}get activeItemIndex(){return this._activeItemIndex()}get activeItem(){return this._activeItem()}isTyping(){return !!this._typeahead&&this._typeahead.isTyping()}setFirstItemActive(){this._setActiveItemByIndex(0,1);}setLastItemActive(){this._setActiveItemByIndex(this._getItemsArray().length-1,-1);}setNextItemActive(){this._activeItemIndex()<0?this.setFirstItemActive():this._setActiveItemByDelta(1);}setPreviousItemActive(){this._activeItemIndex()<0&&this._wrap?this.setLastItemActive():this._setActiveItemByDelta(-1);}updateActiveItem(i){var o;let e=this._getItemsArray(),t=typeof i=="number"?i:e.indexOf(i),r=e[t];this._activeItem.set(r==null?null:r),this._activeItemIndex.set(t),(o=this._typeahead)==null||o.setCurrentSelectedItemIndex(t);}destroy(){var i,e,t;this._typeaheadSubscription.unsubscribe(),(i=this._itemChangesSubscription)==null||i.unsubscribe(),(e=this._effectRef)==null||e.destroy(),(t=this._typeahead)==null||t.destroy(),this.tabOut.complete(),this.change.complete();}_setActiveItemByDelta(i){this._wrap?this._setActiveInWrapMode(i):this._setActiveInDefaultMode(i);}_setActiveInWrapMode(i){let e=this._getItemsArray();for(let t=1;t<=e.length;t++){let r=(this._activeItemIndex()+i*t+e.length)%e.length,o=e[r];if(!this._skipPredicateFn(o)){this.setActiveItem(r);return}}}_setActiveInDefaultMode(i){this._setActiveItemByIndex(this._activeItemIndex()+i,i);}_setActiveItemByIndex(i,e){let t=this._getItemsArray();if(t[i]){for(;this._skipPredicateFn(t[i]);)if(i+=e,!t[i])return;this.setActiveItem(i);}}_getItemsArray(){return Ho$1(this._items)?this._items():this._items instanceof ua$1?this._items.toArray():this._items}_itemsChanged(i){var t,r;(t=this._typeahead)==null||t.setItems(i);let e=this._activeItem();if(e){let o=i.indexOf(e);o>-1&&o!==this._activeItemIndex()&&(this._activeItemIndex.set(o),(r=this._typeahead)==null||r.setCurrentSelectedItemIndex(o));}}};var ke=class extends pt{_origin="program";setFocusOrigin(i){return this._origin=i,this}setActiveItem(i){super.setActiveItem(i),this.activeItem&&this.activeItem.focus(this._origin);}};var Jn=new Map,k=class n{_appId=g(jo$1);static _infix=`a${Math.floor(Math.random()*1e5).toString()}`;getId(i,e=false){this._appId!=="ng"&&(i+=this._appId);let t=Jn.get(i);return t===void 0?t=0:t++,Jn.set(i,t),`${i}${e?n._infix+"-":""}${t}`}static \u0275fac=function(e){return new(e||n)};static \u0275prov=z({token:n,factory:n.\u0275fac})};var er=new E("MAT_INPUT_VALUE_ACCESSOR");var Mo=new E("cdk-dir-doc",{providedIn:"root",factory:()=>g(K)}),Eo=/^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;function tr(n){let i=(n==null?void 0:n.toLowerCase())||"";return i==="auto"&&typeof navigator<"u"&&(navigator!=null&&navigator.language)?Eo.test(navigator.language)?"rtl":"ltr":i==="rtl"?"rtl":"ltr"}var Xt=(()=>{class n{get value(){return this.valueSignal()}valueSignal=oe("ltr");change=new Te$1;constructor(){let e=g(Mo,{optional:true});if(e){let t=e.body?e.body.dir:null,r=e.documentElement?e.documentElement.dir:null;this.valueSignal.set(tr(t||r||"ltr"));}}ngOnDestroy(){this.change.complete();}static \u0275fac=function(t){return new(t||n)};static \u0275prov=z({token:n,factory:n.\u0275fac})}return n})();var ye=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=zt$1({type:n});static \u0275inj=yt$1({})}return n})();var Jt=class{_box;_destroyed=new re;_resizeSubject=new re;_resizeObserver;_elementObservables=new Map;constructor(i){this._box=i,typeof ResizeObserver<"u"&&(this._resizeObserver=new ResizeObserver(e=>this._resizeSubject.next(e)));}observe(i){return this._elementObservables.has(i)||this._elementObservables.set(i,new x(e=>{var r;let t=this._resizeSubject.subscribe(e);return (r=this._resizeObserver)==null||r.observe(i,{box:this._box}),()=>{var o;(o=this._resizeObserver)==null||o.unobserve(i),t.unsubscribe(),this._elementObservables.delete(i);}}).pipe(Ce(e=>e.some(t=>t.target===i)),ys({bufferSize:1,refCount:true}),Co$1(this._destroyed))),this._elementObservables.get(i)}destroy(){this._destroyed.next(),this._destroyed.complete(),this._resizeSubject.complete(),this._elementObservables.clear();}},ir=(()=>{class n{_cleanupErrorListener;_observers=new Map;_ngZone=g(V);constructor(){}ngOnDestroy(){var e;for(let[,t]of this._observers)t.destroy();this._observers.clear(),(e=this._cleanupErrorListener)==null||e.call(this);}observe(e,t){let r=(t==null?void 0:t.box)||"content-box";return this._observers.has(r)||this._observers.set(r,new Jt(r)),this._observers.get(r).observe(e)}static \u0275fac=function(t){return new(t||n)};static \u0275prov=z({token:n,factory:n.\u0275fac})}return n})();var wo=new E("MATERIAL_ANIMATIONS"),gt=null;function Do(){var n;return (n=g(wo,{optional:true}))!=null&&n.animationsDisabled||g(nI,{optional:true})==="NoopAnimations"?"di-disabled":(gt!=null||(gt=g(L).matchMedia("(prefers-reduced-motion)").matches),gt?"reduced-motion":"enabled")}function _t(){return Do()!=="enabled"}var Ao=["notch"],Fo=["*"],nr=["iconPrefixContainer"],rr=["textPrefixContainer"],or=["iconSuffixContainer"],ar=["textSuffixContainer"],Io=["textField"],So=["*",[["mat-label"]],[["","matPrefix",""],["","matIconPrefix",""]],[["","matTextPrefix",""]],[["","matTextSuffix",""]],[["","matSuffix",""],["","matIconSuffix",""]],[["mat-error"],["","matError",""]],[["mat-hint",3,"align","end"]],[["mat-hint","align","end"]]],Vo=["*","mat-label","[matPrefix], [matIconPrefix]","[matTextPrefix]","[matTextSuffix]","[matSuffix], [matIconSuffix]","mat-error, [matError]","mat-hint:not([align='end'])","mat-hint[align='end']"];function To(n,i){n&1&&$a(0,"span",21);}function Ro(n,i){if(n&1&&(wa(0,"label",20),nS(1,1),Bb(2,To,1,0,"span",21),Vd()),n&2){let e=Xb(2);py("floating",e._shouldLabelFloat())("monitorResize",e._hasOutline())("id",e._labelId),Ha("for",e._control.disableAutomaticLabeling?null:e._control.id),zw(2),Hb(!e.hideRequiredMarker&&e._control.required?2:-1);}}function No(n,i){if(n&1&&Bb(0,Ro,3,5,"label",20),n&2){let e=Xb();Hb(e._hasFloatingLabel()?0:-1);}}function Oo(n,i){n&1&&$a(0,"div",7);}function Po(n,i){}function ko(n,i){if(n&1&&dy(0,Po,0,0,"ng-template",13),n&2){Xb(2);let e=iS(1);py("ngTemplateOutlet",e);}}function Lo(n,i){if(n&1&&(wa(0,"div",9),Bb(1,ko,1,1,null,13),Vd()),n&2){let e=Xb();py("matFormFieldNotchedOutlineOpen",e._shouldLabelFloat()),zw(),Hb(e._forceDisplayInfixLabel()?-1:1);}}function Ho(n,i){n&1&&(wa(0,"div",10,2),nS(2,2),Vd());}function jo(n,i){n&1&&(wa(0,"div",11,3),nS(2,3),Vd());}function Bo(n,i){}function zo(n,i){if(n&1&&dy(0,Bo,0,0,"ng-template",13),n&2){Xb();let e=iS(1);py("ngTemplateOutlet",e);}}function Uo(n,i){n&1&&(wa(0,"div",14,4),nS(2,4),Vd());}function Go(n,i){n&1&&(wa(0,"div",15,5),nS(2,5),Vd());}function qo(n,i){n&1&&$a(0,"div",16);}function Wo(n,i){n&1&&(wa(0,"div",18),nS(1,6),Vd());}function $o(n,i){if(n&1&&(wa(0,"mat-hint",22),_S(1),Vd()),n&2){let e=Xb(2);py("id",e._hintLabelId),zw(),Py(e.hintLabel);}}function Ko(n,i){if(n&1&&(wa(0,"div",19),Bb(1,$o,2,2,"mat-hint",22),nS(2,7),$a(3,"div",23),nS(4,8),Vd()),n&2){let e=Xb();zw(),Hb(e.hintLabel?1:-1);}}var bt=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275dir=nr$1({type:n,selectors:[["mat-label"]]})}return n})(),Zo=new E("MatError");var yt=(()=>{class n{align="start";id=g(k).getId("mat-mdc-hint-");static \u0275fac=function(t){return new(t||n)};static \u0275dir=nr$1({type:n,selectors:[["mat-hint"]],hostAttrs:[1,"mat-mdc-form-field-hint","mat-mdc-form-field-bottom-align"],hostVars:4,hostBindings:function(t,r){t&2&&(vy("id",r.id),Ha("align",null),Ny("mat-mdc-form-field-hint-end",r.align==="end"));},inputs:{align:"align",id:"id"}})}return n})(),Qo=new E("MatPrefix");var Yo=new E("MatSuffix");var mr=new E("FloatingLabelParent"),sr=(()=>{class n{_elementRef=g(Vt);get floating(){return this._floating}set floating(e){this._floating=e,this.monitorResize&&this._handleResize();}_floating=false;get monitorResize(){return this._monitorResize}set monitorResize(e){this._monitorResize=e,this._monitorResize?this._subscribeToResize():this._resizeSubscription.unsubscribe();}_monitorResize=false;_resizeObserver=g(ir);_ngZone=g(V);_parent=g(mr);_resizeSubscription=new se$1;ngOnDestroy(){this._resizeSubscription.unsubscribe();}getWidth(){return Xo(this._elementRef.nativeElement)}get element(){return this._elementRef.nativeElement}_handleResize(){setTimeout(()=>this._parent._handleLabelResized());}_subscribeToResize(){this._resizeSubscription.unsubscribe(),this._ngZone.runOutsideAngular(()=>{this._resizeSubscription=this._resizeObserver.observe(this._elementRef.nativeElement,{box:"border-box"}).subscribe(()=>this._handleResize());});}static \u0275fac=function(t){return new(t||n)};static \u0275dir=nr$1({type:n,selectors:[["label","matFormFieldFloatingLabel",""]],hostAttrs:[1,"mdc-floating-label","mat-mdc-floating-label"],hostVars:2,hostBindings:function(t,r){t&2&&Ny("mdc-floating-label--float-above",r.floating);},inputs:{floating:"floating",monitorResize:"monitorResize"}})}return n})();function Xo(n){let i=n;if(i.offsetParent!==null)return i.scrollWidth;let e=i.cloneNode(true);e.style.setProperty("position","absolute"),e.style.setProperty("transform","translate(-9999px, -9999px)"),document.documentElement.appendChild(e);let t=e.scrollWidth;return e.remove(),t}var lr="mdc-line-ripple--active",vt="mdc-line-ripple--deactivating",dr=(()=>{class n{_elementRef=g(Vt);_cleanupTransitionEnd;constructor(){let e=g(V),t=g(oi$1);e.runOutsideAngular(()=>{this._cleanupTransitionEnd=t.listen(this._elementRef.nativeElement,"transitionend",this._handleTransitionEnd);});}activate(){let e=this._elementRef.nativeElement.classList;e.remove(vt),e.add(lr);}deactivate(){this._elementRef.nativeElement.classList.add(vt);}_handleTransitionEnd=e=>{let t=this._elementRef.nativeElement.classList,r=t.contains(vt);e.propertyName==="opacity"&&r&&t.remove(lr,vt);};ngOnDestroy(){this._cleanupTransitionEnd();}static \u0275fac=function(t){return new(t||n)};static \u0275dir=nr$1({type:n,selectors:[["div","matFormFieldLineRipple",""]],hostAttrs:[1,"mdc-line-ripple"]})}return n})(),cr=(()=>{class n{_elementRef=g(Vt);_ngZone=g(V);open=false;_notch;ngAfterViewInit(){let e=this._elementRef.nativeElement,t=e.querySelector(".mdc-floating-label");t?(e.classList.add("mdc-notched-outline--upgraded"),typeof requestAnimationFrame=="function"&&(t.style.transitionDuration="0s",this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>t.style.transitionDuration="");}))):e.classList.add("mdc-notched-outline--no-label");}_setNotchWidth(e){let t=this._notch.nativeElement;!this.open||!e?t.style.width="":t.style.width=`calc(${e}px * var(--mat-mdc-form-field-floating-label-scale, 0.75) + 9px)`;}_setMaxWidth(e){this._notch.nativeElement.style.setProperty("--mat-form-field-notch-max-width",`calc(100% - ${e}px)`);}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=kd({type:n,selectors:[["div","matFormFieldNotchedOutline",""]],viewQuery:function(t,r){if(t&1&&Iy(Ao,5),t&2){let o;wy(o=Cy())&&(r._notch=o.first);}},hostAttrs:[1,"mdc-notched-outline"],hostVars:2,hostBindings:function(t,r){t&2&&Ny("mdc-notched-outline--notched",r.open);},inputs:{open:[0,"matFormFieldNotchedOutlineOpen","open"]},ngContentSelectors:Fo,decls:5,vars:0,consts:[["notch",""],[1,"mat-mdc-notch-piece","mdc-notched-outline__leading"],[1,"mat-mdc-notch-piece","mdc-notched-outline__notch"],[1,"mat-mdc-notch-piece","mdc-notched-outline__trailing"]],template:function(t,r){t&1&&(tS(),gy(0,"div",1),zd(1,"div",2,0),nS(3),Gd(),gy(4,"div",3));},encapsulation:2})}return n})(),ei=(()=>{class n{value=null;stateChanges;id;placeholder;ngControl=null;focused=false;empty=false;shouldLabelFloat=false;required=false;disabled=false;errorState=false;controlType;autofilled;userAriaDescribedBy;disableAutomaticLabeling;describedByIds;static \u0275fac=function(t){return new(t||n)};static \u0275dir=nr$1({type:n})}return n})();var ti=new E("MatFormField"),Jo=new E("MAT_FORM_FIELD_DEFAULT_OPTIONS"),ur="fill",ea="auto",fr="fixed",ta="translateY(-50%)",Le=(()=>{class n{_elementRef=g(Vt);_changeDetectorRef=g(qr$1);_platform=g(A);_idGenerator=g(k);_ngZone=g(V);_defaults=g(Jo,{optional:true});_currentDirection;_textField;_iconPrefixContainer;_textPrefixContainer;_iconSuffixContainer;_textSuffixContainer;_floatingLabel;_notchedOutline;_lineRipple;_iconPrefixContainerSignal=SH("iconPrefixContainer");_textPrefixContainerSignal=SH("textPrefixContainer");_iconSuffixContainerSignal=SH("iconSuffixContainer");_textSuffixContainerSignal=SH("textSuffixContainer");_prefixSuffixContainers=qa(()=>[this._iconPrefixContainerSignal(),this._textPrefixContainerSignal(),this._iconSuffixContainerSignal(),this._textSuffixContainerSignal()].map(e=>e==null?void 0:e.nativeElement).filter(e=>e!==void 0));_formFieldControl;_prefixChildren;_suffixChildren;_errorChildren;_hintChildren;_labelChild=TH(bt);get hideRequiredMarker(){return this._hideRequiredMarker}set hideRequiredMarker(e){this._hideRequiredMarker=ge(e);}_hideRequiredMarker=false;color="primary";get floatLabel(){var e;return this._floatLabel||((e=this._defaults)==null?void 0:e.floatLabel)||ea}set floatLabel(e){e!==this._floatLabel&&(this._floatLabel=e,this._changeDetectorRef.markForCheck());}_floatLabel;get appearance(){return this._appearanceSignal()}set appearance(e){var r;let t=e||((r=this._defaults)==null?void 0:r.appearance)||ur;this._appearanceSignal.set(t);}_appearanceSignal=oe(ur);get subscriptSizing(){var e;return this._subscriptSizing||((e=this._defaults)==null?void 0:e.subscriptSizing)||fr}set subscriptSizing(e){var t;this._subscriptSizing=e||((t=this._defaults)==null?void 0:t.subscriptSizing)||fr;}_subscriptSizing=null;get hintLabel(){return this._hintLabel}set hintLabel(e){this._hintLabel=e,this._processHints();}_hintLabel="";_hasIconPrefix=false;_hasTextPrefix=false;_hasIconSuffix=false;_hasTextSuffix=false;_labelId=this._idGenerator.getId("mat-mdc-form-field-label-");_hintLabelId=this._idGenerator.getId("mat-mdc-hint-");_describedByIds;get _control(){return this._explicitFormFieldControl||this._formFieldControl}set _control(e){this._explicitFormFieldControl=e;}_destroyed=new re;_isFocused=null;_explicitFormFieldControl;_previousControl=null;_previousControlValidatorFn=null;_stateChanges;_valueChanges;_describedByChanges;_outlineLabelOffsetResizeObserver=null;_animationsDisabled=_t();constructor(){let e=this._defaults,t=g(Xt);e&&(e.appearance&&(this.appearance=e.appearance),this._hideRequiredMarker=!!(e!=null&&e.hideRequiredMarker),e.color&&(this.color=e.color)),$p(()=>this._currentDirection=t.valueSignal()),this._syncOutlineLabelOffset();}ngAfterViewInit(){this._updateFocusState(),this._animationsDisabled||this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this._elementRef.nativeElement.classList.add("mat-form-field-animations-enabled");},300);}),this._changeDetectorRef.detectChanges();}ngAfterContentInit(){this._assertFormFieldControl(),this._initializeSubscript(),this._initializePrefixAndSuffix();}ngAfterContentChecked(){this._assertFormFieldControl(),this._control!==this._previousControl&&(this._initializeControl(this._previousControl),this._control.ngControl&&this._control.ngControl.control&&(this._previousControlValidatorFn=this._control.ngControl.control.validator),this._previousControl=this._control),this._control.ngControl&&this._control.ngControl.control&&this._control.ngControl.control.validator!==this._previousControlValidatorFn&&this._changeDetectorRef.markForCheck();}ngOnDestroy(){var e,t,r,o;(e=this._outlineLabelOffsetResizeObserver)==null||e.disconnect(),(t=this._stateChanges)==null||t.unsubscribe(),(r=this._valueChanges)==null||r.unsubscribe(),(o=this._describedByChanges)==null||o.unsubscribe(),this._destroyed.next(),this._destroyed.complete();}getLabelId=qa(()=>this._hasFloatingLabel()?this._labelId:null);getConnectedOverlayOrigin(){return this._textField||this._elementRef}_animateAndLockLabel(){this._hasFloatingLabel()&&(this.floatLabel="always");}_initializeControl(e){var o,a,l;let t=this._control,r="mat-mdc-form-field-type-";e&&this._elementRef.nativeElement.classList.remove(r+e.controlType),t.controlType&&this._elementRef.nativeElement.classList.add(r+t.controlType),(o=this._stateChanges)==null||o.unsubscribe(),this._stateChanges=t.stateChanges.subscribe(()=>{this._updateFocusState(),this._changeDetectorRef.markForCheck();}),(a=this._describedByChanges)==null||a.unsubscribe(),this._describedByChanges=t.stateChanges.pipe(gu([void 0,void 0]),Y(()=>[t.errorState,t.userAriaDescribedBy]),bE(),Ce(([[v,$],[Ct,Mt]])=>v!==Ct||$!==Mt)).subscribe(()=>this._syncDescribedByIds()),(l=this._valueChanges)==null||l.unsubscribe(),t.ngControl&&t.ngControl.valueChanges&&(this._valueChanges=t.ngControl.valueChanges.pipe(Co$1(this._destroyed)).subscribe(()=>this._changeDetectorRef.markForCheck()));}_checkPrefixAndSuffixTypes(){this._hasIconPrefix=!!this._prefixChildren.find(e=>!e._isText),this._hasTextPrefix=!!this._prefixChildren.find(e=>e._isText),this._hasIconSuffix=!!this._suffixChildren.find(e=>!e._isText),this._hasTextSuffix=!!this._suffixChildren.find(e=>e._isText);}_initializePrefixAndSuffix(){this._checkPrefixAndSuffixTypes(),vE(this._prefixChildren.changes,this._suffixChildren.changes).subscribe(()=>{this._checkPrefixAndSuffixTypes(),this._changeDetectorRef.markForCheck();});}_initializeSubscript(){this._hintChildren.changes.subscribe(()=>{this._processHints(),this._changeDetectorRef.markForCheck();}),this._errorChildren.changes.subscribe(()=>{this._syncDescribedByIds(),this._changeDetectorRef.markForCheck();}),this._validateHints(),this._syncDescribedByIds();}_assertFormFieldControl(){this._control;}_updateFocusState(){var t,r,o;let e=this._control.focused;e&&!this._isFocused?(this._isFocused=true,(t=this._lineRipple)==null||t.activate()):!e&&(this._isFocused||this._isFocused===null)&&(this._isFocused=false,(r=this._lineRipple)==null||r.deactivate()),this._elementRef.nativeElement.classList.toggle("mat-focused",e),(o=this._textField)==null||o.nativeElement.classList.toggle("mdc-text-field--focused",e);}_syncOutlineLabelOffset(){NH({earlyRead:()=>{var e;if(this._appearanceSignal()!=="outline")return (e=this._outlineLabelOffsetResizeObserver)==null||e.disconnect(),null;if(globalThis.ResizeObserver){this._outlineLabelOffsetResizeObserver||(this._outlineLabelOffsetResizeObserver=new globalThis.ResizeObserver(()=>{this._writeOutlinedLabelStyles(this._getOutlinedLabelOffset());}));for(let t of this._prefixSuffixContainers())this._outlineLabelOffsetResizeObserver.observe(t,{box:"border-box"});}return this._getOutlinedLabelOffset()},write:e=>this._writeOutlinedLabelStyles(e())});}_shouldAlwaysFloat(){return this.floatLabel==="always"}_hasOutline(){return this.appearance==="outline"}_forceDisplayInfixLabel(){return !this._platform.isBrowser&&this._prefixChildren.length&&!this._shouldLabelFloat()}_hasFloatingLabel=qa(()=>!!this._labelChild());_shouldLabelFloat(){return this._hasFloatingLabel()?this._control.shouldLabelFloat||this._shouldAlwaysFloat():false}_shouldForward(e){let t=this._control?this._control.ngControl:null;return t&&t[e]}_getSubscriptMessageType(){return this._errorChildren&&this._errorChildren.length>0&&this._control.errorState?"error":"hint"}_handleLabelResized(){this._refreshOutlineNotchWidth();}_refreshOutlineNotchWidth(){var e,t;!this._hasOutline()||!this._floatingLabel||!this._shouldLabelFloat()?(e=this._notchedOutline)==null||e._setNotchWidth(0):(t=this._notchedOutline)==null||t._setNotchWidth(this._floatingLabel.getWidth());}_processHints(){this._validateHints(),this._syncDescribedByIds();}_validateHints(){this._hintChildren;}_syncDescribedByIds(){if(this._control){let e=[];if(this._control.userAriaDescribedBy&&typeof this._control.userAriaDescribedBy=="string"&&e.push(...this._control.userAriaDescribedBy.split(" ")),this._getSubscriptMessageType()==="hint"){let o=this._hintChildren?this._hintChildren.find(l=>l.align==="start"):null,a=this._hintChildren?this._hintChildren.find(l=>l.align==="end"):null;o?e.push(o.id):this._hintLabel&&e.push(this._hintLabelId),a&&e.push(a.id);}else this._errorChildren&&e.push(...this._errorChildren.map(o=>o.id));let t=this._control.describedByIds,r;if(t){let o=this._describedByIds||e;r=e.concat(t.filter(a=>a&&!o.includes(a)));}else r=e;this._control.setDescribedByIds(r),this._describedByIds=e;}}_getOutlinedLabelOffset(){var ui,fi,mi,hi,pi,gi,_i,vi;if(!this._hasOutline()||!this._floatingLabel)return null;if(!this._iconPrefixContainer&&!this._textPrefixContainer)return ["",null];if(!this._isAttachedToDom())return null;let e=(ui=this._iconPrefixContainer)==null?void 0:ui.nativeElement,t=(fi=this._textPrefixContainer)==null?void 0:fi.nativeElement,r=(mi=this._iconSuffixContainer)==null?void 0:mi.nativeElement,o=(hi=this._textSuffixContainer)==null?void 0:hi.nativeElement,a=(pi=e==null?void 0:e.getBoundingClientRect().width)!=null?pi:0,l=(gi=t==null?void 0:t.getBoundingClientRect().width)!=null?gi:0,v=(_i=r==null?void 0:r.getBoundingClientRect().width)!=null?_i:0,$=(vi=o==null?void 0:o.getBoundingClientRect().width)!=null?vi:0,Ct=this._currentDirection==="rtl"?"-1":"1",Mt=`${a+l}px`,Ar=`calc(${Ct} * (${Mt} + var(--mat-mdc-form-field-label-offset-x, 0px)))`,Fr=`var(--mat-mdc-form-field-label-transform, ${ta} translateX(${Ar}))`,Ir=a+l+v+$;return [Fr,Ir]}_writeOutlinedLabelStyles(e){var t;if(e!==null){let[r,o]=e;this._floatingLabel&&(this._floatingLabel.element.style.transform=r),o!==null&&((t=this._notchedOutline)==null||t._setMaxWidth(o));}}_isAttachedToDom(){let e=this._elementRef.nativeElement;if(e.getRootNode){let t=e.getRootNode();return t&&t!==e}return document.documentElement.contains(e)}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=kd({type:n,selectors:[["mat-form-field"]],contentQueries:function(t,r,o){if(t&1&&(by(o,r._labelChild,bt,5),Zd(o,ei,5)(o,Qo,5)(o,Yo,5)(o,Zo,5)(o,yt,5)),t&2){oS();let a;wy(a=Cy())&&(r._formFieldControl=a.first),wy(a=Cy())&&(r._prefixChildren=a),wy(a=Cy())&&(r._suffixChildren=a),wy(a=Cy())&&(r._errorChildren=a),wy(a=Cy())&&(r._hintChildren=a);}},viewQuery:function(t,r){if(t&1&&(Sy(r._iconPrefixContainerSignal,nr,5)(r._textPrefixContainerSignal,rr,5)(r._iconSuffixContainerSignal,or,5)(r._textSuffixContainerSignal,ar,5),Iy(Io,5)(nr,5)(rr,5)(or,5)(ar,5)(sr,5)(cr,5)(dr,5)),t&2){oS(4);let o;wy(o=Cy())&&(r._textField=o.first),wy(o=Cy())&&(r._iconPrefixContainer=o.first),wy(o=Cy())&&(r._textPrefixContainer=o.first),wy(o=Cy())&&(r._iconSuffixContainer=o.first),wy(o=Cy())&&(r._textSuffixContainer=o.first),wy(o=Cy())&&(r._floatingLabel=o.first),wy(o=Cy())&&(r._notchedOutline=o.first),wy(o=Cy())&&(r._lineRipple=o.first);}},hostAttrs:[1,"mat-mdc-form-field"],hostVars:38,hostBindings:function(t,r){t&2&&Ny("mat-mdc-form-field-label-always-float",r._shouldAlwaysFloat())("mat-mdc-form-field-has-icon-prefix",r._hasIconPrefix)("mat-mdc-form-field-has-icon-suffix",r._hasIconSuffix)("mat-form-field-invalid",r._control.errorState)("mat-form-field-disabled",r._control.disabled)("mat-form-field-autofilled",r._control.autofilled)("mat-form-field-appearance-fill",r.appearance=="fill")("mat-form-field-appearance-outline",r.appearance=="outline")("mat-form-field-hide-placeholder",r._hasFloatingLabel()&&!r._shouldLabelFloat())("mat-primary",r.color!=="accent"&&r.color!=="warn")("mat-accent",r.color==="accent")("mat-warn",r.color==="warn")("ng-untouched",r._shouldForward("untouched"))("ng-touched",r._shouldForward("touched"))("ng-pristine",r._shouldForward("pristine"))("ng-dirty",r._shouldForward("dirty"))("ng-valid",r._shouldForward("valid"))("ng-invalid",r._shouldForward("invalid"))("ng-pending",r._shouldForward("pending"));},inputs:{hideRequiredMarker:"hideRequiredMarker",color:"color",floatLabel:"floatLabel",appearance:"appearance",subscriptSizing:"subscriptSizing",hintLabel:"hintLabel"},exportAs:["matFormField"],features:[PS([{provide:ti,useExisting:n},{provide:mr,useExisting:n}])],ngContentSelectors:Vo,decls:18,vars:21,consts:[["labelTemplate",""],["textField",""],["iconPrefixContainer",""],["textPrefixContainer",""],["textSuffixContainer",""],["iconSuffixContainer",""],[1,"mat-mdc-text-field-wrapper","mdc-text-field",3,"click"],[1,"mat-mdc-form-field-focus-overlay"],[1,"mat-mdc-form-field-flex"],["matFormFieldNotchedOutline","",3,"matFormFieldNotchedOutlineOpen"],[1,"mat-mdc-form-field-icon-prefix"],[1,"mat-mdc-form-field-text-prefix"],[1,"mat-mdc-form-field-infix"],[3,"ngTemplateOutlet"],[1,"mat-mdc-form-field-text-suffix"],[1,"mat-mdc-form-field-icon-suffix"],["matFormFieldLineRipple",""],["aria-atomic","true","aria-live","polite",1,"mat-mdc-form-field-subscript-wrapper","mat-mdc-form-field-bottom-align"],[1,"mat-mdc-form-field-error-wrapper"],[1,"mat-mdc-form-field-hint-wrapper"],["matFormFieldFloatingLabel","",3,"floating","monitorResize","id"],["aria-hidden","true",1,"mat-mdc-form-field-required-marker","mdc-floating-label--required"],[3,"id"],[1,"mat-mdc-form-field-hint-spacer"]],template:function(t,r){if(t&1&&(tS(So),dy(0,No,1,1,"ng-template",null,0,VS),wa(2,"div",6,1),Va("click",function(a){return r._control.onContainerClick(a)}),Bb(4,Oo,1,0,"div",7),wa(5,"div",8),Bb(6,Lo,2,2,"div",9),Bb(7,Ho,3,0,"div",10),Bb(8,jo,3,0,"div",11),wa(9,"div",12),Bb(10,zo,1,1,null,13),nS(11),Vd(),Bb(12,Uo,3,0,"div",14),Bb(13,Go,3,0,"div",15),Vd(),Bb(14,qo,1,0,"div",16),Vd(),wa(15,"div",17),Bb(16,Wo,2,0,"div",18)(17,Ko,5,1,"div",19),Vd()),t&2){let o;zw(2),Ny("mdc-text-field--filled",!r._hasOutline())("mdc-text-field--outlined",r._hasOutline())("mdc-text-field--no-label",!r._hasFloatingLabel())("mdc-text-field--disabled",r._control.disabled)("mdc-text-field--invalid",r._control.errorState),zw(2),Hb(!r._hasOutline()&&!r._control.disabled?4:-1),zw(2),Hb(r._hasOutline()?6:-1),zw(),Hb(r._hasIconPrefix?7:-1),zw(),Hb(r._hasTextPrefix?8:-1),zw(2),Hb(!r._hasOutline()||r._forceDisplayInfixLabel()?10:-1),zw(2),Hb(r._hasTextSuffix?12:-1),zw(),Hb(r._hasIconSuffix?13:-1),zw(),Hb(r._hasOutline()?-1:14),zw(),Ny("mat-mdc-form-field-subscript-dynamic-size",r.subscriptSizing==="dynamic");let a=r._getSubscriptMessageType();zw(),Hb((o=a)==="error"?16:o==="hint"?17:-1);}},dependencies:[sr,cr,MT,dr,yt],styles:[`.mdc-text-field {
  display: inline-flex;
  align-items: baseline;
  padding: 0 16px;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  will-change: opacity, transform, color;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.mdc-text-field__input {
  width: 100%;
  min-width: 0;
  border: none;
  border-radius: 0;
  background: none;
  padding: 0;
  -moz-appearance: none;
  -webkit-appearance: none;
  height: 28px;
}
.mdc-text-field__input::-webkit-calendar-picker-indicator, .mdc-text-field__input::-webkit-search-cancel-button {
  display: none;
}
.mdc-text-field__input::-ms-clear {
  display: none;
}
.mdc-text-field__input:focus {
  outline: none;
}
.mdc-text-field__input:invalid {
  box-shadow: none;
}
.mdc-text-field__input::placeholder {
  opacity: 0;
}
.mdc-text-field__input::-moz-placeholder {
  opacity: 0;
}
.mdc-text-field__input::-webkit-input-placeholder {
  opacity: 0;
}
.mdc-text-field__input:-ms-input-placeholder {
  opacity: 0;
}
.mdc-text-field--no-label .mdc-text-field__input::placeholder, .mdc-text-field--focused .mdc-text-field__input::placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder, .mdc-text-field--focused .mdc-text-field__input::-moz-placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder, .mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder, .mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder {
  opacity: 1;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::placeholder {
  opacity: 0;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-moz-placeholder {
  opacity: 0;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-webkit-input-placeholder {
  opacity: 0;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive:-ms-input-placeholder {
  opacity: 0;
}
.mdc-text-field--outlined .mdc-text-field__input, .mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input {
  height: 100%;
}
.mdc-text-field--outlined .mdc-text-field__input {
  display: flex;
  border: none !important;
  background-color: transparent;
}
.mdc-text-field--disabled .mdc-text-field__input {
  pointer-events: auto;
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input {
  color: var(--mat-form-field-filled-input-text-color, var(--mat-sys-on-surface));
  caret-color: var(--mat-form-field-filled-caret-color, var(--mat-sys-primary));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input {
  color: var(--mat-form-field-outlined-input-text-color, var(--mat-sys-on-surface));
  caret-color: var(--mat-form-field-outlined-caret-color, var(--mat-sys-primary));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {
  caret-color: var(--mat-form-field-filled-error-caret-color, var(--mat-sys-error));
}
.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {
  caret-color: var(--mat-form-field-outlined-error-caret-color, var(--mat-sys-error));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-text-field__input {
  color: var(--mat-form-field-filled-disabled-input-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mdc-text-field__input {
  color: var(--mat-form-field-outlined-disabled-input-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mdc-text-field--disabled .mdc-text-field__input {
    background-color: Window;
  }
}

.mdc-text-field--filled {
  height: 56px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  border-top-left-radius: var(--mat-form-field-filled-container-shape, var(--mat-sys-corner-extra-small));
  border-top-right-radius: var(--mat-form-field-filled-container-shape, var(--mat-sys-corner-extra-small));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) {
  background-color: var(--mat-form-field-filled-container-color, var(--mat-sys-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--disabled {
  background-color: var(--mat-form-field-filled-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 4%, transparent));
}

.mdc-text-field--outlined {
  height: 56px;
  overflow: visible;
  padding-right: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));
  padding-left: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)) + 4px);
}
[dir=rtl] .mdc-text-field--outlined {
  padding-right: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)) + 4px);
  padding-left: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));
}

.mdc-floating-label {
  position: absolute;
  left: 0;
  transform-origin: left top;
  line-height: 1.15rem;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: text;
  overflow: hidden;
  will-change: transform;
}
[dir=rtl] .mdc-floating-label {
  right: 0;
  left: auto;
  transform-origin: right top;
  text-align: right;
}
.mdc-text-field .mdc-floating-label {
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}
.mdc-notched-outline .mdc-floating-label {
  display: inline-block;
  position: relative;
  max-width: 100%;
}
.mdc-text-field--outlined .mdc-floating-label {
  left: 4px;
  right: auto;
}
[dir=rtl] .mdc-text-field--outlined .mdc-floating-label {
  left: auto;
  right: 4px;
}
.mdc-text-field--filled .mdc-floating-label {
  left: 16px;
  right: auto;
}
[dir=rtl] .mdc-text-field--filled .mdc-floating-label {
  left: auto;
  right: 16px;
}
.mdc-text-field--disabled .mdc-floating-label {
  cursor: default;
}
@media (forced-colors: active) {
  .mdc-text-field--disabled .mdc-floating-label {
    z-index: 1;
  }
}
.mdc-text-field--filled.mdc-text-field--no-label .mdc-floating-label {
  display: none;
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-floating-label {
  color: var(--mat-form-field-filled-label-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-filled-focus-label-text-color, var(--mat-sys-primary));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {
  color: var(--mat-form-field-filled-hover-label-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-floating-label {
  color: var(--mat-form-field-filled-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {
  color: var(--mat-form-field-filled-error-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-filled-error-focus-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {
  color: var(--mat-form-field-filled-error-hover-label-text-color, var(--mat-sys-on-error-container));
}
.mdc-text-field--filled .mdc-floating-label {
  font-family: var(--mat-form-field-filled-label-text-font, var(--mat-sys-body-large-font));
  font-size: var(--mat-form-field-filled-label-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-form-field-filled-label-text-weight, var(--mat-sys-body-large-weight));
  letter-spacing: var(--mat-form-field-filled-label-text-tracking, var(--mat-sys-body-large-tracking));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-floating-label {
  color: var(--mat-form-field-outlined-label-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-outlined-focus-label-text-color, var(--mat-sys-primary));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {
  color: var(--mat-form-field-outlined-hover-label-text-color, var(--mat-sys-on-surface));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mdc-floating-label {
  color: var(--mat-form-field-outlined-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {
  color: var(--mat-form-field-outlined-error-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-outlined-error-focus-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {
  color: var(--mat-form-field-outlined-error-hover-label-text-color, var(--mat-sys-on-error-container));
}
.mdc-text-field--outlined .mdc-floating-label {
  font-family: var(--mat-form-field-outlined-label-text-font, var(--mat-sys-body-large-font));
  font-size: var(--mat-form-field-outlined-label-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-form-field-outlined-label-text-weight, var(--mat-sys-body-large-weight));
  letter-spacing: var(--mat-form-field-outlined-label-text-tracking, var(--mat-sys-body-large-tracking));
}

.mdc-floating-label--float-above {
  cursor: auto;
  transform: translateY(-106%) scale(0.75);
}
.mdc-text-field--filled .mdc-floating-label--float-above {
  transform: translateY(-106%) scale(0.75);
}
.mdc-text-field--outlined .mdc-floating-label--float-above {
  transform: translateY(-37.25px) scale(1);
  font-size: 0.75rem;
}
.mdc-notched-outline .mdc-floating-label--float-above {
  text-overflow: clip;
}
.mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  max-width: 133.3333333333%;
}
.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above, .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  transform: translateY(-34.75px) scale(0.75);
}
.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above, .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  font-size: 1rem;
}

.mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after {
  margin-left: 1px;
  margin-right: 0;
  content: "*";
}
[dir=rtl] .mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after {
  margin-left: 0;
  margin-right: 1px;
}

.mdc-notched-outline {
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  height: 100%;
  text-align: left;
  pointer-events: none;
}
[dir=rtl] .mdc-notched-outline {
  text-align: right;
}
.mdc-text-field--outlined .mdc-notched-outline {
  z-index: 1;
}

.mat-mdc-notch-piece {
  box-sizing: border-box;
  height: 100%;
  pointer-events: none;
  border: none;
  border-top: 1px solid;
  border-bottom: 1px solid;
}
.mdc-text-field--focused .mat-mdc-notch-piece {
  border-width: 2px;
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-outline-color, var(--mat-sys-outline));
  border-width: var(--mat-form-field-outlined-outline-width, 1px);
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-hover-outline-color, var(--mat-sys-on-surface));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-focus-outline-color, var(--mat-sys-primary));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-error-outline-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--focused):hover .mdc-notched-outline .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-error-hover-outline-color, var(--mat-sys-on-error-container));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-error-focus-outline-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mat-mdc-notch-piece {
  border-width: var(--mat-form-field-outlined-focus-outline-width, 2px);
}

.mdc-notched-outline__leading {
  border-left: 1px solid;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}
.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading {
  width: max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));
}
[dir=rtl] .mdc-notched-outline__leading {
  border-left: none;
  border-right: 1px solid;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  border-top-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}

.mdc-notched-outline__trailing {
  flex-grow: 1;
  border-left: none;
  border-right: 1px solid;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}
[dir=rtl] .mdc-notched-outline__trailing {
  border-left: 1px solid;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}

.mdc-notched-outline__notch {
  flex: 0 0 auto;
  width: auto;
}
.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch {
  max-width: min(var(--mat-form-field-notch-max-width, 100%), calc(100% - max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small))) * 2));
}
.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  max-width: min(100%, calc(100% - max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small))) * 2));
}
.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-top: 1px;
}
.mdc-text-field--focused.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-top: 2px;
}
.mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-left: 0;
  padding-right: 8px;
  border-top: none;
}
[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-left: 8px;
  padding-right: 0;
}
.mdc-notched-outline--no-label .mdc-notched-outline__notch {
  display: none;
}

.mdc-line-ripple::before, .mdc-line-ripple::after {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-bottom-style: solid;
  content: "";
}
.mdc-line-ripple::before {
  z-index: 1;
  border-bottom-width: var(--mat-form-field-filled-active-indicator-height, 1px);
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-active-indicator-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-hover-active-indicator-color, var(--mat-sys-on-surface));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-disabled-active-indicator-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-error-active-indicator-color, var(--mat-sys-error));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--focused):hover .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-error-hover-active-indicator-color, var(--mat-sys-on-error-container));
}
.mdc-line-ripple::after {
  transform: scaleX(0);
  opacity: 0;
  z-index: 2;
}
.mdc-text-field--filled .mdc-line-ripple::after {
  border-bottom-width: var(--mat-form-field-filled-focus-active-indicator-height, 2px);
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::after {
  border-bottom-color: var(--mat-form-field-filled-focus-active-indicator-color, var(--mat-sys-primary));
}
.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::after {
  border-bottom-color: var(--mat-form-field-filled-error-focus-active-indicator-color, var(--mat-sys-error));
}

.mdc-line-ripple--active::after {
  transform: scaleX(1);
  opacity: 1;
}

.mdc-line-ripple--deactivating::after {
  opacity: 0;
}

.mdc-text-field--disabled {
  pointer-events: none;
}

.mat-mdc-form-field-textarea-control {
  vertical-align: middle;
  resize: vertical;
  box-sizing: border-box;
  height: auto;
  margin: 0;
  padding: 0;
  border: none;
  overflow: auto;
}

.mat-mdc-form-field-input-control.mat-mdc-form-field-input-control {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font: inherit;
  letter-spacing: inherit;
  text-decoration: inherit;
  text-transform: inherit;
  border: none;
}

.mat-mdc-form-field .mat-mdc-floating-label.mdc-floating-label {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  line-height: normal;
  pointer-events: all;
  will-change: auto;
}

.mat-mdc-form-field:not(.mat-form-field-disabled) .mat-mdc-floating-label.mdc-floating-label {
  cursor: inherit;
}

.mdc-text-field--no-label:not(.mdc-text-field--textarea) .mat-mdc-form-field-input-control.mdc-text-field__input,
.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control {
  height: auto;
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control.mdc-text-field__input[type=color] {
  height: 23px;
}

.mat-mdc-text-field-wrapper {
  height: auto;
  flex: auto;
  will-change: auto;
}

.mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper {
  padding-left: 0;
  --mat-mdc-form-field-label-offset-x: -16px;
}

.mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {
  padding-right: 0;
}

[dir=rtl] .mat-mdc-text-field-wrapper {
  padding-left: 16px;
  padding-right: 16px;
}
[dir=rtl] .mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {
  padding-left: 0;
}
[dir=rtl] .mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper {
  padding-right: 0;
}

.mat-form-field-disabled .mdc-text-field__input::placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input::-moz-placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input:-ms-input-placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-form-field-label-always-float .mdc-text-field__input::placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
  opacity: 1;
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-infix .mat-mdc-floating-label {
  left: auto;
  right: auto;
}

.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-text-field__input {
  display: inline-block;
}

.mat-mdc-form-field .mat-mdc-text-field-wrapper.mdc-text-field .mdc-notched-outline__notch {
  padding-top: 0;
}

.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch {
  border-left: 1px solid transparent;
}

[dir=rtl] .mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch {
  border-left: none;
  border-right: 1px solid transparent;
}

.mat-mdc-form-field-infix {
  min-height: var(--mat-form-field-container-height, 56px);
  padding-top: var(--mat-form-field-filled-with-label-container-padding-top, 24px);
  padding-bottom: var(--mat-form-field-filled-with-label-container-padding-bottom, 8px);
}
.mdc-text-field--outlined .mat-mdc-form-field-infix, .mdc-text-field--no-label .mat-mdc-form-field-infix {
  padding-top: var(--mat-form-field-container-vertical-padding, 16px);
  padding-bottom: var(--mat-form-field-container-vertical-padding, 16px);
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-mdc-floating-label {
  top: calc(var(--mat-form-field-container-height, 56px) / 2);
}

.mdc-text-field--filled .mat-mdc-floating-label {
  display: var(--mat-form-field-filled-label-display, block);
}

.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  --mat-mdc-form-field-label-transform: translateY(calc(calc(6.75px + var(--mat-form-field-container-height, 56px) / 2) * -1))
    scale(var(--mat-mdc-form-field-floating-label-scale, 0.75));
  transform: var(--mat-mdc-form-field-label-transform);
}

@keyframes _mat-form-field-subscript-animation {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.mat-mdc-form-field-subscript-wrapper {
  box-sizing: border-box;
  width: 100%;
  position: relative;
}

.mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field-error-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 16px;
  opacity: 1;
  transform: translateY(0);
  animation: _mat-form-field-subscript-animation 0ms cubic-bezier(0.55, 0, 0.55, 0.2);
}

.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-error-wrapper {
  position: static;
}

.mat-mdc-form-field-bottom-align::before {
  content: "";
  display: inline-block;
  height: 16px;
}

.mat-mdc-form-field-bottom-align.mat-mdc-form-field-subscript-dynamic-size::before {
  content: unset;
}

.mat-mdc-form-field-hint-end {
  order: 1;
}

.mat-mdc-form-field-hint-wrapper {
  display: flex;
}

.mat-mdc-form-field-hint-spacer {
  flex: 1 0 1em;
}

.mat-mdc-form-field-error {
  display: block;
  color: var(--mat-form-field-error-text-color, var(--mat-sys-error));
}

.mat-mdc-form-field-subscript-wrapper,
.mat-mdc-form-field-bottom-align::before {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--mat-form-field-subscript-text-font, var(--mat-sys-body-small-font));
  line-height: var(--mat-form-field-subscript-text-line-height, var(--mat-sys-body-small-line-height));
  font-size: var(--mat-form-field-subscript-text-size, var(--mat-sys-body-small-size));
  letter-spacing: var(--mat-form-field-subscript-text-tracking, var(--mat-sys-body-small-tracking));
  font-weight: var(--mat-form-field-subscript-text-weight, var(--mat-sys-body-small-weight));
}

.mat-mdc-form-field-focus-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  opacity: 0;
  pointer-events: none;
  background-color: var(--mat-form-field-state-layer-color, var(--mat-sys-on-surface));
}
.mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-focus-overlay {
  opacity: var(--mat-form-field-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-form-field.mat-focused .mat-mdc-form-field-focus-overlay {
  opacity: var(--mat-form-field-focus-state-layer-opacity, 0);
}

select.mat-mdc-form-field-input-control {
  -moz-appearance: none;
  -webkit-appearance: none;
  background-color: transparent;
  display: inline-flex;
  box-sizing: border-box;
}
select.mat-mdc-form-field-input-control:not(:disabled) {
  cursor: pointer;
}
select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option {
  color: var(--mat-form-field-select-option-text-color, var(--mat-sys-neutral10));
}
select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option:disabled {
  color: var(--mat-form-field-select-disabled-option-text-color, color-mix(in srgb, var(--mat-sys-neutral10) 38%, transparent));
}

.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after {
  content: "";
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid;
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -2.5px;
  pointer-events: none;
  color: var(--mat-form-field-enabled-select-arrow-color, var(--mat-sys-on-surface-variant));
}
[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after {
  right: auto;
  left: 0;
}
.mat-mdc-form-field-type-mat-native-select.mat-focused .mat-mdc-form-field-infix::after {
  color: var(--mat-form-field-focus-select-arrow-color, var(--mat-sys-primary));
}
.mat-mdc-form-field-type-mat-native-select.mat-form-field-disabled .mat-mdc-form-field-infix::after {
  color: var(--mat-form-field-disabled-select-arrow-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control {
  padding-right: 15px;
}
[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control {
  padding-right: 0;
  padding-left: 15px;
}

@media (forced-colors: active) {
  .mat-form-field-appearance-fill .mat-mdc-text-field-wrapper {
    outline: solid 1px;
  }
}
@media (forced-colors: active) {
  .mat-form-field-appearance-fill.mat-form-field-disabled .mat-mdc-text-field-wrapper {
    outline-color: GrayText;
  }
}

@media (forced-colors: active) {
  .mat-form-field-appearance-fill.mat-focused .mat-mdc-text-field-wrapper {
    outline: dashed 3px;
  }
}

@media (forced-colors: active) {
  .mat-mdc-form-field.mat-focused .mdc-notched-outline {
    border: dashed 3px;
  }
}

.mat-mdc-form-field-input-control[type=date], .mat-mdc-form-field-input-control[type=datetime], .mat-mdc-form-field-input-control[type=datetime-local], .mat-mdc-form-field-input-control[type=month], .mat-mdc-form-field-input-control[type=week], .mat-mdc-form-field-input-control[type=time] {
  line-height: 1;
}
.mat-mdc-form-field-input-control::-webkit-datetime-edit {
  line-height: 1;
  padding: 0;
  margin-bottom: -2px;
}

.mat-mdc-form-field {
  --mat-mdc-form-field-floating-label-scale: 0.75;
  display: inline-flex;
  flex-direction: column;
  min-width: 0;
  text-align: left;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--mat-form-field-container-text-font, var(--mat-sys-body-large-font));
  line-height: var(--mat-form-field-container-text-line-height, var(--mat-sys-body-large-line-height));
  font-size: var(--mat-form-field-container-text-size, var(--mat-sys-body-large-size));
  letter-spacing: var(--mat-form-field-container-text-tracking, var(--mat-sys-body-large-tracking));
  font-weight: var(--mat-form-field-container-text-weight, var(--mat-sys-body-large-weight));
}
.mat-mdc-form-field .mdc-text-field--outlined .mdc-floating-label--float-above {
  font-size: calc(var(--mat-form-field-outlined-label-text-populated-size) * var(--mat-mdc-form-field-floating-label-scale));
}
.mat-mdc-form-field .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  font-size: var(--mat-form-field-outlined-label-text-populated-size);
}
[dir=rtl] .mat-mdc-form-field {
  text-align: right;
}

.mat-mdc-form-field-flex {
  display: inline-flex;
  align-items: baseline;
  box-sizing: border-box;
  width: 100%;
}

.mat-mdc-text-field-wrapper {
  width: 100%;
  z-index: 0;
}

.mat-mdc-form-field-icon-prefix,
.mat-mdc-form-field-icon-suffix {
  align-self: center;
  line-height: 0;
  pointer-events: auto;
  position: relative;
  z-index: 1;
}
.mat-mdc-form-field-icon-prefix > .mat-icon,
.mat-mdc-form-field-icon-suffix > .mat-icon {
  padding: 0 12px;
  box-sizing: content-box;
}

.mat-mdc-form-field-icon-prefix {
  color: var(--mat-form-field-leading-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-form-field-disabled .mat-mdc-form-field-icon-prefix {
  color: var(--mat-form-field-disabled-leading-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-trailing-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-form-field-disabled .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-disabled-trailing-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-invalid .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-error-trailing-icon-color, var(--mat-sys-error));
}
.mat-form-field-invalid:not(.mat-focused):not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-error-hover-trailing-icon-color, var(--mat-sys-on-error-container));
}
.mat-form-field-invalid.mat-focused .mat-mdc-text-field-wrapper .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-error-focus-trailing-icon-color, var(--mat-sys-error));
}

.mat-mdc-form-field-icon-prefix,
[dir=rtl] .mat-mdc-form-field-icon-suffix {
  padding: 0 4px 0 0;
}

.mat-mdc-form-field-icon-suffix,
[dir=rtl] .mat-mdc-form-field-icon-prefix {
  padding: 0 0 0 4px;
}

.mat-mdc-form-field-subscript-wrapper .mat-icon,
.mat-mdc-form-field label .mat-icon {
  width: 1em;
  height: 1em;
  font-size: inherit;
}

.mat-mdc-form-field-infix {
  flex: auto;
  min-width: 0;
  width: 180px;
  position: relative;
  box-sizing: border-box;
}
.mat-mdc-form-field-infix:has(textarea[cols]) {
  width: auto;
}

.mat-mdc-form-field .mdc-notched-outline__notch {
  margin-left: -1px;
  -webkit-clip-path: inset(-9em -999em -9em 1px);
  clip-path: inset(-9em -999em -9em 1px);
}
[dir=rtl] .mat-mdc-form-field .mdc-notched-outline__notch {
  margin-left: 0;
  margin-right: -1px;
  -webkit-clip-path: inset(-9em 1px -9em -999em);
  clip-path: inset(-9em 1px -9em -999em);
}

.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-floating-label {
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input {
  transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-moz-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-webkit-input-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input:-ms-input-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-moz-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field--filled:not(.mdc-ripple-upgraded):focus .mdc-text-field__ripple::before {
  transition-duration: 75ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-line-ripple::after {
  transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1), opacity 180ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-error-wrapper {
  animation-duration: 300ms;
}

.mdc-notched-outline .mdc-floating-label {
  max-width: calc(100% + 1px);
}

.mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  max-width: calc(133.3333333333% + 1px);
}
`],encapsulation:2})}return n})();var hr=(()=>{class n{isErrorState(e,t){return !!(e&&e.invalid&&(e.touched||t&&t.submitted))}isSignalErrorState(e){if(!e)return  false;let t=e().invalid(),r=e().touched();return t&&r}static \u0275fac=function(t){return new(t||n)};static \u0275prov=z({token:n,factory:n.\u0275fac})}return n})();var xt=class{_defaultMatcher;_parentFormGroup;_parentForm;_stateChanges;errorState=false;matcher;ngControl;formField;constructor(i,e,t,r,o){this._defaultMatcher=i,this._parentFormGroup=t,this._parentForm=r,this._stateChanges=o,e?Ho$1(e.field)&&!e.updateValueAndValidity?(this.formField=e,this.ngControl=null):(this.formField=null,this.ngControl=e):this.ngControl=this.formField=null;}updateErrorState(){var r,o,a;let i=this.errorState,e=this.matcher||this._defaultMatcher,t;if(this.formField)t=(o=(r=e==null?void 0:e.isSignalErrorState)==null?void 0:r.call(e,this.formField.field()))!=null?o:false;else {let l=this._parentFormGroup||this._parentForm,v=this.ngControl?this.ngControl.control:null;t=(a=e==null?void 0:e.isErrorState(v,l))!=null?a:false;}t!==i&&(this.errorState=t,this._stateChanges.next());}};var He=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=zt$1({type:n});static \u0275inj=yt$1({imports:[Xn,Le,ye]})}return n})();var oa=["button","checkbox","file","hidden","image","radio","range","reset","submit"],aa=new E("MAT_INPUT_CONFIG"),pr=(()=>{class n{_elementRef=g(Vt);_platform=g(A);ngControl=g(ne,{optional:true,self:true});_autofillMonitor=g(zn);_ngZone=g(V);_formField=g(ti,{optional:true});_renderer=g(oi$1);_uid=g(k).getId("mat-input-");_previousNativeValue;_inputValueAccessor;_signalBasedValueAccessor;_previousPlaceholder=null;_errorStateTracker;_config=g(aa,{optional:true});_cleanupIosKeyup;_cleanupWebkitWheel;_isServer=false;_isNativeSelect=false;_isTextarea=false;_isInFormField=false;focused=false;stateChanges=new re;controlType="mat-input";autofilled=false;get disabled(){return this._disabled}set disabled(e){this._disabled=ge(e),this.focused&&(this.focused=false,this.stateChanges.next());}_disabled=false;get id(){return this._id}set id(e){this._id=e||this._uid;}_id;placeholder;name;get required(){var e,t,r,o;return (o=(r=this._required)!=null?r:(t=(e=this.ngControl)==null?void 0:e.control)==null?void 0:t.hasValidator(Ne.required))!=null?o:false}set required(e){this._required=ge(e);}_required;get type(){return this._type}set type(e){this._type=e||"text",this._validateType(),!this._isTextarea&&Zt().has(this._type)&&(this._elementRef.nativeElement.type=this._type);}_type="text";get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e;}userAriaDescribedBy;get value(){return this._signalBasedValueAccessor?this._signalBasedValueAccessor.value():this._inputValueAccessor.value}set value(e){e!==this.value&&(this._signalBasedValueAccessor?this._signalBasedValueAccessor.value.set(e):this._inputValueAccessor.value=e,this.stateChanges.next());}get readonly(){return this._readonly}set readonly(e){this._readonly=ge(e);}_readonly=false;disabledInteractive;get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e;}_neverEmptyInputTypes=["date","datetime","datetime-local","month","time","week"].filter(e=>Zt().has(e));constructor(){var v;let e=g(Gt,{optional:true}),t=g(Wt,{optional:true}),r=g(hr),o=g(er,{optional:true,self:true}),a=this._elementRef.nativeElement,l=a.nodeName.toLowerCase();o?Ho$1(o.value)?this._signalBasedValueAccessor=o:this._inputValueAccessor=o:this._inputValueAccessor=a,this._previousNativeValue=this.value,this.id=this.id,this._platform.IOS&&this._ngZone.runOutsideAngular(()=>{this._cleanupIosKeyup=this._renderer.listen(a,"keyup",this._iOSKeyupListener);}),this._errorStateTracker=new xt(r,this.ngControl,t,e,this.stateChanges),this._isServer=!this._platform.isBrowser,this._isNativeSelect=l==="select",this._isTextarea=l==="textarea",this._isInFormField=!!this._formField,this.disabledInteractive=((v=this._config)==null?void 0:v.disabledInteractive)||false,this._isNativeSelect&&(this.controlType=a.multiple?"mat-native-select-multiple":"mat-native-select"),this._signalBasedValueAccessor&&$p(()=>{this._signalBasedValueAccessor.value(),this.stateChanges.next();});}ngAfterViewInit(){this._platform.isBrowser&&this._autofillMonitor.monitor(this._elementRef.nativeElement).subscribe(e=>{this.autofilled=e.isAutofilled,this.stateChanges.next();});}ngOnChanges(){this.stateChanges.next();}ngOnDestroy(){var e,t;this.stateChanges.complete(),this._platform.isBrowser&&this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement),(e=this._cleanupIosKeyup)==null||e.call(this),(t=this._cleanupWebkitWheel)==null||t.call(this);}ngDoCheck(){this.ngControl&&(this.updateErrorState(),this.ngControl.disabled!==null&&this.ngControl.disabled!==this.disabled&&(this.disabled=this.ngControl.disabled,this.stateChanges.next())),this._dirtyCheckNativeValue(),this._dirtyCheckPlaceholder();}focus(e){this._elementRef.nativeElement.focus(e);}updateErrorState(){this._errorStateTracker.updateErrorState();}_focusChanged(e){if(e!==this.focused){if(!this._isNativeSelect&&e&&this.disabled&&this.disabledInteractive){let t=this._elementRef.nativeElement;t.type==="number"?(t.type="text",t.setSelectionRange(0,0),t.type="number"):t.setSelectionRange(0,0);}this.focused=e,this.stateChanges.next();}}_onInput(){}_dirtyCheckNativeValue(){let e=this._elementRef.nativeElement.value;this._previousNativeValue!==e&&(this._previousNativeValue=e,this.stateChanges.next());}_dirtyCheckPlaceholder(){let e=this._getPlaceholder();if(e!==this._previousPlaceholder){let t=this._elementRef.nativeElement;this._previousPlaceholder=e,e?t.setAttribute("placeholder",e):t.removeAttribute("placeholder");}}_getPlaceholder(){return this.placeholder||null}_validateType(){oa.indexOf(this._type)>-1;}_isNeverEmpty(){return this._neverEmptyInputTypes.indexOf(this._type)>-1}_isBadInput(){let e=this._elementRef.nativeElement.validity;return e&&e.badInput}get empty(){return !this._isNeverEmpty()&&!this._elementRef.nativeElement.value&&!this._isBadInput()&&!this.autofilled}get shouldLabelFloat(){if(this._isNativeSelect){let e=this._elementRef.nativeElement,t=e.options[0];return this.focused||e.multiple||!this.empty||!!(e.selectedIndex>-1&&t&&t.label)}else return this.focused&&!this.disabled||!this.empty}get describedByIds(){let t=this._elementRef.nativeElement.getAttribute("aria-describedby");return (t==null?void 0:t.split(" "))||[]}setDescribedByIds(e){let t=this._elementRef.nativeElement;e.length?t.setAttribute("aria-describedby",e.join(" ")):t.removeAttribute("aria-describedby");}onContainerClick(){this.focused||this.focus();}_isInlineSelect(){let e=this._elementRef.nativeElement;return this._isNativeSelect&&(e.multiple||e.size>1)}_iOSKeyupListener=e=>{let t=e.target;!t.value&&t.selectionStart===0&&t.selectionEnd===0&&(t.setSelectionRange(1,1),t.setSelectionRange(0,0));};_getReadonlyAttribute(){return this._isNativeSelect?null:this.readonly||this.disabled&&this.disabledInteractive?"true":null}static \u0275fac=function(t){return new(t||n)};static \u0275dir=nr$1({type:n,selectors:[["input","matInput",""],["textarea","matInput",""],["select","matNativeControl",""],["input","matNativeControl",""],["textarea","matNativeControl",""]],hostAttrs:[1,"mat-mdc-input-element"],hostVars:21,hostBindings:function(t,r){t&1&&Va("focus",function(){return r._focusChanged(true)})("blur",function(){return r._focusChanged(false)})("input",function(){return r._onInput()}),t&2&&(vy("id",r.id)("disabled",r.disabled&&!r.disabledInteractive)("required",r.required),Ha("name",r.name||null)("readonly",r._getReadonlyAttribute())("aria-disabled",r.disabled&&r.disabledInteractive?"true":null)("aria-invalid",r.empty&&r.required?null:r.errorState)("aria-required",r.required)("id",r.id),Ny("mat-input-server",r._isServer)("mat-mdc-form-field-textarea-control",r._isInFormField&&r._isTextarea)("mat-mdc-form-field-input-control",r._isInFormField)("mat-mdc-input-disabled-interactive",r.disabledInteractive)("mdc-text-field__input",r._isInFormField)("mat-mdc-native-select-inline",r._isInlineSelect()));},inputs:{disabled:"disabled",id:"id",placeholder:"placeholder",name:"name",required:"required",type:"type",errorStateMatcher:"errorStateMatcher",userAriaDescribedBy:[0,"aria-describedby","userAriaDescribedBy"],value:"value",readonly:"readonly",disabledInteractive:[2,"disabledInteractive","disabledInteractive",di$1]},exportAs:["matInput"],features:[PS([{provide:ei,useExisting:n}]),Xn$1]})}return n})(),gr=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=zt$1({type:n});static \u0275inj=yt$1({imports:[He,He,Gn,ye]})}return n})();var je=(()=>{class n{_listeners=[];notify(e,t){for(let r of this._listeners)r(e,t);}listen(e){return this._listeners.push(e),()=>{this._listeners=this._listeners.filter(t=>e!==t);}}ngOnDestroy(){this._listeners=[];}static \u0275fac=function(t){return new(t||n)};static \u0275prov=z({token:n,factory:n.\u0275fac})}return n})();var ii=new E("CdkAccordion"),_r=(()=>{class n{_stateChanges=new re;_openCloseAllActions=new re;id=g(k).getId("cdk-accordion-");multi=false;openAll(){this.multi&&this._openCloseAllActions.next(true);}closeAll(){this._openCloseAllActions.next(false);}ngOnChanges(e){this._stateChanges.next(e);}ngOnDestroy(){this._stateChanges.complete(),this._openCloseAllActions.complete();}static \u0275fac=function(t){return new(t||n)};static \u0275dir=nr$1({type:n,selectors:[["cdk-accordion"],["","cdkAccordion",""]],inputs:{multi:[2,"multi","multi",di$1]},exportAs:["cdkAccordion"],features:[PS([{provide:ii,useExisting:n}]),Xn$1]})}return n})(),vr=(()=>{class n{accordion=g(ii,{optional:true,skipSelf:true});_changeDetectorRef=g(qr$1);_expansionDispatcher=g(je);_openCloseAllSubscription=se$1.EMPTY;closed=new Te$1;opened=new Te$1;destroyed=new Te$1;expandedChange=new Te$1;id=g(k).getId("cdk-accordion-child-");get expanded(){return this._expanded}set expanded(e){if(this._expanded!==e){if(this._expanded=e,this.expandedChange.emit(e),e){this.opened.emit();let t=this.accordion?this.accordion.id:this.id;this._expansionDispatcher.notify(this.id,t);}else this.closed.emit();this._changeDetectorRef.markForCheck();}}_expanded=false;get disabled(){return this._disabled()}set disabled(e){this._disabled.set(e);}_disabled=oe(false);_removeUniqueSelectionListener=()=>{};ngOnInit(){this._removeUniqueSelectionListener=this._expansionDispatcher.listen((e,t)=>{this.accordion&&!this.accordion.multi&&this.accordion.id===t&&this.id!==e&&(this.expanded=false);}),this.accordion&&(this._openCloseAllSubscription=this._subscribeToOpenCloseAllActions());}ngOnDestroy(){this.opened.complete(),this.closed.complete(),this.destroyed.emit(),this.destroyed.complete(),this._removeUniqueSelectionListener(),this._openCloseAllSubscription.unsubscribe();}toggle(){this.disabled||(this.expanded=!this.expanded);}close(){this.disabled||(this.expanded=false);}open(){this.disabled||(this.expanded=true);}_subscribeToOpenCloseAllActions(){return this.accordion._openCloseAllActions.subscribe(e=>{this.disabled||(this.expanded=e);})}static \u0275fac=function(t){return new(t||n)};static \u0275dir=nr$1({type:n,selectors:[["cdk-accordion-item"],["","cdkAccordionItem",""]],inputs:{expanded:[2,"expanded","expanded",di$1],disabled:[2,"disabled","disabled",di$1]},outputs:{closed:"closed",opened:"opened",destroyed:"destroyed",expandedChange:"expandedChange"},exportAs:["cdkAccordionItem"],features:[PS([{provide:ii,useValue:void 0}])]})}return n})(),br=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=zt$1({type:n});static \u0275inj=yt$1({})}return n})();var Be=class{_attachedHost=null;attach(i){return this._attachedHost=i,i.attach(this)}detach(){let i=this._attachedHost;i!=null&&(this._attachedHost=null,i.detach());}get isAttached(){return this._attachedHost!=null}setAttachedHost(i){this._attachedHost=i;}},ni=class extends Be{component;viewContainerRef;injector;projectableNodes;bindings;directives;constructor(i,e,t,r,o,a){super(),this.component=i,this.viewContainerRef=e,this.injector=t,this.projectableNodes=r,this.bindings=o||null,this.directives=a||null;}},ze=class extends Be{templateRef;viewContainerRef;context;injector;constructor(i,e,t,r){super(),this.templateRef=i,this.viewContainerRef=e,this.context=t,this.injector=r;}get origin(){return this.templateRef.elementRef}attach(i,e=this.context){return this.context=e,super.attach(i)}detach(){return this.context=void 0,super.detach()}},ri=class extends Be{element;constructor(i){super(),this.element=i instanceof Vt?i.nativeElement:i;}},oi=class{_attachedPortal=null;_disposeFn=null;_isDisposed=false;hasAttached(){return !!this._attachedPortal}attach(i){if(i instanceof ni)return this._attachedPortal=i,this.attachComponentPortal(i);if(i instanceof ze)return this._attachedPortal=i,this.attachTemplatePortal(i);if(this.attachDomPortal&&i instanceof ri)return this._attachedPortal=i,this.attachDomPortal(i)}attachDomPortal=null;detach(){this._attachedPortal&&(this._attachedPortal.setAttachedHost(null),this._attachedPortal=null),this._invokeDisposeFn();}dispose(){this.hasAttached()&&this.detach(),this._invokeDisposeFn(),this._isDisposed=true;}setDisposeFn(i){this._disposeFn=i;}_invokeDisposeFn(){this._disposeFn&&(this._disposeFn(),this._disposeFn=null);}};var yr=(()=>{class n extends oi{_moduleRef=g(Kn$1,{optional:true});_document=g(K);_viewContainerRef=g(yn$1);_isInitialized=false;_attachedRef=null;get portal(){return this._attachedPortal}set portal(e){this.hasAttached()&&!e&&!this._isInitialized||(this.hasAttached()&&super.detach(),e&&super.attach(e),this._attachedPortal=e||null);}attached=new Te$1;get attachedRef(){return this._attachedRef}ngOnInit(){this._isInitialized=true;}ngOnDestroy(){super.dispose(),this._attachedRef=this._attachedPortal=null;}attachComponentPortal(e){e.setAttachedHost(this);let t=e.viewContainerRef!=null?e.viewContainerRef:this._viewContainerRef,r=t.createComponent(e.component,{index:t.length,injector:e.injector||t.injector,projectableNodes:e.projectableNodes||void 0,ngModuleRef:this._moduleRef||void 0,bindings:e.bindings||void 0,directives:e.directives||void 0});return t!==this._viewContainerRef&&this._getRootNode().appendChild(r.hostView.rootNodes[0]),super.setDisposeFn(()=>r.destroy()),this._attachedPortal=e,this._attachedRef=r,this.attached.emit(r),r}attachTemplatePortal(e){e.setAttachedHost(this);let t=this._viewContainerRef.createEmbeddedView(e.templateRef,e.context,{injector:e.injector});return super.setDisposeFn(()=>this._viewContainerRef.clear()),this._attachedPortal=e,this._attachedRef=t,this.attached.emit(t),t}attachDomPortal=e=>{let t=e.element;t.parentNode;let r=this._document.createComment("dom-portal");e.setAttachedHost(this),t.parentNode.insertBefore(r,t),this._getRootNode().appendChild(t),this._attachedPortal=e,super.setDisposeFn(()=>{r.parentNode&&r.parentNode.replaceChild(t,r);});};_getRootNode(){let e=this._viewContainerRef.element.nativeElement;return e.nodeType===e.ELEMENT_NODE?e:e.parentNode}static \u0275fac=(()=>{let e;return function(r){return (e||(e=Bg(n)))(r||n)}})();static \u0275dir=nr$1({type:n,selectors:[["","cdkPortalOutlet",""]],inputs:{portal:[0,"cdkPortalOutlet","portal"]},outputs:{attached:"attached"},exportAs:["cdkPortalOutlet"],features:[uy]})}return n})(),xr=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=zt$1({type:n});static \u0275inj=yt$1({})}return n})();var Cr=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275cmp=kd({type:n,selectors:[["structural-styles"]],decls:0,vars:0,template:function(t,r){},styles:[`.mat-focus-indicator {
  position: relative;
}
.mat-focus-indicator::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  box-sizing: border-box;
  pointer-events: none;
  display: var(--mat-focus-indicator-display, none);
  border-width: var(--mat-focus-indicator-border-width, 3px);
  border-style: var(--mat-focus-indicator-border-style, solid);
  border-color: var(--mat-focus-indicator-border-color, transparent);
  border-radius: var(--mat-focus-indicator-border-radius, 4px);
}
.mat-focus-indicator:focus-visible::before {
  content: "";
}

@media (forced-colors: active) {
  html {
    --mat-focus-indicator-display: block;
  }
}
`],encapsulation:2})}return n})();var da=["body"],ca=["bodyWrapper"],ua=[[["mat-expansion-panel-header"]],"*",[["mat-action-row"]]],fa=["mat-expansion-panel-header","*","mat-action-row"];function ma(n,i){}var ha=[[["mat-panel-title"]],[["mat-panel-description"]],"*"],pa=["mat-panel-title","mat-panel-description","*"];function ga(n,i){n&1&&(zd(0,"span",1),Lp(),zd(1,"svg",2),gy(2,"path",3),Gd()());}var ai=new E("MAT_ACCORDION"),Mr=new E("MAT_EXPANSION_PANEL"),si=(()=>{class n{_template=g(jr$1);_expansionPanel=g(Mr,{optional:true});static \u0275fac=function(t){return new(t||n)};static \u0275dir=nr$1({type:n,selectors:[["ng-template","matExpansionPanelContent",""]]})}return n})(),Er=new E("MAT_EXPANSION_PANEL_DEFAULT_OPTIONS"),li=(()=>{class n extends vr{_viewContainerRef=g(yn$1);_animationsDisabled=_t();_document=g(K);_ngZone=g(V);_elementRef=g(Vt);_renderer=g(oi$1);_cleanupTransitionEnd;get hideToggle(){return this._hideToggle||this.accordion&&this.accordion.hideToggle}set hideToggle(e){this._hideToggle=e;}_hideToggle=false;get togglePosition(){return this._togglePosition||this.accordion&&this.accordion.togglePosition}set togglePosition(e){this._togglePosition=e;}_togglePosition;afterExpand=new Te$1;afterCollapse=new Te$1;_inputChanges=new re;accordion=g(ai,{optional:true,skipSelf:true});_lazyContent;_body;_bodyWrapper;_portal;_headerId=g(k).getId("mat-expansion-panel-header-");constructor(){super();let e=g(Er,{optional:true});this._expansionDispatcher=g(je),e&&(this.hideToggle=e.hideToggle);}_hasSpacing(){return this.accordion?this.expanded&&this.accordion.displayMode==="default":false}_getExpandedState(){return this.expanded?"expanded":"collapsed"}toggle(){this.expanded=!this.expanded;}close(){this.expanded=false;}open(){this.expanded=true;}ngAfterContentInit(){this._lazyContent&&this._lazyContent._expansionPanel===this&&this.opened.pipe(gu(null),Ce(()=>this.expanded&&!this._portal),Ue(1)).subscribe(()=>{this._portal=new ze(this._lazyContent._template,this._viewContainerRef);}),this._setupAnimationEvents();}ngOnChanges(e){this._inputChanges.next(e);}ngOnDestroy(){var e;super.ngOnDestroy(),(e=this._cleanupTransitionEnd)==null||e.call(this),this._inputChanges.complete();}_containsFocus(){if(this._body){let e=this._document.activeElement,t=this._body.nativeElement;return e===t||t.contains(e)}return  false}_transitionEndListener=({target:e,propertyName:t})=>{var r;e===((r=this._bodyWrapper)==null?void 0:r.nativeElement)&&t==="grid-template-rows"&&this._ngZone.run(()=>{this.expanded?this.afterExpand.emit():this.afterCollapse.emit();});};_setupAnimationEvents(){this._ngZone.runOutsideAngular(()=>{this._animationsDisabled?(this.opened.subscribe(()=>this._ngZone.run(()=>this.afterExpand.emit())),this.closed.subscribe(()=>this._ngZone.run(()=>this.afterCollapse.emit()))):setTimeout(()=>{let e=this._elementRef.nativeElement;this._cleanupTransitionEnd=this._renderer.listen(e,"transitionend",this._transitionEndListener),e.classList.add("mat-expansion-panel-animations-enabled");},200);});}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=kd({type:n,selectors:[["mat-expansion-panel"]],contentQueries:function(t,r,o){if(t&1&&Zd(o,si,5),t&2){let a;wy(a=Cy())&&(r._lazyContent=a.first);}},viewQuery:function(t,r){if(t&1&&Iy(da,5)(ca,5),t&2){let o;wy(o=Cy())&&(r._body=o.first),wy(o=Cy())&&(r._bodyWrapper=o.first);}},hostAttrs:[1,"mat-expansion-panel"],hostVars:4,hostBindings:function(t,r){t&2&&Ny("mat-expanded",r.expanded)("mat-expansion-panel-spacing",r._hasSpacing());},inputs:{hideToggle:[2,"hideToggle","hideToggle",di$1],togglePosition:"togglePosition"},outputs:{afterExpand:"afterExpand",afterCollapse:"afterCollapse"},exportAs:["matExpansionPanel"],features:[PS([{provide:ai,useValue:void 0},{provide:Mr,useExisting:n}]),uy,Xn$1],ngContentSelectors:fa,decls:9,vars:4,consts:[["bodyWrapper",""],["body",""],[1,"mat-expansion-panel-content-wrapper"],["role","region",1,"mat-expansion-panel-content",3,"id"],[1,"mat-expansion-panel-body"],[3,"cdkPortalOutlet"]],template:function(t,r){t&1&&(tS(ua),nS(0),wa(1,"div",2,0)(3,"div",3,1)(5,"div",4),nS(6,1),dy(7,ma,0,0,"ng-template",5),Vd(),nS(8,2),Vd()()),t&2&&(zw(),Ha("inert",r.expanded?null:""),zw(2),py("id",r.id),Ha("aria-labelledby",r._headerId),zw(4),py("cdkPortalOutlet",r._portal));},dependencies:[yr],styles:[`.mat-expansion-panel {
  box-sizing: content-box;
  display: block;
  margin: 0;
  overflow: hidden;
}
.mat-expansion-panel.mat-expansion-panel-animations-enabled {
  transition: margin 225ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-expansion-panel {
  position: relative;
  background: var(--mat-expansion-container-background-color, var(--mat-sys-surface));
  color: var(--mat-expansion-container-text-color, var(--mat-sys-on-surface));
  border-radius: var(--mat-expansion-container-shape, 12px);
}
.mat-expansion-panel:not([class*=mat-elevation-z]) {
  box-shadow: var(--mat-expansion-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
}
.mat-accordion .mat-expansion-panel:not(.mat-expanded), .mat-accordion .mat-expansion-panel:not(.mat-expansion-panel-spacing) {
  border-radius: 0;
}
.mat-accordion .mat-expansion-panel:first-of-type {
  border-top-right-radius: var(--mat-expansion-container-shape, 12px);
  border-top-left-radius: var(--mat-expansion-container-shape, 12px);
}
.mat-accordion .mat-expansion-panel:last-of-type {
  border-bottom-right-radius: var(--mat-expansion-container-shape, 12px);
  border-bottom-left-radius: var(--mat-expansion-container-shape, 12px);
}
@media (forced-colors: active) {
  .mat-expansion-panel {
    outline: solid 1px;
  }
}

.mat-expansion-panel-content-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  grid-template-columns: 100%;
}
.mat-expansion-panel-animations-enabled .mat-expansion-panel-content-wrapper {
  transition: grid-template-rows 225ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-expansion-panel.mat-expanded > .mat-expansion-panel-content-wrapper {
  grid-template-rows: 1fr;
}
@supports not (grid-template-rows: 0fr) {
  .mat-expansion-panel-content-wrapper {
    height: 0;
  }
  .mat-expansion-panel.mat-expanded > .mat-expansion-panel-content-wrapper {
    height: auto;
  }
}
@media print {
  .mat-expansion-panel-content-wrapper {
    height: 0;
  }
  .mat-expansion-panel.mat-expanded > .mat-expansion-panel-content-wrapper {
    height: auto;
  }
}

.mat-expansion-panel-content {
  display: flex;
  flex-direction: column;
  overflow: visible;
  min-height: 0;
  visibility: hidden;
}
.mat-expansion-panel-animations-enabled .mat-expansion-panel-content {
  transition: visibility 190ms linear;
}
.mat-expansion-panel.mat-expanded > .mat-expansion-panel-content-wrapper > .mat-expansion-panel-content {
  visibility: visible;
}
.mat-expansion-panel-content {
  font-family: var(--mat-expansion-container-text-font, var(--mat-sys-body-large-font));
  font-size: var(--mat-expansion-container-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-expansion-container-text-weight, var(--mat-sys-body-large-weight));
  line-height: var(--mat-expansion-container-text-line-height, var(--mat-sys-body-large-line-height));
  letter-spacing: var(--mat-expansion-container-text-tracking, var(--mat-sys-body-large-tracking));
}

.mat-expansion-panel-body {
  padding: 0 24px 16px;
}

.mat-expansion-panel-spacing {
  margin: 16px 0;
}
.mat-accordion > .mat-expansion-panel-spacing:first-child, .mat-accordion > *:first-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing {
  margin-top: 0;
}
.mat-accordion > .mat-expansion-panel-spacing:last-child, .mat-accordion > *:last-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing {
  margin-bottom: 0;
}

.mat-action-row {
  border-top-style: solid;
  border-top-width: 1px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 16px 8px 16px 24px;
  border-top-color: var(--mat-expansion-actions-divider-color, var(--mat-sys-outline));
}
.mat-action-row .mat-button-base,
.mat-action-row .mat-mdc-button-base {
  margin-left: 8px;
}
[dir=rtl] .mat-action-row .mat-button-base,
[dir=rtl] .mat-action-row .mat-mdc-button-base {
  margin-left: 0;
  margin-right: 8px;
}
`],encapsulation:2})}return n})();var di=(()=>{class n{panel=g(li,{host:true});_element=g(Vt);_focusMonitor=g(Yt);_changeDetectorRef=g(qr$1);_parentChangeSubscription=se$1.EMPTY;constructor(){g(be).load(Cr);let e=this.panel,t=g(Er,{optional:true}),r=g(new Za("tabindex"),{optional:true}),o=e.accordion?e.accordion._stateChanges.pipe(Ce(a=>!!(a.hideToggle||a.togglePosition))):ce;this.tabIndex=parseInt(r||"")||0,this._parentChangeSubscription=vE(e.opened,e.closed,o,e._inputChanges.pipe(Ce(a=>!!(a.hideToggle||a.disabled||a.togglePosition)))).subscribe(()=>this._changeDetectorRef.markForCheck()),e.closed.pipe(Ce(()=>e._containsFocus())).subscribe(()=>this._focusMonitor.focusVia(this._element,"program")),t&&(this.expandedHeight=t.expandedHeight,this.collapsedHeight=t.collapsedHeight);}expandedHeight;collapsedHeight;tabIndex=0;get disabled(){return this.panel.disabled}_toggle(){this.disabled||this.panel.toggle();}_isExpanded(){return this.panel.expanded}_getExpandedState(){return this.panel._getExpandedState()}_getPanelId(){return this.panel.id}_getTogglePosition(){return this.panel.togglePosition}_showToggle(){return !this.panel.hideToggle&&!this.panel.disabled}_getHeaderHeight(){let e=this._isExpanded();return e&&this.expandedHeight?this.expandedHeight:!e&&this.collapsedHeight?this.collapsedHeight:null}_keydown(e){switch(e.keyCode){case 32:case 13:ht(e)||(e.preventDefault(),this._toggle());break;default:this.panel.accordion&&this.panel.accordion._handleHeaderKeydown(e);return}}focus(e,t){e?this._focusMonitor.focusVia(this._element,e,t):this._element.nativeElement.focus(t);}ngAfterViewInit(){this._focusMonitor.monitor(this._element).subscribe(e=>{e&&this.panel.accordion&&this.panel.accordion._handleHeaderFocus(this);});}ngOnDestroy(){this._parentChangeSubscription.unsubscribe(),this._focusMonitor.stopMonitoring(this._element);}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=kd({type:n,selectors:[["mat-expansion-panel-header"]],hostAttrs:["role","button",1,"mat-expansion-panel-header","mat-focus-indicator"],hostVars:13,hostBindings:function(t,r){t&1&&Va("click",function(){return r._toggle()})("keydown",function(a){return r._keydown(a)}),t&2&&(Ha("id",r.panel._headerId)("tabindex",r.disabled?-1:r.tabIndex)("aria-controls",r._getPanelId())("aria-expanded",r._isExpanded())("aria-disabled",r.panel.disabled),My("height",r._getHeaderHeight()),Ny("mat-expanded",r._isExpanded())("mat-expansion-toggle-indicator-after",r._getTogglePosition()==="after")("mat-expansion-toggle-indicator-before",r._getTogglePosition()==="before"));},inputs:{expandedHeight:"expandedHeight",collapsedHeight:"collapsedHeight",tabIndex:[2,"tabIndex","tabIndex",e=>e==null?0:CT(e)]},ngContentSelectors:pa,decls:5,vars:3,consts:[[1,"mat-content"],[1,"mat-expansion-indicator"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 -960 960 960","aria-hidden","true","focusable","false"],["d","M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"]],template:function(t,r){t&1&&(tS(ha),zd(0,"span",0),nS(1),nS(2,1),nS(3,2),Gd(),Bb(4,ga,3,0,"span",1)),t&2&&(Ny("mat-content-hide-toggle",!r._showToggle()),zw(4),Hb(r._showToggle()?4:-1));},styles:[`.mat-expansion-panel-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 24px;
  border-radius: inherit;
}
.mat-expansion-panel-animations-enabled .mat-expansion-panel-header {
  transition: height 225ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-expansion-panel-header::before {
  border-radius: inherit;
}
.mat-expansion-panel-header {
  height: var(--mat-expansion-header-collapsed-state-height, 48px);
  font-family: var(--mat-expansion-header-text-font, var(--mat-sys-title-medium-font));
  font-size: var(--mat-expansion-header-text-size, var(--mat-sys-title-medium-size));
  font-weight: var(--mat-expansion-header-text-weight, var(--mat-sys-title-medium-weight));
  line-height: var(--mat-expansion-header-text-line-height, var(--mat-sys-title-medium-line-height));
  letter-spacing: var(--mat-expansion-header-text-tracking, var(--mat-sys-title-medium-tracking));
}
.mat-expansion-panel-header.mat-expanded {
  height: var(--mat-expansion-header-expanded-state-height, 64px);
}
.mat-expansion-panel-header[aria-disabled=true] {
  color: var(--mat-expansion-header-disabled-state-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-expansion-panel-header:not([aria-disabled=true]) {
  cursor: pointer;
}
.mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled=true]):hover {
  background: var(--mat-expansion-header-hover-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent));
}
@media (hover: none) {
  .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled=true]):hover {
    background: var(--mat-expansion-container-background-color, var(--mat-sys-surface));
  }
}
.mat-expansion-panel .mat-expansion-panel-header:not([aria-disabled=true]).cdk-keyboard-focused, .mat-expansion-panel .mat-expansion-panel-header:not([aria-disabled=true]).cdk-program-focused {
  background: var(--mat-expansion-header-focus-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent));
}
.mat-expansion-panel-header._mat-animation-noopable {
  transition: none;
}
.mat-expansion-panel-header:focus, .mat-expansion-panel-header:hover {
  outline: none;
}
.mat-expansion-panel-header.mat-expanded:focus, .mat-expansion-panel-header.mat-expanded:hover {
  background: inherit;
}
.mat-expansion-panel-header.mat-expansion-toggle-indicator-before {
  flex-direction: row-reverse;
}
.mat-expansion-panel-header.mat-expansion-toggle-indicator-before .mat-expansion-indicator {
  margin: 0 16px 0 0;
}
[dir=rtl] .mat-expansion-panel-header.mat-expansion-toggle-indicator-before .mat-expansion-indicator {
  margin: 0 0 0 16px;
}

.mat-content {
  display: flex;
  flex: 1;
  flex-direction: row;
  overflow: hidden;
}
.mat-content.mat-content-hide-toggle {
  margin-right: 8px;
}
[dir=rtl] .mat-content.mat-content-hide-toggle {
  margin-right: 0;
  margin-left: 8px;
}
.mat-expansion-toggle-indicator-before .mat-content.mat-content-hide-toggle {
  margin-left: 24px;
  margin-right: 0;
}
[dir=rtl] .mat-expansion-toggle-indicator-before .mat-content.mat-content-hide-toggle {
  margin-right: 24px;
  margin-left: 0;
}

.mat-expansion-panel-header-title {
  color: var(--mat-expansion-header-text-color, var(--mat-sys-on-surface));
}

.mat-expansion-panel-header-title,
.mat-expansion-panel-header-description {
  display: flex;
  flex-grow: 1;
  flex-basis: 0;
  margin-right: 16px;
  align-items: center;
}
[dir=rtl] .mat-expansion-panel-header-title,
[dir=rtl] .mat-expansion-panel-header-description {
  margin-right: 0;
  margin-left: 16px;
}
.mat-expansion-panel-header[aria-disabled=true] .mat-expansion-panel-header-title,
.mat-expansion-panel-header[aria-disabled=true] .mat-expansion-panel-header-description {
  color: inherit;
}

.mat-expansion-panel-header-description {
  flex-grow: 2;
  color: var(--mat-expansion-header-description-color, var(--mat-sys-on-surface-variant));
}

.mat-expansion-panel-animations-enabled .mat-expansion-indicator {
  transition: transform 225ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-expansion-panel-header.mat-expanded .mat-expansion-indicator {
  transform: rotate(180deg);
}
.mat-expansion-indicator::after {
  border-style: solid;
  border-width: 0 2px 2px 0;
  content: "";
  padding: 3px;
  transform: rotate(45deg);
  vertical-align: middle;
  color: var(--mat-expansion-header-indicator-color, var(--mat-sys-on-surface-variant));
  display: var(--mat-expansion-legacy-header-indicator-display, none);
}
.mat-expansion-indicator svg {
  width: 24px;
  height: 24px;
  margin: 0 -8px;
  vertical-align: middle;
  fill: var(--mat-expansion-header-indicator-color, var(--mat-sys-on-surface-variant));
  display: var(--mat-expansion-header-indicator-display, inline-block);
}

@media (forced-colors: active) {
  .mat-expansion-panel-content {
    border-top: 1px solid;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
}
`],encapsulation:2})}return n})();var wr=(()=>{class n extends _r{_keyManager;_ownHeaders=new ua$1;_headers;hideToggle=false;displayMode="default";togglePosition="after";ngAfterContentInit(){this._headers.changes.pipe(gu(this._headers)).subscribe(e=>{this._ownHeaders.reset(e.filter(t=>t.panel.accordion===this)),this._ownHeaders.notifyOnChanges();}),this._keyManager=new ke(this._ownHeaders).withWrap().withHomeAndEnd();}_handleHeaderKeydown(e){this._keyManager.onKeydown(e);}_handleHeaderFocus(e){this._keyManager.updateActiveItem(e);}ngOnDestroy(){var e;super.ngOnDestroy(),(e=this._keyManager)==null||e.destroy(),this._ownHeaders.destroy();}static \u0275fac=(()=>{let e;return function(r){return (e||(e=Bg(n)))(r||n)}})();static \u0275dir=nr$1({type:n,selectors:[["mat-accordion"]],contentQueries:function(t,r,o){if(t&1&&Zd(o,di,5),t&2){let a;wy(a=Cy())&&(r._headers=a);}},hostAttrs:[1,"mat-accordion"],hostVars:2,hostBindings:function(t,r){t&2&&Ny("mat-accordion-multi",r.multi);},inputs:{hideToggle:[2,"hideToggle","hideToggle",di$1],displayMode:"displayMode",togglePosition:"togglePosition"},exportAs:["matAccordion"],features:[PS([{provide:ai,useExisting:n}]),uy]})}return n})(),Dr=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=zt$1({type:n});static \u0275inj=yt$1({imports:[br,xr,ye]})}return n})();function _a(n,i){if(n&1){let e=Kb();wa(0,"section")(1,"mat-form-field",4)(2,"textarea",5),Fy("ngModelChange",function(r){Cp(e);let o=Xb().$implicit,a=Xb();return RS(a.contents[o].markdown,r)||(a.contents[o].markdown=r),bp(r)}),Vd(),xC(),Vd(),$a(3,"nge-markdown",6),Vd();}if(n&2){let e=Xb().$implicit,t=Xb();zw(2),Ly("ngModel",t.contents[e].markdown),kC(),zw(),py("data",t.contents[e].markdown);}}function va(n,i){if(n&1){let e=Kb();wa(0,"mat-expansion-panel",2),Va("opened",function(){let r=Cp(e).$implicit,o=Xb();return bp(o.load(r))}),wa(1,"mat-expansion-panel-header"),_S(2),Vd(),dy(3,_a,4,2,"ng-template",3),Vd();}if(n&2){let e=i.$implicit;zw(2),Py(e);}}var ci=(()=>{let i=class i{constructor(){this.http=g(Av),this.titles=["Headers","Emphasis","Lists","Task List","Links","Images","Code","Tables","Blockquotes","Horizontal Rule","Admonitions","Emoji","Icons","Latex","Admonitions","TabbedSet"],this.contents={};}ngOnInit(){this.titles.forEach(t=>{this.contents[t]={expanded:false,markdown:""};});}load(t){let r=this.contents[t];if(r.expanded)return;r.expanded=true;let o="assets/docs/nge-markdown/cheatsheet/"+t.toLowerCase().replace(" ","-")+".md";cE(this.http.get(o,{responseType:"text"})).then(a=>{r.markdown=a;});}};i.\u0275fac=function(r){return new(r||i)},i.\u0275cmp=kd({type:i,selectors:[["app-markdown-cheat-sheet"]],decls:10,vars:0,consts:[["href","https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet","target","_blank"],["multi",""],[3,"opened"],["matExpansionPanelContent",""],["appearance","fill"],["cdkTextareaAutosize","","matInput","",3,"ngModelChange","ngModel"],[3,"data"]],template:function(r,o){r&1&&(wa(0,"h1"),_S(1,"Cheatsheet"),Vd(),wa(2,"p"),_S(3," The following examples are intended as a quick markdown reference and showcase. Some of the examples are based on "),wa(4,"a",0),_S(5,"Adam Pritchard work"),Vd(),_S(6,` of Markdown Cheat Sheet.
`),Vd(),wa(7,"mat-accordion",1),zb(8,va,4,1,"mat-expansion-panel",null,$b),Vd()),r&2&&(zw(8),Gb(o.titles));},dependencies:[wr,li,di,si,Le,Un,pr,ct,at,Pn,qt,cr$1],styles:["section[_ngcontent-%COMP%]{display:grid;grid-template-columns:50% 50%;grid-row-gap:16px;grid-column-gap:16px}"],changeDetection:1});let n=i;return n})();var bc=(()=>{let i=class i{constructor(){this.component=ci;}};i.\u0275fac=function(r){return new(r||i)},i.\u0275mod=zt$1({type:i}),i.\u0275inj=yt$1({imports:[uf,ct,mr$1,gr,He,Dr,ci]});let n=i;return n})();export{bc as CheatSheetModule};