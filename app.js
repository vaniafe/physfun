/**
 * Skipped minification because the original files appears to be already minified.
 * Original file: /npm/@supabase/supabase-js@2.49.8/dist/umd/supabase.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.supabase=t():e.supabase=t()}(self,(()=>(()=>{"use strict";var e,t,r,s,i={334:(e,t,r)=>{r.r(t),r.d(t,{AuthAdminApi:()=>fe,AuthApiError:()=>u,AuthClient:()=>pe,AuthError:()=>l,AuthImplicitGrantRedirectError:()=>_,AuthInvalidCredentialsError:()=>m,AuthInvalidJwtError:()=>j,AuthInvalidTokenResponseError:()=>y,AuthPKCEGrantCodeExchangeError:()=>b,AuthRetryableFetchError:()=>k,AuthSessionMissingError:()=>g,AuthUnknownError:()=>f,AuthWeakPasswordError:()=>S,CustomAuthError:()=>p,GoTrueAdminApi:()=>se,GoTrueClient:()=>de,NavigatorLockAcquireTimeoutError:()=>ce,isAuthApiError:()=>d,isAuthError:()=>h,isAuthImplicitGrantRedirectError:()=>w,isAuthRetryableFetchError:()=>T,isAuthSessionMissingError:()=>v,isAuthWeakPasswordError:()=>E,lockInternals:()=>oe,navigatorLock:()=>le});const s="2.69.1",i=3e4,n={"X-Client-Info":`gotrue-js/${s}`},o="X-Supabase-Api-Version",a={"2024-01-01":{timestamp:Date.parse("2024-01-01T00:00:00.0Z"),name:"2024-01-01"}},c=/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i;class l extends Error{constructor(e,t,r){super(e),this.__isAuthError=!0,this.name="AuthError",this.status=t,this.code=r}}function h(e){return"object"==typeof e&&null!==e&&"__isAuthError"in e}class u extends l{constructor(e,t,r){super(e,t,r),this.name="AuthApiError",this.status=t,this.code=r}}function d(e){return h(e)&&"AuthApiError"===e.name}class f extends l{constructor(e,t){super(e),this.name="AuthUnknownError",this.originalError=t}}class p extends l{constructor(e,t,r,s){super(e,r,s),this.name=t,this.status=r}}class g extends p{constructor(){super("Auth session missing!","AuthSessionMissingError",400,void 0)}}function v(e){return h(e)&&"AuthSessionMissingError"===e.name}class y extends p{constructor(){super("Auth session or user missing","AuthInvalidTokenResponseError",500,void 0)}}class m extends p{constructor(e){super(e,"AuthInvalidCredentialsError",400,void 0)}}class _ extends p{constructor(e,t=null){super(e,"AuthImplicitGrantRedirectError",500,void 0),this.details=null,this.details=t}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}}function w(e){return h(e)&&"AuthImplicitGrantRedirectError"===e.name}class b extends p{constructor(e,t=null){super(e,"AuthPKCEGrantCodeExchangeError",500,void 0),this.details=null,this.details=t}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}}class k extends p{constructor(e,t){super(e,"AuthRetryableFetchError",t,void 0)}}function T(e){return h(e)&&"AuthRetryableFetchError"===e.name}class S extends p{constructor(e,t,r){super(e,"AuthWeakPasswordError",t,"weak_password"),this.reasons=r}}function E(e){return h(e)&&"AuthWeakPasswordError"===e.name}class j extends p{constructor(e){super(e,"AuthInvalidJwtError",400,"invalid_jwt")}}const O="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""),P=" \t\n\r=".split(""),A=(()=>{const e=new Array(128);for(let t=0;t<e.length;t+=1)e[t]=-1;for(let t=0;t<P.length;t+=1)e[P[t].charCodeAt(0)]=-2;for(let t=0;t<O.length;t+=1)e[O[t].charCodeAt(0)]=t;return e})();function $(e,t,r){const s=A[e];if(!(s>-1)){if(-2===s)return;throw new Error(`Invalid Base64-URL character "${String.fromCharCode(e)}"`)}for(t.queue=t.queue<<6|s,t.queuedBits+=6;t.queuedBits>=8;)r(t.queue>>t.queuedBits-8&255),t.queuedBits-=8}function C(e){const t=[],r=e=>{t.push(String.fromCodePoint(e))},s={utf8seq:0,codepoint:0},i={queue:0,queuedBits:0},n=e=>{!function(e,t,r){if(0===t.utf8seq){if(e<=127)return void r(e);for(let r=1;r<6;r+=1)if(!(e>>7-r&1)){t.utf8seq=r;break}if(2===t.utf8seq)t.codepoint=31&e;else if(3===t.utf8seq)t.codepoint=15&e;else{if(4!==t.utf8seq)throw new Error("Invalid UTF-8 sequence");t.codepoint=7&e}t.utf8seq-=1}else if(t.utf8seq>0){if(e<=127)throw new Error("Invalid UTF-8 sequence");t.codepoint=t.codepoint<<6|63&e,t.utf8seq-=1,0===t.utf8seq&&r(t.codepoint)}}(e,s,r)};for(let t=0;t<e.length;t+=1)$(e.charCodeAt(t),i,n);return t.join("")}function x(e,t){if(!(e<=127)){if(e<=2047)return t(192|e>>6),void t(128|63&e);if(e<=65535)return t(224|e>>12),t(128|e>>6&63),void t(128|63&e);if(e<=1114111)return t(240|e>>18),t(128|e>>12&63),t(128|e>>6&63),void t(128|63&e);throw new Error(`Unrecognized Unicode codepoint: ${e.toString(16)}`)}t(e)}function R(e){const t=[],r={queue:0,queuedBits:0},s=e=>{t.push(e)};for(let t=0;t<e.length;t+=1)$(e.charCodeAt(t),r,s);return new Uint8Array(t)}const I=()=>"undefined"!=typeof window&&"undefined"!=typeof document,L={tested:!1,writable:!1},U=()=>{if(!I())return!1;try{if("object"!=typeof globalThis.localStorage)return!1}catch(e){return!1}if(L.tested)return L.writable;const e=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(e,e),globalThis.localStorage.removeItem(e),L.tested=!0,L.writable=!0}catch(e){L.tested=!0,L.writable=!1}return L.writable},D=e=>{let t;return t=e||("undefined"==typeof fetch?(...e)=>Promise.resolve().then(r.bind(r,907)).then((({default:t})=>t(...e))):fetch),(...e)=>t(...e)},N=e=>"object"==typeof e&&null!==e&&"status"in e&&"ok"in e&&"json"in e&&"function"==typeof e.json,F=async(e,t,r)=>{await e.setItem(t,JSON.stringify(r))},M=async(e,t)=>{const r=await e.getItem(t);if(!r)return null;try{return JSON.parse(r)}catch(e){return r}},B=async(e,t)=>{await e.removeItem(t)};class q{constructor(){this.promise=new q.promiseConstructor(((e,t)=>{this.resolve=e,this.reject=t}))}}function J(e){const t=e.split(".");if(3!==t.length)throw new j("Invalid JWT structure");for(let e=0;e<t.length;e++)if(!c.test(t[e]))throw new j("JWT not in base64url format");return{header:JSON.parse(C(t[0])),payload:JSON.parse(C(t[1])),signature:R(t[2]),raw:{header:t[0],payload:t[1]}}}function H(e){return("0"+e.toString(16)).substr(-2)}async function z(e,t,r=!1){const s=function(){const e=new Uint32Array(56);if("undefined"==typeof crypto){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",t=e.length;let r="";for(let s=0;s<56;s++)r+=e.charAt(Math.floor(Math.random()*t));return r}return crypto.getRandomValues(e),Array.from(e,H).join("")}();let i=s;r&&(i+="/PASSWORD_RECOVERY"),await F(e,`${t}-code-verifier`,i);const n=await async function(e){if("undefined"==typeof crypto||void 0===crypto.subtle||"undefined"==typeof TextEncoder)return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."),e;const t=await async function(e){const t=(new TextEncoder).encode(e),r=await crypto.subtle.digest("SHA-256",t),s=new Uint8Array(r);return Array.from(s).map((e=>String.fromCharCode(e))).join("")}(e);return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}(s);return[n,s===n?"plain":"s256"]}q.promiseConstructor=Promise;const G=/^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;const K=e=>e.msg||e.message||e.error_description||e.error||JSON.stringify(e),W=[502,503,504];async function V(e){var t;if(!N(e))throw new k(K(e),0);if(W.includes(e.status))throw new k(K(e),e.status);let r,s;try{r=await e.json()}catch(e){throw new f(K(e),e)}const i=function(e){const t=e.headers.get(o);if(!t)return null;if(!t.match(G))return null;try{return new Date(`${t}T00:00:00.0Z`)}catch(e){return null}}(e);if(i&&i.getTime()>=a["2024-01-01"].timestamp&&"object"==typeof r&&r&&"string"==typeof r.code?s=r.code:"object"==typeof r&&r&&"string"==typeof r.error_code&&(s=r.error_code),s){if("weak_password"===s)throw new S(K(r),e.status,(null===(t=r.weak_password)||void 0===t?void 0:t.reasons)||[]);if("session_not_found"===s)throw new g}else if("object"==typeof r&&r&&"object"==typeof r.weak_password&&r.weak_password&&Array.isArray(r.weak_password.reasons)&&r.weak_password.reasons.length&&r.weak_password.reasons.reduce(((e,t)=>e&&"string"==typeof t),!0))throw new S(K(r),e.status,r.weak_password.reasons);throw new u(K(r),e.status||500,s)}async function Y(e,t,r,s){var i;const n=Object.assign({},null==s?void 0:s.headers);n[o]||(n[o]=a["2024-01-01"].name),(null==s?void 0:s.jwt)&&(n.Authorization=`Bearer ${s.jwt}`);const c=null!==(i=null==s?void 0:s.query)&&void 0!==i?i:{};(null==s?void 0:s.redirectTo)&&(c.redirect_to=s.redirectTo);const l=Object.keys(c).length?"?"+new URLSearchParams(c).toString():"",h=await async function(e,t,r,s,i,n){const o=((e,t,r,s)=>{const i={method:e,headers:(null==t?void 0:t.headers)||{}};return"GET"===e?i:(i.headers=Object.assign({"Content-Type":"application/json;charset=UTF-8"},null==t?void 0:t.headers),i.body=JSON.stringify(s),Object.assign(Object.assign({},i),r))})(t,s,{},n);let a;try{a=await e(r,Object.assign({},o))}catch(e){throw console.error(e),new k(K(e),0)}if(a.ok||await V(a),null==s?void 0:s.noResolveJson)return a;try{return await a.json()}catch(e){await V(e)}}(e,t,r+l,{headers:n,noResolveJson:null==s?void 0:s.noResolveJson},0,null==s?void 0:s.body);return(null==s?void 0:s.xform)?null==s?void 0:s.xform(h):{data:Object.assign({},h),error:null}}function Q(e){var t;let r=null;var s;return function(e){return e.access_token&&e.refresh_token&&e.expires_in}(e)&&(r=Object.assign({},e),e.expires_at||(r.expires_at=(s=e.expires_in,Math.round(Date.now()/1e3)+s))),{data:{session:r,user:null!==(t=e.user)&&void 0!==t?t:e},error:null}}function X(e){const t=Q(e);return!t.error&&e.weak_password&&"object"==typeof e.weak_password&&Array.isArray(e.weak_password.reasons)&&e.weak_password.reasons.length&&e.weak_password.message&&"string"==typeof e.weak_password.message&&e.weak_password.reasons.reduce(((e,t)=>e&&"string"==typeof t),!0)&&(t.data.weak_password=e.weak_password),t}function Z(e){var t;return{data:{user:null!==(t=e.user)&&void 0!==t?t:e},error:null}}function ee(e){return{data:e,error:null}}function te(e){const{action_link:t,email_otp:r,hashed_token:s,redirect_to:i,verification_type:n}=e,o=function(e,t){var r={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(r[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(s=Object.getOwnPropertySymbols(e);i<s.length;i++)t.indexOf(s[i])<0&&Object.prototype.propertyIsEnumerable.call(e,s[i])&&(r[s[i]]=e[s[i]])}return r}(e,["action_link","email_otp","hashed_token","redirect_to","verification_type"]);return{data:{properties:{action_link:t,email_otp:r,hashed_token:s,redirect_to:i,verification_type:n},user:Object.assign({},o)},error:null}}function re(e){return e}class se{constructor({url:e="",headers:t={},fetch:r}){this.url=e,this.headers=t,this.fetch=D(r),this.mfa={listFactors:this._listFactors.bind(this),deleteFactor:this._deleteFactor.bind(this)}}async signOut(e,t="global"){try{return await Y(this.fetch,"POST",`${this.url}/logout?scope=${t}`,{headers:this.headers,jwt:e,noResolveJson:!0}),{data:null,error:null}}catch(e){if(h(e))return{data:null,error:e};throw e}}async inviteUserByEmail(e,t={}){try{return await Y(this.fetch,"POST",`${this.url}/invite`,{body:{email:e,data:t.data},headers:this.headers,redirectTo:t.redirectTo,xform:Z})}catch(e){if(h(e))return{data:{user:null},error:e};throw e}}async generateLink(e){try{const{options:t}=e,r=function(e,t){var r={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(r[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(s=Object.getOwnPropertySymbols(e);i<s.length;i++)t.indexOf(s[i])<0&&Object.prototype.propertyIsEnumerable.call(e,s[i])&&(r[s[i]]=e[s[i]])}return r}(e,["options"]),s=Object.assign(Object.assign({},r),t);return"newEmail"in r&&(s.new_email=null==r?void 0:r.newEmail,delete s.newEmail),await Y(this.fetch,"POST",`${this.url}/admin/generate_link`,{body:s,headers:this.headers,xform:te,redirectTo:null==t?void 0:t.redirectTo})}catch(e){if(h(e))return{data:{properties:null,user:null},error:e};throw e}}async createUser(e){try{return await Y(this.fetch,"POST",`${this.url}/admin/users`,{body:e,headers:this.headers,xform:Z})}catch(e){if(h(e))return{data:{user:null},error:e};throw e}}async listUsers(e){var t,r,s,i,n,o,a;try{const c={nextPage:null,lastPage:0,total:0},l=await Y(this.fetch,"GET",`${this.url}/admin/users`,{headers:this.headers,noResolveJson:!0,query:{page:null!==(r=null===(t=null==e?void 0:e.page)||void 0===t?void 0:t.toString())&&void 0!==r?r:"",per_page:null!==(i=null===(s=null==e?void 0:e.perPage)||void 0===s?void 0:s.toString())&&void 0!==i?i:""},xform:re});if(l.error)throw l.error;const h=await l.json(),u=null!==(n=l.headers.get("x-total-count"))&&void 0!==n?n:0,d=null!==(a=null===(o=l.headers.get("link"))||void 0===o?void 0:o.split(","))&&void 0!==a?a:[];return d.length>0&&(d.forEach((e=>{const t=parseInt(e.split(";")[0].split("=")[1].substring(0,1)),r=JSON.parse(e.split(";")[1].split("=")[1]);c[`${r}Page`]=t})),c.total=parseInt(u)),{data:Object.assign(Object.assign({},h),c),error:null}}catch(e){if(h(e))return{data:{users:[]},error:e};throw e}}async getUserById(e){try{return await Y(this.fetch,"GET",`${this.url}/admin/users/${e}`,{headers:this.headers,xform:Z})}catch(e){if(h(e))return{data:{user:null},error:e};throw e}}async updateUserById(e,t){try{return await Y(this.fetch,"PUT",`${this.url}/admin/users/${e}`,{body:t,headers:this.headers,xform:Z})}catch(e){if(h(e))return{data:{user:null},error:e};throw e}}async deleteUser(e,t=!1){try{return await Y(this.fetch,"DELETE",`${this.url}/admin/users/${e}`,{headers:this.headers,body:{should_soft_delete:t},xform:Z})}catch(e){if(h(e))return{data:{user:null},error:e};throw e}}async _listFactors(e){try{const{data:t,error:r}=await Y(this.fetch,"GET",`${this.url}/admin/users/${e.userId}/factors`,{headers:this.headers,xform:e=>({data:{factors:e},error:null})});return{data:t,error:r}}catch(e){if(h(e))return{data:null,error:e};throw e}}async _deleteFactor(e){try{return{data:await Y(this.fetch,"DELETE",`${this.url}/admin/users/${e.userId}/factors/${e.id}`,{headers:this.headers}),error:null}}catch(e){if(h(e))return{data:null,error:e};throw e}}}const ie={getItem:e=>U()?globalThis.localStorage.getItem(e):null,setItem:(e,t)=>{U()&&globalThis.localStorage.setItem(e,t)},removeItem:e=>{U()&&globalThis.localStorage.removeItem(e)}};function ne(e={}){return{getItem:t=>e[t]||null,setItem:(t,r)=>{e[t]=r},removeItem:t=>{delete e[t]}}}const oe={debug:!!(globalThis&&U()&&globalThis.localStorage&&"true"===globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug"))};class ae extends Error{constructor(e){super(e),this.isAcquireTimeout=!0}}class ce extends ae{}async function le(e,t,r){oe.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquire lock",e,t);const s=new globalThis.AbortController;return t>0&&setTimeout((()=>{s.abort(),oe.debug&&console.log("@supabase/gotrue-js: navigatorLock acquire timed out",e)}),t),await Promise.resolve().then((()=>globalThis.navigator.locks.request(e,0===t?{mode:"exclusive",ifAvailable:!0}:{mode:"exclusive",signal:s.signal},(async s=>{if(!s){if(0===t)throw oe.debug&&console.log("@supabase/gotrue-js: navigatorLock: not immediately available",e),new ce(`Acquiring an exclusive Navigator LockManager lock "${e}" immediately failed`);if(oe.debug)try{const e=await globalThis.navigator.locks.query();console.log("@supabase/gotrue-js: Navigator LockManager state",JSON.stringify(e,null,"  "))}catch(e){console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state",e)}return console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request"),await r()}oe.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquired",e,s.name);try{return await r()}finally{oe.debug&&console.log("@supabase/gotrue-js: navigatorLock: released",e,s.name)}}))))}!function(){if("object"!=typeof globalThis)try{Object.defineProperty(Object.prototype,"__magic__",{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch(e){"undefined"!=typeof self&&(self.globalThis=self)}}();const he={url:"http://localhost:9999",storageKey:"supabase.auth.token",autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,headers:n,flowType:"implicit",debug:!1,hasCustomAuthorizationHeader:!1};async function ue(e,t,r){return await r()}class de{constructor(e){var t,r;this.memoryStorage=null,this.stateChangeEmitters=new Map,this.autoRefreshTicker=null,this.visibilityChangedCallback=null,this.refreshingDeferred=null,this.initializePromise=null,this.detectSessionInUrl=!0,this.hasCustomAuthorizationHeader=!1,this.suppressGetSessionWarning=!1,this.lockAcquired=!1,this.pendingInLock=[],this.broadcastChannel=null,this.logger=console.log,this.instanceID=de.nextInstanceID,de.nextInstanceID+=1,this.instanceID>0&&I()&&console.warn("Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.");const s=Object.assign(Object.assign({},he),e);if(this.logDebugMessages=!!s.debug,"function"==typeof s.debug&&(this.logger=s.debug),this.persistSession=s.persistSession,this.storageKey=s.storageKey,this.autoRefreshToken=s.autoRefreshToken,this.admin=new se({url:s.url,headers:s.headers,fetch:s.fetch}),this.url=s.url,this.headers=s.headers,this.fetch=D(s.fetch),this.lock=s.lock||ue,this.detectSessionInUrl=s.detectSessionInUrl,this.flowType=s.flowType,this.hasCustomAuthorizationHeader=s.hasCustomAuthorizationHeader,s.lock?this.lock=s.lock:I()&&(null===(t=null===globalThis||void 0===globalThis?void 0:globalThis.navigator)||void 0===t?void 0:t.locks)?this.lock=le:this.lock=ue,this.jwks={keys:[]},this.jwks_cached_at=Number.MIN_SAFE_INTEGER,this.mfa={verify:this._verify.bind(this),enroll:this._enroll.bind(this),unenroll:this._unenroll.bind(this),challenge:this._challenge.bind(this),listFactors:this._listFactors.bind(this),challengeAndVerify:this._challengeAndVerify.bind(this),getAuthenticatorAssuranceLevel:this._getAuthenticatorAssuranceLevel.bind(this)},this.persistSession?s.storage?this.storage=s.storage:U()?this.storage=ie:(this.memoryStorage={},this.storage=ne(this.memoryStorage)):(this.memoryStorage={},this.storage=ne(this.memoryStorage)),I()&&globalThis.BroadcastChannel&&this.persistSession&&this.storageKey){try{this.broadcastChannel=new globalThis.BroadcastChannel(this.storageKey)}catch(e){console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available",e)}null===(r=this.broadcastChannel)||void 0===r||r.addEventListener("message",(async e=>{this._debug("received broadcast notification from other tab or client",e),await this._notifyAllSubscribers(e.data.event,e.data.session,!1)}))}this.initialize()}_debug(...e){return this.logDebugMessages&&this.logger(`GoTrueClient@${this.instanceID} (${s}) ${(new Date).toISOString()}`,...e),this}async initialize(){return this.initializePromise||(this.initializePromise=(async()=>await this._acquireLock(-1,(async()=>await this._initialize())))()),await this.initializePromise}async _initialize(){var e;try{const t=function(e){const t={},r=new URL(e);if(r.hash&&"#"===r.hash[0])try{new URLSearchParams(r.hash.substring(1)).forEach(((e,r)=>{t[r]=e}))}catch(e){}return r.searchParams.forEach(((e,r)=>{t[r]=e})),t}(window.location.href);let r="none";if(this._isImplicitGrantCallback(t)?r="implicit":await this._isPKCECallback(t)&&(r="pkce"),I()&&this.detectSessionInUrl&&"none"!==r){const{data:s,error:i}=await this._getSessionFromURL(t,r);if(i){if(this._debug("#_initialize()","error detecting session from URL",i),w(i)){const t=null===(e=i.details)||void 0===e?void 0:e.code;if("identity_already_exists"===t||"identity_not_found"===t||"single_identity_not_deletable"===t)return{error:i}}return await this._removeSession(),{error:i}}const{session:n,redirectType:o}=s;return this._debug("#_initialize()","detected session in URL",n,"redirect type",o),await this._saveSession(n),setTimeout((async()=>{"recovery"===o?await this._notifyAllSubscribers("PASSWORD_RECOVERY",n):await this._notifyAllSubscribers("SIGNED_IN",n)}),0),{error:null}}return await this._recoverAndRefresh(),{error:null}}catch(e){return h(e)?{error:e}:{error:new f("Unexpected error during initialization",e)}}finally{await this._handleVisibilityChange(),this._debug("#_initialize()","end")}}async signInAnonymously(e){var t,r,s;try{const i=await Y(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{data:null!==(r=null===(t=null==e?void 0:e.options)||void 0===t?void 0:t.data)&&void 0!==r?r:{},gotrue_meta_security:{captcha_token:null===(s=null==e?void 0:e.options)||void 0===s?void 0:s.captchaToken}},xform:Q}),{data:n,error:o}=i;if(o||!n)return{data:{user:null,session:null},error:o};const a=n.session,c=n.user;return n.session&&(await this._saveSession(n.session),await this._notifyAllSubscribers("SIGNED_IN",a)),{data:{user:c,session:a},error:null}}catch(e){if(h(e))return{data:{user:null,session:null},error:e};throw e}}async signUp(e){var t,r,s;try{let i;if("email"in e){const{email:r,password:s,options:n}=e;let o=null,a=null;"pkce"===this.flowType&&([o,a]=await z(this.storage,this.storageKey)),i=await Y(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,redirectTo:null==n?void 0:n.emailRedirectTo,body:{email:r,password:s,data:null!==(t=null==n?void 0:n.data)&&void 0!==t?t:{},gotrue_meta_security:{captcha_token:null==n?void 0:n.captchaToken},code_challenge:o,code_challenge_method:a},xform:Q})}else{if(!("phone"in e))throw new m("You must provide either an email or phone number and a password");{const{phone:t,password:n,options:o}=e;i=await Y(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{phone:t,password:n,data:null!==(r=null==o?void 0:o.data)&&void 0!==r?r:{},channel:null!==(s=null==o?void 0:o.channel)&&void 0!==s?s:"sms",gotrue_meta_security:{captcha_token:null==o?void 0:o.captchaToken}},xform:Q})}}const{data:n,error:o}=i;if(o||!n)return{data:{user:null,session:null},error:o};const a=n.session,c=n.user;return n.session&&(await this._saveSession(n.session),await this._notifyAllSubscribers("SIGNED_IN",a)),{data:{user:c,session:a},error:null}}catch(e){if(h(e))return{data:{user:null,session:null},error:e};throw e}}async signInWithPassword(e){try{let t;if("email"in e){const{email:r,password:s,options:i}=e;t=await Y(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{email:r,password:s,gotrue_meta_security:{captcha_token:null==i?void 0:i.captchaToken}},xform:X})}else{if(!("phone"in e))throw new m("You must provide either an email or phone number and a password");{const{phone:r,password:s,options:i}=e;t=await Y(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{phone:r,password:s,gotrue_meta_security:{captcha_token:null==i?void 0:i.captchaToken}},xform:X})}}const{data:r,error:s}=t;return s?{data:{user:null,session:null},error:s}:r&&r.session&&r.user?(r.session&&(await this._saveSession(r.session),await this._notifyAllSubscribers("SIGNED_IN",r.session)),{data:Object.assign({user:r.user,session:r.session},r.weak_password?{weakPassword:r.weak_password}:null),error:s}):{data:{user:null,session:null},error:new y}}catch(e){if(h(e))return{data:{user:null,session:null},error:e};throw e}}async signInWithOAuth(e){var t,r,s,i;return await this._handleProviderSignIn(e.provider,{redirectTo:null===(t=e.options)||void 0===t?void 0:t.redirectTo,scopes:null===(r=e.options)||void 0===r?void 0:r.scopes,queryParams:null===(s=e.options)||void 0===s?void 0:s.queryParams,skipBrowserRedirect:null===(i=e.options)||void 0===i?void 0:i.skipBrowserRedirect})}async exchangeCodeForSession(e){return await this.initializePromise,this._acquireLock(-1,(async()=>this._exchangeCodeForSession(e)))}async _exchangeCodeForSession(e){const t=await M(this.storage,`${this.storageKey}-code-verifier`),[r,s]=(null!=t?t:"").split("/");try{const{data:t,error:i}=await Y(this.fetch,"POST",`${this.url}/token?grant_type=pkce`,{headers:this.headers,body:{auth_code:e,code_verifier:r},xform:Q});if(await B(this.storage,`${this.storageKey}-code-verifier`),i)throw i;return t&&t.session&&t.user?(t.session&&(await this._saveSession(t.session),await this._notifyAllSubscribers("SIGNED_IN",t.session)),{data:Object.assign(Object.assign({},t),{redirectType:null!=s?s:null}),error:i}):{data:{user:null,session:null,redirectType:null},error:new y}}catch(e){if(h(e))return{data:{user:null,session:null,redirectType:null},error:e};throw e}}async signInWithIdToken(e){try{const{options:t,provider:r,token:s,access_token:i,nonce:n}=e,o=await Y(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,body:{provider:r,id_token:s,access_token:i,nonce:n,gotrue_meta_security:{captcha_token:null==t?void 0:t.captchaToken}},xform:Q}),{data:a,error:c}=o;return c?{data:{user:null,session:null},error:c}:a&&a.session&&a.user?(a.session&&(await this._saveSession(a.session),await this._notifyAllSubscribers("SIGNED_IN",a.session)),{data:a,error:c}):{data:{user:null,session:null},error:new y}}catch(e){if(h(e))return{data:{user:null,session:null},error:e};throw e}}async signInWithOtp(e){var t,r,s,i,n;try{if("email"in e){const{email:s,options:i}=e;let n=null,o=null;"pkce"===this.flowType&&([n,o]=await z(this.storage,this.storageKey));const{error:a}=await Y(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{email:s,data:null!==(t=null==i?void 0:i.data)&&void 0!==t?t:{},create_user:null===(r=null==i?void 0:i.shouldCreateUser)||void 0===r||r,gotrue_meta_security:{captcha_token:null==i?void 0:i.captchaToken},code_challenge:n,code_challenge_method:o},redirectTo:null==i?void 0:i.emailRedirectTo});return{data:{user:null,session:null},error:a}}if("phone"in e){const{phone:t,options:r}=e,{data:o,error:a}=await Y(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{phone:t,data:null!==(s=null==r?void 0:r.data)&&void 0!==s?s:{},create_user:null===(i=null==r?void 0:r.shouldCreateUser)||void 0===i||i,gotrue_meta_security:{captcha_token:null==r?void 0:r.captchaToken},channel:null!==(n=null==r?void 0:r.channel)&&void 0!==n?n:"sms"}});return{data:{user:null,session:null,messageId:null==o?void 0:o.message_id},error:a}}throw new m("You must provide either an email or phone number.")}catch(e){if(h(e))return{data:{user:null,session:null},error:e};throw e}}async verifyOtp(e){var t,r;try{let s,i;"options"in e&&(s=null===(t=e.options)||void 0===t?void 0:t.redirectTo,i=null===(r=e.options)||void 0===r?void 0:r.captchaToken);const{data:n,error:o}=await Y(this.fetch,"POST",`${this.url}/verify`,{headers:this.headers,body:Object.assign(Object.assign({},e),{gotrue_meta_security:{captcha_token:i}}),redirectTo:s,xform:Q});if(o)throw o;if(!n)throw new Error("An error occurred on token verification.");const a=n.session,c=n.user;return(null==a?void 0:a.access_token)&&(await this._saveSession(a),await this._notifyAllSubscribers("recovery"==e.type?"PASSWORD_RECOVERY":"SIGNED_IN",a)),{data:{user:c,session:a},error:null}}catch(e){if(h(e))return{data:{user:null,session:null},error:e};throw e}}async signInWithSSO(e){var t,r,s;try{let i=null,n=null;return"pkce"===this.flowType&&([i,n]=await z(this.storage,this.storageKey)),await Y(this.fetch,"POST",`${this.url}/sso`,{body:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},"providerId"in e?{provider_id:e.providerId}:null),"domain"in e?{domain:e.domain}:null),{redirect_to:null!==(r=null===(t=e.options)||void 0===t?void 0:t.redirectTo)&&void 0!==r?r:void 0}),(null===(s=null==e?void 0:e.options)||void 0===s?void 0:s.captchaToken)?{gotrue_meta_security:{captcha_token:e.options.captchaToken}}:null),{skip_http_redirect:!0,code_challenge:i,code_challenge_method:n}),headers:this.headers,xform:ee})}catch(e){if(h(e))return{data:null,error:e};throw e}}async reauthenticate(){return await this.initializePromise,await this._acquireLock(-1,(async()=>await this._reauthenticate()))}async _reauthenticate(){try{return await this._useSession((async e=>{const{data:{session:t},error:r}=e;if(r)throw r;if(!t)throw new g;const{error:s}=await Y(this.fetch,"GET",`${this.url}/reauthenticate`,{headers:this.headers,jwt:t.access_token});return{data:{user:null,session:null},error:s}}))}catch(e){if(h(e))return{data:{user:null,session:null},error:e};throw e}}async resend(e){try{const t=`${this.url}/resend`;if("email"in e){const{email:r,type:s,options:i}=e,{error:n}=await Y(this.fetch,"POST",t,{headers:this.headers,body:{email:r,type:s,gotrue_meta_security:{captcha_token:null==i?void 0:i.captchaToken}},redirectTo:null==i?void 0:i.emailRedirectTo});return{data:{user:null,session:null},error:n}}if("phone"in e){const{phone:r,type:s,options:i}=e,{data:n,error:o}=await Y(this.fetch,"POST",t,{headers:this.headers,body:{phone:r,type:s,gotrue_meta_security:{captcha_token:null==i?void 0:i.captchaToken}}});return{data:{user:null,session:null,messageId:null==n?void 0:n.message_id},error:o}}throw new m("You must provide either an email or phone number and a type")}catch(e){if(h(e))return{data:{user:null,session:null},error:e};throw e}}async getSession(){return await this.initializePromise,await this._acquireLock(-1,(async()=>this._useSession((async e=>e))))}async _acquireLock(e,t){this._debug("#_acquireLock","begin",e);try{if(this.lockAcquired){const e=this.pendingInLock.length?this.pendingInLock[this.pendingInLock.length-1]:Promise.resolve(),r=(async()=>(await e,await t()))();return this.pendingInLock.push((async()=>{try{await r}catch(e){}})()),r}return await this.lock(`lock:${this.storageKey}`,e,(async()=>{this._debug("#_acquireLock","lock acquired for storage key",this.storageKey);try{this.lockAcquired=!0;const e=t();for(this.pendingInLock.push((async()=>{try{await e}catch(e){}})()),await e;this.pendingInLock.length;){const e=[...this.pendingInLock];await Promise.all(e),this.pendingInLock.splice(0,e.length)}return await e}finally{this._debug("#_acquireLock","lock released for storage key",this.storageKey),this.lockAcquired=!1}}))}finally{this._debug("#_acquireLock","end")}}async _useSession(e){this._debug("#_useSession","begin");try{const t=await this.__loadSession();return await e(t)}finally{this._debug("#_useSession","end")}}async __loadSession(){this._debug("#__loadSession()","begin"),this.lockAcquired||this._debug("#__loadSession()","used outside of an acquired lock!",(new Error).stack);try{let e=null;const t=await M(this.storage,this.storageKey);if(this._debug("#getSession()","session from storage",t),null!==t&&(this._isValidSession(t)?e=t:(this._debug("#getSession()","session from storage is not valid"),await this._removeSession())),!e)return{data:{session:null},error:null};const r=!!e.expires_at&&1e3*e.expires_at-Date.now()<9e4;if(this._debug("#__loadSession()",`session has${r?"":" not"} expired`,"expires_at",e.expires_at),!r){if(this.storage.isServer){let t=this.suppressGetSessionWarning;e=new Proxy(e,{get:(e,r,s)=>(t||"user"!==r||(console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."),t=!0,this.suppressGetSessionWarning=!0),Reflect.get(e,r,s))})}return{data:{session:e},error:null}}const{session:s,error:i}=await this._callRefreshToken(e.refresh_token);return i?{data:{session:null},error:i}:{data:{session:s},error:null}}finally{this._debug("#__loadSession()","end")}}async getUser(e){return e?await this._getUser(e):(await this.initializePromise,await this._acquireLock(-1,(async()=>await this._getUser())))}async _getUser(e){try{return e?await Y(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:e,xform:Z}):await this._useSession((async e=>{var t,r,s;const{data:i,error:n}=e;if(n)throw n;return(null===(t=i.session)||void 0===t?void 0:t.access_token)||this.hasCustomAuthorizationHeader?await Y(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:null!==(s=null===(r=i.session)||void 0===r?void 0:r.access_token)&&void 0!==s?s:void 0,xform:Z}):{data:{user:null},error:new g}}))}catch(e){if(h(e))return v(e)&&(await this._removeSession(),await B(this.storage,`${this.storageKey}-code-verifier`)),{data:{user:null},error:e};throw e}}async updateUser(e,t={}){return await this.initializePromise,await this._acquireLock(-1,(async()=>await this._updateUser(e,t)))}async _updateUser(e,t={}){try{return await this._useSession((async r=>{const{data:s,error:i}=r;if(i)throw i;if(!s.session)throw new g;const n=s.session;let o=null,a=null;"pkce"===this.flowType&&null!=e.email&&([o,a]=await z(this.storage,this.storageKey));const{data:c,error:l}=await Y(this.fetch,"PUT",`${this.url}/user`,{headers:this.headers,redirectTo:null==t?void 0:t.emailRedirectTo,body:Object.assign(Object.assign({},e),{code_challenge:o,code_challenge_method:a}),jwt:n.access_token,xform:Z});if(l)throw l;return n.user=c.user,await this._saveSession(n),await this._notifyAllSubscribers("USER_UPDATED",n),{data:{user:n.user},error:null}}))}catch(e){if(h(e))return{data:{user:null},error:e};throw e}}async setSession(e){return await this.initializePromise,await this._acquireLock(-1,(async()=>await this._setSession(e)))}async _setSession(e){try{if(!e.access_token||!e.refresh_token)throw new g;const t=Date.now()/1e3;let r=t,s=!0,i=null;const{payload:n}=J(e.access_token);if(n.exp&&(r=n.exp,s=r<=t),s){const{session:t,error:r}=await this._callRefreshToken(e.refresh_token);if(r)return{data:{user:null,session:null},error:r};if(!t)return{data:{user:null,session:null},error:null};i=t}else{const{data:s,error:n}=await this._getUser(e.access_token);if(n)throw n;i={access_token:e.access_token,refresh_token:e.refresh_token,user:s.user,token_type:"bearer",expires_in:r-t,expires_at:r},await this._saveSession(i),await this._notifyAllSubscribers("SIGNED_IN",i)}return{data:{user:i.user,session:i},error:null}}catch(e){if(h(e))return{data:{session:null,user:null},error:e};throw e}}async refreshSession(e){return await this.initializePromise,await this._acquireLock(-1,(async()=>await this._refreshSession(e)))}async _refreshSession(e){try{return await this._useSession((async t=>{var r;if(!e){const{data:s,error:i}=t;if(i)throw i;e=null!==(r=s.session)&&void 0!==r?r:void 0}if(!(null==e?void 0:e.refresh_token))throw new g;const{session:s,error:i}=await this._callRefreshToken(e.refresh_token);return i?{data:{user:null,session:null},error:i}:s?{data:{user:s.user,session:s},error:null}:{data:{user:null,session:null},error:null}}))}catch(e){if(h(e))return{data:{user:null,session:null},error:e};throw e}}async _getSessionFromURL(e,t){try{if(!I())throw new _("No browser detected.");if(e.error||e.error_description||e.error_code)throw new _(e.error_description||"Error in URL with unspecified error_description",{error:e.error||"unspecified_error",code:e.error_code||"unspecified_code"});switch(t){case"implicit":if("pkce"===this.flowType)throw new b("Not a valid PKCE flow url.");break;case"pkce":if("implicit"===this.flowType)throw new _("Not a valid implicit grant flow url.")}if("pkce"===t){if(this._debug("#_initialize()","begin","is PKCE flow",!0),!e.code)throw new b("No code detected.");const{data:t,error:r}=await this._exchangeCodeForSession(e.code);if(r)throw r;const s=new URL(window.location.href);return s.searchParams.delete("code"),window.history.replaceState(window.history.state,"",s.toString()),{data:{session:t.session,redirectType:null},error:null}}const{provider_token:r,provider_refresh_token:s,access_token:n,refresh_token:o,expires_in:a,expires_at:c,token_type:l}=e;if(!(n&&a&&o&&l))throw new _("No session defined in URL");const h=Math.round(Date.now()/1e3),u=parseInt(a);let d=h+u;c&&(d=parseInt(c));const f=d-h;1e3*f<=i&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${f}s, should have been closer to ${u}s`);const p=d-u;h-p>=120?console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale",p,d,h):h-p<0&&console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew",p,d,h);const{data:g,error:v}=await this._getUser(n);if(v)throw v;const y={provider_token:r,provider_refresh_token:s,access_token:n,expires_in:u,expires_at:d,refresh_token:o,token_type:l,user:g.user};return window.location.hash="",this._debug("#_getSessionFromURL()","clearing window.location.hash"),{data:{session:y,redirectType:e.type},error:null}}catch(e){if(h(e))return{data:{session:null,redirectType:null},error:e};throw e}}_isImplicitGrantCallback(e){return Boolean(e.access_token||e.error_description)}async _isPKCECallback(e){const t=await M(this.storage,`${this.storageKey}-code-verifier`);return!(!e.code||!t)}async signOut(e={scope:"global"}){return await this.initializePromise,await this._acquireLock(-1,(async()=>await this._signOut(e)))}async _signOut({scope:e}={scope:"global"}){return await this._useSession((async t=>{var r;const{data:s,error:i}=t;if(i)return{error:i};const n=null===(r=s.session)||void 0===r?void 0:r.access_token;if(n){const{error:t}=await this.admin.signOut(n,e);if(t&&(!d(t)||404!==t.status&&401!==t.status&&403!==t.status))return{error:t}}return"others"!==e&&(await this._removeSession(),await B(this.storage,`${this.storageKey}-code-verifier`)),{error:null}}))}onAuthStateChange(e){const t="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){const t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)})),r={id:t,callback:e,unsubscribe:()=>{this._debug("#unsubscribe()","state change callback with id removed",t),this.stateChangeEmitters.delete(t)}};return this._debug("#onAuthStateChange()","registered callback with id",t),this.stateChangeEmitters.set(t,r),(async()=>{await this.initializePromise,await this._acquireLock(-1,(async()=>{this._emitInitialSession(t)}))})(),{data:{subscription:r}}}async _emitInitialSession(e){return await this._useSession((async t=>{var r,s;try{const{data:{session:s},error:i}=t;if(i)throw i;await(null===(r=this.stateChangeEmitters.get(e))||void 0===r?void 0:r.callback("INITIAL_SESSION",s)),this._debug("INITIAL_SESSION","callback id",e,"session",s)}catch(t){await(null===(s=this.stateChangeEmitters.get(e))||void 0===s?void 0:s.callback("INITIAL_SESSION",null)),this._debug("INITIAL_SESSION","callback id",e,"error",t),console.error(t)}}))}async resetPasswordForEmail(e,t={}){let r=null,s=null;"pkce"===this.flowType&&([r,s]=await z(this.storage,this.storageKey,!0));try{return await Y(this.fetch,"POST",`${this.url}/recover`,{body:{email:e,code_challenge:r,code_challenge_method:s,gotrue_meta_security:{captcha_token:t.captchaToken}},headers:this.headers,redirectTo:t.redirectTo})}catch(e){if(h(e))return{data:null,error:e};throw e}}async getUserIdentities(){var e;try{const{data:t,error:r}=await this.getUser();if(r)throw r;return{data:{identities:null!==(e=t.user.identities)&&void 0!==e?e:[]},error:null}}catch(e){if(h(e))return{data:null,error:e};throw e}}async linkIdentity(e){var t;try{const{data:r,error:s}=await this._useSession((async t=>{var r,s,i,n,o;const{data:a,error:c}=t;if(c)throw c;const l=await this._getUrlForProvider(`${this.url}/user/identities/authorize`,e.provider,{redirectTo:null===(r=e.options)||void 0===r?void 0:r.redirectTo,scopes:null===(s=e.options)||void 0===s?void 0:s.scopes,queryParams:null===(i=e.options)||void 0===i?void 0:i.queryParams,skipBrowserRedirect:!0});return await Y(this.fetch,"GET",l,{headers:this.headers,jwt:null!==(o=null===(n=a.session)||void 0===n?void 0:n.access_token)&&void 0!==o?o:void 0})}));if(s)throw s;return I()&&!(null===(t=e.options)||void 0===t?void 0:t.skipBrowserRedirect)&&window.location.assign(null==r?void 0:r.url),{data:{provider:e.provider,url:null==r?void 0:r.url},error:null}}catch(t){if(h(t))return{data:{provider:e.provider,url:null},error:t};throw t}}async unlinkIdentity(e){try{return await this._useSession((async t=>{var r,s;const{data:i,error:n}=t;if(n)throw n;return await Y(this.fetch,"DELETE",`${this.url}/user/identities/${e.identity_id}`,{headers:this.headers,jwt:null!==(s=null===(r=i.session)||void 0===r?void 0:r.access_token)&&void 0!==s?s:void 0})}))}catch(e){if(h(e))return{data:null,error:e};throw e}}async _refreshAccessToken(e){const t=`#_refreshAccessToken(${e.substring(0,5)}...)`;this._debug(t,"begin");try{const n=Date.now();return await(r=async r=>(r>0&&await async function(e){return await new Promise((t=>{setTimeout((()=>t(null)),e)}))}(200*Math.pow(2,r-1)),this._debug(t,"refreshing attempt",r),await Y(this.fetch,"POST",`${this.url}/token?grant_type=refresh_token`,{body:{refresh_token:e},headers:this.headers,xform:Q})),s=(e,t)=>{const r=200*Math.pow(2,e);return t&&T(t)&&Date.now()+r-n<i},new Promise(((e,t)=>{(async()=>{for(let i=0;i<1/0;i++)try{const t=await r(i);if(!s(i,null))return void e(t)}catch(e){if(!s(i,e))return void t(e)}})()})))}catch(e){if(this._debug(t,"error",e),h(e))return{data:{session:null,user:null},error:e};throw e}finally{this._debug(t,"end")}var r,s}_isValidSession(e){return"object"==typeof e&&null!==e&&"access_token"in e&&"refresh_token"in e&&"expires_at"in e}async _handleProviderSignIn(e,t){const r=await this._getUrlForProvider(`${this.url}/authorize`,e,{redirectTo:t.redirectTo,scopes:t.scopes,queryParams:t.queryParams});return this._debug("#_handleProviderSignIn()","provider",e,"options",t,"url",r),I()&&!t.skipBrowserRedirect&&window.location.assign(r),{data:{provider:e,url:r},error:null}}async _recoverAndRefresh(){var e;const t="#_recoverAndRefresh()";this._debug(t,"begin");try{const r=await M(this.storage,this.storageKey);if(this._debug(t,"session from storage",r),!this._isValidSession(r))return this._debug(t,"session is not valid"),void(null!==r&&await this._removeSession());const s=1e3*(null!==(e=r.expires_at)&&void 0!==e?e:1/0)-Date.now()<9e4;if(this._debug(t,`session has${s?"":" not"} expired with margin of 90000s`),s){if(this.autoRefreshToken&&r.refresh_token){const{error:e}=await this._callRefreshToken(r.refresh_token);e&&(console.error(e),T(e)||(this._debug(t,"refresh failed with a non-retryable error, removing the session",e),await this._removeSession()))}}else await this._notifyAllSubscribers("SIGNED_IN",r)}catch(e){return this._debug(t,"error",e),void console.error(e)}finally{this._debug(t,"end")}}async _callRefreshToken(e){var t,r;if(!e)throw new g;if(this.refreshingDeferred)return this.refreshingDeferred.promise;const s=`#_callRefreshToken(${e.substring(0,5)}...)`;this._debug(s,"begin");try{this.refreshingDeferred=new q;const{data:t,error:r}=await this._refreshAccessToken(e);if(r)throw r;if(!t.session)throw new g;await this._saveSession(t.session),await this._notifyAllSubscribers("TOKEN_REFRESHED",t.session);const s={session:t.session,error:null};return this.refreshingDeferred.resolve(s),s}catch(e){if(this._debug(s,"error",e),h(e)){const r={session:null,error:e};return T(e)||await this._removeSession(),null===(t=this.refreshingDeferred)||void 0===t||t.resolve(r),r}throw null===(r=this.refreshingDeferred)||void 0===r||r.reject(e),e}finally{this.refreshingDeferred=null,this._debug(s,"end")}}async _notifyAllSubscribers(e,t,r=!0){const s=`#_notifyAllSubscribers(${e})`;this._debug(s,"begin",t,`broadcast = ${r}`);try{this.broadcastChannel&&r&&this.broadcastChannel.postMessage({event:e,session:t});const s=[],i=Array.from(this.stateChangeEmitters.values()).map((async r=>{try{await r.callback(e,t)}catch(e){s.push(e)}}));if(await Promise.all(i),s.length>0){for(let e=0;e<s.length;e+=1)console.error(s[e]);throw s[0]}}finally{this._debug(s,"end")}}async _saveSession(e){this._debug("#_saveSession()",e),this.suppressGetSessionWarning=!0,await F(this.storage,this.storageKey,e)}async _removeSession(){this._debug("#_removeSession()"),await B(this.storage,this.storageKey),await this._notifyAllSubscribers("SIGNED_OUT",null)}_removeVisibilityChangedCallback(){this._debug("#_removeVisibilityChangedCallback()");const e=this.visibilityChangedCallback;this.visibilityChangedCallback=null;try{e&&I()&&(null===window||void 0===window?void 0:window.removeEventListener)&&window.removeEventListener("visibilitychange",e)}catch(e){console.error("removing visibilitychange callback failed",e)}}async _startAutoRefresh(){await this._stopAutoRefresh(),this._debug("#_startAutoRefresh()");const e=setInterval((()=>this._autoRefreshTokenTick()),i);this.autoRefreshTicker=e,e&&"object"==typeof e&&"function"==typeof e.unref?e.unref():"undefined"!=typeof Deno&&"function"==typeof Deno.unrefTimer&&Deno.unrefTimer(e),setTimeout((async()=>{await this.initializePromise,await this._autoRefreshTokenTick()}),0)}async _stopAutoRefresh(){this._debug("#_stopAutoRefresh()");const e=this.autoRefreshTicker;this.autoRefreshTicker=null,e&&clearInterval(e)}async startAutoRefresh(){this._removeVisibilityChangedCallback(),await this._startAutoRefresh()}async stopAutoRefresh(){this._removeVisibilityChangedCallback(),await this._stopAutoRefresh()}async _autoRefreshTokenTick(){this._debug("#_autoRefreshTokenTick()","begin");try{await this._acquireLock(0,(async()=>{try{const e=Date.now();try{return await this._useSession((async t=>{const{data:{session:r}}=t;if(!r||!r.refresh_token||!r.expires_at)return void this._debug("#_autoRefreshTokenTick()","no session");const s=Math.floor((1e3*r.expires_at-e)/i);this._debug("#_autoRefreshTokenTick()",`access token expires in ${s} ticks, a tick lasts 30000ms, refresh threshold is 3 ticks`),s<=3&&await this._callRefreshToken(r.refresh_token)}))}catch(e){console.error("Auto refresh tick failed with error. This is likely a transient error.",e)}}finally{this._debug("#_autoRefreshTokenTick()","end")}}))}catch(e){if(!(e.isAcquireTimeout||e instanceof ae))throw e;this._debug("auto refresh token tick lock not available")}}async _handleVisibilityChange(){if(this._debug("#_handleVisibilityChange()"),!I()||!(null===window||void 0===window?void 0:window.addEventListener))return this.autoRefreshToken&&this.startAutoRefresh(),!1;try{this.visibilityChangedCallback=async()=>await this._onVisibilityChanged(!1),null===window||void 0===window||window.addEventListener("visibilitychange",this.visibilityChangedCallback),await this._onVisibilityChanged(!0)}catch(e){console.error("_handleVisibilityChange",e)}}async _onVisibilityChanged(e){const t=`#_onVisibilityChanged(${e})`;this._debug(t,"visibilityState",document.visibilityState),"visible"===document.visibilityState?(this.autoRefreshToken&&this._startAutoRefresh(),e||(await this.initializePromise,await this._acquireLock(-1,(async()=>{"visible"===document.visibilityState?await this._recoverAndRefresh():this._debug(t,"acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting")})))):"hidden"===document.visibilityState&&this.autoRefreshToken&&this._stopAutoRefresh()}async _getUrlForProvider(e,t,r){const s=[`provider=${encodeURIComponent(t)}`];if((null==r?void 0:r.redirectTo)&&s.push(`redirect_to=${encodeURIComponent(r.redirectTo)}`),(null==r?void 0:r.scopes)&&s.push(`scopes=${encodeURIComponent(r.scopes)}`),"pkce"===this.flowType){const[e,t]=await z(this.storage,this.storageKey),r=new URLSearchParams({code_challenge:`${encodeURIComponent(e)}`,code_challenge_method:`${encodeURIComponent(t)}`});s.push(r.toString())}if(null==r?void 0:r.queryParams){const e=new URLSearchParams(r.queryParams);s.push(e.toString())}return(null==r?void 0:r.skipBrowserRedirect)&&s.push(`skip_http_redirect=${r.skipBrowserRedirect}`),`${e}?${s.join("&")}`}async _unenroll(e){try{return await this._useSession((async t=>{var r;const{data:s,error:i}=t;return i?{data:null,error:i}:await Y(this.fetch,"DELETE",`${this.url}/factors/${e.factorId}`,{headers:this.headers,jwt:null===(r=null==s?void 0:s.session)||void 0===r?void 0:r.access_token})}))}catch(e){if(h(e))return{data:null,error:e};throw e}}async _enroll(e){try{return await this._useSession((async t=>{var r,s;const{data:i,error:n}=t;if(n)return{data:null,error:n};const o=Object.assign({friendly_name:e.friendlyName,factor_type:e.factorType},"phone"===e.factorType?{phone:e.phone}:{issuer:e.issuer}),{data:a,error:c}=await Y(this.fetch,"POST",`${this.url}/factors`,{body:o,headers:this.headers,jwt:null===(r=null==i?void 0:i.session)||void 0===r?void 0:r.access_token});return c?{data:null,error:c}:("totp"===e.factorType&&(null===(s=null==a?void 0:a.totp)||void 0===s?void 0:s.qr_code)&&(a.totp.qr_code=`data:image/svg+xml;utf-8,${a.totp.qr_code}`),{data:a,error:null})}))}catch(e){if(h(e))return{data:null,error:e};throw e}}async _verify(e){return this._acquireLock(-1,(async()=>{try{return await this._useSession((async t=>{var r;const{data:s,error:i}=t;if(i)return{data:null,error:i};const{data:n,error:o}=await Y(this.fetch,"POST",`${this.url}/factors/${e.factorId}/verify`,{body:{code:e.code,challenge_id:e.challengeId},headers:this.headers,jwt:null===(r=null==s?void 0:s.session)||void 0===r?void 0:r.access_token});return o?{data:null,error:o}:(await this._saveSession(Object.assign({expires_at:Math.round(Date.now()/1e3)+n.expires_in},n)),await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED",n),{data:n,error:o})}))}catch(e){if(h(e))return{data:null,error:e};throw e}}))}async _challenge(e){return this._acquireLock(-1,(async()=>{try{return await this._useSession((async t=>{var r;const{data:s,error:i}=t;return i?{data:null,error:i}:await Y(this.fetch,"POST",`${this.url}/factors/${e.factorId}/challenge`,{body:{channel:e.channel},headers:this.headers,jwt:null===(r=null==s?void 0:s.session)||void 0===r?void 0:r.access_token})}))}catch(e){if(h(e))return{data:null,error:e};throw e}}))}async _challengeAndVerify(e){const{data:t,error:r}=await this._challenge({factorId:e.factorId});return r?{data:null,error:r}:await this._verify({factorId:e.factorId,challengeId:t.id,code:e.code})}async _listFactors(){const{data:{user:e},error:t}=await this.getUser();if(t)return{data:null,error:t};const r=(null==e?void 0:e.factors)||[],s=r.filter((e=>"totp"===e.factor_type&&"verified"===e.status)),i=r.filter((e=>"phone"===e.factor_type&&"verified"===e.status));return{data:{all:r,totp:s,phone:i},error:null}}async _getAuthenticatorAssuranceLevel(){return this._acquireLock(-1,(async()=>await this._useSession((async e=>{var t,r;const{data:{session:s},error:i}=e;if(i)return{data:null,error:i};if(!s)return{data:{currentLevel:null,nextLevel:null,currentAuthenticationMethods:[]},error:null};const{payload:n}=J(s.access_token);let o=null;n.aal&&(o=n.aal);let a=o;return(null!==(r=null===(t=s.user.factors)||void 0===t?void 0:t.filter((e=>"verified"===e.status)))&&void 0!==r?r:[]).length>0&&(a="aal2"),{data:{currentLevel:o,nextLevel:a,currentAuthenticationMethods:n.amr||[]},error:null}}))))}async fetchJwk(e,t={keys:[]}){let r=t.keys.find((t=>t.kid===e));if(r)return r;if(r=this.jwks.keys.find((t=>t.kid===e)),r&&this.jwks_cached_at+6e5>Date.now())return r;const{data:s,error:i}=await Y(this.fetch,"GET",`${this.url}/.well-known/jwks.json`,{headers:this.headers});if(i)throw i;if(!s.keys||0===s.keys.length)throw new j("JWKS is empty");if(this.jwks=s,this.jwks_cached_at=Date.now(),r=s.keys.find((t=>t.kid===e)),!r)throw new j("No matching signing key found in JWKS");return r}async getClaims(e,t={keys:[]}){try{let r=e;if(!r){const{data:e,error:t}=await this.getSession();if(t||!e.session)return{data:null,error:t};r=e.session.access_token}const{header:s,payload:i,signature:n,raw:{header:o,payload:a}}=J(r);if(function(e){if(!e)throw new Error("Missing exp claim");if(e<=Math.floor(Date.now()/1e3))throw new Error("JWT has expired")}(i.exp),!s.kid||"HS256"===s.alg||!("crypto"in globalThis)||!("subtle"in globalThis.crypto)){const{error:e}=await this.getUser(r);if(e)throw e;return{data:{claims:i,header:s,signature:n},error:null}}const c=function(e){switch(e){case"RS256":return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-256"}};case"ES256":return{name:"ECDSA",namedCurve:"P-256",hash:{name:"SHA-256"}};default:throw new Error("Invalid alg claim")}}(s.alg),l=await this.fetchJwk(s.kid,t),h=await crypto.subtle.importKey("jwk",l,c,!0,["verify"]);if(!await crypto.subtle.verify(c,h,n,function(e){const t=[];return function(e,t){for(let r=0;r<e.length;r+=1){let s=e.charCodeAt(r);if(s>55295&&s<=56319){const t=1024*(s-55296)&65535;s=65536+(e.charCodeAt(r+1)-56320&65535|t),r+=1}x(s,t)}}(e,(e=>t.push(e))),new Uint8Array(t)}(`${o}.${a}`)))throw new j("Invalid JWT signature");return{data:{claims:i,header:s,signature:n},error:null}}catch(e){if(h(e))return{data:null,error:e};throw e}}}de.nextInstanceID=0;const fe=se,pe=de},227:(e,t,r)=>{r.r(t),r.d(t,{FunctionRegion:()=>a,FunctionsClient:()=>c,FunctionsError:()=>s,FunctionsFetchError:()=>i,FunctionsHttpError:()=>o,FunctionsRelayError:()=>n});class s extends Error{constructor(e,t="FunctionsError",r){super(e),this.name=t,this.context=r}}class i extends s{constructor(e){super("Failed to send a request to the Edge Function","FunctionsFetchError",e)}}class n extends s{constructor(e){super("Relay Error invoking the Edge Function","FunctionsRelayError",e)}}class o extends s{constructor(e){super("Edge Function returned a non-2xx status code","FunctionsHttpError",e)}}var a;!function(e){e.Any="any",e.ApNortheast1="ap-northeast-1",e.ApNortheast2="ap-northeast-2",e.ApSouth1="ap-south-1",e.ApSoutheast1="ap-southeast-1",e.ApSoutheast2="ap-southeast-2",e.CaCentral1="ca-central-1",e.EuCentral1="eu-central-1",e.EuWest1="eu-west-1",e.EuWest2="eu-west-2",e.EuWest3="eu-west-3",e.SaEast1="sa-east-1",e.UsEast1="us-east-1",e.UsWest1="us-west-1",e.UsWest2="us-west-2"}(a||(a={}));class c{constructor(e,{headers:t={},customFetch:s,region:i=a.Any}={}){this.url=e,this.headers=t,this.region=i,this.fetch=(e=>{let t;return t=e||("undefined"==typeof fetch?(...e)=>Promise.resolve().then(r.bind(r,907)).then((({default:t})=>t(...e))):fetch),(...e)=>t(...e)})(s)}setAuth(e){this.headers.Authorization=`Bearer ${e}`}invoke(e,t={}){var r,s,a,c,l;return s=this,a=void 0,l=function*(){try{const{headers:s,method:a,body:c}=t;let l,h={},{region:u}=t;u||(u=this.region),u&&"any"!==u&&(h["x-region"]=u),c&&(s&&!Object.prototype.hasOwnProperty.call(s,"Content-Type")||!s)&&("undefined"!=typeof Blob&&c instanceof Blob||c instanceof ArrayBuffer?(h["Content-Type"]="application/octet-stream",l=c):"string"==typeof c?(h["Content-Type"]="text/plain",l=c):"undefined"!=typeof FormData&&c instanceof FormData?l=c:(h["Content-Type"]="application/json",l=JSON.stringify(c)));const d=yield this.fetch(`${this.url}/${e}`,{method:a||"POST",headers:Object.assign(Object.assign(Object.assign({},h),this.headers),s),body:l}).catch((e=>{throw new i(e)})),f=d.headers.get("x-relay-error");if(f&&"true"===f)throw new n(d);if(!d.ok)throw new o(d);let p,g=(null!==(r=d.headers.get("Content-Type"))&&void 0!==r?r:"text/plain").split(";")[0].trim();return p="application/json"===g?yield d.json():"application/octet-stream"===g?yield d.blob():"text/event-stream"===g?d:"multipart/form-data"===g?yield d.formData():yield d.text(),{data:p,error:null}}catch(e){return{data:null,error:e}}},new((c=void 0)||(c=Promise))((function(e,t){function r(e){try{n(l.next(e))}catch(e){t(e)}}function i(e){try{n(l.throw(e))}catch(e){t(e)}}function n(t){var s;t.done?e(t.value):(s=t.value,s instanceof c?s:new c((function(e){e(s)}))).then(r,i)}n((l=l.apply(s,a||[])).next())}))}}},907:(e,t,r)=>{r.r(t),r.d(t,{Headers:()=>o,Request:()=>a,Response:()=>c,default:()=>n,fetch:()=>i});var s=function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if(void 0!==r.g)return r.g;throw new Error("unable to locate global object")}();const i=s.fetch,n=s.fetch.bind(s),o=s.Headers,a=s.Request,c=s.Response},660:function(e,t,r){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=s(r(907)),n=s(r(818));t.default=class{constructor(e){this.shouldThrowOnError=!1,this.method=e.method,this.url=e.url,this.headers=e.headers,this.schema=e.schema,this.body=e.body,this.shouldThrowOnError=e.shouldThrowOnError,this.signal=e.signal,this.isMaybeSingle=e.isMaybeSingle,e.fetch?this.fetch=e.fetch:"undefined"==typeof fetch?this.fetch=i.default:this.fetch=fetch}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(e,t){return this.headers=Object.assign({},this.headers),this.headers[e]=t,this}then(e,t){void 0===this.schema||(["GET","HEAD"].includes(this.method)?this.headers["Accept-Profile"]=this.schema:this.headers["Content-Profile"]=this.schema),"GET"!==this.method&&"HEAD"!==this.method&&(this.headers["Content-Type"]="application/json");let r=(0,this.fetch)(this.url.toString(),{method:this.method,headers:this.headers,body:JSON.stringify(this.body),signal:this.signal}).then((async e=>{var t,r,s;let i=null,o=null,a=null,c=e.status,l=e.statusText;if(e.ok){if("HEAD"!==this.method){const t=await e.text();""===t||(o="text/csv"===this.headers.Accept||this.headers.Accept&&this.headers.Accept.includes("application/vnd.pgrst.plan+text")?t:JSON.parse(t))}const s=null===(t=this.headers.Prefer)||void 0===t?void 0:t.match(/count=(exact|planned|estimated)/),n=null===(r=e.headers.get("content-range"))||void 0===r?void 0:r.split("/");s&&n&&n.length>1&&(a=parseInt(n[1])),this.isMaybeSingle&&"GET"===this.method&&Array.isArray(o)&&(o.length>1?(i={code:"PGRST116",details:`Results contain ${o.length} rows, application/vnd.pgrst.object+json requires 1 row`,hint:null,message:"JSON object requested, multiple (or no) rows returned"},o=null,a=null,c=406,l="Not Acceptable"):o=1===o.length?o[0]:null)}else{const t=await e.text();try{i=JSON.parse(t),Array.isArray(i)&&404===e.status&&(o=[],i=null,c=200,l="OK")}catch(r){404===e.status&&""===t?(c=204,l="No Content"):i={message:t}}if(i&&this.isMaybeSingle&&(null===(s=null==i?void 0:i.details)||void 0===s?void 0:s.includes("0 rows"))&&(i=null,c=200,l="OK"),i&&this.shouldThrowOnError)throw new n.default(i)}return{error:i,data:o,count:a,status:c,statusText:l}}));return this.shouldThrowOnError||(r=r.catch((e=>{var t,r,s;return{error:{message:`${null!==(t=null==e?void 0:e.name)&&void 0!==t?t:"FetchError"}: ${null==e?void 0:e.message}`,details:`${null!==(r=null==e?void 0:e.stack)&&void 0!==r?r:""}`,hint:"",code:`${null!==(s=null==e?void 0:e.code)&&void 0!==s?s:""}`},data:null,count:null,status:0,statusText:""}}))),r.then(e,t)}returns(){return this}overrideTypes(){return this}}},961:function(e,t,r){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=s(r(45)),n=s(r(825)),o=r(530);class a{constructor(e,{headers:t={},schema:r,fetch:s}={}){this.url=e,this.headers=Object.assign(Object.assign({},o.DEFAULT_HEADERS),t),this.schemaName=r,this.fetch=s}from(e){const t=new URL(`${this.url}/${e}`);return new i.default(t,{headers:Object.assign({},this.headers),schema:this.schemaName,fetch:this.fetch})}schema(e){return new a(this.url,{headers:this.headers,schema:e,fetch:this.fetch})}rpc(e,t={},{head:r=!1,get:s=!1,count:i}={}){let o;const a=new URL(`${this.url}/rpc/${e}`);let c;r||s?(o=r?"HEAD":"GET",Object.entries(t).filter((([e,t])=>void 0!==t)).map((([e,t])=>[e,Array.isArray(t)?`{${t.join(",")}}`:`${t}`])).forEach((([e,t])=>{a.searchParams.append(e,t)}))):(o="POST",c=t);const l=Object.assign({},this.headers);return i&&(l.Prefer=`count=${i}`),new n.default({method:o,url:a,headers:l,schema:this.schemaName,body:c,fetch:this.fetch,allowEmpty:!1})}}t.default=a},818:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});class r extends Error{constructor(e){super(e.message),this.name="PostgrestError",this.details=e.details,this.hint=e.hint,this.code=e.code}}t.default=r},825:function(e,t,r){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=s(r(261));class n extends i.default{eq(e,t){return this.url.searchParams.append(e,`eq.${t}`),this}neq(e,t){return this.url.searchParams.append(e,`neq.${t}`),this}gt(e,t){return this.url.searchParams.append(e,`gt.${t}`),this}gte(e,t){return this.url.searchParams.append(e,`gte.${t}`),this}lt(e,t){return this.url.searchParams.append(e,`lt.${t}`),this}lte(e,t){return this.url.searchParams.append(e,`lte.${t}`),this}like(e,t){return this.url.searchParams.append(e,`like.${t}`),this}likeAllOf(e,t){return this.url.searchParams.append(e,`like(all).{${t.join(",")}}`),this}likeAnyOf(e,t){return this.url.searchParams.append(e,`like(any).{${t.join(",")}}`),this}ilike(e,t){return this.url.searchParams.append(e,`ilike.${t}`),this}ilikeAllOf(e,t){return this.url.searchParams.append(e,`ilike(all).{${t.join(",")}}`),this}ilikeAnyOf(e,t){return this.url.searchParams.append(e,`ilike(any).{${t.join(",")}}`),this}is(e,t){return this.url.searchParams.append(e,`is.${t}`),this}in(e,t){const r=Array.from(new Set(t)).map((e=>"string"==typeof e&&new RegExp("[,()]").test(e)?`"${e}"`:`${e}`)).join(",");return this.url.searchParams.append(e,`in.(${r})`),this}contains(e,t){return"string"==typeof t?this.url.searchParams.append(e,`cs.${t}`):Array.isArray(t)?this.url.searchParams.append(e,`cs.{${t.join(",")}}`):this.url.searchParams.append(e,`cs.${JSON.stringify(t)}`),this}containedBy(e,t){return"string"==typeof t?this.url.searchParams.append(e,`cd.${t}`):Array.isArray(t)?this.url.searchParams.append(e,`cd.{${t.join(",")}}`):this.url.searchParams.append(e,`cd.${JSON.stringify(t)}`),this}rangeGt(e,t){return this.url.searchParams.append(e,`sr.${t}`),this}rangeGte(e,t){return this.url.searchParams.append(e,`nxl.${t}`),this}rangeLt(e,t){return this.url.searchParams.append(e,`sl.${t}`),this}rangeLte(e,t){return this.url.searchParams.append(e,`nxr.${t}`),this}rangeAdjacent(e,t){return this.url.searchParams.append(e,`adj.${t}`),this}overlaps(e,t){return"string"==typeof t?this.url.searchParams.append(e,`ov.${t}`):this.url.searchParams.append(e,`ov.{${t.join(",")}}`),this}textSearch(e,t,{config:r,type:s}={}){let i="";"plain"===s?i="pl":"phrase"===s?i="ph":"websearch"===s&&(i="w");const n=void 0===r?"":`(${r})`;return this.url.searchParams.append(e,`${i}fts${n}.${t}`),this}match(e){return Object.entries(e).forEach((([e,t])=>{this.url.searchParams.append(e,`eq.${t}`)})),this}not(e,t,r){return this.url.searchParams.append(e,`not.${t}.${r}`),this}or(e,{foreignTable:t,referencedTable:r=t}={}){const s=r?`${r}.or`:"or";return this.url.searchParams.append(s,`(${e})`),this}filter(e,t,r){return this.url.searchParams.append(e,`${t}.${r}`),this}}t.default=n},45:function(e,t,r){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=s(r(825));t.default=class{constructor(e,{headers:t={},schema:r,fetch:s}){this.url=e,this.headers=t,this.schema=r,this.fetch=s}select(e,{head:t=!1,count:r}={}){const s=t?"HEAD":"GET";let n=!1;const o=(null!=e?e:"*").split("").map((e=>/\s/.test(e)&&!n?"":('"'===e&&(n=!n),e))).join("");return this.url.searchParams.set("select",o),r&&(this.headers.Prefer=`count=${r}`),new i.default({method:s,url:this.url,headers:this.headers,schema:this.schema,fetch:this.fetch,allowEmpty:!1})}insert(e,{count:t,defaultToNull:r=!0}={}){const s=[];if(this.headers.Prefer&&s.push(this.headers.Prefer),t&&s.push(`count=${t}`),r||s.push("missing=default"),this.headers.Prefer=s.join(","),Array.isArray(e)){const t=e.reduce(((e,t)=>e.concat(Object.keys(t))),[]);if(t.length>0){const e=[...new Set(t)].map((e=>`"${e}"`));this.url.searchParams.set("columns",e.join(","))}}return new i.default({method:"POST",url:this.url,headers:this.headers,schema:this.schema,body:e,fetch:this.fetch,allowEmpty:!1})}upsert(e,{onConflict:t,ignoreDuplicates:r=!1,count:s,defaultToNull:n=!0}={}){const o=[`resolution=${r?"ignore":"merge"}-duplicates`];if(void 0!==t&&this.url.searchParams.set("on_conflict",t),this.headers.Prefer&&o.push(this.headers.Prefer),s&&o.push(`count=${s}`),n||o.push("missing=default"),this.headers.Prefer=o.join(","),Array.isArray(e)){const t=e.reduce(((e,t)=>e.concat(Object.keys(t))),[]);if(t.length>0){const e=[...new Set(t)].map((e=>`"${e}"`));this.url.searchParams.set("columns",e.join(","))}}return new i.default({method:"POST",url:this.url,headers:this.headers,schema:this.schema,body:e,fetch:this.fetch,allowEmpty:!1})}update(e,{count:t}={}){const r=[];return this.headers.Prefer&&r.push(this.headers.Prefer),t&&r.push(`count=${t}`),this.headers.Prefer=r.join(","),new i.default({method:"PATCH",url:this.url,headers:this.headers,schema:this.schema,body:e,fetch:this.fetch,allowEmpty:!1})}delete({count:e}={}){const t=[];return e&&t.push(`count=${e}`),this.headers.Prefer&&t.unshift(this.headers.Prefer),this.headers.Prefer=t.join(","),new i.default({method:"DELETE",url:this.url,headers:this.headers,schema:this.schema,fetch:this.fetch,allowEmpty:!1})}}},261:function(e,t,r){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=s(r(660));class n extends i.default{select(e){let t=!1;const r=(null!=e?e:"*").split("").map((e=>/\s/.test(e)&&!t?"":('"'===e&&(t=!t),e))).join("");return this.url.searchParams.set("select",r),this.headers.Prefer&&(this.headers.Prefer+=","),this.headers.Prefer+="return=representation",this}order(e,{ascending:t=!0,nullsFirst:r,foreignTable:s,referencedTable:i=s}={}){const n=i?`${i}.order`:"order",o=this.url.searchParams.get(n);return this.url.searchParams.set(n,`${o?`${o},`:""}${e}.${t?"asc":"desc"}${void 0===r?"":r?".nullsfirst":".nullslast"}`),this}limit(e,{foreignTable:t,referencedTable:r=t}={}){const s=void 0===r?"limit":`${r}.limit`;return this.url.searchParams.set(s,`${e}`),this}range(e,t,{foreignTable:r,referencedTable:s=r}={}){const i=void 0===s?"offset":`${s}.offset`,n=void 0===s?"limit":`${s}.limit`;return this.url.searchParams.set(i,`${e}`),this.url.searchParams.set(n,""+(t-e+1)),this}abortSignal(e){return this.signal=e,this}single(){return this.headers.Accept="application/vnd.pgrst.object+json",this}maybeSingle(){return"GET"===this.method?this.headers.Accept="application/json":this.headers.Accept="application/vnd.pgrst.object+json",this.isMaybeSingle=!0,this}csv(){return this.headers.Accept="text/csv",this}geojson(){return this.headers.Accept="application/geo+json",this}explain({analyze:e=!1,verbose:t=!1,settings:r=!1,buffers:s=!1,wal:i=!1,format:n="text"}={}){var o;const a=[e?"analyze":null,t?"verbose":null,r?"settings":null,s?"buffers":null,i?"wal":null].filter(Boolean).join("|"),c=null!==(o=this.headers.Accept)&&void 0!==o?o:"application/json";return this.headers.Accept=`application/vnd.pgrst.plan+${n}; for="${c}"; options=${a};`,this}rollback(){var e;return(null!==(e=this.headers.Prefer)&&void 0!==e?e:"").trim().length>0?this.headers.Prefer+=",tx=rollback":this.headers.Prefer="tx=rollback",this}returns(){return this}}t.default=n},530:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.DEFAULT_HEADERS=void 0;const s=r(519);t.DEFAULT_HEADERS={"X-Client-Info":`postgrest-js/${s.version}`}},279:function(e,t,r){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.PostgrestError=t.PostgrestBuilder=t.PostgrestTransformBuilder=t.PostgrestFilterBuilder=t.PostgrestQueryBuilder=t.PostgrestClient=void 0;const i=s(r(961));t.PostgrestClient=i.default;const n=s(r(45));t.PostgrestQueryBuilder=n.default;const o=s(r(825));t.PostgrestFilterBuilder=o.default;const a=s(r(261));t.PostgrestTransformBuilder=a.default;const c=s(r(660));t.PostgrestBuilder=c.default;const l=s(r(818));t.PostgrestError=l.default,t.default={PostgrestClient:i.default,PostgrestQueryBuilder:n.default,PostgrestFilterBuilder:o.default,PostgrestTransformBuilder:a.default,PostgrestBuilder:c.default,PostgrestError:l.default}},519:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.version=void 0,t.version="2.49.8"},932:(e,t,r)=>{r.r(t),r.d(t,{REALTIME_CHANNEL_STATES:()=>P,REALTIME_LISTEN_TYPES:()=>E,REALTIME_POSTGRES_CHANGES_LISTEN_EVENT:()=>S,REALTIME_PRESENCE_LISTEN_EVENTS:()=>T,REALTIME_SUBSCRIBE_STATES:()=>j,RealtimeChannel:()=>A,RealtimeClient:()=>x,RealtimePresence:()=>O});const s={"X-Client-Info":"realtime-js/2.11.2"};var i,n,o,a,c,l;!function(e){e[e.connecting=0]="connecting",e[e.open=1]="open",e[e.closing=2]="closing",e[e.closed=3]="closed"}(i||(i={})),function(e){e.closed="closed",e.errored="errored",e.joined="joined",e.joining="joining",e.leaving="leaving"}(n||(n={})),function(e){e.close="phx_close",e.error="phx_error",e.join="phx_join",e.reply="phx_reply",e.leave="phx_leave",e.access_token="access_token"}(o||(o={})),function(e){e.websocket="websocket"}(a||(a={})),function(e){e.Connecting="connecting",e.Open="open",e.Closing="closing",e.Closed="closed"}(c||(c={}));class h{constructor(){this.HEADER_LENGTH=1}decode(e,t){return e.constructor===ArrayBuffer?t(this._binaryDecode(e)):t("string"==typeof e?JSON.parse(e):{})}_binaryDecode(e){const t=new DataView(e),r=new TextDecoder;return this._decodeBroadcast(e,t,r)}_decodeBroadcast(e,t,r){const s=t.getUint8(1),i=t.getUint8(2);let n=this.HEADER_LENGTH+2;const o=r.decode(e.slice(n,n+s));n+=s;const a=r.decode(e.slice(n,n+i));return n+=i,{ref:null,topic:o,event:a,payload:JSON.parse(r.decode(e.slice(n,e.byteLength)))}}}class u{constructor(e,t){this.callback=e,this.timerCalc=t,this.timer=void 0,this.tries=0,this.callback=e,this.timerCalc=t}reset(){this.tries=0,clearTimeout(this.timer)}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout((()=>{this.tries=this.tries+1,this.callback()}),this.timerCalc(this.tries+1))}}!function(e){e.abstime="abstime",e.bool="bool",e.date="date",e.daterange="daterange",e.float4="float4",e.float8="float8",e.int2="int2",e.int4="int4",e.int4range="int4range",e.int8="int8",e.int8range="int8range",e.json="json",e.jsonb="jsonb",e.money="money",e.numeric="numeric",e.oid="oid",e.reltime="reltime",e.text="text",e.time="time",e.timestamp="timestamp",e.timestamptz="timestamptz",e.timetz="timetz",e.tsrange="tsrange",e.tstzrange="tstzrange"}(l||(l={}));const d=(e,t,r={})=>{var s;const i=null!==(s=r.skipTypes)&&void 0!==s?s:[];return Object.keys(t).reduce(((r,s)=>(r[s]=f(s,e,t,i),r)),{})},f=(e,t,r,s)=>{const i=t.find((t=>t.name===e)),n=null==i?void 0:i.type,o=r[e];return n&&!s.includes(n)?p(n,o):g(o)},p=(e,t)=>{if("_"===e.charAt(0)){const r=e.slice(1,e.length);return _(t,r)}switch(e){case l.bool:return v(t);case l.float4:case l.float8:case l.int2:case l.int4:case l.int8:case l.numeric:case l.oid:return y(t);case l.json:case l.jsonb:return m(t);case l.timestamp:return w(t);case l.abstime:case l.date:case l.daterange:case l.int4range:case l.int8range:case l.money:case l.reltime:case l.text:case l.time:case l.timestamptz:case l.timetz:case l.tsrange:case l.tstzrange:default:return g(t)}},g=e=>e,v=e=>{switch(e){case"t":return!0;case"f":return!1;default:return e}},y=e=>{if("string"==typeof e){const t=parseFloat(e);if(!Number.isNaN(t))return t}return e},m=e=>{if("string"==typeof e)try{return JSON.parse(e)}catch(t){return console.log(`JSON parse error: ${t}`),e}return e},_=(e,t)=>{if("string"!=typeof e)return e;const r=e.length-1,s=e[r];if("{"===e[0]&&"}"===s){let s;const i=e.slice(1,r);try{s=JSON.parse("["+i+"]")}catch(e){s=i?i.split(","):[]}return s.map((e=>p(t,e)))}return e},w=e=>"string"==typeof e?e.replace(" ","T"):e,b=e=>{let t=e;return t=t.replace(/^ws/i,"http"),t=t.replace(/(\/socket\/websocket|\/socket|\/websocket)\/?$/i,""),t.replace(/\/+$/,"")};class k{constructor(e,t,r={},s=1e4){this.channel=e,this.event=t,this.payload=r,this.timeout=s,this.sent=!1,this.timeoutTimer=void 0,this.ref="",this.receivedResp=null,this.recHooks=[],this.refEvent=null}resend(e){this.timeout=e,this._cancelRefEvent(),this.ref="",this.refEvent=null,this.receivedResp=null,this.sent=!1,this.send()}send(){this._hasReceived("timeout")||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload,ref:this.ref,join_ref:this.channel._joinRef()}))}updatePayload(e){this.payload=Object.assign(Object.assign({},this.payload),e)}receive(e,t){var r;return this._hasReceived(e)&&t(null===(r=this.receivedResp)||void 0===r?void 0:r.response),this.recHooks.push({status:e,callback:t}),this}startTimeout(){this.timeoutTimer||(this.ref=this.channel.socket._makeRef(),this.refEvent=this.channel._replyEventName(this.ref),this.channel._on(this.refEvent,{},(e=>{this._cancelRefEvent(),this._cancelTimeout(),this.receivedResp=e,this._matchReceive(e)})),this.timeoutTimer=setTimeout((()=>{this.trigger("timeout",{})}),this.timeout))}trigger(e,t){this.refEvent&&this.channel._trigger(this.refEvent,{status:e,response:t})}destroy(){this._cancelRefEvent(),this._cancelTimeout()}_cancelRefEvent(){this.refEvent&&this.channel._off(this.refEvent,{})}_cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=void 0}_matchReceive({status:e,response:t}){this.recHooks.filter((t=>t.status===e)).forEach((e=>e.callback(t)))}_hasReceived(e){return this.receivedResp&&this.receivedResp.status===e}}var T,S,E,j;!function(e){e.SYNC="sync",e.JOIN="join",e.LEAVE="leave"}(T||(T={}));class O{constructor(e,t){this.channel=e,this.state={},this.pendingDiffs=[],this.joinRef=null,this.caller={onJoin:()=>{},onLeave:()=>{},onSync:()=>{}};const r=(null==t?void 0:t.events)||{state:"presence_state",diff:"presence_diff"};this.channel._on(r.state,{},(e=>{const{onJoin:t,onLeave:r,onSync:s}=this.caller;this.joinRef=this.channel._joinRef(),this.state=O.syncState(this.state,e,t,r),this.pendingDiffs.forEach((e=>{this.state=O.syncDiff(this.state,e,t,r)})),this.pendingDiffs=[],s()})),this.channel._on(r.diff,{},(e=>{const{onJoin:t,onLeave:r,onSync:s}=this.caller;this.inPendingSyncState()?this.pendingDiffs.push(e):(this.state=O.syncDiff(this.state,e,t,r),s())})),this.onJoin(((e,t,r)=>{this.channel._trigger("presence",{event:"join",key:e,currentPresences:t,newPresences:r})})),this.onLeave(((e,t,r)=>{this.channel._trigger("presence",{event:"leave",key:e,currentPresences:t,leftPresences:r})})),this.onSync((()=>{this.channel._trigger("presence",{event:"sync"})}))}static syncState(e,t,r,s){const i=this.cloneDeep(e),n=this.transformState(t),o={},a={};return this.map(i,((e,t)=>{n[e]||(a[e]=t)})),this.map(n,((e,t)=>{const r=i[e];if(r){const s=t.map((e=>e.presence_ref)),i=r.map((e=>e.presence_ref)),n=t.filter((e=>i.indexOf(e.presence_ref)<0)),c=r.filter((e=>s.indexOf(e.presence_ref)<0));n.length>0&&(o[e]=n),c.length>0&&(a[e]=c)}else o[e]=t})),this.syncDiff(i,{joins:o,leaves:a},r,s)}static syncDiff(e,t,r,s){const{joins:i,leaves:n}={joins:this.transformState(t.joins),leaves:this.transformState(t.leaves)};return r||(r=()=>{}),s||(s=()=>{}),this.map(i,((t,s)=>{var i;const n=null!==(i=e[t])&&void 0!==i?i:[];if(e[t]=this.cloneDeep(s),n.length>0){const r=e[t].map((e=>e.presence_ref)),s=n.filter((e=>r.indexOf(e.presence_ref)<0));e[t].unshift(...s)}r(t,n,s)})),this.map(n,((t,r)=>{let i=e[t];if(!i)return;const n=r.map((e=>e.presence_ref));i=i.filter((e=>n.indexOf(e.presence_ref)<0)),e[t]=i,s(t,i,r),0===i.length&&delete e[t]})),e}static map(e,t){return Object.getOwnPropertyNames(e).map((r=>t(r,e[r])))}static transformState(e){return e=this.cloneDeep(e),Object.getOwnPropertyNames(e).reduce(((t,r)=>{const s=e[r];return t[r]="metas"in s?s.metas.map((e=>(e.presence_ref=e.phx_ref,delete e.phx_ref,delete e.phx_ref_prev,e))):s,t}),{})}static cloneDeep(e){return JSON.parse(JSON.stringify(e))}onJoin(e){this.caller.onJoin=e}onLeave(e){this.caller.onLeave=e}onSync(e){this.caller.onSync=e}inPendingSyncState(){return!this.joinRef||this.joinRef!==this.channel._joinRef()}}!function(e){e.ALL="*",e.INSERT="INSERT",e.UPDATE="UPDATE",e.DELETE="DELETE"}(S||(S={})),function(e){e.BROADCAST="broadcast",e.PRESENCE="presence",e.POSTGRES_CHANGES="postgres_changes",e.SYSTEM="system"}(E||(E={})),function(e){e.SUBSCRIBED="SUBSCRIBED",e.TIMED_OUT="TIMED_OUT",e.CLOSED="CLOSED",e.CHANNEL_ERROR="CHANNEL_ERROR"}(j||(j={}));const P=n;class A{constructor(e,t={config:{}},r){this.topic=e,this.params=t,this.socket=r,this.bindings={},this.state=n.closed,this.joinedOnce=!1,this.pushBuffer=[],this.subTopic=e.replace(/^realtime:/i,""),this.params.config=Object.assign({broadcast:{ack:!1,self:!1},presence:{key:""},private:!1},t.config),this.timeout=this.socket.timeout,this.joinPush=new k(this,o.join,this.params,this.timeout),this.rejoinTimer=new u((()=>this._rejoinUntilConnected()),this.socket.reconnectAfterMs),this.joinPush.receive("ok",(()=>{this.state=n.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach((e=>e.send())),this.pushBuffer=[]})),this._onClose((()=>{this.rejoinTimer.reset(),this.socket.log("channel",`close ${this.topic} ${this._joinRef()}`),this.state=n.closed,this.socket._remove(this)})),this._onError((e=>{this._isLeaving()||this._isClosed()||(this.socket.log("channel",`error ${this.topic}`,e),this.state=n.errored,this.rejoinTimer.scheduleTimeout())})),this.joinPush.receive("timeout",(()=>{this._isJoining()&&(this.socket.log("channel",`timeout ${this.topic}`,this.joinPush.timeout),this.state=n.errored,this.rejoinTimer.scheduleTimeout())})),this._on(o.reply,{},((e,t)=>{this._trigger(this._replyEventName(t),e)})),this.presence=new O(this),this.broadcastEndpointURL=b(this.socket.endPoint)+"/api/broadcast",this.private=this.params.config.private||!1}subscribe(e,t=this.timeout){var r,s;if(this.socket.isConnected()||this.socket.connect(),this.joinedOnce)throw"tried to subscribe multiple times. 'subscribe' can only be called a single time per channel instance";{const{config:{broadcast:i,presence:n,private:o}}=this.params;this._onError((t=>null==e?void 0:e(j.CHANNEL_ERROR,t))),this._onClose((()=>null==e?void 0:e(j.CLOSED)));const a={},c={broadcast:i,presence:n,postgres_changes:null!==(s=null===(r=this.bindings.postgres_changes)||void 0===r?void 0:r.map((e=>e.filter)))&&void 0!==s?s:[],private:o};this.socket.accessTokenValue&&(a.access_token=this.socket.accessTokenValue),this.updateJoinPayload(Object.assign({config:c},a)),this.joinedOnce=!0,this._rejoin(t),this.joinPush.receive("ok",(async({postgres_changes:t})=>{var r;if(this.socket.setAuth(),void 0!==t){const s=this.bindings.postgres_changes,i=null!==(r=null==s?void 0:s.length)&&void 0!==r?r:0,n=[];for(let r=0;r<i;r++){const i=s[r],{filter:{event:o,schema:a,table:c,filter:l}}=i,h=t&&t[r];if(!h||h.event!==o||h.schema!==a||h.table!==c||h.filter!==l)return this.unsubscribe(),void(null==e||e(j.CHANNEL_ERROR,new Error("mismatch between server and client bindings for postgres changes")));n.push(Object.assign(Object.assign({},i),{id:h.id}))}return this.bindings.postgres_changes=n,void(e&&e(j.SUBSCRIBED))}null==e||e(j.SUBSCRIBED)})).receive("error",(t=>{null==e||e(j.CHANNEL_ERROR,new Error(JSON.stringify(Object.values(t).join(", ")||"error")))})).receive("timeout",(()=>{null==e||e(j.TIMED_OUT)}))}return this}presenceState(){return this.presence.state}async track(e,t={}){return await this.send({type:"presence",event:"track",payload:e},t.timeout||this.timeout)}async untrack(e={}){return await this.send({type:"presence",event:"untrack"},e)}on(e,t,r){return this._on(e,t,r)}async send(e,t={}){var r,s;if(this._canPush()||"broadcast"!==e.type)return new Promise((r=>{var s,i,n;const o=this._push(e.type,e,t.timeout||this.timeout);"broadcast"!==e.type||(null===(n=null===(i=null===(s=this.params)||void 0===s?void 0:s.config)||void 0===i?void 0:i.broadcast)||void 0===n?void 0:n.ack)||r("ok"),o.receive("ok",(()=>r("ok"))),o.receive("error",(()=>r("error"))),o.receive("timeout",(()=>r("timed out")))}));{const{event:i,payload:n}=e,o={method:"POST",headers:{Authorization:this.socket.accessTokenValue?`Bearer ${this.socket.accessTokenValue}`:"",apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"},body:JSON.stringify({messages:[{topic:this.subTopic,event:i,payload:n,private:this.private}]})};try{const e=await this._fetchWithTimeout(this.broadcastEndpointURL,o,null!==(r=t.timeout)&&void 0!==r?r:this.timeout);return await(null===(s=e.body)||void 0===s?void 0:s.cancel()),e.ok?"ok":"error"}catch(e){return"AbortError"===e.name?"timed out":"error"}}}updateJoinPayload(e){this.joinPush.updatePayload(e)}unsubscribe(e=this.timeout){this.state=n.leaving;const t=()=>{this.socket.log("channel",`leave ${this.topic}`),this._trigger(o.close,"leave",this._joinRef())};return this.rejoinTimer.reset(),this.joinPush.destroy(),new Promise((r=>{const s=new k(this,o.leave,{},e);s.receive("ok",(()=>{t(),r("ok")})).receive("timeout",(()=>{t(),r("timed out")})).receive("error",(()=>{r("error")})),s.send(),this._canPush()||s.trigger("ok",{})}))}async _fetchWithTimeout(e,t,r){const s=new AbortController,i=setTimeout((()=>s.abort()),r),n=await this.socket.fetch(e,Object.assign(Object.assign({},t),{signal:s.signal}));return clearTimeout(i),n}_push(e,t,r=this.timeout){if(!this.joinedOnce)throw`tried to push '${e}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;let s=new k(this,e,t,r);return this._canPush()?s.send():(s.startTimeout(),this.pushBuffer.push(s)),s}_onMessage(e,t,r){return t}_isMember(e){return this.topic===e}_joinRef(){return this.joinPush.ref}_trigger(e,t,r){var s,i;const n=e.toLocaleLowerCase(),{close:a,error:c,leave:l,join:h}=o;if(r&&[a,c,l,h].indexOf(n)>=0&&r!==this._joinRef())return;let u=this._onMessage(n,t,r);if(t&&!u)throw"channel onMessage callbacks must return the payload, modified or unmodified";["insert","update","delete"].includes(n)?null===(s=this.bindings.postgres_changes)||void 0===s||s.filter((e=>{var t,r,s;return"*"===(null===(t=e.filter)||void 0===t?void 0:t.event)||(null===(s=null===(r=e.filter)||void 0===r?void 0:r.event)||void 0===s?void 0:s.toLocaleLowerCase())===n})).map((e=>e.callback(u,r))):null===(i=this.bindings[n])||void 0===i||i.filter((e=>{var r,s,i,o,a,c;if(["broadcast","presence","postgres_changes"].includes(n)){if("id"in e){const n=e.id,o=null===(r=e.filter)||void 0===r?void 0:r.event;return n&&(null===(s=t.ids)||void 0===s?void 0:s.includes(n))&&("*"===o||(null==o?void 0:o.toLocaleLowerCase())===(null===(i=t.data)||void 0===i?void 0:i.type.toLocaleLowerCase()))}{const r=null===(a=null===(o=null==e?void 0:e.filter)||void 0===o?void 0:o.event)||void 0===a?void 0:a.toLocaleLowerCase();return"*"===r||r===(null===(c=null==t?void 0:t.event)||void 0===c?void 0:c.toLocaleLowerCase())}}return e.type.toLocaleLowerCase()===n})).map((e=>{if("object"==typeof u&&"ids"in u){const e=u.data,{schema:t,table:r,commit_timestamp:s,type:i,errors:n}=e,o={schema:t,table:r,commit_timestamp:s,eventType:i,new:{},old:{},errors:n};u=Object.assign(Object.assign({},o),this._getPayloadRecords(e))}e.callback(u,r)}))}_isClosed(){return this.state===n.closed}_isJoined(){return this.state===n.joined}_isJoining(){return this.state===n.joining}_isLeaving(){return this.state===n.leaving}_replyEventName(e){return`chan_reply_${e}`}_on(e,t,r){const s=e.toLocaleLowerCase(),i={type:s,filter:t,callback:r};return this.bindings[s]?this.bindings[s].push(i):this.bindings[s]=[i],this}_off(e,t){const r=e.toLocaleLowerCase();return this.bindings[r]=this.bindings[r].filter((e=>{var s;return!((null===(s=e.type)||void 0===s?void 0:s.toLocaleLowerCase())===r&&A.isEqual(e.filter,t))})),this}static isEqual(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const r in e)if(e[r]!==t[r])return!1;return!0}_rejoinUntilConnected(){this.rejoinTimer.scheduleTimeout(),this.socket.isConnected()&&this._rejoin()}_onClose(e){this._on(o.close,{},e)}_onError(e){this._on(o.error,{},(t=>e(t)))}_canPush(){return this.socket.isConnected()&&this._isJoined()}_rejoin(e=this.timeout){this._isLeaving()||(this.socket._leaveOpenTopic(this.topic),this.state=n.joining,this.joinPush.resend(e))}_getPayloadRecords(e){const t={new:{},old:{}};return"INSERT"!==e.type&&"UPDATE"!==e.type||(t.new=d(e.columns,e.record)),"UPDATE"!==e.type&&"DELETE"!==e.type||(t.old=d(e.columns,e.old_record)),t}}const $=()=>{},C="undefined"!=typeof WebSocket;class x{constructor(e,t){var i;this.accessTokenValue=null,this.apiKey=null,this.channels=[],this.endPoint="",this.httpEndpoint="",this.headers=s,this.params={},this.timeout=1e4,this.heartbeatIntervalMs=3e4,this.heartbeatTimer=void 0,this.pendingHeartbeatRef=null,this.ref=0,this.logger=$,this.conn=null,this.sendBuffer=[],this.serializer=new h,this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this.accessToken=null,this._resolveFetch=e=>{let t;return t=e||("undefined"==typeof fetch?(...e)=>Promise.resolve().then(r.bind(r,907)).then((({default:t})=>t(...e))):fetch),(...e)=>t(...e)},this.endPoint=`${e}/${a.websocket}`,this.httpEndpoint=b(e),(null==t?void 0:t.transport)?this.transport=t.transport:this.transport=null,(null==t?void 0:t.params)&&(this.params=t.params),(null==t?void 0:t.headers)&&(this.headers=Object.assign(Object.assign({},this.headers),t.headers)),(null==t?void 0:t.timeout)&&(this.timeout=t.timeout),(null==t?void 0:t.logger)&&(this.logger=t.logger),(null==t?void 0:t.heartbeatIntervalMs)&&(this.heartbeatIntervalMs=t.heartbeatIntervalMs);const n=null===(i=null==t?void 0:t.params)||void 0===i?void 0:i.apikey;if(n&&(this.accessTokenValue=n,this.apiKey=n),this.reconnectAfterMs=(null==t?void 0:t.reconnectAfterMs)?t.reconnectAfterMs:e=>[1e3,2e3,5e3,1e4][e-1]||1e4,this.encode=(null==t?void 0:t.encode)?t.encode:(e,t)=>t(JSON.stringify(e)),this.decode=(null==t?void 0:t.decode)?t.decode:this.serializer.decode.bind(this.serializer),this.reconnectTimer=new u((async()=>{this.disconnect(),this.connect()}),this.reconnectAfterMs),this.fetch=this._resolveFetch(null==t?void 0:t.fetch),null==t?void 0:t.worker){if("undefined"!=typeof window&&!window.Worker)throw new Error("Web Worker is not supported");this.worker=(null==t?void 0:t.worker)||!1,this.workerUrl=null==t?void 0:t.workerUrl}this.accessToken=(null==t?void 0:t.accessToken)||null}connect(){if(!this.conn)if(this.transport)this.conn=new this.transport(this.endpointURL(),void 0,{headers:this.headers});else{if(C)return this.conn=new WebSocket(this.endpointURL()),void this.setupConnection();this.conn=new R(this.endpointURL(),void 0,{close:()=>{this.conn=null}}),r.e(591).then(r.t.bind(r,591,23)).then((({default:e})=>{this.conn=new e(this.endpointURL(),void 0,{headers:this.headers}),this.setupConnection()}))}}endpointURL(){return this._appendParams(this.endPoint,Object.assign({},this.params,{vsn:"1.0.0"}))}disconnect(e,t){this.conn&&(this.conn.onclose=function(){},e?this.conn.close(e,null!=t?t:""):this.conn.close(),this.conn=null,this.heartbeatTimer&&clearInterval(this.heartbeatTimer),this.reconnectTimer.reset())}getChannels(){return this.channels}async removeChannel(e){const t=await e.unsubscribe();return 0===this.channels.length&&this.disconnect(),t}async removeAllChannels(){const e=await Promise.all(this.channels.map((e=>e.unsubscribe())));return this.disconnect(),e}log(e,t,r){this.logger(e,t,r)}connectionState(){switch(this.conn&&this.conn.readyState){case i.connecting:return c.Connecting;case i.open:return c.Open;case i.closing:return c.Closing;default:return c.Closed}}isConnected(){return this.connectionState()===c.Open}channel(e,t={config:{}}){const r=new A(`realtime:${e}`,t,this);return this.channels.push(r),r}push(e){const{topic:t,event:r,payload:s,ref:i}=e,n=()=>{this.encode(e,(e=>{var t;null===(t=this.conn)||void 0===t||t.send(e)}))};this.log("push",`${t} ${r} (${i})`,s),this.isConnected()?n():this.sendBuffer.push(n)}async setAuth(e=null){let t=e||this.accessToken&&await this.accessToken()||this.accessTokenValue;if(t){let e=null;try{e=JSON.parse(atob(t.split(".")[1]))}catch(e){}if(e&&e.exp&&!(Math.floor(Date.now()/1e3)-e.exp<0))return this.log("auth",`InvalidJWTToken: Invalid value for JWT claim "exp" with value ${e.exp}`),Promise.reject(`InvalidJWTToken: Invalid value for JWT claim "exp" with value ${e.exp}`);this.accessTokenValue=t,this.channels.forEach((e=>{t&&e.updateJoinPayload({access_token:t}),e.joinedOnce&&e._isJoined()&&e._push(o.access_token,{access_token:t})}))}}async sendHeartbeat(){var e;if(this.isConnected()){if(this.pendingHeartbeatRef)return this.pendingHeartbeatRef=null,this.log("transport","heartbeat timeout. Attempting to re-establish connection"),void(null===(e=this.conn)||void 0===e||e.close(1e3,"hearbeat timeout"));this.pendingHeartbeatRef=this._makeRef(),this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:this.pendingHeartbeatRef}),this.setAuth()}}flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach((e=>e())),this.sendBuffer=[])}_makeRef(){let e=this.ref+1;return e===this.ref?this.ref=0:this.ref=e,this.ref.toString()}_leaveOpenTopic(e){let t=this.channels.find((t=>t.topic===e&&(t._isJoined()||t._isJoining())));t&&(this.log("transport",`leaving duplicate topic "${e}"`),t.unsubscribe())}_remove(e){this.channels=this.channels.filter((t=>t._joinRef()!==e._joinRef()))}setupConnection(){this.conn&&(this.conn.binaryType="arraybuffer",this.conn.onopen=()=>this._onConnOpen(),this.conn.onerror=e=>this._onConnError(e),this.conn.onmessage=e=>this._onConnMessage(e),this.conn.onclose=e=>this._onConnClose(e))}_onConnMessage(e){this.decode(e.data,(e=>{let{topic:t,event:r,payload:s,ref:i}=e;i&&i===this.pendingHeartbeatRef&&(this.pendingHeartbeatRef=null),this.log("receive",`${s.status||""} ${t} ${r} ${i&&"("+i+")"||""}`,s),this.channels.filter((e=>e._isMember(t))).forEach((e=>e._trigger(r,s,i))),this.stateChangeCallbacks.message.forEach((t=>t(e)))}))}async _onConnOpen(){if(this.log("transport",`connected to ${this.endpointURL()}`),this.flushSendBuffer(),this.reconnectTimer.reset(),this.worker){this.workerUrl?this.log("worker",`starting worker for from ${this.workerUrl}`):this.log("worker","starting default worker");const e=this._workerObjectUrl(this.workerUrl);this.workerRef=new Worker(e),this.workerRef.onerror=e=>{this.log("worker","worker error",e.message),this.workerRef.terminate()},this.workerRef.onmessage=e=>{"keepAlive"===e.data.event&&this.sendHeartbeat()},this.workerRef.postMessage({event:"start",interval:this.heartbeatIntervalMs})}else this.heartbeatTimer&&clearInterval(this.heartbeatTimer),this.heartbeatTimer=setInterval((()=>this.sendHeartbeat()),this.heartbeatIntervalMs);this.stateChangeCallbacks.open.forEach((e=>e()))}_onConnClose(e){this.log("transport","close",e),this._triggerChanError(),this.heartbeatTimer&&clearInterval(this.heartbeatTimer),this.reconnectTimer.scheduleTimeout(),this.stateChangeCallbacks.close.forEach((t=>t(e)))}_onConnError(e){this.log("transport",e.message),this._triggerChanError(),this.stateChangeCallbacks.error.forEach((t=>t(e)))}_triggerChanError(){this.channels.forEach((e=>e._trigger(o.error)))}_appendParams(e,t){if(0===Object.keys(t).length)return e;const r=e.match(/\?/)?"&":"?";return`${e}${r}${new URLSearchParams(t)}`}_workerObjectUrl(e){let t;if(e)t=e;else{const e=new Blob(['\n  addEventListener("message", (e) => {\n    if (e.data.event === "start") {\n      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);\n    }\n  });'],{type:"application/javascript"});t=URL.createObjectURL(e)}return t}}class R{constructor(e,t,r){this.binaryType="arraybuffer",this.onclose=()=>{},this.onerror=()=>{},this.onmessage=()=>{},this.onopen=()=>{},this.readyState=i.connecting,this.send=()=>{},this.url=null,this.url=e,this.close=r.close}}},623:(e,t,r)=>{r.r(t),r.d(t,{StorageApiError:()=>n,StorageClient:()=>S,StorageError:()=>s,StorageUnknownError:()=>o,isStorageError:()=>i});class s extends Error{constructor(e){super(e),this.__isStorageError=!0,this.name="StorageError"}}function i(e){return"object"==typeof e&&null!==e&&"__isStorageError"in e}class n extends s{constructor(e,t){super(e),this.name="StorageApiError",this.status=t}toJSON(){return{name:this.name,message:this.message,status:this.status}}}class o extends s{constructor(e,t){super(e),this.name="StorageUnknownError",this.originalError=t}}const a=e=>{let t;return t=e||("undefined"==typeof fetch?(...e)=>Promise.resolve().then(r.bind(r,907)).then((({default:t})=>t(...e))):fetch),(...e)=>t(...e)},c=e=>{if(Array.isArray(e))return e.map((e=>c(e)));if("function"==typeof e||e!==Object(e))return e;const t={};return Object.entries(e).forEach((([e,r])=>{const s=e.replace(/([-_][a-z])/gi,(e=>e.toUpperCase().replace(/[-_]/g,"")));t[s]=c(r)})),t};var l=function(e,t,r,s){return new(r||(r=Promise))((function(i,n){function o(e){try{c(s.next(e))}catch(e){n(e)}}function a(e){try{c(s.throw(e))}catch(e){n(e)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(o,a)}c((s=s.apply(e,t||[])).next())}))};const h=e=>e.msg||e.message||e.error_description||e.error||JSON.stringify(e),u=(e,t,s)=>l(void 0,void 0,void 0,(function*(){const i=yield(a=void 0,c=void 0,l=void 0,u=function*(){return"undefined"==typeof Response?(yield Promise.resolve().then(r.bind(r,907))).Response:Response},new(l||(l=Promise))((function(e,t){function r(e){try{i(u.next(e))}catch(e){t(e)}}function s(e){try{i(u.throw(e))}catch(e){t(e)}}function i(t){var i;t.done?e(t.value):(i=t.value,i instanceof l?i:new l((function(e){e(i)}))).then(r,s)}i((u=u.apply(a,c||[])).next())})));var a,c,l,u;e instanceof i&&!(null==s?void 0:s.noResolveJson)?e.json().then((r=>{t(new n(h(r),e.status||500))})).catch((e=>{t(new o(h(e),e))})):t(new o(h(e),e))})),d=(e,t,r,s)=>{const i={method:e,headers:(null==t?void 0:t.headers)||{}};return"GET"===e?i:(i.headers=Object.assign({"Content-Type":"application/json"},null==t?void 0:t.headers),s&&(i.body=JSON.stringify(s)),Object.assign(Object.assign({},i),r))};function f(e,t,r,s,i,n){return l(this,void 0,void 0,(function*(){return new Promise(((o,a)=>{e(r,d(t,s,i,n)).then((e=>{if(!e.ok)throw e;return(null==s?void 0:s.noResolveJson)?e:e.json()})).then((e=>o(e))).catch((e=>u(e,a,s)))}))}))}function p(e,t,r,s){return l(this,void 0,void 0,(function*(){return f(e,"GET",t,r,s)}))}function g(e,t,r,s,i){return l(this,void 0,void 0,(function*(){return f(e,"POST",t,s,i,r)}))}function v(e,t,r,s,i){return l(this,void 0,void 0,(function*(){return f(e,"DELETE",t,s,i,r)}))}var y=function(e,t,r,s){return new(r||(r=Promise))((function(i,n){function o(e){try{c(s.next(e))}catch(e){n(e)}}function a(e){try{c(s.throw(e))}catch(e){n(e)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(o,a)}c((s=s.apply(e,t||[])).next())}))};const m={limit:100,offset:0,sortBy:{column:"name",order:"asc"}},_={cacheControl:"3600",contentType:"text/plain;charset=UTF-8",upsert:!1};class w{constructor(e,t={},r,s){this.url=e,this.headers=t,this.bucketId=r,this.fetch=a(s)}uploadOrUpdate(e,t,r,s){return y(this,void 0,void 0,(function*(){try{let i;const n=Object.assign(Object.assign({},_),s);let o=Object.assign(Object.assign({},this.headers),"POST"===e&&{"x-upsert":String(n.upsert)});const a=n.metadata;"undefined"!=typeof Blob&&r instanceof Blob?(i=new FormData,i.append("cacheControl",n.cacheControl),a&&i.append("metadata",this.encodeMetadata(a)),i.append("",r)):"undefined"!=typeof FormData&&r instanceof FormData?(i=r,i.append("cacheControl",n.cacheControl),a&&i.append("metadata",this.encodeMetadata(a))):(i=r,o["cache-control"]=`max-age=${n.cacheControl}`,o["content-type"]=n.contentType,a&&(o["x-metadata"]=this.toBase64(this.encodeMetadata(a)))),(null==s?void 0:s.headers)&&(o=Object.assign(Object.assign({},o),s.headers));const c=this._removeEmptyFolders(t),l=this._getFinalPath(c),h=yield this.fetch(`${this.url}/object/${l}`,Object.assign({method:e,body:i,headers:o},(null==n?void 0:n.duplex)?{duplex:n.duplex}:{})),u=yield h.json();return h.ok?{data:{path:c,id:u.Id,fullPath:u.Key},error:null}:{data:null,error:u}}catch(e){if(i(e))return{data:null,error:e};throw e}}))}upload(e,t,r){return y(this,void 0,void 0,(function*(){return this.uploadOrUpdate("POST",e,t,r)}))}uploadToSignedUrl(e,t,r,s){return y(this,void 0,void 0,(function*(){const n=this._removeEmptyFolders(e),o=this._getFinalPath(n),a=new URL(this.url+`/object/upload/sign/${o}`);a.searchParams.set("token",t);try{let e;const t=Object.assign({upsert:_.upsert},s),i=Object.assign(Object.assign({},this.headers),{"x-upsert":String(t.upsert)});"undefined"!=typeof Blob&&r instanceof Blob?(e=new FormData,e.append("cacheControl",t.cacheControl),e.append("",r)):"undefined"!=typeof FormData&&r instanceof FormData?(e=r,e.append("cacheControl",t.cacheControl)):(e=r,i["cache-control"]=`max-age=${t.cacheControl}`,i["content-type"]=t.contentType);const o=yield this.fetch(a.toString(),{method:"PUT",body:e,headers:i}),c=yield o.json();return o.ok?{data:{path:n,fullPath:c.Key},error:null}:{data:null,error:c}}catch(e){if(i(e))return{data:null,error:e};throw e}}))}createSignedUploadUrl(e,t){return y(this,void 0,void 0,(function*(){try{let r=this._getFinalPath(e);const i=Object.assign({},this.headers);(null==t?void 0:t.upsert)&&(i["x-upsert"]="true");const n=yield g(this.fetch,`${this.url}/object/upload/sign/${r}`,{},{headers:i}),o=new URL(this.url+n.url),a=o.searchParams.get("token");if(!a)throw new s("No token returned by API");return{data:{signedUrl:o.toString(),path:e,token:a},error:null}}catch(e){if(i(e))return{data:null,error:e};throw e}}))}update(e,t,r){return y(this,void 0,void 0,(function*(){return this.uploadOrUpdate("PUT",e,t,r)}))}move(e,t,r){return y(this,void 0,void 0,(function*(){try{return{data:yield g(this.fetch,`${this.url}/object/move`,{bucketId:this.bucketId,sourceKey:e,destinationKey:t,destinationBucket:null==r?void 0:r.destinationBucket},{headers:this.headers}),error:null}}catch(e){if(i(e))return{data:null,error:e};throw e}}))}copy(e,t,r){return y(this,void 0,void 0,(function*(){try{return{data:{path:(yield g(this.fetch,`${this.url}/object/copy`,{bucketId:this.bucketId,sourceKey:e,destinationKey:t,destinationBucket:null==r?void 0:r.destinationBucket},{headers:this.headers})).Key},error:null}}catch(e){if(i(e))return{data:null,error:e};throw e}}))}createSignedUrl(e,t,r){return y(this,void 0,void 0,(function*(){try{let s=this._getFinalPath(e),i=yield g(this.fetch,`${this.url}/object/sign/${s}`,Object.assign({expiresIn:t},(null==r?void 0:r.transform)?{transform:r.transform}:{}),{headers:this.headers});const n=(null==r?void 0:r.download)?`&download=${!0===r.download?"":r.download}`:"";return i={signedUrl:encodeURI(`${this.url}${i.signedURL}${n}`)},{data:i,error:null}}catch(e){if(i(e))return{data:null,error:e};throw e}}))}createSignedUrls(e,t,r){return y(this,void 0,void 0,(function*(){try{const s=yield g(this.fetch,`${this.url}/object/sign/${this.bucketId}`,{expiresIn:t,paths:e},{headers:this.headers}),i=(null==r?void 0:r.download)?`&download=${!0===r.download?"":r.download}`:"";return{data:s.map((e=>Object.assign(Object.assign({},e),{signedUrl:e.signedURL?encodeURI(`${this.url}${e.signedURL}${i}`):null}))),error:null}}catch(e){if(i(e))return{data:null,error:e};throw e}}))}download(e,t){return y(this,void 0,void 0,(function*(){const r=void 0!==(null==t?void 0:t.transform)?"render/image/authenticated":"object",s=this.transformOptsToQueryString((null==t?void 0:t.transform)||{}),n=s?`?${s}`:"";try{const t=this._getFinalPath(e),s=yield p(this.fetch,`${this.url}/${r}/${t}${n}`,{headers:this.headers,noResolveJson:!0});return{data:yield s.blob(),error:null}}catch(e){if(i(e))return{data:null,error:e};throw e}}))}info(e){return y(this,void 0,void 0,(function*(){const t=this._getFinalPath(e);try{const e=yield p(this.fetch,`${this.url}/object/info/${t}`,{headers:this.headers});return{data:c(e),error:null}}catch(e){if(i(e))return{data:null,error:e};throw e}}))}exists(e){return y(this,void 0,void 0,(function*(){const t=this._getFinalPath(e);try{return yield function(e,t,r){return l(this,void 0,void 0,(function*(){return f(e,"HEAD",t,Object.assign(Object.assign({},r),{noResolveJson:!0}),undefined)}))}(this.fetch,`${this.url}/object/${t}`,{headers:this.headers}),{data:!0,error:null}}catch(e){if(i(e)&&e instanceof o){const t=e.originalError;if([400,404].includes(null==t?void 0:t.status))return{data:!1,error:e}}throw e}}))}getPublicUrl(e,t){const r=this._getFinalPath(e),s=[],i=(null==t?void 0:t.download)?`download=${!0===t.download?"":t.download}`:"";""!==i&&s.push(i);const n=void 0!==(null==t?void 0:t.transform)?"render/image":"object",o=this.transformOptsToQueryString((null==t?void 0:t.transform)||{});""!==o&&s.push(o);let a=s.join("&");return""!==a&&(a=`?${a}`),{data:{publicUrl:encodeURI(`${this.url}/${n}/public/${r}${a}`)}}}remove(e){return y(this,void 0,void 0,(function*(){try{return{data:yield v(this.fetch,`${this.url}/object/${this.bucketId}`,{prefixes:e},{headers:this.headers}),error:null}}catch(e){if(i(e))return{data:null,error:e};throw e}}))}list(e,t,r){return y(this,void 0,void 0,(function*(){try{const s=Object.assign(Object.assign(Object.assign({},m),t),{prefix:e||""});return{data:yield g(this.fetch,`${this.url}/object/list/${this.bucketId}`,s,{headers:this.headers},r),error:null}}catch(e){if(i(e))return{data:null,error:e};throw e}}))}encodeMetadata(e){return JSON.stringify(e)}toBase64(e){return"undefined"!=typeof Buffer?Buffer.from(e).toString("base64"):btoa(e)}_getFinalPath(e){return`${this.bucketId}/${e}`}_removeEmptyFolders(e){return e.replace(/^\/|\/$/g,"").replace(/\/+/g,"/")}transformOptsToQueryString(e){const t=[];return e.width&&t.push(`width=${e.width}`),e.height&&t.push(`height=${e.height}`),e.resize&&t.push(`resize=${e.resize}`),e.format&&t.push(`format=${e.format}`),e.quality&&t.push(`quality=${e.quality}`),t.join("&")}}const b={"X-Client-Info":"storage-js/2.7.1"};var k=function(e,t,r,s){return new(r||(r=Promise))((function(i,n){function o(e){try{c(s.next(e))}catch(e){n(e)}}function a(e){try{c(s.throw(e))}catch(e){n(e)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(o,a)}c((s=s.apply(e,t||[])).next())}))};class T{constructor(e,t={},r){this.url=e,this.headers=Object.assign(Object.assign({},b),t),this.fetch=a(r)}listBuckets(){return k(this,void 0,void 0,(function*(){try{return{data:yield p(this.fetch,`${this.url}/bucket`,{headers:this.headers}),error:null}}catch(e){if(i(e))return{data:null,error:e};throw e}}))}getBucket(e){return k(this,void 0,void 0,(function*(){try{return{data:yield p(this.fetch,`${this.url}/bucket/${e}`,{headers:this.headers}),error:null}}catch(e){if(i(e))return{data:null,error:e};throw e}}))}createBucket(e,t={public:!1}){return k(this,void 0,void 0,(function*(){try{return{data:yield g(this.fetch,`${this.url}/bucket`,{id:e,name:e,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes},{headers:this.headers}),error:null}}catch(e){if(i(e))return{data:null,error:e};throw e}}))}updateBucket(e,t){return k(this,void 0,void 0,(function*(){try{const r=yield function(e,t,r,s){return l(this,void 0,void 0,(function*(){return f(e,"PUT",t,s,undefined,r)}))}(this.fetch,`${this.url}/bucket/${e}`,{id:e,name:e,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes},{headers:this.headers});return{data:r,error:null}}catch(e){if(i(e))return{data:null,error:e};throw e}}))}emptyBucket(e){return k(this,void 0,void 0,(function*(){try{return{data:yield g(this.fetch,`${this.url}/bucket/${e}/empty`,{},{headers:this.headers}),error:null}}catch(e){if(i(e))return{data:null,error:e};throw e}}))}deleteBucket(e){return k(this,void 0,void 0,(function*(){try{return{data:yield v(this.fetch,`${this.url}/bucket/${e}`,{},{headers:this.headers}),error:null}}catch(e){if(i(e))return{data:null,error:e};throw e}}))}}class S extends T{constructor(e,t={},r){super(e,t,r)}from(e){return new w(this.url,this.headers,e,this.fetch)}}},787:function(e,t,r){var s=this&&this.__awaiter||function(e,t,r,s){return new(r||(r=Promise))((function(i,n){function o(e){try{c(s.next(e))}catch(e){n(e)}}function a(e){try{c(s.throw(e))}catch(e){n(e)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(o,a)}c((s=s.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const i=r(227),n=r(279),o=r(932),a=r(623),c=r(985),l=r(720),h=r(793),u=r(689);t.default=class{constructor(e,t,r){var s,i,o;if(this.supabaseUrl=e,this.supabaseKey=t,!e)throw new Error("supabaseUrl is required.");if(!t)throw new Error("supabaseKey is required.");const a=(0,h.ensureTrailingSlash)(e),u=new URL(a);this.realtimeUrl=new URL("realtime/v1",u),this.realtimeUrl.protocol=this.realtimeUrl.protocol.replace("http","ws"),this.authUrl=new URL("auth/v1",u),this.storageUrl=new URL("storage/v1",u),this.functionsUrl=new URL("functions/v1",u);const d=`sb-${u.hostname.split(".")[0]}-auth-token`,f={db:c.DEFAULT_DB_OPTIONS,realtime:c.DEFAULT_REALTIME_OPTIONS,auth:Object.assign(Object.assign({},c.DEFAULT_AUTH_OPTIONS),{storageKey:d}),global:c.DEFAULT_GLOBAL_OPTIONS},p=(0,h.applySettingDefaults)(null!=r?r:{},f);this.storageKey=null!==(s=p.auth.storageKey)&&void 0!==s?s:"",this.headers=null!==(i=p.global.headers)&&void 0!==i?i:{},p.accessToken?(this.accessToken=p.accessToken,this.auth=new Proxy({},{get:(e,t)=>{throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(t)} is not possible`)}})):this.auth=this._initSupabaseAuthClient(null!==(o=p.auth)&&void 0!==o?o:{},this.headers,p.global.fetch),this.fetch=(0,l.fetchWithAuth)(t,this._getAccessToken.bind(this),p.global.fetch),this.realtime=this._initRealtimeClient(Object.assign({headers:this.headers,accessToken:this._getAccessToken.bind(this)},p.realtime)),this.rest=new n.PostgrestClient(new URL("rest/v1",u).href,{headers:this.headers,schema:p.db.schema,fetch:this.fetch}),p.accessToken||this._listenForAuthEvents()}get functions(){return new i.FunctionsClient(this.functionsUrl.href,{headers:this.headers,customFetch:this.fetch})}get storage(){return new a.StorageClient(this.storageUrl.href,this.headers,this.fetch)}from(e){return this.rest.from(e)}schema(e){return this.rest.schema(e)}rpc(e,t={},r={}){return this.rest.rpc(e,t,r)}channel(e,t={config:{}}){return this.realtime.channel(e,t)}getChannels(){return this.realtime.getChannels()}removeChannel(e){return this.realtime.removeChannel(e)}removeAllChannels(){return this.realtime.removeAllChannels()}_getAccessToken(){var e,t;return s(this,void 0,void 0,(function*(){if(this.accessToken)return yield this.accessToken();const{data:r}=yield this.auth.getSession();return null!==(t=null===(e=r.session)||void 0===e?void 0:e.access_token)&&void 0!==t?t:null}))}_initSupabaseAuthClient({autoRefreshToken:e,persistSession:t,detectSessionInUrl:r,storage:s,storageKey:i,flowType:n,lock:o,debug:a},c,l){const h={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new u.SupabaseAuthClient({url:this.authUrl.href,headers:Object.assign(Object.assign({},h),c),storageKey:i,autoRefreshToken:e,persistSession:t,detectSessionInUrl:r,storage:s,flowType:n,lock:o,debug:a,fetch:l,hasCustomAuthorizationHeader:"Authorization"in this.headers})}_initRealtimeClient(e){return new o.RealtimeClient(this.realtimeUrl.href,Object.assign(Object.assign({},e),{params:Object.assign({apikey:this.supabaseKey},null==e?void 0:e.params)}))}_listenForAuthEvents(){return this.auth.onAuthStateChange(((e,t)=>{this._handleTokenChanged(e,"CLIENT",null==t?void 0:t.access_token)}))}_handleTokenChanged(e,t,r){"TOKEN_REFRESHED"!==e&&"SIGNED_IN"!==e||this.changedAccessToken===r?"SIGNED_OUT"===e&&(this.realtime.setAuth(),"STORAGE"==t&&this.auth.signOut(),this.changedAccessToken=void 0):this.changedAccessToken=r}}},440:function(e,t,r){var s=this&&this.__createBinding||(Object.create?function(e,t,r,s){void 0===s&&(s=r);var i=Object.getOwnPropertyDescriptor(t,r);i&&!("get"in i?!t.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,s,i)}:function(e,t,r,s){void 0===s&&(s=r),e[s]=t[r]}),i=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||s(t,e,r)},n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.createClient=t.SupabaseClient=t.FunctionRegion=t.FunctionsError=t.FunctionsRelayError=t.FunctionsFetchError=t.FunctionsHttpError=t.PostgrestError=void 0;const o=n(r(787));i(r(334),t);var a=r(279);Object.defineProperty(t,"PostgrestError",{enumerable:!0,get:function(){return a.PostgrestError}});var c=r(227);Object.defineProperty(t,"FunctionsHttpError",{enumerable:!0,get:function(){return c.FunctionsHttpError}}),Object.defineProperty(t,"FunctionsFetchError",{enumerable:!0,get:function(){return c.FunctionsFetchError}}),Object.defineProperty(t,"FunctionsRelayError",{enumerable:!0,get:function(){return c.FunctionsRelayError}}),Object.defineProperty(t,"FunctionsError",{enumerable:!0,get:function(){return c.FunctionsError}}),Object.defineProperty(t,"FunctionRegion",{enumerable:!0,get:function(){return c.FunctionRegion}}),i(r(932),t);var l=r(787);Object.defineProperty(t,"SupabaseClient",{enumerable:!0,get:function(){return n(l).default}}),t.createClient=(e,t,r)=>new o.default(e,t,r)},689:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.SupabaseAuthClient=void 0;const s=r(334);class i extends s.AuthClient{constructor(e){super(e)}}t.SupabaseAuthClient=i},985:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.DEFAULT_REALTIME_OPTIONS=t.DEFAULT_AUTH_OPTIONS=t.DEFAULT_DB_OPTIONS=t.DEFAULT_GLOBAL_OPTIONS=t.DEFAULT_HEADERS=void 0;const s=r(560);let i="";i="undefined"!=typeof Deno?"deno":"undefined"!=typeof document?"web":"undefined"!=typeof navigator&&"ReactNative"===navigator.product?"react-native":"node",t.DEFAULT_HEADERS={"X-Client-Info":`supabase-js-${i}/${s.version}`},t.DEFAULT_GLOBAL_OPTIONS={headers:t.DEFAULT_HEADERS},t.DEFAULT_DB_OPTIONS={schema:"public"},t.DEFAULT_AUTH_OPTIONS={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:"implicit"},t.DEFAULT_REALTIME_OPTIONS={}},720:function(e,t,r){var s=this&&this.__createBinding||(Object.create?function(e,t,r,s){void 0===s&&(s=r);var i=Object.getOwnPropertyDescriptor(t,r);i&&!("get"in i?!t.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,s,i)}:function(e,t,r,s){void 0===s&&(s=r),e[s]=t[r]}),i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&s(t,e,r);return i(t,e),t},o=this&&this.__awaiter||function(e,t,r,s){return new(r||(r=Promise))((function(i,n){function o(e){try{c(s.next(e))}catch(e){n(e)}}function a(e){try{c(s.throw(e))}catch(e){n(e)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(o,a)}c((s=s.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.fetchWithAuth=t.resolveHeadersConstructor=t.resolveFetch=void 0;const a=n(r(907));t.resolveFetch=e=>{let t;return t=e||("undefined"==typeof fetch?a.default:fetch),(...e)=>t(...e)},t.resolveHeadersConstructor=()=>"undefined"==typeof Headers?a.Headers:Headers,t.fetchWithAuth=(e,r,s)=>{const i=(0,t.resolveFetch)(s),n=(0,t.resolveHeadersConstructor)();return(t,s)=>o(void 0,void 0,void 0,(function*(){var o;const a=null!==(o=yield r())&&void 0!==o?o:e;let c=new n(null==s?void 0:s.headers);return c.has("apikey")||c.set("apikey",e),c.has("Authorization")||c.set("Authorization",`Bearer ${a}`),i(t,Object.assign(Object.assign({},s),{headers:c}))}))}},793:function(e,t){var r=this&&this.__awaiter||function(e,t,r,s){return new(r||(r=Promise))((function(i,n){function o(e){try{c(s.next(e))}catch(e){n(e)}}function a(e){try{c(s.throw(e))}catch(e){n(e)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(o,a)}c((s=s.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.applySettingDefaults=t.isBrowser=t.ensureTrailingSlash=t.uuid=void 0,t.uuid=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)}))},t.ensureTrailingSlash=function(e){return e.endsWith("/")?e:e+"/"},t.isBrowser=()=>"undefined"!=typeof window,t.applySettingDefaults=function(e,t){var s,i;const{db:n,auth:o,realtime:a,global:c}=e,{db:l,auth:h,realtime:u,global:d}=t,f={db:Object.assign(Object.assign({},l),n),auth:Object.assign(Object.assign({},h),o),realtime:Object.assign(Object.assign({},u),a),global:Object.assign(Object.assign(Object.assign({},d),c),{headers:Object.assign(Object.assign({},null!==(s=null==d?void 0:d.headers)&&void 0!==s?s:{}),null!==(i=null==c?void 0:c.headers)&&void 0!==i?i:{})}),accessToken:()=>r(this,void 0,void 0,(function*(){return""}))};return e.accessToken?f.accessToken=e.accessToken:delete f.accessToken,f}},560:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.version=void 0,t.version="2.49.8"}},n={};function o(e){var t=n[e];if(void 0!==t)return t.exports;var r=n[e]={exports:{}};return i[e].call(r.exports,r,r.exports,o),r.exports}return o.m=i,t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,o.t=function(r,s){if(1&s&&(r=this(r)),8&s)return r;if("object"==typeof r&&r){if(4&s&&r.__esModule)return r;if(16&s&&"function"==typeof r.then)return r}var i=Object.create(null);o.r(i);var n={};e=e||[null,t({}),t([]),t(t)];for(var a=2&s&&r;"object"==typeof a&&!~e.indexOf(a);a=t(a))Object.getOwnPropertyNames(a).forEach((e=>n[e]=()=>r[e]));return n.default=()=>r,o.d(i,n),i},o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.f={},o.e=e=>Promise.all(Object.keys(o.f).reduce(((t,r)=>(o.f[r](e,t),t)),[])),o.u=e=>e+".supabase.js",o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r={},s="supabase:",o.l=(e,t,i,n)=>{if(r[e])r[e].push(t);else{var a,c;if(void 0!==i)for(var l=document.getElementsByTagName("script"),h=0;h<l.length;h++){var u=l[h];if(u.getAttribute("src")==e||u.getAttribute("data-webpack")==s+i){a=u;break}}a||(c=!0,(a=document.createElement("script")).charset="utf-8",a.timeout=120,o.nc&&a.setAttribute("nonce",o.nc),a.setAttribute("data-webpack",s+i),a.src=e),r[e]=[t];var d=(t,s)=>{a.onerror=a.onload=null,clearTimeout(f);var i=r[e];if(delete r[e],a.parentNode&&a.parentNode.removeChild(a),i&&i.forEach((e=>e(s))),t)return t(s)},f=setTimeout(d.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=d.bind(null,a.onerror),a.onload=d.bind(null,a.onload),c&&document.head.appendChild(a)}},o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;o.g.importScripts&&(e=o.g.location+"");var t=o.g.document;if(!e&&t&&(t.currentScript&&"SCRIPT"===t.currentScript.tagName.toUpperCase()&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");if(r.length)for(var s=r.length-1;s>-1&&(!e||!/^http(s?):/.test(e));)e=r[s--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),o.p=e})(),(()=>{var e={792:0};o.f.j=(t,r)=>{var s=o.o(e,t)?e[t]:void 0;if(0!==s)if(s)r.push(s[2]);else{var i=new Promise(((r,i)=>s=e[t]=[r,i]));r.push(s[2]=i);var n=o.p+o.u(t),a=new Error;o.l(n,(r=>{if(o.o(e,t)&&(0!==(s=e[t])&&(e[t]=void 0),s)){var i=r&&("load"===r.type?"missing":r.type),n=r&&r.target&&r.target.src;a.message="Loading chunk "+t+" failed.\n("+i+": "+n+")",a.name="ChunkLoadError",a.type=i,a.request=n,s[1](a)}}),"chunk-"+t,t)}};var t=(t,r)=>{var s,i,[n,a,c]=r,l=0;if(n.some((t=>0!==e[t]))){for(s in a)o.o(a,s)&&(o.m[s]=a[s]);c&&c(o)}for(t&&t(r);l<n.length;l++)i=n[l],o.o(e,i)&&e[i]&&e[i][0](),e[i]=0},r=self.webpackChunksupabase=self.webpackChunksupabase||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})(),o(440)})()));

/* Physfun: приложение и локальная Supabase в одном файле. */
/* ============================================================
   physfun.ru — портал учителя и ученика (сайт для reg.ru/VPS)
   База: Supabase (через мост api.physfun.ru)
   Версия 3: часть ученика + регистрация на сайте
   ============================================================ */

