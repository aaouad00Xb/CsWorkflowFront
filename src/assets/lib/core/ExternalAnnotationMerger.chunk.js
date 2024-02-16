/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
(function(){(window.wpCoreControlsBundle=window.wpCoreControlsBundle||[]).push([[4],{487:function(ja,ea,e){e.r(ea);var z=e(0),fa=e(512),ia=e(513),ha;(function(e){e[e.EXTERNAL_XFDF_NOT_REQUESTED=0]="EXTERNAL_XFDF_NOT_REQUESTED";e[e.EXTERNAL_XFDF_NOT_AVAILABLE=1]="EXTERNAL_XFDF_NOT_AVAILABLE";e[e.EXTERNAL_XFDF_AVAILABLE=2]="EXTERNAL_XFDF_AVAILABLE"})(ha||(ha={}));ja=function(){function e(e){this.aa=e;this.state=ha.EXTERNAL_XFDF_NOT_REQUESTED}e.prototype.yka=function(){var e=this;return function(y,x,w){return Object(z.b)(e,
void 0,void 0,function(){var e,h,f,n,aa,ba,ca,ea=this,fa;return Object(z.d)(this,function(r){switch(r.label){case 0:if(this.state!==ha.EXTERNAL_XFDF_NOT_REQUESTED)return[3,2];e=this.aa.getDocument().zu();return[4,this.Jia(e)];case 1:h=r.ba(),f=this.xda(h),this.NL=null!==(fa=null===f||void 0===f?void 0:f.parse())&&void 0!==fa?fa:null,this.state=null===this.NL?ha.EXTERNAL_XFDF_NOT_AVAILABLE:ha.EXTERNAL_XFDF_AVAILABLE,r.label=2;case 2:if(this.state===ha.EXTERNAL_XFDF_NOT_AVAILABLE)return w(y),[2];n=
new DOMParser;aa=n.parseFromString(y,"text/xml");x.forEach(function(e){ea.merge(aa,ea.NL,e-1)});ba=new XMLSerializer;ca=ba.serializeToString(aa);w(ca);return[2]}})})}};e.prototype.bQ=function(e){this.Jia=e};e.prototype.Ze=function(){this.NL=void 0;this.state=ha.EXTERNAL_XFDF_NOT_REQUESTED};e.prototype.xda=function(e){return e?Array.isArray(e)?new fa.a(e):"string"!==typeof e?null:(new DOMParser).parseFromString(e,"text/xml").querySelector("xfdf > add")?new fa.a(e):new ia.a(e):null};e.prototype.merge=
function(e,y,x){var w=this;0===x&&(this.fna(e,y.Sq),this.hna(e,y.rL));var r=y.ea[x];r&&(this.ina(e,r.Ho),this.kna(e,r.N5,y.jy),this.jna(e,r.page,x),this.gna(e,r.IW));r=this.aa.Ib();if(x===r-1){var h=y.jy;Object.keys(h).forEach(function(f){h[f].lN||w.i0(e,f,h[f])})}};e.prototype.fna=function(e,y){null!==y&&(e=this.wx(e),this.rs(e,"calculation-order",y))};e.prototype.hna=function(e,y){null!==y&&(e=this.wx(e),this.rs(e,"document-actions",y))};e.prototype.ina=function(e,y){var x=this,w=this.vx(e.querySelector("xfdf"),
"annots");Object.keys(y).forEach(function(e){x.rs(w,'[name="'+e+'"]',y[e])})};e.prototype.kna=function(e,y,x){var w=this;if(0!==y.length){var r=this.wx(e);y.forEach(function(h){var f=h.getAttribute("field"),n=x[f];n&&(w.i0(e,f,n),w.rs(r,"null",h))})}};e.prototype.i0=function(e,y,x){var w=this.wx(e),r=w.querySelector('ffield[name="'+y+'"]');null!==x.pE&&null===r&&this.rs(w,'ffield[name="'+y+'"]',x.pE);e=this.vx(e.querySelector("xfdf"),"fields");y=y.split(".");this.gP(e,y,0,x.value);x.lN=!0};e.prototype.jna=
function(e,y,x){null!==y&&(e=this.wx(e),e=this.vx(e,"pages"),this.rs(e,'[number="'+(x+1)+'"]',y))};e.prototype.gna=function(e,y){Object.keys(y).forEach(function(x){(x=e.querySelector('annots [name="'+x+'"]'))&&x.parentElement.removeChild(x)})};e.prototype.gP=function(e,y,x,w){if(x===y.length)y=document.createElementNS("","value"),y.textContent=w,this.rs(e,"value",y);else{var r=y[x];this.vx(e,'[name="'+r+'"]',"field").setAttribute("name",r);e=e.querySelectorAll('[name="'+r+'"]');1===e.length?this.gP(e[0],
y,x+1,w):(r=this.tha(e),this.gP(x===y.length-1?r:this.Xua(e,r),y,x+1,w))}};e.prototype.tha=function(e){for(var y=null,x=0;x<e.length;x++){var w=e[x];if(0===w.childElementCount||1===w.childElementCount&&"value"===w.children[0].tagName){y=w;break}}return y};e.prototype.Xua=function(e,y){for(var x=0;x<e.length;x++)if(e[x]!==y)return e[x];return null};e.prototype.rs=function(e,y,x){y=e.querySelector(y);null!==y&&e.removeChild(y);e.appendChild(x)};e.prototype.wx=function(e){var y=e.querySelector("pdf-info");
if(null!==y)return y;y=this.vx(e.querySelector("xfdf"),"pdf-info");y.setAttribute("xmlns","http://www.pdftron.com/pdfinfo");y.setAttribute("version","2");y.setAttribute("import-version","4");return y};e.prototype.vx=function(e,y,x){var w=e.querySelector(y);if(null!==w)return w;w=document.createElementNS("",x||y);e.appendChild(w);return w};return e}();ea["default"]=ja},501:function(ja,ea){ja=function(){function e(){}e.prototype.TC=function(e){var z={Sq:null,rL:null,jy:{},ea:{}};e=(new DOMParser).parseFromString(e,
"text/xml");z.Sq=e.querySelector("pdf-info calculation-order");z.rL=e.querySelector("pdf-info document-actions");z.jy=this.soa(e);z.ea=this.Foa(e);return z};e.prototype.soa=function(e){var z=e.querySelector("fields");e=e.querySelectorAll("pdf-info > ffield");if(null===z&&null===e)return{};var ea={};this.Caa(ea,z);this.Aaa(ea,e);return ea};e.prototype.Caa=function(e,ea){if(null!==ea&&ea.children){for(var z=[],ha=0;ha<ea.children.length;ha++){var ca=ea.children[ha];z.push({name:ca.getAttribute("name"),
element:ca})}for(;0!==z.length;)for(ea=z.shift(),ha=0;ha<ea.element.children.length;ha++)ca=ea.element.children[ha],"value"===ca.tagName?e[ea.name]={value:ca.textContent,pE:null,lN:!1}:ca.children&&z.push({name:ea.name+"."+ca.getAttribute("name"),element:ca})}};e.prototype.Aaa=function(e,ea){ea.forEach(function(z){var ha=z.getAttribute("name");e[ha]?e[ha].pE=z:e[ha]={value:null,pE:z,lN:!1}})};e.prototype.Foa=function(e){var z=this,ea={};e.querySelectorAll("pdf-info widget").forEach(function(e){var ca=
parseInt(e.getAttribute("page"),10)-1;z.yF(ea,ca);ea[ca].N5.push(e)});e.querySelectorAll("pdf-info page").forEach(function(e){var ca=parseInt(e.getAttribute("number"),10)-1;z.yF(ea,ca);ea[ca].page=e});this.EY(e).forEach(function(e){var ca=parseInt(e.getAttribute("page"),10),ba=e.getAttribute("name");z.yF(ea,ca);ea[ca].Ho[ba]=e});this.oY(e).forEach(function(e){var ca=parseInt(e.getAttribute("page"),10);e=e.textContent;z.yF(ea,ca);ea[ca].IW[e]=!0});return ea};e.prototype.yF=function(e,ea){e[ea]||(e[ea]=
{Ho:{},IW:{},N5:[],page:null})};return e}();ea.a=ja},512:function(ja,ea,e){var z=e(0),fa=e(1);e.n(fa);ja=function(e){function ea(z){var ba=e.call(this)||this;ba.cha=Array.isArray(z)?z:[z];return ba}Object(z.c)(ea,e);ea.prototype.parse=function(){var e=this,z={Sq:null,rL:null,jy:{},ea:{}};this.cha.forEach(function(y){z=Object(fa.merge)(z,e.TC(y))});return z};ea.prototype.EY=function(e){var z=[];e.querySelectorAll("add > *").forEach(function(e){z.push(e)});e.querySelectorAll("modify > *").forEach(function(e){z.push(e)});
return z};ea.prototype.oY=function(e){return e.querySelectorAll("delete > *")};return ea}(e(501).a);ea.a=ja},513:function(ja,ea,e){var z=e(0);ja=function(e){function ea(z){var ca=e.call(this)||this;ca.dha=z;return ca}Object(z.c)(ea,e);ea.prototype.parse=function(){return this.TC(this.dha)};ea.prototype.EY=function(e){return e.querySelectorAll("annots > *")};ea.prototype.oY=function(){return[]};return ea}(e(501).a);ea.a=ja}}]);}).call(this || window)