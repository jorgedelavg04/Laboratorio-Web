(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{108:function(e,t,a){e.exports=a.p+"static/media/logo_cdmx.3bc6423b.jpg"},109:function(e,t,a){e.exports=a.p+"static/media/ingenieros.028ae707.jpg"},110:function(e,t,a){e.exports=a.p+"static/media/agua.df76464b.jpg"},111:function(e,t,a){e.exports=a.p+"static/media/titular.e70dd185.jpg"},113:function(e,t,a){e.exports=a.p+"static/media/loading.c5590569.svg"},115:function(e,t,a){e.exports=a(264)},120:function(e,t,a){},264:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(21),l=a.n(c),o=(a(120),a(6)),A=a(7),s=a(9),i=a(8),u=a(267),d=a(268),m=a(266),b=(a(65),a(17)),p=function(){var e=Object(b.b)(),t=e.logout;return e.isAuthenticated&&r.a.createElement("button",{type:"button",class:"btn btn-outline-danger",onClick:function(){return t({returnTo:window.location.origin})}},"Log out")},f=function(){var e=Object(b.b)(),t=e.loginWithRedirect;return!e.isAuthenticated&&r.a.createElement("button",{type:"button",class:"btn btn-outline-secondary",onClick:function(){return t()}},"Log In")},v=a(56),g=a.n(v),h=a(57),E=a.n(h),O=(a(66),function(e){Object(s.a)(a,e);var t=Object(i.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).searchItem=function(e){n.setState({search:e.target.value})},n.state={search:"Que buscamos?"},n}return Object(A.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"navbar-top"},r.a.createElement(u.a,{collapseOnSelect:!0,bg:"light",variant:"dark"},r.a.createElement(u.a.Brand,{href:"/"},r.a.createElement("img",{src:g.a,id:"logo"}),r.a.createElement("img",{src:E.a,id:"logo2"})),r.a.createElement(d.a,{className:"mr-auto"},r.a.createElement(d.a.Link,{href:"/"},"Inicio"),r.a.createElement(d.a.Link,{href:"/user"},"Estad\xedstica"),r.a.createElement(d.a.Link,{href:"/location"},"Ubicaciones")),r.a.createElement(m.a,{inline:!0},r.a.createElement(f,null),r.a.createElement(p,null))))}}]),a}(r.a.Component)),y=a(39),j=a(10),k=(a(67),function(e){Object(s.a)(a,e);var t=Object(i.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(A.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Home..."))}}]),a}(r.a.Component)),C=(r.a.Component,r.a.Component,a(68),a(61)),w=a.n(C),x=a(106),N=a(5),P=a(107),B=a.n(P),L=a(28),q=a.n(L),S=a(108),X=a.n(S),H=a(109),M=a.n(H),z=a(110),R=a.n(z),V=a(111),W=a.n(V),U=a(112),Q=(a(167),a(59),function(e){Object(s.a)(a,e);var t=Object(i.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(A.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"speech-bubble"},B()(this.props.text))}}]),a}(n.Component)),D=function(e){Object(s.a)(a,e);var t=Object(i.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(A.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"speech-bubble-image"},r.a.createElement("img",{src:this.props.src}))}}]),a}(n.Component),G=function(e){Object(s.a)(a,e);var t=Object(i.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(A.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"carousel-container"},r.a.createElement(U.Carousel,{showThumbs:!1,showStatus:!1,infiniteLoop:!0,useKeyboardArrows:!0,autoPlay:!0},r.a.createElement("div",null,r.a.createElement("img",{src:this.props.src1})),r.a.createElement("div",null,r.a.createElement("img",{src:this.props.src2})),r.a.createElement("div",null,r.a.createElement("img",{src:this.props.src3}))))}}]),a}(n.Component),Z=(n.Component,function(e){Object(s.a)(a,e);var t=Object(i.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).handleNewUserMessage=function(t){Object(N.toggleMsgLoader)(),e.sendData(t)},e.handleQuickButtonClicked=function(t){Object(N.addUserMessage)(t),e.handleNewUserMessage(t)},e}return Object(A.a)(a,[{key:"sendData",value:function(){var e=Object(x.a)(w.a.mark((function e(t){return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",q.a.post("http://34.71.9.161:5000/getMessage",{message:t}).then((function(e){var t=e.data.intent,a=e.data.nid,n=e.data.response;if("General_Greetings"===t)Object(N.renderCustomComponent)(G,{src1:X.a,src2:M.a,src3:R.a}),Object(N.renderCustomComponent)(Q,{text:n}),Object(N.renderCustomComponent)(Q,{text:"<p>\xbfEn que puedo ayudarte?</p>"}),Object(N.setQuickButtons)([{label:"Hacer un reporte",value:"Hacer un reporte"},{label:"Nuestras Oficinas",value:"Nuestras Oficinas"},{label:"Realizar Pago",value:"Realizar Pago"}]);else if("ReportarFuga"===t)for(var r in n)Object(N.renderCustomComponent)(Q,{text:n[r]}),Object(N.setQuickButtons)([]);else if("reporte-realizado"===a)for(var c in n)Object(N.renderCustomComponent)(Q,{text:n[c]}),Object(N.setQuickButtons)([{label:"Si",value:"Si"},{label:"No",value:"No"}]);else if("small_talk_duda_generica"===t){for(var l in n)Object(N.renderCustomComponent)(Q,{text:n[l]}),Object(N.setQuickButtons)([]);Object(N.setQuickButtons)([{label:"Hacer un reporte",value:"Hacer un reporte"},{label:"Nuestras Oficinas",value:"Nuestras Oficinas"},{label:"Realizar Pago",value:"Realizar Pago"}])}else if("Oficina"===t)Object(N.renderCustomComponent)(Q,{text:n}),Object(N.setQuickButtons)([{label:"Sobre nosotros",value:"Sobre nosotros"}]);else if("anyelse-info"===a)Object(N.renderCustomComponent)(Q,{text:n}),Object(N.setQuickButtons)([{label:"Nuestro coordinador",value:"Nuestro coordinador"}]);else if("secretario"===a)Object(N.setQuickButtons)([]),Object(N.renderCustomComponent)(D,{src:W.a}),Object(N.renderCustomComponent)(Q,{text:n});else if("pago"===a&&"pago"===t)for(var o in n)Object(N.renderCustomComponent)(Q,{text:n[o]}),Object(N.setQuickButtons)([]);else Object(N.renderCustomComponent)(Q,{text:n}),Object(N.setQuickButtons)([]);Object(N.toggleMsgLoader)()})).catch((function(e){console.log("Error: "+e)})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){return r.a.createElement(N.Widget,{handleNewUserMessage:this.handleNewUserMessage,handleQuickButtonClicked:this.handleQuickButtonClicked,title:"Sistema de Reportes de Agua",subtitle:"CDMX",senderPlaceHolder:"Escribe aqu\xed ..."})}}]),a}(n.Component)),T=a(60),I=a.n(T),J=a(269),F=a(113),Y=a.n(F),K=(n.Component,function(){var e=Object(b.b)(),t=e.user,a=e.isAuthenticated,n=e.loginWithRedirect;return r.a.createElement("div",null,!a&&r.a.createElement("div",{class:"row"},r.a.createElement("div",{class:"col-sm-5"},r.a.createElement("div",{id:"text-reporte"},r.a.createElement("h5",null,"En este sistema podr\xe1s realizar reportes de agua. Adem\xe1s podr\xe1s consultar m\xe1s informaci\xf3n acerca de esta dependencia."),r.a.createElement("h6",null,"Para ingresar, da clic en el siguiente bot\xf3n:"),r.a.createElement("button",{type:"button",class:"btn btn-outline-secondary",onClick:function(){return n()}},"Log In / Sign Up"))),r.a.createElement("div",{class:"col-sm-7"},r.a.createElement(J.a,{id:"card",className:"text-center"},r.a.createElement(J.a.Body,null,r.a.createElement(J.a.Text,null,r.a.createElement(y.b,{to:"./location.html"},"TEST"),r.a.createElement("h2",{className:"bienvenido"},"Bienvenido al Sistema de Reportes de Agua de la CDMX"))),r.a.createElement(J.a.Img,{variant:"bottom",id:"imagen_cuidate",src:I.a})))),a&&r.a.createElement("div",null,r.a.createElement("br",null),r.a.createElement("div",{class:"container"},r.a.createElement("div",{class:"row",id:"reporte-dentro-signin"},r.a.createElement("div",{class:"col-md-2",id:"bienvenida-foto"},r.a.createElement("img",{src:t.picture,alt:t.name})),r.a.createElement("div",{class:"col-md-3",id:"bienvenida-nombre"},r.a.createElement("div",{class:"row",id:"bienvenido"},r.a.createElement("h2",null,"Bienvenido, ")),r.a.createElement("div",{class:"row",id:"nombree"},r.a.createElement("h1",null,t.given_name)),r.a.createElement("div",{class:"row",id:"logout-dentro"},r.a.createElement("h6",null,"Para cerrar sesi\xf3n, da clic en el siguiente bot\xf3n"),r.a.createElement(p,null))),r.a.createElement("div",{class:"col-md-7"},r.a.createElement("h2",null,"Con tu asistente virtual puedes realizar las siguientes funcionalidades: "),r.a.createElement("ul",{class:"list-group"},r.a.createElement("li",{class:"list-group-item"},r.a.createElement("h5",null,"1. Realiza tu reporte")),r.a.createElement("li",{class:"list-group-item"},r.a.createElement("h5",null,"2. Obten informaci\xf3n sobre esta dependencia")),r.a.createElement("li",{class:"list-group-item"},r.a.createElement("h5",null,"3. Ir a la liga de pago")),r.a.createElement("li",{class:"list-group-item"},r.a.createElement("h5",null,"4. Informaci\xf3n sobre COVID-19")),r.a.createElement("li",{class:"list-group-item"},r.a.createElement("h5",null,"5. \xa1Descubre m\xe1s conversando con \xe9l!")))))),r.a.createElement(Z,null)))}),_=function(){return r.a.createElement("div",{className:"container"},r.a.createElement("div",null,r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("iframe",{id:"serviceFrameSend",src:"./location.html",width:"1000",height:"1000",frameborder:"0"})))},$=function(e){Object(s.a)(a,e);var t=Object(i.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).searchItem=function(e){n.setState({search:e.target.value})},n.state={search:"Que buscamos?"},n}return Object(A.a)(a,[{key:"render",value:function(){return r.a.createElement("footer",null,r.a.createElement("div",{className:"inside_footer"},r.a.createElement(u.a,{color:"dark",dark:!0},r.a.createElement(u.a,{bg:"light",variant:"dark"},r.a.createElement(u.a.Brand,null,r.a.createElement("h6",{className:"text-secondary"},"Copyright 2020, Gobierno de la Ciudad de M\xe9xico"))))))}}]),a}(r.a.Component),ee=a(42),te=function(e){Object(s.a)(a,e);var t=Object(i.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={intents_used:"",number_widget:"",number_whats:"",number_reports:"",number_others:""},e}return Object(A.a)(a,[{key:"componentDidMount",value:function(){var e=this;q.a.get("http://34.71.9.161:5000/getStatistics").then((function(t){var a=t.data.intents_used,n=t.data.number_whats,r=t.data.number_widget,c=t.data.numero_reportes,l=t.data.numero_otros;e.setState({intents_used:a,number_whats:n,number_widget:r,number_reports:c,number_others:l})}))}},{key:"render",value:function(){var e=Object.keys(this.state.intents_used),t=Object.values(this.state.intents_used);return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row mb-30"},r.a.createElement("div",{id:"top_e",className:"col-sm-12 col-lg-12 col-xl-7"},r.a.createElement("h2",{className:"top_experiencias"},"Estad\xedstica"))),r.a.createElement("div",{className:"row mb-30"},r.a.createElement("div",{id:"top_e",className:"col-sm-6 col-lg-6 col-xl-6 "},r.a.createElement("h5",{className:"top_experiencias"},"% Conversaciones por Whats App y Widget"),r.a.createElement(ee.Doughnut,{data:{labels:["Whats App","Widget"],datasets:[{label:"Intents",backgroundColor:["rgba(39,139,28,0.91)","#001724"],hoverBackgroundColor:["rgba(39,139,28,0.61)","#455A64"],data:[this.state.number_whats,this.state.number_widget]}]}})),r.a.createElement("div",{id:"top_e",className:"col-sm-6 col-lg-6 col-xl-6"},r.a.createElement("h5",{className:"top_experiencias"},"Numero de reportes"),r.a.createElement(ee.Doughnut,{data:{labels:["Total Reportes","Otras experiencias"],datasets:[{label:"Intents",backgroundColor:["rgba(39,139,28,0.91)","#001724"],hoverBackgroundColor:["rgba(39,139,28,0.61)","#455A64"],data:[this.state.number_reports,this.state.number_others]}]}}))),r.a.createElement("div",{id:"last_bar",className:"row mb-30"},r.a.createElement("div",{id:"top_e",className:"col-sm-12 col-lg-12 col-xl-7"},r.a.createElement("h5",{className:"top_experiencias"},"Top ",e.length," de Experiencias"),r.a.createElement(ee.HorizontalBar,{width:100,height:60,data:{labels:e,datasets:[{label:"Intents",backgroundColor:"rgba(39,139,28,0.91)",borderColor:"rgba(15,55,11,0.91)",borderWidth:2,hoverBackgroundColor:"rgba(39,139,28,0.4)",hoverBorderColor:"rgba(5,55,11,0.37)",data:t}]},options:{scales:{xAxes:[{ticks:{beginAtZero:!0,min:0}}]}}}))))}}]),a}(r.a.Component),ae=function(e){Object(s.a)(a,e);var t=Object(i.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(A.a)(a,[{key:"render",value:function(){return r.a.createElement(y.a,null,r.a.createElement(O,null),r.a.createElement(j.c,null,r.a.createElement(j.a,{exact:!0,path:"/"},r.a.createElement(K,null)),r.a.createElement(j.a,{path:"/home"},r.a.createElement(k,null)),r.a.createElement(j.a,{path:"/user"},r.a.createElement(te,null)),r.a.createElement(j.a,{path:"/location"},r.a.createElement(_,null))),r.a.createElement($,null))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(b.a,{domain:"dev-inr1r7ln.us.auth0.com",clientId:"Q0qV3Qk9qBR2uxqWHGIjKulwQDHjTKAc",redirectUri:window.location.origin},r.a.createElement(ae,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},56:function(e,t,a){e.exports=a.p+"static/media/Logo_CDMX.7f4421c9.png"},57:function(e,t){e.exports="data:image/png;base64,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"},60:function(e,t,a){e.exports=a.p+"static/media/cuidate_cdmx.9b386af2.jpeg"},66:function(e,t,a){},68:function(e,t,a){}},[[115,1,2]]]);
//# sourceMappingURL=main.f9df310a.chunk.js.map