const cfg = window.PHYSFUN_CONFIG;
const sb = supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);

/* --- конфигурация школ и классов (как в боте) --- */
const SCHOOLS_CONFIG = {
    "СОШ №1 г. Голицыно": ["10", "11"],
    "Маловяземская СОШ": ["9А", "9Б", "9В", "10", "11"],
};

const STATUS_LABELS = {
    pending: { text: "⏳ Ожидает", cls: "badge-pending" },
    checked: { text: "✅ Проверено", cls: "badge-checked" },
    graded:  { text: "📝 Оценено",  cls: "badge-graded" },
};

const MONTHS_RU = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

/* --- состояние --- */
const state = {
    user: null,               // учитель (supabase auth)
    students: [],
    homeworks: [],
    submissions: [],
    calendar: [],
    grades: [],
    comments: [],
    unread: {},
    tab: "students",
    school: null,
    classNumber: null,
    selectedStudent: null,
    calSchool: null,
    calClass: null,
    calMonthIndex: 0,
};

/* --- состояние ученика --- */
let studentCreds = null;      // {login, password}
let studentInfo = null;       // данные ученика из student_login
let studentSubmissions = [];  // его работы

function loadStudentCreds() {
    try { studentCreds = JSON.parse(localStorage.getItem("physfun_student")); }
    catch (e) { studentCreds = null; }
}
function saveStudentCreds() {
    if (studentCreds) localStorage.setItem("physfun_student", JSON.stringify(studentCreds));
    else localStorage.removeItem("physfun_student");
}

