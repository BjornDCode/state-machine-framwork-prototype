export function text(text: string): Text {
  const node = document.createTextNode(text);

  return node;
}

type Node = HTMLElement | Text;

export function element(
  name: string,
  properties,
  children: Node[]
): HTMLElement {
  const node = document.createElement(name);

  for (const name in properties) {
    const value = properties[name];

    if (name === "style") {
      for (const property in value) {
        node.style[property] = value[property];
      }
    } else if (name === "onClick") {
      node.addEventListener("click", value);
    } else {
      node.setAttribute(name, value);
    }
  }

  node.replaceChildren(...children);

  return node;
}
