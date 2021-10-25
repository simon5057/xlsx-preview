import { CellHyperlinkValue, CellRichTextValue } from "exceljs";
import { genFont } from "../CSSStyles/inline";

export function genHyperLink(value: CellHyperlinkValue) {
  return `<a href="${value.hyperlink}" target="_blank">${value.text}</a>`;
}

export function genRichText(value: CellRichTextValue) {
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

export function genDate(value: Date) {
  return value.toString();
}
