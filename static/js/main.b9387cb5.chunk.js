(this["webpackJsonpministrudels.github.io"]=this["webpackJsonpministrudels.github.io"]||[]).push([[0],{103:function(e,t,n){},117:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),c=n(24),r=n.n(c),s=(n(103),n(66)),o=n(9),l=n(148),j=n(142),d=n(137),b=n(139),h=n(140),u=n(141),m=n(120),x=n(64),O=n.n(x),g=n(65),p=n.n(g),f=n.p+"static/media/observablehq-logo.8471f109.svg",v=n(2),y=Object(d.a)((function(e){return{toolbar:{overflowX:"auto",borderBottom:"1px solid ".concat(e.palette.divider)},toolbarLink:{padding:e.spacing(1),flexShrink:0},rightToolbar:{margin:"auto",marginRight:12}}}));function w(e){var t=y(),n=e.sections;return Object(v.jsx)(v.Fragment,{children:Object(v.jsxs)(b.a,{disableGutters:!0,variant:"dense",className:t.toolbar,children:[n.map((function(e){return Object(v.jsx)(h.a,{color:e.url===window.location.pathname?"primary":"inherit",noWrap:!0,variant:"body2",href:e.url,className:t.toolbarLink,children:e.title},e.title)})),Object(v.jsx)("section",{className:t.rightToolbar,children:Object(v.jsxs)(u.a,{variant:"text",size:"small","aria-label":"small outlined button group",children:[Object(v.jsx)(m.a,{href:"https://observablehq.com/@minimumness",children:Object(v.jsx)("img",{src:f,alt:""})}),Object(v.jsx)(m.a,{href:"https://github.com/ministrudels",children:Object(v.jsx)(O.a,{})}),Object(v.jsx)(m.a,{href:"https://www.linkedin.com/in/huanmingan/",children:Object(v.jsx)(p.a,{})})]})})]})})}var C=n(119);function I(){return Object(v.jsxs)(C.a,{variant:"body2",color:"textSecondary",children:["Copyright \xa9 ",Object(v.jsx)(h.a,{color:"inherit",children:"Huan Min Gan"})," ",(new Date).getFullYear(),"."]})}var S=Object(d.a)((function(e){return{root:{display:"flex",flexDirection:"column",minHeight:"100vh"},main:{marginTop:e.spacing(8),marginBottom:e.spacing(2)},footer:{padding:e.spacing(3,2),marginTop:"auto",backgroundColor:"light"===e.palette.type?e.palette.grey[200]:e.palette.grey[800]}}}));function k(){var e=S();return Object(v.jsx)("div",{className:e.root,children:Object(v.jsx)("footer",{className:e.footer,children:Object(v.jsx)(j.a,{maxWidth:"sm",children:Object(v.jsx)(I,{})})})})}var D=n(143),M=n(144);function B(){return Object(v.jsxs)(D.a,{container:!0,spacing:8,children:[Object(v.jsx)(D.a,{item:!0}),Object(v.jsx)(D.a,{item:!0,children:Object(v.jsx)(C.a,{align:"justify",variant:"body1",children:"Hi, my name is Huan Min and I'm a software engineer based in London with an interest in data visualisation, data engineering and infrastructure technology. I graduated from Imperial College London with a Distinction in MSc Computing Science in 2019, and from University College London with a 1st class honours in MEng Mechanical Engineering in 2018."})}),Object(v.jsxs)(D.a,{item:!0,children:[Object(v.jsx)(C.a,{align:"justify",variant:"h6",children:"Other Projects"}),Object(v.jsx)(M.a,{}),Object(v.jsx)(C.a,{align:"justify",variant:"subtitle2",children:"Some cool things I've done!"}),Object(v.jsx)(C.a,{variant:"body1",children:Object(v.jsxs)("ul",{children:[Object(v.jsxs)("li",{children:[Object(v.jsx)("a",{href:"https://github.com/ministrudels/JamCam-Detector",children:"JamCam Detector"}),": A scalable object detection system applied to London's traffic camera network. ",Object(v.jsx)("a",{href:"http://doi.org/10.1016/j.eswa.2021.115154",children:"Publication"})]}),Object(v.jsxs)("li",{children:[Object(v.jsx)("a",{href:"https://github.com/ministrudels/my-travel-history",children:"My travel history"}),": A simple tool to extract your travel history using Google Map's location history."]}),Object(v.jsxs)("li",{children:[Object(v.jsx)("a",{href:"https://github.com/checo193/FloppyDons",children:"UCL Room finder"}),": Find unbooked rooms near you in UCL."]})]})})]})]})}var F=n(20),L=n(147),T=n(149),E=n(56),P=n.n(E),H=n(55),N=n.n(H),q=n(150),G=n(145),J=n(146),R=n(151),W=function(e){return new Intl.DateTimeFormat("en-GB",{dateStyle:"long"}).format(e)};function A(e){var t=e.title,n=e.date,a=e.tags,i=e.children;return Object(v.jsxs)(q.a,{variant:"outlined",children:[Object(v.jsxs)(G.a,{children:[Object(v.jsxs)(D.a,{container:!0,justify:"space-between",children:[Object(v.jsx)(D.a,{item:!0,children:Object(v.jsx)(C.a,{gutterBottom:!0,variant:"h5",children:t})}),Object(v.jsx)(D.a,{item:!0,children:Object(v.jsx)(C.a,{color:"textSecondary",children:W(n)})})]}),i]}),Object(v.jsx)(J.a,{children:null===a||void 0===a?void 0:a.map((function(e){return Object(v.jsx)(R.a,{label:e},e)}))})]})}var U=n(48),V=10,X=200,Y=200;function z(){var e=Object(a.useState)(0),t=Object(F.a)(e,2),n=t[0],i=t[1],c=Object(a.useState)(0),r=Object(F.a)(c,2),s=r[0],o=r[1],l=Object(a.useState)(null),j=Object(F.a)(l,2),d=j[0],b=j[1],h=Object(a.useState)(null),u=Object(F.a)(h,2),m=u[0],x=u[1],O=Object(a.useRef)(null);return Object(a.useEffect)((function(){U.b(O.current).attr("viewBox","".concat([0,0,Y,X])).append("g").attr("transform","translate(".concat(V,",").concat(V,")")).append("circle").attr("r",V)}),[]),Object(a.useEffect)((function(){U.b(O.current).selectAll("circle").transition().duration(1e3).ease(U.a).attr("cx",n).attr("cy",s)}),[n,s]),Object(v.jsxs)(A,{title:"Slider and Ball",date:new Date("6 28 2021"),tags:["d3","d3-transition","setInterval"],children:[Object(v.jsxs)(D.a,{container:!0,spacing:2,alignItems:"center",children:[Object(v.jsx)(D.a,{item:!0,children:Object(v.jsx)(C.a,{variant:"body1",children:"X Pos"})}),Object(v.jsx)(D.a,{item:!0,children:Object(v.jsx)(L.a,{onClick:function(e){d?(clearInterval(d),b(null)):b(window.setInterval((function(){return i(181*Math.random())}),2e3))},children:d?Object(v.jsx)(N.a,{}):Object(v.jsx)(P.a,{})})}),Object(v.jsx)(D.a,{item:!0,xs:!0,children:Object(v.jsx)(T.a,{track:!1,value:n,min:0,max:180,onChange:function(e,t){d&&(clearInterval(d),b(null)),i(t)}})})]}),Object(v.jsxs)(D.a,{container:!0,spacing:2,alignItems:"center",children:[Object(v.jsx)(D.a,{item:!0,children:Object(v.jsx)(C.a,{variant:"body1",children:"Y Pos"})}),Object(v.jsx)(D.a,{item:!0,children:Object(v.jsx)(L.a,{onClick:function(e){m?(clearInterval(m),x(null)):x(window.setInterval((function(){return o(181*Math.random())}),2e3))},children:m?Object(v.jsx)(N.a,{}):Object(v.jsx)(P.a,{})})}),Object(v.jsx)(D.a,{item:!0,xs:!0,children:Object(v.jsx)(T.a,{track:!1,value:s,min:0,max:180,onChange:function(e,t){m&&(clearInterval(m),b(null)),o(t)}})})]}),Object(v.jsx)("div",{style:{height:X,width:Y,border:"solid",borderRadius:2,borderWidth:1,borderColor:"gray",display:"block",margin:"auto"},children:Object(v.jsx)("svg",{width:"100%",height:"100%",ref:O})})]})}function K(){return Object(v.jsx)(A,{title:"Malaysia's COVID Vaccination",date:new Date("7 6 2021"),tags:["d3","observablehq"],children:Object(v.jsx)("iframe",{title:"Malaysia's Covid Vaccination",width:"100%",height:"1313",style:{border:"none"},src:"https://observablehq.com/embed/@minimumness/malaysias-covid-vaccination-progress?cells=description%2Ctitle1%2Ckey%2Cviewof+selectedData%2Ctitle2%2CbyState"})})}function Q(){return Object(v.jsxs)(D.a,{container:!0,spacing:4,direction:"column",children:[Object(v.jsx)(D.a,{item:!0,children:Object(v.jsx)(C.a,{variant:"body1",gutterBottom:!0,children:"Below are some sandbox examples to demonstrate some front-end concepts. Each example is tagged with a technology/concept it demonstrates."})}),Object(v.jsx)(D.a,{item:!0,children:Object(v.jsx)(K,{})}),Object(v.jsx)(D.a,{item:!0,children:Object(v.jsx)(z,{})})]})}var Z=[{title:"Home",url:"/home"},{title:"Studio",url:"/studio"}];function $(){return Object(v.jsxs)(v.Fragment,{children:[Object(v.jsx)(l.a,{}),Object(v.jsxs)(j.a,{maxWidth:"md",children:[Object(v.jsx)(w,{sections:Z}),Object(v.jsx)("main",{children:Object(v.jsx)(s.a,{basename:"",children:Object(v.jsxs)(o.c,{children:[Object(v.jsx)(o.a,{path:"/home",component:B}),Object(v.jsx)(o.a,{path:"/Studio",component:Q}),Object(v.jsx)(o.a,{path:"/",component:B})]})})})]}),Object(v.jsx)(k,{})]})}var _=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,153)).then((function(t){var n=t.getCLS,a=t.getFID,i=t.getFCP,c=t.getLCP,r=t.getTTFB;n(e),a(e),i(e),c(e),r(e)}))};r.a.render(Object(v.jsx)(i.a.StrictMode,{children:Object(v.jsx)($,{})}),document.getElementById("root")),_()}},[[117,1,2]]]);
//# sourceMappingURL=main.b9387cb5.chunk.js.map