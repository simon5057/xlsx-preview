export function parseARGB(argb: string) {
  if (argb.length !== 8) throw "This is not a standard argb string.";
  const color: string[] = [];
  for (let i = 0; i < 4; i++) {
    color.push(argb.substr(i * 2, 2));
  }
  const [a, r, g, b] = color.map((v) => parseInt(v, 16));
  return { a, r, g, b };
}

function toAndJoinHex(range: Uint8Array): string {
  let result: string = "";
  for (const v of range) {
    let to16 = v.toString(16);
    while (to16.length < 2) {
      to16 = "0" + to16;
    }
    result += to16;
  }
  return result;
}

export function uuid() {
  const view = crypto.getRandomValues(new Uint8Array(8));
  const front = view.slice(0, 4);
  const end = view.slice(4);
  const fontPart = toAndJoinHex(front);
  const endPart = toAndJoinHex(end);
  return `${fontPart}-${endPart}`;
}