/* ---------- утилиты ---------- */
const $ = (sel) => document.querySelector(sel);
const content = $("#content");

function esc(s) {
    return String(s ?? "").replace(/[&<>"']/g, (c) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
}

function fmtDate(d) {
    if (!d) return "Без даты";
    const dt = new Date(String(d).length === 10 ? d + "T00:00:00" : d);
    return dt.toLocaleDateString("ru-RU");
}

function toast(msg, isError = false) {
    const t = $("#toast");
    t.textContent = msg;
    t.className = "toast" + (isError ? " toast-error" : "");
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.add("hidden"), 3000);
}

function showError(msg) {
    const err = $("#login-error");
    if (!msg) { err.classList.add("hidden"); return; }
    err.textContent = msg;
    err.classList.remove("hidden");
}

function avatarHtml(url, large = false) {
    const cls = large ? "avatar-circle avatar-large" : "avatar-circle";
    const fallback = large ? "avatar-fallback avatar-large" : "avatar-fallback";
    return `<img src="${esc(url || "")}" class="${cls}" alt=""
        onerror="this.outerHTML='<div class=&quot;${fallback}&quot;>🧑‍🎓</div>'">`;
}

/* увеличенный просмотр: клик открывает, повторный клик закрывает */
function openLightbox(src) {
    if (!src) return;
    const lb = document.createElement("div");
    lb.className = "lightbox";
    lb.innerHTML = `<img src="${esc(src)}" alt="">`;
    lb.addEventListener("click", () => lb.remove());
    document.body.appendChild(lb);
}

function examLabel(classNumber) {
    const c = String(classNumber || "");
    if (c.startsWith("9")) return "ОГЭ";
    if (c.startsWith("10") || c.startsWith("11")) return "ЕГЭ";
    return null;
}

function storagePath(url, bucket) {
    if (!url) return null;
    const marker = `/object/public/${bucket}/`;
    const idx = url.indexOf(marker);
    if (idx === -1) return null;
    return url.slice(idx + marker.length).split("?")[0];
}

const DELIVERY_LABELS = {
    pending: "В очереди",
    sending: "Отправляется",
    retry: "Повторная попытка",
    waiting_telegram: "Ожидает Telegram",
    blocked: "Бот заблокирован",
    failed: "Ошибка",
    delivered: "Доставлено",
};

function newUuid() {
    const cryptoApi = window.crypto;
    if (cryptoApi && typeof cryptoApi.randomUUID === "function") return cryptoApi.randomUUID();
    /* randomUUID отсутствует в части браузеров. UUID здесь нужен только для
       имён файлов и группировки рассылок, поэтому предусмотрен полный fallback. */
    const bytes = new Uint8Array(16);
    if (cryptoApi && typeof cryptoApi.getRandomValues === "function") {
        cryptoApi.getRandomValues(bytes);
    } else {
        for (let i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256);
    }
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex = [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function withTimeout(promise, milliseconds, message) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error(message || "Сервер не ответил вовремя")), milliseconds);
        Promise.resolve(promise).then((value) => {
            clearTimeout(timer);
            resolve(value);
        }, (error) => {
            clearTimeout(timer);
            reject(error);
        });
    });
}

