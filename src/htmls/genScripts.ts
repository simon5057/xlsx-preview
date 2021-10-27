import {
  SHEET_CLS,
  SHEET_LOCATE_BTN_CLS,
  SHEET_LOCATE_BTN_X,
  SHEET_TOGGLE_BTN_CLS,
  SHEET_TOGGLE_BTN_X,
  UUID,
} from "constants/base";

const toggleBtnEventBind = `
function toggleBtnEventBind() {
  document.querySelector('.${SHEET_TOGGLE_BTN_X}').addEventListener('click',e => {
    const target = e.target;
    if(target.classList.contains('${SHEET_TOGGLE_BTN_CLS}')) {
      const index = target.dataset.index;
      setActiveByIndex(index);
    }
  })
}
`;

const calcOffset = `
const sheetBtnOffsetMap = (function calcSheetToggleBtnOffset() {
  const result = [];
  const btns = document.querySelectorAll(".${SHEET_TOGGLE_BTN_CLS}");
  btns.forEach((ele, idx) => {
    result[idx] = ele.offsetLeft;
  });
  return result;
})();
`;

const setActiveByIndex = `
function setActiveByIndex(index) {
  document.querySelector('.${SHEET_TOGGLE_BTN_CLS}.active').classList.remove('active');
  document.querySelector('.${SHEET_CLS}.active').classList.remove('active');
  document.querySelector('.${SHEET_TOGGLE_BTN_CLS}[data-index="' + index + '"]').classList.add("active");
  document.querySelector('.${SHEET_CLS}[data-index="' + index + '"]').classList.add("active");
}
`;

const toPrevOffsetIndex = `
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
`;

const locateBtnEventBind = `
let offsetIndex = 0;
function locateBtnEventBind() {
  document.querySelector('.${SHEET_LOCATE_BTN_X}').addEventListener('click', e => {
    const target = e.target;
    if (target.classList.contains('${SHEET_LOCATE_BTN_CLS}')) {
      const toggleBtnX = document.querySelector('.${SHEET_TOGGLE_BTN_X}');
      switch (target.id) {
        case 'first-${UUID}':
          toggleBtnX.scrollTo({ left: 0 });
          offsetIndex = 0;
          break;
        case 'last-${UUID}':
          toggleBtnX.scrollTo({ left: sheetBtnOffsetMap[sheetBtnOffsetMap.length - 1] })
          offsetIndex = sheetBtnOffsetMap.length - 1;
          break;
        case 'prev-${UUID}':
          toPrevOffsetIndex(toggleBtnX);
          break;
        case 'next-${UUID}':
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
export default function genScripts() {
  const scripts = `
  <script>
    ${toggleBtnEventBind}
    ${calcOffset}
    ${setActiveByIndex}
    ${toPrevOffsetIndex}
    ${locateBtnEventBind}
    window.onload = function() {
      toggleBtnEventBind();
      locateBtnEventBind();
    }
  </script>`;
  return scripts;
}
