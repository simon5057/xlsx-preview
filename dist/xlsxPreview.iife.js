var xlsxPreview=(function(v,y){"use strict";function P(t){if(t.length!==8)throw"This is not a standard argb string.";const e=[];for(let r=0;r<4;r++)e.push(t.substr(r*2,2));const[o,n,s,l]=e.map(r=>parseInt(r,16));return{a:o,r:n,g:s,b:l}}function A(t){let e="";for(const o of t){let n=o.toString(16);for(;n.length<2;)n="0"+n;e+=n}return e}function q(){const t=crypto.getRandomValues(new Uint8Array(8)),e=t.slice(0,4),o=t.slice(4),n=A(e),s=A(o);return`${n}-${s}`}const f=q(),k=`excel-sheets-${f}`,T=`table-${f}`,b=`tbody-${f}`,B=`sheet-${f}`,H=`sheet-toggle-bar-${f}`,R=`locate-btns-x-${f}`,x=`l-btn-${f}`,C=`toggle-btns-x-${f}`,p=`t-btn-${f}`,_=24,E=72,L="#f0f0f0",V="#b6d9fb",z=24,j=32,U=20,W=16;let D=U,N=W;function Y(t){t<U&&console.warn("setMinimumNumberRows: count less then DEFAULT_NUMBER_ROWS."),D=t}function J(t){t<W&&console.warn("setMinimumNumberCols: count less then DEFAULT_NUMBER_COLS."),N=t}function K(){return`
    <style>
      .embed-body-${f} { margin: 0; padding: 0; }
      .${T} { border-collapse: collapse; table-layout: fixed; }
      .${b} { border-right: 1px solid ${L}; border-bottom: 1px solid ${L}; }
      .${b} td { border-left: 1px solid ${L}; border-top: 1px solid ${L}; width: ${E}px; height: ${_}px; text-overflow: ellipsis; overflow: hidden; }
      .${b} td.order { color: #333; text-align: center; background: ${V}; }
      .${b} td.order-row { width: 32px; }
    </style>`}function Q(){return`
    <style>
      body { margin-bottom: 0; }
      .${k} { position: relative; height: 100%; }
      .${B} { display: none; width: 100%; height: calc(100% - 30px); }
      .${B}.active { display: block; }
      .${H} { position: fixed; left: 0px; bottom: 0px; width: 100%; display: flex; }
      .${R} { display: flex; algin-items: center; margin-right: 1px; }
      .${x} { height: 30px; border: none; }
      .${x}:active { background: #fff; }
      .${C} { position: relative; flex: 1; overflow: hidden; white-space: nowrap; }
      .${p} { height: 30px; padding: 0 15px; border: none; box-shadow: 1px 0 2px #ccc; }
      .${p}.active { border-bottom: 2px solid; background: #fff; }
    </style>`}const Z=`
function toggleBtnEventBind() {
  document.querySelector('.${C}').addEventListener('click',e => {
    const target = e.target;
    if(target.classList.contains('${p}')) {
      const index = target.dataset.index;
      setActiveByIndex(index);
    }
  })
}
`,tt=`
const sheetBtnOffsetMap = (function calcSheetToggleBtnOffset() {
  const result = [];
  const btns = document.querySelectorAll(".${p}");
  btns.forEach((ele, idx) => {
    result[idx] = ele.offsetLeft;
  });
  return result;
})();
`,et=`
function setActiveByIndex(index) {
  document.querySelector('.${p}.active').classList.remove('active');
  document.querySelector('.${B}.active').classList.remove('active');
  document.querySelector('.${p}[data-index="' + index + '"]').classList.add("active");
  document.querySelector('.${B}[data-index="' + index + '"]').classList.add("active");
}
`,nt=`
function toPrevOffsetIndex(toggleBtnX) {
  if (offsetIndex === 0) return;
  const scrollLeft = toggleBtnX.scrollLeft;
  const scrollWidth = toggleBtnX.scrollWidth;
  const offsetWidth = toggleBtnX.offsetWidth;
  const maxOffset = scrollWidth - offsetWidth;
  let idx = offsetIndex - 1;
  while (idx >= 0) {
    let cur = sheetBtnOffsetMap[idx];
    if (cur < maxOffset) {
      toggleBtnX.scrollTo({ left: cur });
      offsetIndex = idx;
      break;
    }
    idx--;
  }
}
`,ot=`
let offsetIndex = 0;
function locateBtnEventBind() {
  document.querySelector('.${R}').addEventListener('click', e => {
    const target = e.target;
    if (target.classList.contains('${x}')) {
      const toggleBtnX = document.querySelector('.${C}');
      switch (target.id) {
        case 'first-${f}':
          toggleBtnX.scrollTo({ left: 0 });
          offsetIndex = 0;
          break;
        case 'last-${f}':
          toggleBtnX.scrollTo({ left: sheetBtnOffsetMap[sheetBtnOffsetMap.length - 1] })
          offsetIndex = sheetBtnOffsetMap.length - 1;
          break;
        case 'prev-${f}':
          toPrevOffsetIndex(toggleBtnX);
          break;
        case 'next-${f}':
          if (offsetIndex === sheetBtnOffsetMap.length - 1) return;
          toggleBtnX.scrollTo({ left: sheetBtnOffsetMap[++offsetIndex] });
          break;
        default:
          break;
      }
    }
  })
}
`;function st(){return`
  <script>
    ${Z}
    ${tt}
    ${et}
    ${nt}
    ${ot}
    window.onload = function() {
      toggleBtnEventBind();
      locateBtnEventBind();
    }
  <\/script>`}const S={};function rt(t,e){if(S[t])return`<tr>${e}${S[t]}</tr>`;let o="";for(let n=1;n<=t;n++)o+="<td></td>";return S[t]=o,`<tr>${e}${o}</tr>`}function lt(t){return`<body class="embed-body-${f}">
        <table class="${T}">
            <tbody class="${b}">${t}</tbody>
        </table>
    </body>`}function it(t,e){let o="",n="";for(let r=0;r<t.length;r++){const i="text/html",c=URL.createObjectURL(new Blob([t[r]],{type:i})),a=r===0?" active":"";o+=`<object class="${B}${a}" data-index="${r}" type="${i}" data="${c}"></object>`,n+=`<button class="${p}${a}" data-index="${r}">${e[r].name}</button>`}const s=`<div class="${R}">
    <button class="${x}" id="first-${f}">⇤</button>
    <button class="${x}" id="prev-${f}">←</button>
    <button class="${x}" id="next-${f}">→</button>
    <button class="${x}" id="last-${f}">⇥</button>
  </div>`,l=`<div class="${C}">${n}</div>`;return o+=`<div class="${H}">${s}${l}</div>`,o+=`${Q()}${st()}`,`<div class="${k}">${o}</div>`}function ct(t,e){const{rows:o,cols:n}=e,{tl:s,br:l}=t,r=(s.col-s.nativeCol)*n[Math.ceil(s.col)],i=(s.row-s.nativeRow)*o[Math.ceil(s.row)];let c=0;for(let d=s.nativeCol;d>=0;d--)c+=n[d];let a=0;for(let d=s.nativeRow;d>=0;d--)a+=o[d];const u=c+r,g=a+i,$=(l.col-l.nativeCol)*n[Math.ceil(l.col)],h=(l.col-l.nativeCol)*o[Math.ceil(l.row)];let m=0;for(let d=l.nativeCol;d>=0;d--)m+=n[d];let w=0;for(let d=l.nativeRow;d>=0;d--)w+=o[d];const M=m+$-u,I=w+h-g;return{left:u,top:g,width:M,height:I}}function at(t,e,o){if(t.width)return t;const{cols:n}=o,{tl:s,br:l}=e,r=(l.nativeColOff-s.nativeColOff)/1e4,i=s.nativeColOff/1e4;let c=0;for(let u=s.nativeCol;u>=0;u--)c+=n[u];const a=c+i;return{...t,left:a,width:r}}async function ft(t,e){const o=t.getImages();let n="";for(const s of o){let l=ct(s.range,e);const{left:r,top:i,width:c,height:a}=at(l,s.range,e),u=`position: absolute; left: ${r}px; top: ${i}px; width: ${c}px; height: ${a}px;`,g=t.workbook.getImage(s.imageId),$=`image/${g.extension}`;if(g.base64)n+=`<img src="${g.base64}" style="${u}" />`;else if(g.buffer){const h=URL.createObjectURL(new Blob([g.buffer],{type:$}));n+=`<object type="${$}" data="${h}" style="${u}"></object>`}}return n}function dt(t){let e="";const{horizontal:o,vertical:n,indent:s,readingOrder:l}=t;return o&&(e+=`text-align: ${o};`),n&&(e+=`vertical-align: ${n};`),s&&(e+=`text-indent: ${s};`),l&&(e+=`direction: ${l};`),e}function F(t){let e="";const{bold:o,italic:n,family:s,name:l,size:r,underline:i,color:c}=t;return o&&(e+="font-weight: bold;"),n&&(e+="font-style: italic;"),s&&(e+=`font-family: ${l};`),r&&(e+=`font-size: ${r}px;`),i&&(e+="text-decoration: underline;"),c&&c.argb&&(e+=`color: ${O(c.argb)};`),e}function ut(t){const{type:e}=t;if(e==="pattern"){const{fgColor:o,bgColor:n}=t;if(o&&o.argb)return`background-color: ${O(o.argb)};`;if(n&&n.argb)return`background-color: ${O(n.argb)};`}return""}function O(t){const{a:e,r:o,g:n,b:s}=P(t);return`rgba(${o},${n},${s},${e/255})`}function gt(t){return`<a href="${t.hyperlink}" target="_blank">${t.text}</a>`}function $t(t){const e=t.richText;let o="";for(const n of e){let s="";n.font&&(s=F(n.font)),s?o+=`<span style="${s}">${n.text}</span>`:o+=`<span>${n.text}</span>`}return o}function bt(t){return t.numFmt==="0.00%"?(t.result*100).toFixed(2)+"%":t.result||""}function ht(t){return t.toString()}function xt(t){const{type:e,value:o}=t;switch(e){case y.ValueType.Null:return"";case y.ValueType.Hyperlink:return gt(o);case y.ValueType.RichText:return $t(o);case y.ValueType.Formula:return bt(t);case y.ValueType.Date:return ht(o);default:return o||""}}function pt(t){if(!t.isMerged||t.master!==t)return null;const{row:e,col:o}=t.fullAddress;let n=e+1,s;do s=t.worksheet.findCell(n++,o);while(s&&s.master===t);let l=o+1;s=void 0;do s=t.worksheet.findCell(e,l++);while(s&&s.master===t);const r={};return n-e>1&&(r.row=n-e-1),l-o>1&&(r.col=l-o-1),r}function mt(t){let e=null;if(t.isMerged){if(t.master!==t)return"";e=pt(t)}let o=xt(t),n="";e&&(e.col&&(n+=` colspan="${e.col}"`),e.row&&(n+=` rowspan="${e.row}"`));let s="";return t.font&&(s+=F(t.font)),t.alignment&&(s+=dt(t.alignment)),t.fill&&(s+=ut(t.fill)),s&&(n+=` style="${s}"`),`<td${n}>${o}</td>`}function wt(t,e,o,n){let s="";const l=[];for(let r=1;r<=e;r++){let i="";const c=`<td class="order order-row">${r}</td>`;let a;if(!t[r])a=_,i+=rt(o,c);else{const{height:u}=t[r];let g="";for(let h=1;h<=o;h++){const m=n.findCell(r,h);m?g+=mt(m):g+="<td></td>"}let $="";u?($+=` style="height:${u}px;"`,a=u):a=_,i+=`<tr${$}>${c}${g}</tr>`}s+=i,l[r]=a}return{resultRows:s,rowsSpan:l}}function yt(t,e){const o=e.properties.defaultColWidth||9;let n=0,s='<td class="order order-row"></td>',l="";const r=[];for(let i=1;i<=t;i++){const c=e.getColumn(i);if(s+=`<td class="order order-col index-${i}">${c.letter}</td>`,!c.width)n+=E,r[i]=E;else{const a=c.width*E/o;r[i]=a,n+=a,l+=`.${b} td.index-${i} { width: ${a}px; }`}}return{sheetWidth:n,orderCol:s,colStyles:l,colsSpan:r}}async function Bt(t){const e={rows:[],cols:[]},o={};t.eachRow((d,Ct)=>{o[Ct]=d});const n=t.lastRow&&t.lastRow.number||0,s=Math.max(n,D),l=t.lastColumn&&t.lastColumn.number||0,r=Math.max(l,N),{resultRows:i,rowsSpan:c}=wt(o,s,r,t);e.rows=[z,...c];const{sheetWidth:a,orderCol:u,colStyles:g,colsSpan:$}=yt(r,t);e.cols=[j,...$];const m=t.views.some(d=>!d.showGridLines)?`.${b}.${b} td:not(.order) { border: none; }`:"";let w=lt(u+i);const M=`.${T} { width: ${a}px; } ${m}`,I=await ft(t,e);return w+=I,w+=`<style>${M}${g}</style>`,w+=K(),w}async function G(t,e){e?.minimumRows&&Y(e.minimumRows),e?.minimumCols&&J(e.minimumCols);let o;if(t instanceof Blob)o=await t.arrayBuffer();else if(t instanceof ArrayBuffer)o=t;else throw"xlsx2Html(data, options): The parameter data can only be passed ArrayBuffer, Blob or File type";const n=new y.Workbook;await n.xlsx.load(o);const s=n.worksheets.length,l=[];for(let i=0;i<s;i++){const c=await Bt(n.worksheets[i]);l.push(c)}if(e?.separateSheets===!0)return e.output==="arrayBuffer"?l.map(c=>X(c)):l;const r=it(l,n.worksheets);return e?.output==="arrayBuffer"?X(r):r}function X(t){return new Blob([t],{type:"text/html"}).arrayBuffer()}const vt={xlsx2Html:G};return v.default=vt,v.xlsx2Html=G,Object.defineProperties(v,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}}),v})({},ExcelJS);
//# sourceMappingURL=xlsxPreview.iife.js.map
