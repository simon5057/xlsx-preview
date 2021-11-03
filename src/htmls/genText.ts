import { Cell, CellHyperlinkValue, CellRichTextValue } from "exceljs";
import { genFont } from "../CSSStyles/inline";

export function genHyperLink(value: CellHyperlinkValue): string {
  return `<a href="${value.hyperlink}" target="_blank">${value.text}</a>`;
}

export function genRichText(value: CellRichTextValue): string {
  const richText = (value as CellRichTextValue).richText;
  let text = "";
  for (const rich of richText) {
    let styles = "";
    if (rich.font) {
      styles = genFont(rich.font);
    }
    if (styles) {
      text += `<span style="${styles}">${rich.text}</span>`;
    } else {
      text += `<span>${rich.text}</span>`;
    }
  }
  return text;
}

export function genForMulaValue(cell: Cell): string {
  if (cell.numFmt === "0.00%") {
    return ((cell.result as number) * 100).toFixed(2) + "%";
  } else {
    return cell.result as string || "";
  }
}

export function genDate(value: Date): string {
  return value.toString();
}