function errorText(error) {
    return String(error?.message || error || "Неизвестная ошибка");
}

function showDataLoadError(container, title, error, retry) {
    container.innerHTML = `<div class="error-msg" style="margin:30px 0">
        <strong>${esc(title)}</strong><br>
        Проверьте интернет и нажмите «Повторить». Сохранённые данные входа не удалены.<br>
        <span>${esc(errorText(error))}</span><br>
        <button type="button" class="btn" style="margin-top:14px">Повторить загрузку</button>
    </div>`;
    container.querySelector("button").addEventListener("click", retry);
}

async function queueBroadcast(recipients, payload) {
    if (!recipients.length) throw new Error("Нет учеников для выбранных получателей");
    const broadcastId = newUuid();
    const now = new Date().toISOString();
    const rows = recipients.map((student) => ({
        student_id: student.id,
        sender: "teacher",
        text: payload.text,
        message_type: "text",
        broadcast_id: broadcastId,
        delivery_status: "pending",
        delivery_available_at: now,
    }));
    const { error } = await sb.from("messages").insert(rows);
    if (error) throw error;
    return broadcastId;
}

function academicMonths() {
    const now = new Date();
    const y0 = now.getMonth() >= 8 ? now.getFullYear() : now.getFullYear() - 1;
    const arr = [];
    for (let m = 8; m <= 11; m++) arr.push({ year: y0, month: m });
    for (let m = 0; m <= 4; m++) arr.push({ year: y0 + 1, month: m });
    return arr;
}

