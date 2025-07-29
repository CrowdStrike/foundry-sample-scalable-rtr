var ke="";function Ze(t){ke=t}function ei(t=""){if(!ke){const e=[...document.getElementsByTagName("script")],o=e.find(i=>i.hasAttribute("data-shoelace"));if(o)Ze(o.getAttribute("data-shoelace"));else{const i=e.find(r=>/shoelace(\.min)?\.js($|\?)/.test(r.src)||/shoelace-autoloader(\.min)?\.js($|\?)/.test(r.src));let s="";i&&(s=i.getAttribute("src")),Ze(s.split("/").slice(0,-1).join("/"))}}return ke.replace(/\/$/,"")+(t?`/${t.replace(/^\//,"")}`:"")}var ko=Object.defineProperty,oi=Object.defineProperties,ii=Object.getOwnPropertyDescriptor,si=Object.getOwnPropertyDescriptors,Je=Object.getOwnPropertySymbols,ri=Object.prototype.hasOwnProperty,ni=Object.prototype.propertyIsEnumerable,ve=(t,e)=>(e=Symbol[t])?e:Symbol.for("Symbol."+t),Te=t=>{throw TypeError(t)},Qe=(t,e,o)=>e in t?ko(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,Ct=(t,e)=>{for(var o in e||(e={}))ri.call(e,o)&&Qe(t,o,e[o]);if(Je)for(var o of Je(e))ni.call(e,o)&&Qe(t,o,e[o]);return t},de=(t,e)=>oi(t,si(e)),a=(t,e,o,i)=>{for(var s=i>1?void 0:i?ii(e,o):e,r=t.length-1,n;r>=0;r--)(n=t[r])&&(s=(i?n(e,o,s):n(s))||s);return i&&s&&ko(e,o,s),s},Ao=(t,e,o)=>e.has(t)||Te("Cannot "+o),li=(t,e,o)=>(Ao(t,e,"read from private field"),e.get(t)),ai=(t,e,o)=>e.has(t)?Te("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,o),ci=(t,e,o,i)=>(Ao(t,e,"write to private field"),e.set(t,o),o),di=function(t,e){this[0]=t,this[1]=e},ui=t=>{var e=t[ve("asyncIterator")],o=!1,i,s={};return e==null?(e=t[ve("iterator")](),i=r=>s[r]=n=>e[r](n)):(e=e.call(t),i=r=>s[r]=n=>{if(o){if(o=!1,r==="throw")throw n;return n}return o=!0,{done:!1,value:new di(new Promise(l=>{var c=e[r](n);c instanceof Object||Te("Object expected"),l(c)}),1)}}),s[ve("iterator")]=()=>s,i("next"),"throw"in e?i("throw"):s.throw=r=>{throw r},"return"in e&&i("return"),s},hi={name:"default",resolver:t=>ei(`assets/icons/${t}.svg`)},pi=hi,to={caret:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `,check:`
    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor">
          <g transform="translate(3.428571, 3.428571)">
            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"chevron-down":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,"chevron-left":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `,"chevron-right":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,copy:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>
    </svg>
  `,eye:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  `,"eye-slash":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  `,eyedropper:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>
    </svg>
  `,"grip-vertical":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">
      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
    </svg>
  `,indeterminate:`
    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor" stroke-width="2">
          <g transform="translate(2.285714, 6.857143)">
            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"person-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `,"play-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
    </svg>
  `,"pause-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
    </svg>
  `,radio:`
    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g fill="currentColor">
          <circle cx="8" cy="8" r="3.42857143"></circle>
        </g>
      </g>
    </svg>
  `,"star-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `,"x-lg":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
  `,"x-circle-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
    </svg>
  `},fi={name:"system",resolver:t=>t in to?`data:image/svg+xml,${encodeURIComponent(to[t])}`:""},gi=fi,bi=[pi,gi],Ae=[];function mi(t){Ae.push(t)}function vi(t){Ae=Ae.filter(e=>e!==t)}function eo(t){return bi.find(e=>e.name===t)}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const te=globalThis,De=te.ShadowRoot&&(te.ShadyCSS===void 0||te.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Re=Symbol(),oo=new WeakMap;let So=class{constructor(e,o,i){if(this._$cssResult$=!0,i!==Re)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=o}get styleSheet(){let e=this.o;const o=this.t;if(De&&e===void 0){const i=o!==void 0&&o.length===1;i&&(e=oo.get(o)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&oo.set(o,e))}return e}toString(){return this.cssText}};const yi=t=>new So(typeof t=="string"?t:t+"",void 0,Re),V=(t,...e)=>{const o=t.length===1?t[0]:e.reduce((i,s,r)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[r+1],t[0]);return new So(o,t,Re)},wi=(t,e)=>{if(De)t.adoptedStyleSheets=e.map(o=>o instanceof CSSStyleSheet?o:o.styleSheet);else for(const o of e){const i=document.createElement("style"),s=te.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=o.cssText,t.appendChild(i)}},io=De?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let o="";for(const i of e.cssRules)o+=i.cssText;return yi(o)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:_i,defineProperty:xi,getOwnPropertyDescriptor:$i,getOwnPropertyNames:Ci,getOwnPropertySymbols:ki,getPrototypeOf:Ai}=Object,ue=globalThis,so=ue.trustedTypes,Si=so?so.emptyScript:"",Ei=ue.reactiveElementPolyfillSupport,Ut=(t,e)=>t,se={toAttribute(t,e){switch(e){case Boolean:t=t?Si:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=t!==null;break;case Number:o=t===null?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch{o=null}}return o}},Me=(t,e)=>!_i(t,e),ro={attribute:!0,type:String,converter:se,reflect:!1,useDefault:!1,hasChanged:Me};Symbol.metadata??=Symbol("metadata"),ue.litPropertyMetadata??=new WeakMap;let St=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,o=ro){if(o.state&&(o.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((o=Object.create(o)).wrapped=!0),this.elementProperties.set(e,o),!o.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,o);s!==void 0&&xi(this.prototype,e,s)}}static getPropertyDescriptor(e,o,i){const{get:s,set:r}=$i(this.prototype,e)??{get(){return this[o]},set(n){this[o]=n}};return{get:s,set(n){const l=s?.call(this);r?.call(this,n),this.requestUpdate(e,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ro}static _$Ei(){if(this.hasOwnProperty(Ut("elementProperties")))return;const e=Ai(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Ut("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Ut("properties"))){const o=this.properties,i=[...Ci(o),...ki(o)];for(const s of i)this.createProperty(s,o[s])}const e=this[Symbol.metadata];if(e!==null){const o=litPropertyMetadata.get(e);if(o!==void 0)for(const[i,s]of o)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[o,i]of this.elementProperties){const s=this._$Eu(o,i);s!==void 0&&this._$Eh.set(s,o)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const o=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const s of i)o.unshift(io(s))}else e!==void 0&&o.push(io(e));return o}static _$Eu(e,o){const i=o.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,o=this.constructor.elementProperties;for(const i of o.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return wi(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,o,i){this._$AK(e,i)}_$ET(e,o){const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){const r=(i.converter?.toAttribute!==void 0?i.converter:se).toAttribute(o,i.type);this._$Em=e,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(e,o){const i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){const r=i.getPropertyOptions(s),n=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:se;this._$Em=s,this[s]=n.fromAttribute(o,r.type)??this._$Ej?.get(s)??null,this._$Em=null}}requestUpdate(e,o,i){if(e!==void 0){const s=this.constructor,r=this[e];if(i??=s.getPropertyOptions(e),!((i.hasChanged??Me)(r,o)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,i))))return;this.C(e,o,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,o,{useDefault:i,reflect:s,wrapped:r},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??o??this[e]),r!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(o=void 0),this._$AL.set(e,o)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(o){Promise.reject(o)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[s,r]of i){const{wrapped:n}=r,l=this[s];n!==!0||this._$AL.has(s)||l===void 0||this.C(s,void 0,r,l)}}let e=!1;const o=this._$AL;try{e=this.shouldUpdate(o),e?(this.willUpdate(o),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(o)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(o)}willUpdate(e){}_$AE(e){this._$EO?.forEach(o=>o.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(o=>this._$ET(o,this[o])),this._$EM()}updated(e){}firstUpdated(e){}};St.elementStyles=[],St.shadowRootOptions={mode:"open"},St[Ut("elementProperties")]=new Map,St[Ut("finalized")]=new Map,Ei?.({ReactiveElement:St}),(ue.reactiveElementVersions??=[]).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Be=globalThis,re=Be.trustedTypes,no=re?re.createPolicy("lit-html",{createHTML:t=>t}):void 0,Eo="$lit$",ut=`lit$${Math.random().toFixed(9).slice(2)}$`,Oo="?"+ut,Oi=`<${Oo}>`,_t=document,jt=()=>_t.createComment(""),qt=t=>t===null||typeof t!="object"&&typeof t!="function",Fe=Array.isArray,zi=t=>Fe(t)||typeof t?.[Symbol.iterator]=="function",ye=`[ 	
\f\r]`,Mt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,lo=/-->/g,ao=/>/g,vt=RegExp(`>|${ye}(?:([^\\s"'>=/]+)(${ye}*=${ye}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),co=/'/g,uo=/"/g,zo=/^(?:script|style|textarea|title)$/i,Li=t=>(e,...o)=>({_$litType$:t,strings:e,values:o}),E=Li(1),pt=Symbol.for("lit-noChange"),S=Symbol.for("lit-nothing"),ho=new WeakMap,wt=_t.createTreeWalker(_t,129);function Lo(t,e){if(!Fe(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return no!==void 0?no.createHTML(e):e}const Pi=(t,e)=>{const o=t.length-1,i=[];let s,r=e===2?"<svg>":e===3?"<math>":"",n=Mt;for(let l=0;l<o;l++){const c=t[l];let d,h,p=-1,g=0;for(;g<c.length&&(n.lastIndex=g,h=n.exec(c),h!==null);)g=n.lastIndex,n===Mt?h[1]==="!--"?n=lo:h[1]!==void 0?n=ao:h[2]!==void 0?(zo.test(h[2])&&(s=RegExp("</"+h[2],"g")),n=vt):h[3]!==void 0&&(n=vt):n===vt?h[0]===">"?(n=s??Mt,p=-1):h[1]===void 0?p=-2:(p=n.lastIndex-h[2].length,d=h[1],n=h[3]===void 0?vt:h[3]==='"'?uo:co):n===uo||n===co?n=vt:n===lo||n===ao?n=Mt:(n=vt,s=void 0);const f=n===vt&&t[l+1].startsWith("/>")?" ":"";r+=n===Mt?c+Oi:p>=0?(i.push(d),c.slice(0,p)+Eo+c.slice(p)+ut+f):c+ut+(p===-2?l:f)}return[Lo(t,r+(t[o]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class Kt{constructor({strings:e,_$litType$:o},i){let s;this.parts=[];let r=0,n=0;const l=e.length-1,c=this.parts,[d,h]=Pi(e,o);if(this.el=Kt.createElement(d,i),wt.currentNode=this.el.content,o===2||o===3){const p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(s=wt.nextNode())!==null&&c.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(const p of s.getAttributeNames())if(p.endsWith(Eo)){const g=h[n++],f=s.getAttribute(p).split(ut),b=/([.?@])?(.*)/.exec(g);c.push({type:1,index:r,name:b[2],strings:f,ctor:b[1]==="."?Di:b[1]==="?"?Ri:b[1]==="@"?Mi:he}),s.removeAttribute(p)}else p.startsWith(ut)&&(c.push({type:6,index:r}),s.removeAttribute(p));if(zo.test(s.tagName)){const p=s.textContent.split(ut),g=p.length-1;if(g>0){s.textContent=re?re.emptyScript:"";for(let f=0;f<g;f++)s.append(p[f],jt()),wt.nextNode(),c.push({type:2,index:++r});s.append(p[g],jt())}}}else if(s.nodeType===8)if(s.data===Oo)c.push({type:2,index:r});else{let p=-1;for(;(p=s.data.indexOf(ut,p+1))!==-1;)c.push({type:7,index:r}),p+=ut.length-1}r++}}static createElement(e,o){const i=_t.createElement("template");return i.innerHTML=e,i}}function zt(t,e,o=t,i){if(e===pt)return e;let s=i!==void 0?o._$Co?.[i]:o._$Cl;const r=qt(e)?void 0:e._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),r===void 0?s=void 0:(s=new r(t),s._$AT(t,o,i)),i!==void 0?(o._$Co??=[])[i]=s:o._$Cl=s),s!==void 0&&(e=zt(t,s._$AS(t,e.values),s,i)),e}class Ti{constructor(e,o){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=o}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:o},parts:i}=this._$AD,s=(e?.creationScope??_t).importNode(o,!0);wt.currentNode=s;let r=wt.nextNode(),n=0,l=0,c=i[0];for(;c!==void 0;){if(n===c.index){let d;c.type===2?d=new Xt(r,r.nextSibling,this,e):c.type===1?d=new c.ctor(r,c.name,c.strings,this,e):c.type===6&&(d=new Bi(r,this,e)),this._$AV.push(d),c=i[++l]}n!==c?.index&&(r=wt.nextNode(),n++)}return wt.currentNode=_t,s}p(e){let o=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,o),o+=i.strings.length-2):i._$AI(e[o])),o++}}class Xt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,o,i,s){this.type=2,this._$AH=S,this._$AN=void 0,this._$AA=e,this._$AB=o,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const o=this._$AM;return o!==void 0&&e?.nodeType===11&&(e=o.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,o=this){e=zt(this,e,o),qt(e)?e===S||e==null||e===""?(this._$AH!==S&&this._$AR(),this._$AH=S):e!==this._$AH&&e!==pt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):zi(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==S&&qt(this._$AH)?this._$AA.nextSibling.data=e:this.T(_t.createTextNode(e)),this._$AH=e}$(e){const{values:o,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=Kt.createElement(Lo(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(o);else{const r=new Ti(s,this),n=r.u(this.options);r.p(o),this.T(n),this._$AH=r}}_$AC(e){let o=ho.get(e.strings);return o===void 0&&ho.set(e.strings,o=new Kt(e)),o}k(e){Fe(this._$AH)||(this._$AH=[],this._$AR());const o=this._$AH;let i,s=0;for(const r of e)s===o.length?o.push(i=new Xt(this.O(jt()),this.O(jt()),this,this.options)):i=o[s],i._$AI(r),s++;s<o.length&&(this._$AR(i&&i._$AB.nextSibling,s),o.length=s)}_$AR(e=this._$AA.nextSibling,o){for(this._$AP?.(!1,!0,o);e&&e!==this._$AB;){const i=e.nextSibling;e.remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class he{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,o,i,s,r){this.type=1,this._$AH=S,this._$AN=void 0,this.element=e,this.name=o,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=S}_$AI(e,o=this,i,s){const r=this.strings;let n=!1;if(r===void 0)e=zt(this,e,o,0),n=!qt(e)||e!==this._$AH&&e!==pt,n&&(this._$AH=e);else{const l=e;let c,d;for(e=r[0],c=0;c<r.length-1;c++)d=zt(this,l[i+c],o,c),d===pt&&(d=this._$AH[c]),n||=!qt(d)||d!==this._$AH[c],d===S?e=S:e!==S&&(e+=(d??"")+r[c+1]),this._$AH[c]=d}n&&!s&&this.j(e)}j(e){e===S?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Di extends he{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===S?void 0:e}}class Ri extends he{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==S)}}class Mi extends he{constructor(e,o,i,s,r){super(e,o,i,s,r),this.type=5}_$AI(e,o=this){if((e=zt(this,e,o,0)??S)===pt)return;const i=this._$AH,s=e===S&&i!==S||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==S&&(i===S||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class Bi{constructor(e,o,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=o,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){zt(this,e)}}const Fi=Be.litHtmlPolyfillSupport;Fi?.(Kt,Xt),(Be.litHtmlVersions??=[]).push("3.3.0");const Vi=(t,e,o)=>{const i=o?.renderBefore??e;let s=i._$litPart$;if(s===void 0){const r=o?.renderBefore??null;i._$litPart$=s=new Xt(e.insertBefore(jt(),r),r,void 0,o??{})}return s._$AI(t),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ve=globalThis;let Wt=class extends St{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Vi(o,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return pt}};Wt._$litElement$=!0,Wt.finalized=!0,Ve.litElementHydrateSupport?.({LitElement:Wt});const Ni=Ve.litElementPolyfillSupport;Ni?.({LitElement:Wt});(Ve.litElementVersions??=[]).push("4.2.0");var Hi=V`
  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`;function N(t,e){const o=Ct({waitUntilFirstUpdate:!1},e);return(i,s)=>{const{update:r}=i,n=Array.isArray(t)?t:[t];i.update=function(l){n.forEach(c=>{const d=c;if(l.has(d)){const h=l.get(d),p=this[d];h!==p&&(!o.waitUntilFirstUpdate||this.hasUpdated)&&this[s](h,p)}}),r.call(this,l)}}}var q=V`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ii={attribute:!0,type:String,converter:se,reflect:!1,hasChanged:Me},Ui=(t=Ii,e,o)=>{const{kind:i,metadata:s}=o;let r=globalThis.litPropertyMetadata.get(s);if(r===void 0&&globalThis.litPropertyMetadata.set(s,r=new Map),i==="setter"&&((t=Object.create(t)).wrapped=!0),r.set(o.name,t),i==="accessor"){const{name:n}=o;return{set(l){const c=e.get.call(this);e.set.call(this,l),this.requestUpdate(n,c,t)},init(l){return l!==void 0&&this.C(n,void 0,t,l),l}}}if(i==="setter"){const{name:n}=o;return function(l){const c=this[n];e.call(this,l),this.requestUpdate(n,c,t)}}throw Error("Unsupported decorator location: "+i)};function u(t){return(e,o)=>typeof o=="object"?Ui(t,e,o):((i,s,r)=>{const n=s.hasOwnProperty(r);return s.constructor.createProperty(r,i),n?Object.getOwnPropertyDescriptor(s,r):void 0})(t,e,o)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function R(t){return u({...t,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Wi=(t,e,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,o),o);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function z(t,e){return(o,i,s)=>{const r=n=>n.renderRoot?.querySelector(t)??null;return Wi(o,i,{get(){return r(this)}})}}var ee,D=class extends Wt{constructor(){super(),ai(this,ee,!1),this.initialReflectedProperties=new Map,Object.entries(this.constructor.dependencies).forEach(([t,e])=>{this.constructor.define(t,e)})}emit(t,e){const o=new CustomEvent(t,Ct({bubbles:!0,cancelable:!1,composed:!0,detail:{}},e));return this.dispatchEvent(o),o}static define(t,e=this,o={}){const i=customElements.get(t);if(!i){try{customElements.define(t,e,o)}catch{customElements.define(t,class extends e{},o)}return}let s=" (unknown version)",r=s;"version"in e&&e.version&&(s=" v"+e.version),"version"in i&&i.version&&(r=" v"+i.version),!(s&&r&&s===r)&&console.warn(`Attempted to register <${t}>${s}, but <${t}>${r} has already been registered.`)}attributeChangedCallback(t,e,o){li(this,ee)||(this.constructor.elementProperties.forEach((i,s)=>{i.reflect&&this[s]!=null&&this.initialReflectedProperties.set(s,this[s])}),ci(this,ee,!0)),super.attributeChangedCallback(t,e,o)}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach((e,o)=>{t.has(o)&&this[o]==null&&(this[o]=e)})}};ee=new WeakMap;D.version="2.20.1";D.dependencies={};a([u()],D.prototype,"dir",2);a([u()],D.prototype,"lang",2);/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ji=(t,e)=>t?._$litType$!==void 0;var Bt=Symbol(),Zt=Symbol(),we,_e=new Map,H=class extends D{constructor(){super(...arguments),this.initialRender=!1,this.svg=null,this.label="",this.library="default"}async resolveIcon(t,e){var o;let i;if(e?.spriteSheet)return this.svg=E`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,this.svg;try{if(i=await fetch(t,{mode:"cors"}),!i.ok)return i.status===410?Bt:Zt}catch{return Zt}try{const s=document.createElement("div");s.innerHTML=await i.text();const r=s.firstElementChild;if(((o=r?.tagName)==null?void 0:o.toLowerCase())!=="svg")return Bt;we||(we=new DOMParser);const l=we.parseFromString(r.outerHTML,"text/html").body.querySelector("svg");return l?(l.part.add("svg"),document.adoptNode(l)):Bt}catch{return Bt}}connectedCallback(){super.connectedCallback(),mi(this)}firstUpdated(){this.initialRender=!0,this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),vi(this)}getIconSource(){const t=eo(this.library);return this.name&&t?{url:t.resolver(this.name),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){var t;const{url:e,fromLibrary:o}=this.getIconSource(),i=o?eo(this.library):void 0;if(!e){this.svg=null;return}let s=_e.get(e);if(s||(s=this.resolveIcon(e,i),_e.set(e,s)),!this.initialRender)return;const r=await s;if(r===Zt&&_e.delete(e),e===this.getIconSource().url){if(ji(r)){if(this.svg=r,i){await this.updateComplete;const n=this.shadowRoot.querySelector("[part='svg']");typeof i.mutator=="function"&&n&&i.mutator(n)}return}switch(r){case Zt:case Bt:this.svg=null,this.emit("sl-error");break;default:this.svg=r.cloneNode(!0),(t=i?.mutator)==null||t.call(i,this.svg),this.emit("sl-load")}}}render(){return this.svg}};H.styles=[q,Hi];a([R()],H.prototype,"svg",2);a([u({reflect:!0})],H.prototype,"name",2);a([u()],H.prototype,"src",2);a([u()],H.prototype,"label",2);a([u({reflect:!0})],H.prototype,"library",2);a([N("label")],H.prototype,"handleLabelChange",1);a([N(["name","src","library"])],H.prototype,"setIcon",1);var qi=V`
  :host {
    display: inline-block;
  }

  .button-group {
    display: flex;
    flex-wrap: nowrap;
  }
`,pe=class extends D{constructor(){super(...arguments),this.disableRole=!1,this.label=""}handleFocus(t){const e=Ft(t.target);e?.toggleAttribute("data-sl-button-group__button--focus",!0)}handleBlur(t){const e=Ft(t.target);e?.toggleAttribute("data-sl-button-group__button--focus",!1)}handleMouseOver(t){const e=Ft(t.target);e?.toggleAttribute("data-sl-button-group__button--hover",!0)}handleMouseOut(t){const e=Ft(t.target);e?.toggleAttribute("data-sl-button-group__button--hover",!1)}handleSlotChange(){const t=[...this.defaultSlot.assignedElements({flatten:!0})];t.forEach(e=>{const o=t.indexOf(e),i=Ft(e);i&&(i.toggleAttribute("data-sl-button-group__button",!0),i.toggleAttribute("data-sl-button-group__button--first",o===0),i.toggleAttribute("data-sl-button-group__button--inner",o>0&&o<t.length-1),i.toggleAttribute("data-sl-button-group__button--last",o===t.length-1),i.toggleAttribute("data-sl-button-group__button--radio",i.tagName.toLowerCase()==="sl-radio-button"))})}render(){return E`
      <div
        part="base"
        class="button-group"
        role="${this.disableRole?"presentation":"group"}"
        aria-label=${this.label}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `}};pe.styles=[q,qi];a([z("slot")],pe.prototype,"defaultSlot",2);a([R()],pe.prototype,"disableRole",2);a([u()],pe.prototype,"label",2);function Ft(t){var e;const o="sl-button, sl-radio-button";return(e=t.closest(o))!=null?e:t.querySelector(o)}var Ki=V`
  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
    flex: none;
  }

  .spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
  }

  .spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 0.05em, 3em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.05em, 3em;
    }
  }
`;const Se=new Set,Et=new Map;let yt,Ne="ltr",He="en";const Po=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(Po){const t=new MutationObserver(Do);Ne=document.documentElement.dir||"ltr",He=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function To(...t){t.map(e=>{const o=e.$code.toLowerCase();Et.has(o)?Et.set(o,Object.assign(Object.assign({},Et.get(o)),e)):Et.set(o,e),yt||(yt=e)}),Do()}function Do(){Po&&(Ne=document.documentElement.dir||"ltr",He=document.documentElement.lang||navigator.language),[...Se.keys()].map(t=>{typeof t.requestUpdate=="function"&&t.requestUpdate()})}let Yi=class{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){Se.add(this.host)}hostDisconnected(){Se.delete(this.host)}dir(){return`${this.host.dir||Ne}`.toLowerCase()}lang(){return`${this.host.lang||He}`.toLowerCase()}getTranslationData(e){var o,i;const s=new Intl.Locale(e.replace(/_/g,"-")),r=s?.language.toLowerCase(),n=(i=(o=s?.region)===null||o===void 0?void 0:o.toLowerCase())!==null&&i!==void 0?i:"",l=Et.get(`${r}-${n}`),c=Et.get(r);return{locale:s,language:r,region:n,primary:l,secondary:c}}exists(e,o){var i;const{primary:s,secondary:r}=this.getTranslationData((i=o.lang)!==null&&i!==void 0?i:this.lang());return o=Object.assign({includeFallback:!1},o),!!(s&&s[e]||r&&r[e]||o.includeFallback&&yt&&yt[e])}term(e,...o){const{primary:i,secondary:s}=this.getTranslationData(this.lang());let r;if(i&&i[e])r=i[e];else if(s&&s[e])r=s[e];else if(yt&&yt[e])r=yt[e];else return console.error(`No translation found for: ${String(e)}`),String(e);return typeof r=="function"?r(...o):r}date(e,o){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),o).format(e)}number(e,o){return e=Number(e),isNaN(e)?"":new Intl.NumberFormat(this.lang(),o).format(e)}relativeTime(e,o,i){return new Intl.RelativeTimeFormat(this.lang(),i).format(e,o)}};var Ro={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(t,e)=>`Go to slide ${t} of ${e}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:t=>t===0?"No options selected":t===1?"1 option selected":`${t} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format"};To(Ro);var Xi=Ro,mt=class extends Yi{};To(Xi);var Mo=class extends D{constructor(){super(...arguments),this.localize=new mt(this)}render(){return E`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};Mo.styles=[q,Ki];var Vt=new WeakMap,Nt=new WeakMap,Ht=new WeakMap,xe=new WeakSet,Jt=new WeakMap,Bo=class{constructor(t,e){this.handleFormData=o=>{const i=this.options.disabled(this.host),s=this.options.name(this.host),r=this.options.value(this.host),n=this.host.tagName.toLowerCase()==="sl-button";this.host.isConnected&&!i&&!n&&typeof s=="string"&&s.length>0&&typeof r<"u"&&(Array.isArray(r)?r.forEach(l=>{o.formData.append(s,l.toString())}):o.formData.append(s,r.toString()))},this.handleFormSubmit=o=>{var i;const s=this.options.disabled(this.host),r=this.options.reportValidity;this.form&&!this.form.noValidate&&((i=Vt.get(this.form))==null||i.forEach(n=>{this.setUserInteracted(n,!0)})),this.form&&!this.form.noValidate&&!s&&!r(this.host)&&(o.preventDefault(),o.stopImmediatePropagation())},this.handleFormReset=()=>{this.options.setValue(this.host,this.options.defaultValue(this.host)),this.setUserInteracted(this.host,!1),Jt.set(this.host,[])},this.handleInteraction=o=>{const i=Jt.get(this.host);i.includes(o.type)||i.push(o.type),i.length===this.options.assumeInteractionOn.length&&this.setUserInteracted(this.host,!0)},this.checkFormValidity=()=>{if(this.form&&!this.form.noValidate){const o=this.form.querySelectorAll("*");for(const i of o)if(typeof i.checkValidity=="function"&&!i.checkValidity())return!1}return!0},this.reportFormValidity=()=>{if(this.form&&!this.form.noValidate){const o=this.form.querySelectorAll("*");for(const i of o)if(typeof i.reportValidity=="function"&&!i.reportValidity())return!1}return!0},(this.host=t).addController(this),this.options=Ct({form:o=>{const i=o.form;if(i){const r=o.getRootNode().querySelector(`#${i}`);if(r)return r}return o.closest("form")},name:o=>o.name,value:o=>o.value,defaultValue:o=>o.defaultValue,disabled:o=>{var i;return(i=o.disabled)!=null?i:!1},reportValidity:o=>typeof o.reportValidity=="function"?o.reportValidity():!0,checkValidity:o=>typeof o.checkValidity=="function"?o.checkValidity():!0,setValue:(o,i)=>o.value=i,assumeInteractionOn:["sl-input"]},e)}hostConnected(){const t=this.options.form(this.host);t&&this.attachForm(t),Jt.set(this.host,[]),this.options.assumeInteractionOn.forEach(e=>{this.host.addEventListener(e,this.handleInteraction)})}hostDisconnected(){this.detachForm(),Jt.delete(this.host),this.options.assumeInteractionOn.forEach(t=>{this.host.removeEventListener(t,this.handleInteraction)})}hostUpdated(){const t=this.options.form(this.host);t||this.detachForm(),t&&this.form!==t&&(this.detachForm(),this.attachForm(t)),this.host.hasUpdated&&this.setValidity(this.host.validity.valid)}attachForm(t){t?(this.form=t,Vt.has(this.form)?Vt.get(this.form).add(this.host):Vt.set(this.form,new Set([this.host])),this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),Nt.has(this.form)||(Nt.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity()),Ht.has(this.form)||(Ht.set(this.form,this.form.checkValidity),this.form.checkValidity=()=>this.checkFormValidity())):this.form=void 0}detachForm(){if(!this.form)return;const t=Vt.get(this.form);t&&(t.delete(this.host),t.size<=0&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),Nt.has(this.form)&&(this.form.reportValidity=Nt.get(this.form),Nt.delete(this.form)),Ht.has(this.form)&&(this.form.checkValidity=Ht.get(this.form),Ht.delete(this.form)),this.form=void 0))}setUserInteracted(t,e){e?xe.add(t):xe.delete(t),t.requestUpdate()}doAction(t,e){if(this.form){const o=document.createElement("button");o.type=t,o.style.position="absolute",o.style.width="0",o.style.height="0",o.style.clipPath="inset(50%)",o.style.overflow="hidden",o.style.whiteSpace="nowrap",e&&(o.name=e.name,o.value=e.value,["formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(i=>{e.hasAttribute(i)&&o.setAttribute(i,e.getAttribute(i))})),this.form.append(o),o.click(),o.remove()}}getForm(){var t;return(t=this.form)!=null?t:null}reset(t){this.doAction("reset",t)}submit(t){this.doAction("submit",t)}setValidity(t){const e=this.host,o=!!xe.has(e),i=!!e.required;e.toggleAttribute("data-required",i),e.toggleAttribute("data-optional",!i),e.toggleAttribute("data-invalid",!t),e.toggleAttribute("data-valid",t),e.toggleAttribute("data-user-invalid",!t&&o),e.toggleAttribute("data-user-valid",t&&o)}updateValidity(){const t=this.host;this.setValidity(t.validity.valid)}emitInvalidEvent(t){const e=new CustomEvent("sl-invalid",{bubbles:!1,composed:!1,cancelable:!0,detail:{}});t||e.preventDefault(),this.host.dispatchEvent(e)||t?.preventDefault()}},Ie=Object.freeze({badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valid:!0,valueMissing:!1});Object.freeze(de(Ct({},Ie),{valid:!1,valueMissing:!0}));Object.freeze(de(Ct({},Ie),{valid:!1,customError:!0}));var Gi=V`
  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition:
      var(--sl-transition-x-fast) background-color,
      var(--sl-transition-x-fast) color,
      var(--sl-transition-x-fast) border,
      var(--sl-transition-x-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up from children */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label {
    display: inline-block;
  }

  .button__label::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-input-border-color);
    color: var(--sl-color-neutral-700);
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-300);
    color: var(--sl-color-primary-700);
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-100);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-500);
    border-color: var(--sl-color-success-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    border-color: var(--sl-input-border-color);
    color: var(--sl-color-neutral-700);
  }

  .button--outline.button--default:hover:not(.button--disabled),
  .button--outline.button--default.button--checked:not(.button--disabled) {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--default:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-primary-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-success-600);
  }

  .button--outline.button--success:hover:not(.button--disabled),
  .button--outline.button--success.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: var(--sl-color-success-700);
    background-color: var(--sl-color-success-700);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-600);
  }

  .button--outline.button--neutral:hover:not(.button--disabled),
  .button--outline.button--neutral.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: var(--sl-color-neutral-700);
    background-color: var(--sl-color-neutral-700);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .button--outline.button--warning:hover:not(.button--disabled),
  .button--outline.button--warning.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: var(--sl-color-warning-700);
    background-color: var(--sl-color-warning-700);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-danger-600);
  }

  .button--outline.button--danger:hover:not(.button--disabled),
  .button--outline.button--danger.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--sl-color-danger-700);
    background-color: var(--sl-color-danger-700);
    color: var(--sl-color-neutral-0);
  }

  @media (forced-colors: active) {
    .button.button--outline.button--checked:not(.button--disabled) {
      outline: solid 2px transparent;
    }
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-600);
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:focus-visible:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-700);
  }

  /*
   * Size modifiers
   */

  .button--small {
    height: auto;
    min-height: var(--sl-input-height-small);
    font-size: var(--sl-button-font-size-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    height: auto;
    min-height: var(--sl-input-height-medium);
    font-size: var(--sl-button-font-size-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    height: auto;
    min-height: var(--sl-input-height-large);
    font-size: var(--sl-button-font-size-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    height: auto;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  .button--rtl ::slotted(sl-badge) {
    right: auto;
    left: 0;
    translate: -50% -50%;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host([data-sl-button-group__button--first]:not([data-sl-button-group__button--last])) .button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host([data-sl-button-group__button--inner]) .button {
    border-radius: 0;
  }

  :host([data-sl-button-group__button--last]:not([data-sl-button-group__button--first])) .button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* All except the first */
  :host([data-sl-button-group__button]:not([data-sl-button-group__button--first])) {
    margin-inline-start: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(
      [data-sl-button-group__button]:not(
          [data-sl-button-group__button--first],
          [data-sl-button-group__button--radio],
          [variant='default']
        ):not(:hover)
    )
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
  :host([data-sl-button-group__button--hover]) {
    z-index: 1;
  }

  /* Focus and checked are always on top */
  :host([data-sl-button-group__button--focus]),
  :host([data-sl-button-group__button][checked]) {
    z-index: 2;
  }
`,Ue=class{constructor(t,...e){this.slotNames=[],this.handleSlotChange=o=>{const i=o.target;(this.slotNames.includes("[default]")&&!i.name||i.name&&this.slotNames.includes(i.name))&&this.host.requestUpdate()},(this.host=t).addController(this),this.slotNames=e}hasDefaultSlot(){return[...this.host.childNodes].some(t=>{if(t.nodeType===t.TEXT_NODE&&t.textContent.trim()!=="")return!0;if(t.nodeType===t.ELEMENT_NODE){const e=t;if(e.tagName.toLowerCase()==="sl-visually-hidden")return!1;if(!e.hasAttribute("slot"))return!0}return!1})}hasNamedSlot(t){return this.host.querySelector(`:scope > [slot="${t}"]`)!==null}test(t){return t==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Fo={ATTRIBUTE:1,CHILD:2},Vo=t=>(...e)=>({_$litDirective$:t,values:e});let No=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,o,i){this._$Ct=e,this._$AM=o,this._$Ci=i}_$AS(e,o){return this.update(e,o)}update(e,o){return this.render(...o)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const J=Vo(class extends No{constructor(t){if(super(t),t.type!==Fo.ATTRIBUTE||t.name!=="class"||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(i=>i!=="")));for(const i in e)e[i]&&!this.nt?.has(i)&&this.st.add(i);return this.render(e)}const o=t.element.classList;for(const i of this.st)i in e||(o.remove(i),this.st.delete(i));for(const i in e){const s=!!e[i];s===this.st.has(i)||this.nt?.has(i)||(s?(o.add(i),this.st.add(i)):(o.remove(i),this.st.delete(i)))}return pt}});/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ho=Symbol.for(""),Zi=t=>{if(t?.r===Ho)return t?._$litStatic$},ne=(t,...e)=>({_$litStatic$:e.reduce((o,i,s)=>o+(r=>{if(r._$litStatic$!==void 0)return r._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${r}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(i)+t[s+1],t[0]),r:Ho}),po=new Map,Ji=t=>(e,...o)=>{const i=o.length;let s,r;const n=[],l=[];let c,d=0,h=!1;for(;d<i;){for(c=e[d];d<i&&(r=o[d],(s=Zi(r))!==void 0);)c+=s+e[++d],h=!0;d!==i&&l.push(r),n.push(c),d++}if(d===i&&n.push(e[i]),h){const p=n.join("$$lit$$");(e=po.get(p))===void 0&&(n.raw=n,po.set(p,e=n)),o=l}return t(e,...o)},oe=Ji(E);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const A=t=>t??S;var x=class extends D{constructor(){super(...arguments),this.formControlController=new Bo(this,{assumeInteractionOn:["click"]}),this.hasSlotController=new Ue(this,"[default]","prefix","suffix"),this.localize=new mt(this),this.hasFocus=!1,this.invalid=!1,this.title="",this.variant="default",this.size="medium",this.caret=!1,this.disabled=!1,this.loading=!1,this.outline=!1,this.pill=!1,this.circle=!1,this.type="button",this.name="",this.value="",this.href="",this.rel="noreferrer noopener"}get validity(){return this.isButton()?this.button.validity:Ie}get validationMessage(){return this.isButton()?this.button.validationMessage:""}firstUpdated(){this.isButton()&&this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(){this.type==="submit"&&this.formControlController.submit(this),this.type==="reset"&&this.formControlController.reset(this)}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.isButton()&&this.formControlController.setValidity(this.disabled)}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}checkValidity(){return this.isButton()?this.button.checkValidity():!0}getForm(){return this.formControlController.getForm()}reportValidity(){return this.isButton()?this.button.reportValidity():!0}setCustomValidity(t){this.isButton()&&(this.button.setCustomValidity(t),this.formControlController.updateValidity())}render(){const t=this.isLink(),e=t?ne`a`:ne`button`;return oe`
      <${e}
        part="base"
        class=${J({button:!0,"button--default":this.variant==="default","button--primary":this.variant==="primary","button--success":this.variant==="success","button--neutral":this.variant==="neutral","button--warning":this.variant==="warning","button--danger":this.variant==="danger","button--text":this.variant==="text","button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--caret":this.caret,"button--circle":this.circle,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--loading":this.loading,"button--standard":!this.outline,"button--outline":this.outline,"button--pill":this.pill,"button--rtl":this.localize.dir()==="rtl","button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
        ?disabled=${A(t?void 0:this.disabled)}
        type=${A(t?void 0:this.type)}
        title=${this.title}
        name=${A(t?void 0:this.name)}
        value=${A(t?void 0:this.value)}
        href=${A(t&&!this.disabled?this.href:void 0)}
        target=${A(t?this.target:void 0)}
        download=${A(t?this.download:void 0)}
        rel=${A(t?this.rel:void 0)}
        role=${A(t?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @invalid=${this.isButton()?this.handleInvalid:null}
        @click=${this.handleClick}
      >
        <slot name="prefix" part="prefix" class="button__prefix"></slot>
        <slot part="label" class="button__label"></slot>
        <slot name="suffix" part="suffix" class="button__suffix"></slot>
        ${this.caret?oe` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> `:""}
        ${this.loading?oe`<sl-spinner part="spinner"></sl-spinner>`:""}
      </${e}>
    `}};x.styles=[q,Gi];x.dependencies={"sl-icon":H,"sl-spinner":Mo};a([z(".button")],x.prototype,"button",2);a([R()],x.prototype,"hasFocus",2);a([R()],x.prototype,"invalid",2);a([u()],x.prototype,"title",2);a([u({reflect:!0})],x.prototype,"variant",2);a([u({reflect:!0})],x.prototype,"size",2);a([u({type:Boolean,reflect:!0})],x.prototype,"caret",2);a([u({type:Boolean,reflect:!0})],x.prototype,"disabled",2);a([u({type:Boolean,reflect:!0})],x.prototype,"loading",2);a([u({type:Boolean,reflect:!0})],x.prototype,"outline",2);a([u({type:Boolean,reflect:!0})],x.prototype,"pill",2);a([u({type:Boolean,reflect:!0})],x.prototype,"circle",2);a([u()],x.prototype,"type",2);a([u()],x.prototype,"name",2);a([u()],x.prototype,"value",2);a([u()],x.prototype,"href",2);a([u()],x.prototype,"target",2);a([u()],x.prototype,"rel",2);a([u()],x.prototype,"download",2);a([u()],x.prototype,"form",2);a([u({attribute:"formaction"})],x.prototype,"formAction",2);a([u({attribute:"formenctype"})],x.prototype,"formEnctype",2);a([u({attribute:"formmethod"})],x.prototype,"formMethod",2);a([u({attribute:"formnovalidate",type:Boolean})],x.prototype,"formNoValidate",2);a([u({attribute:"formtarget"})],x.prototype,"formTarget",2);a([N("disabled",{waitUntilFirstUpdate:!0})],x.prototype,"handleDisabledChange",1);function*We(t=document.activeElement){t!=null&&(yield t,"shadowRoot"in t&&t.shadowRoot&&t.shadowRoot.mode!=="closed"&&(yield*ui(We(t.shadowRoot.activeElement))))}function Qi(){return[...We()].pop()}var fo=new WeakMap;function Io(t){let e=fo.get(t);return e||(e=window.getComputedStyle(t,null),fo.set(t,e)),e}function ts(t){if(typeof t.checkVisibility=="function")return t.checkVisibility({checkOpacity:!1,checkVisibilityCSS:!0});const e=Io(t);return e.visibility!=="hidden"&&e.display!=="none"}function es(t){const e=Io(t),{overflowY:o,overflowX:i}=e;return o==="scroll"||i==="scroll"?!0:o!=="auto"||i!=="auto"?!1:t.scrollHeight>t.clientHeight&&o==="auto"||t.scrollWidth>t.clientWidth&&i==="auto"}function os(t){const e=t.tagName.toLowerCase(),o=Number(t.getAttribute("tabindex"));if(t.hasAttribute("tabindex")&&(isNaN(o)||o<=-1)||t.hasAttribute("disabled")||t.closest("[inert]"))return!1;if(e==="input"&&t.getAttribute("type")==="radio"){const r=t.getRootNode(),n=`input[type='radio'][name="${t.getAttribute("name")}"]`,l=r.querySelector(`${n}:checked`);return l?l===t:r.querySelector(n)===t}return ts(t)?(e==="audio"||e==="video")&&t.hasAttribute("controls")||t.hasAttribute("tabindex")||t.hasAttribute("contenteditable")&&t.getAttribute("contenteditable")!=="false"||["button","input","select","textarea","a","audio","video","summary","iframe"].includes(e)?!0:es(t):!1}function is(t,e){var o;return((o=t.getRootNode({composed:!0}))==null?void 0:o.host)!==e}function go(t){const e=new WeakMap,o=[];function i(s){if(s instanceof Element){if(s.hasAttribute("inert")||s.closest("[inert]")||e.has(s))return;e.set(s,!0),!o.includes(s)&&os(s)&&o.push(s),s instanceof HTMLSlotElement&&is(s,t)&&s.assignedElements({flatten:!0}).forEach(r=>{i(r)}),s.shadowRoot!==null&&s.shadowRoot.mode==="open"&&i(s.shadowRoot)}for(const r of s.children)i(r)}return i(t),o.sort((s,r)=>{const n=Number(s.getAttribute("tabindex"))||0;return(Number(r.getAttribute("tabindex"))||0)-n})}var It=[],ss=class{constructor(t){this.tabDirection="forward",this.handleFocusIn=()=>{this.isActive()&&this.checkFocus()},this.handleKeyDown=e=>{var o;if(e.key!=="Tab"||this.isExternalActivated||!this.isActive())return;const i=Qi();if(this.previousFocus=i,this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus))return;e.shiftKey?this.tabDirection="backward":this.tabDirection="forward";const s=go(this.element);let r=s.findIndex(l=>l===i);this.previousFocus=this.currentFocus;const n=this.tabDirection==="forward"?1:-1;for(;;){r+n>=s.length?r=0:r+n<0?r=s.length-1:r+=n,this.previousFocus=this.currentFocus;const l=s[r];if(this.tabDirection==="backward"&&this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus)||l&&this.possiblyHasTabbableChildren(l))return;e.preventDefault(),this.currentFocus=l,(o=this.currentFocus)==null||o.focus({preventScroll:!1});const c=[...We()];if(c.includes(this.currentFocus)||!c.includes(this.previousFocus))break}setTimeout(()=>this.checkFocus())},this.handleKeyUp=()=>{this.tabDirection="forward"},this.element=t,this.elementsWithTabbableControls=["iframe"]}activate(){It.push(this.element),document.addEventListener("focusin",this.handleFocusIn),document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keyup",this.handleKeyUp)}deactivate(){It=It.filter(t=>t!==this.element),this.currentFocus=null,document.removeEventListener("focusin",this.handleFocusIn),document.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("keyup",this.handleKeyUp)}isActive(){return It[It.length-1]===this.element}activateExternal(){this.isExternalActivated=!0}deactivateExternal(){this.isExternalActivated=!1}checkFocus(){if(this.isActive()&&!this.isExternalActivated){const t=go(this.element);if(!this.element.matches(":focus-within")){const e=t[0],o=t[t.length-1],i=this.tabDirection==="forward"?e:o;typeof i?.focus=="function"&&(this.currentFocus=i,i.focus({preventScroll:!1}))}}}possiblyHasTabbableChildren(t){return this.elementsWithTabbableControls.includes(t.tagName.toLowerCase())||t.hasAttribute("controls")}};function rs(t,e){return{top:Math.round(t.getBoundingClientRect().top-e.getBoundingClientRect().top),left:Math.round(t.getBoundingClientRect().left-e.getBoundingClientRect().left)}}var Ee=new Set;function ns(){const t=document.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function ls(){const t=Number(getComputedStyle(document.body).paddingRight.replace(/px/,""));return isNaN(t)||!t?0:t}function bo(t){if(Ee.add(t),!document.documentElement.classList.contains("sl-scroll-lock")){const e=ns()+ls();let o=getComputedStyle(document.documentElement).scrollbarGutter;(!o||o==="auto")&&(o="stable"),e<2&&(o=""),document.documentElement.style.setProperty("--sl-scroll-lock-gutter",o),document.documentElement.classList.add("sl-scroll-lock"),document.documentElement.style.setProperty("--sl-scroll-lock-size",`${e}px`)}}function mo(t){Ee.delete(t),Ee.size===0&&(document.documentElement.classList.remove("sl-scroll-lock"),document.documentElement.style.removeProperty("--sl-scroll-lock-size"))}function as(t,e,o="vertical",i="smooth"){const s=rs(t,e),r=s.top+e.scrollTop,n=s.left+e.scrollLeft,l=e.scrollLeft,c=e.scrollLeft+e.offsetWidth,d=e.scrollTop,h=e.scrollTop+e.offsetHeight;(o==="horizontal"||o==="both")&&(n<l?e.scrollTo({left:n,behavior:i}):n+t.clientWidth>c&&e.scrollTo({left:n-e.offsetWidth+t.clientWidth,behavior:i})),(o==="vertical"||o==="both")&&(r<d?e.scrollTo({top:r,behavior:i}):r+t.clientHeight>h&&e.scrollTo({top:r-e.offsetHeight+t.clientHeight,behavior:i}))}var cs=V`
  :host {
    --width: 31rem;
    --header-spacing: var(--sl-spacing-large);
    --body-spacing: var(--sl-spacing-large);
    --footer-spacing: var(--sl-spacing-large);

    display: contents;
  }

  .dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: var(--sl-z-index-dialog);
  }

  .dialog__panel {
    display: flex;
    flex-direction: column;
    z-index: 2;
    width: var(--width);
    max-width: calc(100% - var(--sl-spacing-2x-large));
    max-height: calc(100% - var(--sl-spacing-2x-large));
    background-color: var(--sl-panel-background-color);
    border-radius: var(--sl-border-radius-medium);
    box-shadow: var(--sl-shadow-x-large);
  }

  .dialog__panel:focus {
    outline: none;
  }

  /* Ensure there's enough vertical padding for phones that don't update vh when chrome appears (e.g. iPhone) */
  @media screen and (max-width: 420px) {
    .dialog__panel {
      max-height: 80vh;
    }
  }

  .dialog--open .dialog__panel {
    display: flex;
    opacity: 1;
  }

  .dialog__header {
    flex: 0 0 auto;
    display: flex;
  }

  .dialog__title {
    flex: 1 1 auto;
    font: inherit;
    font-size: var(--sl-font-size-large);
    line-height: var(--sl-line-height-dense);
    padding: var(--header-spacing);
    margin: 0;
  }

  .dialog__header-actions {
    flex-shrink: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: end;
    gap: var(--sl-spacing-2x-small);
    padding: 0 var(--header-spacing);
  }

  .dialog__header-actions sl-icon-button,
  .dialog__header-actions ::slotted(sl-icon-button) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
  }

  .dialog__body {
    flex: 1 1 auto;
    display: block;
    padding: var(--body-spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .dialog__footer {
    flex: 0 0 auto;
    text-align: right;
    padding: var(--footer-spacing);
  }

  .dialog__footer ::slotted(sl-button:not(:first-of-type)) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  .dialog:not(.dialog--has-footer) .dialog__footer {
    display: none;
  }

  .dialog__overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--sl-overlay-background-color);
  }

  @media (forced-colors: active) {
    .dialog__panel {
      border: solid 1px var(--sl-color-neutral-0);
    }
  }
`,ds=t=>{var e;const{activeElement:o}=document;o&&t.contains(o)&&((e=document.activeElement)==null||e.blur())},us=V`
  :host {
    display: inline-block;
    color: var(--sl-color-neutral-600);
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus-visible:not(.icon-button--disabled) {
    color: var(--sl-color-primary-600);
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: var(--sl-color-primary-700);
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .icon-button__icon {
    pointer-events: none;
  }
`,M=class extends D{constructor(){super(...arguments),this.hasFocus=!1,this.label="",this.disabled=!1}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(t){this.disabled&&(t.preventDefault(),t.stopPropagation())}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}render(){const t=!!this.href,e=t?ne`a`:ne`button`;return oe`
      <${e}
        part="base"
        class=${J({"icon-button":!0,"icon-button--disabled":!t&&this.disabled,"icon-button--focused":this.hasFocus})}
        ?disabled=${A(t?void 0:this.disabled)}
        type=${A(t?void 0:"button")}
        href=${A(t?this.href:void 0)}
        target=${A(t?this.target:void 0)}
        download=${A(t?this.download:void 0)}
        rel=${A(t&&this.target?"noreferrer noopener":void 0)}
        role=${A(t?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        aria-label="${this.label}"
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${A(this.name)}
          library=${A(this.library)}
          src=${A(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${e}>
    `}};M.styles=[q,us];M.dependencies={"sl-icon":H};a([z(".icon-button")],M.prototype,"button",2);a([R()],M.prototype,"hasFocus",2);a([u()],M.prototype,"name",2);a([u()],M.prototype,"library",2);a([u()],M.prototype,"src",2);a([u()],M.prototype,"href",2);a([u()],M.prototype,"target",2);a([u()],M.prototype,"download",2);a([u()],M.prototype,"label",2);a([u({type:Boolean,reflect:!0})],M.prototype,"disabled",2);var Uo=new Map,hs=new WeakMap;function ps(t){return t??{keyframes:[],options:{duration:0}}}function vo(t,e){return e.toLowerCase()==="rtl"?{keyframes:t.rtlKeyframes||t.keyframes,options:t.options}:t}function rt(t,e){Uo.set(t,ps(e))}function it(t,e,o){const i=hs.get(t);if(i?.[e])return vo(i[e],o.dir);const s=Uo.get(e);return s?vo(s,o.dir):{keyframes:[],options:{duration:0}}}function Lt(t,e){return new Promise(o=>{function i(s){s.target===t&&(t.removeEventListener(e,i),o())}t.addEventListener(e,i)})}function st(t,e,o){return new Promise(i=>{if(o?.duration===1/0)throw new Error("Promise-based animations must be finite.");const s=t.animate(e,de(Ct({},o),{duration:fs()?0:o.duration}));s.addEventListener("cancel",i,{once:!0}),s.addEventListener("finish",i,{once:!0})})}function yo(t){return t=t.toString().toLowerCase(),t.indexOf("ms")>-1?parseFloat(t):t.indexOf("s")>-1?parseFloat(t)*1e3:parseFloat(t)}function fs(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function ht(t){return Promise.all(t.getAnimations().map(e=>new Promise(o=>{e.cancel(),requestAnimationFrame(o)})))}var nt=class extends D{constructor(){super(...arguments),this.hasSlotController=new Ue(this,"footer"),this.localize=new mt(this),this.modal=new ss(this),this.open=!1,this.label="",this.noHeader=!1,this.handleDocumentKeyDown=t=>{t.key==="Escape"&&this.modal.isActive()&&this.open&&(t.stopPropagation(),this.requestClose("keyboard"))}}firstUpdated(){this.dialog.hidden=!this.open,this.open&&(this.addOpenListeners(),this.modal.activate(),bo(this))}disconnectedCallback(){super.disconnectedCallback(),this.modal.deactivate(),mo(this),this.removeOpenListeners()}requestClose(t){if(this.emit("sl-request-close",{cancelable:!0,detail:{source:t}}).defaultPrevented){const o=it(this,"dialog.denyClose",{dir:this.localize.dir()});st(this.panel,o.keyframes,o.options);return}this.hide()}addOpenListeners(){var t;"CloseWatcher"in window?((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>this.requestClose("keyboard")):document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){var t;(t=this.closeWatcher)==null||t.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}async handleOpenChange(){if(this.open){this.emit("sl-show"),this.addOpenListeners(),this.originalTrigger=document.activeElement,this.modal.activate(),bo(this);const t=this.querySelector("[autofocus]");t&&t.removeAttribute("autofocus"),await Promise.all([ht(this.dialog),ht(this.overlay)]),this.dialog.hidden=!1,requestAnimationFrame(()=>{this.emit("sl-initial-focus",{cancelable:!0}).defaultPrevented||(t?t.focus({preventScroll:!0}):this.panel.focus({preventScroll:!0})),t&&t.setAttribute("autofocus","")});const e=it(this,"dialog.show",{dir:this.localize.dir()}),o=it(this,"dialog.overlay.show",{dir:this.localize.dir()});await Promise.all([st(this.panel,e.keyframes,e.options),st(this.overlay,o.keyframes,o.options)]),this.emit("sl-after-show")}else{ds(this),this.emit("sl-hide"),this.removeOpenListeners(),this.modal.deactivate(),await Promise.all([ht(this.dialog),ht(this.overlay)]);const t=it(this,"dialog.hide",{dir:this.localize.dir()}),e=it(this,"dialog.overlay.hide",{dir:this.localize.dir()});await Promise.all([st(this.overlay,e.keyframes,e.options).then(()=>{this.overlay.hidden=!0}),st(this.panel,t.keyframes,t.options).then(()=>{this.panel.hidden=!0})]),this.dialog.hidden=!0,this.overlay.hidden=!1,this.panel.hidden=!1,mo(this);const o=this.originalTrigger;typeof o?.focus=="function"&&setTimeout(()=>o.focus()),this.emit("sl-after-hide")}}async show(){if(!this.open)return this.open=!0,Lt(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,Lt(this,"sl-after-hide")}render(){return E`
      <div
        part="base"
        class=${J({dialog:!0,"dialog--open":this.open,"dialog--has-footer":this.hasSlotController.test("footer")})}
      >
        <div part="overlay" class="dialog__overlay" @click=${()=>this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="dialog__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open?"false":"true"}
          aria-label=${A(this.noHeader?this.label:void 0)}
          aria-labelledby=${A(this.noHeader?void 0:"title")}
          tabindex="-1"
        >
          ${this.noHeader?"":E`
                <header part="header" class="dialog__header">
                  <h2 part="title" class="dialog__title" id="title">
                    <slot name="label"> ${this.label.length>0?this.label:"\uFEFF"} </slot>
                  </h2>
                  <div part="header-actions" class="dialog__header-actions">
                    <slot name="header-actions"></slot>
                    <sl-icon-button
                      part="close-button"
                      exportparts="base:close-button__base"
                      class="dialog__close"
                      name="x-lg"
                      label=${this.localize.term("close")}
                      library="system"
                      @click="${()=>this.requestClose("close-button")}"
                    ></sl-icon-button>
                  </div>
                </header>
              `}
          ${""}
          <div part="body" class="dialog__body" tabindex="-1"><slot></slot></div>

          <footer part="footer" class="dialog__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `}};nt.styles=[q,cs];nt.dependencies={"sl-icon-button":M};a([z(".dialog")],nt.prototype,"dialog",2);a([z(".dialog__panel")],nt.prototype,"panel",2);a([z(".dialog__overlay")],nt.prototype,"overlay",2);a([u({type:Boolean,reflect:!0})],nt.prototype,"open",2);a([u({reflect:!0})],nt.prototype,"label",2);a([u({attribute:"no-header",type:Boolean,reflect:!0})],nt.prototype,"noHeader",2);a([N("open",{waitUntilFirstUpdate:!0})],nt.prototype,"handleOpenChange",1);rt("dialog.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:250,easing:"ease"}});rt("dialog.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:250,easing:"ease"}});rt("dialog.denyClose",{keyframes:[{scale:1},{scale:1.02},{scale:1}],options:{duration:250}});rt("dialog.overlay.show",{keyframes:[{opacity:0},{opacity:1}],options:{duration:250}});rt("dialog.overlay.hide",{keyframes:[{opacity:1},{opacity:0}],options:{duration:250}});var gs=V`
  :host {
    display: block;
    user-select: none;
    -webkit-user-select: none;
  }

  :host(:focus) {
    outline: none;
  }

  .option {
    position: relative;
    display: flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-700);
    padding: var(--sl-spacing-x-small) var(--sl-spacing-medium) var(--sl-spacing-x-small) var(--sl-spacing-x-small);
    transition: var(--sl-transition-fast) fill;
    cursor: pointer;
  }

  .option--hover:not(.option--current):not(.option--disabled) {
    background-color: var(--sl-color-neutral-100);
    color: var(--sl-color-neutral-1000);
  }

  .option--current,
  .option--current.option--disabled {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
    opacity: 1;
  }

  .option--disabled {
    outline: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  .option__label {
    flex: 1 1 auto;
    display: inline-block;
    line-height: var(--sl-line-height-dense);
  }

  .option .option__check {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: hidden;
    padding-inline-end: var(--sl-spacing-2x-small);
  }

  .option--selected .option__check {
    visibility: visible;
  }

  .option__prefix,
  .option__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .option__prefix::slotted(*) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .option__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  @media (forced-colors: active) {
    :host(:hover:not([aria-disabled='true'])) .option {
      outline: dashed 1px SelectedItem;
      outline-offset: -1px;
    }
  }
`,K=class extends D{constructor(){super(...arguments),this.localize=new mt(this),this.isInitialized=!1,this.current=!1,this.selected=!1,this.hasHover=!1,this.value="",this.disabled=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","option"),this.setAttribute("aria-selected","false")}handleDefaultSlotChange(){this.isInitialized?customElements.whenDefined("sl-select").then(()=>{const t=this.closest("sl-select");t&&t.handleDefaultSlotChange()}):this.isInitialized=!0}handleMouseEnter(){this.hasHover=!0}handleMouseLeave(){this.hasHover=!1}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleSelectedChange(){this.setAttribute("aria-selected",this.selected?"true":"false")}handleValueChange(){typeof this.value!="string"&&(this.value=String(this.value)),this.value.includes(" ")&&(console.error("Option values cannot include a space. All spaces have been replaced with underscores.",this),this.value=this.value.replace(/ /g,"_"))}getTextLabel(){const t=this.childNodes;let e="";return[...t].forEach(o=>{o.nodeType===Node.ELEMENT_NODE&&(o.hasAttribute("slot")||(e+=o.textContent)),o.nodeType===Node.TEXT_NODE&&(e+=o.textContent)}),e.trim()}render(){return E`
      <div
        part="base"
        class=${J({option:!0,"option--current":this.current,"option--disabled":this.disabled,"option--selected":this.selected,"option--hover":this.hasHover})}
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        <sl-icon part="checked-icon" class="option__check" name="check" library="system" aria-hidden="true"></sl-icon>
        <slot part="prefix" name="prefix" class="option__prefix"></slot>
        <slot part="label" class="option__label" @slotchange=${this.handleDefaultSlotChange}></slot>
        <slot part="suffix" name="suffix" class="option__suffix"></slot>
      </div>
    `}};K.styles=[q,gs];K.dependencies={"sl-icon":H};a([z(".option__label")],K.prototype,"defaultSlot",2);a([R()],K.prototype,"current",2);a([R()],K.prototype,"selected",2);a([R()],K.prototype,"hasHover",2);a([u({reflect:!0})],K.prototype,"value",2);a([u({type:Boolean,reflect:!0})],K.prototype,"disabled",2);a([N("disabled")],K.prototype,"handleDisabledChange",1);a([N("selected")],K.prototype,"handleSelectedChange",1);a([N("value")],K.prototype,"handleValueChange",1);var bs=V`
  :host {
    display: inline-block;
  }

  .tag {
    display: flex;
    align-items: center;
    border: solid 1px;
    line-height: 1;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
  }

  .tag__remove::part(base) {
    color: inherit;
    padding: 0;
  }

  /*
   * Variant modifiers
   */

  .tag--primary {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-200);
    color: var(--sl-color-primary-800);
  }

  .tag--primary:active > sl-icon-button {
    color: var(--sl-color-primary-600);
  }

  .tag--success {
    background-color: var(--sl-color-success-50);
    border-color: var(--sl-color-success-200);
    color: var(--sl-color-success-800);
  }

  .tag--success:active > sl-icon-button {
    color: var(--sl-color-success-600);
  }

  .tag--neutral {
    background-color: var(--sl-color-neutral-50);
    border-color: var(--sl-color-neutral-200);
    color: var(--sl-color-neutral-800);
  }

  .tag--neutral:active > sl-icon-button {
    color: var(--sl-color-neutral-600);
  }

  .tag--warning {
    background-color: var(--sl-color-warning-50);
    border-color: var(--sl-color-warning-200);
    color: var(--sl-color-warning-800);
  }

  .tag--warning:active > sl-icon-button {
    color: var(--sl-color-warning-600);
  }

  .tag--danger {
    background-color: var(--sl-color-danger-50);
    border-color: var(--sl-color-danger-200);
    color: var(--sl-color-danger-800);
  }

  .tag--danger:active > sl-icon-button {
    color: var(--sl-color-danger-600);
  }

  /*
   * Size modifiers
   */

  .tag--small {
    font-size: var(--sl-button-font-size-small);
    height: calc(var(--sl-input-height-small) * 0.8);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
    padding: 0 var(--sl-spacing-x-small);
  }

  .tag--medium {
    font-size: var(--sl-button-font-size-medium);
    height: calc(var(--sl-input-height-medium) * 0.8);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
    padding: 0 var(--sl-spacing-small);
  }

  .tag--large {
    font-size: var(--sl-button-font-size-large);
    height: calc(var(--sl-input-height-large) * 0.8);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
    padding: 0 var(--sl-spacing-medium);
  }

  .tag__remove {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  /*
   * Pill modifier
   */

  .tag--pill {
    border-radius: var(--sl-border-radius-pill);
  }
`,kt=class extends D{constructor(){super(...arguments),this.localize=new mt(this),this.variant="neutral",this.size="medium",this.pill=!1,this.removable=!1}handleRemoveClick(){this.emit("sl-remove")}render(){return E`
      <span
        part="base"
        class=${J({tag:!0,"tag--primary":this.variant==="primary","tag--success":this.variant==="success","tag--neutral":this.variant==="neutral","tag--warning":this.variant==="warning","tag--danger":this.variant==="danger","tag--text":this.variant==="text","tag--small":this.size==="small","tag--medium":this.size==="medium","tag--large":this.size==="large","tag--pill":this.pill,"tag--removable":this.removable})}
      >
        <slot part="content" class="tag__content"></slot>

        ${this.removable?E`
              <sl-icon-button
                part="remove-button"
                exportparts="base:remove-button__base"
                name="x-lg"
                library="system"
                label=${this.localize.term("remove")}
                class="tag__remove"
                @click=${this.handleRemoveClick}
                tabindex="-1"
              ></sl-icon-button>
            `:""}
      </span>
    `}};kt.styles=[q,bs];kt.dependencies={"sl-icon-button":M};a([u({reflect:!0})],kt.prototype,"variant",2);a([u({reflect:!0})],kt.prototype,"size",2);a([u({type:Boolean,reflect:!0})],kt.prototype,"pill",2);a([u({type:Boolean})],kt.prototype,"removable",2);var ms=V`
  :host {
    display: block;
  }

  /** The popup */
  .select {
    flex: 1 1 auto;
    display: inline-flex;
    width: 100%;
    position: relative;
    vertical-align: middle;
  }

  .select::part(popup) {
    z-index: var(--sl-z-index-dropdown);
  }

  .select[data-current-placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .select[data-current-placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  /* Combobox */
  .select__combobox {
    flex: 1;
    display: flex;
    width: 100%;
    min-width: 0;
    position: relative;
    align-items: center;
    justify-content: start;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: pointer;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  .select__display-input {
    position: relative;
    width: 100%;
    font: inherit;
    border: none;
    background: none;
    color: var(--sl-input-color);
    cursor: inherit;
    overflow: hidden;
    padding: 0;
    margin: 0;
    -webkit-appearance: none;
  }

  .select__display-input::placeholder {
    color: var(--sl-input-placeholder-color);
  }

  .select:not(.select--disabled):hover .select__display-input {
    color: var(--sl-input-color-hover);
  }

  .select__display-input:focus {
    outline: none;
  }

  /* Visually hide the display input when multiple is enabled */
  .select--multiple:not(.select--placeholder-visible) .select__display-input {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .select__value-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    z-index: -1;
  }

  .select__tags {
    display: flex;
    flex: 1;
    align-items: center;
    flex-wrap: wrap;
    margin-inline-start: var(--sl-spacing-2x-small);
  }

  .select__tags::slotted(sl-tag) {
    cursor: pointer !important;
  }

  .select--disabled .select__tags,
  .select--disabled .select__tags::slotted(sl-tag) {
    cursor: not-allowed !important;
  }

  /* Standard selects */
  .select--standard .select__combobox {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .select--standard.select--disabled .select__combobox {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    color: var(--sl-input-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
    outline: none;
  }

  .select--standard:not(.select--disabled).select--open .select__combobox,
  .select--standard:not(.select--disabled).select--focused .select__combobox {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  /* Filled selects */
  .select--filled .select__combobox {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .select--filled:hover:not(.select--disabled) .select__combobox {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .select--filled.select--disabled .select__combobox {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .select--filled:not(.select--disabled).select--open .select__combobox,
  .select--filled:not(.select--disabled).select--focused .select__combobox {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
  }

  /* Sizes */
  .select--small .select__combobox {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    min-height: var(--sl-input-height-small);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-small);
  }

  .select--small .select__clear {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .select--small .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .select--small.select--multiple:not(.select--placeholder-visible) .select__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .select--small.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-block: 2px;
    padding-inline-start: 0;
  }

  .select--small .select__tags {
    gap: 2px;
  }

  .select--medium .select__combobox {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    min-height: var(--sl-input-height-medium);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-medium);
  }

  .select--medium .select__clear {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .select--medium .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .select--medium.select--multiple:not(.select--placeholder-visible) .select__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .select--medium.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-inline-start: 0;
    padding-block: 3px;
  }

  .select--medium .select__tags {
    gap: 3px;
  }

  .select--large .select__combobox {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    min-height: var(--sl-input-height-large);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-large);
  }

  .select--large .select__clear {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .select--large .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  .select--large.select--multiple:not(.select--placeholder-visible) .select__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .select--large.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-inline-start: 0;
    padding-block: 4px;
  }

  .select--large .select__tags {
    gap: 4px;
  }

  /* Pills */
  .select--pill.select--small .select__combobox {
    border-radius: var(--sl-input-height-small);
  }

  .select--pill.select--medium .select__combobox {
    border-radius: var(--sl-input-height-medium);
  }

  .select--pill.select--large .select__combobox {
    border-radius: var(--sl-input-height-large);
  }

  /* Prefix and Suffix */
  .select__prefix,
  .select__suffix {
    flex: 0;
    display: inline-flex;
    align-items: center;
    color: var(--sl-input-placeholder-color);
  }

  .select__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-small);
  }

  /* Clear button */
  .select__clear {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .select__clear:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .select__clear:focus {
    outline: none;
  }

  /* Expand icon */
  .select__expand-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    transition: var(--sl-transition-medium) rotate ease;
    rotate: 0;
    margin-inline-start: var(--sl-spacing-small);
  }

  .select--open .select__expand-icon {
    rotate: -180deg;
  }

  /* Listbox */
  .select__listbox {
    display: block;
    position: relative;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    box-shadow: var(--sl-shadow-large);
    background: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    padding-block: var(--sl-spacing-x-small);
    padding-inline: 0;
    overflow: auto;
    overscroll-behavior: none;

    /* Make sure it adheres to the popup's auto size */
    max-width: var(--auto-size-available-width);
    max-height: var(--auto-size-available-height);
  }

  .select__listbox ::slotted(sl-divider) {
    --spacing: var(--sl-spacing-x-small);
  }

  .select__listbox ::slotted(small) {
    display: block;
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    color: var(--sl-color-neutral-500);
    padding-block: var(--sl-spacing-2x-small);
    padding-inline: var(--sl-spacing-x-large);
  }
`,vs=V`
  .form-control .form-control__label {
    display: none;
  }

  .form-control .form-control__help-text {
    display: none;
  }

  /* Label */
  .form-control--has-label .form-control__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    margin-bottom: var(--sl-spacing-3x-small);
  }

  .form-control--has-label.form-control--small .form-control__label {
    font-size: var(--sl-input-label-font-size-small);
  }

  .form-control--has-label.form-control--medium .form-control__label {
    font-size: var(--sl-input-label-font-size-medium);
  }

  .form-control--has-label.form-control--large .form-control__label {
    font-size: var(--sl-input-label-font-size-large);
  }

  :host([required]) .form-control--has-label .form-control__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
    color: var(--sl-input-required-content-color);
  }

  /* Help text */
  .form-control--has-help-text .form-control__help-text {
    display: block;
    color: var(--sl-input-help-text-color);
    margin-top: var(--sl-spacing-3x-small);
  }

  .form-control--has-help-text.form-control--small .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-small);
  }

  .form-control--has-help-text.form-control--medium .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-medium);
  }

  .form-control--has-help-text.form-control--large .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-large);
  }

  .form-control--has-help-text.form-control--radio-group .form-control__help-text {
    margin-top: var(--sl-spacing-2x-small);
  }
`,ys=V`
  :host {
    --arrow-color: var(--sl-color-neutral-1000);
    --arrow-size: 6px;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45), which is the diagonal size of the arrow's container after rotating.
     */
    --arrow-size-diagonal: calc(var(--arrow-size) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);
  }

  .popup--fixed {
    position: fixed;
  }

  .popup:not(.popup--active) {
    display: none;
  }

  .popup__arrow {
    position: absolute;
    width: calc(var(--arrow-size-diagonal) * 2);
    height: calc(var(--arrow-size-diagonal) * 2);
    rotate: 45deg;
    background: var(--arrow-color);
    z-index: -1;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge--visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
  }
`;const ft=Math.min,B=Math.max,le=Math.round,Qt=Math.floor,Z=t=>({x:t,y:t}),ws={left:"right",right:"left",bottom:"top",top:"bottom"},_s={start:"end",end:"start"};function Oe(t,e,o){return B(t,ft(e,o))}function Tt(t,e){return typeof t=="function"?t(e):t}function gt(t){return t.split("-")[0]}function Dt(t){return t.split("-")[1]}function Wo(t){return t==="x"?"y":"x"}function je(t){return t==="y"?"height":"width"}function xt(t){return["top","bottom"].includes(gt(t))?"y":"x"}function qe(t){return Wo(xt(t))}function xs(t,e,o){o===void 0&&(o=!1);const i=Dt(t),s=qe(t),r=je(s);let n=s==="x"?i===(o?"end":"start")?"right":"left":i==="start"?"bottom":"top";return e.reference[r]>e.floating[r]&&(n=ae(n)),[n,ae(n)]}function $s(t){const e=ae(t);return[ze(t),e,ze(e)]}function ze(t){return t.replace(/start|end/g,e=>_s[e])}function Cs(t,e,o){const i=["left","right"],s=["right","left"],r=["top","bottom"],n=["bottom","top"];switch(t){case"top":case"bottom":return o?e?s:i:e?i:s;case"left":case"right":return e?r:n;default:return[]}}function ks(t,e,o,i){const s=Dt(t);let r=Cs(gt(t),o==="start",i);return s&&(r=r.map(n=>n+"-"+s),e&&(r=r.concat(r.map(ze)))),r}function ae(t){return t.replace(/left|right|bottom|top/g,e=>ws[e])}function As(t){return{top:0,right:0,bottom:0,left:0,...t}}function jo(t){return typeof t!="number"?As(t):{top:t,right:t,bottom:t,left:t}}function ce(t){const{x:e,y:o,width:i,height:s}=t;return{width:i,height:s,top:o,left:e,right:e+i,bottom:o+s,x:e,y:o}}function wo(t,e,o){let{reference:i,floating:s}=t;const r=xt(e),n=qe(e),l=je(n),c=gt(e),d=r==="y",h=i.x+i.width/2-s.width/2,p=i.y+i.height/2-s.height/2,g=i[l]/2-s[l]/2;let f;switch(c){case"top":f={x:h,y:i.y-s.height};break;case"bottom":f={x:h,y:i.y+i.height};break;case"right":f={x:i.x+i.width,y:p};break;case"left":f={x:i.x-s.width,y:p};break;default:f={x:i.x,y:i.y}}switch(Dt(e)){case"start":f[n]-=g*(o&&d?-1:1);break;case"end":f[n]+=g*(o&&d?-1:1);break}return f}const Ss=async(t,e,o)=>{const{placement:i="bottom",strategy:s="absolute",middleware:r=[],platform:n}=o,l=r.filter(Boolean),c=await(n.isRTL==null?void 0:n.isRTL(e));let d=await n.getElementRects({reference:t,floating:e,strategy:s}),{x:h,y:p}=wo(d,i,c),g=i,f={},b=0;for(let m=0;m<l.length;m++){const{name:y,fn:v}=l[m],{x:_,y:C,data:O,reset:k}=await v({x:h,y:p,initialPlacement:i,placement:g,strategy:s,middlewareData:f,rects:d,platform:n,elements:{reference:t,floating:e}});h=_??h,p=C??p,f={...f,[y]:{...f[y],...O}},k&&b<=50&&(b++,typeof k=="object"&&(k.placement&&(g=k.placement),k.rects&&(d=k.rects===!0?await n.getElementRects({reference:t,floating:e,strategy:s}):k.rects),{x:h,y:p}=wo(d,g,c)),m=-1)}return{x:h,y:p,placement:g,strategy:s,middlewareData:f}};async function Ke(t,e){var o;e===void 0&&(e={});const{x:i,y:s,platform:r,rects:n,elements:l,strategy:c}=t,{boundary:d="clippingAncestors",rootBoundary:h="viewport",elementContext:p="floating",altBoundary:g=!1,padding:f=0}=Tt(e,t),b=jo(f),y=l[g?p==="floating"?"reference":"floating":p],v=ce(await r.getClippingRect({element:(o=await(r.isElement==null?void 0:r.isElement(y)))==null||o?y:y.contextElement||await(r.getDocumentElement==null?void 0:r.getDocumentElement(l.floating)),boundary:d,rootBoundary:h,strategy:c})),_=p==="floating"?{x:i,y:s,width:n.floating.width,height:n.floating.height}:n.reference,C=await(r.getOffsetParent==null?void 0:r.getOffsetParent(l.floating)),O=await(r.isElement==null?void 0:r.isElement(C))?await(r.getScale==null?void 0:r.getScale(C))||{x:1,y:1}:{x:1,y:1},k=ce(r.convertOffsetParentRelativeRectToViewportRelativeRect?await r.convertOffsetParentRelativeRectToViewportRelativeRect({elements:l,rect:_,offsetParent:C,strategy:c}):_);return{top:(v.top-k.top+b.top)/O.y,bottom:(k.bottom-v.bottom+b.bottom)/O.y,left:(v.left-k.left+b.left)/O.x,right:(k.right-v.right+b.right)/O.x}}const Es=t=>({name:"arrow",options:t,async fn(e){const{x:o,y:i,placement:s,rects:r,platform:n,elements:l,middlewareData:c}=e,{element:d,padding:h=0}=Tt(t,e)||{};if(d==null)return{};const p=jo(h),g={x:o,y:i},f=qe(s),b=je(f),m=await n.getDimensions(d),y=f==="y",v=y?"top":"left",_=y?"bottom":"right",C=y?"clientHeight":"clientWidth",O=r.reference[b]+r.reference[f]-g[f]-r.floating[b],k=g[f]-r.reference[f],I=await(n.getOffsetParent==null?void 0:n.getOffsetParent(d));let L=I?I[C]:0;(!L||!await(n.isElement==null?void 0:n.isElement(I)))&&(L=l.floating[C]||r.floating[b]);const et=O/2-k/2,Y=L/2-m[b]/2-1,U=ft(p[v],Y),lt=ft(p[_],Y),X=U,at=L-m[b]-lt,T=L/2-m[b]/2+et,At=Oe(X,T,at),ot=!c.arrow&&Dt(s)!=null&&T!==At&&r.reference[b]/2-(T<X?U:lt)-m[b]/2<0,G=ot?T<X?T-X:T-at:0;return{[f]:g[f]+G,data:{[f]:At,centerOffset:T-At-G,...ot&&{alignmentOffset:G}},reset:ot}}}),Os=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var o,i;const{placement:s,middlewareData:r,rects:n,initialPlacement:l,platform:c,elements:d}=e,{mainAxis:h=!0,crossAxis:p=!0,fallbackPlacements:g,fallbackStrategy:f="bestFit",fallbackAxisSideDirection:b="none",flipAlignment:m=!0,...y}=Tt(t,e);if((o=r.arrow)!=null&&o.alignmentOffset)return{};const v=gt(s),_=xt(l),C=gt(l)===l,O=await(c.isRTL==null?void 0:c.isRTL(d.floating)),k=g||(C||!m?[ae(l)]:$s(l)),I=b!=="none";!g&&I&&k.push(...ks(l,m,b,O));const L=[l,...k],et=await Ke(e,y),Y=[];let U=((i=r.flip)==null?void 0:i.overflows)||[];if(h&&Y.push(et[v]),p){const T=xs(s,n,O);Y.push(et[T[0]],et[T[1]])}if(U=[...U,{placement:s,overflows:Y}],!Y.every(T=>T<=0)){var lt,X;const T=(((lt=r.flip)==null?void 0:lt.index)||0)+1,At=L[T];if(At)return{data:{index:T,overflows:U},reset:{placement:At}};let ot=(X=U.filter(G=>G.overflows[0]<=0).sort((G,ct)=>G.overflows[1]-ct.overflows[1])[0])==null?void 0:X.placement;if(!ot)switch(f){case"bestFit":{var at;const G=(at=U.filter(ct=>{if(I){const dt=xt(ct.placement);return dt===_||dt==="y"}return!0}).map(ct=>[ct.placement,ct.overflows.filter(dt=>dt>0).reduce((dt,ti)=>dt+ti,0)]).sort((ct,dt)=>ct[1]-dt[1])[0])==null?void 0:at[0];G&&(ot=G);break}case"initialPlacement":ot=l;break}if(s!==ot)return{reset:{placement:ot}}}return{}}}};async function zs(t,e){const{placement:o,platform:i,elements:s}=t,r=await(i.isRTL==null?void 0:i.isRTL(s.floating)),n=gt(o),l=Dt(o),c=xt(o)==="y",d=["left","top"].includes(n)?-1:1,h=r&&c?-1:1,p=Tt(e,t);let{mainAxis:g,crossAxis:f,alignmentAxis:b}=typeof p=="number"?{mainAxis:p,crossAxis:0,alignmentAxis:null}:{mainAxis:p.mainAxis||0,crossAxis:p.crossAxis||0,alignmentAxis:p.alignmentAxis};return l&&typeof b=="number"&&(f=l==="end"?b*-1:b),c?{x:f*h,y:g*d}:{x:g*d,y:f*h}}const Ls=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){var o,i;const{x:s,y:r,placement:n,middlewareData:l}=e,c=await zs(e,t);return n===((o=l.offset)==null?void 0:o.placement)&&(i=l.arrow)!=null&&i.alignmentOffset?{}:{x:s+c.x,y:r+c.y,data:{...c,placement:n}}}}},Ps=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){const{x:o,y:i,placement:s}=e,{mainAxis:r=!0,crossAxis:n=!1,limiter:l={fn:y=>{let{x:v,y:_}=y;return{x:v,y:_}}},...c}=Tt(t,e),d={x:o,y:i},h=await Ke(e,c),p=xt(gt(s)),g=Wo(p);let f=d[g],b=d[p];if(r){const y=g==="y"?"top":"left",v=g==="y"?"bottom":"right",_=f+h[y],C=f-h[v];f=Oe(_,f,C)}if(n){const y=p==="y"?"top":"left",v=p==="y"?"bottom":"right",_=b+h[y],C=b-h[v];b=Oe(_,b,C)}const m=l.fn({...e,[g]:f,[p]:b});return{...m,data:{x:m.x-o,y:m.y-i,enabled:{[g]:r,[p]:n}}}}}},Ts=function(t){return t===void 0&&(t={}),{name:"size",options:t,async fn(e){var o,i;const{placement:s,rects:r,platform:n,elements:l}=e,{apply:c=()=>{},...d}=Tt(t,e),h=await Ke(e,d),p=gt(s),g=Dt(s),f=xt(s)==="y",{width:b,height:m}=r.floating;let y,v;p==="top"||p==="bottom"?(y=p,v=g===(await(n.isRTL==null?void 0:n.isRTL(l.floating))?"start":"end")?"left":"right"):(v=p,y=g==="end"?"top":"bottom");const _=m-h.top-h.bottom,C=b-h.left-h.right,O=ft(m-h[y],_),k=ft(b-h[v],C),I=!e.middlewareData.shift;let L=O,et=k;if((o=e.middlewareData.shift)!=null&&o.enabled.x&&(et=C),(i=e.middlewareData.shift)!=null&&i.enabled.y&&(L=_),I&&!g){const U=B(h.left,0),lt=B(h.right,0),X=B(h.top,0),at=B(h.bottom,0);f?et=b-2*(U!==0||lt!==0?U+lt:B(h.left,h.right)):L=m-2*(X!==0||at!==0?X+at:B(h.top,h.bottom))}await c({...e,availableWidth:et,availableHeight:L});const Y=await n.getDimensions(l.floating);return b!==Y.width||m!==Y.height?{reset:{rects:!0}}:{}}}};function fe(){return typeof window<"u"}function Rt(t){return qo(t)?(t.nodeName||"").toLowerCase():"#document"}function F(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function tt(t){var e;return(e=(qo(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function qo(t){return fe()?t instanceof Node||t instanceof F(t).Node:!1}function W(t){return fe()?t instanceof Element||t instanceof F(t).Element:!1}function Q(t){return fe()?t instanceof HTMLElement||t instanceof F(t).HTMLElement:!1}function _o(t){return!fe()||typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof F(t).ShadowRoot}function Gt(t){const{overflow:e,overflowX:o,overflowY:i,display:s}=j(t);return/auto|scroll|overlay|hidden|clip/.test(e+i+o)&&!["inline","contents"].includes(s)}function Ds(t){return["table","td","th"].includes(Rt(t))}function ge(t){return[":popover-open",":modal"].some(e=>{try{return t.matches(e)}catch{return!1}})}function be(t){const e=Ye(),o=W(t)?j(t):t;return["transform","translate","scale","rotate","perspective"].some(i=>o[i]?o[i]!=="none":!1)||(o.containerType?o.containerType!=="normal":!1)||!e&&(o.backdropFilter?o.backdropFilter!=="none":!1)||!e&&(o.filter?o.filter!=="none":!1)||["transform","translate","scale","rotate","perspective","filter"].some(i=>(o.willChange||"").includes(i))||["paint","layout","strict","content"].some(i=>(o.contain||"").includes(i))}function Rs(t){let e=bt(t);for(;Q(e)&&!Pt(e);){if(be(e))return e;if(ge(e))return null;e=bt(e)}return null}function Ye(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}function Pt(t){return["html","body","#document"].includes(Rt(t))}function j(t){return F(t).getComputedStyle(t)}function me(t){return W(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function bt(t){if(Rt(t)==="html")return t;const e=t.assignedSlot||t.parentNode||_o(t)&&t.host||tt(t);return _o(e)?e.host:e}function Ko(t){const e=bt(t);return Pt(e)?t.ownerDocument?t.ownerDocument.body:t.body:Q(e)&&Gt(e)?e:Ko(e)}function Yt(t,e,o){var i;e===void 0&&(e=[]),o===void 0&&(o=!0);const s=Ko(t),r=s===((i=t.ownerDocument)==null?void 0:i.body),n=F(s);if(r){const l=Le(n);return e.concat(n,n.visualViewport||[],Gt(s)?s:[],l&&o?Yt(l):[])}return e.concat(s,Yt(s,[],o))}function Le(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function Yo(t){const e=j(t);let o=parseFloat(e.width)||0,i=parseFloat(e.height)||0;const s=Q(t),r=s?t.offsetWidth:o,n=s?t.offsetHeight:i,l=le(o)!==r||le(i)!==n;return l&&(o=r,i=n),{width:o,height:i,$:l}}function Xe(t){return W(t)?t:t.contextElement}function Ot(t){const e=Xe(t);if(!Q(e))return Z(1);const o=e.getBoundingClientRect(),{width:i,height:s,$:r}=Yo(e);let n=(r?le(o.width):o.width)/i,l=(r?le(o.height):o.height)/s;return(!n||!Number.isFinite(n))&&(n=1),(!l||!Number.isFinite(l))&&(l=1),{x:n,y:l}}const Ms=Z(0);function Xo(t){const e=F(t);return!Ye()||!e.visualViewport?Ms:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function Bs(t,e,o){return e===void 0&&(e=!1),!o||e&&o!==F(t)?!1:e}function $t(t,e,o,i){e===void 0&&(e=!1),o===void 0&&(o=!1);const s=t.getBoundingClientRect(),r=Xe(t);let n=Z(1);e&&(i?W(i)&&(n=Ot(i)):n=Ot(t));const l=Bs(r,o,i)?Xo(r):Z(0);let c=(s.left+l.x)/n.x,d=(s.top+l.y)/n.y,h=s.width/n.x,p=s.height/n.y;if(r){const g=F(r),f=i&&W(i)?F(i):i;let b=g,m=Le(b);for(;m&&i&&f!==b;){const y=Ot(m),v=m.getBoundingClientRect(),_=j(m),C=v.left+(m.clientLeft+parseFloat(_.paddingLeft))*y.x,O=v.top+(m.clientTop+parseFloat(_.paddingTop))*y.y;c*=y.x,d*=y.y,h*=y.x,p*=y.y,c+=C,d+=O,b=F(m),m=Le(b)}}return ce({width:h,height:p,x:c,y:d})}function Ge(t,e){const o=me(t).scrollLeft;return e?e.left+o:$t(tt(t)).left+o}function Go(t,e,o){o===void 0&&(o=!1);const i=t.getBoundingClientRect(),s=i.left+e.scrollLeft-(o?0:Ge(t,i)),r=i.top+e.scrollTop;return{x:s,y:r}}function Fs(t){let{elements:e,rect:o,offsetParent:i,strategy:s}=t;const r=s==="fixed",n=tt(i),l=e?ge(e.floating):!1;if(i===n||l&&r)return o;let c={scrollLeft:0,scrollTop:0},d=Z(1);const h=Z(0),p=Q(i);if((p||!p&&!r)&&((Rt(i)!=="body"||Gt(n))&&(c=me(i)),Q(i))){const f=$t(i);d=Ot(i),h.x=f.x+i.clientLeft,h.y=f.y+i.clientTop}const g=n&&!p&&!r?Go(n,c,!0):Z(0);return{width:o.width*d.x,height:o.height*d.y,x:o.x*d.x-c.scrollLeft*d.x+h.x+g.x,y:o.y*d.y-c.scrollTop*d.y+h.y+g.y}}function Vs(t){return Array.from(t.getClientRects())}function Ns(t){const e=tt(t),o=me(t),i=t.ownerDocument.body,s=B(e.scrollWidth,e.clientWidth,i.scrollWidth,i.clientWidth),r=B(e.scrollHeight,e.clientHeight,i.scrollHeight,i.clientHeight);let n=-o.scrollLeft+Ge(t);const l=-o.scrollTop;return j(i).direction==="rtl"&&(n+=B(e.clientWidth,i.clientWidth)-s),{width:s,height:r,x:n,y:l}}function Hs(t,e){const o=F(t),i=tt(t),s=o.visualViewport;let r=i.clientWidth,n=i.clientHeight,l=0,c=0;if(s){r=s.width,n=s.height;const d=Ye();(!d||d&&e==="fixed")&&(l=s.offsetLeft,c=s.offsetTop)}return{width:r,height:n,x:l,y:c}}function Is(t,e){const o=$t(t,!0,e==="fixed"),i=o.top+t.clientTop,s=o.left+t.clientLeft,r=Q(t)?Ot(t):Z(1),n=t.clientWidth*r.x,l=t.clientHeight*r.y,c=s*r.x,d=i*r.y;return{width:n,height:l,x:c,y:d}}function xo(t,e,o){let i;if(e==="viewport")i=Hs(t,o);else if(e==="document")i=Ns(tt(t));else if(W(e))i=Is(e,o);else{const s=Xo(t);i={x:e.x-s.x,y:e.y-s.y,width:e.width,height:e.height}}return ce(i)}function Zo(t,e){const o=bt(t);return o===e||!W(o)||Pt(o)?!1:j(o).position==="fixed"||Zo(o,e)}function Us(t,e){const o=e.get(t);if(o)return o;let i=Yt(t,[],!1).filter(l=>W(l)&&Rt(l)!=="body"),s=null;const r=j(t).position==="fixed";let n=r?bt(t):t;for(;W(n)&&!Pt(n);){const l=j(n),c=be(n);!c&&l.position==="fixed"&&(s=null),(r?!c&&!s:!c&&l.position==="static"&&!!s&&["absolute","fixed"].includes(s.position)||Gt(n)&&!c&&Zo(t,n))?i=i.filter(h=>h!==n):s=l,n=bt(n)}return e.set(t,i),i}function Ws(t){let{element:e,boundary:o,rootBoundary:i,strategy:s}=t;const n=[...o==="clippingAncestors"?ge(e)?[]:Us(e,this._c):[].concat(o),i],l=n[0],c=n.reduce((d,h)=>{const p=xo(e,h,s);return d.top=B(p.top,d.top),d.right=ft(p.right,d.right),d.bottom=ft(p.bottom,d.bottom),d.left=B(p.left,d.left),d},xo(e,l,s));return{width:c.right-c.left,height:c.bottom-c.top,x:c.left,y:c.top}}function js(t){const{width:e,height:o}=Yo(t);return{width:e,height:o}}function qs(t,e,o){const i=Q(e),s=tt(e),r=o==="fixed",n=$t(t,!0,r,e);let l={scrollLeft:0,scrollTop:0};const c=Z(0);if(i||!i&&!r)if((Rt(e)!=="body"||Gt(s))&&(l=me(e)),i){const g=$t(e,!0,r,e);c.x=g.x+e.clientLeft,c.y=g.y+e.clientTop}else s&&(c.x=Ge(s));const d=s&&!i&&!r?Go(s,l):Z(0),h=n.left+l.scrollLeft-c.x-d.x,p=n.top+l.scrollTop-c.y-d.y;return{x:h,y:p,width:n.width,height:n.height}}function $e(t){return j(t).position==="static"}function $o(t,e){if(!Q(t)||j(t).position==="fixed")return null;if(e)return e(t);let o=t.offsetParent;return tt(t)===o&&(o=o.ownerDocument.body),o}function Jo(t,e){const o=F(t);if(ge(t))return o;if(!Q(t)){let s=bt(t);for(;s&&!Pt(s);){if(W(s)&&!$e(s))return s;s=bt(s)}return o}let i=$o(t,e);for(;i&&Ds(i)&&$e(i);)i=$o(i,e);return i&&Pt(i)&&$e(i)&&!be(i)?o:i||Rs(t)||o}const Ks=async function(t){const e=this.getOffsetParent||Jo,o=this.getDimensions,i=await o(t.floating);return{reference:qs(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:i.width,height:i.height}}};function Ys(t){return j(t).direction==="rtl"}const ie={convertOffsetParentRelativeRectToViewportRelativeRect:Fs,getDocumentElement:tt,getClippingRect:Ws,getOffsetParent:Jo,getElementRects:Ks,getClientRects:Vs,getDimensions:js,getScale:Ot,isElement:W,isRTL:Ys};function Qo(t,e){return t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height}function Xs(t,e){let o=null,i;const s=tt(t);function r(){var l;clearTimeout(i),(l=o)==null||l.disconnect(),o=null}function n(l,c){l===void 0&&(l=!1),c===void 0&&(c=1),r();const d=t.getBoundingClientRect(),{left:h,top:p,width:g,height:f}=d;if(l||e(),!g||!f)return;const b=Qt(p),m=Qt(s.clientWidth-(h+g)),y=Qt(s.clientHeight-(p+f)),v=Qt(h),C={rootMargin:-b+"px "+-m+"px "+-y+"px "+-v+"px",threshold:B(0,ft(1,c))||1};let O=!0;function k(I){const L=I[0].intersectionRatio;if(L!==c){if(!O)return n();L?n(!1,L):i=setTimeout(()=>{n(!1,1e-7)},1e3)}L===1&&!Qo(d,t.getBoundingClientRect())&&n(),O=!1}try{o=new IntersectionObserver(k,{...C,root:s.ownerDocument})}catch{o=new IntersectionObserver(k,C)}o.observe(t)}return n(!0),r}function Gs(t,e,o,i){i===void 0&&(i={});const{ancestorScroll:s=!0,ancestorResize:r=!0,elementResize:n=typeof ResizeObserver=="function",layoutShift:l=typeof IntersectionObserver=="function",animationFrame:c=!1}=i,d=Xe(t),h=s||r?[...d?Yt(d):[],...Yt(e)]:[];h.forEach(v=>{s&&v.addEventListener("scroll",o,{passive:!0}),r&&v.addEventListener("resize",o)});const p=d&&l?Xs(d,o):null;let g=-1,f=null;n&&(f=new ResizeObserver(v=>{let[_]=v;_&&_.target===d&&f&&(f.unobserve(e),cancelAnimationFrame(g),g=requestAnimationFrame(()=>{var C;(C=f)==null||C.observe(e)})),o()}),d&&!c&&f.observe(d),f.observe(e));let b,m=c?$t(t):null;c&&y();function y(){const v=$t(t);m&&!Qo(m,v)&&o(),m=v,b=requestAnimationFrame(y)}return o(),()=>{var v;h.forEach(_=>{s&&_.removeEventListener("scroll",o),r&&_.removeEventListener("resize",o)}),p?.(),(v=f)==null||v.disconnect(),f=null,c&&cancelAnimationFrame(b)}}const Zs=Ls,Js=Ps,Qs=Os,Co=Ts,tr=Es,er=(t,e,o)=>{const i=new Map,s={platform:ie,...o},r={...s.platform,_c:i};return Ss(t,e,{...s,platform:r})};function or(t){return ir(t)}function Ce(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}function ir(t){for(let e=t;e;e=Ce(e))if(e instanceof Element&&getComputedStyle(e).display==="none")return null;for(let e=Ce(t);e;e=Ce(e)){if(!(e instanceof Element))continue;const o=getComputedStyle(e);if(o.display!=="contents"&&(o.position!=="static"||be(o)||e.tagName==="BODY"))return e}return null}function sr(t){return t!==null&&typeof t=="object"&&"getBoundingClientRect"in t&&("contextElement"in t?t.contextElement instanceof Element:!0)}var $=class extends D{constructor(){super(...arguments),this.localize=new mt(this),this.active=!1,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){const t=this.anchorEl.getBoundingClientRect(),e=this.popup.getBoundingClientRect(),o=this.placement.includes("top")||this.placement.includes("bottom");let i=0,s=0,r=0,n=0,l=0,c=0,d=0,h=0;o?t.top<e.top?(i=t.left,s=t.bottom,r=t.right,n=t.bottom,l=e.left,c=e.top,d=e.right,h=e.top):(i=e.left,s=e.bottom,r=e.right,n=e.bottom,l=t.left,c=t.top,d=t.right,h=t.top):t.left<e.left?(i=t.right,s=t.top,r=e.left,n=e.top,l=t.right,c=t.bottom,d=e.left,h=e.bottom):(i=e.right,s=e.top,r=t.left,n=t.top,l=e.right,c=e.bottom,d=t.left,h=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${i}px`),this.style.setProperty("--hover-bridge-top-left-y",`${s}px`),this.style.setProperty("--hover-bridge-top-right-x",`${r}px`),this.style.setProperty("--hover-bridge-top-right-y",`${n}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${l}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${c}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${d}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${h}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){const t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor)}else this.anchor instanceof Element||sr(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.active&&this.start()}start(){!this.anchorEl||!this.active||(this.cleanup=Gs(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(t=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t()})}reposition(){if(!this.active||!this.anchorEl)return;const t=[Zs({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?t.push(Co({apply:({rects:o})=>{const i=this.sync==="width"||this.sync==="both",s=this.sync==="height"||this.sync==="both";this.popup.style.width=i?`${o.reference.width}px`:"",this.popup.style.height=s?`${o.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&t.push(Qs({boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push(Js({boundary:this.shiftBoundary,padding:this.shiftPadding})),this.autoSize?t.push(Co({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:o,availableHeight:i})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${i}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${o}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push(tr({element:this.arrowEl,padding:this.arrowPadding}));const e=this.strategy==="absolute"?o=>ie.getOffsetParent(o,or):ie.getOffsetParent;er(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:this.strategy,platform:de(Ct({},ie),{getOffsetParent:e})}).then(({x:o,y:i,middlewareData:s,placement:r})=>{const n=this.localize.dir()==="rtl",l={top:"bottom",right:"left",bottom:"top",left:"right"}[r.split("-")[0]];if(this.setAttribute("data-current-placement",r),Object.assign(this.popup.style,{left:`${o}px`,top:`${i}px`}),this.arrow){const c=s.arrow.x,d=s.arrow.y;let h="",p="",g="",f="";if(this.arrowPlacement==="start"){const b=typeof c=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";h=typeof d=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",p=n?b:"",f=n?"":b}else if(this.arrowPlacement==="end"){const b=typeof c=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";p=n?"":b,f=n?b:"",g=typeof d=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else this.arrowPlacement==="center"?(f=typeof c=="number"?"calc(50% - var(--arrow-size-diagonal))":"",h=typeof d=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(f=typeof c=="number"?`${c}px`:"",h=typeof d=="number"?`${d}px`:"");Object.assign(this.arrowEl.style,{top:h,right:p,bottom:g,left:f,[l]:"calc(var(--arrow-size-diagonal) * -1)"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.emit("sl-reposition")}render(){return E`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${J({"popup-hover-bridge":!0,"popup-hover-bridge--visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        part="popup"
        class=${J({popup:!0,"popup--active":this.active,"popup--fixed":this.strategy==="fixed","popup--has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?E`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};$.styles=[q,ys];a([z(".popup")],$.prototype,"popup",2);a([z(".popup__arrow")],$.prototype,"arrowEl",2);a([u()],$.prototype,"anchor",2);a([u({type:Boolean,reflect:!0})],$.prototype,"active",2);a([u({reflect:!0})],$.prototype,"placement",2);a([u({reflect:!0})],$.prototype,"strategy",2);a([u({type:Number})],$.prototype,"distance",2);a([u({type:Number})],$.prototype,"skidding",2);a([u({type:Boolean})],$.prototype,"arrow",2);a([u({attribute:"arrow-placement"})],$.prototype,"arrowPlacement",2);a([u({attribute:"arrow-padding",type:Number})],$.prototype,"arrowPadding",2);a([u({type:Boolean})],$.prototype,"flip",2);a([u({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(e=>e.trim()).filter(e=>e!==""),toAttribute:t=>t.join(" ")}})],$.prototype,"flipFallbackPlacements",2);a([u({attribute:"flip-fallback-strategy"})],$.prototype,"flipFallbackStrategy",2);a([u({type:Object})],$.prototype,"flipBoundary",2);a([u({attribute:"flip-padding",type:Number})],$.prototype,"flipPadding",2);a([u({type:Boolean})],$.prototype,"shift",2);a([u({type:Object})],$.prototype,"shiftBoundary",2);a([u({attribute:"shift-padding",type:Number})],$.prototype,"shiftPadding",2);a([u({attribute:"auto-size"})],$.prototype,"autoSize",2);a([u()],$.prototype,"sync",2);a([u({type:Object})],$.prototype,"autoSizeBoundary",2);a([u({attribute:"auto-size-padding",type:Number})],$.prototype,"autoSizePadding",2);a([u({attribute:"hover-bridge",type:Boolean})],$.prototype,"hoverBridge",2);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Pe extends No{constructor(e){if(super(e),this.it=S,e.type!==Fo.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===S||e==null)return this._t=void 0,this.it=e;if(e===pt)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const o=[e];return o.raw=o,this._t={_$litType$:this.constructor.resultType,strings:o,values:[]}}}Pe.directiveName="unsafeHTML",Pe.resultType=1;const rr=Vo(Pe);var w=class extends D{constructor(){super(...arguments),this.formControlController=new Bo(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new Ue(this,"help-text","label"),this.localize=new mt(this),this.typeToSelectString="",this.hasFocus=!1,this.displayLabel="",this.selectedOptions=[],this.valueHasChanged=!1,this.name="",this._value="",this.defaultValue="",this.size="medium",this.placeholder="",this.multiple=!1,this.maxOptionsVisible=3,this.disabled=!1,this.clearable=!1,this.open=!1,this.hoist=!1,this.filled=!1,this.pill=!1,this.label="",this.placement="bottom",this.helpText="",this.form="",this.required=!1,this.getTag=t=>E`
      <sl-tag
        part="tag"
        exportparts="
              base:tag__base,
              content:tag__content,
              remove-button:tag__remove-button,
              remove-button__base:tag__remove-button__base
            "
        ?pill=${this.pill}
        size=${this.size}
        removable
        @sl-remove=${e=>this.handleTagRemove(e,t)}
      >
        ${t.getTextLabel()}
      </sl-tag>
    `,this.handleDocumentFocusIn=t=>{const e=t.composedPath();this&&!e.includes(this)&&this.hide()},this.handleDocumentKeyDown=t=>{const e=t.target,o=e.closest(".select__clear")!==null,i=e.closest("sl-icon-button")!==null;if(!(o||i)){if(t.key==="Escape"&&this.open&&!this.closeWatcher&&(t.preventDefault(),t.stopPropagation(),this.hide(),this.displayInput.focus({preventScroll:!0})),t.key==="Enter"||t.key===" "&&this.typeToSelectString===""){if(t.preventDefault(),t.stopImmediatePropagation(),!this.open){this.show();return}this.currentOption&&!this.currentOption.disabled&&(this.valueHasChanged=!0,this.multiple?this.toggleOptionSelection(this.currentOption):this.setSelectedOptions(this.currentOption),this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change")}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})));return}if(["ArrowUp","ArrowDown","Home","End"].includes(t.key)){const s=this.getAllOptions(),r=s.indexOf(this.currentOption);let n=Math.max(0,r);if(t.preventDefault(),!this.open&&(this.show(),this.currentOption))return;t.key==="ArrowDown"?(n=r+1,n>s.length-1&&(n=0)):t.key==="ArrowUp"?(n=r-1,n<0&&(n=s.length-1)):t.key==="Home"?n=0:t.key==="End"&&(n=s.length-1),this.setCurrentOption(s[n])}if(t.key&&t.key.length===1||t.key==="Backspace"){const s=this.getAllOptions();if(t.metaKey||t.ctrlKey||t.altKey)return;if(!this.open){if(t.key==="Backspace")return;this.show()}t.stopPropagation(),t.preventDefault(),clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout(()=>this.typeToSelectString="",1e3),t.key==="Backspace"?this.typeToSelectString=this.typeToSelectString.slice(0,-1):this.typeToSelectString+=t.key.toLowerCase();for(const r of s)if(r.getTextLabel().toLowerCase().startsWith(this.typeToSelectString)){this.setCurrentOption(r);break}}}},this.handleDocumentMouseDown=t=>{const e=t.composedPath();this&&!e.includes(this)&&this.hide()}}get value(){return this._value}set value(t){this.multiple?t=Array.isArray(t)?t:t.split(" "):t=Array.isArray(t)?t.join(" "):t,this._value!==t&&(this.valueHasChanged=!0,this._value=t)}get validity(){return this.valueInput.validity}get validationMessage(){return this.valueInput.validationMessage}connectedCallback(){super.connectedCallback(),setTimeout(()=>{this.handleDefaultSlotChange()}),this.open=!1}addOpenListeners(){var t;document.addEventListener("focusin",this.handleDocumentFocusIn),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().addEventListener("focusin",this.handleDocumentFocusIn),"CloseWatcher"in window&&((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.open&&(this.hide(),this.displayInput.focus({preventScroll:!0}))})}removeOpenListeners(){var t;document.removeEventListener("focusin",this.handleDocumentFocusIn),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().removeEventListener("focusin",this.handleDocumentFocusIn),(t=this.closeWatcher)==null||t.destroy()}handleFocus(){this.hasFocus=!0,this.displayInput.setSelectionRange(0,0),this.emit("sl-focus")}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleLabelClick(){this.displayInput.focus()}handleComboboxMouseDown(t){const o=t.composedPath().some(i=>i instanceof Element&&i.tagName.toLowerCase()==="sl-icon-button");this.disabled||o||(t.preventDefault(),this.displayInput.focus({preventScroll:!0}),this.open=!this.open)}handleComboboxKeyDown(t){t.key!=="Tab"&&(t.stopPropagation(),this.handleDocumentKeyDown(t))}handleClearClick(t){t.stopPropagation(),this.valueHasChanged=!0,this.value!==""&&(this.setSelectedOptions([]),this.displayInput.focus({preventScroll:!0}),this.updateComplete.then(()=>{this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change")}))}handleClearMouseDown(t){t.stopPropagation(),t.preventDefault()}handleOptionClick(t){const o=t.target.closest("sl-option"),i=this.value;o&&!o.disabled&&(this.valueHasChanged=!0,this.multiple?this.toggleOptionSelection(o):this.setSelectedOptions(o),this.updateComplete.then(()=>this.displayInput.focus({preventScroll:!0})),this.value!==i&&this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change")}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})))}handleDefaultSlotChange(){customElements.get("sl-option")||customElements.whenDefined("sl-option").then(()=>this.handleDefaultSlotChange());const t=this.getAllOptions(),e=this.valueHasChanged?this.value:this.defaultValue,o=Array.isArray(e)?e:[e],i=[];t.forEach(s=>i.push(s.value)),this.setSelectedOptions(t.filter(s=>o.includes(s.value)))}handleTagRemove(t,e){t.stopPropagation(),this.valueHasChanged=!0,this.disabled||(this.toggleOptionSelection(e,!1),this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change")}))}getAllOptions(){return[...this.querySelectorAll("sl-option")]}getFirstOption(){return this.querySelector("sl-option")}setCurrentOption(t){this.getAllOptions().forEach(o=>{o.current=!1,o.tabIndex=-1}),t&&(this.currentOption=t,t.current=!0,t.tabIndex=0,t.focus())}setSelectedOptions(t){const e=this.getAllOptions(),o=Array.isArray(t)?t:[t];e.forEach(i=>i.selected=!1),o.length&&o.forEach(i=>i.selected=!0),this.selectionChanged()}toggleOptionSelection(t,e){e===!0||e===!1?t.selected=e:t.selected=!t.selected,this.selectionChanged()}selectionChanged(){var t,e,o;const i=this.getAllOptions();this.selectedOptions=i.filter(r=>r.selected);const s=this.valueHasChanged;if(this.multiple)this.value=this.selectedOptions.map(r=>r.value),this.placeholder&&this.value.length===0?this.displayLabel="":this.displayLabel=this.localize.term("numOptionsSelected",this.selectedOptions.length);else{const r=this.selectedOptions[0];this.value=(t=r?.value)!=null?t:"",this.displayLabel=(o=(e=r?.getTextLabel)==null?void 0:e.call(r))!=null?o:""}this.valueHasChanged=s,this.updateComplete.then(()=>{this.formControlController.updateValidity()})}get tags(){return this.selectedOptions.map((t,e)=>{if(e<this.maxOptionsVisible||this.maxOptionsVisible<=0){const o=this.getTag(t,e);return E`<div @sl-remove=${i=>this.handleTagRemove(i,t)}>
          ${typeof o=="string"?rr(o):o}
        </div>`}else if(e===this.maxOptionsVisible)return E`<sl-tag size=${this.size}>+${this.selectedOptions.length-e}</sl-tag>`;return E``})}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}handleDisabledChange(){this.disabled&&(this.open=!1,this.handleOpenChange())}attributeChangedCallback(t,e,o){if(super.attributeChangedCallback(t,e,o),t==="value"){const i=this.valueHasChanged;this.value=this.defaultValue,this.valueHasChanged=i}}handleValueChange(){if(!this.valueHasChanged){const o=this.valueHasChanged;this.value=this.defaultValue,this.valueHasChanged=o}const t=this.getAllOptions(),e=Array.isArray(this.value)?this.value:[this.value];this.setSelectedOptions(t.filter(o=>e.includes(o.value)))}async handleOpenChange(){if(this.open&&!this.disabled){this.setCurrentOption(this.selectedOptions[0]||this.getFirstOption()),this.emit("sl-show"),this.addOpenListeners(),await ht(this),this.listbox.hidden=!1,this.popup.active=!0,requestAnimationFrame(()=>{this.setCurrentOption(this.currentOption)});const{keyframes:t,options:e}=it(this,"select.show",{dir:this.localize.dir()});await st(this.popup.popup,t,e),this.currentOption&&as(this.currentOption,this.listbox,"vertical","auto"),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),await ht(this);const{keyframes:t,options:e}=it(this,"select.hide",{dir:this.localize.dir()});await st(this.popup.popup,t,e),this.listbox.hidden=!0,this.popup.active=!1,this.emit("sl-after-hide")}}async show(){if(this.open||this.disabled){this.open=!1;return}return this.open=!0,Lt(this,"sl-after-show")}async hide(){if(!this.open||this.disabled){this.open=!1;return}return this.open=!1,Lt(this,"sl-after-hide")}checkValidity(){return this.valueInput.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.valueInput.reportValidity()}setCustomValidity(t){this.valueInput.setCustomValidity(t),this.formControlController.updateValidity()}focus(t){this.displayInput.focus(t)}blur(){this.displayInput.blur()}render(){const t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),o=this.label?!0:!!t,i=this.helpText?!0:!!e,s=this.clearable&&!this.disabled&&this.value.length>0,r=this.placeholder&&this.value&&this.value.length<=0;return E`
      <div
        part="form-control"
        class=${J({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":o,"form-control--has-help-text":i})}
      >
        <label
          id="label"
          part="form-control-label"
          class="form-control__label"
          aria-hidden=${o?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <sl-popup
            class=${J({select:!0,"select--standard":!0,"select--filled":this.filled,"select--pill":this.pill,"select--open":this.open,"select--disabled":this.disabled,"select--multiple":this.multiple,"select--focused":this.hasFocus,"select--placeholder-visible":r,"select--top":this.placement==="top","select--bottom":this.placement==="bottom","select--small":this.size==="small","select--medium":this.size==="medium","select--large":this.size==="large"})}
            placement=${this.placement}
            strategy=${this.hoist?"fixed":"absolute"}
            flip
            shift
            sync="width"
            auto-size="vertical"
            auto-size-padding="10"
          >
            <div
              part="combobox"
              class="select__combobox"
              slot="anchor"
              @keydown=${this.handleComboboxKeyDown}
              @mousedown=${this.handleComboboxMouseDown}
            >
              <slot part="prefix" name="prefix" class="select__prefix"></slot>

              <input
                part="display-input"
                class="select__display-input"
                type="text"
                placeholder=${this.placeholder}
                .disabled=${this.disabled}
                .value=${this.displayLabel}
                autocomplete="off"
                spellcheck="false"
                autocapitalize="off"
                readonly
                aria-controls="listbox"
                aria-expanded=${this.open?"true":"false"}
                aria-haspopup="listbox"
                aria-labelledby="label"
                aria-disabled=${this.disabled?"true":"false"}
                aria-describedby="help-text"
                role="combobox"
                tabindex="0"
                @focus=${this.handleFocus}
                @blur=${this.handleBlur}
              />

              ${this.multiple?E`<div part="tags" class="select__tags">${this.tags}</div>`:""}

              <input
                class="select__value-input"
                type="text"
                ?disabled=${this.disabled}
                ?required=${this.required}
                .value=${Array.isArray(this.value)?this.value.join(", "):this.value}
                tabindex="-1"
                aria-hidden="true"
                @focus=${()=>this.focus()}
                @invalid=${this.handleInvalid}
              />

              ${s?E`
                    <button
                      part="clear-button"
                      class="select__clear"
                      type="button"
                      aria-label=${this.localize.term("clearEntry")}
                      @mousedown=${this.handleClearMouseDown}
                      @click=${this.handleClearClick}
                      tabindex="-1"
                    >
                      <slot name="clear-icon">
                        <sl-icon name="x-circle-fill" library="system"></sl-icon>
                      </slot>
                    </button>
                  `:""}

              <slot name="suffix" part="suffix" class="select__suffix"></slot>

              <slot name="expand-icon" part="expand-icon" class="select__expand-icon">
                <sl-icon library="system" name="chevron-down"></sl-icon>
              </slot>
            </div>

            <div
              id="listbox"
              role="listbox"
              aria-expanded=${this.open?"true":"false"}
              aria-multiselectable=${this.multiple?"true":"false"}
              aria-labelledby="label"
              part="listbox"
              class="select__listbox"
              tabindex="-1"
              @mouseup=${this.handleOptionClick}
              @slotchange=${this.handleDefaultSlotChange}
            >
              <slot></slot>
            </div>
          </sl-popup>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${i?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};w.styles=[q,vs,ms];w.dependencies={"sl-icon":H,"sl-popup":$,"sl-tag":kt};a([z(".select")],w.prototype,"popup",2);a([z(".select__combobox")],w.prototype,"combobox",2);a([z(".select__display-input")],w.prototype,"displayInput",2);a([z(".select__value-input")],w.prototype,"valueInput",2);a([z(".select__listbox")],w.prototype,"listbox",2);a([R()],w.prototype,"hasFocus",2);a([R()],w.prototype,"displayLabel",2);a([R()],w.prototype,"currentOption",2);a([R()],w.prototype,"selectedOptions",2);a([R()],w.prototype,"valueHasChanged",2);a([u()],w.prototype,"name",2);a([R()],w.prototype,"value",1);a([u({attribute:"value"})],w.prototype,"defaultValue",2);a([u({reflect:!0})],w.prototype,"size",2);a([u()],w.prototype,"placeholder",2);a([u({type:Boolean,reflect:!0})],w.prototype,"multiple",2);a([u({attribute:"max-options-visible",type:Number})],w.prototype,"maxOptionsVisible",2);a([u({type:Boolean,reflect:!0})],w.prototype,"disabled",2);a([u({type:Boolean})],w.prototype,"clearable",2);a([u({type:Boolean,reflect:!0})],w.prototype,"open",2);a([u({type:Boolean})],w.prototype,"hoist",2);a([u({type:Boolean,reflect:!0})],w.prototype,"filled",2);a([u({type:Boolean,reflect:!0})],w.prototype,"pill",2);a([u()],w.prototype,"label",2);a([u({reflect:!0})],w.prototype,"placement",2);a([u({attribute:"help-text"})],w.prototype,"helpText",2);a([u({reflect:!0})],w.prototype,"form",2);a([u({type:Boolean,reflect:!0})],w.prototype,"required",2);a([u()],w.prototype,"getTag",2);a([N("disabled",{waitUntilFirstUpdate:!0})],w.prototype,"handleDisabledChange",1);a([N(["defaultValue","value"],{waitUntilFirstUpdate:!0})],w.prototype,"handleValueChange",1);a([N("open",{waitUntilFirstUpdate:!0})],w.prototype,"handleOpenChange",1);rt("select.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}});rt("select.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});var nr=V`
  :host {
    --max-width: 20rem;
    --hide-delay: 0ms;
    --show-delay: 150ms;

    display: contents;
  }

  .tooltip {
    --arrow-size: var(--sl-tooltip-arrow-size);
    --arrow-color: var(--sl-tooltip-background-color);
  }

  .tooltip::part(popup) {
    z-index: var(--sl-z-index-tooltip);
  }

  .tooltip[placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .tooltip[placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .tooltip[placement^='left']::part(popup) {
    transform-origin: right;
  }

  .tooltip[placement^='right']::part(popup) {
    transform-origin: left;
  }

  .tooltip__body {
    display: block;
    width: max-content;
    max-width: var(--max-width);
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    text-align: start;
    white-space: normal;
    color: var(--sl-tooltip-color);
    padding: var(--sl-tooltip-padding);
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
  }
`,P=class extends D{constructor(){super(),this.localize=new mt(this),this.content="",this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.trigger="hover focus",this.hoist=!1,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=t=>{t.key==="Escape"&&(t.stopPropagation(),this.hide())},this.handleMouseOver=()=>{if(this.hasTrigger("hover")){const t=yo(getComputedStyle(this).getPropertyValue("--show-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),t)}},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){const t=yo(getComputedStyle(this).getPropertyValue("--hide-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.hide(),t)}},this.addEventListener("blur",this.handleBlur,!0),this.addEventListener("focus",this.handleFocus,!0),this.addEventListener("click",this.handleClick),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.closeWatcher)==null||t.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(t){return this.trigger.split(" ").includes(t)}async handleOpenChange(){var t,e;if(this.open){if(this.disabled)return;this.emit("sl-show"),"CloseWatcher"in window?((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide()}):document.addEventListener("keydown",this.handleDocumentKeyDown),await ht(this.body),this.body.hidden=!1,this.popup.active=!0;const{keyframes:o,options:i}=it(this,"tooltip.show",{dir:this.localize.dir()});await st(this.popup.popup,o,i),this.popup.reposition(),this.emit("sl-after-show")}else{this.emit("sl-hide"),(e=this.closeWatcher)==null||e.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown),await ht(this.body);const{keyframes:o,options:i}=it(this,"tooltip.hide",{dir:this.localize.dir()});await st(this.popup.popup,o,i),this.popup.active=!1,this.body.hidden=!0,this.emit("sl-after-hide")}}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,Lt(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,Lt(this,"sl-after-hide")}render(){return E`
      <sl-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${J({tooltip:!0,"tooltip--open":this.open})}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist?"fixed":"absolute"}
        flip
        shift
        arrow
        hover-bridge
      >
        ${""}
        <slot slot="anchor" aria-describedby="tooltip"></slot>

        ${""}
        <div part="body" id="tooltip" class="tooltip__body" role="tooltip" aria-live=${this.open?"polite":"off"}>
          <slot name="content">${this.content}</slot>
        </div>
      </sl-popup>
    `}};P.styles=[q,nr];P.dependencies={"sl-popup":$};a([z("slot:not([name])")],P.prototype,"defaultSlot",2);a([z(".tooltip__body")],P.prototype,"body",2);a([z("sl-popup")],P.prototype,"popup",2);a([u()],P.prototype,"content",2);a([u()],P.prototype,"placement",2);a([u({type:Boolean,reflect:!0})],P.prototype,"disabled",2);a([u({type:Number})],P.prototype,"distance",2);a([u({type:Boolean,reflect:!0})],P.prototype,"open",2);a([u({type:Number})],P.prototype,"skidding",2);a([u()],P.prototype,"trigger",2);a([u({type:Boolean})],P.prototype,"hoist",2);a([N("open",{waitUntilFirstUpdate:!0})],P.prototype,"handleOpenChange",1);a([N(["content","distance","hoist","placement","skidding"])],P.prototype,"handleOptionsChange",1);a([N("disabled")],P.prototype,"handleDisabledChange",1);rt("tooltip.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:150,easing:"ease"}});rt("tooltip.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:150,easing:"ease"}});export{H as S,pe as a,x as b,nt as c,K as d,w as e,P as f,Gs as g,Ze as s};
