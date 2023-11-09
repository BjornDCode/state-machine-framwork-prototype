import "./style.css";
import { text, element } from "./lib";
import { init, mount } from "./state";

const target = document.querySelector("#target");

let state = init({
  closed: {
    toggle: "open"
  },
  open: {
    toggle: "closed"
  }
});

function App({ state }) {
  const buttonText = state.is("open") ? "Close from outside" : "Open";
  return element("div", {}, [
    element("header", {}, [
      element("button", { onClick: () => state.emit("toggle") }, [buttonText])
    ]),
    ...(state.is("open") ? [element("aside", {}, [text("Aside")])] : []),
    element("main", {}, [text("Main")])
  ]);
}

mount(target, App, state);
