!function(e){var t={};function r(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/",r(r.s=14)}([function(e,t){e.exports=require("react")},function(e,t){e.exports=require("react-router-dom")},function(e,t,r){e.exports=r(11)},function(e,t){e.exports=require("redux")},function(e,t){e.exports=require("react-redux")},function(e,t){e.exports=require("react-dom/server")},function(e,t){e.exports=require("express")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("axios")},function(e,t){e.exports=require("fs")},function(e,t){e.exports=require("redux-thunk")},function(e,t){e.exports=require("regenerator-runtime")},function(e,t){e.exports={}},function(e,t){e.exports={}},function(e,t,r){"use strict";r.r(t);var n=r(2),a=r.n(n);function u(e,t,r,n,a,u,o){try{var c=e[u](o),i=c.value}catch(e){return void r(e)}c.done?t(i):Promise.resolve(i).then(n,a)}function o(e){return function(){var t=this,r=arguments;return new Promise((function(n,a){var o=e.apply(t,r);function c(e){u(o,n,a,c,i,"next",e)}function i(e){u(o,n,a,c,i,"throw",e)}c(void 0)}))}}var c=r(0),i=r.n(c),s=r(5),l=r.n(s),p=r(6),f=r.n(p),d=r(1);r(12);var m=function(){return i.a.createElement("div",{className:"Red"},"Red")};var v=function(){return i.a.createElement("div",null,i.a.createElement(m,null))};r(13);var E=function(){return i.a.createElement("div",{className:"Blue"},"Blue")};var b=function(){return i.a.createElement("div",null,i.a.createElement(E,null))};var h=function(e){var t=e.users;return t?i.a.createElement("div",null,i.a.createElement("ul",null,t.map((function(e){return i.a.createElement("li",{key:e.id},i.a.createElement(d.Link,{to:"/users/".concat(e.id)},e.username))})))):null},y=r(4);function O(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function x(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function S(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?x(Object(r),!0).forEach((function(t){O(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):x(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var g=r(8),j=r.n(g),P=function(e){return{type:"users/GET_USERS_FAILURE",payload:e,error:!0}},_={users:null,user:null,loading:{users:!1,user:!1},error:{users:null,user:null}};var w=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:_,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"users/GET_USERS_PENDING":return S({},e,{loading:S({},e.loading,{users:!0})});case"users/GET_USERS_SUCCESS":return S({},e,{users:t.payload,loading:S({},e.loading,{users:!1})});case"users/GET_USERS_FAILURE":return S({},e,{loading:S({},e.loading,{users:!1}),error:S({},e.error,{users:t.payload})});default:return e}},R=Object(c.createContext)(null),k=R,T=function(e){var t=e.resolve,r=Object(c.useContext)(R);return r?(r.done||r.promises.push(Promise.resolve(t())),null):null};var U=Object(y.connect)((function(e){return{users:e.users.users}}),{getUsers:function(){return function(){var e=o(a.a.mark((function e(t){var r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t({type:"users/GET_USERS_PENDING"}),e.next=4,j.a.get("https://jsonplaceholder.typicode.com/users");case 4:r=e.sent,t({type:"users/GET_USERS_SUCCESS",payload:r.data}),e.next=12;break;case 8:throw e.prev=8,e.t0=e.catch(0),t(P(e.t0)),e.t0;case 12:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t){return e.apply(this,arguments)}}()}})((function(e){var t=e.users,r=e.getUsers;return Object(c.useEffect)((function(){t||r()}),[t,r]),i.a.createElement("div",null,i.a.createElement(h,{users:t}),i.a.createElement(T,{resolve:r}))}));var q=function(){return i.a.createElement("div",null,i.a.createElement(U,null))};var D=function(){return i.a.createElement("ul",null,i.a.createElement("li",null,i.a.createElement(d.Link,{to:"/red"},"Red")),i.a.createElement("li",null,i.a.createElement(d.Link,{to:"/blue"},"Blue")),i.a.createElement("li",null,i.a.createElement(d.Link,{to:"/users"},"Users")))};var G=function(){return i.a.createElement("div",null,i.a.createElement(D,null),i.a.createElement("hr",null),i.a.createElement(d.Route,{path:"/red",component:v}),i.a.createElement(d.Route,{path:"/blue",component:b}),i.a.createElement(d.Route,{path:"/users",component:q}))},N=r(7),C=r.n(N),L=r(9),M=r.n(L),A=r(3),I=r(10),B=r.n(I),F=Object(A.combineReducers)({users:w}),J=JSON.parse(M.a.readFileSync(C.a.resolve("./build/asset-manifest.json"),"utf8")),Y=Object.keys(J.files).filter((function(e){return/chunk\.js$/.exec(e)})).map((function(e){return'<script src="'.concat(J.files[e],'"><\/script>')})).join("");function $(e,t){return'<!DOCTYPE html>\n    <html lang="en">\n    <head>\n      <meta charset="utf-8" />\n      <link rel="shortcut icon" href="/favicon.ico" />\n      <meta\n        name="viewport"\n        content="width=device-width,initial-scale=1,shrink-to-fit=no"\n      />\n      <meta name="theme-color" content="#000000" />\n      <title>React App</title>\n      <link href="'.concat(J.files["main.css"],'" rel="stylesheet" />\n    </head>\n    <body>\n      <noscript>You need to enable JavaScript to run this app.</noscript>\n      <div id="root">\n        ').concat(e,"\n      </div>\n      ").concat(t,'\n      <script src="').concat(J.files["runtime-main.js"],'"><\/script>\n      ').concat(Y,'\n      <script src="').concat(J.files["main.js"],'"><\/script>\n    </body>\n    </html>\n      ')}var z=f()(),H=function(){var e=o(a.a.mark((function e(t,r,n){var u,o,c,s,p,f,m;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return u={},o=Object(A.createStore)(F,Object(A.applyMiddleware)(B.a)),c={done:!1,promises:[]},s=i.a.createElement(k.Provider,{value:c},i.a.createElement(y.Provider,{store:o},i.a.createElement(d.StaticRouter,{location:t.url,context:u},i.a.createElement(G,null)))),l.a.renderToStaticMarkup(s),e.prev=5,e.next=8,Promise.all(c.promises);case 8:e.next=13;break;case 10:return e.prev=10,e.t0=e.catch(5),e.abrupt("return",r.status(500));case 13:c.done=!0,p=l.a.renderToString(s),f=JSON.stringify(o.getState()).replace(/</g,"\\u003c"),m="<script>__PRELOADED_STATE__= ".concat(f,"<\/script>"),r.send($(p,m));case 18:case"end":return e.stop()}}),e,null,[[5,10]])})));return function(t,r,n){return e.apply(this,arguments)}}(),K=f.a.static(C.a.resolve("./build"),{index:!1});z.use(K),z.use(H),z.listen(5e3,(function(){console.log("Running on http://localhost:5000")}))}]);