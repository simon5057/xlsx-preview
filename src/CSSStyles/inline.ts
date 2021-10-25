import { Alignment, Fill, Font } from "exceljs";
import { parseARGB } from "../utils";

export function genAlignment(alignment: Partial<Alignment>): string {
  let styles = "";
  const { horizontal, vertical, indent, readingOrder } = alignment;
  if (horizontal) styles += `text-align: ${horizontal};`;
  if (vertical) styles += `vertical-align: ${vertical};`;
  if (indent) styles += `text-indent: ${indent};`;
  if (readingOrder) styles += `direction: ${readingOrder};`;
  return styles;
}

export function genFont(font: Partial<Font>): string {
  let styles = "";
  const { bold, italic, family, name, size, underline, color } = font;
  if (bold) styles += "font-weight: bold;";
  if (italic) styles += "font-style: italic;";
  if (family) styles += `font-family: ${name};`;
  if (size) styles += `font-size: ${size}px;`;
  if (underline) styles += "text-decoration: underline;";
  if (color && color.argb) styles += `color: ${genColor(color.argb)};`;
  return styles;
}

export function genFill(fill: Fill): string {
  const { type } = fill;
  if (type === "pattern") {
    const { fgColor, bgColor } = fill;
    if (fgColor && fgColor.argb) {
      const color = genColor(fgColor.argb);
      return `background-color: ${color};`;
    } else if (bgColor && bgColor.argb) {
      const color = genColor(bgColor.argb);
      return `background-color: ${color};`;
    }
  }
  return "";
}

export function genColor(argb: string) {
  const { a, r, g, b } = parseARGB(argb);
  return `rgba(${r},${g},${b},${a / 255})`;
}