/* ============================================================
   АВТОРИЗАЦИЯ: единая форма для учителя и ученика
   ============================================================ */
$("#login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    showError(null);
    const login = $("#login-email").value.trim();
    const password = $("#login-password").value;
    const submit = $("#login-form button[type=submit]");
    if (submit) submit.disabled = true;

    try {
        /* 1) пробуем учителя (Supabase Auth, логин = email) */
        const { data: tData, error: tErr } = await withTimeout(sb.auth.signInWithPassword({
            email: login, password,
        }), 20000, "Сервер входа не ответил. Проверьте интернет.");
        if (!tErr && tData && tData.user) return; // showApp сработает через onAuthStateChange

        /* 2) пробуем ученика (таблица students) */
        const sLogin = login.toLowerCase();
        const { data, error } = await withTimeout(
            sb.rpc("student_login", { p_login: sLogin, p_password: password }),
            20000,
            "Сервер не ответил при входе ученика. Проверьте интернет."
        );
        if (error) throw error;
        if (data && data.length) {
            studentCreds = { login: sLogin, password };
            studentInfo = data[0];
            saveStudentCreds();
            await showStudentApp();
            return;
        }
        showError("Неверный логин или пароль");
    } catch (error) {
        showError("Не удалось выполнить вход: " + errorText(error));
    } finally {
        if (submit) submit.disabled = false;
    }
});

