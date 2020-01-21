(window["webpackJsonpreef-log"]=window["webpackJsonpreef-log"]||[]).push([[0],{117:function(e,t,a){e.exports=a(191)},122:function(e,t,a){},140:function(e,t){},142:function(e,t){},190:function(e,t,a){},191:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(25),o=a.n(c),l=(a(122),a(44)),i=a(4),s=a.n(i),u=a(13),m=a(9),p=a(16),d=a(27),f=a(45),h=a.n(f),b=a(23),v=a(24),g=a(104),E=a(105),y=a(114),O=a(106),j=a(115),w=a(11),k=function(e){function t(e){var a;return Object(g.a)(this,t),(a=Object(y.a)(this,Object(O.a)(t).call(this,e))).chartContainer=r.a.createRef(),a}return Object(j.a)(t,e),Object(E.a)(t,[{key:"componentDidMount",value:function(){var e=this.props.data,t=Object.keys(e.ramp.colors).map(function(t){return{name:t,values:e.ramp.colors[t].point.map(function(e){return{intensity:parseInt(e.intensity._text),time:parseInt(e.time._text)}})}});if(e){w.f(this.chartContainer.current).select("svg").remove();var a=this.chartContainer.current,n=a.offsetWidth,r=a.offsetHeight,c={top:35,right:30,bottom:60,left:26},o=n-c.left-c.right,l=r-c.top-c.bottom,i=[0,240,480,720,960,1200,1440],s=w.e().domain([0,1439]).range([0,o]),u=w.e().domain([0,2e3]).range([l,0]),m=w.c().x(function(e){return s(parseInt(e.time))}).y(function(e){return u(parseInt(e.intensity))}),p=w.f(this.chartContainer.current).append("svg").attr("width",o+c.left+c.right).attr("height",l+c.top+c.bottom).append("g").attr("transform","translate("+c.left+","+c.top+")"),d=w.a(s).tickValues(i).tickSize(0).tickFormat(function(e){return 0===e||1440===e?"12AM":720===e?"12AM":e>720?"".concat((e-720)/60,"PM"):"".concat(e/60,"AM")});p.append("g").attr("class","x axis").attr("transform","translate(0,"+l+")").call(d).selectAll("text").attr("dy","1.5em"),p.append("g").attr("class","x axis").attr("transform","translate(0,-50)").call(d).call(function(e){return e.select(".domain").remove()}).selectAll("text").attr("dy","1.5em"),p.append("g").attr("class","grid").attr("transform","translate(0,"+l+")").call(w.a(s).tickValues(i).tickSize(-l).tickFormat("")).call(function(e){return e.select(".domain").remove()}),p.append("g").attr("class","grid").call(w.b(u).tickValues([0,500,1e3,1500,2e3]).tickSize(-o).tickFormat("")).call(function(e){return e.select(".domain").remove()}),t.forEach(function(e){p.append("path").datum(e.values).attr("class","line ".concat(e.name)).attr("d",m)});var f=t[0].values.map(function(e){return e.time});p.selectAll(".dot").data(f).enter().append("circle").attr("class","dot").attr("cx",function(e){return s(e)}).attr("cy",l+20).attr("r",5),p.append("path").attr("class","mouse-line").style("stroke","black").style("stroke-width","1px").style("opacity","0"),p.append("rect").attr("width",o).attr("height",l).attr("fill","none").attr("pointer-events","all").on("mouseout",function(){w.f(".mouse-line").style("opacity","0"),w.g(".mouse-per-line circle").style("opacity","0"),w.g(".mouse-per-line text").style("opacity","0")}).on("mouseover",function(){w.f(".mouse-line").style("opacity","1"),w.g(".mouse-per-line circle").style("opacity","1"),w.g(".mouse-per-line text").style("opacity","1")}).on("mousemove",function(){var e=w.d(this);w.f(".mouse-line").attr("d",function(){var t="M"+e[0]+","+l;return t+=" "+e[0]+",0"});var t=document.getElementsByClassName("line");w.g(".mouse-per-line").attr("transform",function(a,n){for(var r,c=0,o=t[n].getTotalLength(),l=null;l=Math.floor((c+o)/2),r=t[n].getPointAtLength(l),l!==o&&l!==c||r.x===e[0];)if(r.x>e[0])o=l;else{if(!(r.x<e[0]))break;c=l}return w.f(this).select("text").text(u.invert(r.y).toFixed(2)),"translate("+e[0]+","+r.y+")"})}),p.selectAll(".mouse-per-line").data(t).enter().append("g").attr("class","mouse-per-line").append("circle").attr("r",7).attr("class",function(e){return e.name}).style("fill","none").style("stroke-width","1px").style("opacity","0")}}},{key:"render",value:function(){this.props.filename;return r.a.createElement("div",{className:"chart-container"},r.a.createElement("div",{className:"chart",ref:this.chartContainer}))}}]),t}(r.a.Component),x=function(e){var t=e.profile;return r.a.createElement("div",{className:"card profile-card",style:{width:"18rem"}},r.a.createElement("div",{className:"card-img-top"},r.a.createElement(k,{data:t.settings})),r.a.createElement("div",{className:"card-body"},r.a.createElement("h5",{className:"card-title"},t.title),r.a.createElement("p",{className:"card-text"},r.a.createElement(b.a,{icon:v.d})," ",t.username,"\xa0",r.a.createElement(b.a,{icon:v.a})," ",h()(t.updatedAt).fromNow()),r.a.createElement(p.b,{to:"/".concat(t.username,"/profile/").concat(t._id),className:"btn btn-secondary"},"View Profile")))},N=function(e){var t,a=e.recentlyAdded;return a&&(t=a.map(function(e,t){return r.a.createElement(x,{key:t,profile:e})})),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"hero-container"},r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-12 col-md-6 hero"},r.a.createElement("h1",null,"Reef Light Profiles"),r.a.createElement("p",null,"A place to find and share light programs for your reef aquarium."),r.a.createElement("div",{className:"btn btn-primary"},"Sign Up")),r.a.createElement("div",{className:"col-12 col-md-6 hero-image "},r.a.createElement("img",{src:"images/chart.png"}))))),r.a.createElement("div",{className:"container recently-added"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-9"},r.a.createElement("h4",null," Recently Added Profiles "),t))))},P=function(e){var t=e.setUsername,a=e.getTokenSilently,c=e.loading,o=e.username,l=Object(n.useState)(!1),i=Object(m.a)(l,2),p=i[0],f=i[1];return Object(n.useEffect)(function(){function e(){return(e=Object(u.a)(s.a.mark(function e(){var n;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(c){e.next=6;break}return e.next=3,a();case 3:return n=e.sent,e.next=6,fetch("/api/user",{headers:{Authorization:"Bearer ".concat(n)}}).then(function(e){return e.json()}).then(function(e){e.error&&f(!0),t(e.username)});case 6:case"end":return e.stop()}},e)}))).apply(this,arguments)}!function(){e.apply(this,arguments)}()},[c,a]),p?r.a.createElement(d.a,{to:"/create-username"}):o?r.a.createElement(d.a,{to:"/dashboard"}):r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,"Authenticated"))},S=a(133),C=function(e){return e.ramp.header.checksum=function(e){var t=S.parse("ramp",e.ramp).match(/(<colors>[\0-\uFFFF]+?<\/colors>)/gm)[0].replace(/(\r\n|\n|\r|\s+)/gm,""),a=0;if(0!==t.length){for(var n=0;n<t.length;n+=1){a=(a<<5)-a+t.charCodeAt(n),a&=4294967295}return a<0&&(a=~a),a}}(e),S.parse("ramp",e.ramp)},A=function(e){var t=e.match.params._id,a=r.a.useState(!1),n=Object(m.a)(a,2),c=(n[0],n[1]),o=r.a.useState({}),l=Object(m.a)(o,2),i=l[0],p=l[1];r.a.useEffect(function(){function e(){return(e=Object(u.a)(s.a.mark(function e(){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/profile/".concat(t,"/"));case 2:e.sent.json().then(function(e){return p(e)}).catch(function(e){return c(e)});case 4:case"end":return e.stop()}},e)}))).apply(this,arguments)}!function(){e.apply(this,arguments)}()},[t]);var d=i.title,f=i.description,g=i.settings;return r.a.createElement("div",{className:"container content"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-4"},r.a.createElement("div",{className:"title-block"},r.a.createElement("h2",null,d),r.a.createElement(b.a,{icon:v.d})," ",i.username,"\xa0 \xa0 \xa0",r.a.createElement(b.a,{icon:v.a})," ",h()(i.updatedAt).fromNow()),r.a.createElement("div",{className:"content-block"},r.a.createElement("h5",null," Description "),f),r.a.createElement("div",{className:"content-block"},r.a.createElement("div",{className:"btn btn-primary",onClick:function(){var e=C(g),t=document.createElement("a"),a=new Blob([e],{type:"text/plain"});t.setAttribute("href",window.URL.createObjectURL(a)),t.setAttribute("download","settings.aip"),t.dataset.downloadurl=["text/plain",t.download,t.href].join(":"),t.draggable=!0,t.classList.add("dragout"),t.click()}},"Download .aip"))),r.a.createElement("div",{className:"col-8"},r.a.createElement("h4",null,"Preview"),g&&r.a.createElement(k,{filename:"foo",data:g}))))},D=a(108),R=a.n(D),I=a(113);function T(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}var F={flex:1,display:"flex",flexDirection:"column",alignItems:"center",padding:"50px",borderWidth:2,borderRadius:18,borderColor:"rgb(179, 179, 179)",borderStyle:"dashed",backgroundColor:"#fafafa",color:"rgb(179, 179, 179)",outline:"none",transition:"border .24s ease-in-out"},U={borderColor:"#2196f3"},B={borderColor:"#00e676"},L={borderColor:"#ff1744"},W=function(e){var t=Object(n.useCallback)(function(t){var a=new FileReader;a.onabort=function(){return console.log("file reading was aborted")},a.onerror=function(){return console.log("file reading has failed")},a.onload=function(){var n=a.result;e.onFileParse(n,t[0].name)},t.forEach(function(e){return a.readAsBinaryString(e)})},[]),a=Object(I.a)({multiple:!1,onDrop:t}),c=a.getRootProps,o=a.getInputProps,i=a.isDragActive,s=a.isDragAccept,u=a.isDragReject,m=Object(n.useMemo)(function(){return function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?T(a,!0).forEach(function(t){Object(l.a)(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):T(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}({},F,{},i?U:{},{},s?B:{},{},u?L:{})},[i,u]);return r.a.createElement("section",null,r.a.createElement("div",c({className:"dropzone",style:m}),r.a.createElement("input",o()),r.a.createElement("p",null,"Drag and drop a .aip file here, or click to select one")))},_=Object(d.g)(function(e){var t=e.saveProfile,a=e.username,n=r.a.useState(""),c=Object(m.a)(n,2),o=c[0],l=c[1],i=r.a.useState(""),p=Object(m.a)(i,2),d=p[0],f=p[1],h=r.a.useState(null),b=Object(m.a)(h,2),v=b[0],g=b[1],E=function(e){var t=e.target,a=t.id,n=t.value;"title"===a&&l(n),"description"===a&&f(n)},y=function(){var n=Object(u.a)(s.a.mark(function n(){var r,c,l;return s.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return r={title:o,description:d,settings:v},n.next=3,t(r);case 3:c=n.sent,l=c._id,e.history.push("/".concat(a,"/profile/").concat(l));case 6:case"end":return n.stop()}},n)}));return function(){return n.apply(this,arguments)}}(),O=o&&d&&v;return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-8"},r.a.createElement("h2",null,"New Light Profile"),r.a.createElement("p",null,"Enter a title and description, then drag in your .aip file below."),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{for:"title"},"Title"),r.a.createElement("input",{type:"text",className:"form-control",id:"title",placeholder:"Enter a title for this profile",value:o,onChange:E})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{for:"description"},"Description"),r.a.createElement("textarea",{className:"form-control",id:"description",rows:"3",value:d,onChange:E}))),r.a.createElement("div",{className:"col-4"},r.a.createElement("button",{type:"button",className:"publish-btn btn btn-primary btn-lg",onClick:y,disabled:!O},"Publish Profile"))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-12"},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{for:"exampleFormControlTextarea1"},"Light Settings ",v&&r.a.createElement("span",{className:"small link-like",onClick:function(){g(null)}},"reset")),v?r.a.createElement(k,{filename:"foo",data:v}):r.a.createElement(W,{onFileParse:function(e,t){return function(e,t){var a=R.a.xml2js(e,{compact:!0});g(a)}(e)}})))))}),z=function(e){var t=e.username,a=e.profiles,n=r.a.createElement("p",null,"No Profiles");return a&&(n=a.map(function(e,t){return r.a.createElement(x,{key:t,profile:e})})),r.a.createElement("div",{className:"container"},r.a.createElement("h3",null,"Dashboard for ",t),r.a.createElement("h5",null,"Your Lighting Profiles"),r.a.createElement("div",{className:"d-flex justify-content-around"},n),r.a.createElement(p.b,{to:"/new"},"Add a new lighting profile"))},M=function(){return r.a.createElement("div",{className:"container"},"UserPage")},J=Object(d.g)(function(e){var t=e.getTokenSilently,a=(e.setUsername,r.a.useState("")),n=Object(m.a)(a,2),c=n[0],o=n[1],l=r.a.useState(""),i=Object(m.a)(l,2),p=i[0],d=i[1],f=function(){var a=Object(u.a)(s.a.mark(function a(){var n;return s.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,t();case 2:return n=a.sent,a.next=5,fetch("/api/user",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(n)},body:JSON.stringify({username:c})}).then(function(e){return e.json()}).then(function(t){t.error&&d(t.error),t.user&&e.updateUsername(t.user),e.history.push("/")});case 5:case"end":return a.stop()}},a)}));return function(){return a.apply(this,arguments)}}();return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"col-12 col-md-6 offset-md-3"},r.a.createElement("p",null,"Please create a username before continuing"),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{forhtml:"username"},"Username"),r.a.createElement("input",{type:"text",className:"form-control",value:c,id:"username","aria-describedby":"usernameError",placeholder:"Enter a username",onChange:function(e){o(e.target.value)}}),p&&r.a.createElement("small",{id:"usernameError",class:"form-text text-muted text-danger"},p)),r.a.createElement("button",{type:"submit",className:"btn btn-primary",onClick:f},"Submit")))}),V=a(38),q=a.n(V),H=a(32),Y=a.n(H),G=a(73),$=a.n(G),K=function(e){var t=e.user,a=e.username,n=(e.isAuthenticated,e.loginWithRedirect),c=e.logout,o=null;return o=t?r.a.createElement(r.a.Fragment,null,r.a.createElement(Y.a.Item,null,r.a.createElement(p.b,{to:"/dashboard",className:"nav-link"},"Dashboard")),r.a.createElement(Y.a.Item,null,r.a.createElement(p.b,{to:"/".concat(a),className:"nav-link"},r.a.createElement(b.a,{icon:v.d})," ",t.nickname)),r.a.createElement($.a,{title:r.a.createElement(b.a,{icon:v.b}),id:"collasible-nav-dropdown"},r.a.createElement($.a.Item,{onClick:function(){c()}},"Sign Out"))):r.a.createElement(r.a.Fragment,null,r.a.createElement(Y.a.Item,null,r.a.createElement(Y.a.Link,{href:"/",onClick:function(){n({redirect_uri:"http://localhost:3000/dashboard"})}},"Sign In"))),r.a.createElement(q.a,{className:"navbar navbar-expand-lg"},r.a.createElement(q.a.Brand,null,r.a.createElement(p.b,{to:"/",className:"nav-link"},r.a.createElement(b.a,{icon:v.c})," Reef Light Profiles")),r.a.createElement(q.a.Toggle,{"aria-controls":"responsive-navbar-nav"}),r.a.createElement(q.a.Collapse,{id:"responsive-navbar-nav"},r.a.createElement(Y.a,{className:"ml-auto"},o)))},Q=a(111),X=a(112),Z=a.n(X),ee=function(){return window.history.replaceState({},document.title,window.location.pathname)},te=r.a.createContext();function ae(e){return ne.apply(this,arguments)}function ne(){return(ne=Object(u.a)(s.a.mark(function e(t){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",fetch("/api/user",{headers:{Authorization:"Bearer ".concat(t)}}).then(function(e){return e.json()}));case 1:case"end":return e.stop()}},e)}))).apply(this,arguments)}function re(){return(re=Object(u.a)(s.a.mark(function e(){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",fetch("/api/recently-added").then(function(e){return e.json()}));case 1:case"end":return e.stop()}},e)}))).apply(this,arguments)}function ce(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function oe(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?ce(a,!0).forEach(function(t){Object(l.a)(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):ce(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}console.log("BUILDING process.env",Object({NODE_ENV:"production",PUBLIC_URL:""}));var le=function(e){var t=Object(n.useContext)(te),a=(t.loading,t.user),c=t.loginWithRedirect,o=t.logout,l=t.getTokenSilently,i=Object(n.useState)({}),f=Object(m.a)(i,2),h=f[0],b=f[1],v=function(){var e=Object(u.a)(s.a.mark(function e(t){var a;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l();case 2:return a=e.sent,e.abrupt("return",fetch("http://localhost:3000/api/profile",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(a)},body:JSON.stringify(t)}).then(function(e){return e.json()}));case 4:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}();return Object(n.useEffect)(function(){a&&(h.username||function(){var e=Object(u.a)(s.a.mark(function e(){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l();case 2:ae(e.sent).then(function(e){e.error;var t=e.username,a=e.profiles;b(oe({},h,{username:t,profiles:a}))});case 4:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}()())},[a]),Object(n.useEffect)(function(){h.recentlyAdded||function(){return re.apply(this,arguments)}().then(function(e){e.error,b(oe({},h,{recentlyAdded:e}))})}),r.a.createElement("div",{className:"App"},r.a.createElement(p.a,null,r.a.createElement(K,{user:a,username:h.username,loginWithRedirect:c,logout:o}),r.a.createElement("div",{className:"content"},r.a.createElement(d.d,null,r.a.createElement(d.b,{exact:!0,path:"/"},r.a.createElement(N,{recentlyAdded:h.recentlyAdded})),r.a.createElement(d.b,{path:"/new"},r.a.createElement(_,{username:h.username,saveProfile:v})),r.a.createElement(d.b,{path:"/authenticate",render:function(){return r.a.createElement(P,null)}}),r.a.createElement(d.b,{path:"/dashboard"},r.a.createElement(z,{user:a,username:h.username,profiles:h.profiles})),r.a.createElement(d.b,{path:"/create-username"},r.a.createElement(J,null)),r.a.createElement(d.b,{path:"/:username/profile/:_id",component:A}),r.a.createElement(d.b,{path:"/:username",component:M})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(189),a(190);var ie=a(46);o.a.render(r.a.createElement(function(e){var t=e.children,a=e.onRedirectCallback,c=void 0===a?ee:a,o=Object(Q.a)(e,["children","onRedirectCallback"]),l=Object(n.useState)(),i=Object(m.a)(l,2),p=i[0],d=i[1],f=Object(n.useState)(),h=Object(m.a)(f,2),b=h[0],v=h[1],g=Object(n.useState)(),E=Object(m.a)(g,2),y=E[0],O=E[1],j=Object(n.useState)(!0),w=Object(m.a)(j,2),k=w[0],x=w[1],N=Object(n.useState)(!1),P=Object(m.a)(N,2),S=P[0],C=P[1];Object(n.useEffect)(function(){(function(){var e=Object(u.a)(s.a.mark(function e(){var t,a,n,r,l;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Z()(o);case 2:if(t=e.sent,O(t),!window.location.search.includes("code=")){e.next=10;break}return e.next=7,t.handleRedirectCallback();case 7:a=e.sent,n=a.appState,c(n);case 10:return e.next=12,t.isAuthenticated();case 12:if(r=e.sent,d(r),!r){e.next=19;break}return e.next=17,t.getUser();case 17:l=e.sent,v(l);case 19:x(!1);case 20:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}})()()},[]);var A=function(){var e=Object(u.a)(s.a.mark(function e(){var t,a,n=arguments;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.length>0&&void 0!==n[0]?n[0]:{},C(!0),e.prev=2,e.next=5,y.loginWithPopup(t);case 5:e.next=10;break;case 7:e.prev=7,e.t0=e.catch(2),console.error(e.t0);case 10:return e.prev=10,C(!1),e.finish(10);case 13:return e.next=15,y.getUser();case 15:a=e.sent,v(a),d(!0);case 18:case"end":return e.stop()}},e,null,[[2,7,10,13]])}));return function(){return e.apply(this,arguments)}}(),D=function(){var e=Object(u.a)(s.a.mark(function e(){var t;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return x(!0),e.next=3,y.handleRedirectCallback();case 3:return e.next=5,y.getUser();case 5:t=e.sent,x(!1),d(!0),v(t);case 9:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}();return r.a.createElement(te.Provider,{value:{isAuthenticated:p,user:b,loading:k,popupOpen:S,loginWithPopup:A,handleRedirectCallback:D,getIdTokenClaims:function(){return y.getIdTokenClaims.apply(y,arguments)},loginWithRedirect:function(){return y.loginWithRedirect.apply(y,arguments)},getTokenSilently:function(){return y.getTokenSilently.apply(y,arguments)},getTokenWithPopup:function(){return y.getTokenWithPopup.apply(y,arguments)},logout:function(){return y.logout.apply(y,arguments)}}},t)},{domain:ie.domain,client_id:ie.clientId,redirect_uri:"http://localhost:3000/dashboard",audience:ie.audience},r.a.createElement(le,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},46:function(e){e.exports=JSON.parse('{"domain":"reef-profiles.auth0.com","clientId":"4VbRJ3lroYHhWBN7vq5eSEqS643xlqBE","audience":"https://localhost:3000"}')}},[[117,1,2]]]);
//# sourceMappingURL=main.a9bc89dd.chunk.js.map