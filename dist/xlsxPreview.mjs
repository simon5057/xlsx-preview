import { ValueType as y, Workbook as X } from "exceljs";
function P(t) {
  if (t.length !== 8) throw "This is not a standard argb string.";
  const e = [];
  for (let r = 0; r < 4; r++)
    e.push(t.substr(r * 2, 2));
  const [o, n, s, l] = e.map((r) => parseInt(r, 16));
  return { a: o, r: n, g: s, b: l };
}
function I(t) {
  let e = "";
  for (const o of t) {
    let n = o.toString(16);
    for (; n.length < 2; )
      n = "0" + n;
    e += n;
  }
  return e;
}
function j() {
  const t = crypto.getRandomValues(new Uint8Array(8)), e = t.slice(0, 4), o = t.slice(4), n = I(e), s = I(o);
  return `${n}-${s}`;
}
const d = j(), k = `excel-sheets-${d}`, O = `table-${d}`, h = `tbody-${d}`, B = `sheet-${d}`, H = `sheet-toggle-bar-${d}`, M = `locate-btns-x-${d}`, m = `l-btn-${d}`, E = `toggle-btns-x-${d}`, w = `t-btn-${d}`, _ = 24, C = 72, v = "#f0f0f0", q = "#b6d9fb", z = 24, V = 32, U = 20, W = 16;
let D = U, N = W;
function Y(t) {
  t < U && console.warn("setMinimumNumberRows: count less then DEFAULT_NUMBER_ROWS."), D = t;
}
function J(t) {
  t < W && console.warn("setMinimumNumberCols: count less then DEFAULT_NUMBER_COLS."), N = t;
}
function K() {
  return `
    <style>
      .embed-body-${d} { margin: 0; padding: 0; }
      .${O} { border-collapse: collapse; table-layout: fixed; }
      .${h} { border-right: 1px solid ${v}; border-bottom: 1px solid ${v}; }
      .${h} td { border-left: 1px solid ${v}; border-top: 1px solid ${v}; width: ${C}px; height: ${_}px; text-overflow: ellipsis; overflow: hidden; }
      .${h} td.order { color: #333; text-align: center; background: ${q}; }
      .${h} td.order-row { width: 32px; }
    </style>`;
}
function Q() {
  return `
    <style>
      body { margin-bottom: 0; }
      .${k} { position: relative; height: 100%; }
      .${B} { display: none; width: 100%; height: calc(100% - 30px); }
      .${B}.active { display: block; }
      .${H} { position: fixed; left: 0px; bottom: 0px; width: 100%; display: flex; }
      .${M} { display: flex; algin-items: center; margin-right: 1px; }
      .${m} { height: 30px; border: none; }
      .${m}:active { background: #fff; }
      .${E} { position: relative; flex: 1; overflow: hidden; white-space: nowrap; }
      .${w} { height: 30px; padding: 0 15px; border: none; box-shadow: 1px 0 2px #ccc; }
      .${w}.active { border-bottom: 2px solid; background: #fff; }
    </style>`;
}
const Z = `
function toggleBtnEventBind() {
  document.querySelector('.${E}').addEventListener('click',e => {
    const target = e.target;
    if(target.classList.contains('${w}')) {
      const index = target.dataset.index;
      setActiveByIndex(index);
    }
  })
}
`, tt = `
const sheetBtnOffsetMap = (function calcSheetToggleBtnOffset() {
  const result = [];
  const btns = document.querySelectorAll(".${w}");
  btns.forEach((ele, idx) => {
    result[idx] = ele.offsetLeft;
  });
  return result;
})();
`, et = `
function setActiveByIndex(index) {
  document.querySelector('.${w}.active').classList.remove('active');
  document.querySelector('.${B}.active').classList.remove('active');
  document.querySelector('.${w}[data-index="' + index + '"]').classList.add("active");
  document.querySelector('.${B}[data-index="' + index + '"]').classList.add("active");
}
`, nt = `
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
`, ot = `
let offsetIndex = 0;
function locateBtnEventBind() {
  document.querySelector('.${M}').addEventListener('click', e => {
    const target = e.target;
    if (target.classList.contains('${m}')) {
      const toggleBtnX = document.querySelector('.${E}');
      switch (target.id) {
        case 'first-${d}':
          toggleBtnX.scrollTo({ left: 0 });
          offsetIndex = 0;
          break;
        case 'last-${d}':
          toggleBtnX.scrollTo({ left: sheetBtnOffsetMap[sheetBtnOffsetMap.length - 1] })
          offsetIndex = sheetBtnOffsetMap.length - 1;
          break;
        case 'prev-${d}':
          toPrevOffsetIndex(toggleBtnX);
          break;
        case 'next-${d}':
          if (offsetIndex === sheetBtnOffsetMap.length - 1) return;
          toggleBtnX.scrollTo({ left: sheetBtnOffsetMap[++offsetIndex] });
          break;
        default:
          break;
      }
    }
  })
}
`;
function st() {
  return `
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
  <\/script>`;
}
const T = {};
function rt(t, e) {
  if (T[t])
    return `<tr>${e}${T[t]}</tr>`;
  let o = "";
  for (let n = 1; n <= t; n++)
    o += "<td></td>";
  return T[t] = o, `<tr>${e}${o}</tr>`;
}
function lt(t) {
  return `<body class="embed-body-${d}">
        <table class="${O}">
            <tbody class="${h}">${t}</tbody>
        </table>
    </body>`;
}
function it(t, e) {
  let o = "", n = "";
  for (let r = 0; r < t.length; r++) {
    const i = "text/html", c = URL.createObjectURL(new Blob([t[r]], { type: i })), a = r === 0 ? " active" : "";
    o += `<object class="${B}${a}" data-index="${r}" type="${i}" data="${c}"></object>`, n += `<button class="${w}${a}" data-index="${r}">${e[r].name}</button>`;
  }
  const s = `<div class="${M}">
    <button class="${m}" id="first-${d}">⇤</button>
    <button class="${m}" id="prev-${d}">←</button>
    <button class="${m}" id="next-${d}">→</button>
    <button class="${m}" id="last-${d}">⇥</button>
  </div>`, l = `<div class="${E}">${n}</div>`;
  return o += `<div class="${H}">${s}${l}</div>`, o += `${Q()}${st()}`, `<div class="${k}">${o}</div>`;
}
function ct(t, e) {
  const { rows: o, cols: n } = e, { tl: s, br: l } = t, r = (s.col - s.nativeCol) * n[Math.ceil(s.col)], i = (s.row - s.nativeRow) * o[Math.ceil(s.row)];
  let c = 0;
  for (let f = s.nativeCol; f >= 0; f--)
    c += n[f];
  let a = 0;
  for (let f = s.nativeRow; f >= 0; f--)
    a += o[f];
  const u = c + r, g = a + i, $ = (l.col - l.nativeCol) * n[Math.ceil(l.col)], b = (l.col - l.nativeCol) * o[Math.ceil(l.row)];
  let x = 0;
  for (let f = l.nativeCol; f >= 0; f--)
    x += n[f];
  let p = 0;
  for (let f = l.nativeRow; f >= 0; f--)
    p += o[f];
  const L = x + $ - u, R = p + b - g;
  return {
    left: u,
    top: g,
    width: L,
    height: R
  };
}
function at(t, e, o) {
  if (t.width) return t;
  const { cols: n } = o, { tl: s, br: l } = e, r = (l.nativeColOff - s.nativeColOff) / 1e4, i = s.nativeColOff / 1e4;
  let c = 0;
  for (let u = s.nativeCol; u >= 0; u--)
    c += n[u];
  const a = c + i;
  return {
    ...t,
    left: a,
    width: r
  };
}
async function ft(t, e) {
  const o = t.getImages();
  let n = "";
  for (const s of o) {
    let l = ct(s.range, e);
    const { left: r, top: i, width: c, height: a } = at(
      l,
      s.range,
      e
    ), u = `position: absolute; left: ${r}px; top: ${i}px; width: ${c}px; height: ${a}px;`, g = t.workbook.getImage(s.imageId), $ = `image/${g.extension}`;
    if (g.base64)
      n += `<img src="${g.base64}" style="${u}" />`;
    else if (g.buffer) {
      const b = URL.createObjectURL(new Blob([g.buffer], { type: $ }));
      n += `<object type="${$}" data="${b}" style="${u}"></object>`;
    }
  }
  return n;
}
function dt(t) {
  let e = "";
  const { horizontal: o, vertical: n, indent: s, readingOrder: l } = t;
  return o && (e += `text-align: ${o};`), n && (e += `vertical-align: ${n};`), s && (e += `text-indent: ${s};`), l && (e += `direction: ${l};`), e;
}
function F(t) {
  let e = "";
  const { bold: o, italic: n, family: s, name: l, size: r, underline: i, color: c } = t;
  return o && (e += "font-weight: bold;"), n && (e += "font-style: italic;"), s && (e += `font-family: ${l};`), r && (e += `font-size: ${r}px;`), i && (e += "text-decoration: underline;"), c && c.argb && (e += `color: ${S(c.argb)};`), e;
}
function ut(t) {
  const { type: e } = t;
  if (e === "pattern") {
    const { fgColor: o, bgColor: n } = t;
    if (o && o.argb)
      return `background-color: ${S(o.argb)};`;
    if (n && n.argb)
      return `background-color: ${S(n.argb)};`;
  }
  return "";
}
function S(t) {
  const { a: e, r: o, g: n, b: s } = P(t);
  return `rgba(${o},${n},${s},${e / 255})`;
}
function gt(t) {
  return `<a href="${t.hyperlink}" target="_blank">${t.text}</a>`;
}
function $t(t) {
  const e = t.richText;
  let o = "";
  for (const n of e) {
    let s = "";
    n.font && (s = F(n.font)), s ? o += `<span style="${s}">${n.text}</span>` : o += `<span>${n.text}</span>`;
  }
  return o;
}
function bt(t) {
  return t.numFmt === "0.00%" ? (t.result * 100).toFixed(2) + "%" : t.result || "";
}
function ht(t) {
  return t.toString();
}
function xt(t) {
  const { type: e, value: o } = t;
  switch (e) {
    case y.Null:
      return "";
    case y.Hyperlink:
      return gt(o);
    case y.RichText:
      return $t(o);
    case y.Formula:
      return bt(t);
    case y.Date:
      return ht(o);
    default:
      return o || "";
  }
}
function pt(t) {
  if (!t.isMerged || t.master !== t) return null;
  const { row: e, col: o } = t.fullAddress;
  let n = e + 1, s;
  do
    s = t.worksheet.findCell(n++, o);
  while (s && s.master === t);
  let l = o + 1;
  s = void 0;
  do
    s = t.worksheet.findCell(e, l++);
  while (s && s.master === t);
  const r = {};
  return n - e > 1 && (r.row = n - e - 1), l - o > 1 && (r.col = l - o - 1), r;
}
function mt(t) {
  let e = null;
  if (t.isMerged) {
    if (t.master !== t) return "";
    e = pt(t);
  }
  let o = xt(t), n = "";
  e && (e.col && (n += ` colspan="${e.col}"`), e.row && (n += ` rowspan="${e.row}"`));
  let s = "";
  return t.font && (s += F(t.font)), t.alignment && (s += dt(t.alignment)), t.fill && (s += ut(t.fill)), s && (n += ` style="${s}"`), `<td${n}>${o}</td>`;
}
function wt(t, e, o, n) {
  let s = "";
  const l = [];
  for (let r = 1; r <= e; r++) {
    let i = "";
    const c = `<td class="order order-row">${r}</td>`;
    let a;
    if (!t[r])
      a = _, i += rt(o, c);
    else {
      const { height: u } = t[r];
      let g = "";
      for (let b = 1; b <= o; b++) {
        const x = n.findCell(r, b);
        x ? g += mt(x) : g += "<td></td>";
      }
      let $ = "";
      u ? ($ += ` style="height:${u}px;"`, a = u) : a = _, i += `<tr${$}>${c}${g}</tr>`;
    }
    s += i, l[r] = a;
  }
  return { resultRows: s, rowsSpan: l };
}
function yt(t, e) {
  const o = e.properties.defaultColWidth || 9;
  let n = 0, s = '<td class="order order-row"></td>', l = "";
  const r = [];
  for (let i = 1; i <= t; i++) {
    const c = e.getColumn(i);
    if (s += `<td class="order order-col index-${i}">${c.letter}</td>`, !c.width)
      n += C, r[i] = C;
    else {
      const a = c.width * C / o;
      r[i] = a, n += a, l += `.${h} td.index-${i} { width: ${a}px; }`;
    }
  }
  return {
    sheetWidth: n,
    orderCol: s,
    colStyles: l,
    colsSpan: r
  };
}
async function Bt(t) {
  const e = {
    rows: [],
    cols: []
  }, o = {};
  t.eachRow((f, G) => {
    o[G] = f;
  });
  const n = t.lastRow && t.lastRow.number || 0, s = Math.max(n, D), l = t.lastColumn && t.lastColumn.number || 0, r = Math.max(l, N), { resultRows: i, rowsSpan: c } = wt(o, s, r, t);
  e.rows = [z, ...c];
  const { sheetWidth: a, orderCol: u, colStyles: g, colsSpan: $ } = yt(
    r,
    t
  );
  e.cols = [V, ...$];
  const x = t.views.some((f) => !f.showGridLines) ? `.${h}.${h} td:not(.order) { border: none; }` : "";
  let p = lt(u + i);
  const L = `.${O} { width: ${a}px; } ${x}`, R = await ft(t, e);
  return p += R, p += `<style>${L}${g}</style>`, p += K(), p;
}
async function vt(t, e) {
  e?.minimumRows && Y(e.minimumRows), e?.minimumCols && J(e.minimumCols);
  let o;
  if (t instanceof Blob)
    o = await t.arrayBuffer();
  else if (t instanceof ArrayBuffer)
    o = t;
  else
    throw "xlsx2Html(data, options): The parameter data can only be passed ArrayBuffer, Blob or File type";
  const n = new X();
  await n.xlsx.load(o);
  const s = n.worksheets.length, l = [];
  for (let i = 0; i < s; i++) {
    const c = await Bt(n.worksheets[i]);
    l.push(c);
  }
  if (e?.separateSheets === !0)
    return e.output === "arrayBuffer" ? l.map((c) => A(c)) : l;
  const r = it(l, n.worksheets);
  return e?.output === "arrayBuffer" ? A(r) : r;
}
function A(t) {
  return new Blob([t], { type: "text/html" }).arrayBuffer();
}
const Et = {
  xlsx2Html: vt
};
export {
  Et as default,
  vt as xlsx2Html
};
//# sourceMappingURL=xlsxPreview.mjs.map
