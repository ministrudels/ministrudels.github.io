(this["webpackJsonpministrudels.github.io"]=this["webpackJsonpministrudels.github.io"]||[]).push([[0],{202:function(t,e,n){},216:function(t,e,n){"use strict";n.r(e);var a=n(0),i=n.n(a),r=n(26),c=n.n(r),s=(n(202),n(105)),o=n(9),l=n(248),j=n(242),d=n(237),b=n(239),h=n(240),u=n(241),m=n(219),x=n(103),O=n.n(x),f=n(104),g=n.n(f),v=n.p+"static/media/observablehq-logo.8471f109.svg",p=n(2),y=Object(d.a)((function(t){return{toolbar:{overflowX:"auto",borderBottom:"1px solid ".concat(t.palette.divider)},toolbarLink:{padding:t.spacing(1),flexShrink:0},rightToolbar:{margin:"auto",marginRight:12}}}));function w(t){var e=y(),n=t.sections;return Object(p.jsx)(p.Fragment,{children:Object(p.jsxs)(b.a,{disableGutters:!0,variant:"dense",className:e.toolbar,children:[n.map((function(t){return Object(p.jsx)(h.a,{color:t.url===window.location.pathname?"primary":"inherit",noWrap:!0,variant:"body2",href:t.url,className:e.toolbarLink,children:t.title},t.title)})),Object(p.jsx)("section",{className:e.rightToolbar,children:Object(p.jsxs)(u.a,{variant:"text",size:"small","aria-label":"small outlined button group",children:[Object(p.jsx)(m.a,{href:"https://observablehq.com/@minimumness",children:Object(p.jsx)("img",{src:v,alt:""})}),Object(p.jsx)(m.a,{href:"https://github.com/ministrudels",children:Object(p.jsx)(O.a,{})}),Object(p.jsx)(m.a,{href:"https://www.linkedin.com/in/huanmingan/",children:Object(p.jsx)(g.a,{})})]})})]})})}var C=n(218);function S(){return Object(p.jsxs)(C.a,{variant:"body2",color:"textSecondary",children:["Copyright \xa9 ",Object(p.jsx)(h.a,{color:"inherit",children:"Huan Min Gan"})," ",(new Date).getFullYear(),"."]})}var I=Object(d.a)((function(t){return{root:{display:"flex",flexDirection:"column",minHeight:"100vh"},main:{marginTop:t.spacing(8),marginBottom:t.spacing(2)},footer:{padding:t.spacing(3,2),marginTop:"auto",backgroundColor:"light"===t.palette.type?t.palette.grey[200]:t.palette.grey[800]}}}));function k(){var t=I();return Object(p.jsx)("div",{className:t.root,children:Object(p.jsx)("footer",{className:t.footer,children:Object(p.jsx)(j.a,{maxWidth:"sm",children:Object(p.jsx)(S,{})})})})}var D=n(244),M=n(247),B=n(15),L=n(246),F=n(250),T=n(63),E=n.n(T),R=n(62),H=n.n(R),P=n(251),W=n(243),A=n(245),G=n(252),N=function(t){return new Intl.DateTimeFormat("en-GB",{dateStyle:"long"}).format(t)};function q(t){var e=t.title,n=t.date,a=t.tags,i=t.children;return Object(p.jsxs)(P.a,{variant:"outlined",children:[Object(p.jsxs)(W.a,{children:[Object(p.jsxs)(D.a,{container:!0,justify:"space-between",children:[Object(p.jsx)(D.a,{item:!0,children:Object(p.jsx)(C.a,{gutterBottom:!0,variant:"h5",children:e})}),Object(p.jsx)(D.a,{item:!0,children:Object(p.jsx)(C.a,{color:"textSecondary",children:N(n)})})]}),i]}),Object(p.jsx)(A.a,{children:null===a||void 0===a?void 0:a.map((function(t){return Object(p.jsx)(G.a,{label:t},t)}))})]})}var J=n(18),V=10,U=200,X=200;function Y(){var t=Object(a.useState)(0),e=Object(B.a)(t,2),n=e[0],i=e[1],r=Object(a.useState)(0),c=Object(B.a)(r,2),s=c[0],o=c[1],l=Object(a.useState)(null),j=Object(B.a)(l,2),d=j[0],b=j[1],h=Object(a.useState)(null),u=Object(B.a)(h,2),m=u[0],x=u[1],O=Object(a.useRef)(null);return Object(a.useEffect)((function(){J.f(O.current).attr("viewBox","".concat([0,0,X,U])).append("g").attr("transform","translate(".concat(V,",").concat(V,")")).append("circle").attr("r",V)}),[]),Object(a.useEffect)((function(){J.f(O.current).selectAll("circle").transition().duration(1e3).ease(J.a).attr("cx",n).attr("cy",s)}),[n,s]),Object(p.jsxs)(q,{title:"Slider and Ball",date:new Date("6 28 2021"),tags:["d3","d3-transition","setInterval"],children:[Object(p.jsxs)(D.a,{container:!0,spacing:2,alignItems:"center",children:[Object(p.jsx)(D.a,{item:!0,children:Object(p.jsx)(C.a,{variant:"body1",children:"X Pos"})}),Object(p.jsx)(D.a,{item:!0,children:Object(p.jsx)(L.a,{onClick:function(t){d?(clearInterval(d),b(null)):b(window.setInterval((function(){return i(181*Math.random())}),2e3))},children:d?Object(p.jsx)(H.a,{}):Object(p.jsx)(E.a,{})})}),Object(p.jsx)(D.a,{item:!0,xs:!0,children:Object(p.jsx)(F.a,{track:!1,value:n,min:0,max:180,onChange:function(t,e){d&&(clearInterval(d),b(null)),i(e)}})})]}),Object(p.jsxs)(D.a,{container:!0,spacing:2,alignItems:"center",children:[Object(p.jsx)(D.a,{item:!0,children:Object(p.jsx)(C.a,{variant:"body1",children:"Y Pos"})}),Object(p.jsx)(D.a,{item:!0,children:Object(p.jsx)(L.a,{onClick:function(t){m?(clearInterval(m),x(null)):x(window.setInterval((function(){return o(181*Math.random())}),2e3))},children:m?Object(p.jsx)(H.a,{}):Object(p.jsx)(E.a,{})})}),Object(p.jsx)(D.a,{item:!0,xs:!0,children:Object(p.jsx)(F.a,{track:!1,value:s,min:0,max:180,onChange:function(t,e){m&&(clearInterval(m),b(null)),o(e)}})})]}),Object(p.jsx)("div",{style:{height:U,width:X,border:"solid",borderRadius:2,borderWidth:1,borderColor:"gray",display:"block",margin:"auto"},children:Object(p.jsx)("svg",{width:"100%",height:"100%",ref:O})})]})}function z(){return Object(p.jsx)(q,{title:"Malaysia's COVID Vaccination",date:new Date("7 6 2021"),tags:["d3","observablehq"],children:Object(p.jsx)("iframe",{title:"Malaysia's Covid Vaccination",width:"100%",height:"1313",style:{border:"none"},src:"https://observablehq.com/embed/@minimumness/malaysias-covid-vaccination-progress?cells=description%2Ctitle1%2Ckey%2Cviewof+selectedData%2Ctitle2%2CbyState"})})}var K=n(249),Q=600,Z=1,$=3,_=Q/($+Z);function tt(){var t=Object(a.useState)(12e3),e=Object(B.a)(t,2),n=e[0],i=e[1],r=Object(a.useRef)(null);return Object(a.useEffect)((function(){J.f("#canvasContainer").append("custom")}),[]),Object(a.useEffect)((function(){var t,e=J.d(n),a=J.e(J.b(e),J.c);J.f("custom").selectAll(".rect").data(e,(function(t){return"".concat(t)})).join((function(t){return t.append("custom").attr("class","rect").attr("x",(function(t,e){return e%_*($+Z)})).attr("y",(function(t,e){return Math.floor(e/_)*($+Z)})).attr("width",(function(t,e){return $})).attr("height",(function(t,e){return $})).attr("fillStyle",(function(t){return a(t)}))}),(function(t){return t.attr("fillStyle",(function(t){return a(t)}))}));var i=null===(t=r.current)||void 0===t?void 0:t.getContext("2d"),c=J.g("custom.rect");i.clearRect(0,0,Q,400),c.each((function(t,e){var n=J.f(this);i.fillStyle=n.attr("fillStyle"),i.fillRect(+n.attr("x"),+n.attr("y"),+n.attr("width"),+n.attr("height"))}))}),[n]),Object(p.jsxs)(q,{title:"D3 and Canvas",date:new Date,tags:["d3","canvas"],children:[Object(p.jsxs)(C.a,{variant:"body1",align:"justify",children:['I\'ve been using d3 and SVG for about a year and a half now to facilitate data exploration. Data exploration in essence is about uncover patterns, characteristics, and points of interest in a given dataset. This process helps create a broad picture of important trends and major points to study in greater detail. In order to facilitate greater user driven exploration of a given data set, interactive elements are then provided to users to "slice and dice" the data down to a smaller subset, and render a visualisation off of it.',Object(p.jsx)("br",{}),Object(p.jsx)("br",{}),"In most cases, a subset which is large enough to affect browser performance using svgs is also information overload for the user. But what if it isnt? What if one day, there is an awesome visualisation of a huge dataset which is logical for a user to view, yet svgs just cant keep up?",Object(p.jsx)("br",{}),Object(p.jsx)("br",{}),"This studio example is uses D3's data bind model to drive visualisations onto HTML5's performant canvas element."]}),Object(p.jsx)(M.a,{}),Object(p.jsx)("br",{}),Object(p.jsx)(K.a,{value:n,disabled:!0}),Object(p.jsx)(F.a,{value:n,min:0,max:15e3,onChange:function(t,e){i(+e)}}),Object(p.jsx)("div",{style:{height:400,width:601,border:"solid",borderRadius:2,borderWidth:1,borderColor:"gray",display:"block",margin:"10px auto"},id:"canvasContainer",children:Object(p.jsx)("canvas",{width:Q,height:400,ref:r})})]})}function et(){return Object(p.jsxs)(D.a,{container:!0,spacing:4,direction:"column",children:[Object(p.jsx)(D.a,{item:!0,children:Object(p.jsx)(C.a,{variant:"body1",gutterBottom:!0,children:"Below are some sandbox examples to demonstrate some front-end concepts. Each example is tagged with a technology/concept it demonstrates."})}),Object(p.jsx)(D.a,{item:!0,children:Object(p.jsx)(tt,{})}),Object(p.jsx)(D.a,{item:!0,children:Object(p.jsx)(z,{})}),Object(p.jsx)(D.a,{item:!0,children:Object(p.jsx)(Y,{})})]})}function nt(){return Object(p.jsxs)(D.a,{container:!0,spacing:8,children:[Object(p.jsx)(D.a,{item:!0}),Object(p.jsxs)(D.a,{item:!0,children:[Object(p.jsx)(C.a,{align:"justify",variant:"h6",children:"About me"}),Object(p.jsx)(M.a,{}),Object(p.jsx)(C.a,{align:"justify",variant:"body1",children:"Hi, my name is Huan Min and I'm a software engineer based in London with an interest in data visualisation, data engineering and infrastructure technology. I graduated from Imperial College London with a Distinction in MSc Computing Science in 2019, and from University College London with a 1st class honours in MEng Mechanical Engineering in 2018."})]}),Object(p.jsxs)(D.a,{item:!0,children:[Object(p.jsx)(C.a,{align:"justify",variant:"h6",children:"Other Projects"}),Object(p.jsx)(M.a,{}),Object(p.jsx)(C.a,{variant:"body1",children:Object(p.jsxs)("ul",{children:[Object(p.jsxs)("li",{children:[Object(p.jsx)("a",{href:"https://github.com/ministrudels/JamCam-Detector",children:"JamCam Detector"}),": A scalable object detection system applied to London's traffic camera network. ",Object(p.jsx)("a",{href:"http://doi.org/10.1016/j.eswa.2021.115154",children:"Publication"})]}),Object(p.jsxs)("li",{children:[Object(p.jsx)("a",{href:"https://github.com/ministrudels/my-travel-history",children:"My travel history"}),": A simple tool to extract your travel history using Google Map's location history."]}),Object(p.jsxs)("li",{children:[Object(p.jsx)("a",{href:"https://github.com/checo193/FloppyDons",children:"UCL Room finder"}),": Find unbooked rooms near you in UCL."]})]})})]}),Object(p.jsxs)(D.a,{item:!0,children:[Object(p.jsx)(C.a,{align:"justify",variant:"h6",children:"Studio"}),Object(p.jsx)(M.a,{}),Object(p.jsx)(et,{})]})]})}var at=[{title:"Home",url:"/home"}];function it(){return Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)(l.a,{}),Object(p.jsxs)(j.a,{maxWidth:"md",children:[Object(p.jsx)(w,{sections:at}),Object(p.jsx)("main",{children:Object(p.jsx)(s.a,{basename:"",children:Object(p.jsxs)(o.c,{children:[Object(p.jsx)(o.a,{path:"/home",component:nt}),Object(p.jsx)(o.a,{path:"/",component:nt})]})})})]}),Object(p.jsx)(k,{})]})}var rt=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,254)).then((function(e){var n=e.getCLS,a=e.getFID,i=e.getFCP,r=e.getLCP,c=e.getTTFB;n(t),a(t),i(t),r(t),c(t)}))};c.a.render(Object(p.jsx)(i.a.StrictMode,{children:Object(p.jsx)(it,{})}),document.getElementById("root")),rt()}},[[216,1,2]]]);
//# sourceMappingURL=main.a2c59bb9.chunk.js.map