$("#logout-btn").addEventListener("click", async () => { await sb.auth.signOut(); });
$("#student-logout-btn").addEventListener("click", () => {
    studentCreds = null; studentInfo = null;
    saveStudentCreds();
    location.reload();
});

/* ---------- сжатие изображения перед загрузкой ---------- */
async function prepareImage(file, maxDim = 1600, quality = 0.85) {
    try {
        if (!file.type || !file.type.startsWith("image/")) return file;
        const bmp = await createImageBitmap(file);
        let w = bmp.width, h = bmp.height;
        if (Math.max(w, h) <= maxDim) { bmp.close(); return file; }
        const scale = maxDim / Math.max(w, h);
        w = Math.round(w * scale); h = Math.round(h * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w; canvas.height = h;
        canvas.getContext("2d").drawImage(bmp, 0, 0, w, h);
        bmp.close();
        const blob = await new Promise((res) => canvas.toBlob(res, "image/jpeg", quality));
        return blob || file;
    } catch (e) { return file; }
}

/* ============================================================
   МАСТЕР РЕГИСТРАЦИИ УЧЕНИКА
   ============================================================ */
const reg = { step: 0, login: "", password: "", school: "", classNumber: "", first: "", last: "", avatarFile: null };

$("#to-register-btn").addEventListener("click", () => {
    Object.assign(reg, { step: 0, login: "", password: "", school: "", classNumber: "", first: "", last: "", avatarFile: null });
    $("#login-form").classList.add("hidden");
    renderRegStep();
});

function regBack() {
    if (reg.step === 0) {
        $("#reg-wizard").classList.add("hidden");
        $("#login-form").classList.remove("hidden");
        showError(null);
        return;
    }
    reg.step--;
    renderRegStep();
}

function renderRegStep() {
    const w = $("#reg-wizard");
    w.classList.remove("hidden");
    showError(null);
    const schools = Object.keys(SCHOOLS_CONFIG);

    if (reg.step === 0) {
        w.innerHTML = `
            <div class="reg-steps">
                <div class="reg-step-title">Шаг 1/5: Придумайте логин и пароль</div>
                <div class="reg-step-sub">Логин — латиницей, можно цифры и подчёркивание</div>
                <label style="display:block;text-align:left;font-size:13px;font-weight:600;color:var(--text-muted);margin:10px 0 6px;">Логин</label>
                <input type="text" id="reg-login" placeholder="ivanov_i" style="width:100%;padding:12px 14px;border:1px solid var(--border);border-radius:10px;font-size:15px;" autocomplete="off">
                <label style="display:block;text-align:left;font-size:13px;font-weight:600;color:var(--text-muted);margin:14px 0 6px;">Пароль</label>
                <input type="password" id="reg-pass1" style="width:100%;padding:12px 14px;border:1px solid var(--border);border-radius:10px;font-size:15px;">
                <label style="display:block;text-align:left;font-size:13px;font-weight:600;color:var(--text-muted);margin:14px 0 6px;">Повторите пароль</label>
                <input type="password" id="reg-pass2" style="width:100%;padding:12px 14px;border:1px solid var(--border);border-radius:10px;font-size:15px;">
                <div class="reg-nav">
                    <button class="btn" id="reg-back">⬅️ Назад</button>
                    <button class="btn btn-primary" id="reg-next">Далее ➡️</button>
                </div>
            </div>`;
        $("#reg-back").addEventListener("click", regBack);
        $("#reg-next").addEventListener("click", () => {
            const login = ($("#reg-login").value || "").trim().toLowerCase();
            const p1 = $("#reg-pass1").value || "";
            const p2 = $("#reg-pass2").value || "";
            if (!/^[a-z0-9_]{3,32}$/.test(login)) return showError("Логин: 3–32 символа, латиница, цифры, подчёркивание");
            if (p1.length < 4) return showError("Пароль должен быть не короче 4 символов");
            if (p1 !== p2) return showError("Пароли не совпадают");
            reg.login = login; reg.password = p1;
            reg.step = 1; renderRegStep();
        });
    } else if (reg.step === 1) {
        w.innerHTML = `
            <div class="reg-steps">
                <div class="reg-step-title">Шаг 2/5: Выберите школу</div>
                <div class="reg-choices">
                    ${schools.map((s) => `<button class="reg-choice" data-v="${esc(s)}">${esc(s)}</button>`).join("")}
                </div>
                <div class="reg-nav"><button class="btn" id="reg-back">⬅️ Назад</button></div>
            </div>`;
        $("#reg-back").addEventListener("click", regBack);
        w.querySelectorAll(".reg-choice").forEach((b) => b.addEventListener("click", () => {
            reg.school = b.dataset.v; reg.step = 2; renderRegStep();
        }));
    } else if (reg.step === 2) {
        w.innerHTML = `
            <div class="reg-steps">
                <div class="reg-step-title">Шаг 3/5: Выберите класс</div>
                <div class="reg-step-sub">${esc(reg.school)}</div>
                <div class="reg-choices">
                    ${SCHOOLS_CONFIG[reg.school].map((c) => `<button class="reg-choice" data-v="${esc(c)}">${esc(c)} класс</button>`).join("")}
                </div>
                <div class="reg-nav"><button class="btn" id="reg-back">⬅️ Назад</button></div>
            </div>`;
        $("#reg-back").addEventListener("click", regBack);
        w.querySelectorAll(".reg-choice").forEach((b) => b.addEventListener("click", () => {
            reg.classNumber = b.dataset.v; reg.step = 3; renderRegStep();
        }));
    } else if (reg.step === 3) {
        w.innerHTML = `
            <div class="reg-steps">
                <div class="reg-step-title">Шаг 4/5: Имя и фамилия</div>
                <div class="reg-step-sub">${esc(reg.school)}, ${esc(reg.classNumber)} класс</div>
                <label style="display:block;text-align:left;font-size:13px;font-weight:600;color:var(--text-muted);margin:10px 0 6px;">Имя</label>
                <input type="text" id="reg-first" style="width:100%;padding:12px 14px;border:1px solid var(--border);border-radius:10px;font-size:15px;">
                <label style="display:block;text-align:left;font-size:13px;font-weight:600;color:var(--text-muted);margin:14px 0 6px;">Фамилия</label>
                <input type="text" id="reg-last" style="width:100%;padding:12px 14px;border:1px solid var(--border);border-radius:10px;font-size:15px;">
                <div class="reg-nav">
                    <button class="btn" id="reg-back">⬅️ Назад</button>
                    <button class="btn btn-primary" id="reg-next">Далее ➡️</button>
                </div>
            </div>`;
        $("#reg-back").addEventListener("click", regBack);
        $("#reg-next").addEventListener("click", () => {
            const f = ($("#reg-first").value || "").trim();
            const l = ($("#reg-last").value || "").trim();
            if (f.length < 2 || l.length < 2) return showError("Введите имя и фамилию (от 2 символов)");
            reg.first = f; reg.last = l;
            reg.step = 4; renderRegStep();
        });
    } else if (reg.step === 4) {
        w.innerHTML = `
            <div class="reg-steps">
                <div class="reg-step-title">Шаг 5/5: Фото профиля</div>
                <div class="reg-step-sub">${esc(reg.last)} ${esc(reg.first)}, ${esc(reg.classNumber)} класс<br>Загрузите фотографию вашего лица — так учитель вас узнает</div>
                <label class="file-drop" id="reg-avatar-drop">
                    📎 <span id="reg-avatar-label">Нажмите, чтобы выбрать фото</span>
                    <input type="file" id="reg-avatar" accept="image/*">
                </label>
                <div class="reg-nav">
                    <button class="btn" id="reg-back">⬅️ Назад</button>
                    <button class="btn btn-primary" id="reg-finish">✅ Зарегистрироваться</button>
                </div>
            </div>`;
        $("#reg-back").addEventListener("click", regBack);
        const fileInput = $("#reg-avatar");
        fileInput.addEventListener("change", () => {
            reg.avatarFile = fileInput.files[0] || null;
            $("#reg-avatar-label").textContent = reg.avatarFile ? "📷 " + reg.avatarFile.name : "Нажмите, чтобы выбрать фото";
        });
        $("#reg-finish").addEventListener("click", async () => {
            if (!reg.avatarFile) return showError("Выберите фотографию для аватарки");
            const btn = $("#reg-finish");
            btn.disabled = true; btn.textContent = "⏳ Регистрация…";
            showError(null);
            try {
                const path = `web_${reg.login}_${Date.now()}.jpg`;
                const img = await prepareImage(reg.avatarFile, 1200);
                const { error: upErr } = await sb.storage.from("avatars").upload(path, img, { contentType: "image/jpeg" });
                if (upErr) throw new Error("загрузка фото: " + upErr.message);
                const avatarUrl = sb.storage.from("avatars").getPublicUrl(path).data.publicUrl;
                const { data, error } = await sb.rpc("register_student", {
                    p_login: reg.login, p_password: reg.password,
                    p_first: reg.first, p_last: reg.last,
                    p_class: reg.classNumber, p_school: reg.school,
                    p_avatar_url: avatarUrl,
                });
                if (error) throw new Error("сохранение в базе: " + error.message);
                if (data && data.error) { showError(data.error); btn.disabled = false; btn.textContent = "✅ Зарегистрироваться"; return; }
                studentCreds = { login: reg.login, password: reg.password };
                saveStudentCreds();
                const { data: me } = await sb.rpc("student_login", { p_login: reg.login, p_password: reg.password });
                studentInfo = me[0];
                toast("Регистрация завершена!");
                await showStudentApp();
            } catch (e) {
                showError("Ошибка: " + e.message);
                btn.disabled = false; btn.textContent = "✅ Зарегистрироваться";
            }
        });
    }
}

/* ============================================================
   ЧАСТЬ УЧЕНИКА
   ============================================================ */
async function showStudentApp() {
    $("#login-screen").classList.add("hidden");
    $("#app").classList.add("hidden");
    $("#student-app").classList.remove("hidden");
    if (await loadStudentData()) renderStudentPage();
}

async function loadStudentData() {
    $("#student-content").innerHTML = `<div class="loading">Загрузка…</div>`;
    try {
        const [subs, dates, msgs, comms] = await withTimeout(Promise.all([
            sb.rpc("get_my_submissions", { p_login: studentCreds.login, p_password: studentCreds.password }),
            sb.rpc("get_class_dates", { p_school: studentInfo.school, p_class: studentInfo.class_number }),
            sb.rpc("chat_get", { p_login: studentCreds.login, p_password: studentCreds.password }),
            sb.rpc("get_my_comments", { p_login: studentCreds.login, p_password: studentCreds.password }),
        ]), 30000, "Данные ученика не загрузились за 30 секунд");
        const error = subs.error || dates.error || msgs.error || comms.error;
        if (error) throw error;
        studentSubmissions = subs.data || [];
        studentClassDates = dates.data || [];
        studentMsgs = msgs.data || [];
        studentComms = {};
        (comms.data || []).forEach((c) => { studentComms[String(c.date)] = c; });
        return true;
    } catch (error) {
        showDataLoadError($("#student-content"), "Не удалось загрузить данные ученика", error, showStudentApp);
        return false;
    }
}

let studentMsgs = [];
let studentComms = {};

let studentClassDates = [];

function renderStudentPage() {
    const c = $("#student-content");
    c.innerHTML = `
        <div class="student-hero">
            <span class="avatar-zoom" id="st-avatar-zoom" title="Нажмите, чтобы увеличить">${avatarHtml(studentInfo.avatar_url, true)}</span>
            <div>
                <h1>${esc(studentInfo.first_name)} ${esc(studentInfo.last_name)}</h1>
                <div class="profile-meta">🏫 ${esc(studentInfo.school)} &nbsp;|&nbsp; 📚 ${esc(studentInfo.class_number)} класс</div>
            </div>
        </div>

        <div id="last-teacher-msg"></div>
        <button class="btn" id="write-teacher-btn" style="width:100%;padding:14px;font-size:15px;font-weight:700;margin-bottom:20px;">✉️ Написать учителю</button>
        <button class="btn-huge" id="student-submit-btn">📸 Отправить домашнее задание</button>

        <h2 class="page-title" style="font-size:19px">📝 Мои домашние задания</h2>
        <div id="student-works"></div>
    `;

    $("#student-submit-btn").addEventListener("click", openSubmitPanel);
    const avz = $("#st-avatar-zoom");
    if (avz) avz.addEventListener("click", () => openLightbox(studentInfo.avatar_url));
    $("#write-teacher-btn").addEventListener("click", openStudentChat);
    renderLastTeacherMsg();
    renderStudentWorks();
}

function renderStudentWorks() {
    const wrap = $("#student-works");
    if (!studentSubmissions.length) {
        wrap.innerHTML = `<div class="empty-note">Вы ещё не отправляли домашние задания.<br>Нажмите кнопку «📸 Отправить домашнее задание» выше.</div>`;
        return;
    }
    /* группировка по дате сдачи, новые сверху */
    const groups = new Map();
    studentSubmissions.forEach((sub) => {
        const key = sub.due_date || (sub.submitted_at ? String(sub.submitted_at).slice(0, 10) : "Без даты");
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(sub);
    });
    const sorted = [...groups.entries()].sort((a, b) => {
        if (a[0] === "Без даты") return 1;
        if (b[0] === "Без даты") return -1;
        return b[0].localeCompare(a[0]);
    });

    wrap.innerHTML = "";
    sorted.forEach(([dateKey, items]) => {
        const badge = STATUS_LABELS[items[0].status] || STATUS_LABELS.pending;
        const block = document.createElement("div");
        block.className = "work-block";
        block.innerHTML = `
            <div class="work-block-head">
                <div class="work-date">📅 ${esc(fmtDate(dateKey))}${items[0].status !== "pending" ? ` <span class="checked-tick" title="Работа проверена учителем">✔ Работа проверена</span>` : ""}${items[0].grade ? ` &nbsp;<span class="badge badge-graded">Оценка: ${items[0].grade}</span>` : ""}</div>
                <span class="badge ${badge.cls}">${badge.text}</span>
            </div>
            ${studentComms[dateKey] ? `<div class="hw-comment"><b>💬 Комментарий учителя:</b> ${esc(studentComms[dateKey].text)}</div>` : ""}
            <div class="photos-grid">
                ${items.map((i) => photoCell(i.photo_url, "homework-photos")).join("")}
            </div>`;
        wrap.appendChild(block);
    });

    wrap.querySelectorAll(".photos-grid img").forEach((img) =>
        img.addEventListener("click", () => {
            const lb = document.createElement("div");
            lb.className = "lightbox";
            lb.innerHTML = `<img src="${img.src}">`;
            lb.addEventListener("click", () => lb.remove());
            document.body.appendChild(lb);
        }));
    wireRotateButtons(wrap, "homework-photos", true);
}

/* ---------- обновление фото профиля (если учитель запросил) ---------- */
function openAvatarUpdate() {
    const c = $("#student-content");
    c.innerHTML = `
        <div class="back-row"><button class="btn" id="av-back">⬅️ Назад</button></div>
        <div class="form-card submit-panel">
            <h3>📸 Необходимо обновить фото профиля</h3>
            <div class="reg-step-sub">Учитель запросил актуальную фотографию вашего лица.<br>После обновления вы сможете отправить домашнее задание.</div>
            <label class="file-drop" id="av-drop">
                📎 <span id="av-drop-label">Нажмите, чтобы выбрать фото</span>
                <input type="file" id="av-file" accept="image/*">
            </label>
            <div id="av-progress" style="font-size:14px;color:var(--text-muted);margin-top:10px;"></div>
        </div>`;
    $("#av-back").addEventListener("click", renderStudentPage);
    $("#av-file").addEventListener("change", async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const progress = $("#av-progress");
        progress.textContent = "⏳ Загрузка фото...";
        try {
            const img = await prepareImage(file, 1200);
            const path = `web_${studentCreds.login}_${Date.now()}.jpg`;
            const { error: upErr } = await sb.storage.from("avatars")
                .upload(path, img, { contentType: "image/jpeg" });
            if (upErr) throw new Error(upErr.message);
            const avatarUrl = sb.storage.from("avatars").getPublicUrl(path).data.publicUrl;
            const { data: r } = await sb.rpc("update_my_avatar", {
                p_login: studentCreds.login,
                p_password: studentCreds.password,
                p_avatar_url: avatarUrl,
            });
            if (r && r.error) throw new Error(r.error);
            /* старый файл аватарки удаляем */
            const oldPath = storagePath(studentInfo.avatar_url, "avatars");
            if (oldPath) { try { await sb.storage.from("avatars").remove([oldPath]); } catch (_) {} }
            studentInfo.avatar_url = avatarUrl;
            studentInfo.needs_avatar_update = false;
            toast("Фото профиля обновлено!");
            openSubmitPanel();
        } catch (err) {
            progress.textContent = "❌ Ошибка: " + err.message;
        }
    });
}

/* ---------- сдача работы ---------- */
async function openSubmitPanel() {
    /* свежие данные ученика: флаг "сменить фото" мог появиться после его входа */
    try {
        const { data: fresh } = await sb.rpc("student_login", {
            p_login: studentCreds.login,
            p_password: studentCreds.password,
        });
        if (fresh && fresh.length) studentInfo = fresh[0];
    } catch (e) { /* нет связи — работаем с тем, что есть */ }

    /* как в боте: сначала обновляем фото профиля, если учитель запросил */
    if (studentInfo.needs_avatar_update) {
        openAvatarUpdate();
        return;
    }
    const today = new Date();
    const lo = new Date(today); lo.setDate(lo.getDate() - 1);
    const hi = new Date(today); hi.setDate(hi.getDate() + 5);
    const iso = (d) => d.toISOString().slice(0, 10);
    const allowed = (studentClassDates || []).filter((d) => d >= iso(lo) && d <= iso(hi));

    const c = $("#student-content");
    if (!allowed.length) {
        c.innerHTML = `
            <div class="back-row"><button class="btn" id="st-back">⬅️ Назад</button></div>
            <div class="form-card submit-panel">
                <h3>📸 Отправить домашнее задание</h3>
                <div class="empty-note">Сейчас нет доступных дат для сдачи.<br>Даты открывает учитель в календаре на сайте.</div>
            </div>`;
        $("#st-back").addEventListener("click", renderStudentPage);
        return;
    }

    c.innerHTML = `
        <div class="back-row"><button class="btn" id="st-back">⬅️ Назад</button></div>
        <div class="form-card submit-panel">
            <h3>📸 Отправить домашнее задание</h3>
            <div class="reg-step-sub">${esc(studentInfo.last_name)} ${esc(studentInfo.first_name)}, ${esc(studentInfo.class_number)} класс</div>
            <div class="reg-step-title">Шаг 1: Выберите дату сдачи</div>
            <div class="date-choice-grid" id="date-choices">
                ${allowed.map((d) => `<button class="date-choice" data-date="${d}">📅 ${fmtDate(d)}</button>`).join("")}
            </div>
            <div id="upload-zone" class="hidden">
                <div class="reg-step-title" style="margin-top:8px;">Шаг 2: Прикрепите одно или несколько фото</div>
                <label class="file-drop" id="hw-drop">
                    📎 <span id="hw-drop-label">Нажмите, чтобы выбрать фотографии</span>
                    <input type="file" id="hw-files" accept="image/*" multiple>
                </label>
                <div id="hw-progress" style="font-size:14px;color:var(--text-muted);margin-top:10px;"></div>
            </div>
        </div>`;

    $("#st-back").addEventListener("click", renderStudentPage);

    let chosenDate = null;
    $("#date-choices").querySelectorAll(".date-choice").forEach((b) =>
        b.addEventListener("click", () => {
            chosenDate = b.dataset.date;
            $("#date-choices").querySelectorAll(".date-choice").forEach((x) => {
                x.style.borderColor = x === b ? "var(--primary)" : "";
                x.style.background = x === b ? "#eef2ff" : "";
            });
            $("#upload-zone").classList.remove("hidden");
        }));

    $("#hw-files").addEventListener("change", async (e) => {
        const files = [...(e.target.files || [])];
        if (!files.length || !chosenDate) return;
        const progress = $("#hw-progress");
        let done = 0;
        for (const file of files) {
            progress.textContent = `Загрузка ${done + 1} из ${files.length}…`;
            try {
                const path = `${studentInfo.id}_${Date.now()}_${done}.jpg`;
                const img = await prepareImage(file, 2000);
                const { error: upErr } = await sb.storage.from("homework-photos")
                    .upload(path, img, { contentType: "image/jpeg" });
                if (upErr) throw new Error("загрузка фото: " + upErr.message);
                const url = sb.storage.from("homework-photos").getPublicUrl(path).data.publicUrl;
                const { data, error } = await sb.rpc("submit_homework", {
                    p_login: studentCreds.login, p_password: studentCreds.password,
                    p_due_date: chosenDate, p_photo_url: url,
                });
                if (error) throw new Error(error.message);
                if (data && data.error) throw new Error(data.error);
                done++;
            } catch (err) {
                progress.textContent = `❌ Ошибка на фото ${done + 1}: ${err.message}`;
                return;
            }
        }
        progress.textContent = `✅ Сохранено фото: ${done}.`;
        toast("Работа отправлена!");
        await loadStudentData();
        setTimeout(renderStudentPage, 800);
    });
}

/* ============================================================
   ЧАСТЬ УЧИТЕЛЯ (без изменений)
   ============================================================ */
async function loadData() {
    content.innerHTML = `<div class="loading">Загрузка…</div>`;
    try {
        const [st, hw, sub, cal, gr, cm] = await withTimeout(Promise.all([
            sb.from("students").select("*").order("last_name"),
            sb.from("homeworks").select("*").order("due_date", { ascending: false }),
            sb.from("submissions").select("*").order("submitted_at", { ascending: false }),
            sb.from("class_calendar").select("*"),
            sb.from("grades").select("*"),
            sb.from("hw_comments").select("*"),
        ]), 30000, "Данные учителя не загрузились за 30 секунд");
        const error = st.error || hw.error || sub.error || cal.error;
        if (error) throw error;
        state.students = st.data || [];
        state.homeworks = hw.data || [];
        state.submissions = sub.data || [];
        state.calendar = cal.data || [];
        state.grades = gr.error ? [] : (gr.data || []);
        state.comments = cm.error ? [] : (cm.data || []);
        updateBanner();
        refreshUnread();
        render();
    } catch (error) {
        showDataLoadError(content, "Не удалось загрузить данные учителя", error, loadData);
    }
}

function setTab(tab) {
    state.tab = tab;
    state.selectedStudent = null;
    document.querySelectorAll("#main-tabs .tab").forEach((b) =>
        b.classList.toggle("active", b.dataset.tab === tab));
    render();
}

function openStudent(id) {
    state.selectedStudent = id;
    render();
}

function render() {
    if (state.selectedStudent) return renderStudentPageT(state.selectedStudent);
    if (state.tab === "students") renderStudentsPage();
    else if (state.tab === "homeworks") renderHomeworksPage();
    else if (state.tab === "calendar") renderCalendarPage();
    else if (state.tab === "grades") renderGradesPage();
    else if (state.tab === "messages") renderMessagesPage();
    else if (state.tab === "stats") renderStatsPage();
}

/* ---------- ученики (учитель) ---------- */
function renderStudentsPage() {
    const schools = Object.keys(SCHOOLS_CONFIG);
    if (!state.school || !SCHOOLS_CONFIG[state.school]) state.school = schools[0];
    if (!state.classNumber || !SCHOOLS_CONFIG[state.school].includes(state.classNumber)) {
        state.classNumber = SCHOOLS_CONFIG[state.school][0];
    }
    const classes = SCHOOLS_CONFIG[state.school];
    const list = state.students.filter(
        (s) => s.school === state.school && s.class_number === state.classNumber);

    content.innerHTML = `
        <h2 class="page-title">👨‍🎓 Ученики</h2>
        <div class="sub-tabs" id="school-tabs">
            ${schools.map((sc) => `<button class="sub-tab ${sc === state.school ? "active" : ""}" data-school="${esc(sc)}">${esc(sc)}</button>`).join("")}
        </div>
        <div class="sub-tabs" id="class-tabs">
            ${classes.map((c) => `<button class="sub-tab ${c === state.classNumber ? "active" : ""}" data-class="${esc(c)}">${esc(c)} класс</button>`).join("")}
        </div>
        <p class="count-note">👥 Всего: ${list.length} учеников</p>
        <div class="broadcast-actions">
            <button class="btn" id="class-msg-btn">📨 Сообщение классу</button>
            <button class="btn" id="class-history-btn">🕘 История и доставка</button>
        </div>
        <div id="class-msg-form" class="form-card hidden broadcast-form">
            <h3>📨 Сообщение для ${esc(state.classNumber)} класса</h3>
            <textarea id="class-msg-text" rows="3" maxlength="3500" placeholder="Текст сообщения всем ученикам класса..."></textarea>
            <button class="btn btn-primary" id="class-msg-send">Поставить в очередь</button>
        </div>
        <div id="class-history" class="hidden broadcast-history"></div>
        <div class="students-grid" id="students-grid"></div>`;

    document.querySelectorAll("#school-tabs .sub-tab").forEach((b) =>
        b.addEventListener("click", () => { state.school = b.dataset.school; renderStudentsPage(); }));
    document.querySelectorAll("#class-tabs .sub-tab").forEach((b) =>
        b.addEventListener("click", () => { state.classNumber = b.dataset.class; renderStudentsPage(); }));

    const grid = $("#students-grid");
    if (!list.length) {
        grid.innerHTML = `<div class="empty-note" style="grid-column:1/-1">В этом классе пока нет учеников.<br>Ученики регистрируются через бота или кнопку «Зарегистрироваться» на сайте.</div>`;
    } else {
    grid.innerHTML = list.map((s) => `
        <div class="student-card" data-id="${s.id}">
            <div class="unread-dot ${state.unread[s.id] ? "" : "hidden"}" data-uid="${s.id}">${state.unread[s.id] || ""}</div>
            ${s.exam_flag && examLabel(s.class_number) ? `<div class="exam-badge">${examLabel(s.class_number)}</div>` : ""}
            ${avatarHtml(s.avatar_url)}
            <div class="student-name">${esc(s.last_name)}<br>${esc(s.first_name)}</div>
            <div class="student-class">${esc(s.class_number)} класс</div>
            ${s.needs_avatar_update ? `<div class="card-photo-flag">📸 Требуется фото</div>` : ""}
        </div>`).join("");
    grid.querySelectorAll(".student-card").forEach((card) =>
        card.addEventListener("click", () => openStudent(card.dataset.id)));
    }

    $("#class-msg-btn").addEventListener("click", () => {
        $("#class-msg-form").classList.toggle("hidden");
    });

    $("#class-msg-send").addEventListener("click", async () => {
        const text = ($("#class-msg-text").value || "").trim();
        if (!text) return toast("Введите текст сообщения", true);
        const button = $("#class-msg-send");
        button.disabled = true;
        try {
            await queueBroadcast(list, {
                messageType: "text",
                text: "Сообщение всему классу: " + text,
            });
            $("#class-msg-text").value = "";
            $("#class-msg-form").classList.add("hidden");
            toast(`Сообщение поставлено в очередь: ${list.length} ученикам`);
        } catch (error) {
            toast("Не удалось создать рассылку: " + error.message, true);
        } finally {
            button.disabled = false;
        }
    });

    $("#class-history-btn").addEventListener("click", async () => {
        const box = $("#class-history");
        box.classList.toggle("hidden");
        if (!box.classList.contains("hidden")) await loadBroadcastHistory(box, list);
    });
}

