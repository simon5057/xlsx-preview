import { ImageRange, Worksheet } from "exceljs";
import { ImagePosAndSize, RowsAndColsSpanMap } from "../types/table";

function calcImgPosAndSize(
  range: ImageRange,
  positionMap: RowsAndColsSpanMap
): ImagePosAndSize {
  const { rows, cols } = positionMap;
  const { tl, br } = range;
  const offsetLeft = (tl.col - tl.nativeCol) * cols[Math.ceil(tl.col)];
  const offsetTop = (tl.row - tl.nativeRow) * rows[Math.ceil(tl.row)];
  let baseLeft = 0;
  for (let k = tl.nativeCol; k >= 0; k--) {
    baseLeft += cols[k];
  }
  let baseTop = 0;
  for (let k = tl.nativeRow; k >= 0; k--) {
    baseTop += rows[k];
  }
  const left = baseLeft + offsetLeft;
  const top = baseTop + offsetTop;

  const offsetRight = (br.col - br.nativeCol) * cols[Math.ceil(br.col)];
  const offsetBottom = (br.col - br.nativeCol) * rows[Math.ceil(br.row)];
  let baseRight = 0;
  for (let k = br.nativeCol; k >= 0; k--) {
    baseRight += cols[k];
  }
  let baseBottom = 0;
  for (let k = br.nativeRow; k >= 0; k--) {
    baseBottom += rows[k];
  }
  const width = baseRight + offsetRight - left;
  const height = baseBottom + offsetBottom - top;
  return {
    left,
    top,
    width,
    height,
  };
}

function regulateImgPosAndSize(
  res: ImagePosAndSize,
  range: ImageRange,
  positionMap: RowsAndColsSpanMap
): ImagePosAndSize {
  if (res.width) return res;
  const { cols } = positionMap;
  const { tl, br } = range;
  const width = (br.nativeColOff - tl.nativeColOff) / 10000;
  const leftOffset = tl.nativeColOff / 10000;

  let baseLeft = 0;
  for (let k = tl.nativeCol; k >= 0; k--) {
    baseLeft += cols[k];
  }
  const left = baseLeft + leftOffset;
  return {
    ...res,
    left,
    width,
  };
}

export async function genImageHtml(
  workSheet: Worksheet,
  positionMap: RowsAndColsSpanMap
): Promise<string> {
  const images = workSheet.getImages();
  let imageHtml = "";
  for (const img of images) {
    let pos = calcImgPosAndSize(img.range, positionMap);
    const { left, top, width, height } = regulateImgPosAndSize(
      pos,
      img.range,
      positionMap
    );
    const styles = `position: absolute; left: ${left}px; top: ${top}px; width: ${width}px; height: ${height}px;`;
    const imgData = workSheet.workbook.getImage(img.imageId as any as number);
    const type = `image/${imgData.extension}`;
    if (imgData.base64) {
      imageHtml += `<img src="${imgData.base64}" style="${styles}" />`;
    } else if (imgData.buffer) {
      const url = URL.createObjectURL(new Blob([imgData.buffer], { type }));
      imageHtml += `<object type="${type}" data="${url}" style="${styles}"></object>`;
    }
  }
  return imageHtml;
}