async function loadBroadcastHistory(box, list) {
    box.innerHTML = `<div class="form-card"><div class="loading">Загрузка статусов…</div></div>`;
    if (!list.length) {
        box.innerHTML = `<div class="form-card"><div class="empty-note">В классе пока нет учеников.</div></div>`;
        return;
    }
    const ids = list.map((s) => s.id);
    const { data, error } = await sb.from("messages")
        .select("id,student_id,text,created_at,message_type,audio_name,broadcast_id,delivery_status,delivery_error,delivery_attempts,delivered_at")
        .eq("sender", "teacher").eq("deleted", false).in("student_id", ids)
        .order("created_at", { ascending: false }).limit(500);
    if (error) {
        box.innerHTML = `<div class="error-msg">Ошибка: ${esc(error.message)}</div>`;
        return;
    }
    const broadcasts = (data || []).filter((m) =>
        m.broadcast_id || String(m.text || "").startsWith("Сообщение всему классу:"));
    const groups = new Map();
    broadcasts.forEach((message) => {
        const key = message.broadcast_id || `legacy|${message.message_type}|${message.text}|${message.audio_name || ""}`;
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(message);
    });
    if (!groups.size) {
        box.innerHTML = `<div class="form-card"><h3>🕘 История класса</h3><div class="empty-note">Рассылок пока не было.</div></div>`;
        return;
    }
    const studentMap = Object.fromEntries(list.map((s) => [String(s.id), s]));
    const groupList = [...groups.values()];
    const groupHtml = groupList.map((messages, index) => {
        const first = messages[0];
        const counts = {};
        messages.forEach((m) => { counts[m.delivery_status] = (counts[m.delivery_status] || 0) + 1; });
        const summary = Object.entries(counts).map(([status, count]) =>
            `<span class="delivery-chip delivery-${esc(status)}">${esc(DELIVERY_LABELS[status] || status)}: ${count}</span>`).join("");
        return `<section class="broadcast-group">
            <div class="hist-date">${first.message_type === "audio" ? "🎵" : "📨"} ${esc(fmtTime(first.created_at))}</div>
            <div class="hist-text">${first.message_type === "audio" ? `<strong>${esc(first.audio_name || "Аудиофайл")}</strong><br>` : ""}${esc(first.text)}</div>
            ${first.message_type === "audio" ? `<div class="empty-note">Старая аудиорассылка. Отправка аудио отключена; запись сохранена только для истории.</div>` : ""}
            <div class="delivery-summary">${summary}</div>
            <div class="broadcast-group-actions">
                <button class="btn btn-sm history-details-toggle" data-details="${index}">Получатели</button>
                <button class="btn btn-sm btn-danger history-delete" data-group="${index}" title="Удалить рассылку из истории">🗑 Удалить из истории</button>
            </div>
            <div class="delivery-details hidden" id="delivery-details-${index}">
                ${messages.map((m) => {
                    const student = studentMap[String(m.student_id)] || {};
                    return `<div class="delivery-student">
                        <div><strong>${esc(student.last_name || "")} ${esc(student.first_name || "")}</strong><br>
                        <span class="delivery-status delivery-${esc(m.delivery_status)}">${esc(DELIVERY_LABELS[m.delivery_status] || m.delivery_status)}</span>
                        ${m.delivery_error ? `<div class="delivery-error">${esc(m.delivery_error)}</div>` : ""}</div>
                        ${m.delivery_status === "failed" && m.message_type !== "audio" ? `<button class="btn btn-sm retry-message" data-message-id="${m.id}">Повторить</button>` : ""}
                    </div>`;
                }).join("")}
            </div>
        </section>`;
    }).join("");
    box.innerHTML = `<div class="form-card">
        <div class="history-heading"><h3>🕘 История класса</h3><button class="btn btn-sm" id="history-refresh">Обновить</button></div>
        ${groupHtml}
    </div>`;
    $("#history-refresh").addEventListener("click", () => loadBroadcastHistory(box, list));
    box.querySelectorAll(".history-details-toggle").forEach((button) =>
        button.addEventListener("click", () => $(`#delivery-details-${button.dataset.details}`).classList.toggle("hidden")));
    box.querySelectorAll(".history-delete").forEach((button) =>
        button.addEventListener("click", async () => {
            const messages = groupList[Number(button.dataset.group)] || [];
            const ids = messages.map((m) => m.id);
            if (!ids.length) return;
            if (!confirm("Удалить эту рассылку из истории?\nСообщения, уже доставленные в Telegram, останутся у учеников.")) return;
            button.disabled = true;
            const { error: deleteError } = await sb.from("messages").delete().in("id", ids);
            if (deleteError) {
                button.disabled = false;
                return toast("Ошибка: " + deleteError.message, true);
            }
            toast("Рассылка удалена из истории");
            await loadBroadcastHistory(box, list);
        }));
    box.querySelectorAll(".retry-message").forEach((button) =>
        button.addEventListener("click", async () => {
            button.disabled = true;
            const { error: retryError } = await sb.from("messages").update({
                delivery_status: "pending",
                delivery_error: null,
                delivery_attempts: 0,
                delivery_available_at: new Date().toISOString(),
                tg_delivered: false,
            }).eq("id", button.dataset.messageId);
            if (retryError) toast("Ошибка: " + retryError.message, true);
            else toast("Сообщение возвращено в очередь");
            await loadBroadcastHistory(box, list);
        }));
}

/* ---------- страница ученика (учитель) ---------- */
function homeworkById(id) {
    return state.homeworks.find((h) => h.id === id);
}

function groupSubmissions(studentId) {
    const groups = new Map();
    state.submissions.filter((s) => s.student_id === studentId).forEach((sub) => {
        const hw = homeworkById(sub.homework_id);
        const key = sub.due_date
            || hw?.due_date
            || (sub.submitted_at ? String(sub.submitted_at).slice(0, 10) : null)
            || "Без даты";
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(sub);
    });
    return [...groups.entries()].sort((a, b) => (a[0] === "Без даты" ? -1 : b[0] === "Без даты" ? 1 : b[0].localeCompare(a[0])));
}

async function deleteStudent(student) {
    const subs = state.submissions.filter((s) => s.student_id === student.id);
    const avatarPath = storagePath(student.avatar_url, "avatars");
    if (avatarPath) { try { await sb.storage.from("avatars").remove([avatarPath]); } catch (e) {} }
    const photoPaths = subs.map((s) => storagePath(s.photo_url, "homework-photos")).filter(Boolean);
    if (photoPaths.length) { try { await sb.storage.from("homework-photos").remove(photoPaths); } catch (e) {} }
    const { error } = await sb.from("students").delete().eq("id", student.id);
    if (error) return toast("Ошибка удаления: " + error.message, true);
    state.students = state.students.filter((s) => s.id !== student.id);
    state.submissions = state.submissions.filter((s) => s.student_id !== student.id);
    state.grades = state.grades.filter((g) => g.student_id !== student.id);
    state.selectedStudent = null;
    toast("Ученик удалён");
    render();
}

function renderStudentPageT(studentId) {
    const st = state.students.find((s) => s.id === studentId);
    if (!st) { state.selectedStudent = null; return render(); }
    const subs = state.submissions.filter((s) => s.student_id === studentId);
    const groups = groupSubmissions(studentId);
    const exam = examLabel(st.class_number);

    content.innerHTML = `
        <div class="back-row"><button class="btn" id="back-btn">← Назад к списку</button></div>
        <div class="profile-header">
            <span class="avatar-zoom" id="t-avatar-zoom" title="Нажмите, чтобы увеличить">${avatarHtml(st.avatar_url, true)}</span>
            <div>
                <h1>${esc(st.last_name)} ${esc(st.first_name)}</h1>
                <div class="profile-meta">🏫 ${esc(st.school)} &nbsp;|&nbsp; 📚 ${esc(st.class_number)} класс</div>
                <div class="profile-count">Всего работ: ${subs.length}${st.login ? ` &nbsp;|&nbsp; 🔑 ${esc(st.login)}` : ""}</div>
            </div>
            <div class="profile-actions">
                <button class="btn btn-delete" id="delete-btn">🗑 Удалить ученика</button>
            </div>
        </div>
        <label class="flag-row">
            <input type="checkbox" id="photo-flag" ${st.needs_avatar_update ? "checked" : ""}>
            Сменить фото профиля
        </label>
        ${exam ? `
        <label class="flag-row">
            <input type="checkbox" id="exam-flag" ${st.exam_flag ? "checked" : ""}>
            ${exam === "ОГЭ" ? "📘 ОГЭ" : "🎓 ЕГЭ"}
        </label>` : ""}
        <button class="btn" id="chat-btn-2" style="width:100%;padding:14px;font-size:15px;font-weight:700;margin-bottom:16px;">💬 Чат с учеником <span id="chat-badge-2" class="badge-unread ${state.unread[studentId] ? "" : "hidden"}">${state.unread[studentId] || ""}</span></button>
        <h2 class="page-title" style="font-size:19px">📸 Домашние задания</h2>
        <div id="works"></div>`;

    $("#back-btn").addEventListener("click", () => { state.selectedStudent = null; render(); });
    const avz = $("#t-avatar-zoom");
    if (avz) avz.addEventListener("click", () => openLightbox(st.avatar_url));
    const chatBtn2 = $("#chat-btn-2");
    if (chatBtn2) chatBtn2.addEventListener("click", () => toggleTeacherChat(studentId, st.last_name + " " + st.first_name));
    $("#delete-btn").addEventListener("click", async () => {
        const ok = confirm(`Удалить ученика ${st.last_name} ${st.first_name}?\n\nБудут удалены: профиль, аватарка и ${subs.length} работ.\nДействие необратимо!`);
        if (!ok) return;
        $("#delete-btn").disabled = true;
        $("#delete-btn").textContent = "⏳ Удаление…";
        await deleteStudent(st);
    });
    $("#photo-flag").addEventListener("change", async (e) => {
        const { error } = await sb.from("students").update({ needs_avatar_update: e.target.checked }).eq("id", studentId);
        if (error) { toast("Ошибка сохранения", true); e.target.checked = !e.target.checked; }
        else { st.needs_avatar_update = e.target.checked; toast("Сохранено"); }
    });
    const examBox = $("#exam-flag");
    if (examBox) examBox.addEventListener("change", async (e) => {
        const { error } = await sb.from("students").update({ exam_flag: e.target.checked }).eq("id", studentId);
        if (error) { toast("Ошибка сохранения", true); e.target.checked = !e.target.checked; }
        else { st.exam_flag = e.target.checked; toast("Сохранено"); }
    });

    const works = $("#works");
    if (!groups.length) {
        works.innerHTML = `<div class="empty-note">Ученик пока не отправлял домашние задания.</div>`;
        return;
    }
    groups.forEach(([dateKey, items]) => {
        const statuses = items.map((i) => i.status);
        const grades = items.map((i) => i.grade).filter((g) => g != null);
        const groupStatus = statuses.every((s) => s === statuses[0]) ? statuses[0] : "pending";
        const groupGrade = grades.length && grades.every((g) => g === grades[0]) ? grades[0] : null;
        const badge = STATUS_LABELS[groupStatus] || STATUS_LABELS.pending;
        const hw = homeworkById(items[0].homework_id);
        const block = document.createElement("div");
        block.className = "work-block";
        block.innerHTML = `
            <div class="work-block-head">
                <div>
                    <div class="work-date">📅 ${esc(fmtDate(dateKey))}</div>
                    ${hw && hw.title ? `<div style="font-size:13px;color:var(--text-muted);margin-top:3px">${esc(hw.title)}${hw.textbook_reference ? " · " + esc(hw.textbook_reference) : ""}</div>` : ""}
                </div>
                <span class="badge ${badge.cls}">${badge.text}</span>
                <button class="btn btn-sm" data-comment="${esc(dateKey)}">💬 ${state.comments.some((x) => x.student_id === studentId && String(x.date) === dateKey && !x.deleted) ? "Комментарий" : "Отправить комментарий"}</button>
            </div>
            <div class="photos-grid">
                ${items.map((i) => photoCell(i.photo_url, "homework-photos")).join("")}
            </div>
            ${commentHtmlT(studentId, dateKey)}
            <div class="work-controls">
                <div class="control-field">
                    <label>Проверено</label>
                    <input type="checkbox" class="chk-checked" ${groupStatus !== "pending" ? "checked" : ""}>
                </div>
                <div class="control-field">
                    <label>Оценка</label>
                    <select class="sel-grade">
                        <option value="">—</option>
                        ${[5, 4, 3, 2, 1].map((g) => `<option value="${g}" ${groupGrade === g ? "selected" : ""}>${g}</option>`).join("")}
                    </select>
                </div>
                <button class="btn btn-primary btn-save">💾 Сохранить</button>
            </div>`;
        block.querySelector(".btn-save").addEventListener("click", async () => {
            const checked = block.querySelector(".chk-checked").checked;
            const gradeVal = block.querySelector(".sel-grade").value;
            const grade = gradeVal === "" ? null : parseInt(gradeVal, 10);
            const status = checked ? (grade ? "graded" : "checked") : "pending";
            const ids = items.map((i) => i.id);
            const { error } = await sb.from("submissions").update({ status, grade }).in("id", ids);
            if (error) return toast("Ошибка сохранения: " + error.message, true);
            items.forEach((i) => { i.status = status; i.grade = grade; });
            /* синхронизация с таблицей оценок (вкладка "Оценки") */
            try {
                if (/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) {
                    if (grade) {
                        const { data: gRows } = await sb.from("grades").upsert(
                            { student_id: studentId, date: dateKey, mark: String(grade) },
                            { onConflict: "student_id,date" }).select();
                        const row = (gRows && gRows[0]) || null;
                        const gi = state.grades.findIndex((g) => g.student_id === studentId && g.date === dateKey);
                        if (row) {
                            if (gi >= 0) state.grades[gi] = row;
                            else state.grades.push(row);
                        } else if (gi >= 0) state.grades[gi].mark = String(grade);
                        else state.grades.push({ student_id: studentId, date: dateKey, mark: String(grade), in_journal: false });
                    } else {
                        await sb.from("grades").delete().eq("student_id", studentId).eq("date", dateKey);
                        state.grades = state.grades.filter((g) => !(g.student_id === studentId && g.date === dateKey));
                    }
                }
            } catch (e) { /* таблицы grades ещё нет — не мешаем сохранению */ }
            toast("Сохранено!");
            renderStudentPageT(studentId);
        });
        works.appendChild(block);
    });
    works.querySelectorAll(".photos-grid img").forEach((img) =>
        img.addEventListener("click", () => openLightbox(img.src)));
    wireRotateButtons(works, "homework-photos");

    works.querySelectorAll("[data-comment]").forEach((b) =>
        b.addEventListener("click", () => openCommentModal(studentId, b.dataset.comment)));
    works.querySelectorAll("[data-edit-comment]").forEach((b) =>
        b.addEventListener("click", () => openCommentModal(studentId, b.dataset.editComment)));
    works.querySelectorAll("[data-del-comment]").forEach((b) =>
        b.addEventListener("click", () => deleteComment(studentId, b.dataset.delComment)));
}

/* ---------- календарь (учитель) ---------- */
function renderCalendarPage() {
    const schools = Object.keys(SCHOOLS_CONFIG);
    if (!state.calSchool || !SCHOOLS_CONFIG[state.calSchool]) state.calSchool = schools[0];
    if (!state.calClass || !SCHOOLS_CONFIG[state.calSchool].includes(state.calClass)) {
        state.calClass = SCHOOLS_CONFIG[state.calSchool][0];
    }
    const months = academicMonths();
    if (state.calMonthIndex < 0) state.calMonthIndex = 0;
    if (state.calMonthIndex > months.length - 1) state.calMonthIndex = months.length - 1;
    const { year, month } = months[state.calMonthIndex];

    const marked = new Set(
        state.calendar.filter((r) => r.school === state.calSchool && r.class_number === state.calClass).map((r) => r.date));

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstOffset = (new Date(year, month, 1).getDay() + 6) % 7;
    const todayStr = new Date().toISOString().slice(0, 10);

    let cells = "";
    for (let i = 0; i < firstOffset; i++) cells += `<button class="cal-day cal-empty" disabled></button>`;
    for (let d = 1; d <= daysInMonth; d++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
        const classes = ["cal-day"];
        if (marked.has(dateStr)) classes.push("marked");
        if (dateStr === todayStr) classes.push("today");
        cells += `<button class="${classes.join(" ")}" data-date="${dateStr}">${d}</button>`;
    }

    content.innerHTML = `
        <h2 class="page-title">🗓️ Календарь сдачи работ</h2>
        <div class="sub-tabs" id="cal-school-tabs">
            ${schools.map((sc) => `<button class="sub-tab ${sc === state.calSchool ? "active" : ""}" data-school="${esc(sc)}">${esc(sc)}</button>`).join("")}
        </div>
        <div class="sub-tabs" id="cal-class-tabs">
            ${SCHOOLS_CONFIG[state.calSchool].map((c) => `<button class="sub-tab ${c === state.calClass ? "active" : ""}" data-class="${esc(c)}">${esc(c)} класс</button>`).join("")}
        </div>
        <div class="form-card calendar-card">
            <div class="cal-header">
                <button class="cal-nav" id="cal-prev" ${state.calMonthIndex === 0 ? "disabled" : ""}>‹</button>
                <div class="cal-title">${MONTHS_RU[month].toLowerCase()} ${year}</div>
                <button class="cal-nav" id="cal-next" ${state.calMonthIndex === months.length - 1 ? "disabled" : ""}>›</button>
            </div>
            <div class="cal-grid">
                ${["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((w, i) => `<div class="cal-weekday ${i >= 5 ? "weekend" : ""}">${w}</div>`).join("")}
                ${cells}
            </div>
            <div class="cal-hint">
                💡 Нажмите на число, чтобы отметить его как день сдачи (ещё раз — снять). Отмечено: <strong>${marked.size}</strong>.
                Эти даты ученики выбирают в боте и на сайте.
            </div>
        </div>`;

    document.querySelectorAll("#cal-school-tabs .sub-tab").forEach((b) =>
        b.addEventListener("click", () => { state.calSchool = b.dataset.school; renderCalendarPage(); }));
    document.querySelectorAll("#cal-class-tabs .sub-tab").forEach((b) =>
        b.addEventListener("click", () => { state.calClass = b.dataset.class; renderCalendarPage(); }));
    $("#cal-prev").addEventListener("click", () => { state.calMonthIndex--; renderCalendarPage(); });
    $("#cal-next").addEventListener("click", () => { state.calMonthIndex++; renderCalendarPage(); });

    content.querySelectorAll(".cal-day[data-date]").forEach((btn) =>
        btn.addEventListener("click", async () => {
            const dateStr = btn.dataset.date;
            const existing = state.calendar.find((r) =>
                r.school === state.calSchool && r.class_number === state.calClass && r.date === dateStr);
            if (existing) {
                const { error } = await sb.from("class_calendar").delete().eq("id", existing.id);
                if (error) return toast("Ошибка: " + error.message, true);
                state.calendar = state.calendar.filter((r) => r.id !== existing.id);
            } else {
                const { data, error } = await sb.from("class_calendar")
                    .insert({ school: state.calSchool, class_number: state.calClass, date: dateStr }).select();
                if (error) return toast("Ошибка: " + error.message, true);
                state.calendar.push(data[0]);
            }
            renderCalendarPage();
        }));
}

/* ---------- баннер "заполните календарь" ---------- */
function updateBanner() {
    const el = $("#teacher-banner");
    if (!el) return;
    const limit = new Date();
    limit.setDate(limit.getDate() + 7);
    const iso = (d) => d.toISOString().slice(0, 10);
    const pairs = [];
    Object.entries(SCHOOLS_CONFIG).forEach(([school, classes]) =>
        classes.forEach((cls) => pairs.push({ school, cls })));
    const need = pairs.some(({ school, cls }) => {
        const dates = state.calendar
            .filter((r) => r.school === school && r.class_number === cls)
            .map((r) => r.date);
        if (!dates.length) return true;                       /* календарь пуст */
        return dates.reduce((a, b) => (b > a ? b : a)) < iso(limit);
    });
    el.classList.toggle("hidden", !need);
}

/* ---------- вкладка "Оценки" (учитель) ---------- */
let gradeSel = null;     /* выбранная клетка {sid, date} */
let journalMode = false; /* режим выбора "в журнал" */

function gradeFor(sid, date) {
    return state.grades.find((g) => g.student_id === sid && g.date === date);
}

function gradeEditorHtml() {
    const st = state.students.find((s) => s.id === gradeSel.sid);
    if (!st) return "";
    const g = gradeFor(gradeSel.sid, gradeSel.date);
    return `
        <div class="control-field" style="flex:1;min-width:220px;">
            <label>${esc(st.last_name)} ${esc(st.first_name)} · ${fmtDate(gradeSel.date)}${g ? ` · сейчас: <b>${esc(g.mark)}</b>${g.in_journal ? " (в журнале)" : ""}` : " · без оценки"}</label>
        </div>
        <div class="control-field">
            <label>Оценка</label>
            <div style="display:flex;gap:6px;flex-wrap:wrap;">
                ${["5", "4", "3", "2", "1", "н"].map((m) => `<button class="btn btn-sm" data-mark="${m}">${m}</button>`).join("")}
                <button class="btn btn-sm btn-danger" data-mark="" title="Удалить оценку">✖</button>
            </div>
        </div>`;
}

function renderGradesPage() {
    const schools = Object.keys(SCHOOLS_CONFIG);
    if (!state.school || !SCHOOLS_CONFIG[state.school]) state.school = schools[0];
    if (!state.classNumber || !SCHOOLS_CONFIG[state.school].includes(state.classNumber)) {
        state.classNumber = SCHOOLS_CONFIG[state.school][0];
    }
    const dates = state.calendar
        .filter((r) => r.school === state.school && r.class_number === state.classNumber)
        .map((r) => r.date).sort();
    const list = state.students
        .filter((s) => s.school === state.school && s.class_number === state.classNumber)
        .sort((a, b) => a.last_name.localeCompare(b.last_name, "ru"));

    let rows = "";
    list.forEach((s) => {
        let tds = `<td class="g-name g-link" data-open="${s.id}" title="Открыть работы ученика">${esc(s.last_name)} ${esc(s.first_name)}</td>`;
        dates.forEach((d) => {
            const g = gradeFor(s.id, d);
            const subs = state.submissions.filter((x) => x.student_id === s.id && x.due_date === d);
            let cls = "g-cell", txt = "";
            if (g) { txt = esc(g.mark); cls += g.in_journal ? " g-green" : " g-blue"; }
            else if (subs.length) cls += subs.some((x) => x.status !== "pending") ? " g-blue" : " g-gray";
            else cls += " g-white";
            const sel = (gradeSel && gradeSel.sid === s.id && gradeSel.date === d) ? " g-sel" : "";
            tds += `<td class="${cls}${sel}" data-sid="${s.id}" data-date="${d}">${txt}</td>`;
        });
        rows += `<tr>${tds}</tr>`;
    });

    content.innerHTML = `
        <h2 class="page-title">✔️ Оценки</h2>
        <div class="sub-tabs" id="gr-school-tabs">
            ${schools.map((sc) => `<button class="sub-tab ${sc === state.school ? "active" : ""}" data-school="${esc(sc)}">${esc(sc)}</button>`).join("")}
        </div>
        <div class="sub-tabs" id="gr-class-tabs">
            ${SCHOOLS_CONFIG[state.school].map((c) => `<button class="sub-tab ${c === state.classNumber ? "active" : ""}" data-class="${esc(c)}">${esc(c)} класс</button>`).join("")}
        </div>
        ${!dates.length ? `
        <div class="form-card">
            <div class="empty-note">Для этого класса в календаре нет отмеченных дат.<br>Заполните календарь — здесь появится таблица.</div>
        </div>` : `
        <div class="grades-wrap">
            <table class="grades-table">
                <thead><tr>
                    <th class="g-name">Обучающийся</th>
                    ${dates.map((d) => `<th>${d.slice(8)}.${d.slice(5, 7)}</th>`).join("")}
                </tr></thead>
                <tbody>${rows || `<tr><td class="g-name" colspan="${dates.length + 1}">В классе нет учеников</td></tr>`}</tbody>
            </table>
        </div>
        <div id="grade-editor" class="${gradeSel ? "work-controls" : "hidden"}"
             style="background:var(--card);border-radius:12px;padding:14px;margin-top:14px;box-shadow:var(--shadow);">
            ${gradeSel ? gradeEditorHtml() : ""}
        </div>
        <div style="margin-top:14px;display:flex;gap:14px;align-items:center;flex-wrap:wrap;">
            <button class="btn ${journalMode ? "btn-primary" : ""}" id="journal-btn">${journalMode ? "✅ Готово" : "🖊 Выставить в журнал"}</button>
            <span class="grades-hint">${journalMode
                ? "Режим выбора: нажимайте на клетки с оценками — они станут зелёными (отметка «внесено в журнал»). Повторный клик снимает отметку."
                : "Нажмите на клетку, чтобы выставить оценку или «н» за эту дату (даже если работа не прислана)."}</span>
        </div>`}`;

    document.querySelectorAll("#gr-school-tabs .sub-tab").forEach((b) =>
        b.addEventListener("click", () => { state.school = b.dataset.school; gradeSel = null; renderGradesPage(); }));
    document.querySelectorAll("#gr-class-tabs .sub-tab").forEach((b) =>
        b.addEventListener("click", () => { state.classNumber = b.dataset.class; gradeSel = null; renderGradesPage(); }));

    content.querySelectorAll("[data-open]").forEach((td) =>
        td.addEventListener("click", () => openStudent(td.dataset.open)));

    content.querySelectorAll("td.g-cell").forEach((td) =>
        td.addEventListener("click", async () => {
            const sid = td.dataset.sid, date = td.dataset.date;
            if (journalMode) {
                const g = gradeFor(sid, date);
                if (!g) return toast("В этой клетке нет оценки", true);
                const { error } = await sb.from("grades").update({ in_journal: !g.in_journal })
                    .eq("student_id", sid).eq("date", date);
                if (error) return toast("Ошибка: " + error.message, true);
                g.in_journal = !g.in_journal;
                renderGradesPage();
                return;
            }
            gradeSel = { sid, date };
            renderGradesPage();
        }));

    const editor = $("#grade-editor");
    if (editor && gradeSel) {
        editor.querySelectorAll("[data-mark]").forEach((b) =>
            b.addEventListener("click", async () => {
                const mark = b.dataset.mark;
                if (!gradeSel) return;
                if (mark === "") {
                    const { error } = await sb.from("grades").delete()
                        .eq("student_id", gradeSel.sid).eq("date", gradeSel.date);
                    if (error) return toast("Ошибка: " + error.message, true);
                    state.grades = state.grades.filter((g) => !(g.student_id === gradeSel.sid && g.date === gradeSel.date));
                } else {
                    const { data: gRows, error } = await sb.from("grades").upsert(
                        { student_id: gradeSel.sid, date: gradeSel.date, mark },
                        { onConflict: "student_id,date" }).select();
                    if (error) return toast("Ошибка: " + error.message, true);
                    const row = (gRows && gRows[0]) || null;
                    const gi2 = state.grades.findIndex((g) => g.student_id === gradeSel.sid && g.date === gradeSel.date);
                    if (row) {
                        if (gi2 >= 0) state.grades[gi2] = row;
                        else state.grades.push(row);
                    } else if (gi2 >= 0) state.grades[gi2].mark = mark;
                    else state.grades.push({ student_id: gradeSel.sid, date: gradeSel.date, mark, in_journal: false });
                }
                toast("Сохранено");
                renderGradesPage();
            }));
    }

    const jbtn = $("#journal-btn");
    if (jbtn) jbtn.addEventListener("click", () => {
        journalMode = !journalMode;
        gradeSel = null;
        renderGradesPage();
    });
}

/* ============================================================
   ЧАТ учитель <-> ученик + комментарии к работам
   ============================================================ */
function fmtTime(d) {
    return new Date(d).toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
}

/* ---------- непрочитанные (для учителя) ---------- */
let unreadTimerStarted = false;

async function refreshUnread() {
    try {
        const { data } = await sb.from("messages").select("student_id")
            .eq("sender", "student").is("read_at", null).eq("deleted", false);
        const map = {};
        (data || []).forEach((r) => { map[r.student_id] = (map[r.student_id] || 0) + 1; });
        state.unread = map;
        updateBadges();
    } catch (e) { /* таблицы messages ещё нет */ }
}

function startUnreadTimer() {
    if (unreadTimerStarted) return;
    unreadTimerStarted = true;
    setInterval(refreshUnread, 30000);
}

function updateBadges() {
    document.querySelectorAll("[data-uid]").forEach((el) => {
        const n = state.unread[el.dataset.uid] || 0;
        el.classList.toggle("hidden", !n);
        el.textContent = n ? String(n) : "";
    });
    const n = state.unread[state.selectedStudent] || 0;
    ["#chat-badge", "#chat-badge-2"].forEach((sel) => {
        const b = $(sel);
        if (b) {
            b.textContent = n || "";
            b.classList.toggle("hidden", !n);
        }
    });

    /* общий счётчик непрочитанных на вкладке «Сообщения» */
    const total = Object.values(state.unread).reduce((a, b) => a + b, 0);
    const tabBadge = $("#msg-tab-badge");
    if (tabBadge) {
        tabBadge.textContent = total || "";
        tabBadge.classList.toggle("hidden", !total);
    }

    /* если открыта вкладка «Сообщения» — перерисуем список (плашки исчезают по мере прочтения) */
    if (state.user && state.tab === "messages" && !state.selectedStudent && !$("#inline-chat")) {
        renderMessagesPage();
    }
}

/* ---------- поворот фото работ ---------- */
async function retryNetworkRequest(operation, attempts = 3) {
    let lastError;
    for (let attempt = 1; attempt <= attempts; attempt++) {
        try {
            return await operation();
        } catch (error) {
            lastError = error;
            const networkError = error instanceof TypeError
                || /failed to fetch|networkerror|load failed|timeout/i.test(String(error?.message || error));
            if (!networkError || attempt === attempts) throw error;
            await new Promise((resolve) => setTimeout(resolve, 700 * attempt));
        }
    }
    throw lastError;
}

async function loadImageForRotation(url) {
    let lastError;
    for (let attempt = 1; attempt <= 3; attempt++) {
        try {
            /* После первого поворота браузер мог сохранить неудачный ответ для
               нового URL. Скачиваем свежую копию без кэша, а затем создаём
               изображение из локального Blob — canvas при этом не блокируется. */
            const loadUrl = new URL(url, window.location.href);
            loadUrl.searchParams.set("_rotation_load", `${Date.now()}-${attempt}`);
            const response = await fetch(loadUrl.toString(), {
                mode: "cors",
                credentials: "omit",
                cache: "no-store",
            });
            if (!response.ok) throw new Error(`сервер фото ответил HTTP ${response.status}`);
            const blob = await response.blob();
            if (!blob.size) throw new Error("сервер вернул пустой файл");
            const objectUrl = URL.createObjectURL(blob);
            const img = new Image();
            try {
                await new Promise((ok, bad) => {
                    img.onload = ok;
                    img.onerror = () => bad(new Error("браузер не смог прочитать скачанное изображение"));
                    img.src = objectUrl;
                });
            } catch (error) {
                URL.revokeObjectURL(objectUrl);
                throw error;
            }
            URL.revokeObjectURL(objectUrl);
            return img;
        } catch (error) {
            lastError = error;
            if (attempt < 3) await new Promise((resolve) => setTimeout(resolve, 700 * attempt));
        }
    }
    throw new Error("не удалось загрузить фото после 3 попыток: " + errorText(lastError));
}

async function rotatePhotoFile(url, bucket) {
    const path = storagePath(url, bucket);
    if (!path) throw new Error("не удалось определить путь файла");
    const img = await loadImageForRotation(url);
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalHeight;
    canvas.height = img.naturalWidth;
    const ctx = canvas.getContext("2d");
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(-Math.PI / 2); /* 90° против часовой */
    ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
    const blob = await new Promise((ok) => canvas.toBlob(ok, "image/jpeg", 0.92));
    if (!blob) throw new Error("ошибка обработки изображения");
    /* Не перезаписываем исходник: обычная загрузка нового файла работает
       без x-upsert и не требует разрешения UPDATE для Storage. */
    const rotatedPath = `rotated/${newUuid()}.jpg`;
    await retryNetworkRequest(async () => {
        const { error } = await sb.storage.from(bucket).upload(rotatedPath, blob, {
            upsert: false,
            contentType: "image/jpeg",
        });
        if (error) throw new Error(error.message);
    });
    return sb.storage.from(bucket).getPublicUrl(rotatedPath).data.publicUrl;
}

function photoCell(url, bucket) {
    return `<div class="photo-wrap" data-purl="${esc(url)}">`
        + `<img src="${esc(url)}" alt="Работа" loading="lazy">`
        + `<button class="rotate-btn" type="button" title="Повернуть на 90° против часовой стрелки">↺</button>`
        + `</div>`;
}

function wireRotateButtons(container, bucket, isStudent = false) {
    container.querySelectorAll(".rotate-btn").forEach((b) =>
        b.addEventListener("click", async (e) => {
            e.stopPropagation();
            const wrap = b.closest(".photo-wrap");
            const url = wrap.dataset.purl;
            b.disabled = true;
            const old = b.textContent;
            b.textContent = "⏳";
            let stage = "сохранение повернутого файла";
            try {
                const newUrl = await rotatePhotoFile(url, bucket);
                stage = "обновление ссылки на фотографию";
                const base = url.split("?")[0];
                if (isStudent) {
                    const { data: r } = await retryNetworkRequest(() => sb.rpc("rotate_my_photo", {
                        p_login: studentCreds.login, p_password: studentCreds.password,
                        p_old_url: url, p_new_url: newUrl,
                    }));
                    if (r && r.error) throw new Error(r.error);
                    (typeof studentSubmissions !== "undefined" ? studentSubmissions : []).forEach((s) => {
                        if (String(s.photo_url).split("?")[0] === base) s.photo_url = newUrl;
                    });
                } else {
                    const { error: upErr } = await retryNetworkRequest(() => sb.from("submissions")
                        .update({ photo_url: newUrl }).like("photo_url", base + "*"));
                    if (upErr) throw new Error(upErr.message);
                    (state.submissions || []).forEach((s) => {
                        if (String(s.photo_url).split("?")[0] === base) s.photo_url = newUrl;
                    });
                }
                container.querySelectorAll(".photo-wrap").forEach((w) => {
                    if (w.dataset.purl === url) {
                        w.dataset.purl = newUrl;
                        w.querySelector("img").src = newUrl;
                    }
                });
                toast("Фото повёрнуто на 90°");
            } catch (err) {
                toast(`Ошибка (${stage}): ` + err.message, true);
            }
            b.textContent = old;
            b.disabled = false;
        }));
}

/* ---------- чат, встроенный в страницу ---------- */
let chatCtx = null;
let chatTimer = null;

function stopChat() {
    if (chatTimer) clearInterval(chatTimer);
    chatTimer = null;
    const wasStudent = !!(chatCtx && chatCtx.isStudent);
    chatCtx = null;
    const el = $("#inline-chat");
    if (el) el.remove();
    /* у ученика возвращаем плашку с последним сообщением на место */
    if (wasStudent) renderLastTeacherMsg();
}

async function renderChatBody() {
    const body = $("#chat-body");
    if (!body || !chatCtx) return;
    let rows = [];
    if (chatCtx.isStudent) {
        const { data } = await sb.rpc("chat_get", { p_login: studentCreds.login, p_password: studentCreds.password });
        rows = data || [];
        studentMsgs = rows;
    } else {
        const { data } = await sb.from("messages").select("*")
            .eq("student_id", chatCtx.studentId).eq("deleted", false)
            .order("created_at", { ascending: true });
        rows = data || [];
    }
    /* ученику: свои сообщения можно удалить, пока учитель не ответил */
    const canDel = rows.map((m) => {
        if (chatCtx.isStudent && m.sender === "student") {
            return !rows.some((r) => r.sender === "teacher" && new Date(r.created_at) > new Date(m.created_at));
        }
        return !chatCtx.isStudent; /* учитель может удалять любые */
    });
    body.innerHTML = rows.length ? rows.map((m, i) => `
        <div class="bubble ${m.sender === "teacher" ? "them" : "me"}">
            <div class="bubble-text">${esc(m.text)}</div>
            <div class="bubble-meta">${fmtTime(m.created_at)}
                ${canDel[i] ? `<button class="bubble-del" data-mid="${m.id}" title="Удалить">🗑</button>` : ""}
            </div>
        </div>`).join("")
        : `<div class="empty-note" style="padding:30px 0;">Сообщений пока нет.<br>Напишите первым!</div>`;
    body.scrollTop = body.scrollHeight;

    body.querySelectorAll(".bubble-del").forEach((b) =>
        b.addEventListener("click", async (e) => {
            e.stopPropagation();
            const mid = b.dataset.mid;
            if (chatCtx.isStudent) {
                const { data } = await sb.rpc("chat_delete", { p_login: studentCreds.login, p_password: studentCreds.password, p_id: mid });
                if (data && data.error) return toast(data.error, true);
            } else {
                const { error } = await sb.from("messages").update({ deleted: true }).eq("id", mid);
                if (error) return toast("Ошибка: " + error.message, true);
            }
            toast("Сообщение удалено");
            renderChatBody();
        }));
}

/* mode: "after" — вставить после кнопки; "replace" — вместо содержимого контейнера */
function buildInlineChat(anchorEl, title, placeholder, mode) {
    if (chatTimer) clearInterval(chatTimer);
    chatTimer = null;
    const old = $("#inline-chat");
    if (old) old.remove();

    const div = document.createElement("div");
    div.id = "inline-chat";
    div.innerHTML = `
        <div class="inline-chat-window">
            <div class="chat-head">
                <span>💬 ${esc(title)}</span>
                <button class="chat-close" id="chat-close">✖ Свернуть</button>
            </div>
            <div class="chat-body" id="chat-body"></div>
            <div class="chat-foot">
                <textarea id="chat-input" rows="1" maxlength="2000" placeholder="${esc(placeholder)}"></textarea>
                <button class="btn btn-primary" id="chat-send">➤</button>
            </div>
        </div>`;
    if (mode === "replace") {
        anchorEl.innerHTML = "";
        anchorEl.appendChild(div);
    } else {
        anchorEl.after(div);
    }
    $("#chat-close").addEventListener("click", stopChat);

    const send = async () => {
        const input = $("#chat-input");
        const text = (input.value || "").trim();
        if (!text || !chatCtx) return;
        input.value = "";
        if (chatCtx.isStudent) {
            const { data } = await sb.rpc("chat_send", { p_login: studentCreds.login, p_password: studentCreds.password, p_text: text });
            if (data && data.error) return toast(data.error, true);
        } else {
            const { error } = await sb.from("messages").insert({ student_id: chatCtx.studentId, sender: "teacher", text });
            if (error) return toast("Ошибка: " + error.message, true);
        }
        renderChatBody();
    };
    $("#chat-send").addEventListener("click", send);
    const ta = $("#chat-input");
    /* Enter — отправить, Shift+Enter — новая строка */
    ta.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
    });
    /* поле растёт по мере ввода (до ~5 строк) */
    ta.addEventListener("input", () => {
        ta.style.height = "auto";
        ta.style.height = Math.min(ta.scrollHeight, 130) + "px";
    });
}

/* учитель: кнопка "Чат с учеником" открывает/сворачивает чат прямо под собой */
function toggleTeacherChat(studentId, name) {
    if (chatCtx && !chatCtx.isStudent && chatCtx.studentId === studentId) { stopChat(); return; }
    chatCtx = { studentId, name, isStudent: false };
    buildInlineChat($("#chat-btn-2"), name, "Сообщение ученику...", "after");
    /* помечаем входящие прочитанными */
    sb.from("messages").update({ read_at: new Date().toISOString() })
        .eq("student_id", studentId).eq("sender", "student").is("read_at", null)
        .then(() => refreshUnread());
    renderChatBody();
    chatTimer = setInterval(renderChatBody, 5000);
}

/* ученик: чат открывается ВМЕСТО плашки с последним сообщением учителя */
function openStudentChat() {
    if (chatCtx && chatCtx.isStudent && $("#inline-chat")) { stopChat(); return; }
    chatCtx = { isStudent: true, name: "Учитель" };
    buildInlineChat($("#last-teacher-msg"), "Чат с учителем", "Напишите сообщение...", "replace");
    renderChatBody();
    chatTimer = setInterval(renderChatBody, 5000);
}

function renderLastTeacherMsg() {
    const box = $("#last-teacher-msg");
    if (!box) return;
    const last = [...studentMsgs].reverse().find((m) => m.sender === "teacher");
    if (!last) { box.innerHTML = ""; return; }
    box.innerHTML = `
        <div class="last-msg-box" id="last-msg-open" title="Открыть чат">
            <div class="last-msg-label">👨‍🏫 Последнее сообщение учителя:</div>
            <div class="last-msg-text">${esc(last.text)}</div>
            <div class="last-msg-time">${fmtTime(last.created_at)}</div>
        </div>`;
    $("#last-msg-open").addEventListener("click", openStudentChat);
}

/* ---------- комментарии учителя к работам ---------- */
function commentHtmlT(studentId, dateKey) {
    const c = state.comments.find((x) => x.student_id === studentId && String(x.date) === dateKey && !x.deleted);
    if (!c) return "";
    return `<div class="hw-comment"><b>💬 Комментарий учителя:</b> ${esc(c.text)}
        <span class="hw-comment-actions">
            <button class="btn btn-sm" data-edit-comment="${esc(dateKey)}" title="Изменить">✏️</button>
            <button class="btn btn-sm btn-danger" data-del-comment="${esc(dateKey)}" title="Удалить">🗑</button>
        </span></div>`;
}

function openCommentModal(studentId, dateKey) {
    const existing = state.comments.find((x) => x.student_id === studentId && String(x.date) === dateKey && !x.deleted);
    const ov = document.createElement("div");
    ov.className = "chat-overlay";
    ov.id = "comment-overlay";
    ov.innerHTML = `
        <div class="chat-window">
            <div class="chat-head"><span>💬 Комментарий к работе на ${esc(fmtDate(dateKey))}</span>
                <button class="chat-close" id="comment-close">✖</button></div>
            <div style="padding:16px;">
                <textarea id="comment-text" rows="5" maxlength="1000"
                    style="width:100%;padding:12px;border:1px solid var(--border);border-radius:10px;font-family:inherit;font-size:14px;"
                    placeholder="Текст комментария для ученика...">${existing ? esc(existing.text) : ""}</textarea>
                <button class="btn btn-primary btn-block" id="comment-save" style="margin-top:12px;">💾 Сохранить</button>
            </div>
        </div>`;
    document.body.appendChild(ov);
    const close = () => ov.remove();
    $("#comment-close").addEventListener("click", close);
    ov.addEventListener("click", (e) => { if (e.target === ov) close(); });
    $("#comment-save").addEventListener("click", async () => {
        const text = ($("#comment-text").value || "").trim();
        if (!text) return toast("Введите текст комментария", true);
        const wasDelivered = existing && existing.tg_message_id;
        const payload = {
            student_id: studentId, date: dateKey, text,
            tg_state: wasDelivered ? "edit" : "send",
            updated_at: new Date().toISOString(),
        };
        const { data, error } = await sb.from("hw_comments")
            .upsert(payload, { onConflict: "student_id,date" }).select();
        if (error) return toast("Ошибка: " + error.message, true);
        const row = data && data[0];
        const i = state.comments.findIndex((x) => x.student_id === studentId && String(x.date) === dateKey);
        if (i >= 0) state.comments[i] = row; else state.comments.push(row);
        close();
        toast("Комментарий сохранён");
        renderStudentPageT(studentId);
    });
}

async function deleteComment(studentId, dateKey) {
    if (!confirm("Удалить комментарий?")) return;
    const c = state.comments.find((x) => x.student_id === studentId && String(x.date) === dateKey && !x.deleted);
    if (!c) return;
    if (c.tg_message_id) {
        /* бот удалит сообщение в Telegram и сам зачистит строку */
        const { error } = await sb.from("hw_comments").update({ deleted: true, tg_state: "delete" }).eq("id", c.id);
        if (error) return toast("Ошибка: " + error.message, true);
        c.deleted = true;
    } else {
        const { error } = await sb.from("hw_comments").delete().eq("id", c.id);
        if (error) return toast("Ошибка: " + error.message, true);
        state.comments = state.comments.filter((x) => x.id !== c.id);
    }
    toast("Комментарий удалён");
    renderStudentPageT(studentId);
}

/* ---------- вкладка "Сообщения" (учитель) ---------- */
function renderMessagesPage() {
    const list = state.students
        .filter((s) => state.unread[s.id])
        .sort((a, b) => (state.unread[b.id] || 0) - (state.unread[a.id] || 0));

    content.innerHTML = `
        <h2 class="page-title">💬 Сообщения</h2>
        ${list.length ? `
        <p class="count-note">👤 Диалогов с непрочитанными: ${list.length} · всего сообщений: ${Object.values(state.unread).reduce((a, b) => a + b, 0)}</p>
        <div class="students-grid" id="msg-grid"></div>` : `
        <div class="form-card">
            <div class="empty-note">Непрочитанных сообщений нет.<br>Диалоги с новыми сообщениями учеников появятся здесь.</div>
        </div>`}`;

    const grid = $("#msg-grid");
    if (!grid) return;
    grid.innerHTML = list.map((s) => `
        <div class="student-card" data-id="${s.id}">
            <div class="unread-dot" data-uid="${s.id}">${state.unread[s.id]}</div>
            ${s.exam_flag && examLabel(s.class_number) ? `<div class="exam-badge">${examLabel(s.class_number)}</div>` : ""}
            ${avatarHtml(s.avatar_url)}
            <div class="student-name">${esc(s.last_name)}<br>${esc(s.first_name)}</div>
            <div class="student-class">${esc(s.class_number)} класс</div>
        </div>`).join("");
    grid.querySelectorAll(".student-card").forEach((card) =>
        card.addEventListener("click", () => openStudent(card.dataset.id)));
}

/* ---------- задания (учитель) ---------- */
function renderHomeworksPage() {
    content.innerHTML = `
        <h2 class="page-title">📋 Домашние задания</h2>
        <div class="hw-layout">
            <div class="table-card">
                <h3>Список заданий</h3>
                <div id="hw-table"></div>
            </div>
            <div class="form-card">
                <h3>➕ Добавить задание</h3>
                <form id="hw-form">
                    <label>Название задания *</label>
                    <input type="text" id="hw-title" placeholder="Механика, урок 3" required>
                    <label>Номера из учебника</label>
                    <input type="text" id="hw-ref" placeholder="№ 145-149, стр. 67">
                    <label>Дата сдачи</label>
                    <input type="date" id="hw-date" value="${new Date().toISOString().slice(0, 10)}">
                    <button type="submit" class="btn btn-primary btn-block">Добавить</button>
                </form>
            </div>
        </div>`;
    const tableWrap = $("#hw-table");
    if (!state.homeworks.length) {
        tableWrap.innerHTML = `<div class="empty-note">Пока нет заданий.<br>Добавьте первое справа →</div>`;
    } else {
        tableWrap.innerHTML = `
            <table>
                <thead><tr><th>Название</th><th>Номера</th><th>Дата сдачи</th><th></th></tr></thead>
                <tbody>
                    ${state.homeworks.map((h) => `
                        <tr>
                            <td><strong>${esc(h.title)}</strong></td>
                            <td>${esc(h.textbook_reference || "—")}</td>
                            <td>${esc(fmtDate(h.due_date))}</td>
                            <td><button class="btn btn-sm btn-danger" data-del="${h.id}">🗑</button></td>
                        </tr>`).join("")}
                </tbody>
            </table>`;
        tableWrap.querySelectorAll("[data-del]").forEach((b) =>
            b.addEventListener("click", async () => {
                if (!confirm("Удалить задание? Отправленные работы сохранятся.")) return;
                const { error } = await sb.from("homeworks").delete().eq("id", b.dataset.del);
                if (error) return toast("Ошибка удаления", true);
                state.homeworks = state.homeworks.filter((h) => h.id !== b.dataset.del);
                toast("Задание удалено");
                renderHomeworksPage();
            }));
    }
    $("#hw-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const title = $("#hw-title").value.trim();
        const ref = $("#hw-ref").value.trim();
        const date = $("#hw-date").value || null;
        if (!title) return toast("Введите название задания", true);
        const { data, error } = await sb.from("homeworks")
            .insert({ title, textbook_reference: ref || null, due_date: date }).select();
        if (error) return toast("Ошибка: " + error.message, true);
        state.homeworks.unshift(data[0]);
        toast("Задание добавлено!");
        renderHomeworksPage();
    });
}

/* ---------- статистика (учитель) ---------- */
function renderStatsPage() {
    const classCounts = {};
    state.students.forEach((s) => { classCounts[s.class_number] = (classCounts[s.class_number] || 0) + 1; });
    const statusCounts = {};
    state.submissions.forEach((s) => { statusCounts[s.status] = (statusCounts[s.status] || 0) + 1; });
    const bar = (label, value, max) => `
        <div class="bar-row">
            <div class="bar-label">${esc(label)}</div>
            <div class="bar-track"><div class="bar-fill" style="width:${max ? Math.round((value / max) * 100) : 0}%"></div></div>
            <div class="bar-value">${value}</div>
        </div>`;
    const metrics = [
        ["👨‍🎓 Учеников", state.students.length],
        ["📋 Заданий", state.homeworks.length],
        ["📝 Работ", state.submissions.length],
        ["✅ Оценено", state.submissions.filter((s) => s.grade).length],
    ];
    content.innerHTML = `
        <h2 class="page-title">📊 Статистика</h2>
        <div class="stats-grid">
            ${metrics.map(([l, v]) => `
                <div class="stat-card metric">
                    <div class="metric-value">${v}</div>
                    <div class="metric-label">${l}</div>
                </div>`).join("")}
        </div>
        <div class="two-col">
            <div class="stat-card">
                <h3>Ученики по классам</h3>
                ${Object.keys(classCounts).length
                    ? Object.entries(classCounts).sort().map(([k, v]) => bar(k + " кл.", v, Math.max(...Object.values(classCounts)))).join("")
                    : `<div class="empty-note">Нет данных</div>`}
            </div>
            <div class="stat-card">
                <h3>Статус работ</h3>
                ${Object.keys(statusCounts).length
                    ? Object.entries(statusCounts).map(([k, v]) => bar((STATUS_LABELS[k] || { text: k }).text, v, Math.max(...Object.values(statusCounts)))).join("")
                    : `<div class="empty-note">Нет данных</div>`}
            </div>
        </div>`;
}

/* ============================================================
   СТАРТ
   ============================================================ */
async function initAuth() {
    loadStudentCreds();
    let session = null;
    try {
        const result = await withTimeout(sb.auth.getSession(), 10000, "Не удалось прочитать сохранённую сессию");
        session = result.data?.session || null;
    } catch (error) {
        /* После смены ключей Supabase старая Auth-сессия может быть повреждена.
           Удаляем только её, не трогая логин и пароль ученика. */
        console.warn("Старая сессия учителя очищена:", errorText(error));
        try { await sb.auth.signOut({ scope: "local" }); } catch (_) {}
    }
    state.user = session?.user || null;

    sb.auth.onAuthStateChange((_event, nextSession) => {
        state.user = nextSession?.user || null;
        showApp().catch((error) => {
            console.error("Ошибка запуска:", error);
            showLogin();
            showError("Не удалось открыть приложение. Обновите страницу.");
        });
    });
    await showApp();
}

async function showApp() {
    showError(null);
    if (state.user) {
        $("#login-screen").classList.add("hidden");
        $("#student-app").classList.add("hidden");
        $("#app").classList.remove("hidden");
        $("#user-email").textContent = state.user.email || "";
        startUnreadTimer();
        await loadData();
        return;
    }
    if (studentCreds && studentCreds.login) {
        /* Показываем понятный статус вместо пустого экрана во время автовхода. */
        $("#login-screen").classList.add("hidden");
        $("#app").classList.add("hidden");
        $("#student-app").classList.remove("hidden");
        $("#student-content").innerHTML = `<div class="loading">Проверяем сохранённый вход…</div>`;
        try {
            const { data, error } = await withTimeout(sb.rpc("student_login", {
                p_login: studentCreds.login, p_password: studentCreds.password,
            }), 20000, "Сервер не ответил при автоматическом входе");
            if (error) throw error;
            if (data && data.length) {
                studentInfo = data[0];
                await showStudentApp();
            } else {
                /* Только подтверждённо неверные данные разрешается удалить. */
                studentCreds = null;
                saveStudentCreds();
                showLogin();
                showError("Сохранённый вход устарел. Введите логин и пароль ещё раз.");
            }
        } catch (error) {
            showDataLoadError(
                $("#student-content"),
                "Не удалось войти с сохранёнными данными",
                error,
                showApp
            );
        }
        return;
    }
    showLogin();
}

function showLogin() {
    $("#app").classList.add("hidden");
    $("#student-app").classList.add("hidden");
    $("#login-screen").classList.remove("hidden");
}

document.querySelectorAll("#main-tabs .tab").forEach((b) =>
    b.addEventListener("click", () => setTab(b.dataset.tab)));

const bannerEl = $("#teacher-banner");
if (bannerEl) bannerEl.addEventListener("click", () => setTab("calendar"));

initAuth().catch((error) => {
    console.error("Критическая ошибка запуска:", error);
    state.user = null;
    showLogin();
    showError("Не удалось запустить сайт: " + errorText(error));
});
